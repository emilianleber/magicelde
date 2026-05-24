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
        a: "Ja — gesamter Großraum München im Tagessatz ohne Aufpreis: Starnberg, Tutzing, Tegernsee, Bad Tölz, Bad Wiessee, Bachmair Weissach, Wolfratshausen, Geretsried, Erding, Freising, Dachau, Garching. Ingolstadt (zwischen München und Regensburg) ist im Tagessatz inklusive. Garmisch-Partenkirchen mit moderatem Reisezuschlag.",
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
    intro: "Als Zauberer für Würzburg arbeite ich in einer der schönsten Barock-Städte Deutschlands — UNESCO-Weltkulturerbe-Residenz, Wein-Region (Frankenweine), Universitätsstadt und wirtschaftliches Zentrum Unterfrankens mit Konzernen wie Koenig & Bauer, Brose, Vogel Communications, Bosch Rexroth. Ich biete Close-Up Magie, Comedy-Bühnenshow und Magic Dinner für Firmenfeiern, Hochzeiten und exklusive Events in Würzburg und ganz Unterfranken.",
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
    seoText: "Zauberer Würzburg Emilian Leber: Close-Up Magie, Comedy-Bühnenshow, Magic Dinner und Weinprobe-Magie in der Residenz, im Bürgerspital und in unterfränkischen Locations. Für Hochzeit, Firmenfeier (Koenig & Bauer, Brose, Vogel) und Privatfeier. 5,0 Sterne bei 30+ Bewertungen.",
    langText: `Würzburg verbindet zwei Welten: UNESCO-Weltkulturerbe-Eleganz (Residenz, Hofgarten, Festung Marienberg) und solide unterfränkische Wirtschaftskraft (Koenig & Bauer, Brose, Vogel Communications, Bosch Rexroth). Das Würzburger Publikum will Premium-Entertainment, das beides ehrt: stilvolle Tonalität, aber keine Show-Pose. Mentalmagie und präzise Karten-Magie funktionieren hier perfekt.

Drei Anlässe, drei Würzburger Settings. Für Hochzeiten in der Residenz, im Hofgarten Veitshöchheim, in Schloss Steinburg oder Festung Marienberg das Drei-Akt-Modell: Close-Up beim Sektempfang, Tisch-zu-Tisch beim Dinner, Bühnen-Highlight vor dem Tanz. Für Firmenfeiern (Koenig & Bauer-Mitarbeiter-Events, Vogel-Verlag-Jubiläen, Bosch-Rexroth-Standort-Feiern, Brose-Tagungen) der Mix aus Walk-Around plus 25–35-Min-Bühne. Für Privatanlässe in Würzburg-Mitte, Sanderau oder Grombühl reines Close-Up reicht meist.

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
    slug: "kempten",
    name: "Kempten",
    region: "Bayern",
    intro: "Kempten — die Hauptstadt des Allgäus — ist einer der ältesten Städte Deutschlands und ein starker Eventstandort. Als Zauberer für Kempten bringe ich moderne Magie ins Allgäu — von der Firmenfeier bis zur Hochzeit mit Bergpanorama.",
    highlight: "Das Allgäu steht für Genuss, Natur und Gastfreundschaft — meine Magie ergänzt dieses Erlebnis perfekt.",
    einwohner: "70.000",
    bekannteLocations: ["bigBOX Allgäu", "Kornhaus Kempten", "Residenz Kempten", "Allgäuhalle", "Schloss zu Hopferau"],
    faq: [
      { q: "Was kostet ein Zauberer in Kempten?", a: "Ich berate dich gerne kostenlos und erstelle ein individuelles Angebot für dein Event im Allgäu." },
      { q: "Tritt der Zauberer auch in Oberstdorf oder Füssen auf?", a: "Ja, ich trete im gesamten Allgäu auf — von Kempten über Oberstdorf bis Füssen und Umgebung." },
    ],
    seoText: "Zauberer Kempten: Emilian Leber begeistert als Zauberkünstler im Allgäu. Professionelle Zaubershow und Close-Up Magie für Firmenfeiern, Hochzeiten und Events in Kempten und dem gesamten Allgäu.",
    langText: `Kempten — die älteste Stadt Deutschlands und Hauptstadt des Allgäus. Als Zauberer für Kempten bringe ich moderne Magie ins Allgäu — von Firmenfeiern in der bigBOX über Hochzeiten auf Schloss Hopferau bis zu Galas im Kornhaus.

Das Allgäu steht für Genuss, Natur und Gastfreundschaft — meine Zauberkunst ergänzt dieses besondere Lebensgefühl perfekt. Ob traditionelles Allgäuer Event oder moderner Corporate Abend — ich passe mein Programm dem Charakter des Anlasses an.

Preise Zauberer Kempten: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot.`,
  },
  {
    slug: "aschaffenburg",
    name: "Aschaffenburg",
    region: "Bayern",
    intro: "Aschaffenburg — das bayerische Nizza am Main — bietet mit Schloss Johannisburg und zahlreichen Eventlocations den perfekten Rahmen für magische Events. Als Zauberer für Aschaffenburg bringe ich modernes Entertainment nach Unterfranken.",
    highlight: "Aschaffenburg liegt am Tor zum Spessart und nahe dem Rhein-Main-Gebiet — perfekt für Events zwischen Frankfurt und Würzburg.",
    einwohner: "72.000",
    bekannteLocations: ["Stadthalle am Schloss", "Schloss Johannisburg", "Colos-Saal", "Hotel Wilder Mann", "Martinushaus"],
    faq: [
      { q: "Was kostet ein Zauberer in Aschaffenburg?", a: "Die Kosten richten sich nach Format und Dauer. Kontaktiere mich für eine kostenlose Beratung." },
      { q: "Tritt der Zauberer auch im Rhein-Main-Gebiet auf?", a: "Ja! Von Aschaffenburg aus bediene ich auch Frankfurt, Darmstadt, Hanau und das gesamte Rhein-Main-Gebiet." },
    ],
    seoText: "Zauberer Aschaffenburg: Emilian Leber ist dein Entertainer für Events in Aschaffenburg und Unterfranken. Zaubershow, Close-Up Magie und Magic Dinner für Firmenfeiern, Hochzeiten und besondere Anlässe.",
    langText: `Aschaffenburg — das bayerische Nizza am Main, nahe dem Rhein-Main-Gebiet. Als Zauberer für Aschaffenburg bringe ich modernes Entertainment in die Schlossstadt Unterfrankens — für Firmenfeiern, Hochzeiten und Galas.

Von Firmenevents in der Stadthalle am Schloss über Hochzeiten im Hotel Wilder Mann bis zu privaten Feiern im Schloss Johannisburg-Umfeld — Aschaffenburg bietet tolle Locations, und ich liefere das passende Showkonzept.

Kosten Zauberer Aschaffenburg: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot.`,
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
    slug: "schweinfurt",
    name: "Schweinfurt",
    region: "Bayern",
    intro: "Schweinfurt — Industriemetropole am Main mit starker Eventkultur. Als Zauberer für Schweinfurt bringe ich Close-Up Magie, Bühnenshow und Magic Dinner zu Firmenfeiern, Hochzeiten und Galas in Unterfranken — modern, interaktiv und mit echtem Wow-Faktor.",
    highlight: "Schweinfurt ist Mittelfrankens Industriezentrum mit starkem Mittelstand. Vom Vorstandsdinner bis zur Mitarbeiter-Weihnachtsfeier — ich liefere das passende Entertainment-Konzept.",
    einwohner: "54.000",
    bekannteLocations: ["Stadthalle Schweinfurt", "Konferenzzentrum Maininsel", "Kulturzentrum Disharmonie", "Mercure Hotel Schweinfurt"],
    faq: [
      { q: "Was kostet ein Zauberer in Schweinfurt?", a: "Die Preise hängen vom Format und der Dauer ab. Close-Up startet im mittleren dreistelligen Bereich, Komplettpakete höher. Ich erstelle ein individuelles Angebot, kostenlos und unverbindlich." },
      { q: "Tritt der Zauberer auch in Industriebetrieben in Schweinfurt auf?", a: "Ja — Firmenevents bei großen Schweinfurter Industriebetrieben, Werks-Weihnachtsfeiern und Konferenzen gehören zu meinen häufigsten Anlässen. Tonalität passe ich der Unternehmenskultur an." },
    ],
    seoText: "Zauberer Schweinfurt: Emilian Leber begeistert als Zauberkünstler auf Firmenfeiern, Hochzeiten und Geburtstagen in Schweinfurt und Unterfranken. Close-Up, Bühnenshow und Magic Dinner mit modernem Profil.",
    langText: `Als Zauberer für Schweinfurt bediene ich Industrie, Mittelstand und Privatkunden in einer der wichtigsten Wirtschaftsstädte Frankens. Vom Werks-Sommerfest großer Schweinfurter Industriebetriebe bis zur Hochzeit im historischen Stadtkern — die Bandbreite ist groß, mein Anspruch konstant: modernes Comedy-Zauberer-Entertainment mit echtem Wow-Faktor.

Schweinfurt liegt verkehrsgünstig zwischen Würzburg und Bamberg — schnell erreichbar, mit kurzen Wegen zu Veranstaltungsorten in der Region. Auch Events in Haßfurt, Bad Kissingen oder Volkach betreue ich gern als Zauberer für die Schweinfurter Region.

Kosten für einen Zauberer in Schweinfurt: Meine Pakete beginnen ab 395 €, Anfahrt ist im Angebot inklusive. Kontaktiere mich für ein unverbindliches Beratungsgespräch — Antwort innerhalb 24 Stunden.`,
  },
  {
    slug: "memmingen",
    name: "Memmingen",
    region: "Bayern",
    intro: "Memmingen — das Tor zum Allgäu, mit historischer Altstadt und internationalem Flughafen. Als Zauberer für Memmingen sorge ich auf Hochzeiten, Firmenfeiern und Galas in Schwaben für magische Momente — Close-Up Magie, Bühnenshow oder Magic Dinner.",
    highlight: "Memmingen verbindet historisches Allgäu-Flair mit moderner Wirtschaft und Flughafenanbindung. Ideal für Events mit überregionalen Gästen.",
    einwohner: "44.000",
    bekannteLocations: ["Stadthalle Memmingen", "Memminger Hof", "Allgäu Airport Memmingen", "Memminger Stadttheater", "BBZ Memmingen"],
    faq: [
      { q: "Was kostet ein Zauberer in Memmingen?", a: "Die Preise variieren je nach Format. Ich erstelle dir ein individuelles Angebot — kostenlos und unverbindlich, mit Anfahrt nach Memmingen inklusive." },
      { q: "Eignet sich der Zauberer für Events am Allgäu Airport?", a: "Ja, Events in Flughafennähe und Konferenzen mit internationalen Gästen funktionieren bestens. Magie überwindet jede Sprachbarriere." },
    ],
    seoText: "Zauberer Memmingen: Emilian Leber bringt Close-Up Magie, Bühnenshow und Magic Dinner zu Events in Memmingen und im Allgäu. Hochzeit, Firmenfeier, Geburtstag — modernes Entertainment für Schwaben.",
    langText: `Memmingen ist die historische Reichsstadt im Allgäu und ein wichtiger Wirtschaftsstandort in Schwaben. Als Zauberer für Memmingen bringe ich modernes Entertainment zu Hochzeiten in Altstadt-Locations, Firmenfeiern in der Stadthalle und Galas im Memminger Hof.

Mit dem Allgäu Airport hat Memmingen außerdem direkte Flughafenanbindung — was die Stadt zum idealen Veranstaltungsort für Konferenzen, Tagungen und Corporate Events mit überregionalen Gästen macht. Auch hier liefere ich das passende Format: Mentaleffekte, Comedy-Bühnenshow oder Close-Up zwischen den Gängen.

Kosten Zauberer Memmingen: Pakete ab 395 €, Anfahrt inklusive. Kontaktiere mich für ein kostenloses Angebot.`,
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
    slug: "neuburg-an-der-donau",
    name: "Neuburg an der Donau",
    region: "Bayern",
    intro: "Neuburg an der Donau — Renaissance-Juwel mit dem prächtigen Schloss über dem Donautal. Als Zauberer für Neuburg bringe ich Magie zu Hochzeiten im Schlossambiente, Firmenfeiern und Galas in einer der historisch schönsten Städte Bayerns.",
    highlight: "Das Schloss Neuburg und die Renaissance-Altstadt machen jede Hochzeit zum Märchen — und mit Close-Up Magie wird sie unvergesslich.",
    einwohner: "30.000",
    bekannteLocations: ["Schloss Neuburg", "Kongregationssaal", "Stadttheater Neuburg", "Hofapotheke (Eventbereich)", "Hotel Bergbauer"],
    faq: [
      { q: "Was kostet ein Zauberer in Neuburg an der Donau?", a: "Die Preise hängen vom Format ab. Ich erstelle ein individuelles Angebot mit transparenter Kostenstruktur, Anfahrt aus Regensburg inklusive." },
      { q: "Tritt der Zauberer im Schloss Neuburg auf?", a: "Ja, Schloss-Hochzeiten und Galas im Schloss Neuburg gehören zu meinen schönsten Auftritten. Das Renaissance-Ambiente passt perfekt zu meiner eleganten Tonalität." },
    ],
    seoText: "Zauberer Neuburg an der Donau: Emilian Leber bringt Close-Up Magie und Bühnenshow zu Hochzeiten, Firmenfeiern und Galas in der Renaissance-Stadt — auch im Schloss Neuburg.",
    langText: `Neuburg an der Donau ist mit dem prächtigen Renaissance-Schloss eine der schönsten historischen Städte Bayerns — und ein gefragter Hochzeitsort für Brautpaare, die das Besondere suchen. Als Zauberer für Neuburg bringe ich Close-Up Magie beim Sektempfang im Schlosshof, Bühnenshow im großen Saal und Tisch-zu-Tisch-Magie beim Hochzeitsdinner.

Auch Firmenfeiern und Galas profitieren vom außergewöhnlichen Rahmen — und einem Entertainer, der die Tonalität dem Ambiente anpasst. Mentaleffekte, Comedy-Pointen und Standing-Ovation-Finale für den großen Moment.

Kosten Zauberer Neuburg: Pakete ab 395 €, Anfahrt inklusive.`,
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
    slug: "coburg",
    name: "Coburg",
    region: "Bayern",
    intro: "Coburg — die fränkische Residenzstadt mit der mächtigen Veste über der Altstadt. Als Zauberer für Coburg bringe ich Close-Up Magie, Bühnenshow und Magic Dinner zu Firmenfeiern, Hochzeiten und Galas in Oberfranken.",
    highlight: "Coburg ist Konzernsitz von HUK-Coburg und eine historisch reiche Residenzstadt — perfektes Setting für Corporate Events und Hochzeiten mit Niveau.",
    einwohner: "41.000",
    bekannteLocations: ["Veste Coburg", "Schloss Ehrenburg", "HUK-Coburg-Halle (Umfeld)", "Hotel Goldene Traube", "Kongresshaus Rosengarten"],
    faq: [
      { q: "Was kostet ein Zauberer in Coburg?", a: "Die Preise hängen vom Format ab. Kostenloses Angebot auf Anfrage, individuell auf dein Event zugeschnitten." },
      { q: "Tritt der Zauberer auch auf Großveranstaltungen in Coburg auf?", a: "Ja — Firmenfeiern bei Coburger Konzernen, Galas im Kongresshaus Rosengarten und private Anlässe in der Altstadt gehören zu meinem Einsatzgebiet." },
    ],
    seoText: "Zauberer Coburg: Emilian Leber begeistert als Zauberkünstler auf Events in Coburg und Oberfranken — Hochzeit, Firmenfeier, Geburtstag mit Close-Up Magie und Bühnenshow.",
    langText: `Coburg verbindet königliche Geschichte mit moderner Wirtschaftskraft. Die Residenzstadt ist Sitz von HUK-Coburg und einem starken Mittelstand — was eine lebendige Eventkultur mit anspruchsvollem Publikum bedeutet. Als Zauberer für Coburg liefere ich entsprechend: modern, präzise, mit klarer Tonalität für Premium-Anlässe.

Von der Hochzeit auf der Veste Coburg über die Firmenfeier im Kongresshaus Rosengarten bis zum Galaabend im Schloss Ehrenburg — Coburg bietet Locations mit Charakter. Mein Programm passt sich dem Rahmen an: Mentaleffekte, eingebaute Anekdoten, Standing-Ovation-Finale.

Kosten Zauberer Coburg: Pakete ab 395 €, Anfahrt aus Regensburg ca. 2 Stunden, im Angebot inklusive.`,
  },
  {
    slug: "hof",
    name: "Hof",
    region: "Bayern",
    intro: "Hof — die fränkische Saalestadt im Bayerischen Vogtland. Als Zauberer für Hof bringe ich modernes Comedy-Zauberkünstler-Entertainment zu Firmenfeiern, Hochzeiten und Galas im nördlichsten Zipfel Bayerns.",
    highlight: "Hof ist Universitätsstandort und wichtiger Wirtschaftsraum im Vogtland — perfekt für Corporate Events, Hochschulgalas und private Feiern mit Niveau.",
    einwohner: "46.000",
    bekannteLocations: ["Freiheitshalle Hof", "Theater Hof", "Hochschule Hof (Eventbereich)", "Hotel Strauss", "Saaleterassen"],
    faq: [
      { q: "Was kostet ein Zauberer in Hof?", a: "Die Preise variieren je nach Format. Kostenloses Angebot auf Anfrage, Antwort innerhalb 24 Stunden." },
      { q: "Tritt der Zauberer auch an der Hochschule Hof auf?", a: "Ja, Universitäts- und Hochschulgalas, Absolventenfeiern und Studierenden-Events sind ein regelmäßiger Teil meiner Auftritte." },
    ],
    seoText: "Zauberer Hof: Emilian Leber begeistert als Zauberkünstler auf Events in Hof und im Vogtland. Firmenfeier, Hochzeit, Geburtstag — moderne Zauberkunst mit Comedy-Anteil.",
    langText: `Als Zauberer für Hof bediene ich Oberfrankens nördlichste Großstadt mit professionellem Entertainment für jeden Anlass. Die Freiheitshalle, das Theater Hof und zahlreiche Hotels bieten den Rahmen — ich liefere das Programm.

Hof ist Universitätsstandort und wichtiger Wirtschaftsraum im Vogtland. Firmenfeiern, Hochschulgalas und Hochzeiten profitieren von einem modernen Zauberer, der die Tonalität ans Publikum anpasst — von der akademischen Feier bis zur Werks-Weihnachtsfeier.

Kosten Zauberer Hof: Pakete ab 395 €, Anfahrt inklusive.`,
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
    slug: "garmisch-partenkirchen",
    name: "Garmisch-Partenkirchen",
    region: "Bayern",
    intro: "Garmisch-Partenkirchen — Alpenresort am Fuße der Zugspitze, weltbekannt für Wintersport und Premium-Tourismus. Als Zauberer für Garmisch bringe ich Close-Up Magie, Bühnenshow und Magic Dinner zu Hochzeiten in Alpenhotels und Galas mit Bergpanorama.",
    highlight: "Garmisch-Partenkirchen ist Premium-Destination für Hochzeiten und Corporate Retreats — Alpenkulisse trifft Top-Hotels. Entertainment muss mithalten.",
    einwohner: "26.000",
    bekannteLocations: ["Kongresshaus Garmisch-Partenkirchen", "Hotel Riessersee", "Edelweiss Lodge & Resort", "Olympia-Skistadion (Eventbereich)", "Atlas Grand Hotel"],
    faq: [
      { q: "Was kostet ein Zauberer in Garmisch-Partenkirchen?", a: "Die Preise hängen vom Format und der Übernachtungs-Logistik ab. Bei mehrtägigen Events oder Übernachtung kalkuliere ich transparent. Kostenloses Angebot auf Anfrage." },
      { q: "Tritt der Zauberer in Alpenhotels in Garmisch auf?", a: "Ja, Premium-Hotels in Garmisch-Partenkirchen und der gesamten Zugspitz-Region sind ein häufiger Einsatzort für Hochzeiten, Corporate Retreats und Galas." },
    ],
    seoText: "Zauberer Garmisch-Partenkirchen: Emilian Leber bringt Premium-Entertainment zu Hochzeiten, Firmen-Retreats und Galas in der Zugspitz-Region — Close-Up, Bühnenshow, Magic Dinner.",
    langText: `Garmisch-Partenkirchen ist Premium-Destination für Hochzeiten, Corporate Retreats und exklusive Events — die Kombination aus Alpenkulisse und Top-Hotels macht jede Veranstaltung besonders. Als Zauberer für Garmisch liefere ich Entertainment auf entsprechendem Niveau: ruhig-elegant beim Sektempfang, dramaturgisch beim Dinner, mit Standing-Ovation-Finale vor dem Tanz.

Vom Hotel Riessersee mit Seeblick über das Edelweiss Lodge & Resort bis zum Atlas Grand Hotel — Garmisch bietet außergewöhnliche Locations für besondere Anlässe. Ich bringe das passende Showkonzept mit.

Kosten Zauberer Garmisch-Partenkirchen: Pakete ab 395 €, Anfahrt aus Regensburg bzw. München im Angebot kalkuliert.`,
  },
  {
    slug: "bad-toelz",
    name: "Bad Tölz",
    region: "Bayern",
    intro: "Bad Tölz — Kur- und Marktstadt im oberbayerischen Voralpenland. Als Zauberer für Bad Tölz bringe ich Close-Up Magie und Bühnenshow zu Hochzeiten in Kurhotels, Firmen-Retreats und Galas mit Alpenflair.",
    highlight: "Bad Tölz verbindet bayerische Tradition mit Kurort-Eleganz — ideal für Hochzeiten mit besonderem Charakter und Firmen-Off-Sites im Voralpenland.",
    einwohner: "19.000",
    bekannteLocations: ["Kurhaus Bad Tölz", "Hotel Bayerischer Hof", "Schlosshotel Köllnerhof", "Tölzer Marktstraße (Eventbereich)", "Bauernsilberkammer"],
    faq: [
      { q: "Was kostet ein Zauberer in Bad Tölz?", a: "Die Preise variieren je nach Format. Anfahrt aus Regensburg ca. 2,5 Stunden, im Angebot inklusive. Kostenloses Angebot auf Anfrage." },
      { q: "Tritt der Zauberer in Kurhotels in Bad Tölz auf?", a: "Ja, Hochzeiten und Galas in den traditionsreichen Kurhotels von Bad Tölz und Umgebung betreue ich regelmäßig — passender Stil für klassisch-elegante Settings." },
    ],
    seoText: "Zauberer Bad Tölz: Emilian Leber bringt Close-Up Magie und Bühnenshow zu Hochzeiten, Firmenfeiern und Galas in Bad Tölz und im oberbayerischen Voralpenland.",
    langText: `Bad Tölz ist Kur- und Marktstadt mit bayerisch-eleganter Atmosphäre — ideal für Hochzeiten mit Charakter und Corporate Retreats abseits der Großstadt. Als Zauberer für Bad Tölz bringe ich Entertainment, das zur Stadt passt: ruhig, präzise, mit echtem Wow-Faktor.

Vom Kurhaus Bad Tölz über das Hotel Bayerischer Hof bis zu den charaktervollen Locations entlang der Marktstraße — die Stadt bietet Settings mit Geschichte. Ich liefere die Magie, die zum Rahmen passt.

Kosten Zauberer Bad Tölz: Pakete ab 395 €, Anfahrt inklusive.`,
  },
  {
    slug: "berchtesgaden",
    name: "Berchtesgaden",
    region: "Bayern",
    intro: "Berchtesgaden — Alpenresort am Königssee, eine der spektakulärsten Eventdestinationen Bayerns. Als Zauberer für Berchtesgaden bringe ich Close-Up Magie, Bühnenshow und Magic Dinner zu Hochzeiten am See, Galas in Premium-Hotels und Corporate Retreats mit Watzmann-Blick.",
    highlight: "Berchtesgaden ist Top-Destination für Premium-Hochzeiten und Corporate-Off-Sites — Watzmann, Königssee, Kempinski. Entertainment muss dem Niveau entsprechen.",
    einwohner: "8.000",
    bekannteLocations: ["Kempinski Hotel Berchtesgaden", "InterContinental Resort Berchtesgaden", "Kongresshaus Berchtesgaden", "Stiftung Königssee (Eventbereich)", "Salzbergwerk-Erlebniswelt"],
    faq: [
      { q: "Was kostet ein Zauberer in Berchtesgaden?", a: "Die Preise hängen vom Format und der Logistik ab. Bei Übernachtung kalkuliere ich transparent. Kostenloses Angebot auf Anfrage." },
      { q: "Tritt der Zauberer im Kempinski Berchtesgaden auf?", a: "Ja, Premium-Hotels in Berchtesgaden gehören zu meinem Repertoire. Hochzeiten und Corporate Retreats in der Region sind ein regelmäßiger Teil meines Kalenders." },
    ],
    seoText: "Zauberer Berchtesgaden: Emilian Leber bringt Premium-Entertainment zu Hochzeiten, Galas und Corporate Retreats am Königssee und im Berchtesgadener Land.",
    langText: `Berchtesgaden ist Premium-Destination für Hochzeiten und Corporate Retreats — die Kombination aus spektakulärer Alpenkulisse und Top-Hotels macht jede Veranstaltung außergewöhnlich. Als Zauberer für Berchtesgaden bringe ich Entertainment, das mit dem Setting mithält.

Vom Kempinski Hotel mit Watzmann-Blick über das InterContinental Resort bis zu privaten Schloss-Locations am Königssee — Berchtesgaden bietet einzigartige Rahmen. Mein Programm passt sich an: ruhig-elegant, mit Mentaleffekten und Standing-Ovation-Finale.

