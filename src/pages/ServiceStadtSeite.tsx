import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import NotFound from "./NotFound";
import { getServiceFormat, type ServiceFormat } from "@/data/serviceFormats";
import { staedte, type Stadt } from "@/data/staedte";
import {
  ArrowUpRight,
  MapPin,
  Route,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";

import VoltageShell from "@/components/voltage/VoltageShell";
import {
  SubHero,
  Stats,
  Steps,
  ReviewsBlock,
  FAQ,
  FinalCTA,
  LogoMarquee,
} from "@/components/voltage/sections";
import { WarumCarousel } from "@/components/voltage/creative";
import { COBALT, MAGENTA, INK, L_LINE, L_DIM, up, stagger, vp, Eyebrow } from "@/components/voltage/theme";

import audienceImg from "@/assets/audience-reactions.jpg";
import stageImg from "@/assets/buehne-zuschauer.jpg";
import weddingImg from "@/assets/wedding-magic.jpg";
import dinnerBuehneImg from "@/assets/magicdinner-buehne.jpg";
import heroStageImg from "@/assets/hero-stage.jpg";
import heroDinnerImg from "@/assets/hero-dinner.jpg";
import heroCloseupImg from "@/assets/hero-closeup.jpg";

/* Voltage: Cobalt-Akzent inline, kein Serif/Italic, kein Gold/Burgunder. */
const SITE_URL = "https://www.magicel.de";

/* Pro Format ein passendes Hero-/Split-Bild (kein Gold/Burgunder-Look). */
const FORMAT_IMAGE: Record<string, string> = {
  hochzeit: weddingImg,
  firmenfeier: stageImg,
  "magic-dinner": heroDinnerImg,
  "close-up": heroCloseupImg,
  buehnenshow: heroStageImg,
};

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
  const canonicalPath = service.canonicalPrefix
    ? `${service.canonicalPrefix}-${city.slug}`
    : `${service.routePrefix}/${city.slug}`;
  const fullUrl = `${SITE_URL}${canonicalPath}`;
  const metaTitle = service.hero.metaTitle.replace("{stadt}", city.name);
  const metaDescription = service.hero.metaDescription.replace("{stadt}", city.name);
  const h1 = `${service.hero.titlePrefix} ${city.name}.`;

  // CRM-vorbefüllter Buchungs-Link: ort + anlass + format.
  const buchungHref = `/buchung?ort=${encodeURIComponent(city.name)}&anlass=${encodeURIComponent(
    service.name,
  )}&format=${encodeURIComponent(service.name)}`;

  const heroImage = FORMAT_IMAGE[service.slug] ?? audienceImg;

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
    <VoltageShell title={metaTitle} description={metaDescription} path={canonicalPath} noindex={false}>
      <Helmet>
        <meta property="og:url" content={fullUrl} />
        <meta property="og:locale" content="de_DE" />
        <meta property="og:image" content="https://www.magicel.de/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <script type="application/ld+json">{JSON.stringify(serviceJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <SubHero
        eyebrow={`${service.name} · ${city.name} · ${city.region}`}
        title={
          <>
            {service.hero.titlePrefix}{" "}
            <span style={{ color: COBALT }}>{city.name}</span>
            <span style={{ color: MAGENTA }}>.</span>
          </>
        }
        sub={city.intro.length > 280 ? city.intro.slice(0, 280) + "…" : city.intro}
        image={heroImage}
        imageAlt={`${service.name} Zauberer in ${city.name} — Emilian Leber`}
        imgPos="top"
        badge={`${city.name} · ${city.region} · 200+ Events`}
        primary={{ label: service.ctaPrimary, href: buchungHref }}
        secondary={{ label: `Mehr zum ${service.shortName}-Format`, href: service.detailHref }}
      />

      <LogoMarquee label={`Auftritte für Konzerne und Marken — auch in ${city.name}.`} />

      <HighlightsSection service={service} city={city} h1={h1} buchungHref={buchungHref} />
      <WarumStadtCarousel service={service} city={city} />
      <TrustStripSection service={service} city={city} />
      <AblaufSection service={service} city={city} />
      <ReviewsBlock paper={false} />
      <MehrUeberStadtSection service={service} city={city} buchungHref={buchungHref} />
      <FAQSection service={service} city={city} allFaqs={allFaqs} />
      <WeitereStaedteSection current={city.slug} />

      <FinalCTA
        title={
          <>
            {service.shortName} in {city.name}. <span style={{ color: MAGENTA }}>Magisch.</span>
          </>
        }
        sub={`Schick mir Datum, Anlass und Gästezahl für ${service.shortName} in ${city.name} — Antwort innerhalb 24 Stunden, persönlich, mit Konzept-Vorschlag.`}
      />
    </VoltageShell>
  );
};

