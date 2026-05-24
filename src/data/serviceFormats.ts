/**
 * Service-Format-Konfigurationen für Service-Stadt-Kombinations-Pages.
 *
 * Routen-Schema: /zauberer-:service/:stadt
 * Beispiele: /zauberer-hochzeit/regensburg, /zauberer-firmenfeier/muenchen
 *
 * Jedes Format hat eigene SEO-Inhalte, USPs und format-spezifische FAQs.
 * Pro Service × 109 Städte = 545 unique Long-Tail-Pages.
 */

export interface ServiceFormat {
  slug: string;
  name: string;
  shortName: string;
  hero: {
    eyebrow: string;
    titlePrefix: string; // wird mit Stadtname zu vollständigem Titel: "Zauberer für Hochzeit in München"
    metaTitle: string; // SEO-Title-Template — {stadt} wird ersetzt
    metaDescription: string; // SEO-Description-Template
  };
  intro: string; // Format-Beschreibung (city-agnostic)
  highlights: string[]; // 3-5 Bullet-USPs
  ablauf: { title: string; body: string }[]; // 3-4 Schritte
  faqGlobal: { q: string; a: string }[]; // Format-spezifische FAQs (city-agnostic)
  ctaPrimary: string;
  detailHref: string; // Link auf die Detail-Format-Page
  routePrefix: string; // /zauberer-hochzeit/ etc. — Slash trennt service+city
  /**
   * Optional: alternative URL-Form mit Bindestrich statt Slash zwischen
   * Service und Stadt. Wenn gesetzt, ist DAS der canonical und wird in
   * Sitemap + inject-meta verwendet. Beispiel für magic-dinner:
   *   pathSeparator: "-"  →  /magic-dinner-stuttgart  (statt /zauberer-magic-dinner/stuttgart)
   *   urlPrefix: "/magic-dinner"  (ohne abschliessenden Slash)
   * Der alte URL-Pfad wird per Vercel-301-Redirect auf den neuen geleitet.
   */
  canonicalPrefix?: string; // z.B. "/magic-dinner" — Stadt wird mit "-" angehängt
}

