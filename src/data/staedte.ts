export interface StadtFAQ {
  q: string;
  a: string;
}

export interface KollegenEmpfehlung {
  prefix: string;
  linkText: string;
  linkHref: string;
  suffix?: string;
}

export interface Stadt {
  slug: string;
  name: string;
  region: string;
  intro: string;
  highlight: string;
  einwohner?: string;
  bekannteLocations?: string[];
  faq?: StadtFAQ[];
  seoText?: string;
  langText?: string;
  kollegenEmpfehlung?: KollegenEmpfehlung;
}

/**
 * Einsatzgebiet: Regensburg und Staedte bis ca. zwei Stunden Anfahrt.
 *
 * Warum nur diese (22.09.2026): Vorher 109 Stadtseiten (bis Kiel und Wien)
 * plus 545 Format×Stadt-Kombis mit ~90 % gleichem Text. Google wertete das
 * als duennen Inhalt, die Bayern-Seiten verloren Klicks. Die entfernten
 * Staedte leiten per vercel.json auf die naechste Stadt hier weiter
 * (ausserhalb Bayerns auf Startseite bzw. Format-Seite).
 *
 * Reihenfolge = Reihenfolge in Links und Sitemap.
 */
export const staedte: Stadt[] = [
  {
    slug: "regensburg",
    name: "Regensburg",
    region: "Bayern",
    intro: "Als Zauberer aus Regensburg kenne ich die besten Locations der UNESCO-Welterbestadt — von historischen Gewölben im Herzen der Altstadt bis zu modernen Eventspaces an der Donau. Ob Firmenevent, Hochzeit oder Geburtstagsfeier: Ich bringe Close-Up Magie, Bühnenshow und Magic Dinner direkt zu dir nach Regensburg.",
    highlight: "Regensburg ist meine Heimatstadt — das bedeutet maximale Flexibilität, kurze Wege und volle Verfügbarkeit für dein Event. Als lokaler Zauberkünstler kenne ich die Regensburger Eventszene wie meine Westentasche.",
    einwohner: "155.000",
    bekannteLocations: ["Salzstadel", "Alte Mälzerei", "Marinaforum", "Kolpinghaus", "Leerer Beutel", "GoHotel by Schneider Weisse"],
    faq: [
      { q: "Was kostet ein Zauberer in Regensburg?", a: "Die Kosten hängen vom Format und der Dauer ab. Close-Up Magie für 1-2 Stunden startet ab einem mittleren dreistelligen Betrag. Kontaktiere mich für ein individuelles Angebot — die Beratung ist kostenlos und unverbindlich." },
      { q: "Welche Events in Regensburg eignen sich für einen Zauberer?", a: "Firmenfeiern, Hochzeiten, Geburtstage, Weihnachtsfeiern, Messeauftritte, Gala-Abende — praktisch jeder Anlass wird durch professionelle Zauberkunst aufgewertet." },
      { q: "Wie weit im Voraus sollte ich einen Zauberer in Regensburg buchen?", a: "Je früher, desto besser — besonders für Wochenendtermine empfehle ich 4-8 Wochen Vorlauf. Kurzfristige Anfragen sind aber auch möglich." },
    ],
    seoText: "Du suchst einen Zauberer in Regensburg? Emilian Leber ist der Zauberkünstler für dein Event in der Domstadt. Mit interaktiver Close-Up Magie, einer mitreißenden Bühnenshow oder einem exklusiven Magic Dinner wird deine Veranstaltung in Regensburg unvergesslich. Als Regensburger Zauberer bin ich in wenigen Minuten bei dir — ob Altstadt, Stadtamhof oder Prüfening.",
    langText: `Als Zauberer aus Regensburg bin ich in meiner Heimatstadt zuhause — das bedeutet maximale Flexibilität, kurze Wege und volle Verfügbarkeit für dein Event. Ob Firmenfeier im Salzstadel, Hochzeit in der Alten Mälzerei oder Geburtstagsparty im historischen Gewölbekeller — ich kenne Regensburg wie meine Westentasche.

Regensburg ist eine UNESCO-Welterbestadt mit einer lebendigen Eventszene. Die Kombination aus historischen Locations und modernem Eventflair macht jede Veranstaltung besonders — und professionelle Zauberkunst setzt das perfekte Highlight.

Kosten für einen Zauberer in Regensburg: Meine Pakete beginnen ab 395 €. Als Regensburger Zauberer entfällt die Anfahrtspauschale vollständig — du profitierst von maximaler Verfügbarkeit und kurzen Reaktionszeiten.

Von der Altstadt bis Stadtamhof, von Prüfening bis Lappersdorf — ich komme zu dir, egal wo in Regensburg dein Event stattfindet. Neben dem eigentlichen Auftritt bekommst du auch eine kostenlose persönliche Beratung, bei der wir gemeinsam das optimale Showkonzept für deinen Anlass entwickeln.

Ruf mich an oder schreib mir — als lokaler Zauberer in Regensburg bin ich schnell erreichbar und freue mich auf deine Anfrage.`,
  },
  {
    slug: "muenchen",
    name: "München",
    region: "Bayern",
    intro: "Als Zauberer für München bringe ich moderne Zauberkunst in die bayerische Landeshauptstadt — Stadt von Allianz, Munich Re, Siemens, BMW, Linde, Wacker und einem Beratungs-Hub (McKinsey, BCG, Bain), der Premium-Maßstäbe setzt. Münchner Event-Publikum ist gleichzeitig konservativ-elegant und international-anspruchsvoll. Ich biete Close-Up Magie, Comedy-Bühnenshow und Magic Dinner für Firmenfeiern, Hochzeiten und exklusive Events in München, Oberbayern und am Starnberger See / Tegernsee.",
    highlight: "München ist mein nächstgelegener Großstadt-Markt (1,5 h aus Regensburg). Über 80 Münchner Engagements seit 2016 — vom Bayerischer-Hof-Bankett bis zur Schwabinger Startup-Party. Ich kenne die Locations, die Schiebezeiten und die Tonalität.",
    einwohner: "1.500.000",
    bekannteLocations: [
      "Hotel Bayerischer Hof",
      "Mandarin Oriental München",
      "Charles Hotel",
      "Hotel Vier Jahreszeiten Kempinski",
      "Residenz München (Antiquarium, Kaisersaal)",
      "BMW Welt + BMW Museum",
      "Allianz Arena (Business-Bereich)",
      "Alte Kongresshalle",
      "Postpalast",
      "Hofbräuhaus · Festsaal",
      "Zenith Halle",
      "Schloss Nymphenburg",
    ],
    faq: [
      {
        q: "Was kostet ein Zauberer in München?",
        a: "Hängt vom Format ab: Close-Up beim Empfang im mittleren dreistelligen Bereich, eine 30-Min-Bühnenshow für eine Firmenfeier liegt höher, Kombi-Pakete bringen das beste Preis-Leistungs-Verhältnis. Anreise aus Regensburg (1,5 h Autofahrt) ist im Tagessatz enthalten — kein Kilometerzuschlag, keine Übernachtungskosten bei früherem Ende. Konkretes Angebot kommt nach kurzem Briefing-Call.",
      },
      {
        q: "Welche Münchner Locations eignen sich für Zauberkunst?",
        a: "Für Galas und große Bühnen: Bayerischer Hof, Residenz, BMW Welt, Alte Kongresshalle, Postpalast, Hofbräuhaus-Festsaal. Für Close-Up und Magic Dinner: Mandarin Oriental, Charles Hotel, Vier Jahreszeiten, Schumann's, Käfer am Hofgarten. Für Hochzeiten: Schloss Nymphenburg, Hofbräukeller-Festsaal, Schloss Schleißheim, Schloss Berg am Starnberger See, Bachmair Weissach am Tegernsee.",
      },
      {
        q: "Macht ihr auch DAX-Konzern-Events (Allianz, BMW, Siemens, Munich Re)?",
        a: "Ja — DAX und große bayerische Konzerne sind ein Hauptformat. Vor jedem Industrie-Engagement Briefing-Call mit HR oder Marketing: Konzern-Insider (laufende Kampagnen, Werks-Memes, Bayern-vs-Schwaben-Reibungen), sensible Themen die NICHT vorkommen, gewünschte Tonalität (klassisch konservativ oder Startup-locker). Daraus 2-3 personalisierte Mentaleffekte mit Insider-Bezug.",
      },
      {
        q: "Wird das Münchner Umland abgedeckt (Starnberg, Tegernsee, Garmisch, Ingolstadt)?",
        a: "Ja — gesamter Großraum München im Tagessatz ohne Aufpreis: Starnberg, Tutzing, Tegernsee, Bad Tölz, Bad Wießee, Bachmair Weissach, Wolfratshausen, Geretsried, Erding, Freising, Dachau, Garching. Ingolstadt (zwischen München und Regensburg) ist im Tagessatz inklusive. Garmisch-Partenkirchen mit moderatem Reisezuschlag.",
      },
      {
        q: "Wie schnell könnt ihr für ein Münchner Event kommen (Kurzfristanfrage)?",
        a: "1,5 h Anfahrt aus Regensburg — bei freiem Slot Same-Day-Buchungen für München möglich (z.B. bei Krankheits-Ausfall eines anderen Künstlers). Reguläre Vorlaufzeit: Q4 (Weihnachtsfeier-Saison) 8–12 Wochen, Sommerfeste 6–8 Wochen, kurzfristig (2–4 Wochen) bei freiem Slot machbar.",
      },
    ],
    seoText: "Zauberer München Emilian Leber: Close-Up Magie, Comedy-Bühnenshow und Magic Dinner für Firmenfeier, Hochzeit, DAX-Konzern-Event und Privatfeier in München, am Starnberger See und Tegernsee. Über 80 Münchner Engagements, 5,0 Sterne bei 30+ Bewertungen, Greatest-Talent-Finalist 2023.",
    langText: `München ist mein nächstgelegener Großstadt-Markt — 1,5 Stunden aus Regensburg, über 80 Engagements seit 2016. Das bedeutet: ich kenne den Bayerischer Hof, die Residenz, die BMW Welt, die Alte Kongresshalle und den Hofbräuhaus-Festsaal nicht aus dem Veranstaltungs-Prospekt, sondern aus eigenen Auftritten. Das schlägt sich in der Vorbereitung nieder — Setup-Zeiten, Lichtsituationen, Service-Schnittstellen sind bekannt, nichts wird improvisiert.

Drei Anlässe, drei Münchner Formate. Für Münchner Hochzeiten (klassisch in Schloss Nymphenburg, Schloss Berg, Schloss Schleißheim; entspannt im Hofbräukeller; international im Mandarin Oriental) das Drei-Akt-Modell: Close-Up beim Sektempfang, Tisch-zu-Tisch beim Dinner, Bühnen-Highlight vor dem Tanz. Für Firmenfeiern (DAX-Konzerne wie Allianz, Munich Re, BMW, Siemens; Beratungen wie McKinsey, BCG, Bain; Pharma-Konzerne wie Wacker): Walk-Around beim Empfang plus 25–35-Min-Bühne als Höhepunkt zwischen Vorstandsrede und Buffet. Für Privatanlässe (runde Geburtstage in Schwabing, Bogenhausen, Grünwald) reines Close-Up reicht meist.

Bayerischer Premium-Markt braucht zwei Tonalitäten. München hat eine besondere Doppel-Identität: konservativ-elegant (Bayerischer Hof, Residenz, Vier Jahreszeiten) und international-locker (Mandarin Oriental, Charles, Schumann's, Startup-Szene um Werksviertel). Ich passe die Show-Tonalität entsprechend an: Mentalmagie mit klassischer Eleganz für Bankett-Settings, lockere Comedy-Pointen mit Bayern-vs-Schwaben-Twist für Startup-Parties. Beide Versionen sind Premium — aber sie klingen unterschiedlich.

Magic Dinner in München. Mein Spezialgebiet (Mehrgänge-Abend mit Close-Up-Magie am Tisch) funktioniert in Münchner Sterne-Restaurants und Top-Hotel-Restaurants (Atelier im Bayerischer Hof, Schwarzreiter im Vier Jahreszeiten, EssZimmer im Mandarin, Tantris) besonders gut. Bisher als Format im Hauspartner-Restaurant Wald & Wiese in Sinzing etabliert — Münchner Restaurants mit Tafel-Bestuhlung und Sterneküche-Anspruch sind grundsätzlich interessiert, Anfrage über das Kontaktformular.

Anreise und Logistik. München liegt 125 km vom Heimatstandort Regensburg — 1,5 h über die A93/A92. Anreise meist am Eventtag, bei Frühveranstaltungen am Vortag mit Hotel-Übernachtung (im Tagessatz). Setup für Close-Up: 15 Min. Für Bühnenshows: 60–90 Min inklusive Soundcheck. Im Münchner Stadtgebiet plus Großraum (Starnberg, Tegernsee, Erding, Freising, Garching, Ingolstadt) keine Reisekostenzuschläge.`,
  },
  {
    slug: "nuernberg",
    name: "Nürnberg",
    region: "Bayern",
    intro: "Als Zauberer für Nürnberg arbeite ich in einer der wichtigsten Wirtschaftsregionen Bayerns: Siemens-Erbe, DATEV, GfK, Diehl-Konzern, Schaeffler — Nürnberg ist Industrie- und Tech-Hub. Dazu die NürnbergMesse als Standort vieler internationaler Branchenmessen (Spielwarenmesse, Embedded World, BIOFACH). Ich biete Close-Up Magie, Comedy-Bühnenshow, Magic Dinner und Messe-Standmagie für Firmenfeiern, Hochzeiten und Messen in Nürnberg, Fürth, Erlangen, Schwabach und der gesamten Metropolregion.",
    highlight: "Nürnberg liegt 90 km von Regensburg — Anreise in einer Stunde, kein Übernachtungsbedarf. Über 30 Engagements in der Metropolregion seit 2016. Das spart Tagessatz für euch und Logistik-Stress für mich.",
    einwohner: "520.000",
    bekannteLocations: [
      "Meistersingerhalle",
      "Tafelhalle Nürnberg",
      "NürnbergMesse (Halle 1–12)",
      "Le Méridien Grand Hotel",
      "Hotel Maritim",
      "Historischer Rathaussaal",
      "Z-Bau",
      "Kulturwerkstatt Auf AEG",
      "Loftwerk Nürnberg",
      "Ofenwerk",
      "Schloss Faber-Castell (Stein)",
      "Hotel Schindlerhof",
    ],
    faq: [
      {
        q: "Was kostet ein Zauberer in Nürnberg?",
        a: "Hängt vom Format ab: Close-Up beim Empfang im mittleren dreistelligen Bereich, eine 30-Min-Bühnenshow höher, Kombi-Pakete sind das beste Preis-Leistungs-Verhältnis. Vorteil Nürnberg: nur 90 km aus Regensburg, daher kein Übernachtungs-Aufschlag selbst bei Spätauftritten. Anreise im Tagessatz enthalten.",
      },
      {
        q: "Welche Nürnberger Locations eignen sich für Zauberkunst?",
        a: "Für Bühnenshows: Meistersingerhalle, Tafelhalle, Z-Bau, Kulturwerkstatt Auf AEG. Für Galas: Historischer Rathaussaal, Le Méridien Grand Hotel, Hotel Maritim. Für Close-Up und private Tafeln: Hotel Schindlerhof, Loftwerk, Ofenwerk. Für Hochzeiten: Schloss Faber-Castell in Stein, Burg Wernfels, Burg Rabenstein in Franken.",
      },
      {
        q: "Auftritte auf der NürnbergMesse — wie läuft das?",
        a: "Messe-Magie als eigenes Format (siehe /messe-magier): aktive Besucher-Ansprache am Stand mit Effekten, die Vorbeigehende stoppen, und warmer Übergabe an Sales. Funktioniert besonders gut bei Embedded World, Spielwarenmesse, BIOFACH, IT-SA. Bei mehrtägiger Buchung Tages-Reduktion. Sprache deutsch/englisch je nach Messe-Publikum.",
      },
      {
        q: "Funktioniert das auch für Mittelstand und fränkische Industrie (Siemens, DATEV, Schaeffler)?",
        a: "Genau das ist der Schwerpunkt in der Region. Vor jedem Industrie-Engagement Briefing-Call mit HR oder Marketing: Konzern-Insider, fränkische Tonalität (eher zurückhaltend, kein bayerisches Krachledern), gewünschte Show-Länge. Daraus 2–3 personalisierte Routinen — funktioniert für Siemens-Vorstandsdinner genauso wie für 50-Mann-DATEV-Sommerfest.",
      },
      {
        q: "Wird die Metropolregion abgedeckt (Fürth, Erlangen, Schwabach, Bamberg, Bayreuth)?",
        a: "Ja — Nürnberg + Fürth + Erlangen + Schwabach + Herzogenaurach (Adidas) im Tagessatz ohne Aufpreis. Bamberg, Bayreuth, Coburg, Forchheim, Ansbach liegen weiter (45–90 Min) — möglich mit moderatem Reisezuschlag oder bei Kombi-Buchung im selben Zeitfenster.",
      },
    ],
    seoText: "Zauberer Nürnberg Emilian Leber: Close-Up Magie, Comedy-Bühnenshow, Magic Dinner und Messe-Standmagie für Firmenfeier, Hochzeit und NürnbergMesse in Nürnberg, Fürth, Erlangen, Schwabach und Metropolregion. 5,0 Sterne bei 30+ Bewertungen, über 30 Engagements seit 2016.",
    langText: `Nürnberg ist nach München mein zweitgrößter Bayern-Markt — und der mit der besten Anreise-Logistik. 90 km aus Regensburg, eine Stunde über die A3, kein Übernachtungsbedarf selbst bei Spätauftritten. Das macht Nürnberg planungs-freundlich: Same-Day-Buchungen bei freiem Slot, kurze Kalender-Vorlaufzeiten möglich, weniger Reise-Aufschlag im Tagessatz.

Drei Anlässe, drei Nürnberger Settings. Für fränkische Hochzeiten (klassisch in Schloss Faber-Castell in Stein, im Historischen Rathaussaal oder auf Burg Rabenstein) das Drei-Akt-Modell: Close-Up beim Sektempfang, Tisch-zu-Tisch beim Dinner, Bühnen-Highlight vor dem Tanz. Für Firmenfeiern in der fränkischen Industrie (Siemens-Erbe in Nürnberg, DATEV, GfK, Schaeffler in Herzogenaurach, Adidas in Herzogenaurach, Diehl-Konzern): Walk-Around beim Empfang plus 25–35-Min-Bühne als Höhepunkt. Für Privatanlässe in Nürnberg-Mitte, Erlenstegen oder Erlangen-Süd: Close-Up reicht meist.

NürnbergMesse ist ein eigener Markt. Mit Embedded World, Spielwarenmesse, BIOFACH und IT-SA hat Nürnberg internationale Messen mit Premium-Publikum. Messe-Magie als aktive Stand-Magnet-Strategie (siehe /messe-magier) funktioniert besonders gut bei IT-, Konsumgüter- und Sicherheits-Messen — Effekte die Vorbeigehende stoppen, dann warmer Übergabe an euer Sales-Team. Bei mehrtägiger Buchung Tages-Reduktion.

Fränkische Tonalität ist anders. Franken ist nicht Bayern. Der Humor ist trockener, das Auftreten zurückhaltender, das Krachledern wird hier eher beäugt als bejubelt. Mein Programm passt sich an: weniger Comedy-Pointen vom Münchner-Typ, mehr Mentalmagie mit Substanz, mehr Augen-zwinkern statt Bauchredner-Energie. Wer für Erlanger Tech-Mittelständler oder Herzogenauracher Konzerne arbeitet, weiß: das richtige Maß macht den Unterschied.

Anreise und Logistik. Nürnberg liegt 90 km vom Heimatstandort Regensburg — 1 h über die A3. Same-Day-Anreise problemlos, Übernachtung nicht notwendig (außer bei Auftritten nach Mitternacht). Setup für Close-Up: 15 Min. Für Bühnenshows: 60–90 Min inklusive Soundcheck. In Nürnberg, Fürth, Erlangen, Schwabach, Herzogenaurach keine Reisekostenzuschläge.`,
  },
  {
    slug: "augsburg",
    name: "Augsburg",
    region: "Bayern",
    intro: "Als Zauberer für Augsburg arbeite ich in der ältesten Stadt Bayerns — Fuggerstadt mit starker Wirtschaftsbasis (MAN, KUKA, Fujitsu, Premium-Aerotec, MT Aerospace) und gleichzeitig Universitätsstadt mit lebendiger Event-Kultur. Augsburg liegt verkehrsgünstig zwischen München und Stuttgart, was die Stadt zum Treffpunkt für regionale Firmenfeiern und Mehrtages-Events macht. Ich biete Close-Up Magie, Comedy-Bühnenshow und Magic Dinner für Firmenfeiern, Hochzeiten und exklusive Events in Augsburg und Bayerisch-Schwaben.",
    highlight: "Augsburg-Publikum mag den schwäbischen Premium-Stil: präzise, ohne Glitzer, mit trockenem Humor. Mentalmagie wirkt hier besonders gut, weil sie technisch sauber sein muss.",
    einwohner: "300.000",
    bekannteLocations: [
      "Kongress am Park",
      "Goldener Saal · Rathaus",
      "Hotel Maximilian's",
      "Steigenberger Drei Mohren",
      "Kurhaus Göggingen",
      "Augsburger Puppenkiste (Umfeld)",
      "Schwabenhalle Lechhausen",
      "WWK Arena · Business-Logen",
      "Textilmuseum (TIM)",
      "Diakonissenhaus · Eventbereich",
      "Schloss Bocksberg",
      "Brechthaus-Garten",
    ],
    faq: [
      {
        q: "Was kostet ein Zauberer in Augsburg?",
        a: "Hängt vom Format ab: Close-Up beim Empfang im mittleren dreistelligen Bereich, eine 30-Min-Bühnenshow höher, Kombi-Pakete bringen das beste Preis-Leistungs-Verhältnis. Anreise aus Regensburg (1,5 h über A9/A8) im Tagessatz enthalten — kein Übernachtungs-Aufschlag bei Auftritten vor Mitternacht. Konkretes Angebot nach Briefing-Call.",
      },
      {
        q: "Welche Augsburger Locations eignen sich für Zauberkunst?",
        a: "Für Galas und Bühnenshows: Kongress am Park, Goldener Saal im Rathaus, Kurhaus Göggingen, Schwabenhalle Lechhausen. Für Close-Up und Magic Dinner: Hotel Maximilian's, Steigenberger Drei Mohren, Restaurant Ratskeller Augsburg. Für Hochzeiten: Schloss Bocksberg, Goldener Saal, Brechthaus-Garten, Schaezlerpalais, im Umland Schloss Scherneck.",
      },
      {
        q: "Macht ihr auch Industrie-Events (MAN, KUKA, Fujitsu, Premium-Aerotec)?",
        a: "Ja — Augsburger Industrie ist ein Schwerpunkt. Vor jedem Engagement Briefing-Call mit HR oder Marketing: Konzern-Insider, sensible Themen, schwäbische Tonalität (zurückhaltend, präzise, kein bayerisches Krachledern). Daraus 2-3 personalisierte Mentaleffekte. Für Robotik-/Tech-Konzerne wie KUKA funktioniert Mentalmagie mit Logik-Twist besonders gut.",
      },
      {
        q: "Wird Bayerisch-Schwaben abgedeckt (Friedberg, Königsbrunn, Memmingen, Donauwörth)?",
        a: "Ja — Augsburger Umland und Bayerisch-Schwaben im Tagessatz ohne Aufpreis: Friedberg, Königsbrunn, Stadtbergen, Gersthofen, Neusäß. Memmingen, Donauwörth, Dillingen, Krumbach liegen 30–60 Min weiter — möglich mit moderatem Reisezuschlag oder bei Kombi-Buchungen.",
      },
    ],
    seoText: "Zauberer Augsburg Emilian Leber: Close-Up Magie, Comedy-Zaubershow und Magic Dinner für Firmenfeier, Hochzeit, Industrie-Event (MAN/KUKA/Fujitsu) und Privatfeier in Augsburg und Bayerisch-Schwaben. 5,0 Sterne bei 30+ Bewertungen, über 200 Events seit 2016.",
    langText: `Augsburg ist Bayerns drittgrößte Stadt mit eigenständigem Charakter: schwäbisch-bayerische Mischung, alte Fuggers-Tradition, neue Industrie-Vielfalt (MAN, KUKA, Fujitsu, Premium-Aerotec). Das prägt auch die Event-Kultur — gehobener Anspruch wie in München, aber mit der schwäbischen Zurückhaltung, die Klamauk sofort durchschaut. Wer hier auftritt, muss präzise sein.

Drei Anlässe, drei Augsburger Formate. Für Hochzeiten (klassisch im Goldenen Saal, im Schaezlerpalais oder auf Schloss Bocksberg; entspannt im Brechthaus-Garten) das Drei-Akt-Modell: Close-Up beim Sektempfang, Tisch-zu-Tisch beim Dinner, Bühnen-Highlight vor dem Tanz. Für Firmenfeiern (Industrie wie MAN, KUKA, Fujitsu, Premium-Aerotec, MT Aerospace) der Mix aus Walk-Around beim Empfang plus 25–35-Min-Bühne als Höhepunkt. Für Privatanlässe in Augsburg-Hochfeld, Lechhausen oder Göggingen reicht reines Close-Up.

Industrie-Insider zählen doppelt. Augsburger Industrie ist hochspezialisiert (Robotik, Druckmaschinenbau, Luftfahrt-Komponenten) — Insider-Briefing macht hier besonders viel aus, weil die Branchenrunden klein sind und sich alle kennen. Wenn ein Mentaleffekt eine laufende KUKA-Roboter-Generation oder ein Premium-Aerotec-Bauteil ins Spiel bringt, weiß das Publikum sofort: hier hat sich jemand vorbereitet. Das ändert die Wertschätzung der ganzen Show.

Magic Dinner in Augsburg. Mein Spezialgebiet — Mehrgänge-Abend mit Close-Up-Magie am Tisch — funktioniert in Augsburger Spitzen-Restaurants (Magnolia im Hotel Maximilian's, August im Innenhof, Restaurant Ratskeller, Sartory im Steigenberger) grundsätzlich. Anfrage über das Kontaktformular — bisher als Format im Hauspartner-Restaurant Wald & Wiese in Sinzing etabliert.

Anreise und Logistik. Augsburg liegt 220 km vom Heimatstandort Regensburg — 1,5 h über A9/A8. Same-Day-Anreise möglich, Übernachtung selten nötig. Setup für Close-Up: 15 Min. Für Bühnenshows: 60–90 Min inklusive Soundcheck. In Augsburg und Bayerisch-Schwaben (Friedberg, Königsbrunn, Stadtbergen, Gersthofen, Neusäß) keine Reisekostenzuschläge.`,
  },
  {
    slug: "wuerzburg",
    name: "Würzburg",
    region: "Bayern",
    intro: "Als Zauberer für Würzburg arbeite ich in einer der schönsten Barock-Städte Deutschlands — UNESCO-Weltkulturerbe-Residenz, Wein-Region (Frankenweine), Universitätsstadt und wirtschaftliches Zentrum Unterfrankens mit Konzernen wie König & Bauer, Brose, Vogel Communications, Bosch Rexroth. Ich biete Close-Up Magie, Comedy-Bühnenshow und Magic Dinner für Firmenfeiern, Hochzeiten und exklusive Events in Würzburg und ganz Unterfranken.",
    highlight: "Würzburg-Publikum schätzt zwei Dinge: Eleganz (Residenz-Niveau) und fränkische Echtheit (keine Show-Posen). Mentalmagie funktioniert hier perfekt — präzise, intim, ohne Bauchredner-Lautstärke.",
    einwohner: "130.000",
    bekannteLocations: [
      "Residenz Würzburg (Kaisersaal, Hofgarten)",
      "Vogel Convention Center (VCC)",
      "Congress Centrum Würzburg",
      "Bürgerspital Weinstube",
      "Festung Marienberg",
      "Hotel Rebstock",
      "Hotel Maritim Würzburg",
      "Schloss Steinburg",
      "Schloss Veitshöchheim (Hofgarten)",
      "Posthalle Würzburg",
      "Mozartsaal Hochschule für Musik",
      "Würzburger Weinhäuser (Juliusspital, Staatlicher Hofkeller)",
    ],
    faq: [
      {
        q: "Was kostet ein Zauberer in Würzburg?",
        a: "Hängt vom Format ab: Close-Up beim Empfang im mittleren dreistelligen Bereich, eine 30-Min-Bühnenshow höher, Kombi-Pakete sind das beste Preis-Leistungs-Verhältnis. Anreise aus Regensburg (2,5 h über A3) im Tagessatz enthalten — bei Spätauftritten Übernachtung inklusive. Konkretes Angebot nach Briefing-Call.",
      },
      {
        q: "Welche Würzburger Locations eignen sich für Zauberkunst?",
        a: "Für Galas und Bühnenshows: Residenz (Kaisersaal, Spiegelsaal), Vogel Convention Center, Congress Centrum, Posthalle, Schloss Veitshöchheim. Für Close-Up und Weinprobe-Magic-Dinner: Bürgerspital, Juliusspital, Staatlicher Hofkeller, Hotel Rebstock, Schloss Steinburg. Für Hochzeiten: Residenz-Hofgarten, Festung Marienberg, Schloss Steinburg, Hotel Maritim.",
      },
      {
        q: "Funktioniert das auch bei Weinprobe-Events und Frankenwein-Dinner?",
        a: "Besonders gut. Wein-Verkostung + Close-Up-Magie zwischen den Gängen ist ein perfektes Format-Match: beide brauchen Aufmerksamkeit, beide leben vom geteilten Moment, beide profitieren vom langsamen Rhythmus. In Würzburger Weinhäusern (Juliusspital, Bürgerspital) habe ich Tischmagie als Format-Bridge zwischen Wein-Sequenzen eingesetzt — funktioniert.",
      },
      {
        q: "Wird Unterfranken abgedeckt (Schweinfurt, Aschaffenburg, Bad Kissingen, Kitzingen)?",
        a: "Ja — ganz Unterfranken im Tagessatz ohne Aufpreis: Würzburg, Kitzingen, Ochsenfurt, Veitshöchheim. Schweinfurt (35 km), Aschaffenburg (75 km), Bad Kissingen (60 km) liegen weiter — möglich im Tagessatz bei Verfügbarkeit, sonst moderater Reisezuschlag.",
      },
    ],
    seoText: "Zauberer Würzburg Emilian Leber: Close-Up Magie, Comedy-Bühnenshow, Magic Dinner und Weinprobe-Magie in der Residenz, im Bürgerspital und in unterfränkischen Locations. Für Hochzeit, Firmenfeier (König & Bauer, Brose, Vogel) und Privatfeier. 5,0 Sterne bei 30+ Bewertungen.",
    langText: `Würzburg verbindet zwei Welten: UNESCO-Weltkulturerbe-Eleganz (Residenz, Hofgarten, Festung Marienberg) und solide unterfränkische Wirtschaftskraft (König & Bauer, Brose, Vogel Communications, Bosch Rexroth). Das Würzburger Publikum will Premium-Entertainment, das beides ehrt: stilvolle Tonalität, aber keine Show-Pose. Mentalmagie und präzise Karten-Magie funktionieren hier perfekt.

Drei Anlässe, drei Würzburger Settings. Für Hochzeiten in der Residenz, im Hofgarten Veitshöchheim, in Schloss Steinburg oder Festung Marienberg das Drei-Akt-Modell: Close-Up beim Sektempfang, Tisch-zu-Tisch beim Dinner, Bühnen-Highlight vor dem Tanz. Für Firmenfeiern (König & Bauer-Mitarbeiter-Events, Vogel-Verlag-Jubiläen, Bosch-Rexroth-Standort-Feiern, Brose-Tagungen) der Mix aus Walk-Around plus 25–35-Min-Bühne. Für Privatanlässe in Würzburg-Mitte, Sanderau oder Grombühl reines Close-Up reicht meist.

Wein-Region als eigener Markt. Würzburg ist das Zentrum des Frankenweins — Bürgerspital, Juliusspital, Staatlicher Hofkeller sind Top-Adressen. Wein-Verkostungs-Events mit eingebauter Close-Up-Magie sind ein eigener Markt: Wein und Magie teilen denselben Pace (langsam, präzise, geteilter Moment), und der Wechsel zwischen Verkostungs-Sequenz und Tischmagie-Routine hält die Aufmerksamkeit hoch. Habe ich mehrfach gemacht, würde ich jederzeit wieder empfehlen.

Magic Dinner in Würzburg. Mein Spezialgebiet (Mehrgänge-Abend mit Close-Up-Magie am Tisch) passt zu Würzburg besonders gut, weil das fränkische Verständnis von [Essen mit Würde] und der Weinpace zur Magie-Tonalität passt. Würzburger Sterne-Restaurants und Top-Hotel-Restaurants sind interessant — Anfrage über das Kontaktformular.

Anreise und Logistik. Würzburg liegt 280 km vom Heimatstandort Regensburg — 2,5 h über A3. Anreise am Vor- oder Eventtag früh; bei Spätauftritten Übernachtung in einem Würzburger Hotel (im Tagessatz, typischerweise Maritim oder Rebstock). Setup für Close-Up: 15 Min. Für Bühnenshows: 60–90 Min. In Würzburg und direkter Umgebung keine Reisekostenzuschläge.`,
  },
  {
    slug: "ingolstadt",
    name: "Ingolstadt",
    region: "Bayern",
    intro: "Als Zauberer für Ingolstadt arbeite ich in der Audi-Heimatstadt — Automotive-Hochburg mit Konzern-HQ, Zulieferer-Cluster (Conti, Schaeffler-Werk, Faurecia-Umfeld), MediaMarktSaturn-Konzernsitz und Universitätsstadt mit aufstrebender Tech-Szene. Ingolstadt liegt 80 km von Regensburg — sehr gute Anreise-Logistik. Ich biete Close-Up Magie, Comedy-Bühnenshow und Magic Dinner für Firmenfeiern, Hochzeiten und private Anlässe in Ingolstadt und der Region Donau-Altmühl.",
    highlight: "Ingolstadt-Publikum ist Audi-trainiert: Qualitätsanspruch hoch, Toleranz für Show-Klischees niedrig. Wer hier präzise und ohne Effekthascherei liefert, gewinnt. Mentalmagie statt Bauchredner.",
    einwohner: "140.000",
    bekannteLocations: [
      "Audi Forum Ingolstadt",
      "Stadttheater Ingolstadt",
      "Klenzepark · Festbereich",
      "Saturn Arena · Business-Logen",
      "Maritim Hotel Ingolstadt",
      "Bayerischer Hof Ingolstadt",
      "Hotel Ammerland",
      "Schloss Ingolstadt · Bayerisches Armeemuseum",
      "Festsaal Neues Schloss",
      "Eventhalle Westpark",
      "Konzertsaal Ingolstadt Village",
      "Schloss Sandersdorf-Brehna (Region)",
    ],
    faq: [
      {
        q: "Tritt der Zauberer auch bei Audi-Events auf?",
        a: "Ja — Audi und Automobilzulieferer sind ein Schwerpunkt. Vor jedem Engagement Briefing-Call mit HR oder Marketing: Modell-Insider, sensible Themen, gewünschte Tonalität (klassisch Premium oder lockerer für Mitarbeiter-Sommerfest). Daraus 2–3 personalisierte Mentaleffekte. Diskretion ist Standard — was im Briefing besprochen wird, bleibt im Briefing.",
      },
      {
        q: "Was kostet ein Zauberer in Ingolstadt?",
        a: "Hängt vom Format ab: Close-Up beim Empfang im mittleren dreistelligen Bereich, eine 30-Min-Bühnenshow höher, Kombi-Pakete sind das beste Preis-Leistungs-Verhältnis. Anreise aus Regensburg (1 h über A93) im Tagessatz enthalten — kein Übernachtungs-Aufschlag selbst bei späten Auftritten.",
      },
      {
        q: "Welche Ingolstädter Locations eignen sich für Zauberkunst?",
        a: "Für Galas und Bühnenshows: Audi Forum, Stadttheater, Saturn Arena Business-Logen, Eventhalle Westpark. Für Close-Up und Magic Dinner: Maritim Hotel, Bayerischer Hof, Hotel Ammerland. Für Hochzeiten: Schloss Ingolstadt, Festsaal Neues Schloss, Klenzepark im Sommer, Region Schlösser (Sandersdorf-Brehna).",
      },
      {
        q: "Wird die Region abgedeckt (Eichstätt, Pfaffenhofen, Neuburg, Manching)?",
        a: "Ja — Ingolstadt + direkter Großraum im Tagessatz ohne Aufpreis: Eichstätt, Pfaffenhofen, Neuburg an der Donau, Manching, Reichertshofen. Da Ingolstadt zwischen Regensburg und München liegt, sind auch Kombi-Buchungen mit anderen Städten in der Region effizient.",
      },
    ],
    seoText: "Zauberer Ingolstadt Emilian Leber: Close-Up Magie, Comedy-Bühnenshow und Magic Dinner für Audi-Events, Automobilzulieferer-Firmenfeiern, Hochzeit und Privatfeier in Ingolstadt und Region (Eichstätt, Pfaffenhofen, Neuburg, Manching). 5,0 Sterne bei 30+ Bewertungen.",
    langText: `Ingolstadt ist Audi-Land. Der Konzern prägt nicht nur die Wirtschaft, sondern auch die Erwartungshaltung an Premium-Entertainment in der Stadt. Wer im Audi-Umfeld auftritt (oder bei einem der vielen Zulieferer wie Conti, Schaeffler, Faurecia oder auch bei MediaMarktSaturn als zweitem großen Arbeitgeber), spricht zu einem Publikum, das täglich mit Qualitätsstandards arbeitet. Show-Klischees fallen hier sofort auf. Was funktioniert: technische Präzision, Mentalmagie mit Logik-Twist, Eleganz ohne Pose.

Drei Anlässe, drei Ingolstädter Formate. Für Hochzeiten (klassisch im Schloss Ingolstadt, im Festsaal Neues Schloss oder im Klenzepark-Pavillon) das Drei-Akt-Modell: Close-Up beim Sektempfang, Tisch-zu-Tisch beim Dinner, Bühnen-Highlight vor dem Tanz. Für Firmenfeiern bei Audi und Zulieferern: Walk-Around beim Empfang plus 25–35-Min-Bühne als Höhepunkt zwischen Vorstandsrede und Buffet. Für Privatanlässe in Mailing, Friedrichshofen oder Etting reicht reines Close-Up.

Automotive-Insider zählen. Vor jedem Audi- oder Zulieferer-Event Briefing-Call. Themen: aktuelles Modell-Portfolio, intern besprochene Herausforderungen (die NICHT in Pointen vorkommen sollen), interne Running-Gags, vielleicht der Werkstor-Wachmann der seit 20 Jahren dort steht. Diese Insider fließen in 2-3 personalisierte Mentaleffekte ein — die Show wirkt dann maßgeschneidert, nicht von der Stange. Diskretion ist Standard.

Magic Dinner in Ingolstadt. Mein Spezialgebiet (Mehrgänge-Abend mit Close-Up-Magie am Tisch) ist in Ingolstädter Premium-Restaurants und im Restaurant Genusswerkstatt im Audi Forum grundsätzlich machbar — bisher als Format vor allem im Hauspartner-Restaurant Wald & Wiese in Sinzing (40 Min entfernt) etabliert. Für ein Ingolstädter Magic Dinner: Anfrage über das Kontaktformular.

Anreise und Logistik. Ingolstadt liegt 80 km vom Heimatstandort Regensburg — 1 h über die A93. Same-Day-Anreise problemlos, kein Übernachtungsbedarf. Setup für Close-Up: 15 Min. Für Bühnenshows: 60–90 Min inklusive Soundcheck. In Ingolstadt, Eichstätt, Pfaffenhofen, Neuburg und Manching keine Reisekostenzuschläge. Da Ingolstadt zwischen Regensburg und München liegt, sind Kombi-Buchungen (z.B. Vormittag Audi, Abend München-Event) effizient möglich.`,
  },
  {
    slug: "passau",
    name: "Passau",
    region: "Bayern",
    intro: "Die Dreiflüssestadt Passau bietet einzigartige Locations für Events, die mit moderner Magie gekrönt werden. Als Zauberer für Passau bringe ich Close-Up Magie und Bühnenshow an den Zusammenfluss von Donau, Inn und Ilz.",
    highlight: "Passau liegt nur eine Stunde von Regensburg entfernt — perfekte Erreichbarkeit für dein Event in Niederbayern.",
    einwohner: "53.000",
    bekannteLocations: ["Redoute Passau", "Dreiländerhalle", "Veste Oberhaus", "Hotel Wilder Mann", "Universität Passau"],
    faq: [
      { q: "Was kostet ein Zauberer in Passau?", a: "Ich erstelle dir gerne ein individuelles Angebot — kostenlos und unverbindlich. Die Anfahrt nach Passau ist im Preis inbegriffen." },
      { q: "Tritt der Zauberer auch in Österreich auf?", a: "Ja! Von Passau aus bin ich schnell in Linz, Salzburg und Wien — ich trete regelmäßig auch in Österreich auf." },
    ],
    seoText: "Zauberer Passau: Emilian Leber ist dein Entertainer für Events in Passau und Niederbayern. Professionelle Zaubershow und Close-Up Magie für Firmenfeiern, Hochzeiten und besondere Anlässe in der Dreiflüssestadt.",
    langText: `Passau — die malerische Dreiflüssestadt an Donau, Inn und Ilz. Als Zauberer für Passau bringe ich moderne Magie in eine der schönsten Städte Deutschlands. Von Firmenfeiern in der Dreiländerhalle bis zu Hochzeiten auf der Veste Oberhaus.

Passaus einzigartiges Flair aus Geschichte, Wasser und Kultur macht jedes Event besonders. Als Zauberkünstler für Passau schaffe ich Momente, die zu dieser einzigartigen Kulisse passen — überraschend, interaktiv und stimmungsvoll.

Kosten Zauberer Passau: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot.`,
  },
  {
    slug: "landshut",
    name: "Landshut",
    region: "Bayern",
    intro: "Landshut — die Stadt der Landshuter Hochzeit — verdient Magie, die begeistert. Als Zauberer für Landshut bringe ich modernes Entertainment zu Firmenfeiern, Hochzeiten und Geburtstagen in der niederbayerischen Hauptstadt.",
    highlight: "Landshut ist nur 45 Minuten von Regensburg entfernt. Die historische Altstadt bietet traumhafte Kulissen für magische Events.",
    einwohner: "75.000",
    bekannteLocations: ["Bernlochner", "Burg Trausnitz", "Rathaus Landshut", "Sparkassen Arena", "Gasthaus zum Erdinger Weißbräu"],
    faq: [
      { q: "Was kostet ein Zauberer in Landshut?", a: "Die Kosten variieren je nach Format und Eventgröße. Kontaktiere mich für ein kostenloses Angebot." },
      { q: "Tritt der Zauberer auch auf der Landshuter Hochzeit auf?", a: "Mittelalterliche Feste und historische Events sind ein besonderes Highlight — ich passe mein Programm gerne an den Rahmen an." },
    ],
    seoText: "Zauberer Landshut: Emilian Leber begeistert als Zauberkünstler auf Events in Landshut. Close-Up Magie, Bühnenshow und Comedy-Zaubershow für Firmenfeiern, Hochzeiten und Geburtstage in Niederbayern.",
    langText: `Landshut — die historische Hauptstadt Niederbayerns mit Burg Trausnitz und dem prachtvollen Rathaussaal. Als Zauberer für Landshut bringe ich moderne Magie in die Herzogstadt — für Firmenfeiern, Hochzeiten und besondere Anlässe.

Die historischen Locations in Landshut bieten eine traumhafte Kulisse für Events, die in Erinnerung bleiben. Mein Programm passt sich dem besonderen Ambiente an — ob elegante Gala auf der Burg oder lebhafte Firmenfeier im Bernlochner.

Preise Zauberer Landshut: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot.`,
  },
  {
    slug: "bamberg",
    name: "Bamberg",
    region: "Bayern",
    intro: "Bamberg — UNESCO-Welterbestadt und Bierhauptstadt Frankens — bietet den perfekten Rahmen für magische Events. Als Zauberer für Bamberg bringe ich moderne Zauberkunst in historische Gewölbe, Brauereien und elegante Eventlocations.",
    highlight: "Bambergs einzigartiges Flair aus Geschichte, Kultur und fränkischer Lebensfreude macht jedes Event besonders — Magie verstärkt das noch.",
    einwohner: "78.000",
    bekannteLocations: ["Konzert- und Kongresshalle", "Alte Mälzerei Bamberg", "Böttingerhaus", "Welcome Hotel Residenzschloss", "Brose Arena"],
    faq: [
      { q: "Was kostet ein Zauberer in Bamberg?", a: "Ich erstelle dir ein individuelles Angebot basierend auf Format und Dauer — die Beratung ist kostenlos." },
      { q: "Eignet sich ein Zauberer für eine Brauereiführung oder ein Bierfest?", a: "Absolut! Close-Up Magie passt perfekt zu geselligen Anlässen — ich sorge für Staunen zwischen den Bierkrügen." },
    ],
    seoText: "Zauberer Bamberg: Emilian Leber ist dein Zauberkünstler für Events in Bamberg und Oberfranken. Professionelle Zaubershow und Close-Up Magie für Firmenfeiern, Hochzeiten und besondere Anlässe in der Welterbestadt.",
    langText: `Bamberg — UNESCO-Welterbestadt, Bierhauptstadt Frankens und eine der schönsten Städte Deutschlands. Als Zauberer für Bamberg bringe ich moderne Magie in historische Gewölbe und elegante Eventlocations der oberfränkischen Kaiserstadt.

Von Brauereiführungen mit Zauberei-Einlagen über Firmenfeiern in der Konzert- und Kongresshalle bis zu Hochzeiten im Böttingerhaus — Bamberg bietet einzigartige Locations, die durch professionelle Zauberkunst noch unvergesslicher werden.

Kosten Zauberer Bamberg: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot.`,
  },
  {
    slug: "bayreuth",
    name: "Bayreuth",
    region: "Bayern",
    intro: "Bayreuth — die Stadt Richard Wagners — steht für Kultur auf höchstem Niveau. Als Zauberer für Bayreuth liefere ich Entertainment, das diesem Anspruch gerecht wird. Von der Firmenfeier bis zur Gala im Festspielhaus-Umfeld.",
    highlight: "Bayreuth verbindet Kultur und Wirtschaft — die perfekte Bühne für professionelle Zauberkunst, die begeistert und verbindet.",
    einwohner: "75.000",
    bekannteLocations: ["Stadthalle Bayreuth", "Eremitage", "Festspielhaus (Umfeld)", "Maisel's Bier-Erlebnis-Welt", "Schloss Fantasie"],
    faq: [
      { q: "Was kostet ein Zauberer in Bayreuth?", a: "Die Kosten richten sich nach Art des Events. Kontaktiere mich für eine kostenlose Beratung und ein individuelles Angebot." },
      { q: "Kann der Zauberer auch im Rahmen der Festspiele auftreten?", a: "Side-Events und Rahmenprogramme rund um die Festspiele sind eine großartige Gelegenheit — ich passe mein Programm gerne an." },
    ],
    seoText: "Zauberer Bayreuth: Emilian Leber begeistert als professioneller Entertainer auf Events in Bayreuth und Oberfranken. Moderne Zauberkunst für Firmenfeiern, Galas, Hochzeiten und kulturelle Events.",
    langText: `Bayreuth — die Weltkulturhauptstadt des Wagnererbes und eine Stadt, die Kultur auf höchstem Niveau lebt. Als Zauberer für Bayreuth liefere ich Entertainment, das diesem kulturellen Anspruch gerecht wird — professionell, stilsicher und unvergesslich.

Firmenfeiern in der Stadthalle Bayreuth, Side-Events rund um die Festspiele oder elegante Galas in der Eremitage — das anspruchsvolle Bayreuther Publikum verdient Entertainment auf Top-Niveau.

Preise Zauberer Bayreuth: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot.`,
  },
  {
    slug: "erlangen",
    name: "Erlangen",
    region: "Bayern",
    intro: "Erlangen — Siemens-Stadt, Universitätsstadt und Innovationsstandort. Als Zauberer für Erlangen bringe ich moderne Magie zu Corporate Events, Firmenfeiern und privaten Feiern in der Wissenschaftsstadt Mittelfrankens.",
    highlight: "Erlangen ist geprägt von Innovation und Forschung — moderne Zauberkunst passt perfekt zu diesem Spirit.",
    einwohner: "115.000",
    bekannteLocations: ["Heinrich-Lades-Halle", "E-Werk Erlangen", "Siemens Campus", "Orangerie Erlangen", "Redoutensaal"],
    faq: [
      { q: "Tritt der Zauberer auch bei Siemens-Events auf?", a: "Ja, Corporate Events für Technologieunternehmen sind einer meiner Schwerpunkte. Ich habe Erfahrung mit Events in professionellem B2B-Umfeld." },
      { q: "Was kostet ein Zauberer in Erlangen?", a: "Die Kosten hängen vom Format ab. Ich berate dich gerne kostenlos und erstelle ein individuelles Angebot." },
    ],
    seoText: "Zauberer Erlangen: Emilian Leber ist dein Zauberkünstler für Events in Erlangen. Professionelle Close-Up Magie und Bühnenshow für Firmenfeiern, Siemens-Events, Hochzeiten und Geburtstage in der Wissenschaftsstadt.",
    langText: `Erlangen — Siemens-Heimat, Universitätsstadt und Innovationszentrum Mittelfrankens. Als Zauberer für Erlangen verbinde ich technologische Präzision mit kreativer Magie — passend zu einer Stadt, die Innovation in der DNA trägt.

Corporate Events im Siemens Campus, Weihnachtsfeiern für Technologieunternehmen oder Hochzeiten in der historischen Orangerie — ich entwickle für jede Veranstaltung das optimale Showkonzept.

Kosten Zauberer Erlangen: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot.`,
  },
  {
    slug: "fuerth",
    name: "Fürth",
    region: "Bayern",
    intro: "Fürth — die Kleeblattstadt direkt neben Nürnberg — bietet mit ihren historischen Locations und modernen Eventspaces den perfekten Rahmen für magische Unterhaltung. Als Zauberer für Fürth bin ich schnell vor Ort.",
    highlight: "Fürth und Nürnberg bilden zusammen einen der stärksten Eventstandorte Bayerns — ich bediene beide Städte regelmäßig.",
    einwohner: "130.000",
    bekannteLocations: ["Stadthalle Fürth", "Kulturforum", "Grüner Brauhaus", "Schloss Burgfarrnbach", "Rundfunkmuseum"],
    faq: [
      { q: "Was kostet ein Zauberer in Fürth?", a: "Ich erstelle dir gerne ein individuelles Angebot — die Beratung ist kostenlos und unverbindlich." },
      { q: "Kann der Zauberer auch in der Metropolregion Nürnberg auftreten?", a: "Selbstverständlich! Ich trete in Fürth, Nürnberg, Erlangen und der gesamten Metropolregion auf." },
    ],
    seoText: "Zauberer Fürth: Emilian Leber begeistert als Entertainer auf Events in Fürth und der Metropolregion Nürnberg. Zaubershow, Close-Up Magie und Comedy für Firmenfeiern, Hochzeiten und Geburtstage.",
    langText: `Fürth — die Kleeblattstadt direkt neben Nürnberg, mit eigenem Charakter und einer lebendigen Eventszene. Als Zauberer für Fürth bin ich schnell vor Ort und kenne die lokalen Locations bestens — von der Stadthalle über das Kulturforum bis zu historischen Locations im Stadtpark.

Firmenfeiern in Fürth, Hochzeiten in Schloss Burgfarrnbach oder Geburtstage im Grünen Brauhaus — ich passe mein Programm immer dem Ort und dem Publikum an. Moderner Zauberkünstler-Stil, der begeistert und unterhält.

Preise Zauberer Fürth: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot.`,
  },
  {
    slug: "rosenheim",
    name: "Rosenheim",
    region: "Bayern",
    intro: "Rosenheim — das Tor zum Chiemgau — verbindet oberbayerische Gemütlichkeit mit modernem Eventflair. Als Zauberer für Rosenheim bringe ich professionelle Magie zu Firmenfeiern, Hochzeiten und besonderen Anlässen zwischen Inn und Alpen.",
    highlight: "Rosenheim und das Chiemgau bieten traumhafte Event-Locations — von der Almhütte bis zum modernen Kongresszentrum.",
    einwohner: "65.000",
    bekannteLocations: ["Kultur + Kongress Zentrum", "Inntalhalle", "AuerBräu", "Gasthof Höhenberg", "Schloss Maxlrain"],
    faq: [
      { q: "Was kostet ein Zauberer in Rosenheim?", a: "Die Kosten variieren je nach Format. Kontaktiere mich für ein kostenloses Angebot — Anfahrt nach Rosenheim ist inklusive." },
      { q: "Tritt der Zauberer auch am Chiemsee auf?", a: "Ja! Events am Chiemsee, in Prien, auf der Herreninsel oder im gesamten Chiemgau gehören zu meinem Einzugsgebiet." },
    ],
    seoText: "Zauberer Rosenheim: Emilian Leber ist dein Zauberkünstler für Events in Rosenheim und dem Chiemgau. Close-Up Magie, Bühnenshow und Magic Dinner für Firmenfeiern, Hochzeiten und Geburtstage in Oberbayern.",
    langText: `Rosenheim — das Tor zum Chiemgau, eingebettet zwischen Inn und Alpen. Als Zauberer für Rosenheim bringe ich modernes Entertainment in eine Stadt, die oberbayerische Gemütlichkeit mit starker Wirtschaft verbindet.

Von der Inntalhalle über das Kultur + Kongress Zentrum bis zu rustikalen Almhütten im Chiemgau — die Region bietet außergewöhnliche Event-Locations, die durch professionelle Zauberkunst noch unvergesslicher werden.

Kosten Zauberer Rosenheim: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot.`,
  },
  {
    slug: "straubing",
    name: "Straubing",
    region: "Bayern",
    intro: "Straubing — die Gäuboden-Metropole — ist bekannt für das Gäubodenvolksfest und eine lebendige Eventszene. Als Zauberer für Straubing bringe ich moderne Magie in die niederbayerische Stadt an der Donau.",
    highlight: "Straubing liegt nur 40 Minuten von Regensburg entfernt — kurze Wege und schnelle Verfügbarkeit für dein Event.",
    einwohner: "48.000",
    bekannteLocations: ["Joseph-von-Fraunhofer-Halle", "Rathaussaal Straubing", "Herzogschloss", "Hotel Asam", "TUM Campus Straubing"],
    faq: [
      { q: "Was kostet ein Zauberer in Straubing?", a: "Ich erstelle dir gerne ein individuelles Angebot — die Beratung ist kostenlos und die Anfahrt nach Straubing ist inklusive." },
      { q: "Tritt der Zauberer auch beim Gäubodenvolksfest auf?", a: "Side-Events und VIP-Zelte auf dem Volksfest sind eine großartige Gelegenheit — ich bin gerne dabei!" },
    ],
    seoText: "Zauberer Straubing: Emilian Leber begeistert als Zauberkünstler auf Events in Straubing und dem Gäuboden. Close-Up Magie und Bühnenshow für Firmenfeiern, Hochzeiten und Feste in Niederbayern.",
    langText: `Straubing — Gäuboden-Metropole und Heimat des berühmten Gäubodenvolksfestes. Als Zauberer für Straubing bringe ich moderne Magie in die niederbayerische Donaustadt — nur 40 Minuten von Regensburg, mit kurzen Wegen und voller Verfügbarkeit.

Von Firmenevents in der Fraunhofer-Halle über Hochzeiten im Hotel Asam bis zu Side-Events beim Volksfest — Straubing bietet vielfältige Eventmöglichkeiten, für die ich das passende Programm entwickle.

Preise Zauberer Straubing: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot.`,
  },
  {
    slug: "freising",
    name: "Freising",
    region: "Bayern",
    intro: "Freising — die älteste Stadt an der Isar und direkt am Münchner Flughafen gelegen — ist ein idealer Standort für Events mit internationalem Flair. Als Zauberer für Freising bringe ich professionelle Magie zu Firmenfeiern, Hochzeiten und Galas.",
    highlight: "Direkt am Flughafen München gelegen, ist Freising perfekt für internationale Events und Konferenzen — Magie überwindet jede Sprachbarriere.",
    einwohner: "50.000",
    bekannteLocations: ["Luitpoldhalle", "Domberg Freising", "Weihenstephan Bräustüberl", "Novotel München Airport", "Hilton Munich Airport"],
    faq: [
      { q: "Was kostet ein Zauberer in Freising?", a: "Die Kosten richten sich nach Art des Events. Kontaktiere mich für ein kostenloses Angebot." },
      { q: "Tritt der Zauberer auch bei Flughafen-Events auf?", a: "Ja! Events am Münchner Flughafen, Konferenzen und internationale Galas gehören zu meinem Repertoire." },
    ],
    seoText: "Zauberer Freising: Emilian Leber ist dein Zauberkünstler für Events in Freising und am Münchner Flughafen. Professionelle Zaubershow für Firmenfeiern, Konferenzen und Hochzeiten.",
    langText: `Freising — die älteste Stadt an der Isar, direkt am Münchner Flughafen und mit dem weltbekannten Weihenstephan. Als Zauberer für Freising bringe ich professionelles Entertainment zu Firmenfeiern, Konferenzen und Galas in unmittelbarer Flughafennähe.

Events am Münchner Flughafen, internationale Konferenzen in den Flughafenhotels oder Hochzeiten am historischen Domberg — Freising bietet eine einzigartige Mischung aus internationaler Erreichbarkeit und bayerischem Charme.

Kosten Zauberer Freising: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot.`,
  },
  {
    slug: "amberg",
    name: "Amberg",
    region: "Bayern",
    intro: "Amberg — das Herz der Oberpfalz mit über 1000 Jahren Stadtgeschichte. Als Zauberer für Amberg bringe ich Close-Up Magie, Bühnenshow und Magic Dinner in historische Locations und moderne Eventhallen der Kurfürstenstadt.",
    highlight: "Amberg ist Oberpfälzer Kulturmetropole und nur eine Stunde von Regensburg entfernt — kurze Wege, volle Verfügbarkeit, echte Lokal-Kenntnis.",
    einwohner: "42.000",
    bekannteLocations: ["Stadttheater Amberg", "Congress Centrum Amberg (ACC)", "Stadthalle Amberg", "Maltesergebäude", "Hotel Drahthammer Schlößl"],
    faq: [
      { q: "Was kostet ein Zauberer in Amberg?", a: "Die Preise hängen von Format und Dauer ab. Individuelles Angebot kostenlos und unverbindlich auf Anfrage." },
      { q: "Tritt der Zauberer auch im ACC Amberg auf?", a: "Ja, das Congress Centrum Amberg und andere Eventlocations in der Stadt gehören zu meinem regulären Einsatzgebiet. Ich kenne die Räume und passe das Programm an." },
    ],
    seoText: "Zauberer Amberg: Emilian Leber begeistert als Zauberkünstler auf Events in Amberg und der Oberpfalz. Hochzeit, Firmenfeier, Geburtstag — Close-Up, Bühnenshow und Magic Dinner mit modernem Stil.",
    langText: `Als Zauberer für Amberg bin ich in der Oberpfalz zuhause — Regensburg ist nur eine Autostunde entfernt, was kurze Anfahrtswege und volle Verfügbarkeit bedeutet. Ob Firmenfeier im Congress Centrum Amberg, Hochzeit in einer der historischen Altstadt-Locations oder Geburtstag im Hotel — ich liefere das passende Format.

Amberg ist eine Stadt mit reicher Geschichte und lebendiger Eventkultur. Das Stadttheater, das Maltesergebäude und die zahlreichen historischen Säle bieten einzigartige Rahmen für besondere Anlässe — und professionelle Zauberkunst setzt das Highlight.

Kosten Zauberer Amberg: Pakete ab 395 €, Anfahrt aus Regensburg ist im Angebot inklusive.`,
  },
  {
    slug: "weiden-in-der-oberpfalz",
    name: "Weiden in der Oberpfalz",
    region: "Bayern",
    intro: "Weiden — die Stadt des Glases, ein wichtiger Wirtschafts- und Kulturstandort in der nördlichen Oberpfalz. Als Zauberer für Weiden bringe ich moderne Zauberkunst zu Firmenfeiern, Hochzeiten und Galas in Stadt und Region.",
    highlight: "Weiden ist Wirtschaftsmetropole der nördlichen Oberpfalz — starke Industrie, lebendiges Kulturleben und ideale Bedingungen für Corporate Events.",
    einwohner: "42.000",
    bekannteLocations: ["Max-Reger-Halle Weiden", "Stadttheater Weiden", "Neue Welt", "Hotel Admira", "Stadthalle"],
    faq: [
      { q: "Was kostet ein Zauberer in Weiden?", a: "Die Preise variieren je nach Format und Dauer. Anfrage kostenlos und unverbindlich, individuelles Angebot innerhalb 24 Stunden." },
      { q: "Eignet sich ein Zauberer für eine Weihnachtsfeier in Weiden?", a: "Sehr gut — Weihnachtsfeiern für Weidener Unternehmen sind einer meiner häufigsten Einsätze in der Region. Tonalität immer auf die Unternehmenskultur abgestimmt." },
    ],
    seoText: "Zauberer Weiden in der Oberpfalz: Emilian Leber bringt Close-Up Magie und Bühnenshow zu Firmenfeiern, Hochzeiten und Galas in Weiden und der nördlichen Oberpfalz.",
    langText: `Als Zauberer für Weiden in der Oberpfalz bediene ich Industrie, Mittelstand und Privatkunden in einer der wichtigsten Wirtschaftsstädte Ostbayerns. Vom Sommerfest großer Weidener Industriebetriebe bis zur Hochzeit in historischen Altstadt-Locations — ich liefere das passende Konzept für jeden Anlass.

Weiden ist über Regensburg in rund 90 Minuten erreichbar, was kurze Wege und kurze Reaktionszeiten bedeutet. Auch Events in Tirschenreuth, Marktredwitz oder Vohenstrauß betreue ich gerne mit.

Kosten Zauberer Weiden: Pakete ab 395 €, Anfahrt inklusive. Kontaktiere mich für ein kostenloses Beratungsgespräch.`,
  },
  {
    slug: "deggendorf",
    name: "Deggendorf",
    region: "Bayern",
    intro: "Deggendorf — das Tor zum Bayerischen Wald an der Donau. Als Zauberer für Deggendorf bringe ich Close-Up Magie, Bühnenshow und Magic Dinner zu Hochzeiten, Firmenfeiern und Galas in Niederbayern.",
    highlight: "Deggendorf ist Hochschulstadt, Wirtschaftszentrum und Eingangstor zum Bayerischen Wald — perfekte Mischung aus Tradition und moderner Eventkultur.",
    einwohner: "33.000",
    bekannteLocations: ["Stadthalle Deggendorf", "Donau-Wald-Halle", "Hotel Deggenhof", "Eventhotel Pullman City Nähe", "Kapuzinerstadl"],
    faq: [
      { q: "Was kostet ein Zauberer in Deggendorf?", a: "Die Preise hängen von Format und Dauer ab. Anfahrt von Regensburg ca. 40 Minuten, im Angebot inklusive. Individuelles Angebot auf Anfrage." },
      { q: "Tritt der Zauberer auch in Locations im Bayerischen Wald auf?", a: "Ja, Hochzeiten in Hotels und Schlossanlagen im Bayerischen Wald betreue ich regelmäßig — Anfahrt nach Deggendorf und Umgebung ist im Angebot kalkuliert." },
    ],
    seoText: "Zauberer Deggendorf: Emilian Leber bringt Close-Up Magie und Bühnenshow zu Events in Deggendorf, im Bayerischen Wald und in Niederbayern.",
    langText: `Als Zauberer für Deggendorf bin ich regelmäßig in Niederbayern unterwegs. Die Donaustadt ist nur 40 Minuten von Regensburg entfernt — kurze Wege, volle Verfügbarkeit. Von der Werksfeier in der Stadthalle bis zur Hochzeit im Hotel mit Donaublick — ich liefere das passende Showkonzept.

Deggendorf ist außerdem Eingangstor zum Bayerischen Wald — eine Region mit zahlreichen Hochzeits-Locations in Hotels, Schlossanlagen und auf dem Land. Auch hier bin ich als Zauberer für Deggendorf und Umgebung schnell vor Ort.

Kosten Zauberer Deggendorf: Pakete ab 395 €, Anfahrt aus Regensburg inklusive.`,
  },
  {
    slug: "erding",
    name: "Erding",
    region: "Bayern",
    intro: "Erding — Therme-Stadt nahe München und Flughafen-Standort. Als Zauberer für Erding bringe ich Close-Up Magie, Bühnenshow und Magic Dinner zu Firmenfeiern, Hochzeiten und Galas im Münchner Norden.",
    highlight: "Erding liegt zwischen München und Flughafen — perfekt für Corporate Events mit internationalen Gästen und Hochzeiten mit Therme-Anschluss.",
    einwohner: "37.000",
    bekannteLocations: ["Stadthalle Erding", "Therme Erding (Eventbereich)", "Hotel Mercure Erding", "Erdinger Brauerei (Veranstaltungsbereich)", "Sixtkeller"],
    faq: [
      { q: "Was kostet ein Zauberer in Erding?", a: "Die Preise hängen vom Format ab. Anfahrt aus Regensburg ca. 1,5 Stunden, im Angebot inklusive. Kostenloses Angebot auf Anfrage." },
      { q: "Tritt der Zauberer bei Brauerei-Events in Erding auf?", a: "Ja, Brauerei-Events, Sommerfeste und Firmenfeiern in Erding gehören zu meinem Repertoire. Bayerische Tonalität, modernes Entertainment." },
    ],
    seoText: "Zauberer Erding: Emilian Leber bringt Close-Up Magie und Bühnenshow zu Firmenfeiern, Hochzeiten und Galas in Erding und im Münchner Norden.",
    langText: `Erding ist Therme-Stadt und Flughafen-Standort — eine Kombination, die Erding zum interessanten Eventort macht. Als Zauberer für Erding bringe ich modernes Entertainment zu Firmenfeiern, Hochzeiten und Galas in der wachsenden Stadt im Münchner Norden.

Von der Stadthalle Erding über die Erdinger Brauerei mit ihren Veranstaltungsräumen bis zu Hochzeits-Hotels in Flughafennähe — Erding bietet vielfältige Möglichkeiten. Ich liefere das passende Showkonzept.

Kosten Zauberer Erding: Pakete ab 395 €, Anfahrt aus Regensburg inklusive.`,
  },
  {
    slug: "kelheim",
    name: "Kelheim",
    region: "Bayern",
    intro: "Kelheim — Donau-Altmühl-Stadt mit der weithin sichtbaren Befreiungshalle. Als Zauberer für Kelheim bringe ich Close-Up Magie und Bühnenshow zu Hochzeiten, Firmenfeiern und Galas im Naturpark Altmühltal.",
    highlight: "Kelheim liegt am Zusammenfluss von Donau und Altmühl — historisch reich, landschaftlich spektakulär. Tor zur Weltenburger Donauenge.",
    einwohner: "16.000",
    bekannteLocations: ["Befreiungshalle Kelheim", "Hotel zur Post Kelheim", "Klosterschenke Weltenburg", "Schiffsanlegestelle Kelheim", "Festsaal Schwanenkeller"],
    faq: [
      { q: "Was kostet ein Zauberer in Kelheim?", a: "Die Preise hängen vom Format ab. Anfahrt aus Regensburg ca. 30 Minuten, im Angebot inklusive." },
      { q: "Tritt der Zauberer auf Hochzeiten am Kloster Weltenburg auf?", a: "Ja, Hochzeiten in Weltenburg und Kelheim gehören zu meinen häufigeren Auftritten in der Region. Kurze Anfahrt aus Regensburg, volle Verfügbarkeit." },
    ],
    seoText: "Zauberer Kelheim: Emilian Leber bringt Close-Up Magie und Bühnenshow zu Hochzeiten, Firmenfeiern und Events in Kelheim, Weltenburg und im Altmühltal.",
    langText: `Kelheim ist Donau-Altmühl-Stadt mit reicher Geschichte und spektakulärer Landschaft — die Befreiungshalle, die Weltenburger Donauenge und das Kloster Weltenburg machen die Region einzigartig. Als Zauberer für Kelheim bin ich nur 30 Minuten aus Regensburg vor Ort.

Von der Klosterschenke Weltenburg über das Hotel zur Post bis zu Hochzeits-Locations im Altmühltal — Kelheim und die Region bieten außergewöhnliche Rahmen für besondere Anlässe.

Kosten Zauberer Kelheim: Pakete ab 395 €, Anfahrt aus Regensburg inklusive.`,
  },
  {
    slug: "neumarkt-in-der-oberpfalz",
    name: "Neumarkt in der Oberpfalz",
    region: "Bayern",
    intro: "Neumarkt in der Oberpfalz — Wirtschaftsstadt zwischen Nürnberg und Regensburg. Als Zauberer für Neumarkt bringe ich Close-Up Magie und Bühnenshow zu Firmenfeiern, Hochzeiten und Galas im Bayerischen Jura.",
    highlight: "Neumarkt ist Wirtschaftsstandort mit starkem Mittelstand und einer der wachsenden Eventstandorte im Bayerischen Jura.",
    einwohner: "40.000",
    bekannteLocations: ["Reitstadion Neumarkt", "Stadthalle Neumarkt", "Hotel-Restaurant Neumarkter Lammsbräu", "Residenzplatz", "Schlossanlage Neumarkt"],
    faq: [
      { q: "Was kostet ein Zauberer in Neumarkt in der Oberpfalz?", a: "Die Preise hängen vom Format ab. Anfahrt aus Regensburg ca. 45 Minuten, im Angebot inklusive." },
      { q: "Tritt der Zauberer bei Firmenfeiern in Neumarkt auf?", a: "Ja, Firmenfeiern für Neumarkter Unternehmen — von Mittelstand bis großem Industriebetrieb — gehören zu meinen regelmäßigen Einsätzen." },
    ],
    seoText: "Zauberer Neumarkt in der Oberpfalz: Emilian Leber bringt Close-Up Magie und Bühnenshow zu Firmenfeiern, Hochzeiten und Galas in Neumarkt und der Oberpfalz.",
    langText: `Neumarkt in der Oberpfalz ist Wirtschaftsstadt mit starkem Mittelstand zwischen Nürnberg und Regensburg. Als Zauberer für Neumarkt bringe ich modernes Entertainment zu Firmenfeiern, Hochzeiten und Galas — schnell erreichbar aus Regensburg.

Von der Stadthalle über den Residenzplatz bis zu Hotels und Hochzeits-Locations im Umland — Neumarkt bietet vielfältige Möglichkeiten. Auch Events in Berching, Parsberg oder Velburg betreue ich als Zauberer für die Region.

Kosten Zauberer Neumarkt: Pakete ab 395 €, Anfahrt aus Regensburg inklusive.`,
  },
  {
    slug: "cham",
    name: "Cham",
    region: "Bayern",
    intro: "Cham — Kreisstadt im Bayerischen Wald, östlich von Regensburg. Als Zauberer für Cham bringe ich Close-Up Magie und Bühnenshow zu Hochzeiten, Firmenfeiern und Galas im Bayerwald.",
    highlight: "Cham ist Kreisstadt und Wirtschaftszentrum des Bayerischen Waldes — kurze Anfahrt aus Regensburg, vielfältige Eventkultur.",
    einwohner: "17.000",
    bekannteLocations: ["Stadttheater Cham", "Stadtsaal Cham", "Hotel Randsbergerhof", "Schloss Thierlstein (Umgebung)"],
    faq: [
      { q: "Was kostet ein Zauberer in Cham?", a: "Anfahrt aus Regensburg ca. 45 Minuten — Format-abhängiges Angebot auf Anfrage." },
      { q: "Tritt der Zauberer auf Firmenfeiern in Cham auf?", a: "Ja, Firmenfeiern für Chamer Unternehmen und Werks-Weihnachtsfeiern gehören zu meinen Einsätzen." },
    ],
    seoText: "Zauberer Cham: Emilian Leber bringt Close-Up Magie und Bühnenshow zu Hochzeiten, Firmenfeiern und Galas in Cham und im Bayerischen Wald.",
    langText: `Cham ist Kreisstadt und Wirtschaftszentrum des Bayerischen Waldes östlich von Regensburg. Als Zauberer für Cham bringe ich Entertainment zu Hochzeiten im Stadttheater, Firmenfeiern im Stadtsaal und Galas in Hotels der Region.

Vom Stadttheater über das Hotel Randsbergerhof bis zu Schloss-Locations in der Umgebung — Cham und der Bayerische Wald bieten vielfältige Eventsettings.

Kosten Zauberer Cham: Pakete ab 395 €, Anfahrt aus Regensburg inklusive.`,
  },
];

/** Format×Stadt-Seiten (/zauberer-hochzeit/…, /magic-dinner-…) gibt es nur hier. */
export const SERVICE_STADT_SLUGS: readonly string[] = ["regensburg"];