/* ═══════════════════════════════════════════════════════════
   HIGHLIGHTS — kompakte Format-USP-Sektion (Checkmark-Liste) mit
   kurzem h1-Headline-Text + Links zu detailHref und /buchung.
   ═══════════════════════════════════════════════════════════ */
const HighlightsSection = ({ service, city, h1, buchungHref }: { service: ServiceFormat; city: Stadt; h1: string; buchungHref: string }) => (
  <motion.section variants={stagger} initial="hidden" whileInView="show" viewport={vp} className="px-5 md:px-10 py-16 md:py-24" style={{ background: "#fff" }}>
    <div className="max-w-7xl mx-auto">
      <motion.div variants={up} className="max-w-3xl mb-10">
        <Eyebrow>{`Was ${service.shortName} in ${city.name} bedeutet`}</Eyebrow>
        <h1 className="font-extrabold tracking-[-0.02em]" style={{ fontSize: "clamp(1.75rem,4vw,3rem)", lineHeight: 1.06, color: INK }}>
          {h1}
        </h1>
        <p className="mt-5 text-[16px] md:text-lg leading-[1.7]" style={{ color: L_DIM }}>
          {service.intro}
        </p>
      </motion.div>
      <ul className="grid md:grid-cols-2 gap-x-10 gap-y-5 max-w-5xl">
        {service.highlights.map((h) => (
          <motion.li key={h} variants={up} className="flex items-start gap-3 text-[15.5px] leading-[1.6]" style={{ color: "#3a3833" }}>
            <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" style={{ color: COBALT }} />
            <span>{h}</span>
          </motion.li>
        ))}
      </ul>
      <motion.div variants={up} className="mt-10 flex flex-wrap gap-3">
        <a href={buchungHref} className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[12px] tracking-[0.08em] font-semibold uppercase" style={{ background: COBALT, color: "#fff" }}>
          {service.ctaPrimary} <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
        <a href={service.detailHref} className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[12px] tracking-[0.08em] font-semibold uppercase transition-colors hover:border-[#1D3FFF]" style={{ background: "#fff", border: `1px solid ${L_LINE}`, color: INK }}>
          Mehr zum {service.shortName}-Format <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </motion.div>
    </div>
  </motion.section>
);

/* ═══════════════════════════════════════════════════════════
   WARUM-STADT-KARUSSELL — die geliebte Sechs-Gründe-Section
   ═══════════════════════════════════════════════════════════ */
const WarumStadtCarousel = ({ service, city }: { service: ServiceFormat; city: Stadt }) => (
  <WarumCarousel
    eyebrow={`Warum ${service.shortName} in ${city.region}?`}
    title={
      <>
        Sechs Gründe für {service.shortName} in <span style={{ color: COBALT }}>{city.name}</span>
        <span style={{ color: MAGENTA }}>.</span>
      </>
    }
    cards={[
      {
        kind: "photo",
        image: dinnerBuehneImg,
        chip: `${city.name} & Umland`,
        title: "Vom Vorstands-Dinner bis zur Gala",
        text: `Vertraut mit Sälen, Caterern und dem Ablauf vor Ort — von der intimen Feier bis zur großen Bühne in ${city.name}.`,
        pos: "center",
      },
      { kind: "stat", v: "200+", l: "Events seit 2016", text: `Routine in ganz Bayern — viele davon in ${city.region}.` },
      {
        kind: "feature",
        Icon: MapPin,
        title: `Schnell in ${city.name}`,
        text: `Anfahrt nach ${city.name} im Angebot transparent kalkuliert — keine versteckten Kosten, kurze Reaktionszeit.`,
      },
      {
        kind: "photo",
        image: stageImg,
        chip: "Voller Saal",
        title: `Der ganze Saal in ${city.name} geht mit`,
        text: "Comedy & Mentalmagie für jeden Rahmen — Close-Up am Tisch oder große Bühnenshow.",
        pos: "top",
      },
      { kind: "review", text: "Sympathischer junger Mann, der sich nicht selbst, sondern seine Zauberkunst in den Mittelpunkt stellt.", name: "Martina Senftl · Eventkundin" },
      {
        kind: "feature",
        Icon: Route,
        title: "Deutschlandweit dabei",
        text: `Regensburg ist die Basis — für ${service.shortName} in ${city.name} und ${city.region} bin ich zur Stelle, deutschlandweit unterwegs.`,
      },
    ]}
  />
);

/* ═══════════════════════════════════════════════════════════
   TRUST — 200+ Events, TV, Bewertungen (Stats)
   ═══════════════════════════════════════════════════════════ */
const TrustStripSection = ({ service, city }: { service: ServiceFormat; city: Stadt }) => (
  <Stats
    items={[
      { v: "200+", l: `Events seit 2016 — auch in ${city.name}` },
      { v: "5,0★", l: "30+ Bewertungen · ProvenExpert" },
      { v: "TV", l: "TVA-Auftritt 2025 · Greatest Talent 2023" },
      { v: "24 h", l: `Antwort auf jede ${service.shortName}-Anfrage` },
    ]}
  />
);

/* ═══════════════════════════════════════════════════════════
   ABLAUF — Format-Schritte (Steps)
   ═══════════════════════════════════════════════════════════ */
const AblaufSection = ({ service, city }: { service: ServiceFormat; city: Stadt }) => (
  <Steps
    eyebrow="Ablauf"
    title={
      <>
        {service.ablauf.length} Schritte — <span style={{ color: COBALT }}>klar geplant.</span>
      </>
    }
    sub={`So läuft ${service.shortName} bei deinem Event in ${city.name} — transparent, ohne Überraschungen.`}
    items={service.ablauf.map((step) => ({ t: step.title, d: step.body }))}
  />
);

/* ═══════════════════════════════════════════════════════════
   FAQ — Format-FAQs (faqGlobal) + Stadt-FAQs (Voltage FAQ)
   ═══════════════════════════════════════════════════════════ */
const FAQSection = ({ service, city, allFaqs }: { service: ServiceFormat; city: Stadt; allFaqs: { q: string; a: string }[] }) => (
  <FAQ
    eyebrow={`${service.name} ${city.name} · Häufige Fragen`}
    title={`${service.name} in ${city.name} — wichtigste Antworten.`}
    items={allFaqs}
  />
);

/* ═══════════════════════════════════════════════════════════
   MEHR ÜBER {FORMAT} IN {STADT} — EIN einziger Lesen-Toggle.
   Der gesamte schwere SEO-Prosa-Text (ausführlicher city.intro-Teil,
   In-der-Nähe-Text, Locations, Lang-Text, Kollegen) — wortwörtlich
   übernommen, als zusammenhängender Langform-Artikel in EINEM <details>
   (default zu, bleibt im DOM). Bewusst KEIN zweites FAQ-Accordion.
   ═══════════════════════════════════════════════════════════ */
const MehrUeberStadtSection = ({ service, city, buchungHref }: { service: ServiceFormat; city: Stadt; buchungHref: string }) => {
  const langParagraphs = (city.langText || "").split("\n\n").filter(Boolean);
  return (
    <motion.section
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={vp}
      className="px-5 md:px-10 py-16 md:py-24"
      style={{ background: "#F4F6F9", borderTop: `1px solid ${L_LINE}`, borderBottom: `1px solid ${L_LINE}` }}
    >
      <div className="max-w-3xl mx-auto">
        <motion.div variants={up} className="mb-10">
          <Eyebrow>Alles, was du wissen musst</Eyebrow>
          <h2 className="font-extrabold tracking-[-0.02em]" style={{ fontSize: "clamp(2rem,4.4vw,3.2rem)", lineHeight: 1.05, color: INK }}>
            Mehr über {service.shortName} in <span style={{ color: COBALT }}>{city.name}</span>.
          </h2>
          <p className="mt-4 text-[16px] md:text-lg leading-[1.6]" style={{ color: L_DIM }}>
            Alle Details zu {service.shortName}, Anreise und den Locations in {city.name} —
            aufklappbar, falls du tiefer einsteigen willst.
          </p>
        </motion.div>

        {/* EIN einziger Lesen-Toggle — kein zweites FAQ-Accordion.
            Aufgeklappt: zusammenhängender Langform-Artikel mit h3-Zwischen-
            überschriften. Jeder Prosa-Text wortwörtlich übernommen. */}
        <motion.div variants={up}>
          <details className="group rounded-[18px] overflow-hidden" style={{ background: "#fff", border: `1px solid ${L_LINE}` }}>
            <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-6 py-5 md:px-8 md:py-6">
              <span className="text-[16px] md:text-[18px] font-semibold" style={{ color: INK }}>
                Ausführliche Infos zu {service.shortName} in {city.name} anzeigen
              </span>
              <ChevronDown className="w-5 h-5 shrink-0 transition-transform group-open:rotate-180" style={{ color: COBALT }} />
            </summary>

            <article
              className="px-6 pb-8 md:px-8 md:pb-10 text-[15px] md:text-[15.5px] leading-[1.75]"
              style={{ color: L_DIM, borderTop: `1px solid ${L_LINE}` }}
            >
              {/* WARUM-STADT — intro + highlight + seoText */}
              <h3 className="text-[20px] md:text-[22px] font-bold mt-7 mb-3" style={{ color: INK }}>
                Warum {service.shortName} in {city.name}?
              </h3>
              <p className="mb-4">{city.intro}</p>
              <p className="mb-4">{city.highlight}</p>
              {city.seoText && <p className="mb-4">{city.seoText}</p>}
              <p className="mb-4">200+ Events seit 2016 — auch in {city.region}.</p>

              {/* IN DER NÄHE — geo-search keyword coverage */}
              <h3 className="text-[20px] md:text-[22px] font-bold mt-9 mb-3" style={{ color: INK }}>
                Zauberer in der Nähe von {city.name} gesucht?
              </h3>
              <p className="mb-4">
                Wer Zauberer in der Nähe oder Magier in der Umgebung sucht und in {city.name} oder dem
                Umkreis sitzt: Ich komme zu jedem Veranstaltungsort in {city.name} und {city.region}.
                Anfahrt im Angebot kalkuliert, keine versteckten Kosten, kurze Reaktionszeit auf Anfragen.
              </p>
              <ul className="space-y-1.5 list-disc pl-5 mb-4">
                <li>{service.shortName} anfragen für {city.name}</li>
                <li>Direkt anrufen — +49 155 63744696</li>
                <li>Ich komme zu jedem Veranstaltungsort in {city.name} und {city.region}</li>
              </ul>
              <div className="mb-2">
                <a href={buchungHref} className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[12px] tracking-[0.08em] font-semibold uppercase" style={{ background: COBALT, color: "#fff" }}>
                  {service.ctaPrimary} <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* LOCATIONS — bekannte Venues der Stadt */}
              {city.bekannteLocations && city.bekannteLocations.length > 0 && (
                <>
                  <h3 className="text-[20px] md:text-[22px] font-bold mt-9 mb-3" style={{ color: INK }}>
                    Event-Locations in {city.name}
                  </h3>
                  <p className="mb-4">
                    Ich trete regelmäßig in Locations und Venues in {city.name} auf — und komme zu jeder
                    Wunsch-Location. Schlosssäle, Hotels, Restaurants, Eventhallen.
                  </p>
                  <div className="flex flex-wrap gap-2.5 mb-4">
                    {city.bekannteLocations.map((loc) => (
                      <span
                        key={loc}
                        className="inline-flex items-center gap-2 text-[13px] px-4 py-2 rounded-full"
                        style={{ background: "#F4F6F9", border: `1px solid ${L_LINE}`, color: INK }}
                      >
                        <MapPin className="w-3.5 h-3.5" style={{ color: COBALT }} />
                        {loc}
                      </span>
                    ))}
                  </div>
                  <p className="mb-4">
                    Deine Location ist nicht dabei? Kein Problem — ich komme zu jedem Veranstaltungsort in{" "}
                    {city.name} und Umgebung.{" "}
                    <a href={buchungHref} style={{ color: COBALT }} className="hover:underline font-semibold">
                      Jetzt anfragen →
                    </a>
                  </p>
                </>
              )}

              {/* LANG-TEXT — SEO-Text */}
              {langParagraphs.length > 0 && (
                <>
                  <h3 className="text-[20px] md:text-[22px] font-bold mt-9 mb-3" style={{ color: INK }}>
                    Zauberer {city.name} — ausführlich erklärt
                  </h3>
                  {langParagraphs.map((p, i) => (
                    <p key={i} className="mb-4">{p}</p>
                  ))}
                </>
              )}

              {/* KOLLEGEN-EMPFEHLUNG */}
              {city.kollegenEmpfehlung && (
                <>
                  <h3 className="text-[20px] md:text-[22px] font-bold mt-9 mb-3" style={{ color: INK }}>
                    Empfehlung aus dem Kollegen-Netzwerk
                  </h3>
                  <p className="mb-4">
                    {city.kollegenEmpfehlung.prefix}
                    <a href={city.kollegenEmpfehlung.linkHref} target="_blank" rel="noopener" className="underline underline-offset-4 transition-colors hover:decoration-[#1D3FFF]" style={{ color: INK }}>
                      {city.kollegenEmpfehlung.linkText}
                    </a>
                    {city.kollegenEmpfehlung.suffix}
                  </p>
                </>
              )}
            </article>
          </details>
        </motion.div>
      </div>
    </motion.section>
  );
};

