import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/landing/PageLayout";
import { blogPosts } from "@/data/blogPosts";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-magic.jpg";
import stageImg from "@/assets/stage-show.jpg";

const categories = ["Alle", "Entertainment", "Hochzeiten", "Business", "Konzepte", "Behind the Scenes"];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("Alle");
  const { ref, isVisible } = useScrollReveal();

  const featured = blogPosts.filter((p) => p.featured);
  const filtered = activeCategory === "Alle"
    ? blogPosts.filter((p) => !p.featured)
    : blogPosts.filter((p) => p.category === activeCategory && !p.featured);

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
      <section className="relative min-h-[60vh] flex flex-col justify-center overflow-hidden">
        <div className="container px-6 pt-28 pb-16 md:pt-36 md:pb-24">
          <div className="max-w-5xl mx-auto text-center">
            <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <span className="badge-accent mb-8 inline-flex">Magazin</span>
            </div>
            <h1 className="headline-hero mb-8 opacity-0 animate-fade-up text-foreground" style={{ animationDelay: "0.3s" }}>
              Insights & Inspirationen.
            </h1>
            <p className="text-body max-w-2xl mx-auto opacity-0 animate-fade-up" style={{ animationDelay: "0.5s" }}>
              Tipps für Events, Einblicke hinter die Kulissen und alles rund um moderne
              Comedy-Magie — direkt vom Bühnenprofi.
            </p>
          </div>
        </div>
      </section>

      {blogPosts.length === 0 ? (
        /* Empty State */
        <section className="pb-24">
          <div className="container px-6">
            <div className="max-w-2xl mx-auto text-center py-16">
              <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-8">
                <span className="text-2xl">&#10024;</span>
              </div>
              <p className="font-sans text-lg text-muted-foreground leading-relaxed">
                Bald erscheinen hier spannende Beitr&auml;ge rund um Zauberkunst &amp; Entertainment.
              </p>
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* Featured Articles */}
          <section className="pb-20" ref={ref}>
            <div className="container px-6">
              <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {featured.map((post, i) => (
                  <article
                    key={post.slug}
                    className={`group relative rounded-3xl overflow-hidden aspect-[4/3] ${isVisible ? "animate-fade-up" : "opacity-0"}`}
                    style={{ animationDelay: `${0.1 + i * 0.1}s` }}
                  >
                    <img
                      src={i === 0 ? heroImg : stageImg}
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="badge-gradient text-[10px]">{post.category}</span>
                        <span className="font-sans text-xs text-background/50">{post.readTime}</span>
                      </div>
                      <h2 className="font-display text-xl md:text-2xl font-bold text-background mb-3 leading-tight">{post.title}</h2>
                      <p className="font-sans text-sm text-background/60 leading-relaxed line-clamp-2">{post.excerpt}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Category Filter */}
          <section className="section-large section-alt">
            <div className="container px-6">
              <div className="flex flex-wrap gap-3 justify-center mb-16">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2.5 rounded-full font-sans text-sm font-medium transition-all duration-200 ${
                      activeCategory === cat
                        ? "bg-foreground text-background"
                        : "bg-background text-muted-foreground hover:text-foreground hover:bg-background/80"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {(filtered.length > 0 ? filtered : blogPosts.filter((p) => !p.featured)).map((post) => (
                  <article key={post.slug} className="group">
                    <div className="rounded-3xl bg-background p-8 h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                      <div className="flex items-center gap-3 mb-5">
                        <span className="badge-accent text-[10px]">{post.category}</span>
                        <span className="font-sans text-xs text-muted-foreground">{post.readTime}</span>
                      </div>
                      <h3 className="font-display text-lg font-bold text-foreground mb-3 leading-tight group-hover:text-accent transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-detail text-sm flex-1 mb-6">{post.excerpt}</p>
                      <div className="flex items-center gap-1 text-accent font-sans text-sm font-medium group-hover:gap-2 transition-all">
                        Weiterlesen <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </>
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
