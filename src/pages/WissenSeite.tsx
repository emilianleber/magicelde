import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import NotFound from "./NotFound";
import PageLayout from "@/components/landing/PageLayout";
import { getWissenTopic, wissenTopics, type WissenTopic } from "@/data/wissenTopics";
import { ArrowRight, ArrowUpRight, BookOpen } from "lucide-react";
import { SITE_URL, BUSINESS_ID } from "@/lib/schemaHelpers";

const ACCENT = "#9a2640";
const ACCENT_DEEP = "#5c1622";
const SERIF_ITALIC =
  "font-['Instrument_Serif',ui-serif,Georgia,serif] italic font-normal";

const WissenSeite = () => {
  const { slug } = useParams<{ slug: string }>();
  const topic = useMemo(() => (slug ? getWissenTopic(slug) : undefined), [slug]);
  if (!topic) return <NotFound />;
  return <Inner topic={topic} />;
};

const Inner = ({ topic }: { topic: WissenTopic }) => {
  const url = `${SITE_URL}/wissen/${topic.slug}`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: topic.title,
    description: topic.shortDefinition,
    url,
    image: `${SITE_URL}/og-image.jpg`,
    author: { "@id": `${SITE_URL}/#person` },
    publisher: { "@id": BUSINESS_ID },
    inLanguage: "de-DE",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
  const definedTermJsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: topic.title.replace(/^Was ist /, "").replace(/\?$/, ""),
    description: topic.shortDefinition,
    inDefinedTermSet: `${SITE_URL}/wissen`,
    url,
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Start", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Wissen", item: `${SITE_URL}/wissen` },
      { "@type": "ListItem", position: 3, name: topic.title, item: url },
    ],
  };

  return (
    <>
      <Helmet>
        <html lang="de" />
        <title>{topic.metaTitle}</title>
        <meta name="description" content={topic.metaDescription} />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={topic.metaTitle} />
        <meta property="og:description" content={topic.metaDescription} />
        <meta property="og:locale" content="de_DE" />
        <script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(definedTermJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>
      <PageLayout>
        <main>
          <article className="pt-28 md:pt-36 pb-24 md:pb-32 bg-white">
            <div className="container px-6 max-w-3xl">
              <nav className="text-[10px] tracking-[0.22em] uppercase font-semibold text-foreground/50 mb-6 flex flex-wrap items-center gap-x-2 gap-y-1">
                <Link to="/" className="hover:text-foreground/90">Start</Link>
                <span aria-hidden>·</span>
                <Link to="/blog" className="hover:text-foreground/90">Wissen</Link>
                <span aria-hidden>·</span>
                <span className="text-foreground/85">{topic.title}</span>
              </nav>

              <p className="inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase font-semibold text-foreground/60 mb-5">
                <BookOpen className="w-3.5 h-3.5" style={{ color: ACCENT }} />
                Wissen
              </p>

              <h1 className="font-display font-black tracking-[-0.025em] leading-[1.1] text-[clamp(1.75rem,3.5vw,2.875rem)] text-foreground mb-7">
                {topic.title}
              </h1>

              {/* Definition direkt am Anfang — Featured-Snippet-Antwort */}
              <p
                className="text-lg md:text-xl text-foreground/85 leading-[1.65] mb-10 p-6 rounded-2xl border-l-4"
                style={{ borderColor: ACCENT, background: "#fafafa" }}
              >
                {topic.shortDefinition}
              </p>

              {/* Body-Sections */}
              <div className="prose prose-base md:prose-lg prose-neutral max-w-none">
                {topic.sections.map((sec, i) => {
                  if (sec.type === "heading") {
                    return (
                      <h2
                        key={i}
                        className="font-display font-black tracking-[-0.02em] text-foreground text-2xl md:text-3xl mt-12 mb-5"
                      >
                        {sec.text}
                      </h2>
                    );
                  }
                  if (sec.type === "paragraph") {
                    return (
                      <p
                        key={i}
                        className="text-base md:text-lg text-foreground/75 leading-[1.75] mb-5"
                      >
                        {sec.text}
                      </p>
                    );
                  }
                  if (sec.type === "list") {
                    return (
                      <ul key={i} className="space-y-2.5 mb-5 list-none pl-0">
                        {sec.items?.map((it, j) => (
                          <li
                            key={j}
                            className="text-base md:text-lg text-foreground/75 leading-[1.6] flex items-start gap-3"
                          >
                            <span
                              className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                              style={{ background: ACCENT }}
                            />
                            <span>{it}</span>
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return null;
                })}
              </div>

              {/* Related */}
              {(topic.relatedTopics?.length || topic.relatedPages?.length) && (
                <div className="mt-16 pt-12 border-t border-foreground/10">
                  <p className="text-[11px] tracking-[0.18em] uppercase font-semibold text-foreground/60 mb-5">
                    Verwandt
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {topic.relatedTopics?.map((rt) => {
                      const t = wissenTopics.find((w) => w.slug === rt);
                      if (!t) return null;
                      return (
                        <Link
                          key={rt}
                          to={`/wissen/${rt}`}
                          className="group flex items-center justify-between gap-3 p-4 rounded-xl border border-foreground/10 bg-white hover:bg-[#fafafa] transition-colors"
                        >
                          <span className="text-sm font-display font-bold text-foreground">
                            {t.title}
                          </span>
                          <ArrowUpRight className="w-4 h-4 text-foreground/40 group-hover:text-foreground transition-colors" />
                        </Link>
                      );
                    })}
                    {topic.relatedPages?.map((p) => (
                      <Link
                        key={p.href}
                        to={p.href}
                        className="group flex items-center justify-between gap-3 p-4 rounded-xl border border-foreground/10 bg-white hover:bg-[#fafafa] transition-colors"
                      >
                        <span className="text-sm font-display font-bold text-foreground">
                          {p.title}
                        </span>
                        <ArrowRight className="w-4 h-4 text-foreground/40 group-hover:text-foreground transition-colors" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="mt-16 p-7 md:p-9 rounded-2xl text-white" style={{ background: `linear-gradient(135deg, ${ACCENT_DEEP}, ${ACCENT})` }}>
                <p className="text-[11px] tracking-[0.18em] uppercase font-semibold text-white/70 mb-3">
                  Buchungs-Anfrage
                </p>
                <h3 className="font-display text-2xl md:text-3xl font-black leading-tight mb-3">
                  Brauchst du{" "}
                  <span className={SERIF_ITALIC} style={{ color: "#f3d9a8" }}>
                    konkrete Antwort?
                  </span>
                </h3>
                <p className="text-white/80 leading-[1.6] mb-6 max-w-xl">
                  Schick mir kurz Anlass, Datum, Ort und Gästezahl — ich antworte
                  innerhalb 24 Stunden mit Konzept-Vorschlag.
                </p>
                <Link
                  to="/buchung"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[12px] tracking-[0.08em] font-semibold uppercase text-foreground hover:scale-[1.02] transition-transform"
                >
                  Anfrage senden
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </article>
        </main>
      </PageLayout>
    </>
  );
};

export default WissenSeite;