Kosten Zauberer Berchtesgaden: Pakete ab 395 €, Anfahrt und ggf. Übernachtung transparent kalkuliert.`,
  },
  {
    slug: "lindau",
    name: "Lindau am Bodensee",
    region: "Bayern",
    intro: "Lindau — Inselstadt am Bodensee, Bayerns westlichster Außenposten und Premium-Eventdestination. Als Zauberer für Lindau bringe ich Close-Up Magie und Bühnenshow zu Hochzeiten am See, Galas im Bayerischen Hof und Corporate Events mit Drei-Länder-Blick.",
    highlight: "Lindau ist Drei-Länder-Eck und eine der schönsten Bodensee-Städte — historische Insel, Premium-Hotels, internationales Publikum.",
    einwohner: "26.000",
    bekannteLocations: ["Inselhalle Lindau", "Bayerischer Hof Lindau", "Reutemann Hotel", "Hotel Bad Schachen", "Hafen Lindau (Eventbereich)"],
    faq: [
      { q: "Was kostet ein Zauberer in Lindau?", a: "Die Preise variieren je nach Format. Aufgrund der Distanz nach Bayern-Ostbayern kalkuliere ich Anfahrt und ggf. Übernachtung transparent. Kostenloses Angebot auf Anfrage." },
      { q: "Tritt der Zauberer auch bei Drei-Länder-Events in Lindau auf?", a: "Ja, Lindau zieht oft internationales Publikum aus Deutschland, Österreich und der Schweiz an — Magie funktioniert über Sprachgrenzen hinweg. Programm anpassbar." },
    ],
    seoText: "Zauberer Lindau am Bodensee: Emilian Leber bringt Premium-Entertainment zu Hochzeiten, Firmenfeiern und Galas in Lindau und am Bayerischen Bodensee.",
    langText: `Lindau am Bodensee ist eine der schönsten Eventdestinationen Bayerns — historische Inselstadt mit Premium-Hotels, internationalem Publikum und einzigartigem Drei-Länder-Blick. Als Zauberer für Lindau bringe ich Entertainment, das zum Niveau passt.

Vom Bayerischen Hof Lindau mit Seeblick über das Reutemann Hotel bis zum Hafenviertel — Lindau bietet außergewöhnliche Rahmen für Hochzeiten, Galas und Corporate Events. Mein Programm passe ich ans internationale Publikum an, das hier oft zusammenkommt.

Kosten Zauberer Lindau: Pakete ab 395 €, Anfahrt und ggf. Übernachtung transparent kalkuliert.`,
  },
  {
    slug: "fuessen",
    name: "Füssen",
    region: "Bayern",
    intro: "Füssen — Allgäuer Königsstadt, Eingangstor zu Schloss Neuschwanstein und eine der romantischsten Eventdestinationen Bayerns. Als Zauberer für Füssen bringe ich Close-Up Magie und Bühnenshow zu Hochzeiten in Schloss-Nähe, Galas in Premium-Hotels und Corporate Retreats.",
    highlight: "Füssen ist Märchenkulisse — Schloss Neuschwanstein, Forggensee, Allgäuer Alpen. Hochzeitsdestination mit Premium-Anspruch.",
    einwohner: "16.000",
    bekannteLocations: ["Festsaal Hohes Schloss Füssen", "Hotel Sonne", "Kurhaus Füssen", "Schlossbrauhaus Schwangau (Umfeld)", "Festspielhaus Neuschwanstein"],
    faq: [
      { q: "Was kostet ein Zauberer in Füssen?", a: "Die Preise hängen vom Format ab. Anfahrt aus Regensburg ca. 3 Stunden, im Angebot transparent kalkuliert. Kostenloses Angebot auf Anfrage." },
      { q: "Tritt der Zauberer auf Hochzeiten in Schloss-Nähe auf?", a: "Ja, Hochzeiten rund um Schloss Neuschwanstein und Hohenschwangau sind eine meiner schönsten Disziplinen. Märchenhafte Kulisse, magische Show." },
    ],
    seoText: "Zauberer Füssen: Emilian Leber bringt Premium-Entertainment zu Hochzeiten und Galas in Füssen, Schwangau und der Region Schloss Neuschwanstein im Allgäu.",
    langText: `Füssen ist Allgäuer Königsstadt und Eingangstor zu Schloss Neuschwanstein — eine der romantischsten Hochzeitsdestinationen Europas. Als Zauberer für Füssen bringe ich Entertainment, das zur Märchenkulisse passt: elegant, persönlich, mit eingebauten Brautpaar-Anekdoten.

Vom Festsaal Hohes Schloss über das Hotel Sonne bis zum Kurhaus Füssen — die Stadt bietet außergewöhnliche Settings. Auch Hochzeiten in Schwangau, am Forggensee oder in nahegelegenen Schlössern betreue ich gerne als Zauberer für Füssen.

Kosten Zauberer Füssen: Pakete ab 395 €, Anfahrt und ggf. Übernachtung transparent kalkuliert.`,
  },
  {
    slug: "oberammergau",
    name: "Oberammergau",
    region: "Bayern",
    intro: "Oberammergau — weltbekannt für die Passionsspiele und eine der spektakulärsten Eventdestinationen im oberbayerischen Alpenraum. Als Zauberer für Oberammergau bringe ich Close-Up Magie und Bühnenshow zu Hochzeiten, Galas und Corporate Retreats.",
    highlight: "Oberammergau ist weltweit bekannt für die Passionsspiele — und ein wachsender Standort für Premium-Events im Alpenvorland.",
    einwohner: "5.500",
    bekannteLocations: ["Passionstheater Oberammergau (Umfeld)", "Hotel Maximilian", "Hotel Wittelsbach", "Eiblerhof", "Kurhaus Oberammergau"],
    faq: [
      { q: "Was kostet ein Zauberer in Oberammergau?", a: "Die Preise hängen vom Format und der Logistik ab. Anfahrt transparent kalkuliert, kostenloses Angebot auf Anfrage." },
      { q: "Tritt der Zauberer auch in Hotels in Oberammergau auf?", a: "Ja, Premium-Hotels und Eventlocations in Oberammergau betreue ich gerne — vor allem für Hochzeiten und Corporate Retreats in der Region." },
    ],
    seoText: "Zauberer Oberammergau: Emilian Leber bringt Premium-Entertainment zu Hochzeiten, Galas und Events im Ammergau und im oberbayerischen Alpenvorland.",
    langText: `Oberammergau ist weltweit bekannt für die Passionsspiele und ein wachsender Standort für Premium-Hochzeiten und Corporate Retreats. Als Zauberer für Oberammergau bringe ich Entertainment, das zur besonderen Atmosphäre dieser Alpengemeinde passt.

Von Hotels mit Bergblick bis zu Hochzeiten in historischen Sälen — Oberammergau bietet außergewöhnliche Rahmen. Auch Events in Garmisch, Ettal oder Mittenwald betreue ich als Zauberer für die Ammergau-Region.

Kosten Zauberer Oberammergau: Pakete ab 395 €, Anfahrt transparent kalkuliert.`,
  },
  {
    slug: "traunstein",
    name: "Traunstein",
    region: "Bayern",
    intro: "Traunstein — Hauptstadt des Chiemgaus und Wirtschaftszentrum im südöstlichen Oberbayern. Als Zauberer für Traunstein bringe ich Close-Up Magie und Bühnenshow zu Firmenfeiern, Hochzeiten und Galas im Chiemgauer Land.",
    highlight: "Traunstein ist Tor zum Chiemgau, Hochzeitsregion und Wirtschaftszentrum für Mittelstand und Tourismus.",
    einwohner: "21.000",
    bekannteLocations: ["Kulturzentrum Traunstein", "Park Hotel Traunsteiner Hof", "Stadtsaal Traunstein", "Hotel Rosenheimer Hof", "Festsaal Maxlrainer Hof"],
    faq: [
      { q: "Was kostet ein Zauberer in Traunstein?", a: "Die Preise hängen vom Format ab. Anfahrt aus Regensburg ca. 2 Stunden, im Angebot inklusive. Kostenloses Angebot auf Anfrage." },
      { q: "Tritt der Zauberer auch in Chiemgau-Locations auf?", a: "Ja, Hochzeiten und Firmenfeiern in Chiemgau-Hotels, am Chiemsee und in umliegenden Gemeinden gehören zu meinem regulären Einsatzgebiet." },
    ],
    seoText: "Zauberer Traunstein: Emilian Leber bringt Close-Up Magie und Bühnenshow zu Hochzeiten, Firmenfeiern und Galas in Traunstein und im Chiemgau.",
    langText: `Traunstein ist Hauptstadt des Chiemgaus und ein wichtiges Wirtschaftszentrum im südöstlichen Oberbayern. Als Zauberer für Traunstein bringe ich modernes Entertainment zu Hochzeiten, Firmenfeiern und Galas in der Chiemgauer Region.

Von der Stadthalle Traunstein über den Park Hotel Traunsteiner Hof bis zu Hochzeits-Locations am Chiemsee — die Region bietet vielfältige Eventmöglichkeiten. Ich liefere das passende Showkonzept für jeden Anlass.

Kosten Zauberer Traunstein: Pakete ab 395 €, Anfahrt aus Regensburg inklusive.`,
  },
  {
    slug: "burghausen",
    name: "Burghausen",
    region: "Bayern",
    intro: "Burghausen — Heimat der längsten Burg Europas und Industriestadt im Salzachtal. Als Zauberer für Burghausen bringe ich Close-Up Magie und Bühnenshow zu Firmenfeiern, Hochzeiten und Galas in einer der historisch reichsten Städte Bayerns.",
    highlight: "Burghausen ist Industriestandort (Wacker Chemie) und Touristen-Magnet mit der längsten Burg Europas — ideal für Corporate Events und Hochzeiten mit Geschichte.",
    einwohner: "19.000",
    bekannteLocations: ["Burg Burghausen (längste Burg Europas)", "Stadtsaal Burghausen", "Hotel Bayerische Alm", "Hotel Glöcklhofer", "Mautnerschloss"],
    faq: [
      { q: "Was kostet ein Zauberer in Burghausen?", a: "Die Preise variieren je nach Format. Anfahrt transparent kalkuliert, kostenloses Angebot auf Anfrage." },
      { q: "Tritt der Zauberer bei Firmenfeiern in Burghausen auf?", a: "Ja, Firmenfeiern für Wacker Chemie und andere große Burghausener Unternehmen gehören zu meinen Einsätzen. Tonalität immer auf die Unternehmenskultur abgestimmt." },
    ],
    seoText: "Zauberer Burghausen: Emilian Leber bringt Close-Up Magie und Bühnenshow zu Firmenfeiern, Hochzeiten und Galas in Burghausen und dem Salzachtal.",
    langText: `Burghausen ist eine der historisch reichsten Städte Bayerns — bekannt für die längste Burg Europas und als wichtiger Industriestandort (Wacker Chemie). Als Zauberer für Burghausen bediene ich beide Welten: Corporate Events bei den großen Industriebetrieben und Hochzeiten in historischen Locations.

Von der Burg Burghausen über den Stadtsaal bis zum Mautnerschloss — die Stadt bietet einzigartige Eventlocations. Ich liefere das passende Showkonzept für jeden Anlass.

Kosten Zauberer Burghausen: Pakete ab 395 €, Anfahrt im Angebot kalkuliert.`,
  },
  {
    slug: "altoetting",
    name: "Altötting",
    region: "Bayern",
    intro: "Altötting — das Herz Bayerns und einer der bedeutendsten Wallfahrtsorte Europas. Als Zauberer für Altötting bringe ich Close-Up Magie und Bühnenshow zu Hochzeiten, Familienfeiern und Galas in der traditionsreichen Wallfahrtsstadt.",
    highlight: "Altötting ist Bayerns spirituelles Zentrum und ein bedeutender Pilgerort — ideale Kulisse für besondere Hochzeiten und Familienfeiern mit Bedeutung.",
    einwohner: "13.000",
    bekannteLocations: ["Stadtsaal Altötting", "Hotel Zur Post", "Maximilianeum (Eventbereich)", "Gnadenkapelle (Umfeld)", "Festsaal Bauer"],
    faq: [
      { q: "Was kostet ein Zauberer in Altötting?", a: "Die Preise hängen vom Format ab. Kostenloses Angebot auf Anfrage, individuelles Konzept für deinen Anlass." },
      { q: "Tritt der Zauberer auch bei Hochzeiten nach kirchlicher Trauung auf?", a: "Ja, Hochzeiten nach kirchlicher Trauung in Altötting sind ein häufiger Einsatzort. Tonalität festlich-warm, passend zum besonderen Tag." },
    ],
    seoText: "Zauberer Altötting: Emilian Leber bringt Close-Up Magie und Bühnenshow zu Hochzeiten, Familienfeiern und Galas in Altötting und im südöstlichen Oberbayern.",
    langText: `Altötting ist Bayerns spirituelles Zentrum und einer der bedeutendsten Wallfahrtsorte Europas. Als Zauberer für Altötting bringe ich Entertainment, das zur besonderen Atmosphäre der Stadt passt — festlich-warm, mit Augenmaß für den Anlass.

Von Hochzeiten nach kirchlicher Trauung in der Stiftspfarrkirche bis zu Familienfeiern in den historischen Sälen der Altstadt — Altötting bietet Settings mit Bedeutung. Mein Programm passe ich entsprechend an.

Kosten Zauberer Altötting: Pakete ab 395 €, Anfahrt im Angebot kalkuliert.`,
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
    slug: "dachau",
    name: "Dachau",
    region: "Bayern",
    intro: "Dachau — Schlossstadt und Künstlerort nahe München. Als Zauberer für Dachau bringe ich Close-Up Magie und Bühnenshow zu Hochzeiten im Schloss-Ambiente, Firmenfeiern und privaten Anlässen im Münchner Norden.",
    highlight: "Dachau ist Schloss-Stadt mit lebendiger Kunstszene und nur 20 Minuten von München entfernt — Hochzeiten und Firmenfeiern profitieren vom historischen Rahmen.",
    einwohner: "48.000",
    bekannteLocations: ["Schloss Dachau", "Ludwig-Thoma-Haus", "Hotel Zieglerbräu", "Schlossbrauerei Dachau", "ASTOR Hotel Dachau"],
    faq: [
      { q: "Was kostet ein Zauberer in Dachau?", a: "Die Preise hängen vom Format ab. Anfahrt aus Regensburg ca. 1,5 Stunden, im Angebot inklusive. Kostenloses Angebot auf Anfrage." },
      { q: "Tritt der Zauberer auf Hochzeiten in Schloss Dachau auf?", a: "Ja, Hochzeiten im Schloss Dachau und im Schlossgarten sind eine meiner schönsten Einsatzorte. Renaissance-Ambiente passt perfekt zu eleganter Zauberkunst." },
    ],
    seoText: "Zauberer Dachau: Emilian Leber bringt Close-Up Magie und Bühnenshow zu Hochzeiten im Schloss Dachau, Firmenfeiern und privaten Anlässen im Münchner Norden.",
    langText: `Dachau ist Schlossstadt und Künstlerort mit reicher Geschichte und lebendiger Kulturszene — und nur 20 Minuten von München entfernt. Als Zauberer für Dachau bringe ich Entertainment zu Hochzeiten im Schloss Dachau, Firmenfeiern in den Stadtlocations und privaten Anlässen.

Von der Schlossbrauerei über das Ludwig-Thoma-Haus bis zu modernen Hotels — Dachau bietet eine Mischung aus Tradition und Moderne. Ich liefere das passende Programm für jeden Anlass.

Kosten Zauberer Dachau: Pakete ab 395 €, Anfahrt im Angebot kalkuliert.`,
  },
  {
    slug: "starnberg",
    name: "Starnberg",
    region: "Bayern",
    intro: "Starnberg — Premium-Adresse am Starnberger See, südwestlich von München. Als Zauberer für Starnberg bringe ich Close-Up Magie und Bühnenshow zu Hochzeiten in Seevillen, Firmen-Retreats und Galas mit Alpenblick.",
    highlight: "Starnberg ist Premium-Wohnort und Hochzeitsdestination am See — Bavaria's Mietpreis-Spitze trifft Veranstaltungs-Anspruch.",
    einwohner: "23.000",
    bekannteLocations: ["Schloss Possenhofen (Umfeld)", "Hotel Vier Jahreszeiten Starnberg", "Schlosshotel Tutzing", "Undosa am See", "Seehotel Leoni"],
    faq: [
      { q: "Was kostet ein Zauberer in Starnberg?", a: "Die Preise hängen vom Format ab. Premium-Locations rund um den Starnberger See bekommen Premium-Programme. Kostenloses Angebot auf Anfrage." },
      { q: "Tritt der Zauberer auf Hochzeiten am Starnberger See auf?", a: "Ja, Seevilla-Hochzeiten und Galas am See sind eine meiner schönsten Disziplinen. Premium-Tonalität, eingebaute Anekdoten, eleganter Stil." },
    ],
    seoText: "Zauberer Starnberg: Emilian Leber bringt Premium-Entertainment zu Hochzeiten am Starnberger See, Firmen-Retreats und Galas im Fünf-Seen-Land.",
    langText: `Starnberg ist Premium-Adresse am Starnberger See — Mietpreis-Spitze trifft Premium-Eventkultur. Als Zauberer für Starnberg bringe ich Entertainment, das zum Anspruch der Region passt: ruhig-elegant, mit Mentaleffekten und Standing-Ovation-Finale.

Von Seevilla-Hochzeiten in Possenhofen über Galas im Hotel Vier Jahreszeiten bis zu Corporate-Off-Sites am Seeufer — Starnberg bietet außergewöhnliche Rahmen. Auch Events in Tutzing, Berg oder Feldafing betreue ich gerne im Fünf-Seen-Land.

Kosten Zauberer Starnberg: Pakete ab 395 €, Anfahrt aus Regensburg inklusive.`,
  },
  {
    slug: "bad-reichenhall",
    name: "Bad Reichenhall",
    region: "Bayern",
    intro: "Bad Reichenhall — bayerischer Kurort und Salzstadt im Berchtesgadener Land. Als Zauberer für Bad Reichenhall bringe ich Close-Up Magie und Bühnenshow zu Hochzeiten in Kurhotels, Galas und Premium-Events mit Alpenpanorama.",
    highlight: "Bad Reichenhall ist klassischer Premium-Kurort mit Alpenflair — ideale Kulisse für gehobene Hochzeiten und Corporate Events.",
    einwohner: "18.000",
    bekannteLocations: ["Kurhaus Bad Reichenhall", "Steigenberger Hotel Bad Reichenhall", "Predigtstuhlbahn (Eventbereich)", "Kurpark-Pavillon", "Hotel Bayerischer Hof Bad Reichenhall"],
    faq: [
      { q: "Was kostet ein Zauberer in Bad Reichenhall?", a: "Die Preise hängen vom Format und der Logistik ab. Bei Übernachtung kalkuliere ich transparent. Kostenloses Angebot auf Anfrage." },
      { q: "Tritt der Zauberer in Kurhotels in Bad Reichenhall auf?", a: "Ja, traditionsreiche Kurhotels und Premium-Locations in Bad Reichenhall betreue ich regelmäßig — passender Stil für klassisch-elegante Settings." },
    ],
    seoText: "Zauberer Bad Reichenhall: Emilian Leber bringt Premium-Entertainment zu Hochzeiten, Galas und Events in Bad Reichenhall und dem Berchtesgadener Land.",
    langText: `Bad Reichenhall ist traditionsreicher Premium-Kurort mit Alpenflair — ideale Kulisse für gehobene Hochzeiten und Corporate-Events. Als Zauberer für Bad Reichenhall bringe ich Entertainment, das zum Niveau der Stadt passt.

Vom Kurhaus über das Steigenberger Hotel bis zu privaten Schloss-Locations in der Umgebung — Bad Reichenhall und das Berchtesgadener Land bieten einzigartige Settings. Ich liefere das passende Showkonzept.

Kosten Zauberer Bad Reichenhall: Pakete ab 395 €, Anfahrt und ggf. Übernachtung transparent kalkuliert.`,
  },
  {
    slug: "eichstaett",
    name: "Eichstätt",
    region: "Bayern",
    intro: "Eichstätt — barocke Bischofsstadt und Universitätsstadt im Naturpark Altmühltal. Als Zauberer für Eichstätt bringe ich Close-Up Magie und Bühnenshow zu Hochzeiten in historischen Sälen, Universitätsgalas und Firmenfeiern.",
    highlight: "Eichstätt ist Universitätsstadt mit barocker Altstadt — ideal für Hochschulgalas, Hochzeiten mit Kultur und Firmen-Events mit Charakter.",
    einwohner: "13.000",
    bekannteLocations: ["Residenzplatz Eichstätt", "Hotel Sonne", "Sommerresidenz (Eventbereich)", "Wirtschaftsschule (Veranstaltungsräume)", "Domplatz Eichstätt"],
    faq: [
      { q: "Was kostet ein Zauberer in Eichstätt?", a: "Die Preise hängen vom Format ab. Anfahrt aus Regensburg ca. 1,5 Stunden, im Angebot inklusive. Kostenloses Angebot auf Anfrage." },
      { q: "Tritt der Zauberer auf Hochschul-Events in Eichstätt auf?", a: "Ja, Universitätsgalas, Absolventenfeiern und Hochschul-Events der Katholischen Universität Eichstätt-Ingolstadt gehören zu meinen Einsätzen." },
    ],
    seoText: "Zauberer Eichstätt: Emilian Leber bringt Close-Up Magie und Bühnenshow zu Hochzeiten, Hochschulgalas und Firmenfeiern in Eichstätt und im Altmühltal.",
    langText: `Eichstätt ist barocke Bischofsstadt und Universitätsstandort im Naturpark Altmühltal. Als Zauberer für Eichstätt bringe ich Entertainment zu Hochzeiten in historischen Sälen, Hochschulgalas der KU Eichstätt-Ingolstadt und Firmenfeiern.

Vom Residenzplatz über die Sommerresidenz bis zu Hochzeits-Locations im Altmühltal — Eichstätt und die Region bieten einzigartige Rahmen für besondere Anlässe.

Kosten Zauberer Eichstätt: Pakete ab 395 €, Anfahrt aus Regensburg inklusive.`,
  },
  {
    slug: "pfaffenhofen-an-der-ilm",
    name: "Pfaffenhofen an der Ilm",
    region: "Bayern",
    intro: "Pfaffenhofen an der Ilm — Hauptstadt der Hallertau und Hopfenanbaugebiet zwischen München und Ingolstadt. Als Zauberer für Pfaffenhofen bringe ich Close-Up Magie und Bühnenshow zu Hochzeiten, Brauerei-Events und Firmenfeiern.",
    highlight: "Pfaffenhofen liegt zwischen München und Ingolstadt — Hallertau, Hopfen und Hofbrauereien machen die Region zu einer einzigartigen Event-Destination.",
    einwohner: "27.000",
    bekannteLocations: ["Festhalle Pfaffenhofen", "Stockerhof", "Schloss Scheyern (Umgebung)", "Hofbrauhaus (Veranstaltungsbereich)", "Hauptplatz Pfaffenhofen"],
    faq: [
      { q: "Was kostet ein Zauberer in Pfaffenhofen?", a: "Die Preise hängen vom Format ab. Anfahrt aus Regensburg ca. 1 Stunde, im Angebot inklusive." },
      { q: "Tritt der Zauberer in Brauereien in der Hallertau auf?", a: "Ja, Brauerei-Events, Sommerfeste und Hochzeiten in Brauerei-Sälen der Hallertau gehören zu meinem Repertoire. Bayerische Tonalität, modernes Entertainment." },
    ],
    seoText: "Zauberer Pfaffenhofen an der Ilm: Emilian Leber bringt Close-Up Magie und Bühnenshow zu Hochzeiten, Brauerei-Events und Firmenfeiern in der Hallertau.",
    langText: `Pfaffenhofen an der Ilm ist Hauptstadt der Hallertau — der größte Hopfenanbauregion der Welt. Als Zauberer für Pfaffenhofen bringe ich Entertainment zu Hochzeiten, Brauerei-Events und Firmenfeiern in einer einzigartigen Eventregion.

Von der Festhalle über das Schloss Scheyern bis zu Hochzeits-Locations in den umliegenden Brauerei-Sälen — die Hallertau bietet außergewöhnliche Settings mit bayerischem Charme.

Kosten Zauberer Pfaffenhofen: Pakete ab 395 €, Anfahrt aus Regensburg inklusive.`,
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
    slug: "kulmbach",
    name: "Kulmbach",
    region: "Bayern",
    intro: "Kulmbach — die fränkische Bierhauptstadt mit der Plassenburg über der Altstadt. Als Zauberer für Kulmbach bringe ich Close-Up Magie und Bühnenshow zu Brauerei-Events, Hochzeiten und Firmenfeiern in Oberfranken.",
    highlight: "Kulmbach ist Frankens Bierhauptstadt — Mönchshof, Kulmbacher Bier, Plassenburg. Eventkultur mit fränkischem Charakter.",
    einwohner: "26.000",
    bekannteLocations: ["Plassenburg Kulmbach", "Kulmbacher Mönchshof", "Stadthalle Kulmbach", "Brauereigasthof Goller", "Bayerisches Brauereimuseum (Eventbereich)"],
    faq: [
      { q: "Was kostet ein Zauberer in Kulmbach?", a: "Die Preise hängen vom Format ab. Anfahrt aus Regensburg ca. 2 Stunden, im Angebot inklusive." },
      { q: "Tritt der Zauberer bei Brauerei-Events in Kulmbach auf?", a: "Ja, Brauerei-Events, Bierfeste und Firmenfeiern in Kulmbach gehören zu meinem Repertoire. Fränkische Tonalität, modernes Entertainment." },
    ],
    seoText: "Zauberer Kulmbach: Emilian Leber bringt Close-Up Magie und Bühnenshow zu Brauerei-Events, Hochzeiten und Firmenfeiern in Kulmbach und Oberfranken.",
    langText: `Kulmbach ist Frankens Bierhauptstadt und Heimat traditionsreicher Brauereien wie Mönchshof und Kulmbacher. Als Zauberer für Kulmbach bringe ich Entertainment zu Brauerei-Events, Hochzeiten in der Plassenburg-Region und Firmenfeiern.

