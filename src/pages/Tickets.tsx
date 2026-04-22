import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/landing/PageLayout";
import BookingCTA from "@/components/landing/BookingCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Calendar, MapPin, Clock, Ticket, ArrowRight } from "lucide-react";
import stageImg from "@/assets/stage-show.jpg";
import heroImg from "@/assets/hero-magic.jpg";

const waldWieseImg = "https://restaurant-waldwiese.de/wp-content/uploads/2026/03/WIESE.png";

const shows = [
  {
    title: "Magic Dinner — Summer Edition",
    date: "11. Juli 2026",
    time: "Ab 17:00 Uhr",
    location: "Wald & Wiese Restaurant, Sinzing bei Regensburg",
    desc: "Ein Sommerabend voller Genuss und Magie. Genieße dein Dinner auf der Terrasse oder im Innenbereich, während faszinierende Close-Up-Magie direkt an deinem Tisch stattfindet. Optionales Magic Menü verfügbar.",
    img: waldWieseImg,
    available: true,
    ticketUrl: "https://services.gastronovi.com/restaurants/108071/reservation/widget?event=135047",
  },
];

const TicketsPage = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <>
      <Helmet>
        <title>Tickets – Emilian Leber | Shows &amp; Events</title>
        <meta
          name="description"
          content="Tickets für die Zaubershow von Emilian Leber. Erlebe 90 Minuten Comedy-Magie live – jetzt Tickets sichern und unvergessliche Abende genießen."
        />
        <link rel="canonical" href="https://www.magicel.de/tickets" />
        <meta property="og:title" content="Tickets – Emilian Leber | Shows & Events" />
        <meta property="og:description" content="Tickets für die Zaubershow von Emilian Leber. Erlebe 90 Minuten Comedy-Magie live – jetzt Tickets sichern und unvergessliche Abende genießen." />
        <meta property="og:url" content="https://www.magicel.de/tickets" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.magicel.de/og-image.jpg" />
        <meta property="og:locale" content="de_DE" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tickets – Emilian Leber | Shows & Events" />
        <meta name="twitter:description" content="Tickets für die Zaubershow von Emilian Leber. Erlebe 90 Minuten Comedy-Magie live – jetzt Tickets sichern und unvergessliche Abende genießen." />
      </Helmet>
      <PageLayout>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex flex-col justify-center overflow-hidden">
        <div className="container px-6 pt-28 pb-16 md:pt-36 md:pb-24">
          <div className="max-w-5xl mx-auto text-center">
            <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <span className="badge-accent mb-8 inline-flex">Live Shows</span>
            </div>
            <h1 className="headline-hero mb-8 opacity-0 animate-fade-up text-foreground" style={{ animationDelay: "0.3s" }}>
              Shows & Tickets.
            </h1>
            <p className="text-body max-w-2xl mx-auto opacity-0 animate-fade-up" style={{ animationDelay: "0.5s" }}>
              Erlebe Emilian Leber live — Comedy, Magie und Momente, die bleiben.
              Sichere dir jetzt Tickets für die nächsten öffentlichen Shows.
            </p>
          </div>
        </div>
      </section>

      {/* Shows */}
      <section className="section-large" ref={ref}>
        <div className="container px-6">
          <div className="max-w-4xl mx-auto space-y-8">
            {shows.map((show, i) => (
              <div
                key={show.title}
                className={`group rounded-3xl bg-card overflow-hidden ${isVisible ? "animate-fade-up" : "opacity-0"}`}
                style={{ animationDelay: `${0.1 + i * 0.1}s` }}
              >
                <div className="grid md:grid-cols-2">
                  <div className="aspect-[4/3] md:aspect-auto overflow-hidden">
                    <img
                      src={show.img}
                      alt={show.title}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-8 md:p-10 flex flex-col justify-center">
                    {!show.available && (
                      <span className="inline-flex items-center self-start px-3 py-1 rounded-full text-[10px] font-sans font-semibold tracking-widest uppercase bg-destructive/10 text-destructive mb-4">
                        Ausverkauft
                      </span>
                    )}
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">{show.title}</h2>
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 text-accent" />
                        <span>{show.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 text-accent" />
                        <span>{show.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 text-accent" />
                        <span>{show.location}</span>
                      </div>
                    </div>
                    <p className="text-detail mb-8">{show.desc}</p>
                    {show.available ? (
                      <a href={show.ticketUrl} target="_blank" rel="noopener noreferrer" className="btn-primary self-start group/btn">
                        <Ticket className="w-4 h-4 mr-2" />
                        Jetzt reservieren
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                    ) : (
                      <button disabled className="btn-secondary self-start opacity-50 cursor-not-allowed border border-border">
                        Ausverkauft
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Private Shows CTA */}
      <section className="section-large section-alt">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto text-center">
            <span className="badge-muted mb-8 inline-flex">Private Events</span>
            <h2 className="headline-section text-foreground mb-6">
              Keine passende Show dabei?
            </h2>
            <p className="text-body max-w-xl mx-auto mb-10">
              Ich komme auch zu dir — als exklusiver Showact auf deiner Firmenfeier,
              Hochzeit oder privaten Feier. Deutschlandweit buchbar.
            </p>
          </div>
        </div>
      </section>

      <BookingCTA headline={"Dein Event.\nDeine Show."} subline="Lass uns über dein privates Event sprechen — ich entwickle ein maßgeschneidertes Showkonzept für dich." />
    </PageLayout>
    </>
  );
};

export default TicketsPage;
