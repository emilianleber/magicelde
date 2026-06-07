import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useParams } from "react-router-dom";
import NotFound from "./NotFound";
import PageLayout from "@/components/landing/PageLayout";
import { getServiceFormat, type ServiceFormat } from "@/data/serviceFormats";
import { staedte, type Stadt } from "@/data/staedte";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  ArrowRight,
  ArrowUpRight,
  Star,
  MapPin,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

/* Voltage: Cobalt statt Burgunder, kein Serif/Italic. */
const ACCENT = "#1D3FFF";
const ACCENT_DEEP = "#1233CC";
const SERIF_ITALIC = "not-italic";
const SITE_URL = "https://www.magicel.de";

// Extrahiert den Service-Slug aus dem URL-Pfad.
// Akzeptiert mehrere Formen:
//   - /zauberer-<service>/<stadt>     (Alt-Form, alle 5 Formate)
//   - /magic-dinner-<stadt>           (Neu-Form, nur magic-dinner)
//   - /zaubershow-<stadt>             (Neu-Form, nur buehnenshow)
function parseServiceFromPath(pathname: string): string | undefined {
  const old = pathname.match(/^\/zauberer-([a-z-]+)\/[^/]+\/?$/);
  if (old) return old[1];
  if (/^\/magic-dinner-[^/]+\/?$/.test(pathname)) return "magic-dinner";
  if (/^\/zaubershow-[^/]+\/?$/.test(pathname)) return "buehnenshow";
  return undefined;
}

const ServiceStadtSeite = () => {
  const { stadt } = useParams<{ stadt: string }>();
  const { pathname } = useLocation();
  const serviceSlug = parseServiceFromPath(pathname);

  const serviceFormat = useMemo(
    () => (serviceSlug ? getServiceFormat(serviceSlug) : undefined),
    [serviceSlug],
  );
  const city = useMemo(
    () => staedte.find((s) => s.slug === stadt),
    [stadt],
  );

  if (!serviceFormat || !city) {
    return <NotFound />;
  }

  return <ServicePage service={serviceFormat} city={city} />;
};

interface PageProps {
  service: ServiceFormat;
  city: Stadt;
}

