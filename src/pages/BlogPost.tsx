import { useParams, Navigate, Link } from "react-router-dom";
import PageLayout from "@/components/landing/PageLayout";
import BookingCTA from "@/components/landing/BookingCTA";
import { blogPosts } from "@/data/blogPosts";
import { ArrowLeft } from "lucide-react";
import heroImg from "@/assets/hero-magic.jpg";
import stageImg from "@/assets/stage-show.jpg";
import closeupImg from "@/assets/closeup-magic.jpg";

const blogImages: Record<string, string> = {
  "warum-comedy-magie-besser-funktioniert": heroImg,
  "zauberer-hochzeit-tipps": stageImg,
  "firmenfeier-entertainment-ideen": closeupImg,
  "magic-dinner-konzept": heroImg,
  "behind-the-scenes-vorbereitung": stageImg,
  "close-up-vs-buehnenshow": closeupImg,
};

const blogContent: Record<string, string[]> = {
  "warum-comedy-magie-besser-funktioniert": [
    "Wenn du an einen Zauberer denkst, hast du wahrscheinlich ein bestimmtes Bild im Kopf: Zylinder, Kaninchen, eine geheimnisvolle Atmosphäre. Das ist klassische Magie. Und sie hat ihre Berechtigung. Aber auf modernen Events funktioniert ein anderer Ansatz deutlich besser: Comedy-Magie.",
    "Comedy-Magie verbindet verblüffende Zauberkunst mit cleverem Humor. Das bedeutet: Dein Publikum staunt nicht nur — es lacht gleichzeitig. Und genau diese Kombination ist der Gamechanger, weil sie eine emotionale Doppelwirkung erzeugt.",
    "Stell dir vor: Ein Gast hält eine Karte in der Hand. Er ist sich absolut sicher, welche es ist. Und dann — passiert etwas Unmögliches. Aber statt einer mysteriösen Stille bricht der ganze Tisch in Gelächter aus, weil die Art, wie es passiert ist, einfach genial witzig war.",
    "Das ist der Moment, der Menschen verbindet. Nicht der Trick selbst — sondern die gemeinsame Emotion. Lachen und Staunen gleichzeitig. Das erzeugt eine Atmosphäre, die kein DJ, keine Band und kein Keynote-Speaker reproduzieren kann.",
    "Warum funktioniert das auf Events so gut? Drei Gründe:",
    "1. Es bricht das Eis sofort. Gerade auf Firmenfeiern oder Hochzeiten, wo sich nicht alle kennen, ist Comedy-Magie der ultimative Gesprächsstarter. Nach einem gemeinsamen Staunen-und-Lachen-Moment reden Menschen miteinander — garantiert.",
    "2. Es ist für JEDES Publikum geeignet. Humor und Staunen sind universelle Sprachen. Vom CEO bis zum Azubi, vom Brautpaar bis zum Großonkel — Comedy-Magie funktioniert generationsübergreifend.",
    "3. Es bleibt in Erinnerung. Wochen nach dem Event erinnern sich deine Gäste nicht an das Catering. Sie erinnern sich an den Moment, der sie sprachlos UND fröhlich gemacht hat.",
    "Natürlich gibt es einen wichtigen Unterschied: Comedy-Magie bedeutet nicht, dass die Magie weniger verblüffend ist. Im Gegenteil — der Humor verstärkt die Wirkung des Unmöglichen. Er senkt die Hemmschwelle und öffnet die Menschen für das Staunen.",
    "Wenn du also ein Event planst und überlegst, welches Entertainment den größten Effekt hat: Setz auf die Kombination aus Staunen und Lachen. Das ist Comedy-Magie. Und genau das ist mein Ding.",
  ],
  "zauberer-hochzeit-tipps": [
    "Ihr plant eure Hochzeit und überlegt, ob ein Zauberer das Richtige ist? Hier sind 7 ehrliche Tipps, die euch bei der Entscheidung helfen — von einem, der schon auf hunderten Hochzeiten gezaubert hat.",
    "Tipp 1: Der beste Zeitpunkt ist der Sektempfang. Wenn sich eure Gäste nach der Zeremonie treffen, ist Close-Up Magie der perfekte Eisbrecher. Die Stimmung ist gut, alle sind aufgedreht — und ein Zauberer bringt sie sofort ins Gespräch.",
    "Tipp 2: Plant 30–60 Minuten ein. Weniger ist mehr. Eine kompakte, intensive Performance wirkt stärker als stundenlange Hintergrundbeschallung. Bei Close-Up reichen 30–45 Minuten, für eine Bühnenshow 15–20 Minuten.",
    "Tipp 3: Bucht frühzeitig. Beliebte Termine in der Hochzeitssaison (Mai bis September) sind schnell vergeben. Idealerweise 6 Monate im Voraus anfragen.",
    "Tipp 4: Achtet auf den Stil. Euer Zauberer sollte zu euch passen. Modern und humorvoll, wenn eure Hochzeit locker ist. Elegant und diskret, wenn ihr es klassischer mögt. Fragt nach Videos von echten Auftritten.",
    "Tipp 5: Macht es zur Überraschung. Der wow-Effekt ist am größten, wenn eure Gäste nicht damit rechnen. Plant den Zauberer als Überraschungselement — die Reaktionen werden unbezahlbar sein.",
    "Tipp 6: Close-Up für den Empfang, Bühne fürs Abendprogramm. Die ideale Kombination: Während des Empfangs Walk-Around Magie direkt bei den Gästen, und als Highlight des Abends eine kurze Bühnenshow für alle.",
    "Tipp 7: Budget realistisch einplanen. Ein professioneller Hochzeitszauberer kostet je nach Umfang zwischen 395€ und 749€+. Das klingt viel? Bedenkt: Es ist das Entertainment, über das eure Gäste noch Monate später reden werden.",
  ],
  "firmenfeier-entertainment-ideen": [
    "Die jährliche Firmenfeier steht an und ihr sucht nach Entertainment, das wirklich etwas bewirkt? Dann seid ihr hier richtig. Denn die meisten Entertainment-Ideen für Firmenfeiern sind gut gemeint — aber nicht gut gemacht.",
    "Das Problem mit klassischem Entertainment: Band oder DJ kennt jeder. Redner inspirieren kurz, werden aber schnell vergessen. Teambuilding-Events fühlen sich oft gezwungen an. Was fehlt? Ein Format, das Menschen wirklich zusammenbringt.",
    "Magie als Networking-Booster: Stellt euch vor, euer Vertriebsteam steht mit der IT-Abteilung zusammen. Normalerweise herrscht Schweigen. Dann kommt ein Zauberer dazu und vollbringt etwas Unmögliches — direkt in ihren Händen. Plötzlich lachen und reden sie miteinander.",
    "Das ist kein Zufall. Magie ist der effektivste Gesprächsstarter, der existiert. Weil sie eine gemeinsame emotionale Erfahrung schafft — und Menschen, die zusammen gestaunt und gelacht haben, reden danach auch über andere Dinge miteinander.",
    "Was wirklich funktioniert auf Firmenfeiern: Close-Up Magie während des Empfangs — bringt Menschen ins Gespräch. Eine kurze Bühnenshow als Höhepunkt — unterhält alle gleichzeitig. Individuelle Einbindung der Firmenthemen — zeigt Wertschätzung.",
    "Der ROI von gutem Entertainment: Mitarbeiter, die einen unvergesslichen Abend hatten, fühlen sich wertgeschätzt. Kunden, die beeindruckt wurden, kommen gerne wieder. Das Event wird zum Gesprächsthema — wochenlang.",
  ],
  "magic-dinner-konzept": [
    "Ein Magic Dinner ist mehr als ein Abendessen mit Zaubertricks. Es ist ein durchinszeniertes Erlebnis, bei dem kulinarischer Genuss und verblüffende Magie verschmelzen.",
    "Das Konzept: Zwischen den Gängen kommt der Zauberer zu jedem Tisch. Die Magie passiert direkt in den Händen der Gäste — persönlich, interaktiv und absolut verblüffend.",
    "Warum das funktioniert: Die Wartezeit zwischen den Gängen wird zum Highlight. Statt auf das Essen zu warten, erleben die Gäste Momente, über die sie den Rest des Abends reden.",
    "Für wen ist ein Magic Dinner geeignet? Firmendinner, Incentives, private Feiern, Hochzeitsessen — überall dort, wo Menschen an Tischen sitzen und ein besonderes Erlebnis verdienen.",
  ],
  "behind-the-scenes-vorbereitung": [
    "Viele denken, Zauberer improvisieren einfach drauf los. Die Wahrheit sieht anders aus.",
    "Jeder Auftritt beginnt Wochen vorher. Ich erfahre alles über das Event: Wer kommt? Was ist der Anlass? Wie ist die Location? Was ist die Stimmung? All das fließt in meine Vorbereitung ein.",
    "Dann wird das Programm zusammengestellt. Nicht aus einem Standardkatalog, sondern individuell. Welche Effekte passen zur Gruppe? Welcher Humor funktioniert? Wie lang sollte was sein?",
    "Am Tag selbst komme ich früh. Ich schaue mir die Location an, spreche mit dem Veranstalter, checke den Ablauf. Dann warte ich auf den richtigen Moment.",
    "Und dann: Showtime. Alles, was die Gäste sehen, wirkt spontan und natürlich. Aber hinter jedem Moment stecken Stunden an Vorbereitung, Jahre an Erfahrung und eine Leidenschaft, die niemals nachlässt.",
  ],
  "close-up-vs-buehnenshow": [
    "Die wichtigste Frage bei der Buchung eines Zauberers: Welches Format passt? Close-Up oder Bühne? Hier ist ein ehrlicher Vergleich.",
    "Close-Up Magie: Passiert direkt bei den Gästen. An Tischen, in kleinen Gruppen, beim Empfang. Die Wirkung ist intim und persönlich — die Magie geschieht in den Händen der Gäste selbst.",
    "Vorteile Close-Up: Perfekter Eisbrecher, flexibel einsetzbar, funktioniert bei jeder Gruppengröße, kein technischer Aufwand nötig.",
    "Bühnenshow: Eine inszenierte Performance für alle gleichzeitig. Mit Dramaturgie, Comedy, Spannungsbogen und einem Finale, das Standing Ovations garantiert.",
    "Vorteile Bühnenshow: Alle erleben denselben Moment, stärkere Dramaturgie möglich, klarer Programmpunkt im Ablauf, ideal als Highlight.",
    "Meine Empfehlung: Kombiniert beides! Close-Up beim Empfang als Eisbrecher, Bühnenshow als Highlight des Abends. So bekommen eure Gäste das volle Erlebnis.",
  ],
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return <Navigate to="/blog" replace />;

  const content = blogContent[post.slug] || [];
  const image = blogImages[post.slug] || heroImg;

  return (
    <PageLayout>
      <article>
        {/* Hero */}
        <section className="pt-28 pb-8 md:pt-36">
          <div className="container px-6">
            <div className="max-w-3xl mx-auto">
              <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors mb-8">
                <ArrowLeft className="w-4 h-4" /> Zurück zum Magazin
              </Link>
              <div className="flex items-center gap-3 mb-6">
                <span className="badge-accent text-[10px]">{post.category}</span>
                <span className="font-sans text-xs text-muted-foreground">{post.readTime}</span>
                <span className="font-sans text-xs text-muted-foreground">·</span>
                <span className="font-sans text-xs text-muted-foreground">
                  {new Date(post.date).toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" })}
                </span>
              </div>
              <h1 className="headline-section text-foreground mb-8">{post.title}</h1>
              <p className="text-body mb-12">{post.excerpt}</p>
            </div>
          </div>
        </section>

        {/* Image */}
        <section className="pb-16">
          <div className="container px-6">
            <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden">
              <img src={image} alt={post.title} className="w-full h-[300px] md:h-[480px] object-cover" />
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="pb-24">
          <div className="container px-6">
            <div className="max-w-3xl mx-auto space-y-6">
              {content.map((paragraph, i) => (
                <p key={i} className="text-detail text-base md:text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="section-large section-alt">
          <div className="container px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="headline-sub text-foreground">Weitere Artikel.</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {blogPosts.filter((p) => p.slug !== slug).slice(0, 2).map((p) => (
                <Link key={p.slug} to={`/blog/${p.slug}`} className="group">
                  <div className="rounded-3xl bg-background p-8 hover:shadow-lg transition-shadow duration-300">
                    <span className="badge-accent text-[10px] mb-4 inline-flex">{p.category}</span>
                    <h3 className="font-display text-lg font-bold text-foreground mb-3 group-hover:text-accent transition-colors">{p.title}</h3>
                    <p className="text-detail text-sm line-clamp-2">{p.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </article>

      <BookingCTA headline={"Lust auf mehr?"} subline="Erlebe Comedy-Magie live auf deinem Event — oder lies weiter im Magazin." />
    </PageLayout>
  );
};

export default BlogPost;
