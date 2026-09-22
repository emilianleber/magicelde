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
  /** Interne Weiterführungs-Links (gleiche Form wie relatedPages in wissenTopics.ts). */
  relatedPages?: { title: string; href: string }[];
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
          "Emilian hat das Publikum mit Witz und Charme gut unterhalten und konnte dabei die Gäste für sich gewinnen. Ein wirklich schöner Programmpunkt für eine Hochzeitsfeier.",
        attribution: "Daniela Pöllinger, Hochzeitsplanerin (Google-Rezension)",
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
          "Die Agenturgruppe Wächter aus München bedankt sich vielmals bei Emilian, der rund 200 geladene Gäste eines Bayerischen Versicherungsunternehmens mit einer eigens entwickelten Zaubertrickshow in einem inszenierten Magic Camp begeistert hat - es war einfach Mega!",
        attribution: "Jan von Lehmann, Agenturgruppe Wächter, München (Google-Rezension)",
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
          "vielen Dank für den gelungenen Abend bei unserem Magic Dinner im Wald & Wiese. Die Show war professionell, unterhaltsam und bei unseren Gästen durchweg sehr gut angekommen.",
        attribution: "Restaurant-Partner, Magic Dinner (ProvenExpert)",
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
          "Ich durfte eine Hochzeit planen, bei der Emilian als Zauberer aufgetreten ist – und es war wirklich großartig! Er hat sich auf unsere Idee eingelassen, den Bräutigam zu überraschen, und mit viel Charme und Witz mitgespielt.",
        attribution: "Katrin Raß, Hochzeitsplanerin (Google-Rezension)",
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
          "Besonders der Wikipedia-Trick war einfach unglaublich – so etwas haben wir noch nie gesehen!",
        attribution: "Claudi Roehrl, Magic Dinner (Google-Rezension)",
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
          "Wir hatten Vergnügen, Emilian bei einem Magic Dinner live zu erleben, und waren sehr beeindruckt.",
        attribution: "Claudi Roehrl (Google-Rezension)",
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
    cover: "dinner-buehne",
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
          "Reservierung lieber früher als später — Sommer-Termine im Wald & Wiese sind erfahrungsgemäß 6–8 Wochen vorher weg. Aktuell steht kein öffentlicher Abend an; neue Termine stehen zuerst auf der Ticketseite.",
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
          "Mit seinen beeindruckenden Kartentricks und anderen kleinen Zaubereien hat er die Gäste an den Tischen immer wieder überrascht und begeistert.",
        attribution: "Christian Schürmann, 20er-Jahre-Party auf der Donau (Google-Rezension)",
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
          "Bei jedem ersten Gespräch zum Hochzeitszauber kommt die Frage zwischen \"Wie lange dauert das?\" und \"Welche Tricks machen Sie?\": Was kostet das? Hier die ehrliche Antwort — ohne Geheimnistürei, mit echten Preisspannen.",
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
          "Anfahrt: im Angebot transparent ausgewiesen",
          "Übernachtung: 3-4-Sterne, üblicherweise Veranstalter-Buchung",
          "Optional: Soundtechnik wenn Location keine hat (selten)",
        ],
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
    cover: "dinner-buehne",
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
  {
    slug: "weihnachtsfeier-ideen-firma",
    title: "Weihnachtsfeier-Ideen für Firmen",
    titleAccent: "Was in Bayern wirklich trägt.",
    excerpt:
      "Weihnachtsfeier-Ideen für die Firma: sieben Formate von Team-Essen bis Gala, wo Unterhaltung passt und wann ihr in Regensburg und Bayern planen solltet.",
    category: "Firmenfeiern",
    tags: [
      "Weihnachtsfeier",
      "Weihnachtsfeier Ideen",
      "Firmenfeier",
      "Regensburg",
      "Event-Planung",
    ],
    date: "2026-09-22",
    readTime: "6 Min.",
    words: 598,
    author: EMILIAN,
    cover: "firmenfeier",
    featured: false,
    sections: [
      {
        type: "paragraph",
        text:
          "Ab September beginnt bei vielen Teams dieselbe Suche: Weihnachtsfeier-Ideen für die Firma, die nicht nach [Pflichttermin mit Buffet] aussehen. Ich zaubere seit 2016 auf Firmenfeiern — über 100 Firmen-Events waren es bisher, vom Team-Abend bis zur Gala. Hier ist, was ich dabei über gute Weihnachtsfeiern gelernt habe.",
      },
      {
        type: "paragraph",
        text:
          "Vorweg: Die beste Idee ist selten die ausgefallenste. Es ist die, die zu eurem Team passt — zur Größe, zur Stimmung und zu dem, was das Jahr für euch war.",
      },
      {
        type: "heading",
        text: "Weihnachtsfeier-Ideen für die Firma: sieben Formate",
        id: "ideen",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Das klassische Weihnachtsessen im Restaurant. Funktioniert für fast jede Teamgröße und ist schnell organisiert. Die Schwachstelle: die Wartezeit zwischen den Gängen, in der jeder Tisch für sich bleibt.",
          "Weihnachtsmarkt und Abendessen. In Regensburg und vielen bayerischen Städten naheliegend: erst Glühwein unter freiem Himmel, dann gemeinsam an den Tisch. Unkompliziert, aber wetterabhängig.",
          "Gemeinsam etwas tun. Kochkurs, Workshop oder Eisstockschießen — aktiv und gut für kleinere Teams, die sich ohnehin schon kennen.",
          "Feier in den eigenen Räumen mit Catering. Persönlich und ohne Locationmiete. Braucht aber ein Programm, sonst bleibt es Büro mit Häppchen.",
          "Weihnachtsgala im Hotel oder in einer Eventlocation. Für große Belegschaften, mit Bühne, Reden und Ehrungen. Steht und fällt mit einem klaren Ablauf.",
          "Magic Dinner. Das Weihnachtsmenü bekommt eine Dramaturgie: Zwischen den Gängen passiert Magie direkt am Tisch, die Wartezeit wird zum Programm.",
          "Walk-Around beim Empfang. Magie mitten unter den Gästen, während Glühwein oder Aperitif laufen — der schnellste Weg, dass Abteilungen ins Gespräch kommen.",
        ],
      },
      {
        type: "heading",
        text: "Wo Unterhaltung auf der Weihnachtsfeier wirklich passt",
        id: "unterhaltung",
      },
      {
        type: "paragraph",
        text:
          "Jede Weihnachtsfeier hat drei Momente, in denen die Energie kippen kann: das Ankommen, wenn Gruppen noch unter sich bleiben. Die Zeit zwischen den Gängen. Und die Phase nach den Reden, in der der Abend entweder Fahrt aufnimmt oder langsam ausläuft. Genau dort gehört Unterhaltung hin — nicht irgendwo dazwischen.",
      },
      {
        type: "list",
        items: [
          "Empfang: Close-Up als Walk-Around. Ich gehe von Gruppe zu Gruppe, Kollegen aus Abteilungen, die sonst nie zusammenstehen, lachen über denselben Moment.",
          "Dinner: Tisch-zu-Tisch. Zwischen den Gängen bekommt jeder Tisch seinen eigenen Moment, ohne dass Service oder Reden ins Stocken geraten.",
          "Nach den Reden: Bühnenshow als Höhepunkt. 20 bis 30 Minuten Comedy und Mentalmagie für alle gleichzeitig, mit Kollegen auf der Bühne.",
        ],
      },
      {
        type: "callout",
        eyebrow: "Faustregel.",
        text:
          "Bei einem Essen mit Kollegen passt Close-Up von Tisch zu Tisch. Ab etwa 50 Gästen lohnt sich die Kombination: Close-Up beim Empfang, Bühnenshow als Höhepunkt.",
      },
      {
        type: "heading",
        text: "Was eine gute Weihnachtsfeier von einer netten unterscheidet",
        id: "unterschied",
      },
      {
        type: "paragraph",
        text:
          "Der Unterschied liegt fast nie im Budget, sondern im Zuschnitt. Eine Weihnachtsfeier ist der eine Abend, an dem das Team auf sein Jahr zurückschaut. Deshalb frage ich vorab nach Stories, Namen und Running Gags aus eurem Jahr und baue sie in die Show ein. Wenn in der Pointe plötzlich das Projekt vorkommt, über das alle seit Monaten reden, ist das mehr wert als jeder Standard-Trick.",
      },
      {
        type: "paragraph",
        text:
          "Genauso wichtig: niemand wird vorgeführt. Wer auf die Bühne kommt, soll dort gut aussehen — auch die Geschäftsführung. Und wenn euer Team international ist, läuft das Programm auf Deutsch, auf Englisch oder zweisprachig.",
      },
      {
        type: "heading",
        text: "Wann ihr mit der Planung anfangen solltet",
        id: "zeitplan",
      },
      {
        type: "paragraph",
        text:
          "Für Weihnachtsfeiern plant ihr am besten 8 bis 12 Wochen Vorlauf ein. Die Freitage und Samstage im Dezember sind in der Regel zuerst vergeben — bei Locations genauso wie bei Künstlern. Wer im September oder Anfang Oktober anfragt, hat noch echte Auswahl. Kurzfristig klappt es trotzdem oft, wenn der Termin frei ist.",
      },
      {
        type: "paragraph",
        text:
          "Wenn ihr noch zwischen zwei Ideen schwankt: Schreibt mir Datum, Ort und ungefähre Gästezahl. Ihr bekommt innerhalb von 24 Stunden eine Antwort mit einem konkreten Vorschlag, welches Format zu eurer Feier passt — unverbindlich.",
      },
    ],
    relatedPages: [
      { title: "Zauberer für die Weihnachtsfeier", href: "/zauberer-weihnachtsfeier" },
      { title: "Zauberer für Firmenfeiern", href: "/firmenfeiern" },
      { title: "Magic Dinner", href: "/magic-dinner" },
      { title: "Checkliste: Weihnachtsfeier planen", href: "/blog/weihnachtsfeier-planen-checkliste" },
    ],
  },
  {
    slug: "zauberer-weihnachtsfeier-kosten",
    title: "Weihnachtsfeier-Zauberer: Kosten",
    titleAccent: "Ehrliche Preisspannen 2026.",
    excerpt:
      "Was kostet ein Zauberer für die Weihnachtsfeier? Pakete ab 395 €, realistische Spannen je Format und die Faktoren, die den Preis wirklich bestimmen.",
    category: "Buchung",
    tags: ["Weihnachtsfeier", "Preise", "Zauberer Kosten", "Firmenfeier", "Buchung"],
    date: "2026-09-22",
    readTime: "5 Min.",
    words: 482,
    author: EMILIAN,
    cover: "buehne-zuschauer",
    featured: false,
    sections: [
      {
        type: "paragraph",
        text:
          "Was kostet ein Zauberer für die Weihnachtsfeier? Die Frage gehört zu den ersten, die Firmen stellen — und sie verdient eine ehrliche Antwort statt [Preis auf Anfrage]. Hier steht, wie sich der Preis zusammensetzt, welche Spannen realistisch sind und was bei mir schon enthalten ist.",
      },
      {
        type: "heading",
        text: "Was kostet ein Zauberer für die Weihnachtsfeier?",
        id: "kosten",
      },
      {
        type: "paragraph",
        text:
          "Kurz gesagt: Meine Pakete starten ab 395 €. Wo eure Weihnachtsfeier genau landet, hängt vom Format, der Dauer und der Anfahrt ab. Nach einer kurzen Anfrage bekommt ihr innerhalb von 24 Stunden ein verbindliches Angebot ohne versteckte Kosten.",
      },
      {
        type: "paragraph",
        text:
          "Die 395 € sind der Einstieg für das kleinste Paket. Je mehr Zeit und je mehr Formate ihr kombiniert, desto eher landet ihr in den Spannen, die ich weiter unten aufliste.",
      },
      {
        type: "heading",
        text: "Realistische Preisspannen nach Format",
        id: "spannen",
      },
      {
        type: "paragraph",
        text:
          "Als Orientierung — dieselben Richtwerte, die ich auch im Wissensbereich zu den Kosten eines Zauberers nenne:",
      },
      {
        type: "list",
        items: [
          "60 Minuten Close-Up bei einem lokalen Event: 500–900 €",
          "30 Minuten Bühnenshow in Bayern: 800–1.500 €",
          "60 Minuten abendfüllende Show: 1.500–3.500 €",
          "Magic Dinner (3–4 Stunden, 30–50 Gäste): 1.500–4.000 € plus Anfahrt",
          "Magie auf einer Firmenfeier mit rund 100 Gästen: 1.500–3.000 €, also etwa 15–30 € pro Gast",
        ],
      },
      {
        type: "heading",
        text: "Die vier Faktoren, die den Preis bestimmen",
        id: "faktoren",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Format: Close-Up am Tisch, Bühnenshow für den ganzen Saal, Magic Dinner über das ganze Menü — oder eine Kombination aus Empfang und Show.",
          "Dauer: Ein kurzer Bühnen-Slot nach dem Hauptgang ist etwas anderes als Magie über den ganzen Abend.",
          "Gästezahl: Sie entscheidet vor allem, welches Format sinnvoll ist. Bei vielen Tischen braucht Close-Up mehr Zeit, damit jeder Tisch seinen Moment bekommt.",
          "Anfahrt: In Regensburg fällt keine Anfahrtspauschale an. Für alle anderen Orte wird die Anfahrt aus Regensburg im Angebot ausgewiesen.",
        ],
      },
      {
        type: "heading",
        text: "Was im Preis schon enthalten ist",
        id: "enthalten",
      },
      {
        type: "list",
        items: [
          "Vorab-Briefing: Stories, Namen und Insider-Gags aus eurem Jahr, eingebaut in die Show.",
          "Headset und Ton für die Bühnenshow, Tech-Rider auf Anfrage.",
          "Berufshaftpflicht und auf Wunsch DSGVO/AVV.",
          "Programm auf Deutsch, Englisch oder zweisprachig für internationale Teams.",
          "Pünktlicher Aufbau, rund 30 Minuten vor Beginn.",
        ],
      },
      {
        type: "heading",
        text: "Worauf ihr beim Vergleichen achten solltet",
        id: "vergleich",
      },
      {
        type: "list",
        items: [
          "Vergleicht dasselbe Format und dieselbe Dauer — 30 Minuten Bühne und drei Stunden Close-Up sind zwei verschiedene Leistungen.",
          "Achtet darauf, ob die Anfahrt im Angebot steht oder erst auf der Rechnung auftaucht.",
          "Fragt nach der Berufshaftpflicht. Seriöse Anbieter haben sie und können sie nachweisen.",
          "Lasst euch Referenzen von Firmen-Events zeigen, nicht nur ein Bühnen-Showreel.",
          "Show-Länge, Ablauf und Aufbauzeit gehören schriftlich ins Angebot.",
        ],
      },
      {
        type: "callout",
        eyebrow: "Tipp.",
        text:
          "Schickt bei der Anfrage gleich Datum, Ort, Gästezahl und den groben Ablauf mit. Dann ist das Angebot sofort belastbar — und ihr vergleicht verschiedene Anbieter auf derselben Grundlage.",
      },
      {
        type: "paragraph",
        text:
          "Zur Einordnung: Ich habe seit 2016 über 200 Events gespielt, bin TV-Finalist bei Greatest Talent 2023 und Talents of Magic 2024 und stehe bei 4,8 Sternen bei 16 Google-Rezensionen. Das ist kein Preisargument — aber es erklärt, wofür ihr bezahlt.",
      },
    ],
    relatedPages: [
      { title: "Zauberer für die Weihnachtsfeier", href: "/zauberer-weihnachtsfeier" },
      { title: "Was kostet ein Zauberer? (Wissen)", href: "/wissen/zauberer-buchen" },
      { title: "Zauberer für Firmenfeiern", href: "/firmenfeiern" },
      { title: "Anfrage & Buchung", href: "/buchung" },
    ],
  },
  {
    slug: "weihnachtsfeier-planen-checkliste",
    title: "Weihnachtsfeier planen: Checkliste",
    titleAccent: "Mit Zeitplan ab zwölf Wochen.",
    excerpt:
      "Weihnachtsfeier planen ohne Stress: Checkliste mit Zeitplan von 12 Wochen vorher bis zum Abend — Budget, Location, Programm, Einladung und Ablauf.",
    category: "Firmenfeiern",
    tags: ["Weihnachtsfeier", "Checkliste", "Event-Planung", "Firmenfeier", "Zeitplan"],
    date: "2026-09-22",
    readTime: "6 Min.",
    words: 565,
    author: EMILIAN,
    cover: "dinner",
    featured: false,
    sections: [
      {
        type: "paragraph",
        text:
          "Eine Weihnachtsfeier planen klingt nach einem Nachmittag Arbeit — bis man merkt, dass die Wunschlocation am Dezember-Freitag schon vergeben ist. Diese Checkliste mit Zeitplan schreibe ich aus der Perspektive von jemandem, der bei über 100 Firmen-Events als Programmpunkt mitgeplant wurde. Sie hilft euch, nichts zu vergessen und rechtzeitig zu entscheiden.",
      },
      {
        type: "heading",
        text: "Weihnachtsfeier planen: der Zeitplan auf einen Blick",
        id: "zeitplan",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "12 Wochen vorher: Budget, Wunschtermin, grobe Gästezahl und Art der Feier festlegen.",
          "12 bis 8 Wochen vorher: Location und Programm anfragen und fest buchen.",
          "8 Wochen vorher: Save the Date an alle verschicken.",
          "6 Wochen vorher: Einladung mit Anmeldeschluss, Menü und Essenswünschen.",
          "4 Wochen vorher: Ablaufplan erstellen, Technik mit der Location klären.",
          "2 Wochen vorher: finale Gästezahl melden, Sitzplan festlegen.",
          "1 Woche vorher: Briefing mit allen Dienstleistern, Ansprechperson für den Abend benennen.",
          "Am Abend: früh vor Ort sein, Ablauf im Blick behalten — und selbst mitfeiern.",
        ],
      },
      {
        type: "callout",
        eyebrow: "Warum so früh?",
        text:
          "Für Weihnachtsfeiern sind 8 bis 12 Wochen Vorlauf ideal. Die Freitage und Samstage im Dezember sind in der Regel zuerst vergeben. Kurzfristig klappt es trotzdem oft — dann entscheidet aber der Kalender, nicht ihr.",
      },
      {
        type: "heading",
        text: "12 bis 8 Wochen vorher: die Grundentscheidungen",
        id: "grundlagen",
      },
      {
        type: "list",
        items: [
          "Budget klären: Gesamtbetrag oder Betrag pro Kopf, inklusive Essen, Getränke, Location und Programm.",
          "Termin wählen: Wenn Freitag und Samstag knapp sind, sind Donnerstage eine gute Alternative.",
          "Gästezahl schätzen: Sie entscheidet über Location und Format — Team-Essen mit 20 Leuten oder Gala mit mehreren hundert.",
          "Art der Feier festlegen: Restaurant, eigene Räume mit Catering, Eventlocation oder ein Format wie Magic Dinner.",
          "Programm anfragen: Unterhaltung, Musik oder Moderation zusammen mit der Location buchen, nicht erst danach.",
        ],
      },
      {
        type: "heading",
        text: "8 bis 4 Wochen vorher: Einladung und Ablauf",
        id: "einladung",
      },
      {
        type: "list",
        items: [
          "Save the Date verschicken, danach die Einladung mit klarem Anmeldeschluss.",
          "Essenswünsche abfragen: vegetarisch, vegan, Allergien.",
          "Anreise klären: Parkplätze, öffentliche Verkehrsmittel, bei Bedarf ein Shuttle für den Heimweg.",
          "Ablaufplan schreiben: Empfang, Begrüßung, Essen, Programm, offener Teil.",
          "Technik mit der Location abstimmen: Mikrofon für Reden, Tonanlage, freie Fläche für eine Bühnenshow.",
        ],
      },
      {
        type: "heading",
        text: "4 bis 1 Woche vorher: der Feinschliff",
        id: "feinschliff",
      },
      {
        type: "list",
        items: [
          "Finale Teilnehmerzahl an Location und Catering melden.",
          "Sitzplan mit gemischten Tischen — damit nicht jede Abteilung unter sich bleibt.",
          "Briefing an die Künstler: Namen, Stories und Running Gags aus eurem Jahr. Daraus wird der persönliche Teil des Programms.",
          "Reden kurz halten und die Reihenfolge festlegen.",
          "Eine Ansprechperson benennen, die am Abend für Dienstleister erreichbar ist.",
        ],
      },
      {
        type: "heading",
        text: "Am Abend selbst",
        id: "abend",
      },
      {
        type: "list",
        items: [
          "Dienstleister rechtzeitig da: Ich baue zum Beispiel rund 30 Minuten vor Beginn auf.",
          "Empfang nicht leer laufen lassen: Das Ankommen ist der Moment, in dem sich die Stimmung für den Abend entscheidet.",
          "Den Höhepunkt nach dem Hauptgang oder nach den Reden setzen, wenn alle sitzen und satt sind.",
          "Jemanden fürs Fotografieren bestimmen — die Bilder braucht ihr später für Intranet und Jahresrückblick.",
        ],
      },
      {
        type: "heading",
        text: "Die häufigsten Planungsfehler",
        id: "fehler",
      },
      {
        type: "list",
        items: [
          "Zu spät anfragen und dann nehmen müssen, was noch frei ist.",
          "Das Programm als Lückenfüller einplanen statt als festen Programmpunkt.",
          "Zu viele Reden vor dem Essen — hungrige Gäste hören nicht zu.",
          "Den Ablauf nicht mit der Location abstimmen, sodass Service und Programm sich gegenseitig stören.",
          "Keine Ansprechperson vor Ort, weil die Organisatorin selbst mitfeiern will. Beides geht — mit klarer Übergabe.",
        ],
      },
      {
        type: "paragraph",
        text:
          "Wenn ihr beim Punkt [Programm anfragen] seid: Schreibt mir Datum, Ort und Gästezahl. Ihr bekommt innerhalb von 24 Stunden eine Antwort und ein konkretes Angebot — dann ist dieser Punkt auf der Checkliste erledigt.",
      },
    ],
    relatedPages: [
      { title: "Zauberer für die Weihnachtsfeier", href: "/zauberer-weihnachtsfeier" },
      { title: "Weihnachtsfeier-Ideen für Firmen", href: "/blog/weihnachtsfeier-ideen-firma" },
      { title: "Weihnachtsfeier-Zauberer: Kosten", href: "/blog/zauberer-weihnachtsfeier-kosten" },
      { title: "Zauberer für Firmenfeiern", href: "/firmenfeiern" },
    ],
  },
  {
    slug: "zauberer-firmenfeier-bayern",
    title: "Firmenfeier-Zauberer in Bayern",
    titleAccent: "Regensburg, München, Nürnberg.",
    excerpt:
      "Zauberer für Firmenfeiern in Bayern: wie Buchungen von Regensburg aus nach München, Nürnberg und in die Region laufen — mit Anfahrt transparent im Angebot.",
    category: "Firmenfeiern",
    tags: ["Firmenfeier", "Bayern", "Regensburg", "München", "Nürnberg"],
    date: "2026-09-22",
    readTime: "5 Min.",
    words: 475,
    author: EMILIAN,
    cover: "audience",
    featured: false,
    sections: [
      {
        type: "paragraph",
        text:
          "Ich bin in Regensburg zuhause, und von hier aus bin ich als Zauberer für Firmenfeiern in Bayern unterwegs — in der Oberpfalz, in Niederbayern, Oberbayern und Franken. Wie eine Buchung konkret abläuft, was die Anfahrt kostet und welche Städte in Reichweite liegen, steht hier.",
      },
      {
        type: "paragraph",
        text:
          "Seit 2016 habe ich über 200 Events gespielt, davon über 100 Firmen-Events. Zu meinen Kunden gehören unter anderem VKB, STRABAG, XXXLutz, Sixt, die Sparkasse und die Stadt Regensburg.",
      },
      {
        type: "heading",
        text: "Zauberer für Firmenfeiern in Bayern: so läuft die Buchung",
        id: "buchung",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Anfrage mit Datum, Ort, Anlass und ungefährer Gästezahl — das dauert zwei Minuten und ist unverbindlich.",
          "Antwort und Angebot innerhalb von 24 Stunden, inklusive ausgewiesener Anfahrt.",
          "Vorab-Briefing: Was für eine Feier ist es, wer ist dabei, welche Geschichten aus eurem Jahr gehören in die Show?",
          "Abstimmung mit der Location: Ablauf, Ton, Platz für die Bühnenshow.",
          "Am Abend: Aufbau rund 30 Minuten vor Beginn, danach läuft alles nach dem vereinbarten Ablauf.",
        ],
      },
      {
        type: "heading",
        text: "Anfahrt aus Regensburg: transparent im Angebot",
        id: "anfahrt",
      },
      {
        type: "paragraph",
        text:
          "In Regensburg selbst fällt keine Anfahrtspauschale an. Für alle anderen Orte steht die Anfahrt aus Regensburg im Angebot — ihr seht also vorher, was ihr bezahlt, und nichts kommt nachträglich dazu.",
      },
      {
        type: "paragraph",
        text:
          "Mein Einsatzgebiet sind Regensburg und die Städte bis etwa zwei Stunden Anfahrt. Zur Orientierung: Kelheim liegt rund 30 Minuten entfernt, Deggendorf rund 40, Neumarkt in der Oberpfalz rund 45 Minuten, Amberg etwa eine Stunde, München und Erding rund anderthalb Stunden.",
      },
      {
        type: "heading",
        text: "Regensburg und die Oberpfalz",
        id: "oberpfalz",
      },
      {
        type: "paragraph",
        text:
          "Hier sind die Wege am kürzesten. Neben Regensburg selbst gehören Amberg, Weiden, Neumarkt in der Oberpfalz und Cham zum Einsatzgebiet.",
      },
      {
        type: "heading",
        text: "München und Oberbayern",
        id: "muenchen",
      },
      {
        type: "paragraph",
        text:
          "München ist von Regensburg aus in rund anderthalb Stunden erreichbar. Dazu kommen Ingolstadt, Freising, Erding und Rosenheim. Für internationale Teams läuft das Programm auf Wunsch komplett auf Englisch oder zweisprachig.",
      },
      {
        type: "heading",
        text: "Nürnberg und Franken",
        id: "franken",
      },
      {
        type: "paragraph",
        text:
          "In Franken bin ich in Nürnberg, Fürth und Erlangen unterwegs, außerdem in Bamberg, Bayreuth und Würzburg. Das Format ist überall dasselbe: Close-Up, Bühnenshow oder Magic Dinner — zugeschnitten auf eure Firma.",
      },
      {
        type: "heading",
        text: "Niederbayern und Schwaben",
        id: "niederbayern",
      },
      {
        type: "paragraph",
        text:
          "In Niederbayern gehören Landshut, Straubing, Deggendorf, Passau und Kelheim zum Einsatzgebiet, in Schwaben Augsburg.",
      },
      {
        type: "heading",
        text: "Welche Formate überall funktionieren",
        id: "formate",
      },
      {
        type: "list",
        items: [
          "Close-Up und Walk-Around: Magie am Tisch und beim Empfang, ohne Bühne und ohne Technik.",
          "Bühnenshow: Comedy und Mentalmagie für den ganzen Saal, 15, 30 oder 60 Minuten. Headset bringe ich mit.",
          "Magic Dinner: Magie über das ganze Menü verteilt, in eurem Restaurant oder eurer Location.",
          "Sprache: Deutsch, Englisch oder zweisprachig.",
        ],
      },
      {
        type: "callout",
        eyebrow: "Gut zu wissen.",
        text:
          "Für Weihnachtsfeiern gilt in ganz Bayern derselbe Vorlauf: 8 bis 12 Wochen. Die Freitage und Samstage im Dezember sind zuerst vergeben — egal ob in Regensburg, München oder Nürnberg.",
      },
      {
        type: "paragraph",
        text:
          "Ihr plant eine Firmenfeier irgendwo in Bayern? Schreibt mir Datum und Ort — ihr bekommt innerhalb von 24 Stunden ein Angebot, in dem die Anfahrt schon drinsteht.",
      },
    ],
    relatedPages: [
      { title: "Zauberer Regensburg", href: "/zauberer/regensburg" },
      { title: "Zauberer München", href: "/zauberer/muenchen" },
      { title: "Zauberer Nürnberg", href: "/zauberer/nuernberg" },
      { title: "Zauberer Augsburg", href: "/zauberer/augsburg" },
      { title: "Zauberer Ingolstadt", href: "/zauberer/ingolstadt" },
      { title: "Zauberer Landshut", href: "/zauberer/landshut" },
      { title: "Zauberer Passau", href: "/zauberer/passau" },
      { title: "Zauberer Würzburg", href: "/zauberer/wuerzburg" },
      { title: "Zauberer für Firmenfeiern", href: "/firmenfeiern" },
      { title: "Zauberer für die Weihnachtsfeier", href: "/zauberer-weihnachtsfeier" },
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