Von der Plassenburg über den Kulmbacher Mönchshof bis zu Hochzeits-Locations in oberfränkischen Hotels — Kulmbach bietet Settings mit Charakter. Mein Programm passe ich der bayerisch-fränkischen Tonalität an.

Kosten Zauberer Kulmbach: Pakete ab 395 €, Anfahrt im Angebot kalkuliert.`,
  },
  {
    slug: "ansbach",
    name: "Ansbach",
    region: "Bayern",
    intro: "Ansbach — barocke Markgrafenstadt und Regierungssitz Mittelfrankens. Als Zauberer für Ansbach bringe ich Close-Up Magie und Bühnenshow zu Hochzeiten in Residenzräumen, Firmenfeiern und Galas in einer der schönsten Barockstädte Bayerns.",
    highlight: "Ansbach ist Markgrafenstadt mit barocker Altstadt und Residenzcharakter — perfekte Kulisse für gehobene Hochzeiten und Premium-Events.",
    einwohner: "42.000",
    bekannteLocations: ["Markgrafenschloss Ansbach", "Hofgarten Ansbach (Eventbereich)", "Onoldsaal", "Hotel Zur Windmühle", "Reitschule (Veranstaltungsraum)"],
    faq: [
      { q: "Was kostet ein Zauberer in Ansbach?", a: "Die Preise hängen vom Format ab. Kostenloses Angebot auf Anfrage, individuell auf dein Event zugeschnitten." },
      { q: "Tritt der Zauberer im Markgrafenschloss Ansbach auf?", a: "Ja, Schloss-Hochzeiten und Galas im Markgrafenschloss gehören zu meinen schönsten Auftritten. Barockes Ambiente, elegante Tonalität." },
    ],
    seoText: "Zauberer Ansbach: Emilian Leber bringt Close-Up Magie und Bühnenshow zu Hochzeiten im Markgrafenschloss, Firmenfeiern und Galas in Ansbach und Mittelfranken.",
    langText: `Ansbach ist barocke Markgrafenstadt mit Residenzcharakter und Regierungssitz Mittelfrankens. Als Zauberer für Ansbach bringe ich Entertainment zu Hochzeiten im Markgrafenschloss, Galas im Onoldsaal und Firmenfeiern in den schönen Hotels der Stadt.

Von der barocken Altstadt über die Reitschule bis zu Hochzeits-Locations im Hofgarten — Ansbach bietet außergewöhnliche Rahmen für besondere Anlässe. Mein Programm passe ich an: ruhig-elegant, mit eingebauten Anekdoten.

Kosten Zauberer Ansbach: Pakete ab 395 €, Anfahrt im Angebot kalkuliert.`,
  },
  {
    slug: "rothenburg-ob-der-tauber",
    name: "Rothenburg ob der Tauber",
    region: "Bayern",
    intro: "Rothenburg ob der Tauber — eine der besterhaltenen mittelalterlichen Städte Europas. Als Zauberer für Rothenburg bringe ich Close-Up Magie und Bühnenshow zu Hochzeiten in der Altstadt, Galas in historischen Hotels und Premium-Events mit Märchenkulisse.",
    highlight: "Rothenburg ist mittelalterliches Juwel an der Romantischen Straße — Touristenmagnet weltweit und einzigartige Hochzeitsdestination.",
    einwohner: "11.000",
    bekannteLocations: ["Hotel Eisenhut", "Reichsstadt-Festhalle Rothenburg", "Hotel Burg-Hotel Rothenburg", "Ratstrinkstube (Eventbereich)", "Schrannenscheune"],
    faq: [
      { q: "Was kostet ein Zauberer in Rothenburg ob der Tauber?", a: "Die Preise hängen vom Format ab. Anfahrt transparent kalkuliert, kostenloses Angebot auf Anfrage." },
      { q: "Tritt der Zauberer auf internationalen Hochzeiten in Rothenburg auf?", a: "Ja, Rothenburg zieht internationale Hochzeitsgäste an — Magie funktioniert über Sprachgrenzen hinweg. Programm anpassbar mit englischen Moderations-Elementen." },
    ],
    seoText: "Zauberer Rothenburg ob der Tauber: Emilian Leber bringt Close-Up Magie und Bühnenshow zu Hochzeiten in der mittelalterlichen Altstadt, Galas und Premium-Events.",
    langText: `Rothenburg ob der Tauber ist eine der besterhaltenen mittelalterlichen Städte Europas und zieht Hochzeitspaare aus aller Welt an. Als Zauberer für Rothenburg bringe ich Entertainment, das zur Märchenkulisse passt — elegant, persönlich, mit eingebauten Anekdoten.

Vom Hotel Eisenhut über die Reichsstadt-Festhalle bis zu Hochzeiten in historischen Sälen der Altstadt — Rothenburg bietet einzigartige Settings. Auch englischsprachige Moderation und internationale Hochzeitsgäste sind kein Problem.

Kosten Zauberer Rothenburg: Pakete ab 395 €, Anfahrt und ggf. Übernachtung transparent kalkuliert.`,
  },
  {
    slug: "noerdlingen",
    name: "Nördlingen",
    region: "Bayern",
    intro: "Nördlingen — mittelalterliche Reichsstadt im Ries-Krater, eine der besterhaltenen historischen Städte Süddeutschlands. Als Zauberer für Nördlingen bringe ich Close-Up Magie und Bühnenshow zu Hochzeiten in der Altstadt, Galas und Firmenfeiern.",
    highlight: "Nördlingen liegt im Ries-Meteoritenkrater und ist eine der schönsten mittelalterlichen Städte Bayerns — historischer Rahmen mit Hollywood-Aura.",
    einwohner: "20.000",
    bekannteLocations: ["Daniel-Turm (Eventbereich)", "Festsaal Klösterle", "Hotel Sonne Nördlingen", "Kaisersaal", "Rieskrater-Museum (Umfeld)"],
    faq: [
      { q: "Was kostet ein Zauberer in Nördlingen?", a: "Die Preise hängen vom Format ab. Anfahrt transparent kalkuliert, kostenloses Angebot auf Anfrage." },
      { q: "Tritt der Zauberer auf Hochzeiten in der Altstadt Nördlingen auf?", a: "Ja, Hochzeiten in den historischen Sälen Nördlingens gehören zu meinen schönsten Auftritten. Mittelalterliches Ambiente, elegante moderne Show." },
    ],
    seoText: "Zauberer Nördlingen: Emilian Leber bringt Close-Up Magie und Bühnenshow zu Hochzeiten in der mittelalterlichen Altstadt, Galas und Firmenfeiern im Ries.",
    langText: `Nördlingen ist eine der schönsten mittelalterlichen Städte Süddeutschlands — im Zentrum des Ries-Meteoritenkraters gelegen, mit komplett erhaltener Stadtmauer und historischer Altstadt. Als Zauberer für Nördlingen bringe ich Entertainment, das zum besonderen Rahmen passt.

Vom Festsaal Klösterle über den Kaisersaal bis zum Daniel-Turm — Nördlingen bietet einzigartige Locations. Ich liefere das passende Programm für Hochzeiten, Galas und Firmenfeiern in der Reichsstadt.

Kosten Zauberer Nördlingen: Pakete ab 395 €, Anfahrt im Angebot kalkuliert.`,
  },
  {
    slug: "donauwoerth",
    name: "Donauwörth",
    region: "Bayern",
    intro: "Donauwörth — Reichsstadt an der Romantischen Straße, am Zusammenfluss von Donau und Wörnitz. Als Zauberer für Donauwörth bringe ich Close-Up Magie und Bühnenshow zu Hochzeiten, Firmenfeiern und Galas im schwäbisch-bayerischen Donau-Ries.",
    highlight: "Donauwörth liegt an der Romantischen Straße — historisches Stadtbild, lebendige Eventkultur, schwäbisch-bayerische Tradition.",
    einwohner: "20.000",
    bekannteLocations: ["Tanzhaus Donauwörth", "Reichsstraße Donauwörth", "Hotel Goldener Hirsch", "Schloss Leitheim (Umgebung)", "Liebfrauenmünster (Umfeld)"],
    faq: [
      { q: "Was kostet ein Zauberer in Donauwörth?", a: "Die Preise hängen vom Format ab. Anfahrt aus Regensburg transparent kalkuliert, kostenloses Angebot auf Anfrage." },
      { q: "Tritt der Zauberer auf Hochzeiten in Schlössern bei Donauwörth auf?", a: "Ja, Schloss-Hochzeiten in der Region — z. B. Schloss Leitheim und andere Premium-Locations — gehören zu meinen schönsten Auftritten." },
    ],
    seoText: "Zauberer Donauwörth: Emilian Leber bringt Close-Up Magie und Bühnenshow zu Hochzeiten, Firmenfeiern und Galas in Donauwörth und im Donau-Ries.",
    langText: `Donauwörth ist historische Reichsstadt an der Romantischen Straße — am Zusammenfluss von Donau und Wörnitz gelegen. Als Zauberer für Donauwörth bringe ich Entertainment zu Hochzeiten in der Altstadt, Galas im Tanzhaus und Firmenfeiern in der schwäbisch-bayerischen Region.

Von Reichsstraße-Locations über das Hotel Goldener Hirsch bis zu Schloss-Hochzeiten in der Umgebung — Donauwörth und das Donau-Ries bieten vielfältige Settings.

Kosten Zauberer Donauwörth: Pakete ab 395 €, Anfahrt im Angebot kalkuliert.`,
  },
  /* ═══════════════════════════════════════════════════════════
     ORTE RUND UM REGENSBURG (Landkreis Regensburg + Nachbarlandkreise)
     Anfahrt typisch 10–45 Min aus Regensburg — kurze Wege, hohe Verfügbarkeit.
     ═══════════════════════════════════════════════════════════ */
  {
    slug: "neutraubling",
    name: "Neutraubling",
    region: "Bayern",
    intro: "Neutraubling — die jüngste Stadt im Landkreis Regensburg, östlich der Domstadt gelegen. Als Zauberer für Neutraubling bin ich in 15 Minuten vor Ort — Close-Up Magie, Bühnenshow und Magic Dinner für Hochzeiten, Firmenfeiern und Geburtstage.",
    highlight: "Neutraubling ist direkter Nachbar von Regensburg — Anfahrt unter 15 Minuten, volle Verfügbarkeit auch kurzfristig.",
    einwohner: "13.500",
    bekannteLocations: ["Hammerschmiede Neutraubling", "Stadtsaal Neutraubling", "Hotel Schreiner", "Industriegebiet Neutraubling (Veranstaltungsräume)"],
    faq: [
      { q: "Was kostet ein Zauberer in Neutraubling?", a: "Anfahrt aus Regensburg unter 15 Minuten — keine zusätzliche Anfahrtspauschale. Kostenloses Angebot je nach Format auf Anfrage." },
      { q: "Tritt der Zauberer auch in Industriebetrieben in Neutraubling auf?", a: "Ja, Firmenfeiern bei Neutraublinger Unternehmen — vom Mittelstand bis zu größeren Industriebetrieben — gehören zu meinen regulären Einsätzen." },
    ],
    seoText: "Zauberer Neutraubling: Emilian Leber bringt Close-Up Magie und Bühnenshow zu Hochzeiten, Firmenfeiern und Geburtstagen in Neutraubling und im Landkreis Regensburg.",
    langText: `Als Zauberer für Neutraubling bin ich aus Regensburg in 15 Minuten vor Ort — kurze Anfahrt, volle Verfügbarkeit, auch kurzfristige Termine möglich. Von der Hammerschmiede über den Stadtsaal bis zu Hochzeits-Locations in der Region.

Neutraubling ist Industriestandort mit starkem Mittelstand — Firmenfeiern, Weihnachtsfeiern und Jubiläen sind häufige Anlässe. Mein Programm passt sich der Unternehmenskultur an.

Kosten Zauberer Neutraubling: Pakete ab 395 €, keine zusätzliche Anfahrt aus Regensburg.`,
  },
  {
    slug: "lappersdorf",
    name: "Lappersdorf",
    region: "Bayern",
    intro: "Lappersdorf — direkt nördlich an Regensburg angrenzend. Als Zauberer für Lappersdorf bin ich in 10 Minuten bei dir — Close-Up Magie, Bühnenshow und Magic Dinner für jeden Anlass im Landkreis Regensburg.",
    highlight: "Lappersdorf ist Vorort-Gemeinde nördlich von Regensburg — kürzester Anfahrtsweg, volle Flexibilität.",
    einwohner: "13.000",
    bekannteLocations: ["Bürgerhaus Lappersdorf", "Gemeindezentrum", "Schlosshotel Lappersdorf-Umgebung", "Gasthof Pirzer"],
    faq: [
      { q: "Was kostet ein Zauberer in Lappersdorf?", a: "Anfahrt aus Regensburg in 10 Minuten — keine separate Anreisepauschale. Format-abhängiges Angebot auf Anfrage." },
      { q: "Eignet sich der Zauberer für Vereinsfeste in Lappersdorf?", a: "Ja, Vereinsjubiläen, Schützenfeste und größere Privatfeiern in Lappersdorf betreue ich regelmäßig." },
    ],
    seoText: "Zauberer Lappersdorf: Emilian Leber bringt Close-Up Magie und Bühnenshow zu Hochzeiten, Firmenfeiern und privaten Anlässen in Lappersdorf und im Landkreis Regensburg.",
    langText: `Lappersdorf grenzt direkt an Regensburg an — als Zauberer für Lappersdorf bin ich in 10 Minuten vor Ort. Hochzeiten im Schlosshotel-Umfeld, Firmenfeiern im Bürgerhaus oder Vereinsjubiläen im Gemeindezentrum.

Als Zauberer aus Regensburg kenne ich Lappersdorf und seine Veranstaltungs-Logistik genau. Kurze Anfahrt, volle Verfügbarkeit, auch für kurzfristige Termine.

Kosten Zauberer Lappersdorf: Pakete ab 395 €, Anfahrt inklusive.`,
  },
  {
    slug: "wenzenbach",
    name: "Wenzenbach",
    region: "Bayern",
    intro: "Wenzenbach — Gemeinde nordöstlich von Regensburg, idyllische Lage. Als Zauberer für Wenzenbach bringe ich Close-Up Magie und Bühnenshow zu Hochzeiten, Firmenfeiern und Privatanlässen im Landkreis Regensburg.",
    highlight: "Wenzenbach liegt 15 Minuten nordöstlich von Regensburg — Bürgerhaus, Gasthöfe und Hochzeits-Locations im ländlichen Umfeld.",
    einwohner: "8.500",
    bekannteLocations: ["Bürgerhaus Wenzenbach", "Gasthof Heitzer", "Pfarrheim Wenzenbach", "Landhotel-Umfeld"],
    faq: [
      { q: "Was kostet ein Zauberer in Wenzenbach?", a: "Anfahrt aus Regensburg unter 20 Minuten — Format-abhängiges Angebot auf Anfrage, ohne Aufschlag." },
      { q: "Tritt der Zauberer auch auf Landhochzeiten in Wenzenbach auf?", a: "Ja, Landhochzeiten mit bayerischer Tonalität sind eine meiner schönsten Disziplinen. Tisch-zu-Tisch beim Dinner, Bühne vor dem Tanz." },
    ],
    seoText: "Zauberer Wenzenbach: Emilian Leber bringt Close-Up Magie und Bühnenshow zu Hochzeiten, Firmenfeiern und privaten Anlässen in Wenzenbach und im Landkreis Regensburg.",
    langText: `Wenzenbach ist ländliche Gemeinde 15 Minuten nordöstlich von Regensburg. Als Zauberer für Wenzenbach bringe ich modernes Entertainment zu Landhochzeiten, Vereinsfeiern und privaten Anlässen — bayerische Tonalität, eleganter Stil.

Vom Bürgerhaus über das Pfarrheim bis zu Landgasthöfen — Wenzenbach bietet authentische Settings für besondere Anlässe. Kurze Anfahrt aus Regensburg, volle Verfügbarkeit.

Kosten Zauberer Wenzenbach: Pakete ab 395 €, Anfahrt im Angebot kalkuliert.`,
  },
  {
    slug: "donaustauf",
    name: "Donaustauf",
    region: "Bayern",
    intro: "Donaustauf — Markt östlich von Regensburg, weltbekannt für die Walhalla über der Donau. Als Zauberer für Donaustauf bringe ich Close-Up Magie und Bühnenshow zu Hochzeiten an der Walhalla, Firmenfeiern und Galas mit Donaupanorama.",
    highlight: "Donaustauf ist mit Walhalla und Burgruine eine der schönsten Eventdestinationen im Regensburger Umland — Hochzeiten mit Donaublick.",
    einwohner: "4.000",
    bekannteLocations: ["Walhalla (Umfeld)", "Burgruine Donaustauf", "Gasthof Maxhütte Donaustauf", "Landhotel Forstpark", "Hotel-Restaurant am Donaupark"],
    faq: [
      { q: "Was kostet ein Zauberer in Donaustauf?", a: "Anfahrt aus Regensburg 15 Minuten — keine zusätzliche Anfahrt. Format-abhängiges Angebot auf Anfrage." },
      { q: "Tritt der Zauberer auf Hochzeiten an der Walhalla auf?", a: "Ja, Hochzeiten mit Walhalla-Ambiente und Donaublick gehören zu meinen schönsten Auftritten in der Region. Historische Kulisse, elegante moderne Show." },
    ],
    seoText: "Zauberer Donaustauf: Emilian Leber bringt Close-Up Magie und Bühnenshow zu Hochzeiten an der Walhalla, Firmenfeiern und Galas im Landkreis Regensburg.",
    langText: `Donaustauf ist mit der Walhalla eine der bekanntesten Eventdestinationen im Regensburger Umland. Als Zauberer für Donaustauf bringe ich Entertainment zu Walhalla-Hochzeiten, Galas mit Donaublick und Firmenfeiern im historischen Markt.

Vom Gasthof Maxhütte über das Landhotel Forstpark bis zu Hochzeits-Locations am Donauufer — Donaustauf bietet einzigartige Settings. Mein Programm passt sich an: ruhig-elegant, mit Mentaleffekten und Standing-Ovation-Finale.

Kosten Zauberer Donaustauf: Pakete ab 395 €, Anfahrt aus Regensburg inklusive.`,
  },
  {
    slug: "tegernheim",
    name: "Tegernheim",
    region: "Bayern",
    intro: "Tegernheim — Gemeinde direkt östlich von Regensburg an der Donau. Als Zauberer für Tegernheim bin ich in 15 Minuten bei dir — Close-Up Magie, Bühnenshow und Magic Dinner.",
    highlight: "Tegernheim liegt direkt an Regensburgs Stadtgrenze — schnelle Anfahrt, ideale Verfügbarkeit auch kurzfristig.",
    einwohner: "5.500",
    bekannteLocations: ["Bürgerhaus Tegernheim", "Pfarrheim St. Vitus", "Gasthof Bäuml", "Donau-Eventbereich"],
    faq: [
      { q: "Was kostet ein Zauberer in Tegernheim?", a: "Anfahrt aus Regensburg unter 15 Minuten — keine Aufschläge. Format-abhängiges Angebot auf Anfrage." },
      { q: "Tritt der Zauberer bei Familienfeiern in Tegernheim auf?", a: "Ja, Geburtstage, Hochzeiten und Jubiläen in Tegernheim betreue ich gerne — bayerische Tonalität, moderne Show." },
    ],
    seoText: "Zauberer Tegernheim: Emilian Leber bringt Close-Up Magie und Bühnenshow zu Hochzeiten, Geburtstagen und Familienfeiern in Tegernheim und im Landkreis Regensburg.",
    langText: `Tegernheim grenzt direkt an Regensburg an — als Zauberer für Tegernheim bin ich in 15 Minuten vor Ort. Vom Bürgerhaus über das Pfarrheim bis zu Privatfeiern in der Gemeinde.

Tegernheim ist ein gefragter Hochzeits- und Geburtstagsort im direkten Regensburger Umland. Kurze Wege, volle Verfügbarkeit, eingespielte Logistik.

Kosten Zauberer Tegernheim: Pakete ab 395 €, Anfahrt inklusive.`,
  },
  {
    slug: "barbing",
    name: "Barbing",
    region: "Bayern",
    intro: "Barbing — Gemeinde südöstlich von Regensburg, an der Donau gelegen. Als Zauberer für Barbing bringe ich Close-Up Magie und Bühnenshow zu Hochzeiten, Firmenfeiern und Vereinsjubiläen.",
    highlight: "Barbing ist Wirtschaftsstandort südöstlich von Regensburg — kurze Anfahrt, idealer Ort für Firmenfeiern und Hochzeiten.",
    einwohner: "5.500",
    bekannteLocations: ["Mehrzweckhalle Barbing", "Pfarrheim Barbing", "Gewerbegebiet Barbing", "Landgasthof Hofbräu"],
    faq: [
      { q: "Was kostet ein Zauberer in Barbing?", a: "Anfahrt aus Regensburg unter 20 Minuten — kein Aufschlag. Format-abhängiges Angebot auf Anfrage." },
      { q: "Tritt der Zauberer bei Firmenfeiern in Barbing auf?", a: "Ja, Firmenfeiern für Barbinger Unternehmen — Weihnachtsfeiern, Sommerfeste, Jubiläen — betreue ich regelmäßig." },
    ],
    seoText: "Zauberer Barbing: Emilian Leber bringt Close-Up Magie und Bühnenshow zu Firmenfeiern, Hochzeiten und Vereinsjubiläen in Barbing und im Landkreis Regensburg.",
    langText: `Barbing ist eine Wirtschaftsgemeinde südöstlich von Regensburg. Als Zauberer für Barbing bringe ich modernes Entertainment zu Firmenfeiern in der Mehrzweckhalle, Hochzeiten im Landgasthof Hofbräu und Vereinsjubiläen.

Kurze Anfahrt aus Regensburg, volle Verfügbarkeit, eingespielte Logistik mit Locations vor Ort.

Kosten Zauberer Barbing: Pakete ab 395 €, Anfahrt inklusive.`,
  },
  {
    slug: "pentling",
    name: "Pentling",
    region: "Bayern",
    intro: "Pentling — Gemeinde südwestlich von Regensburg, direkt an der A93. Als Zauberer für Pentling bringe ich Close-Up Magie und Bühnenshow zu Hochzeiten, Firmenfeiern und Privatanlässen.",
    highlight: "Pentling ist Vorort südwestlich von Regensburg — Wirtschafts- und Wohnstandort mit aktiver Vereinskultur.",
    einwohner: "9.000",
    bekannteLocations: ["Bürgerhaus Pentling", "Gewerbegebiet Pentling", "Gasthof Brauerei Pentling", "Pfarrheim"],
    faq: [
      { q: "Was kostet ein Zauberer in Pentling?", a: "Anfahrt aus Regensburg unter 15 Minuten — kein Aufschlag. Format-abhängiges Angebot auf Anfrage." },
      { q: "Tritt der Zauberer auch in Firmen im Gewerbegebiet Pentling auf?", a: "Ja, Firmenfeiern für Pentlinger Unternehmen — Weihnachtsfeiern, Jubiläen, Mitarbeiter-Events — gehören zu meinen regulären Einsätzen." },
    ],
    seoText: "Zauberer Pentling: Emilian Leber bringt Close-Up Magie und Bühnenshow zu Firmenfeiern, Hochzeiten und privaten Anlässen in Pentling und im Landkreis Regensburg.",
    langText: `Pentling ist Vorort südwestlich von Regensburg, direkt an der A93. Als Zauberer für Pentling betreue ich Firmenfeiern im Gewerbegebiet, Hochzeiten im Bürgerhaus und private Anlässe in Gasthöfen.

Kurze Anfahrt aus Regensburg, volle Verfügbarkeit. Ideales Einzugsgebiet für Weihnachtsfeiern Pentlinger Unternehmen.

Kosten Zauberer Pentling: Pakete ab 395 €, Anfahrt inklusive.`,
  },
  {
    slug: "sinzing",
    name: "Sinzing",
    region: "Bayern",
    intro: "Sinzing — Gemeinde westlich von Regensburg an der Donau. Heimat des Restaurant Wald & Wiese, meinem Magic-Dinner-Hauspartner. Als Zauberer für Sinzing bringe ich Magie direkt in die Gemeinde — Close-Up, Bühnenshow und Magic Dinner.",
    highlight: "Sinzing ist Heimat des Restaurants Wald & Wiese — meinem Magic-Dinner-Hauspartner. Hier finden regelmäßig Magic-Dinner-Abende statt.",
    einwohner: "6.000",
    bekannteLocations: ["Restaurant Wald & Wiese Sinzing", "Klosterkirche Sinzing", "Bürgerhaus Sinzing", "Schloss Eilsbrunn"],
    faq: [
      { q: "Findet das Magic Dinner in Sinzing statt?", a: "Ja — das Restaurant Wald & Wiese in Sinzing ist mein Hauspartner für Magic-Dinner-Abende. Ticket-Events und private Magic Dinners regelmäßig hier." },
      { q: "Tritt der Zauberer auch auf Privatfeiern in Sinzing auf?", a: "Selbstverständlich — Hochzeiten, Geburtstage und Jubiläen in Sinzing und Umgebung betreue ich regelmäßig." },
    ],
    seoText: "Zauberer Sinzing: Emilian Leber bringt Magic Dinner, Close-Up Magie und Bühnenshow zu Events in Sinzing — auch im Restaurant Wald & Wiese, meinem Hauspartner.",
    langText: `Sinzing ist Heimat des Restaurant Wald & Wiese — meinem Magic-Dinner-Hauspartner. Hier finden regelmäßig öffentliche Magic-Dinner-Ticketabende statt, ebenso Privatbuchungen. Als Zauberer für Sinzing bin ich aus Regensburg in 20 Minuten vor Ort.

Neben dem Magic Dinner im Wald & Wiese betreue ich in Sinzing auch Hochzeiten, Geburtstage und Firmenfeiern — vom Bürgerhaus bis zu Hochzeits-Locations am Donauufer.

