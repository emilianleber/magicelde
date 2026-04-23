import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/landing/PageLayout";
import { blogPosts } from "@/data/blogPosts";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState } from "react";
import { Link } from "react-router-dom";
import heroImg from "@/assets/hero-magic.jpg";
import stageImg from "@/assets/stage-show.jpg";
import firmenfeierImg from "@/assets/hero-firmenfeier-stock.jpg";
import hochzeitImg from "@/assets/wedding-magic.jpg";
import dinnerImg from "@/assets/emilian-magic-dinner.jpg";
import closeupImg from "@/assets/hero-closeup.jpg";
import birthdayImg from "@/assets/hero-birthday.jpg";
import audienceImg from "@/assets/audience-reactions.jpg";
import staunenImg from "@/assets/staunen.jpg";
import haendeImg from "@/assets/haende-interaktion.jpg";
import heroStageImg from "@/assets/hero-stage.jpg";

const blogImages: Record<string, string> = {
  "zauberer-firmenfeier-buchen-2026": firmenfeierImg,
  "hochzeitszauberer-wann-richtig": hochzeitImg,
  "zauberer-muenchen-event-tipps": heroImg,
  "magic-dinner-planen-tipps": dinnerImg,
  "zauberer-weihnachtsfeier-2026": stageImg,
  "teamevent-magie-teambuilding": haendeImg,
  "zauberer-hamburg-event": heroImg,
  "geburtstag-ideen-erwachsene-zauberer": birthdayImg,
  "close-up-oder-buehnenshow-2026": closeupImg,
  "zauberer-berlin-entertainment": stageImg,
  "zauberer-kosten-was-kostet": staunenImg,
  "firmen-gala-planen-tipps": audienceImg,
  "zauberer-koeln-rhein-events": heroImg,
  "hochzeit-unterhaltung-2026": hochzeitImg,
  "sommerfest-ideen-unternehmen-2026": firmenfeierImg,
  "zauberer-frankfurt-business-events": heroStageImg,
};

const categories = ["Alle", "Firmenfeiern", "Hochzeit", "Städte", "Magic Dinner", "Close-Up", "Geburtstage", "Ratgeber"];

const today = new Date().toISOString().split("T")[0];
const publishedPosts = blogPosts.filter((p) => p.date <= today);

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("Alle");
  const { ref, isVisible } = useScrollReveal();

  const filtered = activeCategory === "Alle"
    ? publishedPosts
    : publishedPosts.filter((p) => p.category === activeCategory);

  return (
    <>
      <Helmet>
        <title>Magazin – Emilian Leber | Blog über Zauberkunst &amp; Events</title>
        <meta name="description" content="Tipps für Events, Einblicke hinter die Kulissen und alles rund um moderne Comedy-Magie. Der Blog von Zauberer Emilian Leber." />
        <link rel="canonical" href="https://www.magicel.de/blog" />
        <meta property="og:title" content="Magazin – Emilian Leber | Blog über Zauberkunst & Events" />
        <meta property="og:description" content="Tipps für Events, Einblicke hinter die Kulissen und alles rund um moderne Comedy-Magie. Der Blog von Zauberer Emilian Leber." />
        <meta property="og:url" content="https://www.magicel.de/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.magicel.de/og-image.jpg" />
        <meta property="og:locale" content="de_DE" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Magazin – Emilian Leber | Blog über Zauberkunst & Events" />
        <meta name="twitter:description" content="Tipps für Events, Einblicke hinter die Kulissen und alles rund um moderne Comedy-Magie. Der Blog von Zauberer Emilian Leber." />
        <meta name="twitter:image" content="https://www.magicel.de/og-image.jpg" />
      </Helmet>
      <PageLayout>
      {/* Hero */}
      <section className="relative min-h-[40vh] flex flex-col justify-center overflow-hidden">
        <div className="container px-6 pt-28 pb-12 md:pt-36 md:pb-16">
          <div className="max-w-5xl mx-auto text-center">
            <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <span className="badge-accent mb-8 inline-flex">Magazin</span>
            </div>
            <h1 className="headline-hero mb-6 opacity-0 animate-fade-up text-foreground" style={{ animationDelay: "0.3s" }}>
              Insights & Inspirationen.
            </h1>
            <p className="text-body max-w-2xl mx-auto opacity-0 animate-fade-up" style={{ animationDelay: "0.5s" }}>
              Tipps für Events, Einblicke hinter die Kulissen und alles rund um moderne
              Comedy-Magie — direkt vom Bühnenprofi.
            </p>
          </div>
        </div>
      </section>

      {publishedPosts.length === 0 ? (
        <section className="pb-24">
          <div className="container px-6">
            <div className="max-w-2xl mx-auto text-center py-16">
              <p className="font-sans text-lg text-muted-foreground leading-relaxed">
                Bald erscheinen hier spannende Beitr&auml;ge rund um Zauberkunst &amp; Entertainment.
              </p>
            </div>
          </div>
        </section>
      ) : (
        <section className="pb-24" ref={ref}>
          <div className="container px-6">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-3 justify-center mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full font-sans text-sm font-medium transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-foreground text-background"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Post Grid — all cards full-image style */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {filtered.map((post, i) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className={`group relative rounded-3xl overflow-hidden aspect-[4/3] block ${isVisible ? "animate-fade-up" : "opacity-0"}`}
                  style={{ animationDelay: `${0.05 + i * 0.05}s` }}
                >
                  <img
                    src={blogImages[post.slug] ?? heroImg}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="badge-gradient text-[10px]">{post.category}</span>
                      <span className="font-sans text-xs text-white/50">{post.readTime}</span>
                    </div>
                    <h2 className="font-display text-base md:text-lg font-bold text-white leading-tight group-hover:underline underline-offset-2">
                      {post.title}
                    </h2>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="section-full">
        <div className="container px-6">
          <div className="max-w-2xl mx-auto text-center">
            <span className="badge-accent mb-8 inline-flex">Newsletter</span>
            <h2 className="headline-section text-foreground mb-6">
              Nichts verpassen.
            </h2>
            <p className="text-body max-w-lg mx-auto mb-10">
              Neue Artikel, Event-Tipps und Behind-the-Scenes — direkt in dein Postfach.
              Kein Spam, versprochen.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Deine E-Mail"
                className="flex-1 rounded-full bg-muted/50 border-0 px-6 py-4 font-sans text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
              <button className="btn-primary !rounded-full">
                Abonnieren
              </button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
    </>
  );
};

export default Blog;