const ServicePage = ({ service, city }: PageProps) => {
  // Wenn ein canonicalPrefix gesetzt ist (z.B. "/magic-dinner" für magic-dinner),
  // bauen wir die canonical URL mit Bindestrich-Trennung: /magic-dinner-stuttgart.
  // Sonst Standard-Form mit Slash: /zauberer-X/stuttgart.
  const fullUrl = service.canonicalPrefix
    ? `${SITE_URL}${service.canonicalPrefix}-${city.slug}`
    : `${SITE_URL}${service.routePrefix}/${city.slug}`;
  const metaTitle = service.hero.metaTitle.replace("{stadt}", city.name);
  const metaDescription = service.hero.metaDescription.replace("{stadt}", city.name);
  const h1 = `${service.hero.titlePrefix} ${city.name}.`;

  // JSON-LD: Service-Schema mit areaServed = Stadt
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${service.name} Zauberer in ${city.name}`,
    "provider": { "@id": `${SITE_URL}/#business` },
    "areaServed": {
      "@type": "City",
      "name": city.name,
      "addressRegion": city.region,
      "addressCountry": "DE",
    },
    "url": fullUrl,
    "description": metaDescription,
    "serviceType": service.name,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", position: 1, name: "Start", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: service.name, item: `${SITE_URL}${service.detailHref}` },
      { "@type": "ListItem", position: 3, name: `${service.name} ${city.name}`, item: fullUrl },
    ],
  };

  const localFaqs = (city.faq ?? []).slice(0, 2);
  const allFaqs = [...service.faqGlobal, ...localFaqs];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <Helmet>
        <html lang="de" />
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <link rel="canonical" href={fullUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={fullUrl} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:locale" content="de_DE" />
        <script type="application/ld+json">{JSON.stringify(serviceJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>
      <PageLayout>
        <main>
          <Hero service={service} city={city} h1={h1} />
          <IntroSection service={service} city={city} />
          <HighlightsSection service={service} />
          <AblaufSection service={service} />
          <LocationsSection city={city} />
          <FaqSection faqs={allFaqs} />
          <FinalCta service={service} city={city} />
        </main>
      </PageLayout>
    </>
  );
};

const Hero = ({ service, city, h1 }: { service: ServiceFormat; city: Stadt; h1: string }) => (
  <section className="relative bg-[#08060c] text-white min-h-[72vh] md:min-h-[80vh] overflow-hidden">
    <div
      aria-hidden
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(135deg, #08060c 0%, #1a0a14 60%, #2a0e1c 100%)",
      }}
    />
    <div className="relative z-10 container px-6 pt-28 md:pt-36 pb-20 md:pb-28 flex flex-col">
      <div className="flex-1 flex flex-col justify-center max-w-4xl">
        <nav className="text-[10px] tracking-[0.22em] uppercase font-semibold text-white/55 mb-5 flex flex-wrap items-center gap-x-2 gap-y-1">
          <Link to="/" className="hover:text-white/90 transition-colors">Start</Link>
          <span aria-hidden>·</span>
          <Link to={service.detailHref} className="hover:text-white/90 transition-colors">
            {service.name}
          </Link>
          <span aria-hidden>·</span>
          <span className="text-white/85">{city.name}</span>
        </nav>
        <p className="text-[11px] tracking-[0.22em] uppercase font-semibold text-white/70 mb-4">
          {service.hero.eyebrow}
        </p>
        <h1 className="font-display font-black tracking-[-0.03em] leading-[1.0] text-[clamp(1.875rem,4vw,3.25rem)] text-white max-w-4xl">
          {service.hero.titlePrefix}{" "}
          <span className={SERIF_ITALIC} style={{ color: "#AFC0FF" }}>
            {city.name}.
          </span>
        </h1>
        <p className="mt-6 md:mt-8 max-w-2xl text-base md:text-lg text-white/75 leading-[1.65]">
          {city.intro.length > 280 ? city.intro.slice(0, 280) + "…" : city.intro}
        </p>
        <div className="mt-9 inline-flex flex-col sm:flex-row items-start gap-4">
          <Link
            to={`/buchung?ort=${encodeURIComponent(city.name)}&anlass=${encodeURIComponent(service.name)}`}
            className="group inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-[12px] tracking-[0.08em] font-semibold uppercase text-[#08060c] hover:scale-[1.02] transition-transform"
          >
            {service.ctaPrimary}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to={service.detailHref}
            className="inline-flex items-center gap-1.5 text-[12px] tracking-[0.08em] font-semibold uppercase text-white/80 hover:text-white border-b border-white/30 hover:border-white pb-1 transition-colors"
          >
            Mehr zum {service.shortName}-Format
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-white/70">
          <span className="inline-flex items-center gap-2">
            <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
            <strong className="font-semibold text-white">5,0</strong>
            <span>· 30+ Bewertungen</span>
          </span>
          <span aria-hidden className="text-white/25">·</span>
          <span className="inline-flex items-center gap-2">
            <MapPin className="w-4 h-4" style={{ color: "#AFC0FF" }} />
            <span>{city.name} · {city.region}</span>
          </span>
        </div>
      </div>
    </div>
  </section>
);