Kosten Zauberer Sinzing: Pakete ab 395 €, Anfahrt aus Regensburg inklusive.`,
  },
  {
    slug: "pielenhofen",
    name: "Pielenhofen",
    region: "Bayern",
    intro: "Pielenhofen — Klostergemeinde im Naabtal nordwestlich von Regensburg. Als Zauberer für Pielenhofen bringe ich Close-Up Magie und Bühnenshow zu Hochzeiten in Klosteranlagen, Firmenfeiern und privaten Anlässen.",
    highlight: "Pielenhofen ist mit dem Kloster und der historischen Klosterkirche eine der schönsten Hochzeitsdestinationen im Regensburger Umland.",
    einwohner: "3.000",
    bekannteLocations: ["Kloster Pielenhofen", "Klosterkirche Pielenhofen", "Naabtal-Hotels", "Schloss-Naab-Umfeld"],
    faq: [
      { q: "Was kostet ein Zauberer in Pielenhofen?", a: "Anfahrt aus Regensburg ca. 30 Minuten — Format-abhängiges Angebot auf Anfrage." },
      { q: "Tritt der Zauberer auf Hochzeiten im Kloster Pielenhofen auf?", a: "Ja, Klosterhochzeiten gehören zu meinen schönsten Auftritten — historisches Ambiente, festliche Tonalität, elegante moderne Show." },
    ],
    seoText: "Zauberer Pielenhofen: Emilian Leber bringt Close-Up Magie und Bühnenshow zu Hochzeiten am Kloster Pielenhofen und im Naabtal.",
    langText: `Pielenhofen im Naabtal ist mit dem Kloster und der Klosterkirche eine der romantischsten Hochzeitsdestinationen im Regensburger Umland. Als Zauberer für Pielenhofen bringe ich Entertainment, das zur klösterlichen Atmosphäre passt — festlich-warm, mit Augenmaß.

Vom Kloster Pielenhofen über Hotels im Naabtal bis zu Hochzeits-Locations rund um die Klosterkirche — die Region bietet einzigartige Settings.

Kosten Zauberer Pielenhofen: Pakete ab 395 €, Anfahrt aus Regensburg inklusive.`,
  },
  {
    slug: "pettendorf",
    name: "Pettendorf",
    region: "Bayern",
    intro: "Pettendorf — Gemeinde nordwestlich von Regensburg im Naabtal. Als Zauberer für Pettendorf bringe ich Close-Up Magie und Bühnenshow zu Hochzeiten, Firmenfeiern und Vereinsanlässen.",
    highlight: "Pettendorf liegt 15 Minuten nordwestlich von Regensburg — ländliches Umfeld mit aktiver Vereinskultur.",
    einwohner: "5.500",
    bekannteLocations: ["Bürgerhaus Pettendorf", "Pfarrheim St. Peter und Paul", "Sportgaststätte Pettendorf", "Landgasthof Umgebung"],
    faq: [
      { q: "Was kostet ein Zauberer in Pettendorf?", a: "Anfahrt aus Regensburg unter 20 Minuten — kein Aufschlag. Angebot auf Anfrage." },
      { q: "Tritt der Zauberer auch auf Vereinsjubiläen in Pettendorf auf?", a: "Ja, Vereinsfeste, Sportlerfeiern und Schützenjubiläen in Pettendorf gehören zu meinen Einsätzen." },
    ],
    seoText: "Zauberer Pettendorf: Emilian Leber bringt Close-Up Magie und Bühnenshow zu Hochzeiten, Firmenfeiern und Vereinsfesten in Pettendorf im Landkreis Regensburg.",
    langText: `Pettendorf ist eine ländliche Gemeinde nordwestlich von Regensburg. Als Zauberer für Pettendorf bringe ich modernes Entertainment zu Landhochzeiten, Vereinsjubiläen und Privatfeiern im Bürgerhaus und in Gasthöfen der Region.

Kurze Anfahrt aus Regensburg, eingespielte Logistik, bayerische Tonalität.

Kosten Zauberer Pettendorf: Pakete ab 395 €, Anfahrt inklusive.`,
  },
  {
    slug: "zeitlarn",
    name: "Zeitlarn",
    region: "Bayern",
    intro: "Zeitlarn — Gemeinde nördlich von Regensburg. Als Zauberer für Zeitlarn bringe ich Close-Up Magie und Bühnenshow zu Hochzeiten, Firmenfeiern und privaten Anlässen im Landkreis Regensburg.",
    highlight: "Zeitlarn ist direkter Nordnachbar von Regensburg — 10 Minuten Anfahrt, ideale Verfügbarkeit.",
    einwohner: "8.000",
    bekannteLocations: ["Bürgerhaus Zeitlarn", "Pfarrheim", "Gewerbegebiet Zeitlarn", "Landgasthof Schreiner"],
    faq: [
      { q: "Was kostet ein Zauberer in Zeitlarn?", a: "Anfahrt aus Regensburg ca. 10 Minuten — keine Aufschläge. Format-abhängiges Angebot auf Anfrage." },
      { q: "Tritt der Zauberer auf Hochzeiten in Zeitlarn auf?", a: "Ja, Hochzeiten und Privatfeiern in Zeitlarn betreue ich regelmäßig — Walk-Around beim Empfang, Tisch-zu-Tisch beim Dinner, Bühne vor dem Tanz." },
    ],
    seoText: "Zauberer Zeitlarn: Emilian Leber bringt Close-Up Magie und Bühnenshow zu Hochzeiten, Firmenfeiern und privaten Anlässen in Zeitlarn und im Landkreis Regensburg.",
    langText: `Zeitlarn ist direkter Nordnachbar von Regensburg — Anfahrt in 10 Minuten. Als Zauberer für Zeitlarn betreue ich Hochzeiten, Firmenfeiern und Vereinsjubiläen vom Bürgerhaus bis zu Gasthöfen in der Gemeinde.

Kurze Wege, volle Verfügbarkeit, auch kurzfristig buchbar.

Kosten Zauberer Zeitlarn: Pakete ab 395 €, Anfahrt inklusive.`,
  },
  {
    slug: "obertraubling",
    name: "Obertraubling",
    region: "Bayern",
    intro: "Obertraubling — Gemeinde südlich von Regensburg mit eigenem Bahnhof. Als Zauberer für Obertraubling bringe ich Close-Up Magie und Bühnenshow zu Hochzeiten, Firmenfeiern und Geburtstagen.",
    highlight: "Obertraubling liegt direkt südlich von Regensburg an der Bahn — schnelle Anfahrt, gute Erreichbarkeit für überregionale Gäste.",
    einwohner: "10.500",
    bekannteLocations: ["Mehrzweckhalle Obertraubling", "Bürgerhaus", "Gasthof zur Post", "Gewerbegebiet"],
    faq: [
      { q: "Was kostet ein Zauberer in Obertraubling?", a: "Anfahrt aus Regensburg unter 15 Minuten — kein Aufschlag. Format-abhängiges Angebot auf Anfrage." },
      { q: "Tritt der Zauberer auf Firmenfeiern in Obertraubling auf?", a: "Ja, Firmenfeiern für Obertraublinger Unternehmen gehören zu meinen Einsätzen — Mittelstand und Industrie." },
    ],
    seoText: "Zauberer Obertraubling: Emilian Leber bringt Close-Up Magie und Bühnenshow zu Hochzeiten, Firmenfeiern und Geburtstagen in Obertraubling und im Landkreis Regensburg.",
    langText: `Obertraubling ist Industriegemeinde südlich von Regensburg. Als Zauberer für Obertraubling betreue ich Firmenfeiern in der Mehrzweckhalle, Hochzeiten im Gasthof zur Post und Familienfeiern in Privatlocations.

Kurze Anfahrt aus Regensburg, volle Verfügbarkeit.

Kosten Zauberer Obertraubling: Pakete ab 395 €, Anfahrt inklusive.`,
  },
  {
    slug: "alteglofsheim",
    name: "Alteglofsheim",
    region: "Bayern",
    intro: "Alteglofsheim — Gemeinde südlich von Regensburg mit barockem Schloss. Als Zauberer für Alteglofsheim bringe ich Close-Up Magie und Bühnenshow zu Schloss-Hochzeiten, Firmenfeiern und Galas.",
    highlight: "Alteglofsheim ist mit dem barocken Schloss ein gefragter Hochzeits- und Eventort südlich von Regensburg.",
    einwohner: "3.000",
    bekannteLocations: ["Schloss Alteglofsheim", "Bürgerhaus Alteglofsheim", "Schlossgarten (Eventbereich)", "Gasthof Alteglofsheim"],
    faq: [
      { q: "Tritt der Zauberer auf Schloss-Hochzeiten in Alteglofsheim auf?", a: "Ja, Hochzeiten im Schloss Alteglofsheim gehören zu meinen schönsten Auftritten in der Region. Barockes Ambiente, elegante moderne Show." },
      { q: "Was kostet ein Zauberer in Alteglofsheim?", a: "Anfahrt aus Regensburg unter 20 Minuten — kein Aufschlag. Format-abhängiges Angebot auf Anfrage." },
    ],
    seoText: "Zauberer Alteglofsheim: Emilian Leber bringt Close-Up Magie und Bühnenshow zu Schloss-Hochzeiten in Alteglofsheim und im Landkreis Regensburg.",
    langText: `Alteglofsheim ist mit dem barocken Schloss eine der schönsten Hochzeitsdestinationen südlich von Regensburg. Als Zauberer für Alteglofsheim bringe ich Entertainment, das zur barocken Kulisse passt — festlich, eingebaute Anekdoten, Standing-Ovation-Finale.

Vom Schloss bis zum Bürgerhaus — Alteglofsheim bietet Hochzeits- und Eventsettings mit Charakter.

Kosten Zauberer Alteglofsheim: Pakete ab 395 €, Anfahrt aus Regensburg inklusive.`,
  },
  {
    slug: "mintraching",
    name: "Mintraching",
    region: "Bayern",
    intro: "Mintraching — Gemeinde südöstlich von Regensburg im Donautal. Als Zauberer für Mintraching bringe ich Close-Up Magie und Bühnenshow zu Hochzeiten, Firmenfeiern und privaten Anlässen.",
    highlight: "Mintraching liegt im Donautal südöstlich von Regensburg — bayerisch-ländliches Eventumfeld.",
    einwohner: "4.500",
    bekannteLocations: ["Bürgerhaus Mintraching", "Pfarrheim", "Sportgaststätte", "Landhotel Umgebung"],
    faq: [
      { q: "Was kostet ein Zauberer in Mintraching?", a: "Anfahrt aus Regensburg ca. 20 Minuten — kein Aufschlag. Format-abhängiges Angebot auf Anfrage." },
      { q: "Tritt der Zauberer auf Landhochzeiten in Mintraching auf?", a: "Ja, Hochzeiten und Familienfeiern in Mintraching betreue ich regelmäßig — bayerische Tonalität, moderne Show." },
    ],
    seoText: "Zauberer Mintraching: Emilian Leber bringt Close-Up Magie und Bühnenshow zu Hochzeiten, Firmenfeiern und Familienfeiern in Mintraching und im Landkreis Regensburg.",
    langText: `Mintraching ist bayerisch-ländliche Gemeinde im Donautal südöstlich von Regensburg. Als Zauberer für Mintraching betreue ich Landhochzeiten, Vereinsjubiläen und private Anlässe in Bürgerhaus, Pfarrheim und Landgasthöfen.

Kurze Anfahrt aus Regensburg, eingespielte Logistik.

Kosten Zauberer Mintraching: Pakete ab 395 €, Anfahrt inklusive.`,
  },
  {
    slug: "woerth-an-der-donau",
    name: "Wörth an der Donau",
    region: "Bayern",
    intro: "Wörth an der Donau — Marktgemeinde östlich von Regensburg mit historischem Schloss. Als Zauberer für Wörth bringe ich Close-Up Magie und Bühnenshow zu Schloss-Hochzeiten, Firmenfeiern und Galas.",
    highlight: "Wörth an der Donau ist mit dem Schloss und der Altstadt eine schöne Eventdestination östlich von Regensburg.",
    einwohner: "5.000",
    bekannteLocations: ["Schloss Wörth", "Bürgerhaus Wörth", "Donau-Eventbereich", "Gasthof Schwarzfischer"],
    faq: [
      { q: "Tritt der Zauberer auf Hochzeiten im Schloss Wörth auf?", a: "Ja, Schloss-Hochzeiten in Wörth an der Donau gehören zu meinen schönsten Auftritten östlich von Regensburg." },
      { q: "Was kostet ein Zauberer in Wörth an der Donau?", a: "Anfahrt aus Regensburg ca. 25 Minuten — Format-abhängiges Angebot auf Anfrage." },
    ],
    seoText: "Zauberer Wörth an der Donau: Emilian Leber bringt Close-Up Magie und Bühnenshow zu Schloss-Hochzeiten, Firmenfeiern und Galas in Wörth.",
    langText: `Wörth an der Donau ist Marktgemeinde mit historischem Schloss östlich von Regensburg. Als Zauberer für Wörth bringe ich Entertainment zu Schloss-Hochzeiten, Galas im Bürgerhaus und Firmenfeiern.

Vom Schloss Wörth bis zu Hochzeits-Locations am Donauufer — die Region bietet schöne Settings.

Kosten Zauberer Wörth an der Donau: Pakete ab 395 €, Anfahrt aus Regensburg inklusive.`,
  },
  {
    slug: "bad-abbach",
    name: "Bad Abbach",
    region: "Bayern",
    intro: "Bad Abbach — Markt südlich von Regensburg an der Donau, traditionsreicher Kurort. Als Zauberer für Bad Abbach bringe ich Close-Up Magie und Bühnenshow zu Hochzeiten in Kurhotels, Firmenfeiern und privaten Anlässen.",
    highlight: "Bad Abbach ist Kurort mit langer Tradition und gefragter Hochzeitsort südlich von Regensburg.",
    einwohner: "12.500",
    bekannteLocations: ["Kurhaus Bad Abbach", "Kaiserthermen Bad Abbach (Eventbereich)", "Hotel Falter", "Bürgerhaus"],
    faq: [
      { q: "Was kostet ein Zauberer in Bad Abbach?", a: "Anfahrt aus Regensburg unter 20 Minuten — kein Aufschlag. Format-abhängiges Angebot auf Anfrage." },
      { q: "Tritt der Zauberer in Kurhotels in Bad Abbach auf?", a: "Ja, Hochzeiten in Kurhotels und Premium-Locations in Bad Abbach betreue ich regelmäßig — passender Stil für klassisch-elegante Settings." },
    ],
    seoText: "Zauberer Bad Abbach: Emilian Leber bringt Close-Up Magie und Bühnenshow zu Hochzeiten, Kur-Galas und Firmenfeiern in Bad Abbach und im Landkreis Kelheim.",
    langText: `Bad Abbach ist traditionsreicher Kurort südlich von Regensburg. Als Zauberer für Bad Abbach bringe ich Entertainment zu Hochzeiten in den Kurhotels, Galas im Kurhaus und Firmenfeiern in den schönen Locations der Marktgemeinde.

Kurze Anfahrt aus Regensburg, eingespielte Logistik.

Kosten Zauberer Bad Abbach: Pakete ab 395 €, Anfahrt inklusive.`,
  },
  {
    slug: "beratzhausen",
    name: "Beratzhausen",
    region: "Bayern",
    intro: "Beratzhausen — Markt westlich von Regensburg im Labertal. Als Zauberer für Beratzhausen bringe ich Close-Up Magie und Bühnenshow zu Hochzeiten, Firmenfeiern und Familienfeiern.",
    highlight: "Beratzhausen liegt im Labertal westlich von Regensburg — ländliches Eventumfeld mit aktiver Gastronomie.",
    einwohner: "5.500",
    bekannteLocations: ["Bürgerhaus Beratzhausen", "Marktplatz (Eventbereich)", "Brauereigasthof Beratzhausen", "Pfarrheim"],
    faq: [
      { q: "Was kostet ein Zauberer in Beratzhausen?", a: "Anfahrt aus Regensburg ca. 25 Minuten — Format-abhängiges Angebot auf Anfrage." },
      { q: "Tritt der Zauberer bei Brauerei-Hochzeiten in Beratzhausen auf?", a: "Ja, Hochzeiten im Brauereigasthof und privaten Locations in Beratzhausen betreue ich gerne — bayerische Tonalität." },
    ],
    seoText: "Zauberer Beratzhausen: Emilian Leber bringt Close-Up Magie und Bühnenshow zu Hochzeiten, Firmenfeiern und Familienfeiern in Beratzhausen und im Labertal.",
    langText: `Beratzhausen ist Markt im Labertal westlich von Regensburg. Als Zauberer für Beratzhausen bringe ich Entertainment zu Landhochzeiten, Brauereifeiern und privaten Anlässen.

Vom Marktplatz über den Brauereigasthof bis zum Bürgerhaus — Beratzhausen bietet authentische bayerische Settings.

Kosten Zauberer Beratzhausen: Pakete ab 395 €, Anfahrt aus Regensburg inklusive.`,
  },
  {
    slug: "hemau",
    name: "Hemau",
    region: "Bayern",
    intro: "Hemau — Stadt im Labertal westlich von Regensburg. Als Zauberer für Hemau bringe ich Close-Up Magie und Bühnenshow zu Hochzeiten, Firmenfeiern und Galas.",
    highlight: "Hemau ist die [Tangrintler Stadt] westlich von Regensburg — mit lebendiger Eventkultur und aktiver Gastronomie.",
    einwohner: "9.500",
    bekannteLocations: ["Tangrintl-Halle Hemau", "Stadthalle Hemau", "Brauereigasthof Pürner", "Marktplatz Hemau"],
    faq: [
      { q: "Was kostet ein Zauberer in Hemau?", a: "Anfahrt aus Regensburg ca. 30 Minuten — Format-abhängiges Angebot auf Anfrage." },
      { q: "Tritt der Zauberer auf Vereinsjubiläen in Hemau auf?", a: "Ja, Vereinsfeste, Schützenjubiläen und größere Privatfeiern in Hemau gehören zu meinen Einsätzen." },
    ],
    seoText: "Zauberer Hemau: Emilian Leber bringt Close-Up Magie und Bühnenshow zu Hochzeiten, Firmenfeiern und Vereinsfeiern in Hemau und im Tangrintler Land.",
    langText: `Hemau ist die Tangrintler Stadt westlich von Regensburg im Labertal. Als Zauberer für Hemau bringe ich Entertainment zu Hochzeiten in der Tangrintl-Halle, Firmenfeiern in der Stadthalle und Brauereifeiern im Brauereigasthof Pürner.

Kurze Anfahrt aus Regensburg, eingespielte Logistik.

Kosten Zauberer Hemau: Pakete ab 395 €, Anfahrt inklusive.`,
  },
  {
    slug: "riedenburg",
    name: "Riedenburg",
    region: "Bayern",
    intro: "Riedenburg — historische Stadt im Naturpark Altmühltal, südwestlich von Regensburg. Als Zauberer für Riedenburg bringe ich Close-Up Magie und Bühnenshow zu Hochzeiten in Burg-Locations, Firmenfeiern und Galas mit Altmühltal-Flair.",
    highlight: "Riedenburg ist mit Burg Rosenburg und Altmühltal-Lage eine der romantischsten Eventorte südwestlich von Regensburg.",
    einwohner: "6.000",
    bekannteLocations: ["Burg Rosenburg Riedenburg", "Stadthalle Riedenburg", "Hotel-Restaurant Altes Rathaus", "Brauereigasthof"],
    faq: [
      { q: "Was kostet ein Zauberer in Riedenburg?", a: "Anfahrt aus Regensburg ca. 45 Minuten — Format-abhängiges Angebot auf Anfrage." },
      { q: "Tritt der Zauberer auf Burg-Hochzeiten in Riedenburg auf?", a: "Ja, Hochzeiten auf der Burg Rosenburg und in historischen Locations Riedenburgs gehören zu meinen Auftritten." },
    ],
    seoText: "Zauberer Riedenburg: Emilian Leber bringt Close-Up Magie und Bühnenshow zu Burg-Hochzeiten, Firmenfeiern und Galas in Riedenburg und im Altmühltal.",
    langText: `Riedenburg ist historische Stadt im Altmühltal mit Burg Rosenburg über dem Tal. Als Zauberer für Riedenburg bringe ich Entertainment zu Burg-Hochzeiten, Galas in der Stadthalle und Firmenfeiern in den Hotels der Region.

Vom Naturpark-Ambiente bis zur historischen Altstadt — Riedenburg bietet einzigartige Settings.

Kosten Zauberer Riedenburg: Pakete ab 395 €, Anfahrt aus Regensburg inklusive.`,
  },
  {
    slug: "schierling",
    name: "Schierling",
    region: "Bayern",
    intro: "Schierling — Markt südlich von Regensburg im Labertal. Als Zauberer für Schierling bringe ich Close-Up Magie und Bühnenshow zu Hochzeiten, Firmenfeiern und Vereinsanlässen.",
    highlight: "Schierling liegt zwischen Regensburg und Landshut — gut erreichbar, aktive Gastronomie und Vereinskultur.",
    einwohner: "8.500",
    bekannteLocations: ["Mehrzweckhalle Schierling", "Bürgerhaus", "Marktplatz Schierling", "Landgasthof Umgebung"],
    faq: [
      { q: "Was kostet ein Zauberer in Schierling?", a: "Anfahrt aus Regensburg ca. 25 Minuten — Format-abhängiges Angebot auf Anfrage." },
      { q: "Tritt der Zauberer bei Vereinsfesten in Schierling auf?", a: "Ja, Vereinsjubiläen, Schützenfeste und Privatfeiern in Schierling betreue ich regelmäßig." },
    ],
    seoText: "Zauberer Schierling: Emilian Leber bringt Close-Up Magie und Bühnenshow zu Hochzeiten, Firmenfeiern und Vereinsanlässen in Schierling und im Landkreis Regensburg.",
    langText: `Schierling ist Markt zwischen Regensburg und Landshut. Als Zauberer für Schierling betreue ich Hochzeiten, Vereinsjubiläen und Firmenfeiern in der Mehrzweckhalle, im Bürgerhaus und in Landgasthöfen der Umgebung.

Kurze Anfahrt aus Regensburg, eingespielte Logistik.

Kosten Zauberer Schierling: Pakete ab 395 €, Anfahrt inklusive.`,
  },
  {
    slug: "burglengenfeld",
    name: "Burglengenfeld",
    region: "Bayern",
    intro: "Burglengenfeld — Stadt im Naabtal nördlich von Regensburg. Als Zauberer für Burglengenfeld bringe ich Close-Up Magie und Bühnenshow zu Hochzeiten, Firmenfeiern und Galas.",
    highlight: "Burglengenfeld ist Wirtschafts- und Eventstandort im Naabtal — Anfahrt aus Regensburg in 25 Minuten.",
    einwohner: "13.500",
    bekannteLocations: ["Stadthalle Burglengenfeld", "Stadtmuseum (Eventbereich)", "Schlossberg-Ruine", "Hotel-Restaurant Naabbrücke"],
    faq: [
      { q: "Was kostet ein Zauberer in Burglengenfeld?", a: "Anfahrt aus Regensburg ca. 25 Minuten — Format-abhängiges Angebot auf Anfrage." },
      { q: "Tritt der Zauberer auf Firmenfeiern in Burglengenfeld auf?", a: "Ja, Firmenfeiern für Burglengenfelder Unternehmen — Mittelstand und Industrie — gehören zu meinen Einsätzen." },
    ],
    seoText: "Zauberer Burglengenfeld: Emilian Leber bringt Close-Up Magie und Bühnenshow zu Hochzeiten, Firmenfeiern und Galas in Burglengenfeld im Naabtal.",
    langText: `Burglengenfeld ist Stadt im Naabtal nördlich von Regensburg. Als Zauberer für Burglengenfeld bringe ich Entertainment zu Hochzeiten in der Stadthalle, Firmenfeiern bei Burglengenfelder Unternehmen und Galas im Stadtmuseum.

Kurze Anfahrt aus Regensburg, eingespielte Logistik.

Kosten Zauberer Burglengenfeld: Pakete ab 395 €, Anfahrt inklusive.`,
  },
  {
    slug: "maxhuette-haidhof",
    name: "Maxhütte-Haidhof",
    region: "Bayern",
    intro: "Maxhütte-Haidhof — Industriestadt im Landkreis Schwandorf nördlich von Regensburg. Als Zauberer für Maxhütte-Haidhof bringe ich Close-Up Magie und Bühnenshow zu Firmenfeiern, Hochzeiten und privaten Anlässen.",
    highlight: "Maxhütte-Haidhof ist Industriestandort mit starkem Mittelstand — Firmenfeiern und Weihnachtsfeiern häufige Anlässe.",
    einwohner: "11.000",
    bekannteLocations: ["Stadthalle Maxhütte-Haidhof", "Bürgerhaus", "Pfarrheim St. Barbara", "Gewerbegebiet (Eventbereich)"],
    faq: [
      { q: "Was kostet ein Zauberer in Maxhütte-Haidhof?", a: "Anfahrt aus Regensburg ca. 30 Minuten — Format-abhängiges Angebot auf Anfrage." },
      { q: "Tritt der Zauberer in Industriebetrieben in Maxhütte-Haidhof auf?", a: "Ja, Firmenfeiern für Maxhütter Unternehmen, Werks-Weihnachtsfeiern und Mitarbeiter-Events sind regelmäßige Einsätze." },
    ],
    seoText: "Zauberer Maxhütte-Haidhof: Emilian Leber bringt Close-Up Magie und Bühnenshow zu Firmenfeiern, Hochzeiten und Privatfeiern in Maxhütte-Haidhof.",
    langText: `Maxhütte-Haidhof ist Industriestadt im Landkreis Schwandorf nördlich von Regensburg. Als Zauberer für Maxhütte-Haidhof betreue ich Firmenfeiern, Werks-Weihnachtsfeiern und private Anlässe in der Stadthalle, im Bürgerhaus und in Privatlocations.

Kurze Anfahrt aus Regensburg, eingespielte Logistik mit Industriebetrieben der Region.

