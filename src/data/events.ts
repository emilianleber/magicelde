/**
 * Öffentliche Termine — Single Source für /tickets, die Event-Detailseite,
 * den Prerender (scripts/seo-content.mjs: Event-/VideoObject-Schema) und die
 * Sitemap. Nur Fakten aus Ticketseite + Plakat eintragen, nichts dazudichten
 * (vgl. Commit 03dd93d „erfundene Abend-Details entfernen").
 *
 * Ein Termin verschwindet automatisch aus „Anstehende Events", sobald
 * startDate vorbei ist (upcomingEvents). Die Detailseite bleibt erreichbar.
 */

export interface PublicEvent {
  slug: string;
  /** Route der Detailseite */
  path: string;
  name: string;
  tagline: string;
  /** ISO 8601 mit Zeitzone */
  startDate: string;
  doorTime: string;
  /** Vorverkaufsstart, ISO 8601 */
  salesStart: string;
  dateLabel: string;
  weekdayShort: string;
  doorLabel: string;
  startLabel: string;
  salesStartLabel: string;
  price: number;
  priceLabel: string;
  priceIncludes: string;
  ticketUrl: string;
  ticketProvider: string;
  venue: {
    name: string;
    street: string;
    postalCode: string;
    city: string;
    region: string;
    regionHint: string;
    url: string;
  };
  /** Kurz, zitierfähig (Meta, Karten, llms) */
  summary: string;
  /** Langtext, Absätze */
  description: string[];
  highlights: string[];
  /** Bilder unter /public — absolute Pfade */
  images: { plakat: string; wide: string; tall: string };
  video: {
    wide: string;
    tall: string;
    posterWide: string;
    posterTall: string;
    durationIso: string;
    uploadDate: string;
    name: string;
    description: string;
  };
  faqs: { q: string; a: string }[];
}

