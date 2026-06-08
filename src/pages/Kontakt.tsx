/** /kontakt — Direkt-Kontakt: Kontaktwege + Formular (leitet vorbefüllt auf /buchung). */
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import VoltageShell from "@/components/voltage/VoltageShell";
import {
  SubHero,
  Stats,
  FactsGrid,
  Steps,
  ReviewsBlock,
  FAQ,
  FinalCTA,
  SectionHeader,
} from "@/components/voltage/sections";
import { COBALT, MAGENTA, L_LINE, L_DIM, INK, WHITE, CARD_LIGHT } from "@/components/voltage/theme";
import {
  Mail,
  Phone,
  MessageCircle,
  ArrowRight,
  ArrowUpRight,
  Clock,
  Sparkles,
  CheckCircle2,
  Send,
  Shield,
  CalendarCheck,
  MapPin,
  Wand2,
} from "lucide-react";
import { captureEmail, markEmailSubmitted } from "@/lib/emailCapture";
import heroImg from "@/assets/emilian-magic-dinner.jpg";

const ACCENT = COBALT;

/* ════════════════════════════════════════════════════════
   DREI KONTAKTWEGE — Email · Telefon · WhatsApp
   ════════════════════════════════════════════════════════ */
const KONTAKTWEGE = [
  {
    icon: Mail,
    eyebrow: "Erster Weg.",
    name: "Email schreiben.",
    value: "el@magicel.de",
    href: "mailto:el@magicel.de",
    body: "Wenn du ausführlich beschreiben magst. Ich antworte typischerweise binnen Stunden, spätestens am Folgetag.",
    cta: "Mail öffnen",
    primary: true,
  },
  {
    icon: Phone,
    eyebrow: "Zweiter Weg.",
    name: "Anrufen.",
    value: "+49 155 63744696",
    href: "tel:+4915563744696",
    body: "Wenn du kurz besprechen magst. Werktags bin ich meist erreichbar, sonst Sprachnachricht — Rückruf garantiert.",
    cta: "Jetzt anrufen",
    primary: false,
  },
  {
    icon: MessageCircle,
    eyebrow: "Dritter Weg.",
    name: "WhatsApp.",
    value: "+49 155 63744696",
    href: "https://wa.me/4915563744696",
    body: "Wenn es schnell gehen soll. Voicenote, Foto vom Saal, Kurzfrage — alles geht. Sprachnachrichten höre ich gerne.",
    cta: "WhatsApp öffnen",
    primary: false,
  },
];

