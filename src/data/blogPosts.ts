export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "warum-zauberkunst-event-unvergesslich-macht",
    title: "Warum Zauberkunst ein Event unvergesslich macht — und was dahinter steckt",
    excerpt: "Events gibt es viele. Aber nur wenige bleiben wirklich im Gedächtnis. Warum moderne Zauberkunst der entscheidende Faktor ist, der ein gutes Event in ein unvergessliches verwandelt.",
    category: "Entertainment",
    date: "2026-03-20",
    readTime: "8 Min.",
    featured: true,
  },
  {
    slug: "magic-dinner-was-gaeste-begeistert",
    title: "Magic Dinner: Was Gäste wirklich begeistert — und warum es mehr ist als Essen mit Show",
    excerpt: "Ein Magic Dinner klingt simpel: Essen + Zauberei. Doch das Format ist viel mehr als die Summe seiner Teile. Ein tiefer Blick hinter das Konzept, das immer mehr Veranstalter überzeugt.",
    category: "Konzepte",
    date: "2026-03-15",
    readTime: "7 Min.",
    featured: true,
  },
  {
    slug: "close-up-oder-buehnenshow-welches-konzept",
    title: "Close-Up oder Bühnenshow — welches Konzept passt zu welchem Anlass?",
    excerpt: "Die wichtigste Entscheidung bei der Buchung eines Zauberers: Welches Showformat ist das richtige? Ein ehrlicher Vergleich mit konkreten Empfehlungen für jeden Eventtyp.",
    category: "Ratgeber",
    date: "2026-03-10",
    readTime: "6 Min.",
    featured: true,
  },
  {
    slug: "warum-comedy-magie-besser-funktioniert",
    title: "Warum Comedy-Magie auf Events besser funktioniert als klassische Zauberei",
    excerpt: "Klassische Zaubershow oder modernes Comedy-Magic-Erlebnis? Warum die Kombination aus Humor und Staunen auf Events einen echten Unterschied macht.",
    category: "Entertainment",
    date: "2026-03-08",
    readTime: "5 Min.",
  },
  {
    slug: "zauberer-hochzeit-tipps",
    title: "Zauberer auf der Hochzeit: 7 Tipps für das perfekte Entertainment",
    excerpt: "Wann ist der beste Zeitpunkt? Wie lange sollte der Auftritt dauern? Die wichtigsten Tipps für Brautpaare, die ihre Hochzeit mit Magie unvergesslich machen wollen.",
    category: "Hochzeiten",
    date: "2026-02-28",
    readTime: "7 Min.",
  },
  {
    slug: "firmenfeier-entertainment-ideen",
    title: "Entertainment für Firmenfeiern: Was wirklich funktioniert (und was nicht)",
    excerpt: "Band, DJ oder doch ein Zauberer? Welches Entertainment auf Business-Events den größten Effekt hat — und warum interaktive Formate klassische Unterhaltung schlagen.",
    category: "Business",
    date: "2026-02-20",
    readTime: "6 Min.",
  },
];
