import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/landing/PageLayout";
import BookingCTA from "@/components/landing/BookingCTA";
import { blogPosts } from "@/data/blogPosts";
import { ArrowLeft } from "lucide-react";
import heroImg from "@/assets/hero-magic.jpg";
import stageImg from "@/assets/stage-show.jpg";
import closeupImg from "@/assets/closeup.jpg";
import dinnerImg from "@/assets/hero-dinner.jpg";
import audienceImg from "@/assets/staunen.jpg";

const blogImages: Record<string, string> = {
  "warum-zauberkunst-event-unvergesslich-macht": audienceImg,
  "magic-dinner-was-gaeste-begeistert": dinnerImg,
  "close-up-oder-buehnenshow-welches-konzept": closeupImg,
  "warum-comedy-magie-besser-funktioniert": heroImg,
  "zauberer-hochzeit-tipps": stageImg,
  "firmenfeier-entertainment-ideen": closeupImg,
};

const blogContent: Record<string, string[]> = {
  "warum-zauberkunst-event-unvergesslich-macht": [
    "Es gibt Events, die gut sind. Professionell organisiert, schöne Location, gutes Essen. Und dann gibt es Events, über die man noch Wochen später spricht. Der Unterschied? Ein Erlebnis, das Emotionen weckt.",
    "Moderne Zauberkunst ist genau dieses Erlebnis. Nicht der verstaubte Zylinder-und-Kaninchen-Klischee-Moment, sondern eine interaktive, humorvolle und verblüffende Performance, die Menschen verbindet.",
    "Warum Staunen so mächtig ist: Neurowissenschaftler haben herausgefunden, dass Momente des Staunens — sogenannte ‚Awe-Momente' — besonders tiefe Erinnerungen erzeugen. Wenn unser Gehirn etwas erlebt, das es nicht erklären kann, speichert es diesen Moment mit besonderer Intensität.",
    "Genau das passiert bei guter Zauberkunst. Dein Gast hält eine Karte in der Hand, die plötzlich verschwindet. Oder eine geliehene Münze taucht im unmöglichsten Moment an einem unmöglichen Ort auf. Das Gehirn sagt: ‚Das kann nicht sein' — und genau deshalb vergisst man es nie.",
    "Der soziale Faktor: Zauberkunst passiert nicht im Vakuum. Sie passiert zwischen Menschen. Close-Up Magie, also Magie direkt bei den Gästen, schafft sofort Gesprächsstoff. ‚Hast du das gesehen?!' — diesen Satz hört man auf Events mit Zauberer ständig.",
    "Für Firmenfeiern bedeutet das: Networking passiert automatisch. Für Hochzeiten: Gäste, die sich nicht kennen, haben sofort ein gemeinsames Erlebnis. Für Geburtstage: Der Abend bekommt einen klaren Höhepunkt.",
    "Die Emotionskombination macht den Unterschied: Comedy-Magie — also die Verbindung aus Humor und Verblüffung — erzeugt zwei Emotionen gleichzeitig: Lachen und Staunen. Studien zeigen, dass Erlebnisse mit multiplen positiven Emotionen bis zu dreimal länger im Gedächtnis bleiben.",
    "Das ist der Grund, warum ein guter Zauberer auf einem Event mehr Eindruck hinterlässt als eine Band, ein DJ oder ein Redner. Nicht weil diese schlecht wären — sondern weil Magie eine einzigartige emotionale Tiefe erzeugt.",
    "Was einen guten Event-Zauberer ausmacht: Er passt sich an. An die Gruppe, die Stimmung, den Anlass. Er spürt, wann der richtige Moment ist. Er unterhält, ohne aufzudrängen. Und er schafft Erinnerungen, die bleiben.",
    "Fazit: Wenn du ein Event planst und willst, dass es nicht nur gut, sondern unvergesslich wird — dann investiere in ein Erlebnis. Zauberkunst ist nicht nur Unterhaltung. Es ist der emotionale Anker, an den sich deine Gäste noch Jahre erinnern werden.",
  ],
  "magic-dinner-was-gaeste-begeistert": [
    "Ein Magic Dinner klingt auf den ersten Blick simpel: Man geht essen, und zwischendurch wird gezaubert. Doch wer ein Magic Dinner erlebt hat, weiß: Es ist eine völlig andere Erfahrung als ein normales Dinner oder eine normale Zaubershow.",
    "Das Konzept: Ein mehrgängiges Dinner, bei dem zwischen den Gängen ein Zauberer zu jedem Tisch kommt. Die Magie passiert direkt in den Händen der Gäste — persönlich, interaktiv, absolut verblüffend. Kein Bühnenabstand, keine Zuschauer-Performer-Trennung.",
    "Warum das Format so gut funktioniert: Die genialste Idee beim Magic Dinner ist die Nutzung der Wartezeit. Zwischen den Gängen passiert normalerweise nichts — man wartet, plaudert, schaut aufs Handy. Beim Magic Dinner wird genau diese Zeit zum Highlight.",
    "Die Psychologie dahinter: Wartezeit fühlt sich kürzer an, wenn sie mit positiven Erlebnissen gefüllt wird. Die Gäste sind bereits in einer guten Stimmung (gutes Essen, angenehme Gesellschaft) — und die Magie verstärkt diese positive Grundstimmung exponentiell.",
    "Was Gäste wirklich begeistert: Es ist nicht der einzelne Trick. Es ist die Kombination aus Nähe, Überraschung und Interaktion. Die Magie passiert buchstäblich in den eigenen Händen. Man ist nicht Zuschauer, sondern Beteiligter. Und genau das macht den Unterschied.",
    "Das Tischerlebnis: Jeder Tisch bekommt sein eigenes Programm. Keine Wiederholungen. Die Gäste an Tisch 3 erleben etwas anderes als die an Tisch 7. Und danach tauschen sie sich aus: ‚Was hat er bei euch gemacht?' — ein perfekter Gesprächsstarter.",
    "Für wen eignet sich ein Magic Dinner? Firmendinner und Incentives, bei denen man Kunden beeindrucken will. Private Feiern, die besonders sein sollen. Hochzeitsdinners, bei denen die Gäste ein gemeinsames Erlebnis brauchen. Teamevents, die anders sein sollen als alle anderen.",
    "Der Mehrwert gegenüber einer klassischen Show: Bei einer Bühnenshow sitzt das Publikum passiv da und schaut zu. Beim Magic Dinner ist jeder Gast Teil des Geschehens. Die emotionale Wirkung ist dadurch um ein Vielfaches stärker.",
    "Fazit: Ein Magic Dinner ist nicht einfach ‚Essen plus Zauberei'. Es ist ein durchinszeniertes Erlebnis, bei dem Genuss, Staunen, Lachen und Verbindung zu einem unvergesslichen Abend verschmelzen. Und genau deshalb buchen es immer mehr Veranstalter.",
  ],
  "close-up-oder-buehnenshow-welches-konzept": [
    "Du planst ein Event und überlegst, einen Zauberer zu buchen. Aber welches Format ist das richtige? Close-Up Magie oder Bühnenshow? Die Antwort hängt von deinem Event ab — und beide Formate haben ihre eigenen Stärken.",
    "Close-Up Magie — das Prinzip: Close-Up Magie (auch Walk-Around oder Tischzauberei genannt) passiert direkt bei den Gästen. Der Zauberer kommt zu den Tischen, zu kleinen Gruppen oder mischt sich beim Empfang unter die Gäste. Die Magie geschieht hautnah — in den Händen der Zuschauer.",
    "Stärken von Close-Up: Intimität und Nähe erzeugen eine besonders starke emotionale Wirkung. Perfekt als Eisbrecher bei Empfängen und Networking-Events. Flexibel einsetzbar — kein Bühnenbedarf, keine Technik nötig. Funktioniert bei jeder Gruppengröße, von 10 bis 500 Gästen.",
    "Wann Close-Up wählen? Bei Empfängen und Cocktailstunden. Auf Hochzeiten (Sektempfang ist der Klassiker). Bei Firmenveranstaltungen mit Networking-Charakter. Auf Messen und Promotion-Events. Bei Dinners zwischen den Gängen (Magic Dinner).",
    "Bühnenshow — das Prinzip: Eine Bühnenshow ist eine inszenierte Performance für das gesamte Publikum gleichzeitig. Mit Dramaturgie, Spannungsbogen, Comedy und einem Finale, das im Gedächtnis bleibt. Alle erleben denselben Moment — ein kollektives Erlebnis.",
    "Stärken der Bühnenshow: Klarer Programmpunkt im Ablauf — einfach planbar. Alle Gäste erleben denselben Wow-Moment. Stärkere Dramaturgie mit Höhepunkten und Finale möglich. Ideal als Abend-Highlight oder Überraschungsmoment.",
    "Wann Bühnenshow wählen? Bei Firmen-Galas und Jubiläumsfeiern. Als Programm-Highlight bei Hochzeiten. Auf Weihnachtsfeiern. Bei Award-Verleihungen als Rahmenprogramm. Bei Veranstaltungen mit 50+ Gästen.",
    "Die Profi-Empfehlung — Kombiniert beides! Die beste Lösung für viele Events: Close-Up beim Empfang als Eisbrecher und Stimmungsmacher. Bühnenshow als Höhepunkt des Abends für alle. So bekommt jeder Gast sein persönliches Erlebnis UND den großen gemeinsamen Moment.",
    "Kosten und Dauer im Vergleich: Close-Up: typischerweise 30–90 Minuten, ideal für Empfang und Dinner. Bühnenshow: 15–60 Minuten, perfekt als zentraler Programmpunkt. Kombination: Das Rundum-Sorglos-Paket für Events, die keine Kompromisse machen.",
    "Fazit: Es gibt kein ‚besser' oder ‚schlechter' — nur ‚passend' oder ‚nicht passend'. Die richtige Wahl hängt von eurem Anlass, eurer Gästezahl und eurem Ablauf ab. Im Zweifel: Fragt mich. Ich berate euch ehrlich und finde das perfekte Format für euer Event.",
  ],
  "warum-comedy-magie-besser-funktioniert": [
    "Wenn du an einen Zauberer denkst, hast du wahrscheinlich ein bestimmtes Bild im Kopf: Zylinder, Kaninchen, eine geheimnisvolle Atmosphäre. Das ist klassische Magie. Und sie hat ihre Berechtigung. Aber auf modernen Events funktioniert ein anderer Ansatz deutlich besser: Comedy-Magie.",
    "Comedy-Magie verbindet verblüffende Zauberkunst mit cleverem Humor. Das bedeutet: Dein Publikum staunt nicht nur — es lacht gleichzeitig. Und genau diese Kombination ist der Gamechanger, weil sie eine emotionale Doppelwirkung erzeugt.",
    "Stell dir vor: Ein Gast hält eine Karte in der Hand. Er ist sich absolut sicher, welche es ist. Und dann — passiert etwas Unmögliches. Aber statt einer mysteriösen Stille bricht der ganze Tisch in Gelächter aus, weil die Art, wie es passiert ist, einfach genial witzig war.",
    "Das ist der Moment, der Menschen verbindet. Nicht der Trick selbst — sondern die gemeinsame Emotion. Lachen und Staunen gleichzeitig.",
    "Warum funktioniert das auf Events so gut? Drei Gründe: Es bricht das Eis sofort. Es ist für jedes Publikum geeignet. Und es bleibt in Erinnerung.",
    "Wenn du also ein Event planst und überlegst, welches Entertainment den größten Effekt hat: Setz auf die Kombination aus Staunen und Lachen. Das ist Comedy-Magie.",
  ],
  "zauberer-hochzeit-tipps": [
    "Ihr plant eure Hochzeit und überlegt, ob ein Zauberer das Richtige ist? Hier sind 7 ehrliche Tipps, die euch bei der Entscheidung helfen.",
    "Tipp 1: Der beste Zeitpunkt ist der Sektempfang. Tipp 2: Plant 30–60 Minuten ein. Tipp 3: Bucht frühzeitig. Tipp 4: Achtet auf den Stil. Tipp 5: Macht es zur Überraschung. Tipp 6: Kombiniert Close-Up und Bühne. Tipp 7: Budget realistisch einplanen.",
    "Ein professioneller Hochzeitszauberer kostet je nach Umfang zwischen 395€ und 749€+. Es ist das Entertainment, über das eure Gäste noch Monate später reden werden.",
  ],
  "firmenfeier-entertainment-ideen": [
    "Die jährliche Firmenfeier steht an und ihr sucht nach Entertainment, das wirklich etwas bewirkt?",
    "Das Problem mit klassischem Entertainment: Band oder DJ kennt jeder. Redner inspirieren kurz. Was fehlt? Ein Format, das Menschen wirklich zusammenbringt.",
    "Magie als Networking-Booster: Magie ist der effektivste Gesprächsstarter, der existiert.",
    "Der ROI von gutem Entertainment: Mitarbeiter, die einen unvergesslichen Abend hatten, fühlen sich wertgeschätzt. Kunden, die beeindruckt wurden, kommen gerne wieder.",
  ],
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return <Navigate to="/blog" replace />;

  const content = blogContent[post.slug] || [];
  const image = blogImages[post.slug] || heroImg;

  const description = post.excerpt.length > 160 ? post.excerpt.substring(0, 157) + "..." : post.excerpt;

  return (
    <>
    <Helmet>
      <title>{post.title} | Emilian Leber Magazin</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={`https://www.magicel.de/magazin/${slug}`} />
      <meta property="og:title" content={post.title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={`https://www.magicel.de/magazin/${slug}`} />
      <meta property="og:type" content="article" />
      <meta property="og:image" content="https://www.magicel.de/og-image.jpg" />
      <meta property="og:locale" content="de_DE" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={post.title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://www.magicel.de/og-image.jpg" />
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title,
        "description": description,
        "datePublished": post.date,
        "author": { "@type": "Person", "name": "Emilian Leber" },
        "publisher": { "@type": "Organization", "name": "MagicEL Entertainment", "url": "https://www.magicel.de" },
        "url": `https://www.magicel.de/magazin/${slug}`
      })}</script>
    </Helmet>
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
                <span className="badge-gradient text-[10px]">{post.category}</span>
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
                    <span className="badge-gradient text-[10px] mb-4 inline-flex">{p.category}</span>
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
    </>
  );
};

export default BlogPost;