const DreiKontaktwege = () => (
  <section className="px-5 md:px-10 py-16 md:py-24">
    <div className="max-w-7xl mx-auto">
      <SectionHeader
        eyebrow="Drei Wege. Einer reicht."
        title={<>Such dir aus, <span style={{ color: COBALT }}>wie du magst</span>.</>}
        sub="Manche schreiben gerne, manche reden lieber. Ein Weg landet bei mir — alle drei führen zur selben Person. Versprochen."
      />
      <div className="grid md:grid-cols-3 gap-5 mt-10">
        {KONTAKTWEGE.map((w) => {
          const Icon = w.icon;
          return (
            <a
              key={w.name}
              href={w.href}
              target={w.href.startsWith("http") ? "_blank" : undefined}
              rel={w.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group rounded-[24px] p-7 flex flex-col transition-transform hover:scale-[1.02]"
              style={
                w.primary
                  ? { background: COBALT, color: WHITE }
                  : { background: CARD_LIGHT, border: `1px solid ${L_LINE}` }
              }
            >
              <span
                className="w-12 h-12 rounded-[14px] flex items-center justify-center"
                style={
                  w.primary
                    ? { background: "rgba(255,255,255,0.18)", color: WHITE }
                    : { background: COBALT, color: WHITE }
                }
              >
                <Icon className="w-6 h-6" />
              </span>
              <p
                className="mt-5 text-[13px] tracking-wide uppercase"
                style={{ color: w.primary ? "rgba(255,255,255,0.7)" : L_DIM }}
              >
                {w.eyebrow}
              </p>
              <h3
                className="text-[22px] font-bold mt-1"
                style={{ color: w.primary ? WHITE : INK }}
              >
                {w.name}
              </h3>
              <p
                className="mt-2.5 text-[14.5px] leading-[1.55] flex-1"
                style={{ color: w.primary ? "rgba(255,255,255,0.82)" : L_DIM }}
              >
                {w.body}
              </p>
              <p
                className="mt-5 text-[16px] font-bold tabular-nums"
                style={{ color: w.primary ? WHITE : INK }}
              >
                {w.value}
              </p>
              <span
                className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold mt-2"
                style={{ color: w.primary ? WHITE : COBALT }}
              >
                {w.cta}
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
          );
        })}
      </div>
    </div>
  </section>
);

/* ════════════════════════════════════════════════════════
   KONTAKTFORMULAR — Logik 1:1 erhalten, nur Voltage-Hülle
   ════════════════════════════════════════════════════════ */

type FormState = {
  name: string;
  email: string;
  telefon: string;
  anlass: string;
  datum: string;
  gaeste: string;
  ort: string;
  nachricht: string;
};

const initialFormState: FormState = {
  name: "",
  email: "",
  telefon: "",
  anlass: "",
  datum: "",
  gaeste: "",
  ort: "",
  nachricht: "",
};

const ANLASS_OPTIONEN = [
  { value: "hochzeit", label: "Hochzeit" },
  { value: "firmenfeier", label: "Firmenfeier" },
  { value: "geburtstag", label: "Geburtstag / privat" },
  { value: "magic-dinner", label: "Magic Dinner" },
  { value: "messe", label: "Messe / Aussteller" },
  { value: "moderation", label: "Moderation" },
  { value: "andere", label: "Etwas anderes" },
];

const KontaktformularSection = () => {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Email-Capture während User tippt
  useEffect(() => {
    if (form.email && form.email.includes("@")) {
      captureEmail(form.email, "kontakt-page", {
        name: form.name,
        anlass: form.anlass,
        datum: form.datum,
      });
    }
  }, [form.email, form.name, form.anlass, form.datum]);

  const update = (key: keyof FormState, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.nachricht) return;
    setSubmitting(true);
    // Echte Anfrage geht über /buchung — wir leiten weiter mit Prefill
    markEmailSubmitted();
    const params = new URLSearchParams({
      name: form.name,
      email: form.email,
      telefon: form.telefon,
      anlass: form.anlass,
      datum: form.datum,
      gaeste: form.gaeste,
      ort: form.ort,
      nachricht: form.nachricht,
      source: "kontakt-page",
    });
    // Kurzer Success-State, dann Redirect
    setTimeout(() => {
      setSubmitted(true);
      window.setTimeout(() => {
        window.location.href = `/buchung?${params.toString()}`;
      }, 1800);
    }, 350);
  };

  const inputCls =
    "w-full rounded-xl border border-foreground/15 bg-white px-4 py-3 text-base text-foreground placeholder:text-foreground/40 focus:border-[color:var(--ac)] focus:outline-none focus:ring-2 focus:ring-[color:var(--ac)]/15 transition-colors";

  return (
    <section
      id="kontaktformular"
      className="px-5 md:px-10 py-16 md:py-24"
      style={{ ["--ac" as never]: ACCENT }}
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 md:gap-16">
        {/* LEFT — Headline + Trust */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
          <SectionHeader
            eyebrow="Das Formular"
            title={<>Erzähl mir <span style={{ color: COBALT }}>vom Abend</span>.</>}
            sub="Je mehr ich weiß, desto besser passt das Angebot. Pflicht sind nur drei Felder. Den Rest kann ich auch im Telefonat klären — du entscheidest."
          />

          <div className="mt-8 space-y-4">
            {[
              {
                icon: Clock,
                label: "Antwort in unter 24 Stunden",
                sub: "meist binnen Stunden",
              },
              {
                icon: CheckCircle2,
                label: "Kostenlos & unverbindlich",
                sub: "kein Verkaufsdruck",
              },
              {
                icon: Sparkles,
                label: "Persönliche Mail von mir",
                sub: "kein Bot, kein Verteiler",
              },
            ].map((t) => {
              const Icon = t.icon;
              return (
                <div key={t.label} className="flex items-start gap-3">
                  <span
                    className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
                    style={{ background: `${COBALT}14`, color: COBALT }}
                  >
                    <Icon className="w-4 h-4" />
                  </span>
                  <div>
                    <p className="text-[15px] font-semibold" style={{ color: INK }}>
                      {t.label}
                    </p>
                    <p className="text-[13px]" style={{ color: L_DIM }}>
                      {t.sub}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT — Form */}
        <div className="lg:col-span-7">
          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="rounded-[24px] p-7 md:p-10"
              style={{ background: CARD_LIGHT, border: `1px solid ${L_LINE}` }}
            >
              <p className="text-[13px] tracking-wide uppercase" style={{ color: L_DIM }}>
                Deine Anfrage
              </p>
              <h3 className="text-[24px] md:text-[28px] font-bold tracking-[-0.01em] mb-7" style={{ color: INK }}>
                Felder ausfüllen.
              </h3>

              {/* Name + Email */}
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="kontakt-name"
                    className="block text-[11px] tracking-[0.16em] uppercase font-bold mb-2"
                    style={{ color: L_DIM }}
                  >
                    Name *
                  </label>
                  <input
                    id="kontakt-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Vor- und Nachname"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label
                    htmlFor="kontakt-email"
                    className="block text-[11px] tracking-[0.16em] uppercase font-bold mb-2"
                    style={{ color: L_DIM }}
                  >
                    Email *
                  </label>
                  <input
                    id="kontakt-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="dein@email.de"
                    className={inputCls}
                  />
                </div>
              </div>

              {/* Telefon + Anlass */}
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="kontakt-telefon"
                    className="block text-[11px] tracking-[0.16em] uppercase font-bold mb-2"
                    style={{ color: L_DIM }}
                  >
                    Telefon
                  </label>
                  <input
                    id="kontakt-telefon"
                    type="tel"
                    value={form.telefon}
                    onChange={(e) => update("telefon", e.target.value)}
                    placeholder="optional"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label
                    htmlFor="kontakt-anlass"
                    className="block text-[11px] tracking-[0.16em] uppercase font-bold mb-2"
                    style={{ color: L_DIM }}
                  >
                    Anlass
                  </label>
                  <select
                    id="kontakt-anlass"
                    value={form.anlass}
                    onChange={(e) => update("anlass", e.target.value)}
                    className={inputCls}
                  >
                    <option value="">Bitte wählen</option>
                    {ANLASS_OPTIONEN.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Datum + Gäste */}
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="kontakt-datum"
                    className="block text-[11px] tracking-[0.16em] uppercase font-bold mb-2"
                    style={{ color: L_DIM }}
                  >
                    Datum
                  </label>
                  <input
                    id="kontakt-datum"
                    type="date"
                    value={form.datum}
                    onChange={(e) => update("datum", e.target.value)}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label
                    htmlFor="kontakt-gaeste"
                    className="block text-[11px] tracking-[0.16em] uppercase font-bold mb-2"
                    style={{ color: L_DIM }}
                  >
                    Gästezahl
                  </label>
                  <input
                    id="kontakt-gaeste"
                    type="text"
                    value={form.gaeste}
                    onChange={(e) => update("gaeste", e.target.value)}
                    placeholder="z.B. 80 Gäste"
                    className={inputCls}
                  />
                </div>
              </div>

              {/* Ort */}
              <div className="mb-4">
                <label
                  htmlFor="kontakt-ort"
                  className="block text-[11px] tracking-[0.16em] uppercase font-bold mb-2"
                  style={{ color: L_DIM }}
                >
                  Ort / Location
                </label>
                <input
                  id="kontakt-ort"
                  type="text"
                  value={form.ort}
                  onChange={(e) => update("ort", e.target.value)}
                  placeholder="Stadt oder Locationname"
                  className={inputCls}
                />
              </div>

              {/* Nachricht */}
              <div className="mb-6">
                <label
                  htmlFor="kontakt-nachricht"
                  className="block text-[11px] tracking-[0.16em] uppercase font-bold mb-2"
                  style={{ color: L_DIM }}
                >
                  Nachricht *
                </label>
                <textarea
                  id="kontakt-nachricht"
                  required
                  rows={5}
                  value={form.nachricht}
                  onChange={(e) => update("nachricht", e.target.value)}
                  placeholder="Erzähl mir kurz vom Abend — Format, Stimmung, was dir wichtig ist."
                  className={`${inputCls} resize-none`}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-[12px] tracking-[0.08em] uppercase font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
                style={{ background: COBALT }}
              >
                <Send className="w-4 h-4" />
                {submitting ? "Wird gesendet..." : "Anfrage absenden"}
              </button>

              {/* Disclaimer */}
              <p className="text-[12px] text-center mt-5 leading-[1.6]" style={{ color: L_DIM }}>
                Mit dem Absenden erkennst du die{" "}
                <Link to="/datenschutz" className="underline hover:opacity-70">
                  Datenschutzerklärung
                </Link>{" "}
                an. Keine Newsletter, keine Weitergabe.
              </p>
            </form>
          ) : (
            <div
              className="rounded-[24px] p-12 md:p-16 text-center"
              style={{ background: COBALT, color: WHITE }}
            >
              <div
                className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-7"
                style={{
                  background: "rgba(255,255,255,0.2)",
                  border: "1px solid rgba(255,255,255,0.35)",
                }}
              >
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <p className="text-[16px] mb-3" style={{ color: "rgba(255,255,255,0.75)" }}>
                Angekommen.
              </p>
              <h3 className="text-[28px] md:text-[36px] font-extrabold tracking-[-0.02em] mb-5">
                Danke {form.name || "dir"}.
              </h3>
              <p className="text-[16px] md:text-lg leading-[1.7] max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.88)" }}>
                Du wirst gerade zum Buchungsformular weitergeleitet, damit wir
                alle Details abschließen können. Ich melde mich dann binnen 24
                Stunden persönlich.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

/* ════════════════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════════════════ */
const Kontakt = () => (
  <VoltageShell
    title="Kontakt — Schreibe mir | Emilian Leber Zauberer Bayern"
    description="Direkt-Kontakt zum Zauberer Emilian Leber. Email, Telefon, WhatsApp. Antwort in unter 24 Stunden. Bayern primär, deutschlandweit buchbar. 5,0★ — 30+ Bewertungen, 200+ Events."
    path="/kontakt"
    noindex={false}
  >
    <Helmet>
      <meta
        name="keywords"
        content="Zauberer Kontakt, Emilian Leber Anfrage, Zauberer buchen Bayern, Magier kontaktieren, Hochzeit Zauberer Anfrage, Firmenfeier Zauberkünstler, Magic Dinner Anfrage, magicel.de Kontakt"
      />
      <meta property="og:url" content="https://www.magicel.de/kontakt" />
      <meta property="og:image" content="https://www.magicel.de/og-image.jpg" />
      <meta property="og:locale" content="de_DE" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="Kontakt — Schreibe mir | Emilian Leber Zauberer"
      />
      <meta
        name="twitter:description"
        content="Direkt-Kontakt zum Zauberer Emilian Leber. Antwort binnen 24 Stunden. Bayern primär, deutschlandweit."
      />
      <meta name="twitter:image" content="https://www.magicel.de/og-image.jpg" />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Kontakt — Emilian Leber Zauberer",
          url: "https://www.magicel.de/kontakt",
          mainEntity: {
            "@type": "Person",
            name: "Emilian Leber",
            jobTitle: "Zauberer und Mentalist",
            email: "el@magicel.de",
            telephone: "+4915563744696",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Regensburg",
              addressRegion: "Bayern",
              addressCountry: "DE",
            },
            sameAs: [
              "https://www.instagram.com/_magicel/",
              "https://www.youtube.com/channel/UCDm5lC0Dq3b8vhJpwRJcXCA",
              "https://de.linkedin.com/in/emilian-leber-3b3414369",
            ],
          },
        })}
      </script>
    </Helmet>

    <SubHero
      eyebrow="Direkt-Kontakt"
      title={<>Schreibe <span style={{ color: COBALT }}>mir</span><span style={{ color: MAGENTA }}>.</span></>}
      sub="Eine kurze Nachricht reicht. Datum, Anlass, Ort — und ich melde mich persönlich. Antwortzeit unter 24 Stunden, sieben Tage die Woche. Bayern primär, deutschlandweit unterwegs."
      image={heroImg}
      imageAlt="Zauberer Emilian Leber beim Magic Dinner"
      imgPos="top"
      primary={{ label: "Formular ausfüllen", href: "#kontaktformular" }}
      badge="Persönliche Antwort in unter 24 Stunden — kein Bot, kein Verteiler."
    />

    <Stats
      items={[
        { v: "24h", l: "Antwortzeit, sieben Tage die Woche" },
        { v: "200+", l: "Events seit 2016" },
        { v: "5,0★", l: "30+ Bewertungen" },
        { v: "DE", l: "Bayern primär, deutschlandweit" },
      ]}
    />

    <DreiKontaktwege />

    <KontaktformularSection />

    <Steps
      eyebrow="So geht es weiter"
      title={<>Von der Nachricht bis zur <span style={{ color: COBALT }}>Zusage</span>.</>}
      sub="Eine kurze Nachricht reicht. Ich melde mich in unter 24 Stunden mit Vorschlag und Angebot — verbindlich und ohne Stress."
      items={[
        { t: "Nachricht erhalten", d: "Datum, Anlass, Ort — du schickst mir kurz die Eckdaten." },
        { t: "Antwort & Angebot", d: "In unter 24 Stunden melde ich mich persönlich mit Vorschlag." },
        { t: "Termin bestätigt", d: "Wir machen alles fix — und ich freue mich auf euren Abend." },
      ]}
    />

    <FactsGrid
      items={[
        { Icon: Clock, k: "Antwortzeit", v: "Unter 24 Stunden — meist binnen Stunden" },
        { Icon: Shield, k: "Unverbindlich", v: "Kostenlos & ohne Verkaufsdruck" },
        { Icon: MapPin, k: "Region", v: "Bayern primär, deutschlandweit unterwegs" },
        { Icon: CalendarCheck, k: "Verfügbarkeit", v: "Sieben Tage die Woche erreichbar" },
      ]}
    />

    <section className="px-5 md:px-10 pt-16 md:pt-24">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Häufige Anliegen"
          title={<>Vielleicht ist es <span style={{ color: COBALT }}>eines davon</span>.</>}
          sub="Wenn dein Thema gleich klar ist, geht es direkt weiter — sonst nimm das Formular oben. Beides okay."
        />
      </div>
    </section>
    <FactsGrid
      items={[
        { Icon: Sparkles, k: "Hochzeit anfragen", v: "Sektempfang, Dinner, Hochzeitstanz — drei Akte Magie" },
        { Icon: Wand2, k: "Firmenfeier-Konzept", v: "Vorstandsdinner bis Mitarbeiterfeier, auf eure Branche zugeschnitten" },
        { Icon: CalendarCheck, k: "Magic Dinner", v: "Wald & Wiese in Sinzing — vier Termine pro Saison" },
        { Icon: MessageCircle, k: "Moderation buchen", v: "Galas, Award-Shows, Firmenpräsentationen mit Magie als Bonus" },
      ]}
    />

    <ReviewsBlock paper />

    <FAQ
      eyebrow="Häufige Fragen zum Kontakt"
      title="Gut zu wissen."
      items={[
        { q: "Wie schnell bekomme ich eine Antwort?", a: "In unter 24 Stunden, sieben Tage die Woche — meist sogar binnen weniger Stunden. Die Antwort kommt persönlich von mir, kein Bot und kein Verteiler." },
        { q: "Ist die Anfrage verbindlich oder kostet sie etwas?", a: "Beides nein. Die Anfrage ist kostenlos und völlig unverbindlich. Du beschreibst kurz deinen Abend, ich melde mich mit einem Vorschlag — und du entscheidest in Ruhe." },
        { q: "Welcher Kontaktweg ist der beste?", a: "Such dir aus, was dir liegt: Email, wenn du ausführlich beschreiben magst, Telefon für ein kurzes Gespräch oder WhatsApp, wenn es schnell gehen soll. Alle drei führen zur selben Person." },
        { q: "Wo bist du buchbar?", a: "Regensburg ist Heimat, Bayern die Hauptregion — von dort fahre ich nach München, Nürnberg, Augsburg und alles dazwischen. Deutschlandweit sowie Wien und Zürich auf Anfrage." },
      ]}
    />

    <FinalCTA
      title={<>Lass uns loslegen — schreib mir<span style={{ color: MAGENTA }}>.</span></>}
      sub="Erzähl mir kurz von deinem Abend — Datum, Anlass, Ort. Ich melde mich innerhalb von 24 Stunden persönlich zurück. Antwort binnen 24 Stunden, kein Verteiler."
    />
  </VoltageShell>
);

export default Kontakt;