Kosten Zauberer Maxhütte-Haidhof: Pakete ab 395 €, Anfahrt inklusive.`,
  },
  {
    slug: "nittenau",
    name: "Nittenau",
    region: "Bayern",
    intro: "Nittenau — Stadt im Regental im Landkreis Schwandorf. Als Zauberer für Nittenau bringe ich Close-Up Magie und Bühnenshow zu Hochzeiten, Firmenfeiern und Familienfeiern im Regental.",
    highlight: "Nittenau liegt im Regental nordöstlich von Regensburg — landschaftlich schön, mit aktiver Gastronomie.",
    einwohner: "8.500",
    bekannteLocations: ["Stadthalle Nittenau", "Bürgerhaus", "Marktplatz Nittenau", "Hotel-Restaurant Regen"],
    faq: [
      { q: "Was kostet ein Zauberer in Nittenau?", a: "Anfahrt aus Regensburg ca. 40 Minuten — Format-abhängiges Angebot auf Anfrage." },
      { q: "Tritt der Zauberer auf Hochzeiten in Nittenau auf?", a: "Ja, Hochzeiten in Nittenau und im Regental betreue ich regelmäßig — Walk-Around, Tisch-zu-Tisch und Bühne." },
    ],
    seoText: "Zauberer Nittenau: Emilian Leber bringt Close-Up Magie und Bühnenshow zu Hochzeiten, Firmenfeiern und Familienfeiern in Nittenau und im Regental.",
    langText: `Nittenau ist Stadt im landschaftlich schönen Regental nordöstlich von Regensburg. Als Zauberer für Nittenau bringe ich Entertainment zu Hochzeiten in der Stadthalle, Firmenfeiern im Bürgerhaus und privaten Anlässen in den schönen Locations der Region.

Kosten Zauberer Nittenau: Pakete ab 395 €, Anfahrt aus Regensburg inklusive.`,
  },
  {
    slug: "roding",
    name: "Roding",
    region: "Bayern",
    intro: "Roding — Stadt im Regental im Landkreis Cham. Als Zauberer für Roding bringe ich Close-Up Magie und Bühnenshow zu Hochzeiten, Firmenfeiern und Veranstaltungen im Bayerischen Wald.",
    highlight: "Roding ist Wirtschafts- und Eventstandort im Regental östlich von Regensburg — Eingangstor zum Bayerischen Wald.",
    einwohner: "12.000",
    bekannteLocations: ["Stadthalle Roding", "Schloss Roding-Umfeld", "Hotel zur Post Roding", "Landhotel Regental"],
    faq: [
      { q: "Was kostet ein Zauberer in Roding?", a: "Anfahrt aus Regensburg ca. 45 Minuten — Format-abhängiges Angebot auf Anfrage." },
      { q: "Tritt der Zauberer auf Bayerwald-Hochzeiten in Roding auf?", a: "Ja, Hochzeiten in Roding und Bayerwald-Hotels gehören zu meinen Auftritten. Bayerische Tonalität, moderne Show." },
    ],
    seoText: "Zauberer Roding: Emilian Leber bringt Close-Up Magie und Bühnenshow zu Hochzeiten, Firmenfeiern und Galas in Roding und im Bayerischen Wald.",
    langText: `Roding ist Stadt im Regental im Landkreis Cham — Eingangstor zum Bayerischen Wald. Als Zauberer für Roding bringe ich Entertainment zu Hochzeiten in der Stadthalle, Firmenfeiern bei Rodinger Unternehmen und Bayerwald-Hochzeiten in der Region.

Kosten Zauberer Roding: Pakete ab 395 €, Anfahrt aus Regensburg inklusive.`,
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
  {
    slug: "bogen",
    name: "Bogen",
    region: "Bayern",
    intro: "Bogen — Stadt im Landkreis Straubing-Bogen, an der Donau gelegen. Als Zauberer für Bogen bringe ich Close-Up Magie und Bühnenshow zu Hochzeiten, Firmenfeiern und Galas in Niederbayern.",
    highlight: "Bogen ist Donaustadt mit historischer Wallfahrtskirche auf dem Bogenberg — Hochzeitsdestination mit Niederbayern-Flair.",
    einwohner: "10.500",
    bekannteLocations: ["Bogenberg (Eventbereich)", "Stadthalle Bogen", "Hotel-Restaurant Donaurausch", "Bürgerhaus Bogen"],
    faq: [
      { q: "Was kostet ein Zauberer in Bogen?", a: "Anfahrt aus Regensburg ca. 45 Minuten — Format-abhängiges Angebot auf Anfrage." },
      { q: "Tritt der Zauberer auf Hochzeiten in Bogen auf?", a: "Ja, Hochzeiten in Bogen und am Bogenberg gehören zu meinen Auftritten in Niederbayern." },
    ],
    seoText: "Zauberer Bogen: Emilian Leber bringt Close-Up Magie und Bühnenshow zu Hochzeiten, Firmenfeiern und Galas in Bogen und im Landkreis Straubing-Bogen.",
    langText: `Bogen ist Donaustadt im Landkreis Straubing-Bogen mit Wallfahrtsberg. Als Zauberer für Bogen bringe ich Entertainment zu Hochzeiten in der Stadthalle, Firmenfeiern bei Bogener Unternehmen und Veranstaltungen am Bogenberg.

Kosten Zauberer Bogen: Pakete ab 395 €, Anfahrt aus Regensburg inklusive.`,
  },
  {
    slug: "mallersdorf-pfaffenberg",
    name: "Mallersdorf-Pfaffenberg",
    region: "Bayern",
    intro: "Mallersdorf-Pfaffenberg — Markt im Landkreis Straubing-Bogen zwischen Regensburg und Landshut. Als Zauberer für Mallersdorf bringe ich Close-Up Magie und Bühnenshow zu Hochzeiten, Firmenfeiern und Vereinsanlässen.",
    highlight: "Mallersdorf-Pfaffenberg ist Wirtschaftsstandort und Eventort im niederbayerischen Hügelland — gut erreichbar aus Regensburg.",
    einwohner: "7.500",
    bekannteLocations: ["Bürgerhaus Mallersdorf", "Klosteranlage Mallersdorf", "Mehrzweckhalle Pfaffenberg", "Brauereigasthof"],
    faq: [
      { q: "Was kostet ein Zauberer in Mallersdorf-Pfaffenberg?", a: "Anfahrt aus Regensburg ca. 35 Minuten — Format-abhängiges Angebot auf Anfrage." },
      { q: "Tritt der Zauberer auf Klosterhochzeiten in Mallersdorf auf?", a: "Ja, Hochzeiten am Kloster Mallersdorf und in der Region betreue ich gerne." },
    ],
    seoText: "Zauberer Mallersdorf-Pfaffenberg: Emilian Leber bringt Close-Up Magie und Bühnenshow zu Hochzeiten, Firmenfeiern und Vereinsfeiern in Mallersdorf-Pfaffenberg.",
    langText: `Mallersdorf-Pfaffenberg ist Markt im Landkreis Straubing-Bogen. Als Zauberer für Mallersdorf bringe ich Entertainment zu Klosterhochzeiten, Firmenfeiern in der Mehrzweckhalle und Vereinsfeiern.

Kosten Zauberer Mallersdorf-Pfaffenberg: Pakete ab 395 €, Anfahrt aus Regensburg inklusive.`,
  },
  {
    slug: "mainburg",
    name: "Mainburg",
    region: "Bayern",
    intro: "Mainburg — Stadt im Landkreis Kelheim in der Hallertau. Als Zauberer für Mainburg bringe ich Close-Up Magie und Bühnenshow zu Hochzeiten, Brauerei-Events und Firmenfeiern.",
    highlight: "Mainburg ist Hallertauer Hopfenstadt — Brauereien, Hopfenbauern und aktive Eventkultur.",
    einwohner: "15.000",
    bekannteLocations: ["Stadthalle Mainburg", "Brauereigasthof", "Hopfenmuseum (Umgebung)", "Hotel-Restaurant Mainburg"],
    faq: [
      { q: "Was kostet ein Zauberer in Mainburg?", a: "Anfahrt aus Regensburg ca. 1 Stunde — Format-abhängiges Angebot auf Anfrage." },
      { q: "Tritt der Zauberer auf Brauerei-Hochzeiten in Mainburg auf?", a: "Ja, Hochzeiten und Brauereifeiern in Mainburg und der Hallertau gehören zu meinen Auftritten." },
    ],
    seoText: "Zauberer Mainburg: Emilian Leber bringt Close-Up Magie und Bühnenshow zu Hochzeiten, Brauerei-Events und Firmenfeiern in Mainburg und der Hallertau.",
    langText: `Mainburg ist die Hallertauer Hopfenstadt im Landkreis Kelheim. Als Zauberer für Mainburg bringe ich Entertainment zu Hochzeiten in der Stadthalle, Brauerei-Events bei Hallertauer Brauereien und Firmenfeiern.

Kosten Zauberer Mainburg: Pakete ab 395 €, Anfahrt aus Regensburg inklusive.`,
  },
  {
    slug: "parsberg",
    name: "Parsberg",
    region: "Bayern",
    intro: "Parsberg — Stadt im Landkreis Neumarkt zwischen Regensburg und Nürnberg. Als Zauberer für Parsberg bringe ich Close-Up Magie und Bühnenshow zu Hochzeiten in der Burg, Firmenfeiern und Galas.",
    highlight: "Parsberg ist mit der Burg Parsberg eine schöne Hochzeitsdestination zwischen Regensburg und Nürnberg.",
    einwohner: "7.500",
    bekannteLocations: ["Burg Parsberg", "Stadthalle Parsberg", "Hotel-Restaurant Burg-Café", "Bürgerhaus"],
    faq: [
      { q: "Was kostet ein Zauberer in Parsberg?", a: "Anfahrt aus Regensburg ca. 35 Minuten — Format-abhängiges Angebot auf Anfrage." },
      { q: "Tritt der Zauberer auf Hochzeiten in der Burg Parsberg auf?", a: "Ja, Burg-Hochzeiten in Parsberg gehören zu meinen schönsten Auftritten — historisches Ambiente, elegante moderne Show." },
    ],
    seoText: "Zauberer Parsberg: Emilian Leber bringt Close-Up Magie und Bühnenshow zu Burg-Hochzeiten, Firmenfeiern und Galas in Parsberg im Landkreis Neumarkt.",
    langText: `Parsberg ist Stadt im Landkreis Neumarkt zwischen Regensburg und Nürnberg. Als Zauberer für Parsberg bringe ich Entertainment zu Burg-Hochzeiten, Firmenfeiern in der Stadthalle und Galas im Burg-Café.

Kosten Zauberer Parsberg: Pakete ab 395 €, Anfahrt aus Regensburg inklusive.`,
  },
  {
    slug: "velburg",
    name: "Velburg",
    region: "Bayern",
    intro: "Velburg — Stadt im Landkreis Neumarkt im Bayerischen Jura. Als Zauberer für Velburg bringe ich Close-Up Magie und Bühnenshow zu Hochzeiten, Firmenfeiern und Galas im Juraland.",
    highlight: "Velburg ist Stadt im Bayerischen Jura zwischen Regensburg und Nürnberg — landschaftlich schön mit Burg.",
    einwohner: "5.000",
    bekannteLocations: ["Burg Velburg", "Stadthalle Velburg", "Brauereigasthof Velburg", "Marktplatz (Eventbereich)"],
    faq: [
      { q: "Was kostet ein Zauberer in Velburg?", a: "Anfahrt aus Regensburg ca. 40 Minuten — Format-abhängiges Angebot auf Anfrage." },
      { q: "Tritt der Zauberer auf Hochzeiten im Bayerischen Jura auf?", a: "Ja, Hochzeiten in Velburg und im Bayerischen Jura gehören zu meinen Auftritten." },
    ],
    seoText: "Zauberer Velburg: Emilian Leber bringt Close-Up Magie und Bühnenshow zu Hochzeiten, Firmenfeiern und Galas in Velburg und im Bayerischen Jura.",
    langText: `Velburg ist Stadt im Bayerischen Jura im Landkreis Neumarkt. Als Zauberer für Velburg bringe ich Entertainment zu Burg-Hochzeiten, Firmenfeiern in der Stadthalle und Brauereifeiern.

Kosten Zauberer Velburg: Pakete ab 395 €, Anfahrt aus Regensburg inklusive.`,
  },
  /* Landkreise als eigene SEO-Pages */
  {
    slug: "landkreis-regensburg",
    name: "Landkreis Regensburg",
    region: "Bayern",
    intro: "Landkreis Regensburg — 41 Gemeinden rund um die Domstadt. Als Zauberer für den Landkreis Regensburg betreue ich Hochzeiten, Firmenfeiern und Galas in allen Gemeinden — von Lappersdorf bis Wörth, von Neutraubling bis Hemau.",
    highlight: "Der Landkreis Regensburg ist mein Kerngebiet — von der Domstadt aus erreiche ich jede Gemeinde in unter 45 Minuten.",
    einwohner: "200.000",
    bekannteLocations: ["Lappersdorf", "Neutraubling", "Donaustauf", "Wörth a. d. Donau", "Hemau", "Sinzing (Wald & Wiese)", "Alteglofsheim", "Wenzenbach"],
    faq: [
      { q: "Was kostet ein Zauberer im Landkreis Regensburg?", a: "Innerhalb des Landkreises ist die Anfahrt aus Regensburg im Angebot inklusive — keine Aufschläge. Format-abhängiges Angebot auf Anfrage." },
      { q: "In welchen Gemeinden im Landkreis Regensburg trittst du auf?", a: "Alle 41 Gemeinden: Lappersdorf, Wenzenbach, Donaustauf, Tegernheim, Barbing, Pentling, Sinzing, Pielenhofen, Pettendorf, Zeitlarn, Obertraubling, Alteglofsheim, Mintraching, Wörth a. d. Donau, Hemau, Beratzhausen, Schierling und alle weiteren." },
    ],
    seoText: "Zauberer Landkreis Regensburg: Emilian Leber bringt Close-Up Magie und Bühnenshow in alle 41 Gemeinden des Landkreises — Hochzeiten, Firmenfeiern und Galas.",
    langText: `Der Landkreis Regensburg umfasst 41 Gemeinden rund um die Domstadt. Als Zauberer für den Landkreis Regensburg ist das mein Kerngebiet — von Lappersdorf im Norden bis Schierling im Süden, von Hemau im Westen bis Wörth a. d. Donau im Osten erreiche ich jede Gemeinde in unter 45 Minuten.

Hochzeiten in den schönen Landgasthöfen und Schlössern der Region, Firmenfeiern bei Mittelstand und Industrie, Vereinsjubiläen und private Anlässe — die Bandbreite ist groß, mein Anspruch konstant: modernes Comedy-Zauberkünstler-Entertainment mit echtem Wow-Faktor.

Kosten Zauberer Landkreis Regensburg: Pakete ab 395 €, Anfahrt innerhalb des Landkreises immer inklusive.`,
  },
  {
    slug: "landkreis-cham",
    name: "Landkreis Cham",
    region: "Bayern",
    intro: "Landkreis Cham — der Bayerwald-Landkreis östlich von Regensburg. Als Zauberer für den Landkreis Cham bringe ich Close-Up Magie und Bühnenshow zu Hochzeiten, Firmenfeiern und Galas im Bayerischen Wald.",
    highlight: "Der Landkreis Cham mit Bayerischem Wald, Hotels und traditionsreichen Wirtshäusern — beliebtes Hochzeits- und Retreat-Gebiet.",
    einwohner: "125.000",
    bekannteLocations: ["Cham", "Roding", "Furth im Wald", "Bad Kötzting", "Lam", "Waldmünchen"],
    faq: [
      { q: "Was kostet ein Zauberer im Landkreis Cham?", a: "Anfahrt aus Regensburg ca. 45–60 Minuten, im Angebot transparent kalkuliert. Format-abhängiges Angebot auf Anfrage." },
      { q: "Tritt der Zauberer auf Bayerwald-Hochzeiten auf?", a: "Ja, Hochzeiten in Bayerwald-Hotels und in den Städten des Landkreises Cham gehören zu meinen regelmäßigen Auftritten." },
    ],
    seoText: "Zauberer Landkreis Cham: Emilian Leber bringt Close-Up Magie und Bühnenshow zu Hochzeiten, Firmenfeiern und Galas im Bayerischen Wald und im Landkreis Cham.",
    langText: `Der Landkreis Cham ist der Bayerwald-Landkreis östlich von Regensburg — Cham als Kreisstadt, dazu Roding, Bad Kötzting, Furth im Wald, Lam und Waldmünchen. Als Zauberer für den Landkreis Cham bringe ich Entertainment zu Hochzeiten in Bayerwald-Hotels, Firmenfeiern bei Chamer Unternehmen und Premium-Galas im Bayerischen Wald.

Kosten Zauberer Landkreis Cham: Pakete ab 395 €, Anfahrt im Angebot transparent kalkuliert.`,
  },
  {
    slug: "landkreis-kelheim",
    name: "Landkreis Kelheim",
    region: "Bayern",
    intro: "Landkreis Kelheim — der Donau-Altmühl-Landkreis südwestlich von Regensburg. Als Zauberer für den Landkreis Kelheim bringe ich Close-Up Magie und Bühnenshow zu Hochzeiten, Firmenfeiern und Galas.",
    highlight: "Der Landkreis Kelheim mit Befreiungshalle, Weltenburger Donauenge, Hallertau und Altmühltal — landschaftlich und kulturell außergewöhnlich.",
    einwohner: "125.000",
    bekannteLocations: ["Kelheim", "Mainburg", "Riedenburg", "Bad Abbach", "Abensberg", "Weltenburg"],
    faq: [
      { q: "Was kostet ein Zauberer im Landkreis Kelheim?", a: "Anfahrt aus Regensburg ca. 30–60 Minuten, im Angebot transparent kalkuliert." },
      { q: "Tritt der Zauberer in Weltenburg auf?", a: "Ja, Hochzeiten am Kloster Weltenburg und in der gesamten Region des Landkreises Kelheim gehören zu meinen Auftritten." },
    ],
    seoText: "Zauberer Landkreis Kelheim: Emilian Leber bringt Close-Up Magie und Bühnenshow zu Hochzeiten, Firmenfeiern und Galas im Donau-Altmühl-Landkreis südwestlich von Regensburg.",
    langText: `Der Landkreis Kelheim ist der Donau-Altmühl-Landkreis südwestlich von Regensburg — mit Kelheim als Kreisstadt, dazu Mainburg in der Hallertau, Riedenburg im Altmühltal, Abensberg und Bad Abbach. Als Zauberer für den Landkreis Kelheim bringe ich Entertainment in alle Gemeinden — von Weltenburger Klosterhochzeiten über Brauerei-Events der Hallertau bis zu Kurhotel-Galas in Bad Abbach.

Kosten Zauberer Landkreis Kelheim: Pakete ab 395 €, Anfahrt im Angebot kalkuliert.`,
  },
  {
    slug: "landkreis-schwandorf",
    name: "Landkreis Schwandorf",
    region: "Bayern",
    intro: "Landkreis Schwandorf — der Oberpfälzer Landkreis nördlich von Regensburg. Als Zauberer für den Landkreis Schwandorf bringe ich Close-Up Magie und Bühnenshow zu Hochzeiten, Firmenfeiern und Galas.",
    highlight: "Der Landkreis Schwandorf mit Schwandorf, Burglengenfeld, Maxhütte-Haidhof, Nittenau und Nabburg — Industrie- und Eventregion in der Oberpfalz.",
    einwohner: "145.000",
    bekannteLocations: ["Schwandorf", "Burglengenfeld", "Maxhütte-Haidhof", "Nittenau", "Nabburg", "Schwarzenfeld"],
    faq: [
      { q: "Was kostet ein Zauberer im Landkreis Schwandorf?", a: "Anfahrt aus Regensburg ca. 25–45 Minuten, im Angebot transparent kalkuliert." },
      { q: "Tritt der Zauberer auf Firmenfeiern im Landkreis Schwandorf auf?", a: "Ja, Firmenfeiern für Industrie und Mittelstand im Landkreis Schwandorf gehören zu meinen Einsätzen." },
    ],
    seoText: "Zauberer Landkreis Schwandorf: Emilian Leber bringt Close-Up Magie und Bühnenshow zu Hochzeiten, Firmenfeiern und Galas in der Oberpfalz nördlich von Regensburg.",
    langText: `Der Landkreis Schwandorf ist Oberpfälzer Industrie- und Eventregion nördlich von Regensburg — mit Schwandorf als Kreisstadt, dazu Burglengenfeld, Maxhütte-Haidhof, Nittenau, Nabburg und Schwarzenfeld. Als Zauberer für den Landkreis Schwandorf bringe ich Entertainment in alle Städte — von Werks-Weihnachtsfeiern bei Industriebetrieben bis zu Hochzeiten in Stadthallen und Schloss-Locations.

Kosten Zauberer Landkreis Schwandorf: Pakete ab 395 €, Anfahrt im Angebot kalkuliert.`,
  },
  {
    slug: "berlin",
    name: "Berlin",
    region: "Berlin",
    intro: "Als Zauberer für Berlin bringe ich moderne Zauberkunst in eine Stadt, die alles schon gesehen hat — und die genau deshalb umso höhere Ansprüche stellt. Tech-Startups in Mitte, Politik-Empfänge unter den Linden, Mediendienstleister in Friedrichshain, klassische Gala-Abende im Adlon: in Berlin funktioniert nur, was sich nicht wie Standard anfühlt. Ich biete Close-Up Magie, Comedy-Bühnenshow und Magic Dinner für Firmenfeiern, Hochzeiten und exklusive Events — im gesamten S-Bahn-Ring plus Potsdam.",
    highlight: "Berlin verzeiht keine Show-Klischees. Mentalmagie mit Insider-Briefing aus eurer Branche, Pointen die nicht aus dem Comedy-Klub stammen, ein Premium-Tonfall ohne Glitzer — das funktioniert hier.",
    einwohner: "3.700.000",
    bekannteLocations: [
      "Hotel Adlon Kempinski",
      "Westin Grand Berlin",
      "Hotel de Rome",
      "Soho House Berlin",
      "Estrel Berlin",
      "Tipi am Kanzleramt",
      "Spindler & Klatt",
      "Mercedes-Platz · Verti Music Hall",
      "Schloss Charlottenburg",
      "Wasserwerk Berlin",
      "Bricks Berlin",
      "Friedrichstadt-Palast (Umfeld)",
    ],
    faq: [
      {
        q: "Was kostet ein Zauberer in Berlin?",
        a: "Hängt vom Format ab: Close-Up beim Empfang im mittleren dreistelligen Bereich, eine 30-Min-Bühnenshow für eine Firmenfeier liegt deutlich höher, Kombi-Pakete bringen das beste Preis-Leistungs-Verhältnis. Anreise aus Regensburg (Flug oder Zug) und Übernachtung sind im Tagessatz enthalten — keine versteckten Posten. Konkretes Angebot nach kurzem Briefing-Call.",
      },
      {
        q: "Welche Berliner Locations eignen sich für Zauberkunst?",
        a: "Für Galas und Bühnenshows: Hotel Adlon, Westin Grand, Hotel de Rome, Estrel-Festsaal, Tipi am Kanzleramt, Wasserwerk Berlin. Für Close-Up und private Tafeln: Soho House, Bricks Berlin, Spindler & Klatt. Für Hochzeiten: Schloss Charlottenburg, Bötzow Brauerei, Spreespeicher, Friedrichshof Industrial-Chic-Locations.",
      },
      {
        q: "Tech-Startups, Politik, Medien — passt euer Stil zu Berliner Branchen?",
        a: "Tech-Szene mag Mentalmagie mit logischem Twist statt klassischer Karten-Magie. Politik-Empfänge brauchen diskreten, intelligenten Stil ohne Anbiedern. Mediendienstleister erwarten Performance auf Profi-Niveau. Vor jedem Berlin-Engagement Briefing-Call: Branche, sensible Themen, gewünschte Tonalität.",
      },
      {
        q: "Wie schnell kommt ihr nach Berlin (Logistik)?",
        a: "Anreise per Flug oder Zug (4-5 h aus Regensburg), An- und Abreise immer am Vor- bzw. Folgetag — kein Same-Day-Stress. Setup-Zeit für Close-Up: 15 Min. Für Bühnenshows: 60–90 Min inklusive Soundcheck. Bei Spätauftritten Übernachtung inklusive (Hotel meiner Wahl in Tagessatz).",
      },
      {
        q: "Wird auch Umland abgedeckt (Potsdam, Brandenburg)?",
        a: "Ja — Potsdam, Oranienburg, Bernau, Königs Wusterhausen und das gesamte direkte Umland im Tagessatz ohne Aufpreis. Bei größerer Entfernung (Frankfurt/Oder, Cottbus) kommt ein moderater Reisekosten-Aufschlag.",
      },
    ],
    seoText: "Zauberer Berlin Emilian Leber: Close-Up Magie, Comedy-Bühnenshow und Magic Dinner für Firmenfeier, Hochzeit, Politik-Empfang und Tech-Event in Berlin und Umland. 5,0 Sterne bei 30+ Bewertungen, über 200 Events seit 2016, Greatest-Talent-Finalist 2023.",
    langText: `Berlin ist die Stadt mit dem härtesten Publikum Deutschlands. Wer hier auftritt, kann nicht auf Wow-Effekt-Routinen vom letzten Jahrhundert vertrauen — Berlin hat alles schon gesehen, alles schon geliked und alles schon geghosted. Das Gute: wenn etwas in Berlin funktioniert, funktioniert es überall. Mein Programm ist genau darauf ausgelegt — Mentalmagie mit Substanz, Comedy ohne Klischee, ein Premium-Tonfall der auch ohne Adlon-Lobby funktioniert.