export const EVENTS: PublicEvent[] = [
  {
    slug: "magic-dinner-regensburg-sinzing-2027",
    path: "/tickets/magic-dinner-regensburg-sinzing-2027",
    name: "Magic Dinner · Eine Show in 3 Gängen",
    tagline: "Eine Show in 3 Gängen",
    startDate: "2027-02-20T18:00:00+01:00",
    doorTime: "2027-02-20T17:00:00+01:00",
    salesStart: "2026-10-18T00:00:00+02:00",
    dateLabel: "Samstag, 20. Februar 2027",
    weekdayShort: "Sa 20.02.2027",
    doorLabel: "17:00 Uhr",
    startLabel: "18:00 Uhr",
    salesStartLabel: "18. Oktober 2026",
    price: 89.9,
    priceLabel: "89,90 €",
    priceIncludes: "3-Gänge-Menü + Show",
    ticketUrl:
      "https://okticket.de/tickets-magic-dinner-eine-show-in-3-gaengen-sinzing-wald-wiese-2027-02-20-e60557",
    ticketProvider: "okticket",
    venue: {
      name: "Restaurant Wald & Wiese",
      street: "Bruckdorfer Str. 42",
      postalCode: "93161",
      city: "Sinzing",
      region: "Bayern",
      regionHint: "Sinzing bei Regensburg",
      url: "https://restaurant-waldwiese.de",
    },
    summary:
      "Magic Dinner am Samstag, 20. Februar 2027 im Restaurant Wald & Wiese in Sinzing bei Regensburg: 3-Gänge-Menü und Zaubershow mit Emilian Leber für 89,90 € pro Person. Einlass 17 Uhr, Beginn 18 Uhr, Tickets ab 18.10.2026.",
    description: [
      "Am Samstag, 20. Februar 2027 wird das Restaurant Wald & Wiese in Sinzing bei Regensburg zum Schauplatz für einen Abend voller Magie. Die Küche serviert ein 3-Gänge-Menü — und zwischen den Gängen kommt Zauberkünstler Emilian Leber mit Close-Up-Magie und Comedy direkt an den Tisch.",
      "Kein Abstand zur Bühne, kein Zuschauen aus der letzten Reihe: Die Wunder passieren 30 Zentimeter vor euren Augen und oft in euren eigenen Händen. Live, hautnah, unvergesslich — ein Abend zum Lachen, Staunen und Genießen.",
      "Emilian Leber ist Finalist bei Greatest Talent und Talents of Magic, stand 2025 im TVA-Studio und hat seit 2016 über 200 Events gespielt. Das Magic Dinner ist sein Signature-Format — gemeinsam mit seinem Hauspartner Wald & Wiese.",
    ],
    highlights: [
      "3-Gänge-Menü aus der Küche des Wald & Wiese",
      "Close-Up-Magie und Comedy direkt am Tisch, zwischen den Gängen",
      "Emilian Leber — Finalist bei Greatest Talent und Talents of Magic",
      "Einlass 17:00 Uhr, Beginn 18:00 Uhr",
      "89,90 € pro Person für Menü und Show",
    ],
    images: {
      plakat: "/events/magic-dinner-2027-02-20-plakat.jpg",
      wide: "/events/magic-dinner-2027-02-20-16x9.jpg",
      tall: "/events/magic-dinner-2027-02-20-hochformat.jpg",
    },
    video: {
      wide: "/videos/magic-dinner-showreel-16x9.mp4",
      tall: "/videos/magic-dinner-showreel-9x16.mp4",
      posterWide: "/videos/magic-dinner-showreel-16x9.jpg",
      posterTall: "/videos/magic-dinner-showreel-9x16.jpg",
      durationIso: "PT42S",
      uploadDate: "2026-10-16",
      name: "Magic Dinner · Eine Show in 3 Gängen — Trailer",
      description:
        "Trailer zum Magic Dinner mit Zauberkünstler Emilian Leber im Restaurant Wald & Wiese, Sinzing bei Regensburg: 3 Gänge, Close-Up-Magie live am Tisch. Samstag, 20.02.2027.",
    },
    faqs: [
      {
        q: "Wann und wo findet das Magic Dinner statt?",
        a: "Am Samstag, 20. Februar 2027 im Restaurant Wald & Wiese, Bruckdorfer Str. 42, 93161 Sinzing bei Regensburg. Einlass ist um 17:00 Uhr, Beginn um 18:00 Uhr.",
      },
      {
        q: "Was kostet ein Ticket für das Magic Dinner?",
        a: "Ein Ticket kostet 89,90 € pro Person. Enthalten sind laut Ticket das 3-Gänge-Menü und die Show.",
      },
      {
        q: "Ab wann und wo gibt es Tickets?",
        a: "Der Vorverkauf startet am 18. Oktober 2026. Tickets gibt es online bei okticket — der Link steht auf dieser Seite.",
      },
      {
        q: "Was passiert an dem Abend?",
        a: "Die Küche des Wald & Wiese serviert drei Gänge. Zwischen den Gängen kommt Emilian Leber mit Close-Up-Magie und Comedy direkt an den Tisch — die Effekte passieren aus nächster Nähe, oft in den Händen der Gäste.",
      },
      {
        q: "Wer ist Emilian Leber?",
        a: "Emilian Leber ist Zauberkünstler und Mentalist aus Regensburg. Er ist Finalist bei Greatest Talent (2023) und Talents of Magic (2024, mit Kreativpreis), hatte 2025 einen TV-Auftritt im TVA und spielt seit 2016 — über 200 Events, 4,8 Sterne bei 16 Google-Rezensionen.",
      },
      {
        q: "Wo liegt das Restaurant Wald & Wiese?",
        a: "In Sinzing im Landkreis Regensburg, direkt vor den Toren der Stadt Regensburg. Adresse: Bruckdorfer Str. 42, 93161 Sinzing.",
      },
      {
        q: "Wen kann ich bei Fragen zu Menü oder Unverträglichkeiten fragen?",
        a: "Fragen zur Küche beantwortet das Restaurant Wald & Wiese direkt (restaurant-waldwiese.de). Fragen zur Show beantwortet Emilian Leber unter el@magicel.de.",
      },
      {
        q: "Kann ich ein Magic Dinner auch für meine eigene Feier buchen?",
        a: "Ja. Neben diesem öffentlichen Abend ist das Magic Dinner als privates Format buchbar — für Firmenfeiern, Weihnachtsfeiern, Geburtstage oder Hochzeiten, im Wald & Wiese oder in eurer Location. Anfrage über magicel.de/buchung.",
      },
    ],
  },
];

export const eventByPath = (path: string) => EVENTS.find((e) => e.path === path);

/** Termine, die noch nicht begonnen haben — sortiert nach Datum. */
export const upcomingEvents = (now: Date = new Date()) =>
  EVENTS.filter((e) => new Date(e.startDate) > now).sort(
    (a, b) => +new Date(a.startDate) - +new Date(b.startDate),
  );

/** Vorverkauf schon gestartet? */
export const salesOpen = (e: PublicEvent, now: Date = new Date()) =>
  new Date(e.salesStart) <= now;
