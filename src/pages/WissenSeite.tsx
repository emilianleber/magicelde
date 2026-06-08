import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import NotFound from "./NotFound";
import { getWissenTopic, wissenTopics, type WissenTopic } from "@/data/wissenTopics";
import { ArrowRight, ArrowUpRight, BookOpen } from "lucide-react";
import { SITE_URL, BUSINESS_ID } from "@/lib/schemaHelpers";

import VoltageShell from "@/components/voltage/VoltageShell";
import { ReviewsBlock, FinalCTA } from "@/components/voltage/sections";
import { COBALT, MAGENTA, INK, WHITE, PAPER, L_LINE, L_DIM, up, stagger, vp, Eyebrow } from "@/components/voltage/theme";

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

  const hasRelated = !!(topic.relatedTopics?.length || topic.relatedPages?.length);

  return (
    <VoltageShell
      title={topic.metaTitle}
      description={topic.metaDescription}
      path={`/wissen/${topic.slug}`}
      noindex={false}
    >
      <Helmet>
        <meta property="og:type" content="article" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={topic.metaTitle} />
        <meta property="og:description" content={topic.metaDescription} />
        <meta property="og:locale" content="de_DE" />
        <script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(definedTermJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>

      {/* ── HEADER / SUB-HERO ── */}
      <header className="relative overflow-hidden px-5 md:px-10 pt-12 md:pt-20 pb-10 md:pb-14" style={{ background: WHITE }}>
        <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-44 -left-24 w-[680px] h-[680px] rounded-full" style={{ background: `radial-gradient(circle, ${COBALT}1f 0%, transparent 60%)`, filter: "blur(30px)" }} />
          <div className="absolute -top-28 right-[-60px] w-[520px] h-[520px] rounded-full" style={{ background: `radial-gradient(circle, ${MAGENTA}1a 0%, transparent 60%)`, filter: "blur(30px)" }} />
        </div>
        <motion.div variants={stagger} initial="hidden" animate="show" className="relative max-w-3xl mx-auto">
          <motion.nav variants={up} className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] tracking-[0.16em] uppercase font-semibold mb-6" style={{ color: L_DIM }}>
            <Link to="/" className="pv-link hover:opacity-80">Start</Link>
            <span aria-hidden>·</span>
            <Link to="/blog" className="pv-link hover:opacity-80">Wissen</Link>
            <span aria-hidden>·</span>
            <span style={{ color: INK }}>{topic.title}</span>
          </motion.nav>

          <motion.div variants={up}>
            <Eyebrow>
              <BookOpen className="w-3.5 h-3.5" style={{ color: COBALT }} /> Wissen
            </Eyebrow>
          </motion.div>

          <motion.h1 variants={up} className="font-extrabold tracking-[-0.03em]" style={{ fontSize: "clamp(2.25rem,5.2vw,4rem)", lineHeight: 1.02, color: INK }}>
            {topic.title}
          </motion.h1>

          {/* Definition direkt am Anfang — Featured-Snippet-Antwort */}
          <motion.p
            variants={up}
            className="mt-8 text-[17px] md:text-xl leading-[1.6] p-6 md:p-7 rounded-[22px]"
            style={{ color: INK, background: PAPER, borderLeft: `4px solid ${COBALT}`, border: `1px solid ${L_LINE}`, borderLeftWidth: 4 }}
          >
            {topic.shortDefinition}
          </motion.p>
        </motion.div>
      </header>

      {/* ── ARTIKEL-BODY ── */}
      <motion.article
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={vp}
        className="px-5 md:px-10 pb-16 md:pb-24"
        style={{ background: WHITE }}
      >
        <div className="max-w-3xl mx-auto">
          {topic.sections.map((sec, i) => {
            if (sec.type === "heading") {
              return (
                <motion.h2
                  key={i}
                  variants={up}
                  className="font-extrabold tracking-[-0.02em] mt-12 mb-4"
                  style={{ fontSize: "clamp(1.5rem,3vw,2.25rem)", lineHeight: 1.1, color: INK }}
                >
                  {sec.text}
                </motion.h2>
              );
            }
            if (sec.type === "paragraph") {
              return (
                <motion.p
                  key={i}
                  variants={up}
                  className="text-[16px] md:text-[17px] leading-[1.75] mb-5"
                  style={{ color: L_DIM }}
                >
                  {sec.text}
                </motion.p>
              );
            }
            if (sec.type === "list") {
              return (
                <motion.ul key={i} variants={up} className="space-y-3 mb-5 list-none pl-0">
                  {sec.items?.map((it, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-3 text-[16px] md:text-[17px] leading-[1.6]"
                      style={{ color: L_DIM }}
                    >
                      <span className="mt-2.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: COBALT }} />
                      <span>{it}</span>
                    </li>
                  ))}
                </motion.ul>
              );
            }
            return null;
          })}

          {/* ── RELATED ── */}
          {hasRelated && (
            <motion.div variants={up} className="mt-16 pt-12" style={{ borderTop: `1px solid ${L_LINE}` }}>
              <p className="text-[11px] tracking-[0.16em] uppercase font-semibold mb-5" style={{ color: L_DIM }}>
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
                      className="group flex items-center justify-between gap-3 p-4 rounded-[16px] transition-colors hover:border-[#1D3FFF]"
                      style={{ background: WHITE, border: `1px solid ${L_LINE}` }}
                    >
                      <span className="text-[15px] font-bold" style={{ color: INK }}>{t.title}</span>
                      <ArrowUpRight className="w-4 h-4 transition-colors" style={{ color: "rgba(10,11,15,0.35)" }} />
                    </Link>
                  );
                })}
                {topic.relatedPages?.map((p) => (
                  <Link
                    key={p.href}
                    to={p.href}
                    className="group flex items-center justify-between gap-3 p-4 rounded-[16px] transition-colors hover:border-[#1D3FFF]"
                    style={{ background: WHITE, border: `1px solid ${L_LINE}` }}
                  >
                    <span className="text-[15px] font-bold" style={{ color: INK }}>{p.title}</span>
                    <ArrowRight className="w-4 h-4 transition-colors" style={{ color: "rgba(10,11,15,0.35)" }} />
                  </Link>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── CTA-Karte (Cobalt) ── */}
          <motion.div variants={up} className="mt-16 rounded-[24px] px-6 md:px-9 py-9 md:py-11" style={{ background: COBALT }}>
            <p className="text-[11px] tracking-[0.16em] uppercase font-semibold mb-3" style={{ color: "rgba(255,255,255,0.72)" }}>
              Buchungs-Anfrage
            </p>
            <h3 className="font-extrabold tracking-[-0.02em] leading-tight mb-3" style={{ fontSize: "clamp(1.5rem,3vw,2.25rem)", color: WHITE }}>
              Brauchst du eine konkrete Antwort?
            </h3>
            <p className="leading-[1.6] mb-6 max-w-xl" style={{ color: "rgba(255,255,255,0.85)" }}>
              Schick mir kurz Anlass, Datum, Ort und Gaestezahl — ich antworte innerhalb 24 Stunden mit Konzept-Vorschlag.
            </p>
            <Link
              to="/buchung"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[14px] font-semibold transition-transform hover:scale-[1.02]"
              style={{ background: WHITE, color: COBALT }}
            >
              Anfrage senden <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </motion.article>

      <ReviewsBlock paper />

      <FinalCTA
        title={
          <>
            Bereit fuer dein Event? <span style={{ color: MAGENTA }}>Magisch.</span>
          </>
        }
        sub="Schick mir Datum, Anlass, Gaestezahl und Location — Antwort innerhalb 24 Stunden mit Konzept-Vorschlag und Angebot."
      />
    </VoltageShell>
  );
};

export default WissenSeite;