Drei Formate, drei Berliner Settings. Close-Up Magie beim Empfang ist die Standardlösung für Tech-Startup-Parties (Mitte, Kreuzberg, Friedrichshain) und Politik-Empfänge (Mitte, Tiergarten) — locker genug für die Tech-Szene, präzise genug für Lobby-Dinner. Die durchkomponierte Bühnenshow (25–40 Min, Mentalmagie + Comedy + Standing-Ovation-Finale) trägt Galas im Adlon, Hotel de Rome, Westin Grand und im Estrel-Festsaal. Magic Dinner als Format ist in Berlin noch jung — meine Anfrage-Inbox zeigt aber: Berliner Top-Restaurants mit Tafel-Bestuhlung sind grundsätzlich interessiert, und das Publikum versteht das Konzept sofort.

Insider-Briefing macht den Unterschied. Vor jedem Berlin-Event ein 30-Min-Briefing-Call mit Marketing, HR oder dem persönlichen Veranstalter. Bei Politik-Empfängen: welche Themen DÜRFEN auf keinen Fall vorkommen. Bei Tech-Startups: welche internen Memes treffen wirklich. Bei Mediendienstleister-Events: welche Branchen-Insider machen die Pointe statt sie tot zu erklären. Diese Insider fließen in 2-3 personalisierte Mentaleffekte ein — der Unterschied zwischen Show-Standard und [Hat der wirklich gerade unseren Praktikanten gemeint?].

Hochzeiten in Berlin. Berliner Hochzeiten sind ungewöhnlich vielfältig: Schloss Charlottenburg für die klassische Variante, Wasserwerk Berlin für industriell-modern, Soho House für intim-cool, Bötzow Brauerei für entspannt-charmant. Für jedes Setting passe ich das Drei-Akt-Modell an: Close-Up beim Sektempfang, Tisch-zu-Tisch beim Dinner, Bühnen-Highlight vor dem Tanz. Bei kleineren Berliner Hochzeiten (40–80 Gäste) reicht oft Close-Up plus ein 15-Min-Bühnen-Slot — präzise platziert wirkt das stärker als ein Full-Programm.

Anreise und Logistik. Berlin liegt 530 km vom Heimatstandort Regensburg — 5 h mit dem Auto oder 1,5 h Flugzeit ab München. Anreise immer am Vortag, Übernachtung in einem Hotel meiner Wahl (im Tagessatz enthalten). Setup-Zeit für Close-Up-Auftritte: 15 Min. Für Bühnenshows: 60–90 Min inklusive Soundcheck. Headset-Mikrofon vom Veranstalter, Lichtcues optional. Im S-Bahn-Ring und in Potsdam keine zusätzlichen Reisekosten.`,
  },
  {
    slug: "hamburg",
    name: "Hamburg",
    region: "Hamburg",
    intro: "Als Zauberer für Hamburg bringe ich moderne Zauberkunst in die Stadt mit dem klarsten Stil-Codex Deutschlands. Hamburger Publikum erkennt Übertreibung sofort und mag sie nicht. Hanseatische Zurückhaltung, präzises Timing, ein Schuss trockener Humor — das sind die Zutaten, die hier funktionieren. Ich biete Close-Up Magie, Comedy-Bühnenshow und Magic Dinner für Firmenfeiern, Hochzeiten und Reederei-/Logistik-Events in Hamburg und dem gesamten Norden bis Lübeck und Bremen.",
    highlight: "Hamburg verzeiht keine Effekthascherei. Mentalmagie mit Insider-Bezug zu Hafen, Reedereien oder Mediendienstleistern — und dem nordischen Understatement, das hier den Unterschied macht.",
    einwohner: "1.900.000",
    bekannteLocations: [
      "Elbphilharmonie · Plaza-Räume",
      "Hotel Atlantic Kempinski",
      "Fairmont Vier Jahreszeiten",
      "Stage Theater im Hafen",
      "Hotel Tortue",
      "Cap San Diego (Schiff)",
      "East Hotel Hamburg",
      "Speicherstadt Eventlocations",
      "Cruise Center HafenCity",
      "Alsterhaus",
      "Schmidt's Tivoli",
      "Empire Riverside",
    ],
    faq: [
      {
        q: "Was kostet ein Zauberer in Hamburg?",
        a: "Hängt vom Format ab: Close-Up beim Empfang im mittleren dreistelligen Bereich, eine 30-Min-Bühnenshow für eine Firmenfeier liegt höher, Kombi-Pakete sind das beste Preis-Leistungs-Verhältnis. Anreise aus Regensburg (Flug 1,5 h ab München oder ICE 7 h) und Übernachtung sind im Tagessatz enthalten. Konkretes Angebot nach kurzem Briefing-Call.",
      },
      {
        q: "Welche Hamburger Locations eignen sich für Zauberkunst?",
        a: "Für Galas und Bühnenshows: Elbphilharmonie Plaza-Räume, Hotel Atlantic Kempinski, Fairmont Vier Jahreszeiten, Hotel Tortue, Empire Riverside. Für Close-Up und private Tafeln: East Hotel, Speicherstadt-Eventlocations, Alsterhaus. Für besondere Anlässe: Cap San Diego als Schiff-Setting oder Stage Theater im Hafen.",
      },
      {
        q: "Funktioniert Close-Up auch auf einem Schiff?",
        a: "Ja — Schiffs-Auftritte (Cap San Diego, Alster-Schiff, MS Hanseatic, Hafen-Barkassen) sind ein eigenes Format. Etwas Bewegung im Boden ist meist kein Problem, nur bei stärkerem Seegang spiele ich kein Mentalstück mit fallenden Objekten. Briefing vorab: Setting, Tischanordnung, Wetter-Plan B.",
      },
      {
        q: "Tischzauberei Hamburg — wie viele Gäste pro Stunde?",
        a: "Bei 6-Min-pro-Tafel-Routinen schaffe ich in 60 Minuten 8–10 Tafeln (40–100 Gäste). Bei Firmenfeiern mit Steh-Empfang gehe ich von Gruppe zu Gruppe (5 Min pro Gruppe, ca. 12 Gruppen pro Stunde). Größere Events werden auf mehrere Slots verteilt.",
      },
      {
        q: "Wird das Hamburger Umland abgedeckt (Lübeck, Kiel, Bremen, Stade)?",
        a: "Ja — Norddeutsches Umland im Tagessatz: Lübeck (1 h), Stade, Pinneberg, Wedel, Buxtehude, Ahrensburg, Bad Oldesloe. Kiel und Bremen liegen weiter (1,5–2 h) — möglich, kommt mit moderatem Reisezuschlag. Bei Mehr-Tages-Aufenthalt im Norden lassen sich auch mehrere Events kombinieren.",
      },
    ],
    seoText: "Zauberer Hamburg Emilian Leber: Close-Up Magie, Comedy-Bühnenshow und Magic Dinner für Firmenfeier, Hochzeit, Reederei-Event und Tischzauberei in Hamburg und Umland bis Lübeck/Bremen. 5,0 Sterne bei 30+ Bewertungen, über 200 Events seit 2016, Greatest-Talent-Finalist 2023.",
    langText: `Hamburg ist die Stadt mit dem klarsten Stil-Codex Deutschlands. Hanseatisches Understatement, gepflegte Distanz, präzise Kommunikation — das prägt auch die Event-Kultur. Hamburger Publikum will keinen Bauchredner-Klamauk und keine Effekthascherei. Was funktioniert: trockener Humor, technisch saubere Magie, Mentalstücke mit Substanz. Ein Karten-Effekt der elegant aufgeht zählt hier mehr als zehn Showbiz-Posen.

Drei Anlässe, drei Hamburger Settings. Für Hochzeiten in Hamburg empfehle ich das Drei-Akt-Modell — Close-Up beim Sektempfang (Atlantic, Vier Jahreszeiten, Tortue, oder Hafen-Locations wie Cap San Diego), Tisch-zu-Tisch beim Dinner, Bühnen-Highlight vor dem Tanz. Für Firmenfeiern (Reedereien, Logistik-Konzerne wie Hapag-Lloyd-Umfeld, Mediendienstleister im Spiegel/Zeit-Umfeld) der Mix aus Walk-Around beim Empfang plus 25–35-Min-Bühne als Highlight. Für Privatanlässe in Hafencity oder Eppendorf reicht reines Close-Up — Mentalstück + 4–6 Tisch-zu-Tisch-Runden über zwei Stunden.

Reederei- und Hafen-Insider machen den Unterschied. Hamburg hat eine eigene Industrie-Kultur mit eigenen Codes — Hapag-Lloyd-Insider, Containerschiff-Anekdoten, der ewige Unterschied zwischen Hamburg und Bremen, das Hafen-Wetter als Standard-Smalltalk. Vor jedem Hamburger Firmen-Event Briefing-Call: welche Insider passen, welche Themen vermeiden, welche Branchen-Memes treffen. Diese fließen in 2–3 personalisierte Routinen ein — der Hamburger CEO sagt am Ende oft genau dasselbe wie der Münchner: [Woher wusste der das?] — aber er sagt es mit weniger Worten.

Schiff-Auftritte sind ein eigenes Format. Cap San Diego im Hafen, Alster-Dampfer, MS Hanseatic, private Barkassen — Schiffs-Events brauchen angepasste Routinen (kein freier Wurf, keine fallenden Objekte bei Seegang). Dafür kommt ein Setting hinzu, das in keiner Halle erreichbar ist: das Wasser als Bühnenbild, der Hafen als Kulisse, der Wind als Soundtrack. Wenn ein Schiffs-Event in der Anfrage steht, plane ich grundsätzlich mit Wetter-Plan B im Hafenrestaurant.

Anreise und Logistik. Hamburg liegt 800 km vom Heimatstandort Regensburg — Flug ab München (1,5 h) oder ICE (7 h). Anreise immer am Vortag, Übernachtung in einem Hotel meiner Wahl (im Tagessatz enthalten — typischerweise Empire Riverside, East Hotel oder Innside in der HafenCity). Setup-Zeit für Close-Up: 15 Min. Für Bühnenshows: 60–90 Min inklusive Soundcheck. Im Hamburger Stadtgebiet und im direkten Umland (Pinneberg, Ahrensburg, Wedel, Stade, Buxtehude) keine zusätzlichen Reisekosten.`,
  },
  {
    slug: "frankfurt",
    name: "Frankfurt",
    region: "Hessen",
    intro: "Als Zauberer für Frankfurt am Main bringe ich moderne Zauberkunst in Deutschlands wichtigsten Finanz- und Messestandort. Banken, Beratungen (Big Four, McKinsey/BCG), Pharma-Konzerne (Sanofi, Merck Darmstadt), Logistik rund um den Flughafen und die Frankfurter Messe als jährlicher Hotspot — das Publikum hier ist international, anspruchsvoll und gewohnt, Premium-Entertainment kritisch zu bewerten. Ich biete Close-Up Magie, Comedy-Bühnenshow, Magic Dinner und Standmagie für Firmenfeiern, Hochzeiten und Messeauftritte in Frankfurt und im Rhein-Main-Gebiet.",
    highlight: "Frankfurt-Publikum ist Premium-Maßstab. Internationale Gäste, Banking-Tonalität, kurze Konzentrations-Slots zwischen Vorständen und Vorträgen — Mentalmagie mit Mehrsprachigkeit auf Anfrage.",
    einwohner: "760.000",
    bekannteLocations: [
      "Alte Oper (Mozart-/Beethovensaal)",
      "Messe Frankfurt (Halle 1–11)",
      "Festhalle Frankfurt",
      "Palmengarten · Orangerie",
      "Villa Kennedy",
      "Frankfurter Hof (Steigenberger)",
      "Roomers Hotel",
      "Sofitel Frankfurt Opera",
      "Jumeirah Frankfurt",
      "Skyline Plaza · Eventfläche",
      "Mainzer Hof",
      "Klassikstadt Frankfurt",
    ],
    faq: [
      {
        q: "Was kostet ein Zauberer in Frankfurt?",
        a: "Hängt vom Format ab: Close-Up beim Empfang im mittleren dreistelligen Bereich, eine 30-Min-Bühnenshow höher, Kombi-Pakete bringen das beste Preis-Leistungs-Verhältnis. Messe-Tagessätze etwas anders gerechnet (mehrtägige Buchung mit Reduktion). Anreise aus Regensburg (ICE 4 h oder Flug 1 h) und Übernachtung im Tagessatz enthalten. Konkretes Angebot nach Briefing-Call.",
      },
      {
        q: "Welche Frankfurter Locations eignen sich für Zauberkunst?",
        a: "Für Galas und Bühnenshows: Alte Oper, Festhalle, Frankfurter Hof, Villa Kennedy, Sofitel Frankfurt Opera. Für Close-Up und private Tafeln: Roomers Hotel, Jumeirah, Palmengarten Orangerie. Für Messeauftritte: alle Hallen der Messe Frankfurt (1–11) plus Skyline Plaza für Begleit-Events. Für Hochzeiten: Klassikstadt, Maingau-Locations, Schloss-Locations im Taunus.",
      },
      {
        q: "Macht ihr auch Messeauftritte auf der Frankfurter Messe?",
        a: "Ja — Messe-Magie ist ein eigenes Format (siehe /messe-magier). Aktive Besucher-Ansprache am Stand, Effekte die Vorbeigehende stoppen, Übergabe an Sales-Mitarbeiter mit warmem Vorgespräch. Bei mehrtägiger Buchung Tages-Reduktion. Sprache deutsch/englisch nach Bedarf — auf der Messe meist beides parallel.",
      },
      {
        q: "Ist eine englischsprachige Show in Frankfurt möglich?",
        a: "Ja — sowohl Close-Up als auch Bühnenshow komplett auf Englisch buchbar. Bei internationalen Gästen empfohlen (Banken-Gala, Pharma-Konzern-Event, internationale Konferenz). Zweisprachiges Programm (deutsch/englisch) auf Wunsch möglich — funktioniert besonders bei Hochzeiten mit gemischten Gästen.",
      },
      {
        q: "Wird das Rhein-Main-Gebiet abgedeckt (Wiesbaden, Mainz, Offenbach, Darmstadt)?",
        a: "Ja — gesamtes Rhein-Main-Gebiet im Tagessatz ohne Aufpreis: Wiesbaden, Mainz, Offenbach, Darmstadt, Bad Homburg, Königstein, Eschborn, Friedberg. Bei größerer Entfernung (Marburg, Gießen, Aschaffenburg-Bereich) moderater Reisezuschlag.",
      },
    ],
    seoText: "Zauberer Frankfurt Emilian Leber: Close-Up Magie, Comedy-Bühnenshow, Magic Dinner und Standmagie auf der Messe Frankfurt für Banking-Events, Pharma-Galas und Hochzeiten in Frankfurt und Rhein-Main-Gebiet (Wiesbaden, Mainz, Offenbach, Darmstadt). 5,0 Sterne bei 30+ Bewertungen.",
    langText: `Frankfurt ist Banking-Land, Beratungs-Land, Messe-Land. Drei Branchen mit eigenem Tempo und eigener Sprache — und einem Publikum, das Premium-Entertainment kritisch bewertet, weil es täglich mit internationalen Profis spricht. Wer hier Show macht, muss zwei Sachen gleichzeitig liefern: technisch sauber und intellektuell anspruchsvoll genug für ein Auditorium, in dem der CFO und der M&A-Partner mitdenken.

Drei Formate für drei Frankfurter Anlässe. Für Banking-Galas und Beratungs-Events in der Alten Oper, im Frankfurter Hof oder im Sofitel: die durchkomponierte Bühnenshow (25–40 Min) mit Mentalmagie als Hauptelement, Comedy gezielt dosiert, Standing-Ovation-Finale. Für Empfänge in Roomers, Jumeirah oder Villa Kennedy: Close-Up Walk-Around, 60–90 Min, von Gruppe zu Gruppe, deutsch/englisch. Für die Messe: aktive Stand-Magie als Besucher-Magnet (siehe /messe-magier) — funktioniert besonders gut bei IT-, Pharma- und Konsumgüter-Messen.

Sprache spielt eine Rolle. Frankfurter Events sind häufiger international als andere deutsche Städte. Vor jedem Frankfurt-Engagement Briefing: deutsch / englisch / zweisprachig? Bei zweisprachigem Setting plane ich die Show so, dass beide Sprachgruppen die Pointen verstehen — kein „peinliches Übersetzen", sondern eingebaute Bilingual-Routinen, die Sprache selbst zum Effekt machen.

Magic Dinner in Frankfurt. Mein Spezialgebiet — Mehrgänge-Abend mit Close-Up-Magie am Tisch — funktioniert in Frankfurter Sternerestaurants und in den Top-Hotel-Restaurants (Lafleur, Villa Merton, Tigerpalast, Restaurant im Frankfurter Hof) besonders gut. Anfrage über das Kontaktformular — bisher als Format vor allem im Hauspartner-Restaurant Wald & Wiese in Sinzing etabliert, in Frankfurt grundsätzlich auf Anfrage realisierbar.

Anreise und Logistik. Frankfurt liegt 360 km vom Heimatstandort Regensburg — ICE 4 h oder Flug ab München 1 h. Anreise immer am Vor- oder Eventtag früh, Übernachtung in einem Hotel meiner Wahl im Tagessatz (typischerweise Roomers oder Jumeirah, bei Messe-Buchungen Hotels in Niederrad). Setup für Close-Up: 15 Min. Für Bühnenshows: 60–90 Min inklusive Soundcheck. Im Rhein-Main-Gebiet keine Reisekostenzuschläge.`,
  },
  {
    slug: "stuttgart",
    name: "Stuttgart",
    region: "Baden-Württemberg",
    intro: "Als Zauberer für Stuttgart bringe ich moderne Zauberkunst in eine Stadt, in der Präzision Identität ist. Daimler, Porsche, Bosch, Mahle, Trumpf, Stihl — Stuttgart ist Hidden-Champion-Land, und das Publikum hat hohe Ansprüche: kein Klamauk, kein Glitzer, sondern Effekte mit Tiefe. Ich biete Close-Up Magie, Comedy-Bühnenshow und Magic Dinner für Firmenfeiern, Hochzeiten und private Anlässe im gesamten Großraum — Stuttgart, Sindelfingen, Böblingen, Ludwigsburg, Esslingen, Fellbach, Waiblingen.",
    highlight: "Die Schwabenmetropole verlangt Entertainment auf Augenhöhe mit ihren Hidden Champions: präzise gebaut, technisch sauber, ohne Stuttgarter Bescheidenheit zu verletzen. Genau dafür ist Mentalmagie mit Insider-Briefing das richtige Format.",
    einwohner: "630.000",
    bekannteLocations: [
      "Liederhalle (Beethoven-/Mozartsaal)",
      "Wagenhallen Nordbahnhof",
      "MHP Arena",
      "Carl Benz Arena",
      "Mercedes-Benz Museum",
      "Porsche Museum",
      "SI-Centrum Stuttgart",
      "Schloss Solitude",
      "Schloss Hohenheim",
      "Hotel am Schlossgarten",
      "Steigenberger Graf Zeppelin",
      "Wielandshöhe",
    ],
    faq: [
      {
        q: "Was kostet ein Zauberer in Stuttgart?",
        a: "Hängt vom Format ab: Close-Up beim Empfang startet im mittleren dreistelligen Bereich, eine 30-Min-Bühnenshow für eine Firmenfeier liegt höher, kombinierte Pakete (Walk-Around + Bühne) sind das beste Preis-Leistungs-Verhältnis. Anreise aus Regensburg ist im Tagessatz enthalten — kein Kilometerzuschlag. Konkretes Angebot kommt nach einem kurzen Briefing-Call.",
      },
      {
        q: "Welche Stuttgarter Locations eignen sich am besten für Zauberkunst?",
        a: "Für Bühnenshows: Beethovensaal/Mozartsaal in der Liederhalle, MHP Arena, Carl Benz Arena. Für Close-Up und Magic Dinner: Hotel am Schlossgarten, Steigenberger Graf Zeppelin, Wielandshöhe, SI-Centrum. Für Hochzeiten: Schloss Solitude, Schloss Hohenheim, Schloss Ludwigsburg, Wagenhallen — alle haben den Mix aus Pomp und Nähe, der Magie trägt.",
      },
      {
        q: "Macht ihr auch Automotive-/Industrie-Events bei Daimler, Porsche, Bosch?",
        a: "Ja — Industrie und Automotive sind ein Schwerpunkt. Vor jedem Engagement Briefing-Call mit Marketing oder HR: laufende Kampagnen, Werks-Insider, sensible Themen die NICHT vorkommen. Daraus 2-3 personalisierte Routinen mit Insider-Bezug. Tonalität: präzise, kein Show-Gehabe — passt zur Schwaben-Mentalität.",
      },
      {
        q: "Wie früh sollte ich für Stuttgart anfragen?",
        a: "Q4 (Weihnachtsfeier-Saison Oktober–Dezember) am besten 8–12 Wochen vorher anfragen, da Stuttgart einer der nachgefragtesten Standorte ist. Sommerfeste und Q1/Q2-Events 6–8 Wochen vorher. Kurzfristig (2–4 Wochen) bei freiem Slot möglich — anfragen lohnt sich immer.",
      },
      {
        q: "Wird der Großraum Stuttgart abgedeckt (Sindelfingen, Ludwigsburg, Esslingen, Böblingen)?",
        a: "Ja, kompletter Großraum inklusive: Sindelfingen (Mercedes-Werk), Böblingen, Ludwigsburg (Schloss + Forum am Schlosspark), Esslingen, Fellbach (Mercedes-Benz Klassik), Waiblingen, Cannstatt, Untertürkheim — alle ohne Aufpreis im Tagessatz.",
      },
    ],
    seoText: "Zauberer Stuttgart Emilian Leber: Close-Up Magie, Comedy-Bühnenshow und Magic Dinner für Firmenfeier, Hochzeit und Geburtstag in Stuttgart und im Großraum Sindelfingen, Böblingen, Ludwigsburg, Esslingen. 5,0 Sterne bei 30+ Bewertungen, über 200 Events seit 2016, Greatest-Talent-Finalist 2023.",
    langText: `Stuttgart ist Hidden-Champion-Land: Daimler, Porsche, Bosch, Mahle, Trumpf, Stihl, Festo — Weltmarktführer, die ihre Stärke nie laut tragen. Genau diese Mentalität prägt auch die Event-Kultur. Stuttgart-Publikum will nicht Show — es will Substanz. Mentalmagie funktioniert hier besser als Comedy-Klamauk, ein präziser Karten-Effekt mehr als zehn Hampelmann-Tricks.

Drei Anlässe, drei Formate. Für Hochzeiten in Stuttgart und Region empfehle ich das Drei-Akt-Modell: Close-Up beim Sektempfang (Schloss Solitude, Schloss Hohenheim, Schloss Ludwigsburg, Hotel am Schlossgarten oder Wielandshöhe), Tisch-zu-Tisch beim Dinner, Bühnen-Highlight vor dem Tanz. Für Firmenfeiern (Weihnachtsfeier, Kunden-Event, Sommerfest in der Wagenhallen oder MHP Arena) der Mix aus Walk-Around beim Empfang und 25–35-Min-Bühnenshow als Höhepunkt zwischen Vorstandsrede und Buffet. Für Privatanlässe (runde Geburtstage, Familienfeiern in Cannstatt oder im Stuttgarter Westen) reines Close-Up reicht meistens.

Industrie-Events brauchen Briefing. Wer für Stuttgarter Konzerne arbeitet, weiß: die Insider sind das Wertvollste. Vor jedem Industrie-Engagement Briefing-Call mit Marketing oder HR — Produktnamen, interne Running-Gags, laufende Kampagnen, der CEO der nie ohne Hosenträger erscheint. Diese Insider fließen in Mentaleffekte und Pointen ein, ohne dass die Show zur Insider-Veranstaltung wird. Wenn ein Bosch-Mitarbeiter am Ende sagt [Wie konnte der wissen, dass…], ist das die richtige Reaktion.

Magic Dinner in Stuttgart. Mein Spezialgebiet — Mehrgänge-Abend mit Close-Up-Magie direkt am Tisch — funktioniert in Stuttgarter Spitzen-Restaurants besonders gut, weil das schwäbische Verständnis von [Essen mit Würde] zur Magie passt: kein Tempo-Drift, kein Klamauk, der Service-Rhythmus bleibt. Bisher als Format vor allem im Hauspartner-Restaurant Wald & Wiese in Sinzing bei Regensburg etabliert — Stuttgart-Restaurants mit Tafel-Bestuhlung und Sterneküche-Anspruch sind grundsätzlich interessiert; Anfrage über das Kontaktformular.

Anreise und Logistik. Stuttgart liegt 250 km von meinem Heimatstandort Regensburg — 2,5 Stunden über die A8/A3. Anreise und Übernachtung (bei Spätauftritten) sind im Tagessatz enthalten, kein Kilometerzuschlag. Setup-Zeit für Close-Up-Auftritte: 15 Minuten. Für Bühnenshows: 60–90 Minuten inklusive Soundcheck. Lichtcues und Soundeinspieler optional; bei einfachem Setting reicht ein Headset-Mikrofon vom Veranstalter.`,
  },
  {
    slug: "koeln",
    name: "Köln",
    region: "Nordrhein-Westfalen",
    intro: "Kölner lieben gute Unterhaltung — und genau die bringe ich mit. Als Zauberer für Köln begeistere ich mit moderner Close-Up Magie und Comedy-Zaubershow auf Firmenfeiern, Hochzeiten und Events am Rhein.",
    highlight: "Rheinische Lebensfreude trifft moderne Zauberkunst — perfekt für Events in der Domstadt.",
    einwohner: "1.080.000",
    bekannteLocations: ["Flora Köln", "Gürzenich", "Wolkenburg", "Hyatt Regency", "Dock.One"],
    faq: [
      { q: "Was kostet ein Zauberer in Köln?", a: "Die Kosten richten sich nach Format und Dauer. Anfahrt ist bei Köln-Events inklusive." },
      { q: "Eignet sich ein Zauberer für Karneval-Events?", a: "Absolut! Ob Karnevalssitzung, After-Party oder Firmen-Karneval — Magie passt perfekt zum Kölner Karneval." },
    ],
    seoText: "Zauberer Köln: Emilian Leber begeistert als Zauberkünstler auf Events in Köln. Close-Up Magie, Bühnenshow und Comedy für Firmenfeiern, Hochzeiten und Galas am Rhein.",
    langText: `Köln — Dom, Rhein und das herzlichste Publikum Deutschlands. Als Zauberer für Köln passe ich mich der besonderen Energie dieser rheinischen Metropole an — direkt, herzlich, humorvoll und auf Augenhöhe mit dem kölschen Lebensgefühl.

