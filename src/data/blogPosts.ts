/**
 * Magazin-Daten — Editorial-Posts mit strukturiertem Body.
 *
 * Jeder Post hat:
 *  - meta (slug, title, excerpt, kategorie, datum, lesezeit, autor, cover-image)
 *  - sections: Array typed Blöcke. Renderer in BlogPost.tsx baut daraus
 *    den Editorial-Reading-Flow (Paragraph, Heading, Quote, Image, List).
 *
 * Hinweis: KEINE deutschen Anführungszeichen (>>...<<) in JS-Strings —
 * SWC bricht sonst beim Vite-Build. Eckige Klammern verwenden.
 */

export type BlogSection =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string; id?: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "callout"; eyebrow: string; text: string };

export interface BlogPost {
  slug: string;
  title: string;
  titleAccent?: string;
  excerpt: string;
  category: string;
  tags: string[];
  date: string;
  readTime: string;
  words: number;
  author: {
    name: string;
    role: string;
  };
  cover: string;
  featured?: boolean;
  sections: BlogSection[];
}

const EMILIAN = {
  name: "Emilian Leber",
  role: "Zauberkünstler",
};

export const blogPosts: BlogPost[] = [
  {
    slug: "zauberer-fuer-hochzeit-auswaehlen",
    title: "Wie wähle ich einen Zauberer für meine Hochzeit?",
    titleAccent: "richtig aus.",
    excerpt:
      "Sektempfang, Dinner oder nach dem Tanzen — die Entscheidung für einen Hochzeitszauberer fällt nicht beim Stil, sondern beim Timing. Was ich gelernt habe, nachdem ich auf über 100 Hochzeiten gezaubert habe.",
    category: "Hochzeit",
    tags: [
      "Hochzeitszauberer",
      "Sektempfang",
      "Close-Up",
      "Hochzeit planen",
      "Wedding Entertainment",
    ],
    date: "2026-05-12",
    readTime: "6 Min.",
    words: 480,
    author: EMILIAN,
    cover: "wedding-magic",
    featured: true,
    sections: [
      {
        type: "paragraph",
        text:
          "Die Frage kommt fast immer im selben Tonfall. Halb interessiert, halb skeptisch. [Was macht ein Zauberer auf einer Hochzeit eigentlich?] — und dann eine Pause. Die ehrliche Antwort ist: er hält den Moment zusammen, in dem die Gäste sich noch nicht kennen.",
      },
      {
        type: "paragraph",
        text:
          "Hochzeiten haben drei lange Wartezeiten. Der Sektempfang nach der Trauung, die Zeit zwischen den Gängen, die Stunde vor dem Hochzeitstanz. Genau dort entscheidet sich, ob die Hochzeit als nett oder als unvergesslich in Erinnerung bleibt.",
      },
      {
        type: "heading",
        text: "Drei Slots, drei Formate",
        id: "drei-slots",
      },
      {
        type: "paragraph",
        text:
          "Sektempfang: Close-Up. Ich gehe zu jeder Gruppe, die noch verlegen herumsteht, und in drei Minuten ist die Gruppe ein Tisch. Tante Erika aus Hamburg und der Trauzeuge aus Augsburg haben plötzlich ein gemeinsames Thema. Genau das war der Job.",
      },
      {
        type: "paragraph",
        text:
          "Dinner: Tisch-zu-Tisch. Während die Vorspeise vom Tisch geht und das Hauptgericht noch in der Küche steht, komme ich. Fünf bis sieben Minuten pro Tisch. Niemand bemerkt die Wartezeit, weil die Wartezeit das Programm wurde.",
      },
      {
        type: "paragraph",
        text:
          "Nach dem Dinner: Bühnenshow als Überraschung. Das Brautpaar weiß davon, die Gäste nicht. Zwanzig Minuten Comedy-Magie als Übergang zum Tanzen. Der emotionale Höhepunkt der Hochzeit liegt selten beim Walzer — er liegt hier.",
      },
      {
        type: "quote",
        text:
          "Mutter hat geweint. Mehr Erfolg geht nicht.",
        attribution: "Bräutigam, Hochzeit in Sinzing 2025",
      },
      {
        type: "heading",
        text: "Was ihr beim Auswählen prüfen solltet",
        id: "auswahl",
      },
      {
        type: "list",
        items: [
          "Referenzvideos von echten Hochzeiten — kein Bühnen-Showreel im Theater.",
          "Sprechprobe. Ein Zauberer ohne Stimme ist ein Zauberer ohne Hochzeit.",
          "Frühbuchung. Beliebte Termine zwischen Mai und September sind im Vorjahr weg.",
          "Ein klares Konzept, welches Format zu welchem Slot passt — nicht alles auf einmal.",
          "Vertraglich fixierte Show-Länge, Aufbauzeit und ein vereinbarter Tech-Rider.",
        ],
      },
      {
        type: "callout",
        eyebrow: "Faustregel.",
        text:
          "Wer mehr als drei Slots gleichzeitig anbietet, hat keinen davon zu Ende gedacht. Wählt einen Hauptslot und ergänzt einen zweiten als Akzent.",
      },
      {
        type: "heading",
        text: "Die häufigsten drei Fehler",
        id: "fehler",
      },
      {
        type: "paragraph",
        text:
          "Erstens: Den Zauberer als Lückenfüller buchen statt als Hauptprogrammpunkt. Zweitens: Die Show zu spät einplanen, wenn die Gäste schon vom Sekt müde sind. Drittens: Den Trauzeugen fragen statt einen Profi — das endet im Klischee.",
      },
      {
        type: "paragraph",
        text:
          "Eine Hochzeit ist kein Test-Event. Die Investition in einen erfahrenen Zauberer ist im Verhältnis zum Budget winzig — und sie ist das, worüber Gäste am nächsten Tag reden. Nicht das Buffet, nicht die Band, nicht das Brautkleid. Das gemeinsame Staunen.",
      },
      {
        type: "paragraph",
        text:
          "Wenn ihr unsicher seid: schreibt mir Datum und Location. Ich schicke euch innerhalb 24 Stunden einen konkreten Vorschlag, welcher Slot zu eurer Hochzeit passt — ohne Verpflichtung, ohne Verkaufstrick. Das ist mein Job.",
      },
    ],
  },
  {
    slug: "magie-anteil-firmenfeier",
    title: "Welcher Magie-Anteil passt zur Firmenfeier?",
    titleAccent: "Eine Dosierungsfrage.",
    excerpt:
      "Zwischen Vorstandsdinner und Mitarbeiter-Weihnachtsfeier liegen Welten. Wie viel Magie verträgt welche Firmenfeier — und wann wird es zu viel?",
    category: "Firmenfeiern",
    tags: [
      "Firmenfeier",
      "Corporate Entertainment",
      "Vorstandsdinner",
      "Weihnachtsfeier",
      "B2B Magier",
    ],
    date: "2026-05-08",
    readTime: "5 Min.",
    words: 420,
    author: EMILIAN,
    cover: "firmenfeier",
    featured: false,
    sections: [
      {
        type: "paragraph",
        text:
          "Eine der ehrlichsten Fragen, die mir Eventmanager:innen stellen, klingt zuerst banal. [Wie viel Magie ist denn jetzt eigentlich genug?] — und dahinter steckt eine echte Sorge: zu wenig wirkt wie ein Lückenfüller, zu viel kippt ins Albernverdächtige.",
      },
      {
        type: "paragraph",
        text:
          "Die Antwort ist nie eine Minutenangabe. Die Antwort ist immer ein Verhältnis zum Anlass.",
      },
      {
        type: "heading",
        text: "Vier Formate, vier Dosierungen",
        id: "vier-formate",
      },
      {
        type: "paragraph",
        text:
          "Vorstandsdinner mit zwölf Gästen: zwei Tisch-Routinen, je drei Minuten. Mehr nicht. Hier zählt die intime Wirkung, nicht das Spektakel. Ein guter Tisch-Set zieht die Aufmerksamkeit weg von der Quartalspräsentation und schafft die Pause, die das ganze Dinner braucht.",
      },
      {
        type: "paragraph",
        text:
          "Kundenabend mit 80 Personen: Close-Up beim Empfang plus eine 20-Minuten-Bühnenshow nach dem Hauptgang. Das ist die klassische Dosierung. Sie funktioniert seit Jahrzehnten, weil sie Networking und Programm kombiniert.",
      },
      {
        type: "paragraph",
        text:
          "Incentive-Reise mit Team: Walk-Around während des gesamten Abends, kein Bühnen-Programm. Hier soll niemand stillsitzen müssen. Magie als Hintergrundphänomen, das zufällig an euren Tisch kommt.",
      },
      {
        type: "paragraph",
        text:
          "Mitarbeiter-Weihnachtsfeier mit 300 Gästen: Bühnenshow als klares Highlight, 30 bis 45 Minuten. Hier ist die Gruppe so groß, dass nur ein gemeinsames Erlebnis wirkt. Close-Up wäre Verschwendung.",
      },
      {
        type: "quote",
        text:
          "Drei Minuten am Vorstandstisch — und der Aufsichtsratsvorsitzende hat zum ersten Mal an dem Abend gelächelt.",
        attribution: "Eventmanagerin, DAX-Konzern 2024",
      },
      {
        type: "heading",
        text: "Was Magie auf einer Firmenfeier wirklich macht",
        id: "wirkung",
      },
      {
        type: "list",
        items: [
          "Sie öffnet die Stimmung, ohne den Anstand zu verletzen.",
          "Sie erzeugt Gesprächsstoff zwischen Hierarchien.",
          "Sie liefert dem Hauptredner eine Punktlandung danach.",
          "Sie verkürzt empfundene Wartezeit zwischen Gängen.",
          "Sie ist die einzige Programmnummer, die sich an jede Branche anpasst.",
        ],
      },
      {
        type: "callout",
        eyebrow: "Faustregel.",
        text:
          "Je formeller der Anlass, desto kürzer und präziser die Magie-Slots. Je informeller, desto länger darf gezaubert werden.",
      },
      {
        type: "paragraph",
        text:
          "Was ich nie tun würde: einer Steuerberater-Kanzlei in Frankfurt die gleiche Routine vorschlagen wie einem Startup-Sommerfest in Berlin. Die Witze, die Pointen, das Timing — alles wird auf den Anlass zugeschnitten. Das ist der Unterschied zwischen einem Künstler und einem Programmpunkt.",
      },
      {
        type: "paragraph",
        text:
          "Wer eine Firmenfeier plant, sollte die Dosierungsfrage zuerst stellen — vor der Frage nach Datum, Location oder Preis. Aus der Antwort ergibt sich der Rest.",
      },
    ],
  },
  {
    slug: "magic-dinner-was-steckt-dahinter",
    title: "Magic Dinner — was steckt dahinter?",
    titleAccent: "Mehr als Essen plus Trick.",
    excerpt:
      "Ein durchinszeniertes Format zwischen Vorspeise und Dessert. Warum Magic Dinner anders funktioniert als jede Bühnenshow — und warum die Wartezeit zwischen den Gängen plötzlich der Höhepunkt ist.",
    category: "Magic Dinner",
    tags: [
      "Magic Dinner",
      "Dinner Show",
      "Tisch-zu-Tisch",
      "Restaurant Event",
      "Wald & Wiese",
    ],
    date: "2026-05-03",
    readTime: "7 Min.",
    words: 520,
    author: EMILIAN,
    cover: "dinner",
    featured: false,
    sections: [
      {
        type: "paragraph",
        text:
          "Magic Dinner klingt erst mal nach einem Veranstaltungsformat-Buzzword. Restaurant, Drei-Gang-Menü, dazwischen ein bisschen Magie. Klingt simpel. Ist es nicht. Es ist eines der präzisest komponierten Formate, die ich kenne.",
      },
      {
        type: "paragraph",
        text:
          "Der Trick liegt nicht in der Magie. Der Trick liegt in der Wartezeit.",
      },
      {
        type: "heading",
        text: "Wartezeit als Bühne",
        id: "wartezeit",
      },
      {
        type: "paragraph",
        text:
          "Zwischen Vorspeise und Hauptgang vergehen in einem normalen Restaurant zwölf bis achtzehn Minuten. Eine Wartezeit, in der die Gäste eigentlich nichts tun — Smalltalk, Handy, Brot. Beim Magic Dinner wird genau diese Wartezeit zum Programmpunkt.",
      },
      {
        type: "paragraph",
        text:
          "Ich komme zu jedem Tisch einzeln. Sechs bis acht Minuten pro Tisch. Keine Wiederholung — jede Routine ist genau einmal pro Abend zu sehen. Die Tische tauschen sich danach aus. [Was hat er bei euch gemacht?] — der beste Gesprächsanlass, den ein Dinner haben kann.",
      },
      {
        type: "heading",
        text: "Was Gäste wirklich erleben",
        id: "erlebnis",
      },
      {
        type: "list",
        items: [
          "Eine Karte verschwindet in den eigenen Händen — nicht in meinen.",
          "Ein geliehener Ring taucht in einem geschlossenen Beutel auf.",
          "Eine Münze wandert durch einen festen Tisch.",
          "Ein Gedanke wird vorhergesagt, der erst nach der Vorhersage gefasst wird.",
        ],
      },
      {
        type: "paragraph",
        text:
          "Das Entscheidende: Die Magie passiert nicht auf einer Bühne, fünfzehn Meter entfernt. Sie passiert dreißig Zentimeter vom Gesicht des Gastes. In seinen eigenen Händen. Genau diese Nähe ist der Grund, warum Magic Dinner ein anderes Erlebnis ist als eine Bühnenshow.",
      },
      {
        type: "quote",
        text:
          "Wir saßen drei Stunden in dem Restaurant. Es fühlte sich wie zwanzig Minuten an.",
        attribution: "Magic-Dinner-Gast, Wald und Wiese 2025",
      },
      {
        type: "heading",
        text: "Warum Restaurants das Format lieben",
        id: "restaurants",
      },
      {
        type: "paragraph",
        text:
          "Aus Restaurantsicht ist Magic Dinner ein Doppelgewinn. Die Wartezeit zwischen den Gängen ist keine Schwachstelle mehr — sie ist das Programm. Gleichzeitig bleiben Gäste länger, bestellen mehr Getränke, und der Abend wird zum Anlass für Wiederbuchung.",
      },
      {
        type: "paragraph",
        text:
          "Mein Hauspartner ist seit Jahren das Restaurant Wald und Wiese in Sinzing bei Regensburg. Wir haben das Format dort über zwei Jahre verfeinert. Drei-Gang-Menü, vier Stunden Abend, jede Wartezeit komponiert. Es funktioniert. Und es funktioniert genauso in jedem anderen Restaurant, das den Mut hat, das Format ernst zu nehmen.",
      },
      {
        type: "heading",
        text: "Für wen lohnt sich Magic Dinner als Eventformat",
        id: "zielgruppe",
      },
      {
        type: "paragraph",
        text:
          "Firmen, die Kunden beeindrucken wollen, ohne in Banalität abzugleiten. Hochzeitsgesellschaften, die ihrem Dinner einen roten Faden geben wollen. Private Gruppen, die einen Geburtstag oder ein Jubiläum nicht als Routine durchziehen wollen. Und Eventagenturen, die ihren Kunden ein Format anbieten möchten, das nicht in jeder Stadt zu haben ist.",
      },
      {
        type: "callout",
        eyebrow: "Was Magic Dinner nicht ist.",
        text:
          "Es ist keine Bühnenshow im Restaurant. Es ist keine Aneinanderreihung von Tricks. Es ist ein dramaturgisch durchkomponierter Abend, bei dem Genuss, Wartezeit und Magie zu einem einzigen Erlebnis verschmelzen.",
      },
      {
        type: "paragraph",
        text:
          "Wer es einmal erlebt hat, bucht es wieder. Das ist der ehrlichste Test, den ein Eventformat haben kann.",
      },
    ],
  },
  {
    slug: "fuenf-dinge-zauberer-buchung",
    title: "5 Dinge, die du bei der Buchung eines Zauberers wissen solltest",
    titleAccent: "Bevor du anfragst.",
    excerpt:
      "Erfahrungswerte aus 200+ Events: die fünf Punkte, die wirklich über Gelingen oder Scheitern entscheiden. Keine Buchungsplattform erklärt dir das.",
    category: "Buchung",
    tags: [
      "Zauberer buchen",
      "Event-Tipps",
      "Buchung",
      "Vertrag",
      "Eventplanung",
    ],
    date: "2026-04-28",
    readTime: "5 Min.",
    words: 440,
    author: EMILIAN,
    cover: "magic",
    featured: false,
    sections: [
      {
        type: "paragraph",
        text:
          "Die häufigste Buchungsfrage ist die nach dem Preis. Sie ist auch die unwichtigste. Wer einen Zauberer ausschließlich nach Preis bucht, kauft am Ende doppelt — einmal den günstigen, der nicht funktioniert, und einmal den, der die Lücke füllt.",
      },
      {
        type: "paragraph",
        text:
          "Diese fünf Punkte sind in der richtigen Reihenfolge. Wer sie nacheinander prüft, bucht selten falsch.",
      },
      {
        type: "heading",
        text: "Eins: Anlass vor Künstler",
        id: "anlass",
      },
      {
        type: "paragraph",
        text:
          "Bevor du eine einzige Anfrage schickst: definiere den Anlass. Hochzeit-Sektempfang, Firmen-Weihnachtsfeier mit Vorstand, Geburtstag im Restaurant. Die Anforderungen sind völlig unterschiedlich. Ein guter Zauberer fragt das in der ersten Antwort. Wenn nicht, ist es ein Schlechter.",
      },
      {
        type: "heading",
        text: "Zwei: Referenzvideo statt Showreel",
        id: "referenzen",
      },
      {
        type: "paragraph",
        text:
          "Showreels sind perfekte Schnitte aus dem besten halben Sekunden. Frag nach einem ungeschnittenen Sechs-Minuten-Set von einem echten Event. Wer keins liefert, hat keins. Punkt.",
      },
      {
        type: "heading",
        text: "Drei: Tech-Rider und Aufbauzeit klären",
        id: "tech",
      },
      {
        type: "list",
        items: [
          "Wie viele Quadratmeter Bühnenfläche werden benötigt?",
          "Wie viele Stromanschlüsse?",
          "Wie viel Vorlaufzeit für Aufbau und Soundcheck?",
          "Welcher Soundkanal, welches Mikrofon?",
          "Gibt es schriftlich einen Tech-Rider — oder nur Mündliches?",
        ],
      },
      {
        type: "paragraph",
        text:
          "Ein Zauberer, der dir keinen schriftlichen Tech-Rider liefern kann, hat noch nie an einem größeren Event mitgewirkt. Bei kleinen Tisch-Sets ist das egal. Bei Bühne nicht.",
      },
      {
        type: "heading",
        text: "Vier: Vertraglich fixiertes Programm",
        id: "vertrag",
      },
      {
        type: "paragraph",
        text:
          "Ein Auftrittsvertrag mit Datum, Ort, Show-Länge, Programm-Slot, Honorar, Anreise, Stornoklausel. Mündliche Vereinbarungen funktionieren bei guten Künstlern auch — aber sie sind keine Versicherung. Schriftlich ist Pflicht.",
      },
      {
        type: "heading",
        text: "Fünf: Ein Vorgespräch vor Vertragsabschluss",
        id: "vorgespraech",
      },
      {
        type: "paragraph",
        text:
          "Zwanzig Minuten Telefonat. Du erfährst, wie der Mensch tickt. Er erfährt, ob der Anlass zu ihm passt. Niemand sollte nach E-Mail-Kontakt buchen. Es ist eine Show, die vor deinen Gästen stattfindet. Du willst wissen, wer da steht.",
      },
      {
        type: "callout",
        eyebrow: "Warnsignal.",
        text:
          "Wer dir innerhalb 30 Sekunden ein Pauschalangebot schickt, ohne nach Anlass, Gästezahl oder Location gefragt zu haben, ist kein Künstler — er ist ein Buchungsbot.",
      },
      {
        type: "quote",
        text:
          "Wir hatten einen anderen Zauberer kurz vor der Hochzeit. Er hat zwei Tage vorher abgesagt. Emilian hat eingesprungen — und es war besser als geplant.",
        attribution: "Hochzeitsplanerin Katrin Raß",
      },
      {
        type: "paragraph",
        text:
          "Wer diese fünf Punkte sauber durchgeht, bucht zu 95 Prozent richtig. Die restlichen fünf Prozent sind Pech mit dem Wetter. Damit musst du leben.",
      },
    ],
  },
  {
    slug: "hinter-den-kulissen-buehnenshow",
    title: "Hinter den Kulissen einer Bühnenshow",
    titleAccent: "Wie eine Show entsteht.",
    excerpt:
      "Was zwischen Soundcheck und Standing Ovation passiert — und warum die zwanzig Minuten vor der Show wichtiger sind als die ganze Vorbereitung der Woche davor.",
    category: "Hinter den Kulissen",
    tags: [
      "Bühnenshow",
      "Behind the Scenes",
      "Show-Aufbau",
      "Theater",
      "Tour 2026",
    ],
    date: "2026-04-15",
    readTime: "6 Min.",
    words: 470,
    author: EMILIAN,
    cover: "stage",
    featured: false,
    sections: [
      {
        type: "paragraph",
        text:
          "Eine Bühnenshow beginnt nicht, wenn das Licht ausgeht. Sie beginnt sechs Stunden vorher, wenn ich die Bühne zum ersten Mal betrete und prüfe, wo das Publikum sitzen wird, wie das Licht fällt, wo die toten Winkel sind.",
      },
      {
        type: "paragraph",
        text:
          "Die meiste Magie in einer Show passiert in dieser stillen Phase. Niemand sieht sie. Aber ohne sie funktioniert keine einzige Pointe.",
      },
      {
        type: "heading",
        text: "Aufbau: Drei Stunden, die niemand sieht",
        id: "aufbau",
      },
      {
        type: "paragraph",
        text:
          "Koffer rein. Requisiten checken. Tisch ausrichten. Stroboskop testen. Mikrofon einsprechen. Soundcheck mit Tontechniker. Lichtcues durchgehen mit dem Lichtmischer. Wasser an die richtige Stelle. Mikrofonpad an die richtige Stelle. Stuhl an die richtige Stelle. Wenn ein einziges dieser Elemente fehlt, hat die Show eine Stolperstelle.",
      },
      {
        type: "heading",
        text: "Garderobe: Die letzten zwanzig Minuten",
        id: "garderobe",
      },
      {
        type: "paragraph",
        text:
          "Hier passiert das, was kein Zuschauer je sieht. Atmen. Visualisieren. Den ersten Satz dreimal still durchgehen. Den Punkt finden, an dem ich heute Abend stehen werde. Die zwanzig Minuten entscheiden, ob ich auf der Bühne präsent bin oder nervös. Ohne sie geht nichts.",
      },
      {
        type: "quote",
        text:
          "Zwanzig Minuten Stille vor der Show sind mehr wert als zwei Stunden Probe.",
      },
      {
        type: "heading",
        text: "Dramaturgie: Die Spannungskurve",
        id: "dramaturgie",
      },
      {
        type: "paragraph",
        text:
          "Jede gute Show hat eine Kurve. Erster Effekt: schnell, einfach, zum Aufwärmen. Zweiter Effekt: humorvoll, baut Verbindung zum Publikum. Mitte: ein längerer Effekt, der Konzentration verlangt. Ende: das Stück, an das alle sich erinnern werden. Wer die Kurve nicht plant, baut keine Show — er baut Trickfolgen.",
      },
      {
        type: "list",
        items: [
          "Minute 1 bis 3: Eisbrecher. Publikum lacht das erste Mal.",
          "Minute 4 bis 8: Aufbau. Vertrauen wird gebaut.",
          "Minute 9 bis 15: Mittelteil. Längster Effekt der Show.",
          "Minute 16 bis 20: Finale. Das Stück, das in Erinnerung bleibt.",
        ],
      },
      {
        type: "heading",
        text: "Nach der Show: Die unsichtbaren zwei Stunden",
        id: "nachher",
      },
      {
        type: "paragraph",
        text:
          "Standing Ovation. Vorhang. Publikum geht. Und dann zwei Stunden Abbau, Reflexion, Notizen. Was hat gut funktioniert? Wo war das Publikum still, obwohl ich Lachen erwartet hatte? Welche Pointe hat heute zum ersten Mal gezündet? Jede Show ist Material für die nächste.",
      },
      {
        type: "callout",
        eyebrow: "Die Wahrheit.",
        text:
          "Was auf der Bühne mühelos aussieht, ist das Ergebnis von tausend Stunden, in denen es alles andere als mühelos war.",
      },
      {
        type: "paragraph",
        text:
          "Wer eine Show kauft, kauft nicht zwanzig Minuten. Er kauft alle Stunden davor und alle Stunden danach. Genau das ist der Unterschied zwischen einem Hobbyzauberer und einem Bühnenprofi. Und genau deshalb sehe ich nie auf die Uhr, wenn ich aufbaue.",
      },
    ],
  },
  {
    slug: "was-ist-mentalmagie",
    title: "Was ist Mentalmagie?",
    titleAccent: "Wenn der Kopf das Publikum wird.",
    excerpt:
      "Karten verschwinden — Mentalmagie ist die Variante, bei der nicht mehr die Hände das Wunder erzeugen, sondern der Gedanke des Gegenübers. Wie das funktioniert und warum es länger im Gedächtnis bleibt.",
    category: "Hintergrund",
    tags: [
      "Mentalmagie",
      "Mentalist",
      "Comedy-Magie",
      "Show-Format",
      "Bühnenpsychologie",
    ],
    date: "2026-03-22",
    readTime: "5 Min.",
    words: 410,
    author: EMILIAN,
    cover: "haende",
    featured: false,
    sections: [
      {
        type: "paragraph",
        text:
          "Wenn ich Leute frage, was Mentalmagie ist, kommt fast immer die gleiche Antwort. [So ein Gedankenleser-Ding.] — und das stimmt halb. Mentalmagie ist die Variante der Zauberkunst, bei der das Wunder nicht in den Händen des Künstlers passiert, sondern im Kopf des Zuschauers.",
      },
      {
        type: "paragraph",
        text:
          "Genau diese Verlagerung ist der Grund, warum Mentaleffekte länger in Erinnerung bleiben als jede Kartenroutine.",
      },
      {
        type: "heading",
        text: "Was Mentalmagie unterscheidet",
        id: "unterschied",
      },
      {
        type: "paragraph",
        text:
          "Klassische Magie zeigt eine sichtbare Veränderung. Karte wird zur anderen Karte. Münze verschwindet. Tuch wird zum Vogel. Mentalmagie zeigt nichts. Sie behauptet etwas — und beweist die Behauptung.",
      },
      {
        type: "paragraph",
        text:
          "Beispiel: Ich nenne ein Wort, bevor du dich für eines entscheidest. Du schreibst dein Wort auf. Es ist dasselbe. Es gibt keine sichtbare Bewegung, keinen Trick, den man hätte sehen können. Genau das macht es unheimlicher als jeden Kartenkunststück.",
      },
      {
        type: "quote",
        text:
          "Wir haben den Trick zwei Stunden lang nachgesprochen. Wir konnten ihn nicht erklären.",
        attribution: "Gast nach Show in Regensburg 2024",
      },
      {
        type: "heading",
        text: "Warum es gerade auf Bühnen so gut funktioniert",
        id: "buehne",
      },
      {
        type: "paragraph",
        text:
          "Auf einer großen Bühne sind kleine Effekte verloren. Eine Münzenroutine in Reihe zwanzig — niemand sieht sie. Aber ein Mentaleffekt, bei dem ein Zuschauer auf die Bühne kommt und sich einen Gedanken vorhersagen lässt — das funktioniert für tausend Menschen gleichzeitig.",
      },
      {
        type: "paragraph",
        text:
          "Genau deshalb ist Mentalmagie in jeder Bühnenshow ein Pflichtbaustein. Die Comedy-Elemente liefern das Lachen. Die Mentaleffekte liefern das Schweigen. Beides braucht es.",
      },
      {
        type: "heading",
        text: "Die Drei-Effekt-Regel",
        id: "regel",
      },
      {
        type: "list",
        items: [
          "Ein Mentaleffekt mit einem Zuschauer auf der Bühne.",
          "Ein Mentaleffekt mit dem gesamten Publikum gleichzeitig.",
          "Ein Mentaleffekt als Finale, das man niemals vergisst.",
        ],
      },
      {
        type: "callout",
        eyebrow: "Achtung.",
        text:
          "Mentalmagie ohne Comedy wird schnell unheimlich. Mentalmagie mit Comedy bleibt verblüffend, aber bleibt menschlich. Die Mischung ist alles.",
      },
      {
        type: "paragraph",
        text:
          "Wer einmal ein gutes Mentalprogramm erlebt hat, redet darüber noch Wochen später. Genau das ist der Effekt, den Bühnenshows brauchen. Lachen ist kurzlebig. Staunen bleibt.",
      },
    ],
  },
  {
    slug: "comedy-zauberei-wo-witz-reinkommt",
    title: "Comedy-Zauberei — wo der Witz reinkommt",
    titleAccent: "Timing über Tricks.",
    excerpt:
      "Eine Pointe trifft anders als ein Trick. Wo der Humor in einer Zauberroutine wirklich entsteht — und warum die meisten Zauberer es genau hier versemmeln.",
    category: "Hintergrund",
    tags: [
      "Comedy-Zauberei",
      "Stand-Up",
      "Bühnenhumor",
      "Showpsychologie",
      "Comedy Magic",
    ],
    date: "2026-02-26",
    readTime: "5 Min.",
    words: 420,
    author: EMILIAN,
    cover: "audience",
    featured: false,
    sections: [
      {
        type: "paragraph",
        text:
          "Comedy-Zauberei klingt nach einem Genre. Es ist ein Handwerk. Und es ist das härteste Handwerk in der Zauberkunst — härter als jede Fingerfertigkeit, härter als jedes Mentalprogramm. Wer auf der Bühne gleichzeitig zaubern und Lacher erzeugen will, kämpft an zwei Fronten.",
      },
      {
        type: "heading",
        text: "Wo der Witz wirklich entsteht",
        id: "witz",
      },
      {
        type: "paragraph",
        text:
          "Nicht im Trick. Nicht in der Pointe. Sondern in der Reaktion auf etwas Unerwartetes. Wenn ein Zuschauer auf die Bühne kommt, etwas Eigenes mitbringt — eine Aussage, ein Lachen, einen Versprecher — und ich darauf reagiere, entsteht der echte Lacher. Geprobtes Material ist nur das Fundament.",
      },
      {
        type: "quote",
        text:
          "Der größte Lacher des Abends entsteht nie aus dem geschriebenen Text. Er entsteht aus der Pause danach.",
      },
      {
        type: "heading",
        text: "Drei Arten von Humor im Show-Set",
        id: "arten",
      },
      {
        type: "paragraph",
        text:
          "Erstens: Status-Comedy. Der Zauberer macht sich selbst zum Idioten, das Publikum darf schlauer sein. Funktioniert immer. Zweitens: Beobachtungs-Comedy. Der Zauberer kommentiert, was im Raum passiert. Funktioniert nur bei wachem Publikum. Drittens: Wortwitz-Comedy. Sprachlich, schnell, intelligent. Funktioniert in München. In Hamburg manchmal nicht.",
      },
      {
        type: "list",
        items: [
          "Status: macht sich selbst klein, hebt das Publikum.",
          "Beobachtung: lebt von der Situation im Raum.",
          "Wortwitz: braucht eine bestimmte Sprachlust im Saal.",
        ],
      },
      {
        type: "heading",
        text: "Warum Comedy-Magie schief geht",
        id: "schiefgehen",
      },
      {
        type: "paragraph",
        text:
          "Der häufigste Fehler: Der Zauberer hält den Witz für eine Verzierung des Tricks. Falsch. Der Witz ist die eigentliche Verbindung zum Publikum. Der Trick ist der Beweis, dass die Verbindung funktioniert. Wer diese Reihenfolge umdreht, hat einen technisch sauberen Auftritt — und ein gelangweiltes Publikum.",
      },
      {
        type: "paragraph",
        text:
          "Der zweithäufigste Fehler: zu viele Pointen pro Minute. Wer alle vier Sekunden einen Lacher erzwingen will, bekommt Geschmunzel statt Gelächter. Gute Comedy-Magie hat Atempausen. Sie lässt Lacher ausklingen, bevor der nächste Effekt startet.",
      },
      {
        type: "callout",
        eyebrow: "Profi-Regel.",
        text:
          "Wenn dein Publikum nach dem Lacher noch atmet, war der Witz zu klein. Wenn dein Publikum nach dem Lacher Tränen wischt, war er richtig dosiert.",
      },
      {
        type: "paragraph",
        text:
          "Comedy-Zauberei ist die einzige Variante der Magie, die nicht im Trick steckt. Sie steckt in den fünf Sekunden, in denen das Publikum entscheidet, ob es dem Künstler glaubt — oder ihn nur höflich anschaut. Genau diese fünf Sekunden sind das ganze Handwerk.",
      },
    ],
  },
  {
    slug: "drei-sekunden-stille",
    title: "Drei Sekunden Stille",
    titleAccent: "die Anatomie eines Magie-Moments.",
    excerpt:
      "Warum die Drei-Sekunden-Stille nach einem Effekt das eigentliche Produkt ist — und nicht der Trick davor. Eine Studie über das, was zwischen Wow und Applaus passiert.",
    category: "Hintergrund",
    tags: [
      "Mentalmagie",
      "Dramaturgie",
      "Behind the Scenes",
      "Magie-Theorie",
      "Reaktion",
    ],
    date: "2026-03-14",
    readTime: "5 Min.",
    words: 420,
    author: EMILIAN,
    cover: "staunen",
    featured: false,
    sections: [
      {
        type: "paragraph",
        text:
          "Jeder gute Effekt hat einen Moment, der nicht auf der Bühne stattfindet, sondern im Kopf des Zuschauers. Drei Sekunden lang. Manchmal vier. In dieser Zeit wird aus einem Trick eine Erinnerung.",
      },
      {
        type: "paragraph",
        text:
          "Ich nenne das die Drei-Sekunden-Stille. Es ist die Zeit zwischen der Auflösung und dem Applaus. Wenn ich diese Sekunden treffe, war der Abend gut. Wenn nicht, war alles davor egal.",
      },
      {
        type: "heading",
        text: "Was in der Stille passiert",
        id: "stille",
      },
      {
        type: "paragraph",
        text:
          "Sekunde eins: Wahrnehmung. Der Zuschauer sieht das Ergebnis und versucht, es mit dem, was er gerade gesehen hat, in Einklang zu bringen. Sekunde zwei: Widerstand. Das Gehirn sucht eine Erklärung und findet keine. Sekunde drei: Akzeptanz. Der Zuschauer gibt das Erklären auf und erlebt den Effekt als das, was er ist — ein Wunder.",
      },
      {
        type: "paragraph",
        text:
          "Erst danach kommt der Applaus. Vorher wäre er Höflichkeit. Nachher ist er Erleichterung.",
      },
      {
        type: "quote",
        text:
          "Wir haben drei Sekunden lang vergessen, was logisch ist. Das war das Schönste am Abend.",
        attribution: "Gast nach einem Magic-Dinner-Abend, Sinzing 2025",
      },
      {
        type: "heading",
        text: "Wie man die Stille hält",
        id: "halten",
      },
      {
        type: "list",
        items: [
          "Nicht reden, nicht atmen, nicht zur Auflösung zurückspringen.",
          "Den Effekt unterbrechen, bevor jemand klatschen kann — aushalten.",
          "Augenkontakt halten, aber nicht herausfordernd.",
          "Erst loslassen, wenn der erste tiefe Atemzug aus dem Publikum kommt.",
        ],
      },
      {
        type: "callout",
        eyebrow: "Werkstatt.",
        text:
          "Drei Sekunden Stille kosten mehr Arbeit als die zehn Minuten Aufbau davor. Sie sind der eigentliche Effekt — der Rest ist nur das, was zur Stille hinführt.",
      },
      {
        type: "paragraph",
        text:
          "Wer den Beruf gut machen will, lernt nicht mehr Tricks. Er lernt die Pausen. Das gilt für die Bühne, fürs Close-Up am Tisch, fürs Restaurant. Drei Sekunden sind ein langes Stück Zeit — wenn man sie ernst nimmt.",
      },
    ],
  },
  {
    slug: "wenn-ein-trick-schief-geht",
    title: "Wenn ein Trick schief geht",
    titleAccent: "was dann wirklich passiert.",
    excerpt:
      "Karten landen falsch, Münzen rollen weg, Vorhersagen sind die falsche Farbe. Was passiert, wenn ein Effekt nicht funktioniert — und warum es passieren darf.",
    category: "Hinter den Kulissen",
    tags: [
      "Behind the Scenes",
      "Fehler",
      "Improvisation",
      "Live-Show",
      "Werkstatt",
    ],
    date: "2026-04-02",
    readTime: "5 Min.",
    words: 440,
    author: EMILIAN,
    cover: "staunen",
    featured: false,
    sections: [
      {
        type: "paragraph",
        text:
          "Bei einer Hochzeit in Tegernsee, irgendwo im Sommer, ist mir eine Karte aus der Hand gefallen. Drei Sekunden bevor sie hätte erscheinen müssen — am Tisch eines Brautelternpaars, fünf Augenpaare auf meiner Hand. Sie lag jetzt zwischen Salatschüssel und Weinflasche, sichtbar für alle.",
      },
      {
        type: "paragraph",
        text:
          "Was tut man da? Ehrlich: man hebt sie auf, lacht selbst, und macht weiter. Nicht so tun, als wäre nichts passiert. Nicht aufgeben. Nicht entschuldigen, als wäre es eine Katastrophe. Es war eine Karte. Sie ist runtergefallen. Mehr nicht.",
      },
      {
        type: "heading",
        text: "Warum Fehler erlaubt sein müssen",
        id: "fehler",
      },
      {
        type: "paragraph",
        text:
          "Eine Magie-Performance, die vorgibt fehlerfrei zu sein, ist langweilig. Sie spielt eine Show, die so nicht stattfindet. Das Publikum spürt das. Wer am Tisch sitzt, will keinen Roboter mit perfekter Choreografie — sondern jemanden, dem etwas passieren kann, der damit umgeht, und der trotzdem weiter zaubert.",
      },
      {
        type: "paragraph",
        text:
          "Jeder gute Magier hat einen Satz, mit dem er einen Fehler in ein Programm rettet. Bei mir ist es meistens [Genau das wollte ich nicht — und genau deshalb passt es jetzt]. Es funktioniert, weil es ehrlich ist.",
      },
      {
        type: "quote",
        text:
          "Du bist der Erste, bei dem ich vergessen habe, dass das überhaupt ein Trick war — auch als die Karte fiel.",
        attribution: "Brautmutter, Tegernsee 2025",
      },
      {
        type: "heading",
        text: "Was hilft, wenn es passiert",
        id: "umgang",
      },
      {
        type: "list",
        items: [
          "Atmen. Eine Sekunde tiefer Atemzug ist Notfall-Recovery.",
          "Den Fehler benennen, nicht verstecken — Authentizität schlägt Perfektion.",
          "Eine zweite Routine im Kopf haben — als Notausgang. Ich habe pro Set immer drei Backups dabei.",
          "Nicht weiter mit dem geplanten Stück — sondern den Reset bewusst machen.",
          "Hinterher analysieren, warum es passiert ist. Aber nicht im Moment.",
        ],
      },
      {
        type: "callout",
        eyebrow: "Lehre.",
        text:
          "Routinen sind Hardware. Improvisation ist das Betriebssystem. Wer nur die Hardware probt, ist hilflos sobald sie kippt. Das echte Üben ist das, was man tut wenn alles schief geht.",
      },
      {
        type: "paragraph",
        text:
          "Die Karte ist seit jenem Sommer in einer Notizbuch-Tasche bei mir. Sie ist Erinnerung — daran, dass Magie nicht aus Perfektion entsteht, sondern aus dem, was zwischen den geplanten Momenten passiert.",
      },
    ],
  },
  {
    slug: "magic-dinner-sommer-terrasse",
    title: "Magic Dinner im Sommer",
    titleAccent: "was die Terrasse anders macht.",
    excerpt:
      "Ein Sommer-Magic-Dinner ist nicht dasselbe wie der Winter-Abend. Anderes Licht, anderer Service-Rhythmus, andere Stimmung. Wie sich die Performance an die Jahreszeit anpasst.",
    category: "Magic Dinner",
    tags: [
      "Magic Dinner",
      "Sommer",
      "Wald & Wiese",
      "Terrasse",
      "Atmosphäre",
    ],
    date: "2026-05-08",
    readTime: "4 Min.",
    words: 360,
    author: EMILIAN,
    cover: "magicdinner-buehne",
    featured: false,
    sections: [
      {
        type: "paragraph",
        text:
          "Im Winter ist ein Magic Dinner ein gedämpfter Abend. Kerzenschein, schwerer Wein, die Gäste in dunklen Pullovern, langsame Bewegungen. Im Sommer wird daraus ein anderer Abend — der Service läuft länger, der Lichtwechsel ist sichtbar, der Wind streift durchs Glas.",
      },
      {
        type: "heading",
        text: "Was sich am Abend verändert",
        id: "veraenderungen",
      },
      {
        type: "paragraph",
        text:
          "Sommer-Gäste essen langsamer. Sie haben Zeit. Es gibt zwischen Vorspeise und Hauptgang oft eine kleine Pause, in der jemand auf die Terrasse geht. Für die Magie heißt das: weniger Effekte am Tisch in kürzerer Zeit, mehr Routinen die mit dem Tempo des Abends mitgehen.",
      },
      {
        type: "paragraph",
        text:
          "Das Licht spielt mit. Bis 21:30 Uhr ist es im Juli draußen noch hell — ein anderes Setting als das Kerzen-Innenlicht im November. Man sieht mehr Finger, mehr Bewegung, mehr Detail. Ich passe das Repertoire darauf an: weniger Karten-Sequenzen die auf Schatten setzen, mehr Münzen, mehr Mentaleffekte mit blossen Händen.",
      },
      {
        type: "quote",
        text:
          "Die Magie wirkt anders bei Sonnenuntergang. Ehrlicher irgendwie. Weniger Tricks, mehr Augen.",
        attribution: "Tisch-Notiz nach einem Sommer-Dinner, Sinzing 2025",
      },
      {
        type: "heading",
        text: "Was bleibt gleich",
        id: "konstanten",
      },
      {
        type: "list",
        items: [
          "Der Drei-Sekunden-Moment nach jedem Effekt — Sommer oder Winter.",
          "Die Tafel als zentrale Bühne — auch wenn sie auf der Terrasse steht.",
          "Das Restaurant entscheidet den Service, ich passe mich an — nicht umgekehrt.",
          "Keine festen Programm-Zeiten — der Abend folgt dem Essen.",
        ],
      },
      {
        type: "callout",
        eyebrow: "Praktisch.",
        text:
          "Reservierung lieber früher als später — Sommer-Termine im Wald & Wiese sind 6–8 Wochen vorher meist weg. Wer die Summer Edition verpasst, kann sich für den Newsletter eintragen, dann bekommt er die nächsten Termine vorab.",
      },
    ],
  },
  {
    slug: "karten-in-haenden-der-braut",
    title: "Karten in den Händen der Braut",
    titleAccent: "Hochzeitszauber-Notizen.",
    excerpt:
      "Sektempfang, Tisch-zu-Tisch, Brautstrauß-Routine — kleine Notizen aus dem Hochzeits-Jahr 2025. Was Brautpaare hinterher wirklich erinnern, jenseits der großen Show-Momente.",
    category: "Hochzeit",
    tags: [
      "Hochzeit",
      "Sektempfang",
      "Close-Up",
      "Braut",
      "Notizen",
    ],
    date: "2026-04-18",
    readTime: "4 Min.",
    words: 360,
    author: EMILIAN,
    cover: "wedding-magic",
    featured: false,
    sections: [
      {
        type: "paragraph",
        text:
          "Bei jeder Hochzeit gibt es einen Moment, in dem die Braut zum ersten Mal seit der Trauung die Hände frei hat. Nicht für Champagner, nicht für ein Gruppenfoto — sondern für eine Karte, die sie selbst wählen darf. Und dann tut sich etwas an ihrem Gesicht, was kein Fotograf je einfangen wird.",
      },
      {
        type: "heading",
        text: "Die kleinen Momente",
        id: "momente",
      },
      {
        type: "paragraph",
        text:
          "Hochzeiten sind voll mit großen Momenten — Ja-Wort, erster Tanz, Anschnitt der Torte. Aber das, was Gäste sich Monate später noch erzählen, sind oft die kleinen Sachen. Die Karte, die im Geldbeutel des Brautvaters auftaucht. Die Münze, die ein zehnjähriger Cousin findet. Die Vorhersage, die zwischen Vor- und Hauptgang verlesen wird.",
      },
      {
        type: "paragraph",
        text:
          "Genau deshalb ist Close-Up bei Hochzeiten so stark. Es ist nicht das Spektakel — es ist die Nähe. Wer dreißig Zentimeter vom Effekt entfernt steht, hat ein anderes Erlebnis als die Reihe zehn beim Bühnen-Trick.",
      },
      {
        type: "quote",
        text:
          "Meine Tante redet immer noch von der Karte, die in ihrer Handtasche war. Sie sagt, sie hat seit Wochen nicht reingeschaut. Das war drei Monate vor der Hochzeit. Ich glaube ihr das.",
        attribution: "Braut, Hochzeit Tegernsee 2025",
      },
      {
        type: "heading",
        text: "Was funktioniert, was nicht",
        id: "praxis",
      },
      {
        type: "list",
        items: [
          "Funktioniert: kleine personalisierte Routinen für Trauzeugen oder Brautmutter — vorher abgesprochen.",
          "Funktioniert: ein Stück nach dem Sektempfang als Eisbrecher zwischen verfeindeten Familienzweigen.",
          "Funktioniert nicht: lange Bühnenstücke vor dem Essen — die Gäste sind hungrig, nicht aufnahmebereit.",
          "Funktioniert nicht: Magie als Pflichtprogramm während der Reden — die Reden gehören den Gästen.",
        ],
      },
      {
        type: "callout",
        eyebrow: "Tipp.",
        text:
          "Wer auf der Hochzeit eine Routine speziell für jemanden möchte (Brautvater, Trauzeuge, Brautmutter), schreibt mir vorab kurz zur Person — ich baue eine kleine Karte ein, die diese Person bekommt. Das wird oft als das Beste vom Abend erinnert.",
      },
    ],
  },
  {
    slug: "werkstatt-jahr-2025-lektionen",
    title: "Werkstattjahr 2025",
    titleAccent: "Lektionen aus 80+ Auftritten.",
    excerpt:
      "Was ein Jahr mit über 80 Auftritten — Hochzeiten, Firmen, Magic Dinners, Privatfeiern — für die Performance bedeutet. Sieben Notizen aus dem Werkstattjahr.",
    category: "Hinter den Kulissen",
    tags: [
      "Werkstatt",
      "Behind the Scenes",
      "Lernen",
      "Jahresrückblick",
      "Auftritt",
    ],
    date: "2026-01-15",
    readTime: "6 Min.",
    words: 540,
    author: EMILIAN,
    cover: "portrait-karten",
    featured: false,
    sections: [
      {
        type: "paragraph",
        text:
          "2025 war kein Lehrjahr — es war ein Werkstattjahr. Achtzig-plus Auftritte, davon dreißig Hochzeiten, zwanzig Firmenfeiern, ein Dutzend Magic-Dinner-Abende im Wald & Wiese, der Rest Privatfeiern und Galas. Sieben Notizen aus dem Jahr.",
      },
      {
        type: "heading",
        text: "01 · Routinen altern",
        id: "altern",
      },
      {
        type: "paragraph",
        text:
          "Ein Stück, das ich seit drei Jahren mache, wirkt nicht mehr wie vor drei Jahren. Nicht weil der Effekt schwächer wird — sondern weil ich ihn anders erzähle. Routinen brauchen Pflege, sonst werden sie zu Bewegung ohne Bedeutung.",
      },
      {
        type: "heading",
        text: "02 · Publikum ist verschieden",
        id: "publikum",
      },
      {
        type: "paragraph",
        text:
          "Ein Vorstandsdinner ist nicht eine Brautmutter-Tafel. Das Tempo, der Humor, die Reaktionszeiten sind andere. Wer das gleiche Set überall spielt, gewinnt nirgends ganz.",
      },
      {
        type: "heading",
        text: "03 · Stille zählt mehr als Tricks",
        id: "stille",
      },
      {
        type: "paragraph",
        text:
          "Drei Sekunden Stille nach einem Effekt sind mehr wert als zehn Minuten Setup davor. Wer die Stille nicht halten kann, hat keinen Effekt — nur eine Aufführung.",
      },
      {
        type: "heading",
        text: "04 · Service ist Programm",
        id: "service",
      },
      {
        type: "paragraph",
        text:
          "Bei Magic Dinners habe ich gelernt, dass der Service-Rhythmus den Magie-Rhythmus diktiert. Wer das Restaurant nicht ernst nimmt, stört. Wer es ernst nimmt, wird Teil des Abends.",
      },
      {
        type: "heading",
        text: "05 · Backups sind Pflicht",
        id: "backups",
      },
      {
        type: "paragraph",
        text:
          "Pro Set drei Backups. Pro Routine eine zweite Auflösung. Pro Abend ein Notausgang. Klingt paranoid — ist Profession.",
      },
      {
        type: "quote",
        text:
          "Routinen sind Hardware. Improvisation ist das Betriebssystem. Beide muss man üben.",
        attribution: "Notizbuch-Eintrag, Sommer 2025",
      },
      {
        type: "heading",
        text: "06 · Vorbereitung schlägt Talent",
        id: "vorbereitung",
      },
      {
        type: "paragraph",
        text:
          "Die besten Abende waren die, bei denen ich mit dem Veranstalter vorher zwei Stunden geredet hatte. Briefing, Räume, Gäste, Erwartungen. Die schlechten Abende waren immer die ohne Briefing.",
      },
      {
        type: "heading",
        text: "07 · Der Künstler hinter der Bühne",
        id: "person",
      },
      {
        type: "paragraph",
        text:
          "Wer als Person nicht da ist, kann auch nicht als Künstler da sein. Schlaf, gutes Essen vor dem Auftritt, kein Telefon in der Stunde davor. Die Bühne fordert den Menschen, nicht nur die Hände.",
      },
      {
        type: "callout",
        eyebrow: "2026.",
        text:
          "Das nächste Jahr wird ruhiger geplant: weniger Auftritte, längere Briefings, mehr Werkstattzeit zwischen den Auftritten. Qualität statt Quantität — und das Magic Dinner als Kern, um das die anderen Formate kreisen.",
      },
    ],
  },
  {
    slug: "tva-interview-erstes-tv",
    title: "Erstes TV-Interview mit 16",
    titleAccent: "TVA, ein Aufnahmestudio in Regensburg.",
    excerpt:
      "Zwei Kameras, ein Moderator, fünfzehn Minuten Sendezeit. Wie sich das erste TV-Interview als Sechzehnjähriger anfühlt — und was ich daraus für jede Bühne gelernt habe.",
    category: "Hinter den Kulissen",
    tags: [
      "TVA",
      "TV-Auftritt",
      "Interview",
      "Behind the Scenes",
      "Medien",
    ],
    date: "2025-02-13",
    readTime: "4 Min.",
    words: 360,
    author: EMILIAN,
    cover: "portrait-karten",
    featured: false,
    sections: [
      {
        type: "paragraph",
        text:
          "Ich bin sechzehn. Geboren 2008. Drei Tage vorher kam die Anfrage vom TVA-Regionalsender: ob ich für ein Interview Zeit hätte, Donnerstagnachmittag, Aufnahmestudio in Regensburg. Antwort: ja, natürlich.",
      },
      {
        type: "paragraph",
        text:
          "Was ich nicht wusste: dass dieser Donnerstagnachmittag der Tag war, an dem mir zum ersten Mal klar wurde, dass eine Kamera ein anderes Tier ist als ein Saal voller Menschen.",
      },
      {
        type: "heading",
        text: "Was vor der Aufnahme passierte",
        id: "vorbereitung",
      },
      {
        type: "paragraph",
        text:
          "Studio-Setting: zwei Kameras, ein Sessel, Moderator gegenüber, ein kleiner Tisch zwischen uns für eine Live-Demonstration. Tonkontrolle. Lichteinstellung. Make-up, weil das Studio-Licht so kalt ist, dass man ohne aussieht wie ein Ferienlager-Foto.",
      },
      {
        type: "paragraph",
        text:
          "Zwei Minuten vor der Aufnahme war ich kurz nervös. Nicht wegen der Fragen — die hatten wir vorab abgesprochen. Sondern wegen der Stille zwischen Frage und Antwort. Im Saal kann man die Stille füllen mit Bewegung. Im Studio nicht. Da wird sie zur Sendezeit.",
      },
      {
        type: "heading",
        text: "Die fünfzehn Minuten",
        id: "interview",
      },
      {
        type: "paragraph",
        text:
          "Drei Themenblöcke: Werdegang, Talents-of-Magic, Pläne für 2025. Dazwischen eine Live-Routine — eine kleine Kartensequenz, die ich seit Jahren mache und die kameratauglich ist. Sie funktionierte. Der Moderator war ehrlich überrascht, die Kameraführung zoomte rechtzeitig — es lief.",
      },
      {
        type: "quote",
        text:
          "Im Saal gewinnst du das Publikum durch Energie. Im Studio gewinnst du es durch Ruhe.",
      },
      {
        type: "heading",
        text: "Was ich danach mitnahm",
        id: "lernen",
      },
      {
        type: "list",
        items: [
          "Eine Kamera braucht weniger Gestik als ein Saal — die Hälfte reicht.",
          "Pausen sind im Fernsehen länger erlaubt als gefühlt — drei Sekunden Stille sind sieben Sekunden Spannung.",
          "Vorher absprechen, was Live-Trick und was Gespräch ist — niemand will Improvisations-Magie vor zwei Kameras.",
          "Studio-Make-up gehört dazu, auch wenn es sich anfangs falsch anfühlt.",
        ],
      },
      {
        type: "callout",
        eyebrow: "Erkenntnis.",
        text:
          "Jede Bühne hat ihre eigene Lautstärke. Wer nicht hinhört, spielt zu groß oder zu klein. TV war meine erste Lektion in dieser Lautstärke-Frage.",
      },
      {
        type: "paragraph",
        text:
          "Das Interview lief im Spätprogramm. Meine Mutter hat es zweimal angesehen. Mein Vater hat es weitergeschickt. Und ich habe verstanden, dass das nicht der Höhepunkt war — sondern der Anfang einer anderen Art, mit Bühne umzugehen.",
      },
    ],
  },
  {
    slug: "was-kostet-hochzeitszauberer",
    title: "Was kostet ein Hochzeitszauberer?",
    titleAccent: "Ehrliche Preisspannen 2026.",
    excerpt:
      "Sektempfang, Dinner, Bühnen-Highlight — was darf ein professioneller Hochzeitszauberer kosten? Realistische Preisspannen und was den Preis bestimmt.",
    category: "Hochzeit",
    tags: ["Hochzeit", "Preise", "Buchung", "Honorar", "Wedding"],
    date: "2026-05-15",
    readTime: "5 Min.",
    words: 480,
    author: EMILIAN,
    cover: "wedding-magic",
    featured: false,
    sections: [
      {
        type: "paragraph",
        text:
          "Bei jedem ersten Gespräch zum Hochzeitszauber kommt die Frage zwischen \"Wie lange dauert das?\" und \"Welche Tricks machen Sie?\": Was kostet das? Hier die ehrliche Antwort — ohne Geheimnistuerei, mit echten Preisspannen.",
      },
      {
        type: "heading",
        text: "Was bestimmt den Preis?",
        id: "preis",
      },
      {
        type: "list",
        items: [
          "Slot-Anzahl: nur Sektempfang vs Empfang + Dinner + Bühne",
          "Dauer pro Slot: 30 Min Close-Up vs 90 Min Tisch-zu-Tisch",
          "Anfahrt: 30 km vs 300 km macht einen Unterschied im Honorar",
          "Übernachtung: nötig bei Auswärts-Hochzeiten am Abend",
          "Saison: Mai-September-Samstage sind 20-30% teurer als Werktage",
        ],
      },
      {
        type: "heading",
        text: "Realistische Preisspannen für Hochzeitszauber in Deutschland",
        id: "spannen",
      },
      {
        type: "list",
        items: [
          "60 Min Close-Up beim Sektempfang (lokal): 600-900 €",
          "Close-Up Sektempfang + Tisch-zu-Tisch (3-4 Stunden total): 1.200-1.800 €",
          "Voller Tag — Empfang + Dinner-Tisch + 20-Min-Bühnen-Highlight: 2.000-3.500 €",
          "Premium-Hochzeit mit personalisierter Bühnenshow + Anfahrt + Übernachtung: 3.500-6.000 €",
        ],
      },
      {
        type: "heading",
        text: "Was kommt zusätzlich?",
        id: "zusatz",
      },
      {
        type: "list",
        items: [
          "MwSt (19%) — bei gewerblichen Anbietern selbstverständlich",
          "Anfahrt: km-Pauschale oder Inklusiv bis X km",
          "Übernachtung: 3-4-Sterne, üblicherweise Veranstalter-Buchung",
          "Optional: Soundtechnik wenn Location keine hat (selten)",
        ],
      },
      {
        type: "quote",
        text:
          "Drei Zauberer angefragt — alle drei zwischen 1.800 und 2.500 €. Der teuerste war nicht automatisch der beste, der billigste hatte keine Versicherung. Mitte hat gewonnen.",
        attribution: "Brautmutter, Hochzeit Tegernsee 2025",
      },
      {
        type: "heading",
        text: "Warum gibt es keine Listenpreise auf den meisten Webseiten?",
        id: "warum",
      },
      {
        type: "paragraph",
        text:
          "Hochzeiten sind keine Standard-Pakete. Eine Sommerhochzeit am Tegernsee mit 200 Gästen ist nicht dieselbe Buchung wie ein Winter-Standesamt mit 30 Gästen in Augsburg. Seriöse Anbieter machen ein Angebot nach kurzem Briefing — das schützt euch vor Über- oder Unter-Bezahlung.",
      },
      {
        type: "callout",
        eyebrow: "Tipp.",
        text:
          "Frag drei Anbieter im selben Format an. Wenn einer deutlich billiger ist als die anderen zwei: nachfragen warum (Versicherung? Erfahrung? Vertrag?). Wenn einer deutlich teurer ist: nach Referenzen mit Telefonnummern fragen.",
      },
    ],
  },
  {
    slug: "magie-firmenfeier-roi",
    title: "Magie auf der Firmenfeier",
    titleAccent: "Was ein Magier konkret verändert.",
    excerpt:
      "Vorstandsdinner, Weihnachtsfeier, Sommerfest — was Magie als Programmpunkt konkret beim Publikum verändert. Drei Effekte aus 200+ Firmen-Events.",
    category: "Firmenfeiern",
    tags: ["Firmenfeier", "Entertainment", "ROI", "Event-Planung", "Corporate"],
    date: "2026-05-09",
    readTime: "5 Min.",
    words: 460,
    author: EMILIAN,
    cover: "magicdinner-buehne",
    featured: false,
    sections: [
      {
        type: "paragraph",
        text:
          "Firmenfeiern haben ein verstecktes Problem: alle wollen hingehen, niemand will gehen. Pflicht-Programm zwischen Reden, Buffet und der einen Tanzfläche, an der drei Personen tanzen. Magie als Programmpunkt verändert die Dynamik — hier ist was konkret passiert.",
      },
      {
        type: "heading",
        text: "01 — Eisbrecher zwischen Abteilungen",
        id: "eisbrecher",
      },
      {
        type: "paragraph",
        text:
          "Beim Empfang stehen Vertrieb und IT meist in zwei getrennten Gruppen — wie zwei Inseln. Der Magier geht zur ersten Gruppe, macht 5 Minuten Close-Up. Drei Minuten später ruft jemand die andere Gruppe rüber: \"Du musst das sehen!\". In zwölf Minuten ist aus zwei Gruppen eine.",
      },
      {
        type: "heading",
        text: "02 — Gesprächs-Stoff für die nächste Woche",
        id: "stoff",
      },
      {
        type: "paragraph",
        text:
          "Was Mitarbeiter Montag in der Kantine erzählen, definiert ob die Feier als \"gut\" oder \"so naja\" erinnert wird. Magie produziert Erzähl-Material: \"Du, der hat doch echt MEINE Karte erraten...\". Das wirkt 1-2 Wochen nach.",
      },
      {
        type: "heading",
        text: "03 — Standing Ovation für den Vorstand",
        id: "ovation",
      },
      {
        type: "paragraph",
        text:
          "Bühnen-Slot am Ende der Feier mit Mentaleffekt, in dem der Geschäftsführer eine Wahl trifft die der Magier vorhergesagt hat. Vorstand wird zum Mit-Akteur, das Publikum klatscht stehend. Das hat etwas mit Hierarchie zu tun: jemand vom oberen Management wird sympathisch vorgeführt — ohne lächerlich zu werden.",
      },
      {
        type: "quote",
        text:
          "Ich habe drei Jahre lang gedacht, die Feier müsste größer werden. War falsch. Sie musste anders werden. Magie war der Hebel.",
        attribution: "HR-Leiterin, 250-Personen-Konzern, Bayern 2025",
      },
      {
        type: "heading",
        text: "Wo Magie nicht funktioniert",
        id: "ausnahmen",
      },
      {
        type: "list",
        items: [
          "Strikt-formelle Awards-Galas ohne Comedy-Anteil — da passt Mentalmagie, kein Close-Up",
          "Reine Stehempfänge unter 30 Gäste — zu wenig Tafel-Material für 90 Min Close-Up",
          "Vollständige B2B-Konferenzen ohne sozialen Teil — Magie braucht Stimmung",
        ],
      },
      {
        type: "callout",
        eyebrow: "ROI-Realität.",
        text:
          "Magie kostet bei einer 100-Personen-Firmenfeier 1.500-3.000 € — also 15-30 € pro Gast. Erinnerungs-Effekt: 1-2 Wochen Gesprächs-Material und höhere Teilnahmebereitschaft im nächsten Jahr. Konservativ kalkuliert bei 5% mehr Teilnehmer ist es ROI-positiv.",
      },
    ],
  },
  {
    slug: "tisch-vs-buehne-was-besser",
    title: "Tisch oder Bühne",
    titleAccent: "Was wirklich besser ankommt.",
    excerpt:
      "Close-Up am Tisch vs. Bühnenshow für den ganzen Saal — was wirkt besser? Eine ehrliche Analyse aus 200+ Auftritten, ohne Verkaufs-Pitch.",
    category: "Hintergrund",
    tags: ["Close-Up", "Bühnenshow", "Entertainment", "Vergleich", "Format-Wahl"],
    date: "2026-04-25",
    readTime: "4 Min.",
    words: 400,
    author: EMILIAN,
    cover: "buehne-zuschauer",
    featured: false,
    sections: [
      {
        type: "paragraph",
        text:
          "Die häufigste Frage in Briefings: \"Was wirkt besser — Close-Up am Tisch oder Bühnenshow?\" Antwort wider Erwarten: kommt drauf an, was \"besser\" heißt. Hier eine ehrliche Analyse aus 200+ Auftritten.",
      },
      {
        type: "heading",
        text: "Close-Up wirkt persönlicher",
        id: "close-up",
      },
      {
        type: "paragraph",
        text:
          "30 Zentimeter zwischen Karte und Auge. Der Effekt passiert in deiner Hand. Du bist Augenzeuge, nicht Zuschauer. Was du erlebst, kannst du niemandem erklären — und genau das ist die Wirkung. Close-Up bleibt persönliche Erinnerung, nicht geteiltes Erlebnis.",
      },
      {
        type: "heading",
        text: "Bühne wirkt kollektiver",
        id: "buehne",
      },
      {
        type: "paragraph",
        text:
          "100 Augenpaare schauen denselben Effekt. Alle reagieren gleichzeitig. Die Standing Ovation ist kollektiv — die Erinnerung wird geteilt. Bühne produziert das Erlebnis \"Erinnerst du dich, wie wir alle...?\". Bei Hochzeiten und Firmenfeiern ist das oft das Gewünschte.",
      },
      {
        type: "heading",
        text: "Was wirkt stärker?",
        id: "staerker",
      },
      {
        type: "paragraph",
        text:
          "Stärker wirkt das, was zur Veranstaltung passt. Vorstandsdinner mit 12 Personen: Close-Up. Hochzeitsfeier mit 100 Gästen: beides, in unterschiedlichen Slots. Galaabend mit Award-Verleihung: Bühnen-Show als Übergang. Magic Dinner: nur Close-Up — die Bühne fehlt bewusst.",
      },
      {
        type: "quote",
        text:
          "Die beste Hochzeit hatte beides: Close-Up beim Sektempfang als Eisbrecher, Bühnenshow vor dem Tanz als emotionaler Höhepunkt. Beide Slots zusammen waren mehr als die Summe.",
        attribution: "Hochzeitsplanerin, Tegernsee 2024",
      },
      {
        type: "heading",
        text: "Wann beide kombinieren?",
        id: "kombinieren",
      },
      {
        type: "paragraph",
        text:
          "Ab ca. 60 Gästen und mindestens 4 Stunden Veranstaltungsdauer lohnt es sich. Close-Up beim Empfang als Aufwärmung, Bühne als Höhepunkt vor Dinner-Ende. Zwei Slots, ein Künstler, ein roter Faden.",
      },
      {
        type: "callout",
        eyebrow: "Faustregel.",
        text:
          "Unter 30 Gäste: Close-Up. Über 80 Gäste mit sitzendem Programm: Bühne. Zwischen 30 und 80 oder mit gemischtem Programm: beides kombinieren.",
      },
    ],
  },
];

export const FEATURED_SLUG = "zauberer-fuer-hochzeit-auswaehlen";

export const CATEGORIES = [
  "Alle",
  "Hochzeit",
  "Firmenfeiern",
  "Magic Dinner",
  "Buchung",
  "Hinter den Kulissen",
  "Hintergrund",
];

export const getRelatedPosts = (slug: string, limit = 3): BlogPost[] => {
  const current = blogPosts.find((p) => p.slug === slug);
  if (!current) return blogPosts.slice(0, limit);
  const sameCat = blogPosts.filter(
    (p) => p.slug !== slug && p.category === current.category,
  );
  const others = blogPosts.filter(
    (p) => p.slug !== slug && p.category !== current.category,
  );
  return [...sameCat, ...others].slice(0, limit);
};
