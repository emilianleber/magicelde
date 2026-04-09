import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/landing/PageLayout";
import BookingCTA from "@/components/landing/BookingCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    category: "Buchung & Ablauf",
    items: [
      { q: "Wie läuft eine Buchung ab?", a: "Du schickst mir eine unverbindliche Anfrage mit den wichtigsten Infos zu deinem Event. Ich melde mich innerhalb von 24 Stunden persönlich bei dir, wir besprechen alles in Ruhe und ich erstelle dir ein individuelles Angebot — komplett unverbindlich." },
      { q: "Wie weit im Voraus sollte ich buchen?", a: "So früh wie möglich — beliebte Termine, besonders an Wochenenden in der Hochzeitssaison, sind schnell vergeben. Ideal sind 3–6 Monate Vorlauf, aber auch kurzfristige Anfragen sind manchmal möglich. Einfach fragen!" },
      { q: "Kann ich dich vorab kennenlernen?", a: "Natürlich! Ich biete ein kostenloses Vorgespräch per Telefon oder Video an, damit wir uns kennenlernen, offene Fragen klären und gemeinsam das beste Konzept für dein Event entwickeln können." },
      { q: "Was passiert nach meiner Anfrage?", a: "Ich melde mich innerhalb von 24 Stunden persönlich bei dir. Wir besprechen dein Event, deine Wünsche und den Ablauf. Danach erhältst du ein maßgeschneidertes, transparentes Angebot — ohne versteckte Kosten." },
    ],
  },
  {
    category: "Shows & Konzepte",
    items: [
      { q: "Was ist der Unterschied zwischen Close-Up und Bühnenshow?", a: "Close-Up Magie passiert direkt in den Händen deiner Gäste — ideal für Empfänge und Networking. Die Bühnenshow ist ein durchkomponierter Programmpunkt mit Dramaturgie, Comedy und Wow-Effekten für alle Gäste gleichzeitig. Beides lässt sich auch kombinieren." },
      { q: "Wie lange dauert ein Auftritt?", a: "Das hängt vom Format ab: Close-Up typischerweise 30–90 Minuten, Bühnenshows 15–60 Minuten. Wir finden gemeinsam die perfekte Länge für deinen Ablauf." },
      { q: "Kannst du die Show an unser Event anpassen?", a: "Absolut — und das ist sogar mein Standard. Jede Show wird individuell auf euren Anlass, eure Gäste und euren Ablauf abgestimmt. Auch die Einbindung von Firmeninhalten, persönlichen Botschaften oder thematischen Elementen ist möglich." },
      { q: "Was ist ein Magic Dinner?", a: "Ein Magic Dinner verbindet ein mehrgängiges Dinner mit interaktiver Tischmagie. Zwischen den Gängen komme ich zu jedem Tisch und zaubere direkt in den Händen eurer Gäste — persönlich, witzig und absolut verblüffend. Die Wartezeit zwischen den Gängen wird zum Highlight." },
      { q: "Was macht dich als Comedy-Zauberer anders?", a: "Meine Shows verbinden verblüffende Zauberkunst mit cleverem Humor. Das bedeutet: Dein Publikum staunt UND lacht. Kein trockener Vorführeffekt, sondern echtes Entertainment — locker, charmant und immer auf Augenhöhe." },
    ],
  },
  {
    category: "Preise & Kosten",
    items: [
      { q: "Was kostet ein Auftritt?", a: "Die Kosten hängen vom Format, der Dauer und dem Anlass ab. Für Hochzeiten beginnen meine Pakete ab 395€. Nach deiner Anfrage erstelle ich dir ein transparentes, individuelles Angebot — keine Überraschungen, keine versteckten Kosten." },
      { q: "Gibt es versteckte Kosten?", a: "Nein. Mein Angebot beinhaltet alle abgesprochenen Leistungen. Bei längeren Anfahrten kann eine Fahrtkostenpauschale anfallen, die ich aber immer vorab transparent kommuniziere." },
      { q: "Muss ich eine Anzahlung leisten?", a: "Zur Terminreservierung bitte ich um eine Anzahlung — so ist dein Termin fest gesichert. Die Höhe und alle Details besprechen wir persönlich." },
    ],
  },
  {
    category: "Technik & Logistik",
    items: [
      { q: "Brauche ich spezielle Technik?", a: "Für Close-Up brauche ich nichts — nur eure Gäste. Für die Bühnenshow bringe ich alles Nötige mit. Bei größeren Events kann ich auch professionelle Ton- und Lichttechnik stellen oder mich an eure vorhandene Technik anpassen." },
      { q: "Wie viel Platz braucht die Bühnenshow?", a: "Eine Fläche von ca. 3×2 Metern reicht völlig aus. Alles Weitere klären wir persönlich — ich bin flexibel und passe mich an eure Location an." },
      { q: "Wo trittst du auf?", a: "Überall! Mein Schwerpunkt liegt in Bayern, Baden-Württemberg und ganz Süddeutschland, aber ich bin deutschlandweit und auf Wunsch auch international buchbar." },
    ],
  },
];

const FAQItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-6 text-left group">
        <h3 className="font-sans text-base md:text-lg font-medium text-foreground pr-8 group-hover:text-accent transition-colors">{q}</h3>
        <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-[500px] pb-6" : "max-h-0"}`}>
        <p className="text-detail max-w-2xl">{a}</p>
      </div>
    </div>
  );
};

const FAQPage = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <>
      <Helmet>
        <title>FAQ – Häufige Fragen | Emilian Leber Zauberer</title>
        <meta name="description" content="Häufige Fragen zu Buchung, Shows, Preisen und Technik. Alles, was du über Zauberer Emilian Leber und seine Shows wissen musst." />
        <link rel="canonical" href="https://www.magicel.de/faq" />
        <meta property="og:title" content="FAQ – Häufige Fragen | Emilian Leber Zauberer" />
        <meta property="og:description" content="Häufige Fragen zu Buchung, Shows, Preisen und Technik. Alles, was du über Zauberer Emilian Leber und seine Shows wissen musst." />
        <meta property="og:url" content="https://www.magicel.de/faq" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.magicel.de/og-image.jpg" />
        <meta property="og:locale" content="de_DE" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FAQ – Häufige Fragen | Emilian Leber Zauberer" />
        <meta name="twitter:description" content="Häufige Fragen zu Buchung, Shows, Preisen und Technik. Alles, was du über Zauberer Emilian Leber und seine Shows wissen musst." />
        <meta name="twitter:image" content="https://www.magicel.de/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.flatMap(cat => cat.items.map(item => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.a
            }
          })))
        })}</script>
      </Helmet>
      <PageLayout>
      <section className="relative min-h-[60vh] flex flex-col justify-center overflow-hidden">
        <div className="container px-6 pt-28 pb-16 md:pt-36 md:pb-24">
          <div className="max-w-5xl mx-auto text-center">
            <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <span className="badge-accent mb-8 inline-flex">FAQ</span>
            </div>
            <h1 className="headline-hero mb-8 opacity-0 animate-fade-up text-foreground" style={{ animationDelay: "0.3s" }}>
              Häufige Fragen.
            </h1>
            <p className="text-body max-w-2xl mx-auto opacity-0 animate-fade-up" style={{ animationDelay: "0.5s" }}>
              Alles, was du wissen musst — kurz, klar und ehrlich beantwortet.
              Falls deine Frage nicht dabei ist: Schreib mir einfach!
            </p>
          </div>
        </div>
      </section>

      {faqs.map((cat, ci) => (
        <section key={cat.category} className={`${ci % 2 === 0 ? "" : "section-alt"} py-16 md:py-24`} ref={ci === 0 ? ref : undefined}>
          <div className="container px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className={`font-display text-2xl md:text-3xl font-bold text-foreground mb-8 ${ci === 0 && isVisible ? "animate-fade-up" : ""}`}>{cat.category}</h2>
              <div>
                {cat.items.map((item) => (
                  <FAQItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      <BookingCTA headline={"Noch Fragen?"} subline="Schreib mir einfach — ich antworte persönlich und innerhalb von 24 Stunden." buttonText="Jetzt Kontakt aufnehmen" />
    </PageLayout>
    </>
  );
};

export default FAQPage;
