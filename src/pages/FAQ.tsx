import PageLayout from "@/components/landing/PageLayout";
import BookingCTA from "@/components/landing/BookingCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    category: "Buchung & Ablauf",
    items: [
      { q: "Wie läuft eine Buchung ab?", a: "Du schickst mir eine unverbindliche Anfrage mit den wichtigsten Infos zu deinem Event. Ich melde mich innerhalb von 24 Stunden bei dir, wir besprechen alles persönlich und ich erstelle dir ein individuelles Angebot." },
      { q: "Wie weit im Voraus sollte ich buchen?", a: "So früh wie möglich — beliebte Termine sind schnell vergeben. Ideal sind 3–6 Monate Vorlauf, aber auch kurzfristige Anfragen sind oft möglich." },
      { q: "Kann ich dich vorab kennenlernen?", a: "Natürlich! Ich biete ein kostenloses Vorgespräch per Telefon oder Video an, damit wir uns kennenlernen und offene Fragen klären können." },
    ],
  },
  {
    category: "Shows & Konzepte",
    items: [
      { q: "Was ist der Unterschied zwischen Close-Up und Bühnenshow?", a: "Close-Up Magie passiert direkt in den Händen deiner Gäste — ideal für Empfänge und Networking. Die Bühnenshow ist ein inszenierter Programmpunkt für alle Gäste gleichzeitig." },
      { q: "Wie lange dauert ein Auftritt?", a: "Das hängt vom gewählten Konzept ab — von 15 Minuten Bühnenshow bis zu mehreren Stunden Walking Act. Wir finden gemeinsam das perfekte Format." },
      { q: "Kannst du die Show an unser Event anpassen?", a: "Absolut. Jede Show wird individuell auf euren Anlass, eure Gäste und euren Ablauf abgestimmt. Auch die Einbindung von Firmeninhalten oder persönlichen Elementen ist möglich." },
      { q: "Was ist ein Magic Dinner?", a: "Ein Magic Dinner verbindet ein mehrgängiges Dinner mit interaktiver Tischmagie. Zwischen den Gängen wird gezaubert — direkt am Tisch, persönlich und exklusiv." },
    ],
  },
  {
    category: "Preise & Kosten",
    items: [
      { q: "Was kostet ein Auftritt?", a: "Die Kosten hängen vom Format, der Dauer und dem Anlass ab. Grundsätzlich beginnen Auftritte ab 395€. Nach deiner Anfrage erstelle ich dir ein transparentes, individuelles Angebot." },
      { q: "Gibt es versteckte Kosten?", a: "Nein. Mein Angebot beinhaltet alle Leistungen — keine Überraschungen. Bei längeren Anfahrten kann eine Fahrtkostenpauschale anfallen, die ich vorab transparent kommuniziere." },
    ],
  },
  {
    category: "Technik & Logistik",
    items: [
      { q: "Brauche ich spezielle Technik?", a: "Für Close-Up brauche ich nichts — nur eure Gäste. Für die Bühnenshow bringe ich alles Nötige mit. Bei größeren Events kann ich auch professionelle Ton- und Lichttechnik mitbringen." },
      { q: "Wie viel Platz braucht die Bühnenshow?", a: "Eine Fläche von ca. 3x2 Metern reicht aus. Alles Weitere besprechen wir persönlich." },
      { q: "Wo trittst du auf?", a: "Überall! Schwerpunktmäßig in Bayern und Baden-Württemberg, aber deutschlandweit und international buchbar." },
    ],
  },
];

const FAQItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <h3 className="font-sans text-base md:text-lg font-medium text-foreground pr-8 group-hover:text-foreground/70 transition-colors">{q}</h3>
        <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96 pb-6" : "max-h-0"}`}>
        <p className="text-detail max-w-2xl">{a}</p>
      </div>
    </div>
  );
};

const FAQPage = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <PageLayout>
      <section className="relative min-h-[60vh] flex flex-col justify-center overflow-hidden">
        <div className="container px-6 pt-28 pb-16 md:pt-32 md:pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.15s" }}>
              <span className="badge-muted mb-8 inline-flex">FAQ</span>
            </div>
            <h1 className="headline-hero mb-8 opacity-0 animate-fade-up text-foreground" style={{ animationDelay: "0.35s" }}>
              Häufige Fragen.
            </h1>
            <p className="text-body max-w-lg mx-auto opacity-0 animate-fade-up" style={{ animationDelay: "0.55s" }}>
              Alles, was du wissen musst — kurz und klar.
            </p>
          </div>
        </div>
      </section>

      {faqs.map((cat, ci) => (
        <section key={cat.category} className={`${ci % 2 === 0 ? "" : "section-alt"} py-16 md:py-24`} ref={ci === 0 ? ref : undefined}>
          <div className="container px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className={`font-display text-2xl md:text-3xl italic text-foreground mb-8 ${ci === 0 && isVisible ? "animate-fade-up" : ""}`}>{cat.category}</h2>
              <div>
                {cat.items.map((item) => (
                  <FAQItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      <BookingCTA headline={"Noch Fragen?"} subline="Schreib mir — ich antworte persönlich innerhalb von 24 Stunden." buttonText="Jetzt Kontakt aufnehmen" />
    </PageLayout>
  );
};

export default FAQPage;