/* ═══════════════════════════════════════════════════════════
   WEITERE STÄDTE — Internal Linking (SEO-wichtig)
   ═══════════════════════════════════════════════════════════ */
const WeitereStaedteSection = ({ current }: { current: string }) => {
  const currentData = staedte.find((s) => s.slug === current);
  const sameRegion = staedte.filter((s) => s.slug !== current && s.region === currentData?.region).slice(0, 12);
  const others = staedte.filter((s) => s.slug !== current && s.region !== currentData?.region).slice(0, 6);
  return (
    <motion.section variants={stagger} initial="hidden" whileInView="show" viewport={vp} className="px-5 md:px-10 py-16 md:py-24" style={{ background: "#F4F6F9", borderTop: `1px solid ${L_LINE}`, borderBottom: `1px solid ${L_LINE}` }}>
      <div className="max-w-7xl mx-auto">
        <motion.div variants={up} className="max-w-3xl mb-10">
          <Eyebrow>Zauberer auch in deiner Stadt</Eyebrow>
          <h2 className="font-extrabold tracking-[-0.02em]" style={{ fontSize: "clamp(1.75rem,4vw,3.25rem)", lineHeight: 1.05, color: INK }}>
            Über {staedte.length}+ Städte in <span style={{ color: COBALT }}>Deutschland und Österreich</span>.
          </h2>
        </motion.div>
        {sameRegion.length > 0 && (
          <div className="mb-10">
            <p className="text-[10px] tracking-[0.18em] uppercase font-bold mb-5" style={{ color: COBALT }}>
              Zauberer in {currentData?.region}
            </p>
            <div className="flex flex-wrap gap-2.5">
              {sameRegion.map((s) => (
                <motion.a
                  key={s.slug}
                  variants={up}
                  href={`/zauberer/${s.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-full transition-colors hover:border-[#1D3FFF]"
                  style={{ background: "#fff", border: `1px solid ${L_LINE}`, color: INK }}
                >
                  Zauberer {s.name}
                </motion.a>
              ))}
            </div>
          </div>
        )}
        {others.length > 0 && (
          <div>
            <p className="text-[10px] tracking-[0.18em] uppercase font-bold mb-5" style={{ color: COBALT }}>
              Deutschlandweit
            </p>
            <div className="flex flex-wrap gap-2.5">
              {others.map((s) => (
                <motion.a
                  key={s.slug}
                  variants={up}
                  href={`/zauberer/${s.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-full transition-colors hover:border-[#1D3FFF]"
                  style={{ background: "#fff", border: `1px solid ${L_LINE}`, color: INK }}
                >
                  Zauberer {s.name}
                </motion.a>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default ServiceStadtSeite;
