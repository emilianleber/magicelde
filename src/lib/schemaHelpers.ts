/**
 * Zentrale JSON-LD Schema-Helpers.
 *
 * Jede Page-Komponente importiert nur den passenden Helper und sticht
 * das resultierende Objekt in <script type="application/ld+json">.
 *
 * Konvention: zentrale @id-Anker damit Cross-Page-Linking funktioniert
 *   - https://www.magicel.de/#business → LocalBusiness
 *   - https://www.magicel.de/#person   → Person Emilian Leber
 *   - https://www.magicel.de/#website  → WebSite (Sitelinks-SearchBox)
 */

export const SITE_URL = "https://www.magicel.de";
export const BUSINESS_ID = `${SITE_URL}/#business`;
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const AGGREGATE_RATING = {
  "@type": "AggregateRating",
  ratingValue: "5.0",
  bestRating: "5",
  worstRating: "1",
  reviewCount: "30",
};

/** Zentrale Person-Definition für Emilian Leber. */
export const personSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Emilian Leber",
  alternateName: "Emilian Leber Magier",
  jobTitle: "Zauberkünstler · Mentalmagier · Magic-Dinner-Spezialist",
  description:
    "Zauberer und Mentalist aus Regensburg — über 200 Events seit 2016, Greatest-Talent-Finalist, TV-Auftritt im TVA.",
  url: SITE_URL,
  image: `${SITE_URL}/og-image.jpg`,
  birthDate: "2008",
  birthPlace: { "@type": "Place", name: "Regensburg, Bayern, Deutschland" },
  worksFor: { "@id": BUSINESS_ID },
  award: [
    "Greatest Talent Finalist 2023",
    "Talents of Magic Finalist + Kreativpreis 2024",
    "Deutsche Jugendmeisterschaft Magie Top 30 (2024)",
  ],
  sameAs: [
    "https://www.instagram.com/emilian.leber",
    "https://www.provenexpert.com/emilian-leber",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Regensburg",
    addressRegion: "Bayern",
    addressCountry: "DE",
  },
});

/** Zentrale LocalBusiness-Definition. */
export const localBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": BUSINESS_ID,
  name: "Emilian Leber — Zauberer & Mentalist",
  url: SITE_URL,
  image: `${SITE_URL}/og-image.jpg`,
  logo: `${SITE_URL}/og-image.jpg`,
  email: "el@magicel.de",
  telephone: "+4915563744696",
  founder: { "@id": PERSON_ID },
  priceRange: "€€-€€€",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Regensburg",
    addressRegion: "Bayern",
    addressCountry: "DE",
  },
  areaServed: [
    { "@type": "Country", name: "Deutschland" },
    { "@type": "AdministrativeArea", name: "Bayern" },
    { "@type": "City", name: "Regensburg" },
    { "@type": "City", name: "München" },
    { "@type": "City", name: "Nürnberg" },
    { "@type": "City", name: "Augsburg" },
    { "@type": "City", name: "Würzburg" },
    { "@type": "City", name: "Ingolstadt" },
  ],
  aggregateRating: AGGREGATE_RATING,
});

/** WebSite-Schema mit SearchAction für Google Sitelinks-Searchbox. */
export const webSiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: "Emilian Leber — Zauberer & Mentalist",
  publisher: { "@id": BUSINESS_ID },
  inLanguage: "de-DE",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
});

/** Service-Schema (z.B. Hochzeit/Firmenfeier/Magic Dinner). */
export const serviceSchema = (opts: {
  name: string;
  description: string;
  url: string;
  serviceType: string;
  areaServed?: string[];
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: opts.name,
  description: opts.description,
  serviceType: opts.serviceType,
  url: opts.url,
  provider: { "@id": BUSINESS_ID },
  areaServed: (opts.areaServed ?? ["Deutschland", "Bayern"]).map((a) => ({
    "@type": "AdministrativeArea",
    name: a,
  })),
  aggregateRating: AGGREGATE_RATING,
});

/** Event-Schema (z.B. Magic Dinner Summer Edition). */
export const eventSchema = (opts: {
  name: string;
  description: string;
  startDate: string; // ISO 8601 z.B. "2026-07-11T17:00:00+02:00"
  endDate?: string;
  url: string;
  imageUrl: string;
  locationName: string;
  locationStreet?: string;
  locationCity: string;
  locationPostalCode?: string;
  locationCountry?: string;
  organizerName?: string;
  performerName?: string;
  offerUrl?: string;
  offerPriceCurrency?: string;
  offerAvailability?: string;
}) => {
  const obj: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: opts.name,
    description: opts.description,
    startDate: opts.startDate,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    url: opts.url,
    image: [opts.imageUrl],
    location: {
      "@type": "Place",
      name: opts.locationName,
      address: {
        "@type": "PostalAddress",
        addressLocality: opts.locationCity,
        addressRegion: "Bayern",
        addressCountry: opts.locationCountry ?? "DE",
        ...(opts.locationStreet ? { streetAddress: opts.locationStreet } : {}),
        ...(opts.locationPostalCode ? { postalCode: opts.locationPostalCode } : {}),
      },
    },
    organizer: {
      "@type": "Organization",
      name: opts.organizerName ?? "Restaurant Wald & Wiese",
    },
    performer: {
      "@type": "Person",
      "@id": PERSON_ID,
      name: opts.performerName ?? "Emilian Leber",
    },
  };
  if (opts.endDate) obj.endDate = opts.endDate;
  if (opts.offerUrl) {
    obj.offers = {
      "@type": "Offer",
      url: opts.offerUrl,
      availability:
        opts.offerAvailability ?? "https://schema.org/InStock",
      priceCurrency: opts.offerPriceCurrency ?? "EUR",
      price: "0",
      validFrom: new Date().toISOString().split("T")[0],
    };
  }
  return obj;
};

/** FAQPage-Schema. */
export const faqPageSchema = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

/** BreadcrumbList-Schema. */
export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: item.url,
  })),
});
