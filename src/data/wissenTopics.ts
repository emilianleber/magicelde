/**
 * Wissens-/Glossar-Themen für /wissen/{slug}.
 *
 * Zweck: Definition-Pages für AEO (Answer Engine Optimization) —
 * Pages die genau eine Frage ("Was ist X?") in vollständigen Sätzen
 * direkt am Anfang beantworten. Featured-Snippet-tauglich.
 */

export interface WissenSection {
  type: "paragraph" | "heading" | "list";
  text?: string;
  items?: string[];
}

export interface WissenTopic {
  slug: string;
  title: string;
  shortDefinition: string; // 1-2 Sätze, direkt am Anfang — Featured-Snippet-Antwort
  metaTitle: string;
  metaDescription: string;
  sections: WissenSection[];
  relatedTopics?: string[];
  relatedPages?: { title: string; href: string }[];
}

export const wissenTopics: WissenTopic[] = [
  {
    slug: "magic-dinner",
    title: "Was ist ein Magic Dinner?",
    shortDefinition:
      "Ein Magic Dinner ist ein gastronomisches Format, bei dem ein Magier während eines Restaurant-Abends die Tafeln der Gäste besucht und Close-Up-Magie direkt am Tisch vorführt. Es gibt keine zentrale Bühne — die Magie kommt zum Tisch, eingebettet in den Service-Rhythmus eines Mehrgänge-Menüs.",
    metaTitle: "Was ist ein Magic Dinner? — Definition & Ablauf | Emilian Leber",
    metaDescription:
      "Magic Dinner einfach erklärt: Restaurant-Abend mit Close-Up-Magie am Tisch. Definition, Ablauf, Unterschied zur Bühnenshow, typische Locations. Spezialgebiet von Emilian Leber seit 2023.",
    sections: [
      {
        type: "heading",
        text: "Definition",
      },
      {
        type: "paragraph",
        text:
          "Ein Magic Dinner ist ein gastronomisches Veranstaltungsformat, bei dem ein professioneller Magier während eines Restaurant-Abends durch die Räume geht und an jeder Tafel persönlich Close-Up-Magie aufführt. Die Performance ist in den normalen Service-Ablauf eingebettet — zwischen Vorspeise und Hauptgang, zwischen Hauptgang und Dessert. Keine zentrale Show, keine Bühne, keine Programm-Zeiten.",
      },
      {
        type: "heading",
        text: "Wie unterscheidet sich Magic Dinner von einer Bühnenshow?",
      },
      {
        type: "paragraph",
        text:
          "Bei einer klassischen Bühnenshow sitzt das Publikum im Saal und schaut zum Künstler. Beim Magic Dinner ist es umgekehrt: der Künstler kommt zu jeder Tafel und führt 5-7 Minuten Magie für 4-12 Personen pro Tisch vor. Die Performance ist intimer, persönlicher und an die Restaurant-Atmosphäre angepasst.",
      },
      {
        type: "heading",
        text: "Typischer Ablauf",
      },
      {
        type: "list",
        items: [
          "Ankunft der Gäste, Aperitif im Restaurant",
          "Vorspeise wird serviert",
          "Magier beginnt seine Tour durch die Tafeln — meist parallel zum Hauptgang-Service",
          "Zwischen den Gängen Tisch-zu-Tisch-Magie, 5-7 Min pro Tafel",
          "Dessert und Bar bis zum Abend-Ende",
        ],
      },
      {
        type: "heading",
        text: "Wo finden Magic Dinners statt?",
      },
      {
        type: "paragraph",
        text:
          "Magic Dinners brauchen Tafel-Bestuhlung (keine Theater-Reihen) und genug Platz zwischen den Tischen damit der Magier zu jeder Gruppe kommt. Restaurants mit kleinen Sälen (40-80 Gäste) eignen sich am besten. In Bayern ist der Hauspartner von Emilian Leber das Restaurant Wald & Wiese in Sinzing bei Regensburg.",
      },
      {
        type: "heading",
        text: "Für wen geeignet?",
      },
      {
        type: "paragraph",
        text:
          "Magic Dinners funktionieren für gemischte Restaurant-Abende (öffentliches Magic-Dinner-Format, jede Tafel separat reserviert), aber auch für private Anlässe — Geburtstage, kleine Hochzeiten, Geschäftsabende, Jubiläen. Pro Tafel 2-12 Gäste, gesamt 20-50 Personen pro Abend.",
      },
    ],
    relatedTopics: ["close-up-magie", "mentalmagie"],
    relatedPages: [
      { title: "Magic Dinner Format-Seite", href: "/magic-dinner" },
    ],
  },
  {
    slug: "close-up-magie",
    title: "Was ist Close-Up-Magie?",
    shortDefinition:
      "Close-Up-Magie ist die intimste Form der Zauberkunst — Karten, Münzen und kleine Objekte werden direkt vor und in den Händen des Publikums manipuliert. Der Abstand zum Effekt beträgt 30-50 Zentimeter, keine Bühne, keine Distanz.",
    metaTitle: "Was ist Close-Up-Magie? — Definition & Anwendungen | Emilian Leber",
    metaDescription:
      "Close-Up-Magie erklärt: Karten, Münzen, Mentaleffekte direkt am Tisch. Was funktioniert, wo es eingesetzt wird, Unterschied zur Bühnenshow. Praxis aus 100+ Auftritten.",
    sections: [
      {
        type: "heading",
        text: "Definition",
      },
      {
        type: "paragraph",
        text:
          "Close-Up-Magie (auch Mikromagie oder Tischzauberei genannt) bezeichnet alle Zauber-Routinen, die in unmittelbarer Nähe zum Publikum aufgeführt werden — meist mit Karten, Münzen, kleinen Alltagsgegenständen. Die Distanz beträgt typischerweise 30-50 Zentimeter, also Hand- oder Tischbreite.",
      },
      {
        type: "heading",
        text: "Was unterscheidet Close-Up von Bühnenmagie?",
      },
      {
        type: "paragraph",
        text:
          "Bühnenmagie nutzt große Apparate, Licht-Effekte und arbeitet aus mehreren Metern Entfernung. Close-Up dagegen funktioniert mit kleinen, oft geliehenen Objekten — und genau dort, wo der Zuschauer alles genau sieht. Es gibt keinen \"sicheren Abstand\" hinter dem sich etwas verstecken lässt.",
      },
      {
        type: "heading",
        text: "Typische Routinen",
      },
      {
        type: "list",
        items: [
          "Kartenmagie — vom verschwundenen Ass bis zur Mentalvorhersage mit gewählter Karte",
          "Münzen-Effekte — Münzen wandern, verschwinden, verwandeln sich",
          "Borrowed-Object-Routinen — geliehener Ring, Schlüssel oder Geldschein",
          "Mentaleffekte — der Magier errät Gedanken, Vorhersagen, Persönlichkeitszüge",
        ],
      },
      {
        type: "heading",
        text: "Wo wird Close-Up eingesetzt?",
      },
      {
        type: "paragraph",
        text:
          "Klassische Einsatzorte: Hochzeits-Sektempfänge, Firmen-Empfänge, Vorstandsdinner, Magic-Dinner-Abende, private Geburtstage. Walk-Around-Format: der Magier geht von Gruppe zu Gruppe. Tisch-zu-Tisch-Format: feste Tafel-Rotation während des Dinners.",
      },
      {
        type: "heading",
        text: "Wie viele Gäste schaffen 60 Min Close-Up?",
      },
      {
        type: "paragraph",
        text:
          "Bei 5-7 Minuten Routinen pro Tafel/Gruppe schafft ein Profi-Künstler in einer Stunde ca. 8-10 Gruppen, also 40-100 Gäste. Mehr Gäste über 90+ Minuten verteilen, oder zwei Künstler parallel einsetzen.",
      },
    ],
    relatedTopics: ["magic-dinner", "mentalmagie"],
    relatedPages: [
      { title: "Close-Up Format-Seite", href: "/close-up" },
      { title: "Hochzeitszauberer", href: "/hochzeit" },
    ],
  },
  {
    slug: "mentalmagie",
    title: "Was ist Mentalmagie?",
    shortDefinition:
      "Mentalmagie ist die Disziplin der Zauberkunst, die mit dem Geist arbeitet — Vorhersagen, scheinbares Gedankenlesen, Beeinflussung von Entscheidungen. Statt Karten und Münzen sind die Effekte gedanklicher Natur und wirken oft echter als klassische Magie.",
    metaTitle: "Was ist Mentalmagie? — Definition & Effekte | Emilian Leber",
    metaDescription:
      "Mentalmagie erklärt: Definition, typische Effekte, Unterschied zu Hellsehen oder Hypnose. Warum Mentalmagie auf Galas und Vorstandsdinner besonders wirksam ist.",
    sections: [
      {
        type: "heading",
        text: "Definition",
      },
      {
        type: "paragraph",
        text:
          "Mentalmagie (englisch: Mentalism) ist die Zauber-Disziplin, die mit Eindrücken von Telepathie, Vorhersage und Gedankenkontrolle arbeitet. Der Mentalist führt Effekte vor, die wie echte parapsychologische Fähigkeiten wirken — ohne diese Fähigkeit zu beanspruchen.",
      },
      {
        type: "heading",
        text: "Wie funktioniert Mentalmagie?",
      },
      {
        type: "paragraph",
        text:
          "Mentalmagier nutzen eine Mischung aus Psychologie, Beobachtung, Suggestion und klassischer Magie-Technik. Es geht nicht um echtes Gedankenlesen, sondern um eine perfekt orchestrierte Illusion davon. Der Mentalist weiß was du wählen wirst, weil er dir die Wahl subtil vorgegeben hat.",
      },
      {
        type: "heading",
        text: "Typische Effekte",
      },
      {
        type: "list",
        items: [
          "Vorhersage — der Mentalist schreibt eine Auswahl auf, bevor der Zuschauer wählt",
          "Buchprobe — die Vorhersage einer Buchseite die der Zuschauer zufällig wählt",
          "Persönlichkeits-Effekte — der Mentalist beschreibt einen Fremden präzise",
          "Zahlen- und Wort-Vorhersagen — am Anfang verschlossen, am Ende offen",
        ],
      },
      {
        type: "heading",
        text: "Warum wirkt Mentalmagie so stark?",
      },
      {
        type: "paragraph",
        text:
          "Klassische Magie wird oft als \"Trick\" wahrgenommen — Mentalmagie wirkt persönlich, weil der Effekt im eigenen Kopf stattzufinden scheint. Drei Sekunden Stille nach der Auflösung ist das eigentliche Produkt eines Mentaleffekts. Vorstandsdinner, B2B-Galas und Premium-Hochzeiten setzen besonders auf Mentalmagie.",
      },
      {
        type: "heading",
        text: "Mentalmagie vs. Hypnose vs. Hellsehen",
      },
      {
        type: "paragraph",
        text:
          "Hypnose erzeugt einen veränderten Bewusstseinszustand, Hellsehen behauptet echte parapsychologische Fähigkeiten. Mentalmagie tut beides nicht — sie nutzt Theater und Technik um den Eindruck zu erzeugen, dass etwas Übernatürliches passiert.",
      },
    ],
    relatedTopics: ["close-up-magie", "buehnenshow"],
    relatedPages: [
      { title: "Bühnenshow-Format", href: "/buehnenshow" },
      { title: "Über mich", href: "/ueber-mich" },
    ],
  },
  {
    slug: "buehnenshow",
    title: "Was ist eine Bühnenshow (Zauber)?",
    shortDefinition:
      "Eine Bühnen-Zaubershow ist ein 15-60 Minuten durchkomponiertes Programm aus Magie, Comedy und Mentaleffekten, das vor einem sitzenden Publikum aufgeführt wird. Die Show hat dramatischen Aufbau, Pointen und ein finales Highlight — wie ein Theaterstück mit interaktiven Elementen.",
    metaTitle: "Was ist eine Bühnen-Zaubershow? — Aufbau & Länge | Emilian Leber",
    metaDescription:
      "Bühnen-Zaubershow erklärt: Definition, Aufbau, typische Längen (15-60 Min), Unterschied zu Close-Up, Technik-Anforderungen. Für Galas, Firmenfeiern, Theater-Slots.",
    sections: [
      {
        type: "heading",
        text: "Definition",
      },
      {
        type: "paragraph",
        text:
          "Eine Bühnen-Zaubershow ist die klassische Form der Magie-Performance: der Künstler steht auf einer Bühne, das Publikum sitzt im Saal. Anders als Close-Up-Magie funktioniert die Show aus Distanz (5-20 Meter) und setzt auf größere visuelle Effekte, dramaturgischen Aufbau und oft Comedy-Elemente.",
      },
      {
        type: "heading",
        text: "Typische Längen",
      },
      {
        type: "list",
        items: [
          "15 Min — Showblock zwischen anderen Programmpunkten",
          "30 Min — Highlight-Show als Hauptauftritt",
          "45-60 Min — abendfüllende Show für Theater und Galas",
        ],
      },
      {
        type: "heading",
        text: "Aufbau einer 30-Min-Show",
      },
      {
        type: "list",
        items: [
          "Min 1-3 — Hook: ein kurzer starker Effekt der das Publikum sofort hereinholt",
          "Min 4-10 — Mentaleffekt mit Publikumsbeteiligung",
          "Min 11-20 — Karten- oder Bühnen-Routine mit Comedy-Aufbau",
          "Min 21-27 — längere Mentalmagie mit Saal-Beteiligung",
          "Min 28-30 — Finale + Standing-Ovation-Moment",
        ],
      },
      {
        type: "heading",
        text: "Technik-Anforderungen",
      },
      {
        type: "paragraph",
        text:
          "Standard: Mikrofon (Headset oder Handsender), Bühnenlicht (Frontspot reicht), bei größerem Setting Sound-Anlage für Einspieler. Bühne ab 2×1,5 m. Bei kleineren Settings (Restaurant-Saal, Hochzeit) auch ohne Bühne möglich.",
      },
      {
        type: "heading",
        text: "Wo wird Bühnenshow eingesetzt?",
      },
      {
        type: "paragraph",
        text:
          "Klassisch: Galas, Firmen-Events, Hochzeiten als Übergang zum Tanz, Theater-Slots, Award-Shows, TV-Produktionen. Auch in Restaurant-Sälen mit erhöhter Plattform funktioniert eine kompakte Show.",
      },
    ],
    relatedTopics: ["close-up-magie", "mentalmagie"],
    relatedPages: [
      { title: "Bühnenshow-Format", href: "/buehnenshow" },
      { title: "Firmenfeiern", href: "/firmenfeiern" },
    ],
  },
  {
    slug: "zauberer-buchen",
    title: "Was kostet ein Zauberer?",
    shortDefinition:
      "Die Kosten für einen professionellen Zauberer in Deutschland liegen je nach Format und Aufwand zwischen 500 € und 5000 €. Close-Up bei einem privaten Event startet im mittleren dreistelligen Bereich, Bühnenshows für Galas oder Firmenfeiern bewegen sich im vier- bis fünfstelligen Bereich.",
    metaTitle: "Was kostet ein Zauberer? — Preise & Honorare 2026 | Emilian Leber",
    metaDescription:
      "Was kostet ein Zauberer? Realistische Preise für Close-Up, Bühnenshow, Magic Dinner und Hochzeitszauber. Was den Preis bestimmt und worauf man bei der Buchung achtet.",
    sections: [
      {
        type: "heading",
        text: "Was bestimmt den Preis?",
      },
      {
        type: "list",
        items: [
          "Format: Close-Up ist günstiger als abendfüllende Bühnenshow",
          "Dauer: 15 Min Showblock kostet weniger als 60 Min abendfüllend",
          "Anfahrt: lokal günstiger als deutschlandweite Reise mit Übernachtung",
          "Saison: Hochsaison (Mai-September, Dezember) teurer als Nebensaison",
          "Briefing-Aufwand: personalisierte Routinen für Vorstandsdinner aufwändiger als Standard-Set",
          "Erfahrung des Künstlers: Top-30-Prozent zahlen sich aus durch Verlässlichkeit",
        ],
      },
      {
        type: "heading",
        text: "Realistische Preisspannen",
      },
      {
        type: "list",
        items: [
          "60 Min Close-Up bei lokalem Event: 500-900 €",
          "30 Min Bühnenshow in Bayern: 800-1.500 €",
          "60 Min abendfüllende Show: 1.500-3.500 €",
          "Magic Dinner privat (3-4h, 30-50 Gäste): 1.500-4.000 € + Anfahrt",
          "Hochzeit komplett (Empfang + Dinner + Bühne): 2.000-5.000 €",
        ],
      },
      {
        type: "heading",
        text: "Was kommt zusätzlich?",
      },
      {
        type: "list",
        items: [
          "Anfahrt: km-Pauschale oder Spesen-Inklusivvereinbarung",
          "Übernachtung bei Auswärts-Engagements: 3-4-Sterne-Hotel",
          "Mehrwertsteuer (19%) bei gewerblichen Anbietern",
          "Optional: Soundtechniker, Lichtdesigner, zweiter Künstler für große Empfänge",
        ],
      },
      {
        type: "heading",
        text: "Was unterscheidet einen seriösen Anbieter?",
      },
      {
        type: "list",
        items: [
          "Transparentes Angebot mit allen Positionen ausgewiesen",
          "Schriftlicher Vertrag mit Storno-Regelung",
          "Klare Briefing-Phase vor dem Event (kostenloses Vorgespräch)",
          "Realistische Referenzen mit Telefonnummern (auf Anfrage)",
          "GoBD-konforme Rechnung mit MwSt",
          "Versicherung (Berufshaftpflicht)",
        ],
      },
    ],
    relatedTopics: ["magic-dinner", "close-up-magie"],
    relatedPages: [
      { title: "Anfrage", href: "/buchung" },
      { title: "FAQ", href: "/faq" },
    ],
  },
  {
    slug: "hochzeitszauberer",
    title: "Was ist ein Hochzeitszauberer?",
    shortDefinition:
      "Ein Hochzeitszauberer ist ein professioneller Magier, der speziell auf Hochzeiten auftritt und die typischen Wartezeiten — Sektempfang nach Trauung, Pausen zwischen den Gängen, Zeit vor dem Tanz — mit Close-Up-Magie und einer Bühnenshow überbrückt. Funktion: Eisbrecher zwischen verschiedenen Gästegruppen.",
    metaTitle:
      "Was ist ein Hochzeitszauberer? — Aufgaben & Slots | Emilian Leber",
    metaDescription:
      "Hochzeitszauberer erklärt: Was er macht, an welchen Slots der Auftritt sinnvoll ist (Sektempfang, Dinner, vor Tanz), wie er Familien-Eisbrecher wird. Über 100 Hochzeiten Erfahrung.",
    sections: [
      {
        type: "heading",
        text: "Was macht ein Hochzeitszauberer?",
      },
      {
        type: "paragraph",
        text:
          "Ein Hochzeitszauberer überbrückt die drei klassischen Wartezeiten einer Hochzeit: Sektempfang nach der Trauung, Pausen zwischen den Gängen, Zeit vor dem Tanz. Mit Close-Up-Magie wandert er zwischen den Gästegruppen und sorgt dafür, dass aus Wartezeit Programm wird.",
      },
      {
        type: "heading",
        text: "An welchen Slots sinnvoll?",
      },
      {
        type: "list",
        items: [
          "Sektempfang (nach Trauung): 45-60 Min Close-Up als Eisbrecher zwischen Familien-Zweigen",
          "Dinner (zwischen Vorspeise und Hauptgang): Tisch-zu-Tisch, 5-7 Min pro Tafel",
          "Vor dem Tanz: 20-Min-Bühnen-Highlight als emotionaler Höhepunkt",
        ],
      },
      {
        type: "heading",
        text: "Warum gerade bei Hochzeiten?",
      },
      {
        type: "paragraph",
        text:
          "Hochzeiten haben zwei Probleme: lange Wartezeiten zwischen Programmpunkten und Gäste die sich nicht kennen (Familie Bräutigam vs. Familie Braut vs. Freundeskreis). Ein Hochzeitszauberer löst beides — er füllt die Wartezeit mit Programm und ist sozialer Eisbrecher zwischen den Gruppen.",
      },
      {
        type: "heading",
        text: "Worauf achten bei der Auswahl?",
      },
      {
        type: "list",
        items: [
          "Erfahrung speziell mit Hochzeiten (min. 20 Auftritte)",
          "Persönlichkeit passt zum Brautpaar (Tonalität: elegant vs. comedy-lastig)",
          "Vorgespräch kostenlos (Briefing über Trauzeugen, Anekdoten, Tabus)",
          "Schriftlicher Vertrag mit Anzahlung + Storno-Regelung",
          "Echte Referenzen von anderen Hochzeiten (auf Anfrage)",
        ],
      },
      {
        type: "heading",
        text: "Was kostet ein Hochzeitszauberer?",
      },
      {
        type: "paragraph",
        text:
          "Reines Close-Up beim Sektempfang startet im mittleren dreistelligen Bereich. Voller Tag (Empfang + Dinner + Bühne) liegt im vier- bis fünfstelligen Bereich. Anfahrt und Übernachtung kommen je nach Entfernung dazu.",
      },
    ],
    relatedTopics: ["close-up-magie", "zauberer-buchen"],
    relatedPages: [
      { title: "Hochzeit Format-Seite", href: "/hochzeit" },
      { title: "Hochzeitszauberer Regensburg", href: "/zauberer-hochzeit/regensburg" },
    ],
  },
];

export function getWissenTopic(slug: string): WissenTopic | undefined {
  return wissenTopics.find((t) => t.slug === slug);
}
