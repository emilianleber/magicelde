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
    slug: "warum-comedy-magie-besser-funktioniert",
    title: "Warum Comedy-Magie auf Events besser funktioniert als klassische Zauberei",
    excerpt: "Klassische Zaubershow oder modernes Comedy-Magic-Erlebnis? Warum die Kombination aus Humor und Staunen auf Events einen echten Unterschied macht — und warum deine Gäste danach noch wochenlang darüber reden.",
    category: "Entertainment",
    date: "2026-03-15",
    readTime: "5 Min.",
    featured: true,
  },
  {
    slug: "zauberer-hochzeit-tipps",
    title: "Zauberer auf der Hochzeit: 7 Tipps für das perfekte Entertainment",
    excerpt: "Wann ist der beste Zeitpunkt? Wie lange sollte der Auftritt dauern? Was kostet ein Hochzeitszauberer? Die wichtigsten Tipps für Brautpaare, die ihre Hochzeit mit Magie unvergesslich machen wollen.",
    category: "Hochzeiten",
    date: "2026-03-08",
    readTime: "7 Min.",
    featured: true,
  },
  {
    slug: "firmenfeier-entertainment-ideen",
    title: "Entertainment für Firmenfeiern: Was wirklich funktioniert (und was nicht)",
    excerpt: "Band, DJ oder doch ein Zauberer? Welches Entertainment auf Business-Events den größten Effekt hat — und warum interaktive Formate klassische Unterhaltung schlagen.",
    category: "Business",
    date: "2026-02-28",
    readTime: "6 Min.",
  },
  {
    slug: "magic-dinner-konzept",
    title: "Magic Dinner: So funktioniert das exklusivste Showformat",
    excerpt: "Ein Abend, an dem Genuss und Staunen verschmelzen. Was ein Magic Dinner ist, wie es abläuft und warum es das perfekte Format für besondere Anlässe ist.",
    category: "Konzepte",
    date: "2026-02-20",
    readTime: "4 Min.",
  },
  {
    slug: "behind-the-scenes-vorbereitung",
    title: "Behind the Scenes: So bereite ich mich auf einen Auftritt vor",
    excerpt: "Was passiert, bevor die Show beginnt? Ein ehrlicher Blick hinter die Kulissen — von der ersten Idee bis zum Showtime-Moment.",
    category: "Behind the Scenes",
    date: "2026-02-12",
    readTime: "5 Min.",
  },
  {
    slug: "close-up-vs-buehnenshow",
    title: "Close-Up oder Bühnenshow? Welches Format passt zu deinem Event",
    excerpt: "Die wichtigste Frage bei der Buchung eines Zauberers: Welches Showformat ist das richtige? Ein ehrlicher Vergleich mit konkreten Empfehlungen.",
    category: "Konzepte",
    date: "2026-02-05",
    readTime: "6 Min.",
  },
];