export const SERVICE_FORMATS: ServiceFormat[] = [
  {
    slug: "hochzeit",
    name: "Hochzeit",
    shortName: "Hochzeit",
    routePrefix: "/zauberer-hochzeit",
    detailHref: "/hochzeit",
    hero: {
      eyebrow: "Hochzeitszauberer für deinen Tag",
      titlePrefix: "Zauberer für Hochzeit in",
      metaTitle:
        "★ Hochzeitszauberer {stadt} · Empfang + Show · 5,0/5",
      metaDescription:
        "Hochzeitszauberer für {stadt} — Close-Up beim Sektempfang, Tisch-zu-Tisch beim Dinner, Bühnen-Highlight vor dem Tanz. 100+ Hochzeiten begleitet. 5,0★ bei 30+ Bewertungen. Jetzt unverbindlich anfragen.",
    },
    intro:
      "Drei Akte über euren Tag: Sektempfang, Dinner, Show vor dem Tanz. Close-Up am Tisch und Bühne — einzeln oder als roter Faden über den ganzen Abend.",
    highlights: [
      "Über 100 Hochzeiten begleitet — von intimer Familien-Trauung bis 200-Gäste-Gala",
      "Drei Slots, drei Formate: Sektempfang (Close-Up), Dinner (Tisch-zu-Tisch), nach Hauptgang (Bühnen-Highlight)",
      "Eure Geschichte fließt in die Show ein — Trauring-Effekt, Brautmutter-Routine, Trauzeugen-Stück",
      "Vorab-Briefing per Telefon oder vor Ort kostenlos",
    ],
    ablauf: [
      {
        title: "Sektempfang.",
        body:
          "Während die Gäste auf das Brautpaar warten, gehe ich von Gruppe zu Gruppe — Karten in die Hand, eine Münze die wandert, ein Effekt der nach drei Minuten zur Gesprächs-Eröffnung wird. Tante Erika aus Hamburg und der Trauzeuge aus Augsburg haben plötzlich ein gemeinsames Thema.",
      },
      {
        title: "Dinner.",
        body:
          "Tisch-zu-Tisch zwischen Vorspeise und Hauptgang. Jede Tafel kriegt fünf bis sieben Minuten Magie direkt am Platz. Die Wartezeit zwischen den Gängen wird zum Programm — niemand merkt, wie schnell der Abend läuft.",
      },
      {
        title: "Bühnen-Highlight.",
        body:
          "Optional als Übergang zum Hochzeitstanz: 15-25 Minuten Bühnenshow als Überraschung. Comedy, Mentalmagie, ein personalisiertes Finale fürs Brautpaar. Der emotionale Höhepunkt liegt selten beim Walzer — er liegt hier.",
      },
    ],
    faqGlobal: [
      {
        q: "Wann ist der beste Zeitpunkt für den Hochzeitszauberer?",
        a: "Beim Sektempfang nach der Trauung ist der größte Effekt — Wartezeit wird zur Magie. Zweite Option: zwischen Vorspeise und Hauptgang als Tisch-Magie. Bühnen-Show idealerweise nach Dessert als Übergang zum Tanz.",
      },
      {
        q: "Wie groß muss die Hochzeit für einen Zauberer sein?",
        a: "Funktioniert ab ca. 20 Gästen aufwärts. Intimere Trauungen (10-20 Gäste) eignen sich besser für reine Close-Up-Slots, größere (60+) profitieren von einer kombinierten Bühne+Close-Up-Performance.",
      },
      {
        q: "Was kostet ein Hochzeitszauberer?",
        a: "Hängt von Format und Slot-Anzahl ab. Reines Close-Up beim Sektempfang startet im mittleren dreistelligen Bereich. Voller Tag mit Empfang + Dinner + Bühne deutlich darüber. Konkretes Angebot kommt nach kurzem Briefing.",
      },
      {
        q: "Bietet ihr auch englischsprachige Hochzeitsshows?",
        a: "Ja — auf Anfrage komplette Performance auf Englisch oder zweisprachig. Bei internationalen Gästen empfohlen.",
      },
    ],
    ctaPrimary: "Hochzeitstermin anfragen",
  },
  {
    slug: "firmenfeier",
    name: "Firmenfeier",
    shortName: "Firmenfeier",
    routePrefix: "/zauberer-firmenfeier",
    detailHref: "/firmenfeiern",
    hero: {
      eyebrow: "Firmenfeier-Zauberer · Premium-Entertainment",
      titlePrefix: "Zauberer für Firmenfeier in",
      metaTitle:
        "★ Zauberer Firmenfeier {stadt} · Premium · 5,0/5",
      metaDescription:
        "Firmenfeier-Zauberer für {stadt} — Vorstandsdinner, Weihnachtsfeier, Gala. DAX-Konzerne und Mittelstand. Insider-Pointen aus dem Briefing. 200+ Events. 5,0★ bei 30+ Bewertungen.",
    },
    intro:
      "Vorstandsdinner, Kundenabend, Galaabend, Mitarbeiterfeier. Tonalität ans Unternehmen angepasst, Insider-Pointen aus dem Briefing, Magie-Bridges in der Moderation, Standing-Ovation-Finale.",
    highlights: [
      "200+ Firmen-Events — von DAX-Konzern bis 30-Mann-Manufaktur",
      "Tonalität wird aufs Unternehmen abgestimmt — vor Briefing kein Auftritt",
      "Insider-Routinen mit Firmen-Insiderwissen (Geschäftsführer-Wahl, Produkt-Effekte, etc.)",
      "Magie-Bridges für Moderation: Magie als Übergang zwischen Reden / Awards / Pausen",
      "Standing-Ovation-Finale, das auch dem schweigsamen Vorstand ein Lächeln entlockt",
    ],
    ablauf: [
      {
        title: "Briefing.",
        body:
          "Vor jedem Firmenauftritt ein 30-45-Minuten-Briefing per Telefon oder vor Ort — Unternehmens-Kontext, Anlass, erwartete Gäste, dos and don'ts. Daraus entstehen Insider-Pointen und personalisierte Routinen.",
      },
      {
        title: "Walk-Around / Close-Up beim Empfang.",
        body:
          "Eisbrecher zwischen Abteilungen, die sich sonst nie treffen. 5-7 Min pro Gruppe, Karten/Münzen/Mentaleffekte — direkt am Mann, ohne Bühnen-Hierarchie.",
      },
      {
        title: "Bühnen-Show als Höhepunkt.",
        body:
          "15-30 Min durchkomponiert: Hook, Comedy-Sequenz, Mentaleffekt mit Publikum, Standing-Ovation-Finale. Optional als Moderationsklammer mit kurzen Magie-Inserts zwischen den Reden.",
      },
    ],
    faqGlobal: [
      {
        q: "Wie passt ihr die Show ans Unternehmen an?",
        a: "Briefing-Call vor dem Event mit Geschäftsführung oder Eventverantwortlichen. Themen: Branche, interne Anekdoten, sensible Themen die NICHT vorkommen sollen, Wunsch-Anspielungen. Daraus 2-3 personalisierte Routinen.",
      },
      {
        q: "Funktioniert das auch bei Vorstandsdinnern oder ist es zu salopp?",
        a: "Speziell Vorstandsdinner sind ein Hauptformat. Tonalität: elegant, präzise, kein Klamauk. Mentalmagie statt Comedy-Pointen, ein Mentaleffekt mit dem CEO als Höhepunkt. Funktioniert gerade weil es nicht erwartet wird.",
      },
      {
        q: "Welche Firmen-Größen funktionieren am besten?",
        a: "Magie funktioniert von 20-Mann-Mittagessen bis 500-Personen-Gala. Close-Up beim Mittag, Bühne bei Galas, beides kombiniert bei Weihnachtsfeiern und Sommerfesten.",
      },
      {
        q: "Wie früh muss ich für eine Firmenfeier buchen?",
        a: "Q4 (Weihnachten) am besten 8-12 Wochen vorher anfragen. Sommerfeste und Q1/Q2-Events 6-8 Wochen. Kurzfristig (2-4 Wochen) bei Glück und freier Slot möglich.",
      },
    ],
    ctaPrimary: "Firmenfeier-Termin anfragen",
  },
  {
    slug: "magic-dinner",
    name: "Magic Dinner",
    shortName: "Magic Dinner",
    routePrefix: "/zauberer-magic-dinner",
    detailHref: "/magic-dinner",
    // GSC: Sucher tippen "magic dinner stuttgart" / "magic dinner berlin" —
    // keyword-tighter URL ist /magic-dinner-{stadt}. Alt-URL bleibt funktional
    // (Vercel-301 → neue URL, siehe vercel.json).
    canonicalPrefix: "/magic-dinner",
    hero: {
      eyebrow: "Magic Dinner — Restaurant-Erlebnis mit Tisch-Magie",
      titlePrefix: "Magic Dinner in",
      metaTitle:
        "★ Magic Dinner {stadt} · Close-Up am Tisch · 5,0/5",
      metaDescription:
        "Magic Dinner in {stadt}: Mehrgänge-Abend mit Close-Up-Magie direkt am Tisch. Spezialgebiet seit 2023. Hauspartner Wald & Wiese in Sinzing. 5,0★ bei 30+ Bewertungen. Jetzt anfragen.",
    },
    intro:
      "Mehrgänge-Abend mit Magie zwischen den Gängen. Close-Up direkt am Tisch, Mentalmagie zwischen den Tafeln, alles eingebettet in den Service-Rhythmus. Mein Spezialgebiet seit 2023.",
    highlights: [
      "Spezialgebiet seit 2023 — Hauspartner Restaurant Wald & Wiese in Sinzing bei Regensburg",
      "Funktioniert in jedem Restaurant das mit Tafeln (Tischen) statt Theater-Bestuhlung arbeitet",
      "Service-Rhythmus wird respektiert — Magie passt sich an die Küche an, nicht umgekehrt",
      "Pro Tafel 2-12 Gäste, gesamter Abend 20-50 Gäste im Restaurant",
      "Reservierung läuft beim Restaurant — keine zusätzliche Bühnen-Logistik nötig",
    ],
    ablauf: [
      {
        title: "Tisch reservieren.",
        body:
          "Reservierung direkt beim Restaurant — Tafel-Größe, Wunschuhrzeit, Anlass angeben. Das Restaurant gibt mir am Abend die Tafel-Liste, ich besuche euch dann persönlich.",
      },
      {
        title: "À la carte essen.",
        body:
          "Du isst aus der regulären Karte des Restaurants — Vorspeise, Hauptgang, Dessert in deinem Tempo. Keine festen Programm-Zeiten.",
      },
      {
        title: "Ich besuche eure Tafel.",
        body:
          "Während des Abends gehe ich von Tafel zu Tafel — Karten in eure Hände, eine Münze die durch den Tisch fällt, ein Mentaleffekt mit eurer Wahl. Drei Sekunden Stille danach, dann lacht eure Tafel.",
      },
    ],
    faqGlobal: [
      {
        q: "Was ist ein Magic Dinner?",
        a: "Magic Dinner ist ein gastronomisches Format: ein Magier besucht während eines Restaurant-Abends die Tafeln der Gäste und führt Close-Up-Magie direkt am Tisch vor. Keine Bühne, keine zentrale Show — die Magie kommt zu dir.",
      },
      {
        q: "Wo finden Magic Dinners statt?",
        a: "Meistens im Hauspartner-Restaurant Wald & Wiese in Sinzing bei Regensburg. Magic Dinners sind aber in jedem Restaurant möglich, das mit Tafel-Bestuhlung arbeitet und genug Platz zwischen den Tischen hat.",
      },
      {
        q: "Wie viele Gäste passen an eine Tafel?",
        a: "Optimal 4-10 Personen pro Tafel. Größere Tafeln (bis 12) sind möglich, kleinere Runden (2-3 Personen) eignen sich besonders gut für private Anlässe.",
      },
      {
        q: "Kann ich ein Magic Dinner privat buchen?",
        a: "Ja — entweder als Teil eines öffentlichen Magic-Dinner-Abends (alle Tafeln werden besucht), oder als komplett privater Abend für eure geschlossene Gesellschaft. Anfrage über das Kontaktformular.",
      },
    ],
    ctaPrimary: "Magic-Dinner-Anfrage",
  },
  {
    slug: "close-up",
    name: "Close-Up",
    shortName: "Close-Up",
    routePrefix: "/zauberer-close-up",
    detailHref: "/close-up",
    hero: {
      eyebrow: "Close-Up Magie · direkt am Tisch und in deinen Händen",
      titlePrefix: "Close-Up Zauberer für",
      metaTitle:
        "★ Close-Up Zauberer {stadt} · Karten + Mental · 5,0/5",
      metaDescription:
        "Close-Up Zauberkünstler für {stadt}: Karten in eurer Hand, Münzen aus dem Nichts, Mentaleffekte. Walk-Around beim Empfang, Tisch-zu-Tisch beim Dinner. 5,0★ bei 30+ Bewertungen.",
    },
    intro:
      "Karten in eurer Hand, Münzen die wandern, ein Ring der durch den Tisch fällt. Walk-Around beim Empfang, Tisch-zu-Tisch beim Dinner — intim, persönlich, ohne Technik.",
    highlights: [
      "Über 100 Close-Up-Auftritte — von intimen Tafeln bis 300+ Gäste-Empfänge",
      "Kein Technik-Setup, kein Mikrofon, keine Bühne — komme direkt zu jeder Tafel/Gruppe",
      "Pro Tafel/Gruppe 5-7 Minuten, mehrere Routinen über den Abend",
      "Jede Tafel kriegt eigene Routinen — kein Repeat",
      "Funktioniert in jeder Location, von Schloss bis Wirtshaus",
    ],
    ablauf: [
      {
        title: "Anreise.",
        body:
          "Ich komme zur vereinbarten Zeit, packe meine Karten/Münzen aus, kein Aufbau. Briefing mit dem Service vor Ort: welche Tafeln/Gruppen, welcher Rhythmus, welche Tabu-Themen.",
      },
      {
        title: "Walk-Around / Tisch-zu-Tisch.",
        body:
          "Ich gehe von Gruppe zu Gruppe oder Tafel zu Tafel — 5-7 Minuten pro Stop. Jede Routine ist abgestimmt auf die Runde: Geschäftsleute bekommen Mentaleffekte, Hochzeitsgäste personalisierte Karten-Stücke.",
      },
      {
        title: "Übergabe.",
        body:
          "Am Ende des Slots Übergabe an die Veranstalter — bei Hochzeit oft Übergang zum Tanz, bei Firma zur Rede, bei Magic Dinner zur Dessert-Karte.",
      },
    ],
    faqGlobal: [
      {
        q: "Was ist Close-Up-Magie?",
        a: "Close-Up-Magie ist die intimste Form der Zauberkunst: Karten, Münzen, kleine Objekte werden direkt in den Händen der Zuschauer manipuliert. Keine Bühne, keine Distanz — der Effekt passiert 30 Zentimeter vor dir.",
      },
      {
        q: "Wie viele Gäste schaffen 60 Min Close-Up?",
        a: "Bei 6-Min-pro-Tafel-Routinen schaffe ich in 60 Minuten ca. 8-10 Tafeln, also 40-100 Gäste. Größere Gruppen werden auf mehrere Slots verteilt.",
      },
      {
        q: "Brauche ich für Close-Up extra Platz?",
        a: "Nein. Funktioniert am Stehtisch, an einer Tafel, im Wirtshaus, im Schloss-Saal. Brauche nur einen halben Quadratmeter Tisch zum Arbeiten.",
      },
      {
        q: "Geht Close-Up auch draußen?",
        a: "Ja — bei trockenem Wetter problemlos. Bei Wind ist Karten-Magie schwieriger, Münzen und Mentaleffekte funktionieren aber überall.",
      },
    ],
    ctaPrimary: "Close-Up-Anfrage",
  },
  {
    slug: "buehnenshow",
    name: "Bühnenshow",
    shortName: "Bühnenshow",
    routePrefix: "/zauberer-buehnenshow",
    detailHref: "/buehnenshow",
    // GSC: Sucher tippen "zaubershow stuttgart/nürnberg/augsburg/frankfurt/hamburg"
    // — keyword-tighter URL ist /zaubershow-{stadt}. Alt-URL bleibt funktional
    // (Vercel-301 → neue URL, siehe vercel.json).
    canonicalPrefix: "/zaubershow",
    hero: {
      eyebrow: "Bühnenshow · 15-60 Minuten durchkomponiert",
      titlePrefix: "Bühnen-Zauberer für",
      metaTitle:
        "★ Zaubershow {stadt} · Comedy + Mentalmagie · 5,0/5",
      metaDescription:
        "Zaubershow für {stadt}: 15-60 Min durchkomponierte Bühnenshow — Mentaleffekte, Comedy, Standing-Ovation-Finale. Greatest-Talent-Finalist. 5,0★ bei 30+ Bewertungen.",
    },
    intro:
      "15-60 Minuten durchkomponierte Bühnenshow — Hook, Aufbau, Peaks, Climax, Übergabe. Mentaleffekte, Comedy-Pointen, Standing-Ovation-Finale. Greatest-Talent-Finalist und Kreativpreisträger.",
    highlights: [
      "Greatest Talent Finalist 2023, Talents of Magic Finalist + Kreativpreis 2024",
      "Show 15, 30, 45 oder 60 Min — durchkomponiert mit Hook + Climax + Übergabe",
      "Mentalmagie + Comedy-Pointen + ein finaler Standing-Ovation-Moment",
      "Funktioniert mit Mikrofon (Headset oder Handsender) bei Saal-Auftritten",
      "Lichtcues + Soundeinspieler optional — kann auch ohne Technik gespielt werden",
    ],
    ablauf: [
      {
        title: "Tech-Briefing + Aufbau.",
        body:
          "1-2 Stunden vor Show: Bühnenaufbau, Soundcheck, Licht-Cues mit Tontechnik. Bei einfachem Setting reicht 30-Min-Vorlauf.",
      },
      {
        title: "Die Show.",
        body:
          "Erster Akt: Hook + Mentalstück mit Publikumsbeteiligung. Mittelteil: Comedy-Routinen, eine längere Karten-Sequenz, Aufbau zum Climax. Finale: Standing-Ovation-Moment mit personalisiertem Effekt.",
      },
      {
        title: "Übergabe.",
        body:
          "Nach Show: Übergabe ans Programm — Moderator, DJ, Catering. Bei kleineren Locations Möglichkeit zur Karten-Signierung oder Q&A am Bühnenrand.",
      },
    ],
    faqGlobal: [
      {
        q: "Wie lang ist eine Bühnenshow?",
        a: "Standard sind 15, 30 oder 45 Minuten. Für Galas und Theater-Slots auch 60 Min als abendfüllende Show möglich. Längen werden vorab mit dem Programm-Plan abgestimmt.",
      },
      {
        q: "Brauche ich eine spezielle Bühne?",
        a: "Funktioniert auf jeder Standard-Bühne ab 3×3 Meter. Auch flachere Setups (Restaurant-Saal mit erhöhter Plattform) sind möglich. Kein Boden-Trick benötigt — alle Effekte spielen sich auf Brusthöhe ab.",
      },
      {
        q: "Welche Technik braucht ihr?",
        a: "Mikro (Headset oder Handsender), Bühnenlicht (Spot reicht), optional Sound-System für Einspieler. Bei kleinerem Setting kann auch ohne Technik gespielt werden.",
      },
      {
        q: "Kann die Show in der Show-Sprache flexibel sein?",
        a: "Standard Deutsch. Auf Wunsch auch komplett auf Englisch oder zweisprachig.",
      },
    ],
    ctaPrimary: "Bühnenshow-Anfrage",
  },
];

export function getServiceFormat(slug: string): ServiceFormat | undefined {
  return SERVICE_FORMATS.find((s) => s.slug === slug);
}