Vom Karneval-Event über die Weihnachtsfeier im Gürzenich bis zur Hochzeit in der Wolkenburg — Köln bietet wunderbare Locations für Events, die in Erinnerung bleiben. Als Zauberer für Köln bringe ich Close-Up Magie und Bühnenshow, die perfekt zum rheinischen Spirit passen.

Preise Zauberer Köln: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot.`,
  },
  {
    slug: "duesseldorf",
    name: "Düsseldorf",
    region: "Nordrhein-Westfalen",
    intro: "Düsseldorf als Mode- und Messestadt verlangt nach hochwertigem Entertainment. Als Zauberer für Düsseldorf liefere ich professionelle Magie für Corporate Events, Galas und exklusive Feiern in der Landeshauptstadt.",
    highlight: "Premium-Entertainment für die Landeshauptstadt — stilvoll, modern, beeindruckend.",
    einwohner: "620.000",
    bekannteLocations: ["Messe Düsseldorf", "Rheinterrasse", "Hotel Nikko", "Schloss Benrath", "Van der Valk Airporthotel"],
    faq: [
      { q: "Was kostet ein Zauberer in Düsseldorf?", a: "Die Kosten variieren nach Format. Kontaktiere mich für ein kostenloses Angebot — Anfahrt ist inklusive." },
      { q: "Tritt der Zauberer auch auf der Düsseldorfer Messe auf?", a: "Ja, Messeauftritte und Standprogramme gehören zu meinem Kerngeschäft." },
    ],
    seoText: "Zauberer Düsseldorf: Emilian Leber ist dein Entertainer für Events in Düsseldorf. Professionelle Zaubershow für Firmenfeiern, Messen, Hochzeiten und Galas in der Landeshauptstadt.",
    langText: `Düsseldorf — Mode-Metropole am Rhein und internationaler Messestandort. Als Zauberer für Düsseldorf liefere ich Premium-Entertainment für exklusive Events, die dem gehobenen Anspruch dieser Stadt entsprechen.

Von Messeauftritten auf dem Düsseldorfer Messegelände über Fashion-Events in der Altstadt bis zu Hochzeiten in Schloss Benrath — Düsseldorf bietet erstklassige Locations. Als Zauberer für Düsseldorf bringe ich das passende Showkonzept dazu.

Kosten Zauberer Düsseldorf: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot.`,
  },
  {
    slug: "dresden",
    name: "Dresden",
    region: "Sachsen",
    intro: "Dresden vereint Eleganz und Kultur wie kaum eine andere deutsche Stadt. Als Zauberer für Dresden bringe ich moderne Magie, die sich nahtlos in dieses besondere Ambiente einfügt — von der Semperoper bis zur Frauenkirche.",
    highlight: "Elegante Magie für die Kulturstadt an der Elbe — stilvolle Events verdienen stilvolles Entertainment.",
    einwohner: "560.000",
    bekannteLocations: ["Taschenbergpalais Kempinski", "Albertinum", "Residenzschloss", "Messe Dresden", "Bülow Palais"],
    faq: [
      { q: "Was kostet ein Zauberer in Dresden?", a: "Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein individuelles Angebot." },
      { q: "Eignet sich ein Zauberer für Galas und Kulturevents in Dresden?", a: "Absolut! Dresden ist eine Kulturstadt — elegante Magie, die sich nahtlos in das stilvolle Ambiente der Elbestadt einfügt. Galas, Charity-Events und Firmenfeiern sind meine Spezialität." },
      { q: "Tritt der Zauberer auch in Meißen und ganz Sachsen auf?", a: "Ja, ich trete in ganz Sachsen auf — Dresden, Meißen, Pirna und die gesamte Region sind mein Einzugsgebiet." },
    ],
    seoText: "Zauberer Dresden: Emilian Leber begeistert als Zauberkünstler auf Events in Dresden. Close-Up Magie und Bühnenshow für Firmenfeiern, Hochzeiten und kulturelle Events in Elbflorenz.",
    langText: `Dresden — die Elbflorenz, eine der kulturreichsten Städte Deutschlands. Als Zauberer für Dresden liefere ich elegante Magie, die sich nahtlos in das stilvolle Ambiente einfügt — für Galas, Firmenfeiern und Hochzeiten.

Von Galas im Taschenbergpalais über Firmenfeiern im Albertinum bis zu Hochzeiten im Residenzschloss-Umfeld — Dresden bietet grandiose Locations. Mein Programm passt sich dem kulturellen Anspruch der Elbestadt an.

Preise Zauberer Dresden: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot.`,
  },
  {
    slug: "leipzig",
    name: "Leipzig",
    region: "Sachsen",
    intro: "Leipzig ist jung, kreativ und voller Energie — perfekt für moderne Zauberkunst, die überrascht und begeistert. Als Zauberer für Leipzig bringe ich Entertainment zu Events in Sachsens aufstrebender Metropole.",
    highlight: "Kreative Stadt, kreative Magie — Leipzig ist die perfekte Bühne für modernes Entertainment.",
    einwohner: "600.000",
    bekannteLocations: ["Gewandhaus", "Kongresshalle am Zoo", "Spinnerei", "Eventpalast", "Westin Leipzig"],
    faq: [
      { q: "Was kostet ein Zauberer in Leipzig?", a: "Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein individuelles Angebot." },
      { q: "Eignet sich ein Zauberer für Firmenfeiern in Leipzig?", a: "Ja! Leipzig ist eine aufstrebende Wirtschaftsmetropole — Corporate Events, Weihnachtsfeiern und Firmenjubiläen sind einer meiner Schwerpunkte." },
      { q: "Tritt der Zauberer auch in Halle und ganz Sachsen auf?", a: "Ja, ich trete in Leipzig, Halle (Saale) und der gesamten Region Sachsen auf." },
    ],
    seoText: "Zauberer Leipzig: Emilian Leber ist dein Entertainer für Events in Leipzig. Professionelle Zaubershow und Close-Up Magie für Firmenfeiern, Hochzeiten und Galas in der sächsischen Metropole.",
    langText: `Leipzig — kreativ, jung, aufstrebend. Als Zauberer für Leipzig passe ich mich dem besonderen Spirit dieser sächsischen Metropole an — überraschend, interaktiv und auf dem Puls der Zeit.

Firmenfeiern im Tapetenwerk, Hochzeiten in der Spinnerei oder Galas im Gewandhaus — Leipzig bietet außergewöhnliche Eventlocations mit Charakter. Das Leipziger Publikum liebt Entertainment, das bewegt.

Kosten Zauberer Leipzig: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot.`,
  },
  {
    slug: "hannover",
    name: "Hannover",
    region: "Niedersachsen",
    intro: "Als Messestadt Nummer eins bietet Hannover zahlreiche Gelegenheiten für professionelles Event-Entertainment. Als Zauberer für Hannover liefere ich Close-Up Magie, Bühnenshow und Magic Dinner auf höchstem Niveau.",
    highlight: "Messestadt trifft Magie — perfekt für B2B-Events, Kongresse und Corporate Entertainment.",
    einwohner: "535.000",
    bekannteLocations: ["Hannover Messe", "HCC Hannover Congress Centrum", "Herrenhäuser Gärten", "GOP Varieté-Theater", "Schloss Marienburg"],
    faq: [
      { q: "Was kostet ein Zauberer in Hannover?", a: "Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein individuelles Angebot." },
      { q: "Tritt der Zauberer auch auf Messen in Hannover auf?", a: "Ja! Die Hannover Messe ist eine der wichtigsten Messen der Welt — Messeauftritte und Standprogramme gehören zu meinen Kernleistungen." },
      { q: "Eignet sich ein Zauberer für Kongresse in Hannover?", a: "Absolut. B2B-Events, Kongresse und Gala-Abende im HCC Hannover Congress Centrum sind ideale Formate für professionelle Zauberkunst." },
    ],
    seoText: "Zauberer Hannover: Emilian Leber begeistert als Zauberkünstler auf Events in Hannover. Close-Up Magie und Bühnenshow für Firmenfeiern, Messen und Hochzeiten in der Messestadt.",
    langText: `Hannover — die Messestadt schlechthin und Tor zum Norden. Als Zauberer für Hannover bringe ich professionelles Entertainment für B2B-Events, Kongresse und Firmenfeiern in Niedersachsens Landeshauptstadt.

Messeauftritte auf der Hannover Messe, Kongress-Entertainment im HCC oder Galas in den Herrenhäuser Gärten — Hannover ist ein Top-Eventstandort, und ich liefere das passende Showkonzept. Professionell, interaktiv und unvergesslich.

Preise Zauberer Hannover: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot.`,
    kollegenEmpfehlung: {
      prefix: "Für Veranstaltungen im Raum Hannover empfehle ich meinen Kollegen ",
      linkText: "Zauberer Simabu aus Hannover",
      linkHref: "https://www.simabu.com",
      suffix: " – ein Zauberkünstler aus Hannover mit über 1.500 Auftritten auf Hochzeiten, Firmenfeiern etc. in Hannover und ganz Niedersachsen.",
    },
  },
  {
    slug: "dortmund",
    name: "Dortmund",
    region: "Nordrhein-Westfalen",
    intro: "Im Ruhrgebiet sorge ich als Zauberer für Events, die genauso kraftvoll und ehrlich sind wie die Region selbst. Von Firmenfeiern bis Hochzeiten — moderne Magie für Dortmund und das Ruhrgebiet.",
    highlight: "Echte Magie für echte Menschen — das Ruhrgebiet verdient Entertainment, das von Herzen kommt.",
    einwohner: "590.000",
    bekannteLocations: ["Westfalenhallen", "Signal Iduna Park Logen", "DASA", "View Skylounge", "Steigenberger Dortmund"],
    faq: [
      { q: "Was kostet ein Zauberer in Dortmund?", a: "Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein individuelles Angebot." },
      { q: "Eignet sich ein Zauberer für Betriebsfeiern im Ruhrgebiet?", a: "Absolut! Betriebsfeiern, Weihnachtsfeiern und Firmenjubiläen im Ruhrgebiet sind einer meiner Schwerpunkte — professionell und modern." },
      { q: "Tritt der Zauberer auch in Essen, Bochum und dem Ruhrgebiet auf?", a: "Ja, ich trete im gesamten Ruhrgebiet auf — Dortmund, Essen, Bochum, Gelsenkirchen und Umgebung." },
    ],
    seoText: "Zauberer Dortmund: Emilian Leber ist dein Entertainer für Events in Dortmund und dem Ruhrgebiet. Zaubershow und Close-Up Magie für Firmenfeiern, Hochzeiten und Galas.",
    langText: `Dortmund — Herz des Ruhrgebiets, Fußball-Hochburg und aufstrebender Wirtschaftsstandort. Als Zauberer für Dortmund bringe ich moderne Magie, die genauso direkt und kraftvoll ist wie die Stadt selbst.

Von Firmenfeiern in den Westfalenhallen über Betriebsevents in der DASA bis zu Hochzeiten in der View Skylounge — Dortmund bietet starke Eventlocations, und ich liefere Entertainment, das das Ruhrgebiets-Publikum begeistert.

Kosten Zauberer Dortmund: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot.`,
  },
  {
    slug: "bremen",
    name: "Bremen",
    region: "Bremen",
    intro: "Von der Schlachte bis zum Ratskeller — in Bremen liefere ich Magie, die zur Hansestadt passt. Als Zauberer für Bremen begeistere ich auf Firmenfeiern, Hochzeiten und Events im hohen Norden.",
    highlight: "Norddeutsch charmant, magisch inszeniert — professionelles Entertainment für Bremen und Umgebung.",
    einwohner: "570.000",
    bekannteLocations: ["Atlantic Grand Hotel", "Übersee-Museum", "Schlachte", "Weser-Stadion Logen", "BLG-Forum"],
    faq: [
      { q: "Was kostet ein Zauberer in Bremen?", a: "Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein individuelles Angebot." },
      { q: "Eignet sich ein Zauberer für Firmenfeiern in Bremen?", a: "Ja! Bremen ist ein starker Wirtschaftsstandort — Firmenfeiern, Weihnachtsfeiern und Corporate Events gehören zu meinen Spezialitäten." },
      { q: "Tritt der Zauberer auch in Bremerhaven und Niedersachsen auf?", a: "Ja, von Bremen aus bin ich in Bremerhaven, Oldenburg und der gesamten Region schnell erreichbar." },
    ],
    seoText: "Zauberer Bremen: Emilian Leber begeistert als Zauberkünstler auf Events in Bremen. Close-Up Magie und Bühnenshow für Firmenfeiern, Hochzeiten und besondere Anlässe in der Hansestadt.",
    langText: `Bremen — die alte Hansestadt an der Weser, mit Stadtmusikanten-Charme und norddeutscher Herzlichkeit. Als Zauberer für Bremen bringe ich modernes Entertainment zu Firmenfeiern, Hochzeiten und Events in der kleinsten deutschen Großstadt.

Von Events im Übersee-Museum über Firmenfeiern im BLG-Forum bis zu Hochzeiten am Schlachte-Ufer — Bremen bietet einzigartige Locations mit hanseatischem Flair. Mein Programm passt sich dieser besonderen Atmosphäre an.

Preise Zauberer Bremen: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot.`,
  },
  {
    slug: "salzburg",
    name: "Salzburg",
    region: "Österreich",
    intro: "Auch international buchbar — in der Mozartstadt Salzburg bringe ich moderne Magie auf die Bühne. Als Zauberer für Salzburg liefere ich Entertainment für Events zwischen Festung und Mirabell.",
    highlight: "International buchbar — Salzburg ist von Regensburg aus in unter 2 Stunden erreichbar.",
    einwohner: "155.000",
    bekannteLocations: ["Schloss Mirabell", "Salzburg Congress", "Hotel Sacher Salzburg", "Stiftskeller St. Peter", "Hangar-7"],
    faq: [
      { q: "Was kostet ein Zauberer in Salzburg?", a: "Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein individuelles Angebot." },
      { q: "Eignet sich ein Zauberer für Events im Rahmen der Salzburger Festspiele?", a: "Perfekt! Side-Events und Rahmenprogramme rund um die Festspiele sind eine großartige Gelegenheit — ich passe mein Programm dem kulturellen Rahmen an." },
      { q: "Tritt der Zauberer auch in Linz und Österreich auf?", a: "Ja, ich bin österreichweit buchbar — Salzburg, Linz, Wien und weitere Städte gehören zu meinem Einzugsgebiet." },
    ],
    seoText: "Zauberer Salzburg: Emilian Leber begeistert als Zauberkünstler auf Events in Salzburg. Close-Up Magie und Bühnenshow für Firmenfeiern, Hochzeiten und Galas in der Mozartstadt.",
    langText: `Salzburg — Mozarts Geburtsstadt, Festspielmetropole und eine der schönsten Städte Europas. Als Zauberer für Salzburg liefere ich Entertainment, das dem kulturellen Anspruch dieser besonderen österreichischen Stadt entspricht — elegant, professionell und unvergesslich.

Side-Events zu den Festspielen, Firmenfeiern in Schloss Mirabell oder Hochzeiten im Hotel Sacher — Salzburg bietet Weltklasse-Locations, und ich bringe das passende Showkonzept. Das Salzburger Publikum ist kulturaffin und anspruchsvoll — das schätze ich.

Kosten Zauberer Salzburg: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot.`,
  },
  {
    slug: "wien",
    name: "Wien",
    region: "Österreich",
    intro: "Wien als Kulturhauptstadt verdient Entertainment auf Weltklasse-Niveau. Als Zauberer für Wien bringe ich moderne Magie, die zum Wiener Charme passt — von der Hofburg bis zum Palais Liechtenstein.",
    highlight: "Kaiserliche Stadt, moderne Magie — Wien bietet die Bühne für unvergessliche Events.",
    einwohner: "1.900.000",
    bekannteLocations: ["Hofburg Wien", "Palais Liechtenstein", "Hotel Sacher Wien", "Museumsquartier", "Kursalon Wien"],
    faq: [
      { q: "Was kostet ein Zauberer in Wien?", a: "Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein individuelles Angebot." },
      { q: "Eignet sich ein Zauberer für Wiener Bälle und Galas?", a: "Absolut! Wien ist die Stadt der Bälle — elegante Magie, die zum kaiserlichen Ambiente passt. Ob Opernball-Umfeld, Charity-Gala oder Firmenball." },
      { q: "Kann ich den Zauberer für eine Hochzeit in Wien buchen?", a: "Ja! Hochzeiten in Wien, ob Schloss Schönbrunn, Palais Liechtenstein oder Kursalon — ich sorge für unvergessliche magische Momente." },
    ],
    seoText: "Zauberer Wien: Emilian Leber begeistert als Zauberkünstler auf Events in Wien. Professionelle Zaubershow und Close-Up Magie für Firmenfeiern, Bälle, Hochzeiten und Galas in der Kaiserstadt.",
    langText: `Wien — kaiserliche Weltstadt, Kulturzentrum Europas und eine der lebenswertesten Städte der Welt. Als Zauberer für Wien bringe ich moderne Magie, die dem einzigartigen Wiener Charme gerecht wird — für Galas, Bälle, Firmenfeiern und Hochzeiten.

Von Bällen in der Hofburg über Charity-Galas im Palais Liechtenstein bis zu Firmenfeiern im Museumsquartier — Wien bietet grandioseste Locations, und mein Programm hebt jedes Event auf ein neues Niveau.

Preise Zauberer Wien: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot.`,
  },
  {
    slug: "muenster",
    name: "Münster",
    region: "Nordrhein-Westfalen",
    intro: "Münster — Universitätsstadt, Fahrradhauptstadt und kulturelles Zentrum Westfalens. Als Zauberer für Münster bringe ich moderne Magie zu Firmenfeiern, Hochzeiten und Events in der lebenswertesten Stadt Deutschlands. Von der historischen Innenstadt bis ins Münsterland.",
    highlight: "Münster verbindet studentisches Flair, Wirtschaftsstärke und westfälische Gastfreundschaft — die perfekte Bühne für unvergessliche Events mit professioneller Zauberkunst.",
    einwohner: "315.000",
    bekannteLocations: ["Halle Münsterland", "Schloss Münster", "Rathaus Münster", "Jovel Music Hall", "Steigenberger Hotel Münster"],
    faq: [
      { q: "Was kostet ein Zauberer in Münster?", a: "Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein individuelles Angebot." },
      { q: "Für welche Events in Münster eignet sich ein Zauberer?", a: "Firmenfeiern, Hochzeiten, Geburtstage, Universitätsfeste, Weihnachtsfeiern, Galas — ich passe mein Programm individuell an deinen Anlass in Münster an." },
      { q: "Tritt der Zauberer auch im Münsterland auf?", a: "Ja! Ich trete in Münster und dem gesamten Münsterland auf — von Warendorf über Coesfeld bis Steinfurt." },
    ],
    seoText: "Zauberer Münster gesucht? Emilian Leber ist dein professioneller Zauberkünstler für Events in Münster und Westfalen. Mit interaktiver Close-Up Magie, einer begeisternden Bühnenshow oder einem exklusiven Magic Dinner wird deine Veranstaltung in Münster unvergesslich.",
    langText: `Münster — Universitätsstadt, Fahrradhauptstadt und eine der lebenswertesten Städte Deutschlands. Als Zauberer für Münster bringe ich modernes Entertainment zu Firmenfeiern, Hochzeiten und Events in der westfälischen Metropole.

Von Firmenevents in der Halle Münsterland über Hochzeiten im Schloss Münster bis zu Galas im historischen Rathaus — Münster bietet tolle Locations für Events, die begeistern. Das Münsteraner Publikum ist weltoffen und entertainment-begeistert.

Kosten Zauberer Münster: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot.`,
  },
  {
    slug: "bochum",
    name: "Bochum",
    region: "Nordrhein-Westfalen",
    intro: "Bochum — Kulturstadt im Herzen des Ruhrgebiets. Von der Jahrhunderthalle bis zum RuhrCongress: Als Zauberer für Bochum bringe ich moderne Magie, die genauso überraschend und kraftvoll ist wie die Ruhrgebietskultur selbst.",
    highlight: "Das Ruhrgebiet hat Feuer — und Bochum ist eines seiner hellsten Lichter. Modernes Entertainment für eine Stadt, die sich neu erfindet.",
    einwohner: "365.000",
    bekannteLocations: ["RuhrCongress Bochum", "Jahrhunderthalle", "Bermuda3Eck", "Zeiss Planetarium Bochum", "BO-Sporthalle"],
    faq: [
      { q: "Was kostet ein Zauberer in Bochum?", a: "Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot." },
      { q: "Eignet sich ein Zauberer für Betriebsfeiern im Ruhrgebiet?", a: "Absolut! Betriebsfeiern, Firmenjubiläen und Corporate Events sind eine meiner Spezialitäten. Erfahrung mit Events aller Branchen im Ruhrgebiet." },
      { q: "Tritt der Zauberer auch in Essen und Herne auf?", a: "Ja, ich trete im gesamten Ruhrgebiet auf — Bochum, Essen, Herne, Gelsenkirchen, Witten und Umgebung." },
    ],
    seoText: "Zauberer Bochum: Emilian Leber begeistert als Zauberkünstler auf Events in Bochum und dem Ruhrgebiet. Close-Up Magie, Bühnenshow und Comedy für Firmenfeiern, Hochzeiten und Galas in der Kulturstadt.",
    langText: `Bochum — Kulturstadt im Herzen des Ruhrgebiets, Heimat von Musiklegenden und aufstrebendem Unternehmertum. Als Zauberer für Bochum bringe ich modernes Entertainment, das zum kreativen und kraftvollen Spirit dieser Stadt passt.

Von Firmenfeiern im RuhrCongress über Events in der Jahrhunderthalle bis zu Hochzeiten in stylischen Bochumer Locations — ich kenne das Ruhrgebiets-Publikum und liefere Shows, die begeistern und verbinden.

Preise Zauberer Bochum: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot.`,
  },
  {
    slug: "bielefeld",
    name: "Bielefeld",
    region: "Nordrhein-Westfalen",
    intro: "Bielefeld — Wirtschaftsstandort in Ostwestfalen-Lippe und Heimat namhafter Unternehmen. Als Zauberer für Bielefeld bringe ich professionelles Entertainment zu Firmenfeiern, Hochzeiten und Events — für eine Stadt, die definitiv existiert.",
    highlight: "Bielefeld ist mehr als ein Mythos — starke Wirtschaft, lebhafte Eventszene und moderne Locations machen die Stadt zu einem Top-Standort für unvergessliche Events.",
    einwohner: "340.000",
    bekannteLocations: ["Stadthalle Bielefeld", "Rudolf-Oetker-Halle", "Sparrenburg", "Bauenhagen Bielefeld", "Wyndham Bielefeld Loom"],
    faq: [
      { q: "Was kostet ein Zauberer in Bielefeld?", a: "Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein individuelles Angebot." },
      { q: "Tritt der Zauberer auch bei Firmenfeiern in Bielefeld auf?", a: "Ja! Bielefeld ist ein starker Wirtschaftsstandort — ich habe Erfahrung mit Corporate Events für mittelständische und große Unternehmen in OWL." },
      { q: "Für welche Anlässe kann ich einen Zauberer in Bielefeld buchen?", a: "Firmenfeiern, Weihnachtsfeiern, Hochzeiten, Geburtstage, Jubiläen, Messen — für jeden Anlass das passende Showformat." },
    ],
    seoText: "Zauberer Bielefeld: Emilian Leber ist dein Zauberkünstler für Events in Bielefeld und Ostwestfalen-Lippe. Professionelle Zaubershow, Close-Up Magie und Comedy für Firmenfeiern, Hochzeiten und Geburtstage.",
    langText: `Bielefeld — die Stadt, die definitiv existiert, mit einer lebhaften Eventszene in Ostwestfalen. Als Zauberer für Bielefeld bringe ich professionelles Entertainment zu Firmenfeiern, Hochzeiten und Events in der OWL-Region.

Von Firmenfeiern in der Stadthalle Bielefeld über Hochzeiten in der Rudolf-Oetker-Halle bis zu Events auf der Sparrenburg — Bielefeld bietet starke Locations, und ich entwickle das passende Showkonzept für jede Veranstaltung.

Kosten Zauberer Bielefeld: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot.`,
  },
  {
    slug: "bonn",
    name: "Bonn",
    region: "Nordrhein-Westfalen",
    intro: "Bonn — Beethovens Geburtsstadt und einstige Bundeshauptstadt am Rhein. Als Zauberer für Bonn liefere ich Entertainment, das dem kulturellen Anspruch dieser besonderen Stadt entspricht — für Firmenfeiern, Hochzeiten und Galas.",
    highlight: "Beethoven, einstiger Bundestag und Rheinromantik — Bonn verbindet Geschichte, Kultur und internationales Flair. Der perfekte Rahmen für magische Events.",
    einwohner: "330.000",
    bekannteLocations: ["World Conference Center Bonn", "Beethovenhalle", "Poppelsdorfer Schloss", "Hotel Kameha Grand Bonn", "Altes Rathaus Bonn"],
    faq: [
      { q: "Was kostet ein Zauberer in Bonn?", a: "Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot." },
      { q: "Tritt der Zauberer auch auf internationalen Events in Bonn auf?", a: "Ja! Bonn ist ein internationaler Standort — ich habe Erfahrung mit multilingualen Events. Magie überwindet Sprachgrenzen." },
      { q: "Kann ich einen Zauberer für eine Hochzeit in Bonn buchen?", a: "Absolut! Hochzeiten in Bonn und dem Rheinland gehören zu meinen beliebtesten Formaten. Beim Sektempfang, Dinner oder der Party — magische Momente garantiert." },
    ],
    seoText: "Zauberer Bonn: Emilian Leber begeistert als Zauberkünstler auf Events in Bonn und der Rheinregion. Close-Up Magie, Bühnenshow und Comedy für Firmenfeiern, Hochzeiten und Galas in der Beethovenstadt.",
    langText: `Bonn — Beethovens Geburtsstadt, einstige Bundeshauptstadt und internationale Stadt am Rhein. Als Zauberer für Bonn liefere ich Entertainment, das dem kulturellen und internationalen Anspruch dieser besonderen Stadt entspricht.