const IntroSection = ({ service, city }: { service: ServiceFormat; city: Stadt }) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white py-24 md:py-32">
      <div className="container px-6">
        <div className={`grid md:grid-cols-12 gap-x-12 gap-y-8 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <div className="md:col-span-7">
            <p className="text-[11px] tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-5">
              Was {service.shortName} in {city.name} bedeutet
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.1] text-[clamp(1.75rem,4vw,3rem)] text-foreground mb-6">
              {service.shortName} in {city.name} —{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                so läuft das.
              </span>
            </h2>
            <p className="text-base md:text-lg text-foreground/70 leading-[1.7]">
              {service.intro}
            </p>
          </div>
          <div className="md:col-span-5 md:pt-12">
            <p className="text-base text-foreground/65 leading-[1.7]">
              {city.highlight}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const HighlightsSection = ({ service }: { service: ServiceFormat }) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white py-20 md:py-28 border-y border-foreground/10">
      <div className="container px-6">
        <p className="text-[11px] tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-5">
          Was du bekommst
        </p>
        <h2 className="font-display font-black tracking-[-0.025em] leading-[1.1] text-[clamp(1.75rem,4vw,3rem)] text-foreground mb-10">
          {service.shortName}-Highlights.
        </h2>
        <ul className={`grid md:grid-cols-2 gap-x-10 gap-y-5 max-w-4xl ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          {service.highlights.map((h) => (
            <li key={h} className="flex items-start gap-3 text-base text-foreground/75 leading-[1.6]">
              <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" style={{ color: ACCENT }} />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

const AblaufSection = ({ service }: { service: ServiceFormat }) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white py-24 md:py-32">
      <div className="container px-6">
        <p className="text-[11px] tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-5">
          Ablauf
        </p>
        <h2 className="font-display font-black tracking-[-0.025em] leading-[1.1] text-[clamp(1.75rem,4vw,3rem)] text-foreground mb-10">
          {service.ablauf.length} Schritte —{" "}
          <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
            klar geplant.
          </span>
        </h2>
        <ol className={`space-y-10 max-w-3xl ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          {service.ablauf.map((step, i) => (
            <li key={step.title} className="grid grid-cols-[48px_1fr] md:grid-cols-[72px_1fr] gap-5 md:gap-8 items-start">
              <span
                className={`${SERIF_ITALIC} text-3xl md:text-5xl leading-none`}
                style={{ color: ACCENT }}
              >
                0{i + 1}
              </span>
              <div>
                <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-base text-foreground/70 leading-[1.7]">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

const LocationsSection = ({ city }: { city: Stadt }) => {
  if (!city.bekannteLocations || city.bekannteLocations.length === 0) return null;
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white py-20 md:py-28 border-y border-foreground/10">
      <div className="container px-6">
        <p className="text-[11px] tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-5">
          Bekannte Locations in {city.name}
        </p>
        <h2 className="font-display font-black tracking-[-0.025em] leading-[1.1] text-[clamp(1.75rem,3.6vw,2.5rem)] text-foreground mb-8">
          Häufige Spielorte.
        </h2>
        <div className={`flex flex-wrap gap-2 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          {city.bekannteLocations.map((loc) => (
            <span
              key={loc}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm text-foreground/75 border border-foreground/10 bg-white"
            >
              <Sparkles className="w-3.5 h-3.5" style={{ color: ACCENT }} />
              {loc}
            </span>
          ))}
        </div>
        {city.langText && (
          <div className="mt-12 max-w-3xl prose prose-sm md:prose-base prose-neutral">
            <p className="text-foreground/70 leading-[1.7] whitespace-pre-line">
              {city.langText}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

const FaqSection = ({ faqs }: { faqs: { q: string; a: string }[] }) => (
  <section className="bg-white py-24 md:py-32 border-y border-foreground/10">
    <div className="container px-6">
      <p className="text-[11px] tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-5">
        Häufige Fragen
      </p>
      <h2 className="font-display font-black tracking-[-0.025em] leading-[1.1] text-[clamp(1.75rem,4vw,3rem)] text-foreground mb-10">
        Wichtigste{" "}
        <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
          Antworten.
        </span>
      </h2>
      <div className="max-w-3xl border-t border-foreground/10">
        {faqs.map((f) => (
          <details key={f.q} className="group py-5 border-b border-foreground/10">
            <summary className="flex items-start justify-between gap-6 cursor-pointer list-none">
              <span className="font-display text-base md:text-lg font-bold text-foreground leading-snug pr-4">
                {f.q}
              </span>
              <span
                aria-hidden
                className="shrink-0 mt-1 text-foreground/40 group-open:rotate-45 transition-transform duration-300 text-2xl leading-none"
              >
                +
              </span>
            </summary>
            <p className="mt-4 text-base text-foreground/70 leading-[1.7] max-w-2xl">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

const FinalCta = ({ service, city }: { service: ServiceFormat; city: Stadt }) => (
  <section className="relative text-white py-24 md:py-32 overflow-hidden">
    <div
      aria-hidden
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(135deg, #08060c 0%, #1f0a14 100%)",
      }}
    />
    <div className="relative container px-6 text-center max-w-3xl mx-auto">
      <p className="text-[11px] tracking-[0.22em] uppercase font-semibold text-white/55 mb-5">
        {service.shortName} buchen
      </p>
      <h2 className="font-display font-black tracking-[-0.025em] leading-[1.05] text-[clamp(1.75rem,3.5vw,2.875rem)]">
        Bereit für{" "}
        <span className={SERIF_ITALIC} style={{ color: "#C7D2FF" }}>
          {service.shortName} in {city.name}?
        </span>
      </h2>
      <p className="mt-7 text-base md:text-lg text-white/70 leading-[1.65] max-w-xl mx-auto">
        Schick mir Datum, Anlass und Gästezahl — Antwort innerhalb 24 Stunden,
        persönlich, mit Konzept-Vorschlag.
      </p>
      <div className="mt-10 inline-flex flex-col sm:flex-row items-center gap-4">
        <Link
          to={`/buchung?ort=${encodeURIComponent(city.name)}&anlass=${encodeURIComponent(service.name)}`}
          className="group inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-[13px] tracking-[0.08em] font-semibold uppercase text-[#08060c] hover:bg-white/95"
        >
          {service.ctaPrimary}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
        <a
          href="tel:+4915563744696"
          className="inline-flex items-center gap-1.5 text-[13px] tracking-[0.08em] font-semibold uppercase text-white/70 hover:text-white border-b border-white/30 hover:border-white pb-1"
        >
          Direkt anrufen
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  </section>
);

export default ServiceStadtSeite;
