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
        eyebrow: "Roter Flag.",
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
    slug: "tour-2026-bayern-theater",
    title: "Tour 2026 — Bayerische Theater im Fokus",
    titleAccent: "Plötzlich Magie.",
    excerpt:
      "Plötzlich Magie — Magic Meets Comedy. Die erste abendfüllende Tour mit Premieren in Bayern. Wo gespielt wird, wie sich das Programm entwickelt und was hinter jedem Stop steckt.",
    category: "Tour",
    tags: [
      "Tour 2026",
      "Plötzlich Magie",
      "Bayern",
      "Theater",
      "Abendprogramm",
    ],
    date: "2026-01-30",
    readTime: "4 Min.",
    words: 360,
    author: EMILIAN,
    cover: "buehne-zuschauer",
    featured: false,
    sections: [
      {
        type: "paragraph",
        text:
          "Plötzlich Magie — Magic Meets Comedy. So heißt die Tour, die 2026 in Bayern startet. Es ist die erste abendfüllende Show unter meinem Namen, und es ist das Format, an dem ich die letzten zwei Jahre gearbeitet habe.",
      },
      {
        type: "heading",
        text: "Was das Programm anders macht",
        id: "anders",
      },
      {
        type: "paragraph",
        text:
          "Neunzig Minuten Show, eine Pause, ein roter Faden. Kein Variete-Format, in dem zehn unterschiedliche Effekte aneinandergereiht werden. Sondern ein erzählter Abend, in dem Comedy und Magie zusammengehören wie Vorspeise und Hauptgang.",
      },
      {
        type: "paragraph",
        text:
          "Die Comedy-Teile schreibe ich selbst. Die Magie-Teile entwickle ich seit Jahren. Beide werden hier zum ersten Mal als eine einzige Show gespielt.",
      },
      {
        type: "heading",
        text: "Stationen in Bayern",
        id: "stationen",
      },
      {
        type: "list",
        items: [
          "Regensburg — Premiere mit Heimspiel-Charakter.",
          "Straubing — Klassisches Stadttheater, intime Akustik.",
          "Landshut — Erste Show außerhalb der Heimatregion.",
          "München — Größtes Publikum, vollständig durchproduziert.",
          "Passau — Saisonschluss mit erweiterten Finalszenen.",
        ],
      },
      {
        type: "paragraph",
        text:
          "Jeder Stop ist ein eigener Lernmoment. Was in Regensburg zündet, kann in München zu klein sein. Was in Straubing funktioniert, muss in Passau überarbeitet werden. Genau diese Iteration ist der Wert einer Tour — sie macht die Show besser, Show für Show.",
      },
      {
        type: "quote",
        text:
          "Erste abendfüllende Show. Letztes Mal habe ich so gefühlt, als ich mit acht Jahren das erste Kartenstück lernte.",
        attribution: "Aus dem Tour-Notizbuch, Januar 2026",
      },
      {
        type: "callout",
        eyebrow: "Hintergrund.",
        text:
          "Die Tour-Idee entstand 2024 beim Talents-of-Magic-Finale in München. Aus einem Sieben-Minuten-Wettbewerbsstück wurde über zwei Jahre eine neunzig-Minuten-Show.",
      },
      {
        type: "paragraph",
        text:
          "Wer eine Show buchen will, statt eine Tour zu besuchen, kann das parallel machen. Privatauftritte und Firmen-Events laufen unter dem Jahr weiter. Die Tour ist das Schaufenster. Die privaten Auftritte sind die Werkstatt.",
      },
      {
        type: "paragraph",
        text:
          "Die Daten zu den einzelnen Tour-Stationen kommen sukzessive auf die Website. Für die Premiere in Regensburg ist die erste Reihe schon weg.",
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
  "Tour",
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