Von internationalen Konferenzen im World Conference Center über Galas in der Beethovenhalle bis zu Hochzeiten am Rhein — Bonn bietet besondere Eventlocations, für die ich das passende Showprogramm entwickle.

Preise Zauberer Bonn: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot.`,
  },
  {
    slug: "wuppertal",
    name: "Wuppertal",
    region: "Nordrhein-Westfalen",
    intro: "Wuppertal — Stadt der Schwebebahn, der Kunst und der überraschenden Momente. Als Zauberer für Wuppertal bringe ich Entertainment, das genauso verblüffend ist wie die berühmte Schwebebahn selbst. Firmenfeiern, Hochzeiten und Events im Bergischen Land.",
    highlight: "Wuppertal steht für Außergewöhnliches — die Schwebebahn, das Tanztheater Pina Bausch, der Skulpturenpark. Meine Magie fügt sich perfekt in diesen Spirit ein.",
    einwohner: "355.000",
    bekannteLocations: ["Historische Stadthalle Wuppertal", "Skulpturenpark Waldfrieden", "Kunstmuseum Wuppertal", "Opernhaus Wuppertal", "Hotel zur Post Wuppertal"],
    faq: [
      { q: "Was kostet ein Zauberer in Wuppertal?", a: "Kosten je nach Format: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot." },
      { q: "Eignet sich ein Zauberer für kreative Events in Wuppertal?", a: "Perfekt! Wuppertal ist eine Kulturstadt — moderne, interaktive Zauberkunst passt ideal zu kreativen, anspruchsvollen Events." },
      { q: "Tritt der Zauberer auch in Solingen und Remscheid auf?", a: "Ja! Von Wuppertal aus bediene ich das gesamte Bergische Land — Solingen, Remscheid und Umgebung." },
    ],
    seoText: "Zauberer Wuppertal: Emilian Leber begeistert als Zauberkünstler auf Events in Wuppertal und dem Bergischen Land. Professionelle Zaubershow und Close-Up Magie für Firmenfeiern, Hochzeiten und kulturelle Events.",
    langText: `Wuppertal — Stadt der Schwebebahn, des Tanztheaters Pina Bausch und der überraschenden Momente. Als Zauberer für Wuppertal bringe ich Entertainment, das genauso außergewöhnlich ist wie die Stadt selbst — überraschend, kreativ und unvergesslich.

Von Firmenfeiern in der historischen Stadthalle über Kulturevents im Skulpturenpark Waldfrieden bis zu Hochzeiten in stylischen Locations — ich kenne die besondere Atmosphäre Wuppertals und passe mein Programm entsprechend an.

Kosten Zauberer Wuppertal: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot.`,
  },
  {
    slug: "mannheim",
    name: "Mannheim",
    region: "Baden-Württemberg",
    intro: "Mannheim — die Quadratestadt an Rhein und Neckar. Als Zauberer für Mannheim bringe ich modernes Entertainment zu Firmenfeiern, Galas und Hochzeiten in einer der dynamischsten Städte Baden-Württembergs. Von der SAP Arena bis zum Rosengarten.",
    highlight: "Mannheim ist Wirtschaftsstandort, Kulturzentrum und Musikstadt in einem — ideale Bühne für professionelle Zauberkunst auf höchstem Niveau.",
    einwohner: "315.000",
    bekannteLocations: ["SAP Arena Mannheim", "Rosengarten Mannheim", "Altes Rathaus Mannheim", "Technoseum", "Maritim Parkhotel Mannheim"],
    faq: [
      { q: "Was kostet ein Zauberer in Mannheim?", a: "Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein individuelles Angebot." },
      { q: "Tritt der Zauberer auch in Heidelberg und Ludwigshafen auf?", a: "Ja! Die Rhein-Neckar-Region ist mein Einzugsgebiet — Mannheim, Heidelberg, Ludwigshafen und die gesamte Metropolregion." },
      { q: "Eignet sich ein Zauberer für Firmenfeiern in Mannheim?", a: "Absolut — Mannheim ist ein starker Unternehmensstandort. Ich habe Erfahrung mit Corporate Events für Unternehmen aller Größen." },
    ],
    seoText: "Zauberer Mannheim: Emilian Leber ist dein Entertainer für Events in Mannheim und der Rhein-Neckar-Region. Professionelle Zaubershow für Firmenfeiern, Hochzeiten und Galas in der Quadratestadt.",
    langText: `Mannheim — die Quadratestadt an Rhein und Neckar, Wirtschaftszentrum und Musikstadt. Als Zauberer für Mannheim bringe ich modernes Entertainment für Firmenfeiern, Galas und Hochzeiten in der dynamischen Metropolregion Rhein-Neckar.

Von Firmenfeiern in der SAP Arena über Galas im Rosengarten bis zu Hochzeiten in stylischen Mannheimer Locations — ich entwickle für jede Veranstaltung das optimale Showkonzept. Modern, interaktiv und auf hohem Niveau.

Preise Zauberer Mannheim: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot.`,
  },
  {
    slug: "karlsruhe",
    name: "Karlsruhe",
    region: "Baden-Württemberg",
    intro: "Karlsruhe — die Fächerstadt, Sitz des Bundesverfassungsgerichts und Technologiestandort am Rhein. Als Zauberer für Karlsruhe verbinde ich technische Präzision mit kreativer Magie — für Firmenfeiern, Konferenzen und Events.",
    highlight: "Karlsruhe steht für Innovation, Technologie und kreatives Denken — moderne Zauberkunst trifft genau diesen Geist.",
    einwohner: "310.000",
    bekannteLocations: ["Schwarzwaldhalle Karlsruhe", "Konzerthaus Karlsruhe", "Schloss Karlsruhe", "ZKM Karlsruhe", "Messe Karlsruhe"],
    faq: [
      { q: "Was kostet ein Zauberer in Karlsruhe?", a: "Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot." },
      { q: "Tritt der Zauberer auch auf IT- und Technologie-Events in Karlsruhe auf?", a: "Ja! Karlsruhe ist ein wichtiger Technologiestandort — Corporate Events und Tech-Konferenzen gehören zu meinem Repertoire." },
      { q: "Eignet sich ein Zauberer für Events am KIT oder der Dualen Hochschule?", a: "Auf jeden Fall — Hochschul-Events, Absolventenfeiern und Campus-Events sind ideale Formate für interaktive Zauberkunst." },
    ],
    seoText: "Zauberer Karlsruhe: Emilian Leber begeistert als Zauberkünstler auf Events in Karlsruhe und der Technologieregion. Close-Up Magie, Bühnenshow und Comedy für Firmenfeiern, Hochzeiten und Kongresse in der Fächerstadt.",
    langText: `Karlsruhe — die Fächerstadt, IT-Hochburg und Sitz des Bundesverfassungsgerichts. Als Zauberer für Karlsruhe verbinde ich technologische Präzision mit kreativer Magie — für Firmenfeiern, Kongresse und Events in der Technologieregion am Rhein.

Von IT-Events im ZKM über Firmenfeiern in der Schwarzwaldhalle bis zu Hochzeiten im Schlosspark — Karlsruhe bietet moderne Eventlocations, für die ich passende Showkonzepte entwickle.

Kosten Zauberer Karlsruhe: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot.`,
  },
  {
    slug: "wiesbaden",
    name: "Wiesbaden",
    region: "Hessen",
    intro: "Wiesbaden — elegante Kurstadt, hessische Landeshauptstadt und Stadt der Villen. Als Zauberer für Wiesbaden bringe ich Entertainment, das dem exklusiven Ambiente dieser besonderen Stadt entspricht — für Galas, Firmenfeiern und Hochzeiten.",
    highlight: "Wiesbaden steht für Eleganz, Stil und besondere Anlässe — professionelle Zauberkunst, die genau diesem Anspruch gerecht wird.",
    einwohner: "280.000",
    bekannteLocations: ["Kurhaus Wiesbaden", "Hessisches Staatstheater Wiesbaden", "Bowling Green Wiesbaden", "Hotel Nassauer Hof", "Casinogesellschaft Wiesbaden"],
    faq: [
      { q: "Was kostet ein Zauberer in Wiesbaden?", a: "Kosten je nach Format: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot." },
      { q: "Tritt der Zauberer auch auf Galas und exklusiven Events in Wiesbaden auf?", a: "Ja! Galas, Charity-Events und exklusive Dinner in Wiesbaden sind ideale Formate für professionelle Zauberkunst auf hohem Niveau." },
      { q: "Kann ich einen Zauberer für eine Hochzeit in Wiesbaden buchen?", a: "Absolut! Hochzeiten in Wiesbaden und dem Rhein-Main-Gebiet gehören zu meinen beliebtesten Formaten — elegant, interaktiv und unvergesslich." },
    ],
    seoText: "Zauberer Wiesbaden: Emilian Leber ist dein Entertainer für Events in Wiesbaden. Professionelle Zaubershow für Galas, Firmenfeiern und Hochzeiten in der hessischen Landeshauptstadt.",
    langText: `Wiesbaden — elegante Kurstadt, hessische Landeshauptstadt und Stadt der Villen. Als Zauberer für Wiesbaden liefere ich Entertainment, das dem exklusiven Ambiente dieser besonderen Stadt entspricht — stilsicher, professionell und unvergesslich.

Von Galas im Kurhaus über Charity-Events in eleganten Wiesbadener Villen bis zu Hochzeiten im Hotel Nassauer Hof — Wiesbaden bietet die vornehmsten Eventlocations Hessens, und mein Programm passt sich dem Niveau entsprechend an.

Preise Zauberer Wiesbaden: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot.`,
  },
  {
    slug: "mainz",
    name: "Mainz",
    region: "Rheinland-Pfalz",
    intro: "Mainz — Karnevalshauptstadt, Medienstadt und Weinstadt am Rhein. Als Zauberer für Mainz bringe ich moderne Magie zu Firmenfeiern, Hochzeiten und Events in der rheinland-pfälzischen Landeshauptstadt.",
    highlight: "Mainz verbindet Feierlaune, Weinkultur und Medienstandort — die perfekte Stadt für Events, die in Erinnerung bleiben.",
    einwohner: "220.000",
    bekannteLocations: ["Rheingoldhalle Mainz", "Kurfürstliches Schloss Mainz", "Staatstheater Mainz", "Gutenberg-Museum Mainz", "Hilton Mainz City"],
    faq: [
      { q: "Was kostet ein Zauberer in Mainz?", a: "Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot." },
      { q: "Eignet sich ein Zauberer für Karneval-Events in Mainz?", a: "Perfekt! Mainz ist eine der größten Karnevalsstädte Deutschlands — ob Sitzung, Firmen-Karneval oder Rosenmontagsfeier, ich passe mein Programm an." },
      { q: "Tritt der Zauberer auch in Wiesbaden und dem Rhein-Main-Gebiet auf?", a: "Ja! Von Mainz aus bediene ich das gesamte Rhein-Main-Gebiet — Wiesbaden, Frankfurt, Darmstadt und Umgebung." },
    ],
    seoText: "Zauberer Mainz: Emilian Leber begeistert als Zauberkünstler auf Events in Mainz. Close-Up Magie, Bühnenshow und Comedy für Firmenfeiern, Hochzeiten und Galas in der Landeshauptstadt Rheinland-Pfalz.",
    langText: `Mainz — Karnevalshauptstadt, Medienstandort und Weinstadt am Rhein. Als Zauberer für Mainz bringe ich moderne Magie zu Firmenfeiern, Hochzeiten und Events in der rheinland-pfälzischen Landeshauptstadt.

Von Karneval-Events in der Rheingoldhalle über Medienfirmen-Feiern bis zu Hochzeiten im Kurfürstlichen Schloss — Mainz verbindet Feierlaune und Stil. Als Zauberer für Mainz passe ich mein Programm genau diesem Spirit an.

Kosten Zauberer Mainz: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot.`,
  },
  {
    slug: "magdeburg",
    name: "Magdeburg",
    region: "Sachsen-Anhalt",
    intro: "Magdeburg — Elbe-Metropole, Landeshauptstadt Sachsen-Anhalts und Stadt Otto des Großen. Als Zauberer für Magdeburg bringe ich modernes Entertainment zu Firmenfeiern, Hochzeiten und Events an der Elbe.",
    highlight: "Magdeburg wächst und entwickelt sich — eine aufstrebende Stadt mit vielen Eventmöglichkeiten und einem Publikum, das echtes Entertainment zu schätzen weiß.",
    einwohner: "240.000",
    bekannteLocations: ["Festung Mark Magdeburg", "GETEC Arena Magdeburg", "Kulturforum Magdeburg", "Maritim Hotel Magdeburg", "Kloster Unser Lieben Frauen"],
    faq: [
      { q: "Was kostet ein Zauberer in Magdeburg?", a: "Kosten je nach Format: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot." },
      { q: "Tritt der Zauberer auch in Halle (Saale) und der Region auf?", a: "Ja! Von Magdeburg aus bediene ich ganz Sachsen-Anhalt — Halle (Saale), Dessau, Stendal und Umgebung." },
      { q: "Eignet sich ein Zauberer für Firmenfeiern in Magdeburg?", a: "Absolut! Firmenfeiern, Weihnachtsfeiern und Corporate Events in Magdeburg — modernes Entertainment, das in Erinnerung bleibt." },
    ],
    seoText: "Zauberer Magdeburg: Emilian Leber ist dein Entertainer für Events in Magdeburg und Sachsen-Anhalt. Professionelle Zaubershow und Close-Up Magie für Firmenfeiern, Hochzeiten und Galas in der Elbestadt.",
    langText: `Magdeburg — Elbe-Metropole, Landeshauptstadt Sachsen-Anhalts und aufstrebender Wirtschaftsstandort. Als Zauberer für Magdeburg bringe ich modernes Entertainment zu Firmenfeiern, Hochzeiten und Events in der Stadt Otto des Großen.

Von Firmenfeiern in der Festung Mark über Galas in der GETEC Arena bis zu Hochzeiten im Kloster Unser Lieben Frauen — Magdeburg bietet eindrucksvolle Locations für Events mit Charakter.

Preise Zauberer Magdeburg: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot.`,
  },
  {
    slug: "erfurt",
    name: "Erfurt",
    region: "Thüringen",
    intro: "Erfurt — Thüringens Landeshauptstadt mit Domberg, Krämerbrücke und einer lebendigen Eventszene. Als Zauberer für Erfurt bringe ich moderne Magie zu Firmenfeiern, Hochzeiten und besonderen Anlässen in der grünen Mitte Deutschlands.",
    highlight: "Erfurt liegt geografisch im Herzen Deutschlands — ideale Bühne für Events, die von überall gut erreichbar sind. Historisch, gastfreundlich und magisch.",
    einwohner: "215.000",
    bekannteLocations: ["Messe Erfurt", "Kaisersaal Erfurt", "Krämerbrücke Erfurt", "Erfurter Dom", "Radisson Blu Hotel Erfurt"],
    faq: [
      { q: "Was kostet ein Zauberer in Erfurt?", a: "Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot." },
      { q: "Tritt der Zauberer auch in Weimar und Jena auf?", a: "Ja! Ich trete in ganz Thüringen auf — Erfurt, Weimar, Jena, Gotha und Umgebung. Die kurzen Wege in Thüringen machen das möglich." },
      { q: "Eignet sich ein Zauberer für die Messe Erfurt?", a: "Perfekt! Messeauftritte, Standprogramme und Kongress-Entertainment auf der Messe Erfurt gehören zu meinem Repertoire." },
    ],
    seoText: "Zauberer Erfurt: Emilian Leber begeistert als Zauberkünstler auf Events in Erfurt und Thüringen. Close-Up Magie, Bühnenshow und Comedy für Firmenfeiern, Hochzeiten und Messen in der Landeshauptstadt.",
    langText: `Erfurt — die grüne Mitte Deutschlands, Thüringens Landeshauptstadt und eine der ältesten Städte Deutschlands. Als Zauberer für Erfurt bringe ich moderne Magie zu Firmenfeiern, Hochzeiten und Events in der blumenreichen Domstadt.

Von Messeauftritten auf der Messe Erfurt über Galas im Kaisersaal bis zu Hochzeiten an der historischen Krämerbrücke — Erfurt bietet eindrucksvolle Locations im Herzen Deutschlands.

Kosten Zauberer Erfurt: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot.`,
  },
  {
    slug: "freiburg",
    name: "Freiburg",
    region: "Baden-Württemberg",
    intro: "Freiburg im Breisgau — Schwarzwaldtor, Solarstadt und eine der lebenswertesten Städte Deutschlands. Als Zauberer für Freiburg bringe ich moderne Magie zu Firmenfeiern, Hochzeiten und Events in der südlichsten Großstadt Deutschlands.",
    highlight: "Freiburg verbindet Lebensqualität, studentisches Flair und Nähe zur Natur — ideale Kulisse für Events mit magischer Unterhaltung.",
    einwohner: "230.000",
    bekannteLocations: ["Konzerthaus Freiburg", "Messe Freiburg", "Historisches Kaufhaus Freiburg", "Hotel Colombi Freiburg", "Münsterforum Freiburg"],
    faq: [
      { q: "Was kostet ein Zauberer in Freiburg?", a: "Kosten je nach Format: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot." },
      { q: "Tritt der Zauberer auch in Basel und dem Elsass auf?", a: "Ja! Von Freiburg aus bin ich schnell in der Schweiz (Basel) und in Frankreich (Straßburg, Elsass) — Magie kennt keine Grenzen." },
      { q: "Eignet sich ein Zauberer für Hochzeiten im Schwarzwald?", a: "Absolut! Hochzeiten im Schwarzwald und der Region Freiburg sind traumhaft schön — ich sorge für magische Momente, die zur einzigartigen Kulisse passen." },
    ],
    seoText: "Zauberer Freiburg: Emilian Leber ist dein Entertainer für Events in Freiburg im Breisgau. Professionelle Zaubershow für Firmenfeiern, Hochzeiten und Galas in der Schwarzwaldmetropole.",
    langText: `Freiburg im Breisgau — die solarste Stadt Deutschlands, Tor zum Schwarzwald und studentisches Kulturzentrum. Als Zauberer für Freiburg bringe ich modernes Entertainment in die südlichste Großstadt Deutschlands.

Von Firmenfeiern im Konzerthaus über Hochzeiten im Historischen Kaufhaus bis zu Events in der Messe Freiburg — Freiburg verbindet Lebensqualität und Gastfreundschaft. Als Zauberer für Freiburg passe ich mein Programm dem lebensfrohen Spirit der Stadt an.

Preise Zauberer Freiburg: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot.`,
  },
  {
    slug: "luebeck",
    name: "Lübeck",
    region: "Schleswig-Holstein",
    intro: "Lübeck — die Königin der Hanse, Marzipanstadt und UNESCO-Weltkulturerbe. Als Zauberer für Lübeck bringe ich moderne Magie zu Events in einer der schönsten Altstädte Deutschlands. Vom Holstentor bis zur Musik- und Kongresshalle.",
    highlight: "Lübeck verbindet hanseatische Eleganz, reiche Geschichte und norddeutsche Herzlichkeit — der perfekte Rahmen für Events mit professioneller Zauberkunst.",
    einwohner: "217.000",
    bekannteLocations: ["Musik- und Kongresshalle Lübeck", "Buddenbrookhaus", "Atlantic Hotel Lübeck", "Strandhalle Travemünde", "Radisson Blu Senator Hotel Lübeck"],
    faq: [
      { q: "Was kostet ein Zauberer in Lübeck?", a: "Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot." },
      { q: "Tritt der Zauberer auch in Travemünde und Ostholstein auf?", a: "Ja! Von Lübeck aus bin ich in Travemünde, Bad Schwartau und ganz Ostholstein schnell vor Ort." },
      { q: "Eignet sich ein Zauberer für Events in der Lübecker Altstadt?", a: "Perfekt! Die historische Altstadt mit ihren einzigartigen Locations bietet eine traumhafte Kulisse für magische Events." },
    ],
    seoText: "Zauberer Lübeck: Emilian Leber begeistert als Zauberkünstler auf Events in Lübeck. Close-Up Magie, Bühnenshow und Comedy für Firmenfeiern, Hochzeiten und besondere Anlässe in der Hansestadt.",
    langText: `Lübeck — Königin der Hanse, Marzipanstadt und UNESCO-Weltkulturerbe. Als Zauberer für Lübeck bringe ich moderne Magie in eine der schönsten Altstädte Deutschlands — für Firmenfeiern, Hochzeiten und besondere Events.

Von Firmenevents in der Musik- und Kongresshalle über Galas im Buddenbrookhaus bis zu Hochzeiten im Atlantic Hotel — Lübeck bietet einzigartige Locations mit hanseatischem Flair und historischem Charme.

Kosten Zauberer Lübeck: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot.`,
  },
  {
    slug: "kiel",
    name: "Kiel",
    region: "Schleswig-Holstein",
    intro: "Kiel — Landeshauptstadt Schleswig-Holsteins, Marinestadt und Gastgeber der weltbekannten Kieler Woche. Als Zauberer für Kiel bringe ich professionelles Entertainment zu Firmenfeiern, Hochzeiten und Events an der Förde.",
    highlight: "Kiel verbindet maritimes Flair, Wirtschaftsstärke und norddeutsche Offenheit — die ideale Bühne für Events, die in Erinnerung bleiben.",
    einwohner: "246.000",
    bekannteLocations: ["Sparkassen Arena Kiel", "Kieler Schloss", "Ostseekai Kiel", "Hotel Kieler Kaufmann", "Kieler Woche Gelände"],
    faq: [
      { q: "Was kostet ein Zauberer in Kiel?", a: "Kosten je nach Format: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot." },
      { q: "Tritt der Zauberer auch während der Kieler Woche auf?", a: "Ja! Die Kieler Woche bietet großartige Möglichkeiten für Side-Events, VIP-Formate und Firmen-Hospitality — ich bin dabei." },
      { q: "Eignet sich ein Zauberer für maritime Events und Schiffs-Partys?", a: "Absolut! Events auf Schiffen oder in Hafenlocations sind besonders stimmungsvoll — Close-Up Magie passt perfekt dazu." },
    ],
    seoText: "Zauberer Kiel: Emilian Leber ist dein Entertainer für Events in Kiel. Professionelle Zaubershow und Close-Up Magie für Firmenfeiern, Hochzeiten und Galas in der schleswig-holsteinischen Landeshauptstadt.",
    langText: `Kiel — Landeshauptstadt Schleswig-Holsteins, Marinestadt und Gastgeber der weltbekannten Kieler Woche. Als Zauberer für Kiel bringe ich professionelles Entertainment an die Förde — für Firmenfeiern, Hochzeiten und maritime Events.

Von Kieler Woche-Events über Firmenfeiern in der Sparkassen Arena bis zu Hochzeiten im Kieler Schloss — Kiel bietet maritime Locations mit norddeutschem Charme. Das offene und herzliche Kieler Publikum liebt Entertainment mit echtem Wow-Faktor.

Preise Zauberer Kiel: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot.`,
  },
  {
    slug: "braunschweig",
    name: "Braunschweig",
    region: "Niedersachsen",
    intro: "Braunschweig — die Löwenstadt Niedersachsens im Herzen Deutschlands. Als Zauberer für Braunschweig bringe ich moderne Magie zu Firmenfeiern, Hochzeiten und Events in der traditionsreichen Stadt zwischen Harz und Heide.",
    highlight: "Braunschweig ist Wirtschaftsstandort, Universitätsstadt und Kulturzentrum — ideal für Events, die professionelles Entertainment verdienen.",
    einwohner: "250.000",
    bekannteLocations: ["Stadthalle Braunschweig", "Volkswagen Halle Braunschweig", "Schloss Braunschweig", "Haus der Kulturen Braunschweig", "Steigenberger Hotel Braunschweig"],
    faq: [
      { q: "Was kostet ein Zauberer in Braunschweig?", a: "Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein kostenloses Angebot." },
      { q: "Tritt der Zauberer auch auf VW-Events und Automotive-Firmenfeiern auf?", a: "Ja! Braunschweig ist eng mit dem Volkswagen-Konzern verbunden — Corporate Events in diesem Umfeld gehören zu meinen Spezialitäten." },
      { q: "Tritt der Zauberer auch in Wolfsburg und Göttingen auf?", a: "Ja, ich trete in ganz Niedersachsen auf — von Braunschweig über Wolfsburg bis Göttingen und Hildesheim." },
    ],
    seoText: "Zauberer Braunschweig: Emilian Leber begeistert als Zauberkünstler auf Events in Braunschweig. Close-Up Magie, Bühnenshow und Comedy für Firmenfeiern, Hochzeiten und Galas in der Löwenstadt.",
    langText: `Braunschweig — die Löwenstadt Niedersachsens, VW-Standort und Universitätsstadt. Als Zauberer für Braunschweig bringe ich professionelles Entertainment zu Firmenfeiern, Hochzeiten und Events in der traditionsreichen Stadt zwischen Harz und Heide.

Von Corporate Events im Volkswagen Halle-Umfeld über Firmenfeiern in der Stadthalle bis zu Hochzeiten in historischen Braunschweiger Locations — ich entwickle für jede Veranstaltung das optimale Showkonzept.

Kosten Zauberer Braunschweig: Meine Pakete beginnen ab 395 €. Kontaktiere mich für ein individuelles Angebot.

Von Braunschweig aus trete ich in ganz Niedersachsen auf — Wolfsburg, Salzgitter, Göttingen, Hildesheim und Umgebung. Als Zauberkünstler für Braunschweig und die Region bin ich ein verlässlicher Partner für Events aller Größenordnungen.`,
  },
];
