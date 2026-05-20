import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import PageLayout from "@/components/landing/PageLayout";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  blogPosts,
  CATEGORIES,
  FEATURED_SLUG,
  type BlogPost,
} from "@/data/blogPosts";
import { captureEmail, markEmailSubmitted } from "@/lib/emailCapture";
import { subscribeNewsletter } from "@/lib/sendInquiry";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Clock,
  Feather,
  Filter,
  Mail,
  MapPin,
  PenTool,
  Quote,
  Sparkles,
  Star,
  Tag,
  TrendingUp,
} from "lucide-react";

import weddingImg from "@/assets/wedding-magic.jpg";
import dinnerImg from "@/assets/emilian-magic-dinner.jpg";
import dinnerBookImg from "@/assets/magicdinner-book.jpg";
import dinnerBuehneImg from "@/assets/magicdinner-buehne.jpg";
import stageImg from "@/assets/stage-show.jpg";
import buehneZuschauerImg from "@/assets/buehne-zuschauer.jpg";
import buehneDpsgImg from "@/assets/buehne-dpsg.jpg";
import closeupImg from "@/assets/closeup.jpg";
import closeupHeroImg from "@/assets/hero-closeup.jpg";
import dinnerHeroImg from "@/assets/hero-dinner.jpg";
import stageHeroImg from "@/assets/hero-stage.jpg";
import magicImg from "@/assets/hero-magic.jpg";
import audienceImg from "@/assets/audience-reactions.jpg";
import staunenImg from "@/assets/staunen.jpg";
import haendeImg from "@/assets/haende-interaktion.jpg";
import emotionenImg from "@/assets/emotionen.jpg";
import portraitKartenImg from "@/assets/portrait-karten.jpg";
import portraitBuchImg from "@/assets/emilian-portrait-buch.jpg";
import portraitImg from "@/assets/magician-portrait.jpg";
import firmenfeierImg from "@/assets/hero-firmenfeier-stock.jpg";
import schneiderImg from "@/assets/schneider-weisse-closeup.jpg";

const SERIF_ITALIC =
  "font-['Instrument_Serif',ui-serif,Georgia,serif] italic font-normal";
const ACCENT = "#9a2640";
const ACCENT_DEEP = "#5c1622";
const ACCENT_SOFT = "#e4b8c0";
const CREAM = "#fafafa";

/* ═══════════════════════════════════════════════════════════
   IMAGE MAP
   ═══════════════════════════════════════════════════════════ */
const COVER_MAP: Record<string, string> = {
  "wedding-magic": weddingImg,
  dinner: dinnerHeroImg,
  "dinner-book": dinnerBookImg,
  "dinner-buehne": dinnerBuehneImg,
  stage: stageHeroImg,
  "buehne-zuschauer": buehneZuschauerImg,
  "buehne-dpsg": buehneDpsgImg,
  closeup: closeupHeroImg,
  magic: magicImg,
  firmenfeier: firmenfeierImg,
  haende: haendeImg,
  audience: audienceImg,
  staunen: staunenImg,
  emotionen: emotionenImg,
  "portrait-karten": portraitKartenImg,
  "portrait-buch": portraitBuchImg,
  portrait: portraitImg,
  schneider: schneiderImg,
};

const coverImg = (key: string) => COVER_MAP[key] ?? magicImg;

/* ═══════════════════════════════════════════════════════════
   ANIM KEYFRAMES (Hero word-by-word + Bokeh)
   ═══════════════════════════════════════════════════════════ */
const HeroKeyframes = () => (
  <style>{`
    @keyframes heroWordIn { from { opacity: 0; transform: translateY(48px) scale(0.96) rotate(-1.2deg); filter: blur(8px); } to { opacity: 1; transform: translateY(0) scale(1) rotate(0); filter: blur(0); } }
    @keyframes heroFadeUp { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes heroBokehDrift { 0% { transform: translateY(0) translateX(0) scale(1); opacity: 0.15; } 30% { opacity: 1; } 70% { opacity: 1; } 100% { transform: translateY(-100px) translateX(14px) scale(1.12); opacity: 0; } }
    @keyframes magazinPaperGrain { 0% { background-position: 0 0; } 100% { background-position: 200px 200px; } }
    .hero-word { display: inline-block; opacity: 0; animation: heroWordIn 0.95s cubic-bezier(0.16, 1, 0.3, 1) forwards; will-change: transform, opacity, filter; }
    .hero-fade { opacity: 0; animation: heroFadeUp 0.85s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
    .hero-bokeh { opacity: 0; animation-name: heroBokehDrift; animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1); animation-iteration-count: infinite; will-change: transform, opacity; }
  `}</style>
);

const HEADLINE_SANS = ["Magazin", "der"];
const HEADLINE_ITALIC = ["Bühne", "und", "Tafel."];

const BOKEH: { size: number; left: string; top: string; dur: number; delay: number; o: number }[] = [];

/* ═══════════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════════ */
const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const totalReadMinutes = (posts: BlogPost[]) =>
  posts.reduce((sum, p) => sum + parseInt(p.readTime, 10), 0);

const allTags = (posts: BlogPost[]) =>
  Array.from(new Set(posts.flatMap((p) => p.tags))).sort();

/* ═══════════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════════ */
const Hero = ({ posts }: { posts: BlogPost[] }) => {
  const minutes = totalReadMinutes(posts);
  const themes = new Set(posts.map((p) => p.category)).size;

  return (
    <section className="relative bg-[#fafafa] text-foreground overflow-hidden">
      <HeroKeyframes />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(80% 60% at 80% 10%, rgba(0,0,0,0.024) 0%, transparent 60%), radial-gradient(60% 50% at 12% 90%, rgba(0,0,0,0.040) 0%, transparent 65%)",
        }}
      />
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        {BOKEH.map((b, i) => (
          <div
            key={i}
            className="absolute rounded-full hero-bokeh"
            style={{
              width: b.size,
              height: b.size,
              left: b.left,
              top: b.top,
              background: `radial-gradient(circle, rgba(199,144,66,${b.o}) 0%, rgba(199,144,66,${b.o * 0.4}) 40%, rgba(0,0,0,0.000) 75%)`,
              filter: "blur(2px)",
              animationDuration: `${b.dur}s`,
              animationDelay: `${b.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container px-6 pt-32 md:pt-40 pb-20 md:pb-24">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-end">
          <div className="lg:col-span-8">
            <div
              className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-8 hero-fade`}
              style={{ animationDelay: "0.05s" }}
            >
              Magazin · MagicEL — Ausgabe Frühjahr 2026
            </div>
            <h1 className="text-[clamp(2.75rem,8.4vw,8rem)] font-display font-black tracking-[-0.035em] leading-[0.95] text-foreground">
              {HEADLINE_SANS.map((w, i) => (
                <span
                  key={`s-${i}`}
                  className="hero-word"
                  style={{
                    animationDelay: `${0.15 + i * 0.08}s`,
                    marginRight: "0.22em",
                  }}
                >
                  {w}
                </span>
              ))}
              <br />
              {HEADLINE_ITALIC.map((w, i) => (
                <span
                  key={`i-${i}`}
                  className={`hero-word ${SERIF_ITALIC}`}
                  style={{
                    animationDelay: `${0.32 + i * 0.08}s`,
                    color: ACCENT,
                    marginRight: "0.18em",
                  }}
                >
                  {w}
                </span>
              ))}
            </h1>
          </div>

          <div
            className="lg:col-span-4 hero-fade"
            style={{ animationDelay: "0.55s" }}
          >
            <p className="text-base md:text-lg leading-[1.65] text-foreground/65 max-w-md">
              Geschichten aus dem Alltag eines Magiers zwischen Tafel, Bühne
              und Probe. Beobachtungen, Handwerk, Hinter-den-Kulissen — alle
              vier bis sechs Wochen ein neuer Beitrag.
            </p>

            <div
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm hero-fade"
              style={{ animationDelay: "0.65s" }}
            >
              <span className="inline-flex items-center gap-2 text-foreground/70 tabular-nums">
                <BookOpen className="w-4 h-4" style={{ color: ACCENT }} />
                <strong className="font-bold">{posts.length}</strong> Artikel
              </span>
              <span className="text-foreground/30">·</span>
              <span className="inline-flex items-center gap-2 text-foreground/70 tabular-nums">
                <Tag className="w-4 h-4" style={{ color: ACCENT }} />
                <strong className="font-bold">{themes}</strong> Themen
              </span>
              <span className="text-foreground/30">·</span>
              <span className="inline-flex items-center gap-2 text-foreground/70 tabular-nums">
                <Clock className="w-4 h-4" style={{ color: ACCENT }} />
                <strong className="font-bold">{minutes}</strong> Min. Lesezeit
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   FEATURED ARTIKEL
   ═══════════════════════════════════════════════════════════ */
const FeaturedArtikel = ({ post }: { post: BlogPost }) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-background py-20 md:py-28">
      <div className="container px-6">
        <div
          className={`flex items-center gap-3 mb-12 ${isVisible ? "opacity-100" : "opacity-0"} transition-opacity duration-700`}
        >
          <Sparkles className="w-4 h-4" style={{ color: ACCENT }} />
          <span
            className={`${SERIF_ITALIC} text-lg md:text-xl`}
            style={{ color: ACCENT }}
          >
            Im Fokus dieser Ausgabe.
          </span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <Link
            to={`/blog/${post.slug}`}
            className={`group block lg:col-span-7 relative overflow-hidden rounded-3xl ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            } transition-all duration-700`}
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={coverImg(post.cover)}
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                style={{ objectPosition: "center 30%" }}
                loading="lazy"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(8,6,12,0) 45%, rgba(8,6,12,0.55) 100%)",
                }}
              />
              <div className="absolute top-6 left-6 flex items-center gap-3">
                <span
                  className="text-[11px] tracking-[0.14em] uppercase font-bold px-3 py-1.5 rounded-full text-white"
                  style={{
                    background: `linear-gradient(135deg, ${ACCENT_DEEP}, ${ACCENT})`,
                  }}
                >
                  Editor's Pick
                </span>
                <span className="text-[12px] tracking-[0.1em] uppercase text-white/80 font-semibold backdrop-blur-md bg-white/10 px-3 py-1.5 rounded-full">
                  {post.category}
                </span>
              </div>
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white text-sm">
                <span className={`text-base md:text-lg`}>
                  {formatDate(post.date)}
                </span>
                <span className="inline-flex items-center gap-2 tabular-nums">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readTime}
                </span>
              </div>
            </div>
          </Link>

          <div
            className={`lg:col-span-5 lg:sticky lg:top-32 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            } transition-all duration-700 delay-150`}
          >
            <div
              className="text-xs uppercase tracking-[0.18em] font-semibold text-foreground/55 mb-4"
            >
              Titelstory.
            </div>
            <h2 className="text-[clamp(1.8rem,3.6vw,3rem)] font-display font-black leading-[1.05] tracking-[-0.02em] mb-6">
              {post.title}{" "}
              {post.titleAccent && (
                <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                  {post.titleAccent}
                </span>
              )}
            </h2>
            <p className="text-base md:text-lg leading-[1.65] text-foreground/70 mb-8">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-4 mb-8 text-sm text-foreground/60">
              <div className="flex items-center gap-2">
                <Feather className="w-4 h-4" style={{ color: ACCENT }} />
                <span className="font-semibold text-foreground/80">
                  {post.author.name}
                </span>
              </div>
              <span className="text-foreground/30">·</span>
              <span className="tabular-nums">{formatDate(post.date)}</span>
              <span className="text-foreground/30">·</span>
              <span className="tabular-nums">{post.readTime}</span>
            </div>
            <Link
              to={`/blog/${post.slug}`}
              className="inline-flex items-center gap-2 text-[13px] tracking-[0.08em] uppercase font-semibold px-6 py-3 rounded-full text-white transition-transform duration-300 hover:scale-[1.035]"
              style={{
                background: `linear-gradient(135deg, ${ACCENT_DEEP}, ${ACCENT})`,
              }}
            >
              Artikel lesen
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="mt-10 pt-8 border-t border-foreground/10 flex flex-wrap gap-2">
              {post.tags.slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="text-[11px] tracking-[0.06em] uppercase font-semibold px-2.5 py-1 rounded-full"
                  style={{
                    background: ACCENT_SOFT + "55",
                    color: ACCENT_DEEP,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   KATEGORIE FILTER + POSTS LISTE (Editorial Magazin-Liste)
   ═══════════════════════════════════════════════════════════ */
const PostsListe = ({
  posts,
  featuredSlug,
}: {
  posts: BlogPost[];
  featuredSlug: string;
}) => {
  const [activeCategory, setActiveCategory] = useState("Alle");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Wenn URL-Hash mit #tag=... existiert → setze Tag
  useEffect(() => {
    const hash = window.location.hash;
    const m = hash.match(/[#&]tag=([^&]+)/);
    if (m) {
      const tag = decodeURIComponent(m[1]);
      setActiveTag(tag);
    }
  }, []);

  const visiblePosts = useMemo(() => {
    let list = posts.filter((p) => p.slug !== featuredSlug);
    if (activeCategory !== "Alle") {
      list = list.filter((p) => p.category === activeCategory);
    }
    if (activeTag) {
      list = list.filter((p) => p.tags.includes(activeTag));
    }
    return list.sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [posts, featuredSlug, activeCategory, activeTag]);

  return (
    <section className="bg-[#fafafa] py-20 md:py-28">
      <div className="container px-6">
        <div className="grid lg:grid-cols-12 gap-12 mb-14 items-end">
          <div className="lg:col-span-7">
            <div className={`text-lg text-foreground/55 mb-5`}>
              Alle Beiträge.
            </div>
            <h2 className="text-[clamp(2rem,4.5vw,4.2rem)] font-display font-black tracking-[-0.025em] leading-[1.02]">
              Geschichten zwischen{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                Tisch und Bühne.
              </span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base md:text-lg leading-[1.65] text-foreground/65">
              Filtere nach Themenfeld oder lies einfach von oben nach unten.
              Die neuesten Beiträge stehen zuerst. Tags sind klickbar — sie
              filtern die Liste weiter.
            </p>
          </div>
        </div>

        {/* Kategorien Tabs */}
        <div className="flex items-center gap-2 mb-6">
          <Filter className="w-4 h-4 text-foreground/45" />
          <span className={`text-foreground/55`}>
            Themenfeld.
          </span>
        </div>
        <div className="flex flex-wrap gap-2.5 mb-8">
          {CATEGORIES.map((cat) => {
            const active = cat === activeCategory;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-2 rounded-full text-[12px] tracking-[0.06em] uppercase font-semibold transition-all duration-300"
                style={
                  active
                    ? {
                        background: `linear-gradient(135deg, ${ACCENT_DEEP}, ${ACCENT})`,
                        color: "white",
                        boxShadow: "0 8px 24px -10px rgba(0,0,0,0.040)",
                      }
                    : {
                        background: "rgba(8,6,12,0.05)",
                        color: "rgba(8,6,12,0.65)",
                      }
                }
              >
                {cat}
              </button>
            );
          })}
        </div>

        {activeTag && (
          <div className="mb-10 flex items-center gap-3 text-sm">
            <span className="text-foreground/55">Aktiver Tag-Filter:</span>
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-white font-semibold"
              style={{
                background: `linear-gradient(135deg, ${ACCENT_DEEP}, ${ACCENT})`,
              }}
            >
              {activeTag}
              <button
                onClick={() => {
                  setActiveTag(null);
                  if (window.location.hash) {
                    window.history.replaceState(
                      null,
                      "",
                      window.location.pathname,
                    );
                  }
                }}
                className="ml-2 opacity-80 hover:opacity-100"
                aria-label="Tag-Filter entfernen"
              >
                ×
              </button>
            </span>
          </div>
        )}

        {/* Editorial Magazin-Liste — divide-y */}
        <div className="divide-y divide-foreground/10 border-t border-b border-foreground/10">
          {visiblePosts.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-foreground/55">
                Keine Beiträge zu diesem Filter. Wechsle das Themenfeld.
              </p>
            </div>
          ) : (
            visiblePosts.map((post, i) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group grid grid-cols-12 gap-6 md:gap-10 py-8 md:py-10 items-start hover:bg-foreground/[0.025] transition-colors duration-300 px-2 -mx-2 rounded-2xl"
              >
                {/* Datum + Nr */}
                <div className="col-span-12 md:col-span-2 flex md:flex-col gap-3 md:gap-1">
                  <span
                    className="text-[11px] tracking-[0.14em] uppercase font-bold tabular-nums"
                    style={{ color: ACCENT }}
                  >
                    №&nbsp;{String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`text-base md:text-lg text-foreground/65 tabular-nums`}
                  >
                    {formatDate(post.date)}
                  </span>
                </div>

                {/* Title + Excerpt + Meta */}
                <div className="col-span-12 md:col-span-7">
                  <div className="text-[11px] tracking-[0.14em] uppercase font-bold text-foreground/45 mb-2">
                    {post.category}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-display font-bold tracking-[-0.015em] leading-tight mb-3 group-hover:text-[color:var(--accent)] transition-colors duration-300"
                      style={{ ['--accent' as never]: ACCENT } as React.CSSProperties}>
                    {post.title}{" "}
                    {post.titleAccent && (
                      <span

                        style={{ color: ACCENT, fontWeight: 400 }}
                      >
                        {post.titleAccent}
                      </span>
                    )}
                  </h3>
                  <p className="text-base text-foreground/65 leading-[1.6] mb-4 max-w-2xl">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-foreground/50">
                    <span className="inline-flex items-center gap-1.5">
                      <Feather className="w-3 h-3" />
                      {post.author.name}
                    </span>
                    <span className="text-foreground/25">·</span>
                    <span className="inline-flex items-center gap-1.5 tabular-nums">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                    <span className="text-foreground/25">·</span>
                    <span className="tabular-nums">{post.words} Wörter</span>
                  </div>
                </div>

                {/* Tag + Arrow */}
                <div className="col-span-12 md:col-span-3 flex md:justify-end items-start">
                  <div className="flex flex-col items-start md:items-end gap-3">
                    <span
                      className="text-[10px] tracking-[0.1em] uppercase font-semibold px-2.5 py-1 rounded-full"
                      style={{
                        background: ACCENT_SOFT + "55",
                        color: ACCENT_DEEP,
                      }}
                    >
                      {post.tags[0]}
                    </span>
                    <span
                      className="inline-flex items-center gap-2 text-[12px] tracking-[0.08em] uppercase font-semibold text-foreground/55 group-hover:text-foreground transition-colors"
                    >
                      Lesen
                      <ArrowUpRight
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                        style={{ color: ACCENT }}
                      />
                    </span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   REDAKTIONS-SCHAUFENSTER (Bento 1 large + 2 small)
   ═══════════════════════════════════════════════════════════ */
const RedaktionsSchaufenster = ({ posts }: { posts: BlogPost[] }) => {
  if (posts.length < 3) return null;
  const [large, small1, small2] = posts;
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="bg-background py-20 md:py-28">
      <div className="container px-6">
        <div className="grid lg:grid-cols-12 gap-10 mb-14 items-end">
          <div className="lg:col-span-7">
            <div className={`text-lg text-foreground/55 mb-5`}>
              Editor's Pick.
            </div>
            <h2 className="text-[clamp(2rem,4.5vw,4.2rem)] font-display font-black tracking-[-0.025em] leading-[1.02]">
              Drei{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                Lieblinge.
              </span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base md:text-lg leading-[1.65] text-foreground/65">
              Die Beiträge, die im letzten Quartal am meisten geteilt wurden —
              und die ich selbst gerne noch einmal lese.
            </p>
          </div>
        </div>

        <div
          className={`grid lg:grid-cols-12 gap-6 md:gap-8 ${isVisible ? "opacity-100" : "opacity-0"} transition-opacity duration-700`}
        >
          {/* LARGE */}
          <Link
            to={`/blog/${large.slug}`}
            className="group lg:col-span-7 relative overflow-hidden rounded-3xl h-[520px] md:h-[600px] block"
          >
            <img
              src={coverImg(large.cover)}
              alt={large.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
              style={{ objectPosition: "center 25%" }}
              loading="lazy"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(8,6,12,0.05) 0%, rgba(8,6,12,0.85) 100%)",
              }}
            />
            <div className="absolute inset-x-0 bottom-0 p-8 md:p-10 text-white">
              <div className="flex items-center gap-3 mb-4 text-[11px] tracking-[0.14em] uppercase font-bold">
                <span
                  className="px-2.5 py-1 rounded-full"
                  style={{
                    background: `linear-gradient(135deg, ${ACCENT_DEEP}, ${ACCENT})`,
                  }}
                >
                  {large.category}
                </span>
                <span className="text-white/70">{large.readTime}</span>
              </div>
              <h3 className="text-3xl md:text-5xl font-display font-black tracking-[-0.025em] leading-[1.02] mb-3 max-w-2xl">
                {large.title}{" "}
                {large.titleAccent && (
                  <span>{large.titleAccent}</span>
                )}
              </h3>
              <p className="text-white/75 text-sm md:text-base max-w-xl line-clamp-2">
                {large.excerpt}
              </p>
            </div>
          </Link>

          {/* SMALL stack */}
          <div className="lg:col-span-5 grid grid-rows-2 gap-6 md:gap-8">
            {[small1, small2].map((p) => (
              <Link
                key={p.slug}
                to={`/blog/${p.slug}`}
                className="group relative overflow-hidden rounded-3xl h-[250px] md:h-[286px] block"
              >
                <img
                  src={coverImg(p.cover)}
                  alt={p.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                  style={{ objectPosition: "center 30%" }}
                  loading="lazy"
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(8,6,12,0.15) 0%, rgba(8,6,12,0.82) 100%)",
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <div className="text-[10px] tracking-[0.14em] uppercase font-bold mb-2 text-white/80">
                    {p.category} · {p.readTime}
                  </div>
                  <h4 className="text-lg md:text-xl font-display font-bold leading-snug">
                    {p.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   TOP-POSTS (Mock Read-Count)
   ═══════════════════════════════════════════════════════════ */
const TopPosts = ({ posts }: { posts: BlogPost[] }) => {
  // Mock-View-Counts (stabil deterministisch aus slug-length)
  const mocked = posts
    .slice(0, 5)
    .map((p) => ({
      ...p,
      views: 800 + (p.slug.length * 137) % 3200,
    }))
    .sort((a, b) => b.views - a.views);

  return (
    <section className="bg-[#08060c] text-white py-20 md:py-28 relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 50% at 90% 20%, rgba(0,0,0,0.040) 0%, transparent 60%), radial-gradient(50% 40% at 10% 80%, rgba(0,0,0,0.024) 0%, transparent 65%)",
        }}
      />
      <div className="relative container px-6">
        <div className="grid lg:grid-cols-12 gap-10 mb-14 items-end">
          <div className="lg:col-span-7">
            <div className={`text-lg text-white/55 mb-5`}>
              Am meisten gelesen.
            </div>
            <h2 className="text-[clamp(2rem,4.5vw,4.2rem)] font-display font-black tracking-[-0.025em] leading-[1.02]">
              Top-Beiträge{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT_SOFT }}>
                dieses Quartals.
              </span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base md:text-lg leading-[1.65] text-white/65">
              Diese fünf Artikel haben in den vergangenen drei Monaten die
              meisten Leser:innen gefunden.
            </p>
          </div>
        </div>

        <ol className="space-y-2">
          {mocked.map((p, i) => (
            <li key={p.slug}>
              <Link
                to={`/blog/${p.slug}`}
                className="group grid grid-cols-12 gap-4 md:gap-8 items-baseline py-5 md:py-6 px-4 md:px-6 rounded-2xl hover:bg-white/[0.04] transition-colors duration-300"
              >
                <span
                  className={`${SERIF_ITALIC} col-span-2 md:col-span-1 text-3xl md:text-5xl font-normal tabular-nums`}
                  style={{ color: ACCENT_SOFT }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="col-span-7 md:col-span-8">
                  <div className="text-[10px] tracking-[0.14em] uppercase font-bold text-white/55 mb-1">
                    {p.category}
                  </div>
                  <h3 className="text-lg md:text-2xl font-display font-bold leading-snug text-white group-hover:translate-x-1 transition-transform duration-300">
                    {p.title}
                  </h3>
                </div>
                <div className="col-span-3 text-right">
                  <div className="text-[11px] tracking-[0.1em] uppercase text-white/50">
                    Gelesen
                  </div>
                  <div
                    className="text-base md:text-xl font-bold tabular-nums"
                    style={{ color: ACCENT_SOFT }}
                  >
                    {(p.views / 1000).toFixed(1)}k
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   PULL QUOTE
   ═══════════════════════════════════════════════════════════ */
const PullQuoteBlack = () => (
  <section className="relative bg-[#08060c] text-white py-24 md:py-32 overflow-hidden">
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(70% 60% at 50% 50%, rgba(0,0,0,0.040) 0%, transparent 70%)",
      }}
    />
    <div className="relative container px-6 max-w-4xl text-center">
      <Quote
        className="w-12 h-12 mx-auto mb-8 opacity-70"
        style={{ color: ACCENT_SOFT }}
      />
      <blockquote className="text-3xl md:text-5xl font-display font-black tracking-[-0.02em] leading-[1.15]">
        Manche Geschichten passen nicht{" "}
        <span className={SERIF_ITALIC} style={{ color: ACCENT_SOFT }}>
          auf die Bühne.
        </span>{" "}
        Genau die landen hier.
      </blockquote>
      <p className={`mt-8 text-white/55 text-base md:text-lg`}>
        — die Editorial-Idee dieses Magazins
      </p>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════
   NEWSLETTER
   ═══════════════════════════════════════════════════════════ */
const NewsletterSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (email.includes("@") && email.length > 5) {
      captureEmail(email, "blog-newsletter", { name });
    }
  }, [email, name]);

  const [error, setError] = useState<string | null>(null);
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.includes("@")) return;
    try {
      await subscribeNewsletter({
        email,
        name: name.trim() || undefined,
        source: "blog-newsletter",
      });
      markEmailSubmitted();
      setSent(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? `Anmeldung fehlgeschlagen: ${err.message}`
          : "Anmeldung fehlgeschlagen. Bitte später erneut versuchen.",
      );
    }
  };

  return (
    <section className="bg-[#fafafa] py-20 md:py-28">
      <div className="container px-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <div className={`text-lg text-foreground/55 mb-5`}>
              Magazin-Update.
            </div>
            <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-display font-black tracking-[-0.025em] leading-[1.02] mb-6">
              Einmal im Quartal.{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                Kein Spam.
              </span>
            </h2>
            <p className="text-base md:text-lg leading-[1.65] text-foreground/65 mb-8 max-w-lg">
              Eine kompakte Nachricht in dein Postfach — wenn ein neuer
              Schwung Artikel erscheint. Kein Funnel, keine Tracking-Werbung,
              keine sechs E-Mails pro Woche. Vier Mails im Jahr, das war's.
            </p>
            <ul className="space-y-3 text-sm text-foreground/70">
              {[
                "Vorabblick auf neue Beiträge.",
                "Backstage-Ausschnitte von Bühnenauftritten.",
                "Termine für offene Magic-Dinner-Abende.",
                "Abmelden jederzeit per Klick.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span
                    className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: ACCENT }}
                  />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6">
            <form
              onSubmit={onSubmit}
              className="bg-white rounded-3xl p-8 md:p-10 shadow-[0_30px_80px_-30px_rgba(8,6,12,0.25)]"
            >
              <div className="flex items-center gap-3 mb-7">
                <Mail className="w-5 h-5" style={{ color: ACCENT }} />
                <span className="text-[12px] tracking-[0.14em] uppercase font-bold text-foreground/65">
                  Abonnieren
                </span>
              </div>

              {sent ? (
                <div className="text-center py-10">
                  <Sparkles
                    className="w-10 h-10 mx-auto mb-4"
                    style={{ color: ACCENT }}
                  />
                  <h3 className="text-2xl font-display font-bold mb-3">
                    Eingetragen.
                  </h3>
                  <p className="text-foreground/65 text-sm leading-relaxed">
                    Du bekommst eine Bestätigung an{" "}
                    <strong>{email}</strong>. Beim nächsten Beitrag melde ich
                    mich.
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[11px] tracking-[0.1em] uppercase font-semibold text-foreground/55 mb-2">
                        Name
                      </label>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Wie heißt du?"
                        className="w-full bg-foreground/[0.04] border border-foreground/10 rounded-2xl px-5 py-3.5 text-base focus:outline-none focus:border-foreground/30 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] tracking-[0.1em] uppercase font-semibold text-foreground/55 mb-2">
                        E-Mail
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="dein.name@beispiel.de"
                        className="w-full bg-foreground/[0.04] border border-foreground/10 rounded-2xl px-5 py-3.5 text-base focus:outline-none focus:border-foreground/30 transition-colors"
                      />
                    </div>
                  </div>
                  {error && (
                    <p className="mt-4 text-sm text-[color:var(--ac)]" style={{ ["--ac" as never]: ACCENT }}>
                      {error}
                    </p>
                  )}
                  <button
                    type="submit"
                    className="mt-7 w-full inline-flex items-center justify-center gap-2 text-[13px] tracking-[0.08em] uppercase font-semibold px-6 py-4 rounded-full text-white transition-transform duration-300 hover:scale-[1.015]"
                    style={{
                      background: `linear-gradient(135deg, ${ACCENT_DEEP}, ${ACCENT})`,
                    }}
                  >
                    Eintragen
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="mt-4 text-[11px] text-foreground/45 text-center">
                    Mit dem Eintragen stimmst du dem Versand des Magazins zu.
                    Abmelden geht jederzeit per Klick in jeder Mail.
                  </p>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   AUTOR VORSTELLUNG
   ═══════════════════════════════════════════════════════════ */
const AutorVorstellung = () => (
  <section className="bg-background py-20 md:py-28">
    <div className="container px-6">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className="lg:col-span-5 relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
            <img
              src={portraitImg}
              alt="Emilian Leber, Magier und Autor des Magazins"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: "center 20%" }}
              loading="lazy"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, transparent 55%, rgba(8,6,12,0.55) 100%)",
              }}
            />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <div className={`text-sm text-white/70`}>
                Im Magazin schreibt.
              </div>
              <div className="text-lg font-display font-bold">
                Emilian Leber
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className={`text-lg text-foreground/55 mb-5`}>
            Über den Autor.
          </div>
          <h2 className="text-[clamp(2rem,4.5vw,3.6rem)] font-display font-black tracking-[-0.025em] leading-[1.02] mb-6">
            Magier seit acht.{" "}
            <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
              Schreibend seit jetzt.
            </span>
          </h2>
          <div className="space-y-4 text-base md:text-lg leading-[1.65] text-foreground/70 max-w-xl mb-8">
            <p>
              Ich heiße Emilian Leber, bin 1
              <span className="tabular-nums">8</span> und seit acht Jahren
              Magier. 2024 stand ich bei Talents of Magic als Finalist auf der
              Bühne, im selben Jahr beim Greatest Talent. 2025 begann mein
              erstes komplettes Berufsjahr. 2026 startet die erste eigene Tour
              [Plötzlich Magie — Magic Meets Comedy].
            </p>
            <p>
              Dieses Magazin entstand, weil viele Geschichten zwischen Saal
              und Probe nicht in einen Buchungs-Brief passen. Hier landen die
              Beobachtungen aus dem Backstage, die Antworten auf
              Buchungsfragen, die Hintergründe zu Tour-Stops und gelegentlich
              ein Ausblick auf das, was als nächstes kommt.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <Link
              to="/ueber-mich"
              className="inline-flex items-center gap-2 text-[13px] tracking-[0.08em] uppercase font-semibold px-6 py-3 rounded-full text-white transition-transform duration-300 hover:scale-[1.035]"
              style={{
                background: `linear-gradient(135deg, ${ACCENT_DEEP}, ${ACCENT})`,
              }}
            >
              Mehr zur Person
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/presse"
              className="inline-flex items-center gap-2 text-[13px] tracking-[0.08em] uppercase font-semibold text-foreground/70 hover:text-foreground transition-colors"
            >
              Pressebereich
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-foreground/55">
            <span className="inline-flex items-center gap-2">
              <Star className="w-4 h-4" style={{ color: ACCENT }} />
              <span className="tabular-nums">5,0</span> · 30+ Bewertungen
            </span>
            <span>·</span>
            <span className="tabular-nums">200+ Events</span>
            <span>·</span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="w-4 h-4" style={{ color: ACCENT }} />
              Regensburg · Bayern · DACH
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════
   THEMEN WOLKE (Tag Cloud)
   ═══════════════════════════════════════════════════════════ */
const ThemenWolke = ({ posts }: { posts: BlogPost[] }) => {
  const tags = allTags(posts);
  // Größenklasse anhand Häufigkeit
  const counts = tags.map(
    (t) => posts.filter((p) => p.tags.includes(t)).length,
  );
  const maxC = Math.max(...counts);

  const onTagClick = (tag: string) => {
    window.location.hash = `tag=${encodeURIComponent(tag)}`;
    // Scroll zur PostsListe
    const el = document.getElementById("posts-liste-anchor");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="bg-[#fafafa] py-20 md:py-28">
      <div className="container px-6">
        <div className="grid lg:grid-cols-12 gap-10 mb-14 items-end">
          <div className="lg:col-span-7">
            <div className={`text-lg text-foreground/55 mb-5`}>
              Themenwolke.
            </div>
            <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-display font-black tracking-[-0.025em] leading-[1.02]">
              Was hier{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                besprochen wird.
              </span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base md:text-lg leading-[1.65] text-foreground/65">
              Größe entspricht Häufigkeit. Klick filtert die Beitragsliste auf
              dieses Themenfeld.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-4 items-baseline">
          {tags.map((tag) => {
            const c = posts.filter((p) => p.tags.includes(tag)).length;
            const ratio = c / maxC;
            const size = 16 + ratio * 26;
            return (
              <button
                key={tag}
                onClick={() => onTagClick(tag)}
                className={`hover:text-[color:var(--accent)] transition-colors leading-none`}
                style={
                  {
                    fontSize: `${size}px`,
                    color:
                      ratio > 0.66
                        ? ACCENT_DEEP
                        : ratio > 0.33
                          ? "rgba(8,6,12,0.78)"
                          : "rgba(8,6,12,0.5)",
                    ['--accent' as never]: ACCENT,
                  } as React.CSSProperties
                }
              >
                {tag}
                <span
                  className="tabular-nums ml-1 text-[11px] align-super font-display not-italic"
                  style={{ color: ACCENT }}
                >
                  {c}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   VERWANDTE RESSOURCEN
   ═══════════════════════════════════════════════════════════ */
const VerwandteRessourcen = () => {
  const items = [
    {
      to: "/presse",
      eyebrow: "Pressebereich.",
      title: "Pressemitteilungen & Pressefotos",
      body: "Alles, was Redaktionen brauchen: Pressefotos in Druckqualität, Vita-PDF, Kontakt.",
      image: portraitBuchImg,
    },
    {
      to: "/referenzen",
      eyebrow: "Referenzen.",
      title: "Echte Kunden & Reviews",
      body: "17+ Kundenlogos, 200+ Events, drei ausführliche Reviews zum Nachlesen.",
      image: audienceImg,
    },
    {
      to: "/buchung",
      eyebrow: "Buchung.",
      title: "Anfrage in 24 Stunden",
      body: "Termin, Anlass, Location — und du hast in unter einem Tag Antwort plus Konzept.",
      image: schneiderImg,
    },
  ];

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container px-6">
        <div className="grid lg:grid-cols-12 gap-10 mb-14 items-end">
          <div className="lg:col-span-7">
            <div className={`text-lg text-foreground/55 mb-5`}>
              Im Haus.
            </div>
            <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-display font-black tracking-[-0.025em] leading-[1.02]">
              Verwandte{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                Bereiche.
              </span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base md:text-lg leading-[1.65] text-foreground/65">
              Drei weitere Stellen auf magicel.de, an denen Redaktionen,
              Eventplaner:innen und private Gastgeber:innen fündig werden.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {items.map((it) => (
            <Link
              key={it.to}
              to={it.to}
              className="group block bg-[#fafafa] rounded-3xl overflow-hidden hover:-translate-y-1 transition-transform duration-500"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={it.image}
                  alt={it.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
                  style={{ objectPosition: "center 30%" }}
                  loading="lazy"
                />
              </div>
              <div className="p-6 md:p-7">
                <div
                  className={`text-base mb-2`}
                  style={{ color: ACCENT }}
                >
                  {it.eyebrow}
                </div>
                <h3 className="text-xl md:text-2xl font-display font-bold leading-snug mb-3">
                  {it.title}
                </h3>
                <p className="text-sm text-foreground/65 leading-[1.6] mb-4">
                  {it.body}
                </p>
                <span className="inline-flex items-center gap-2 text-[12px] tracking-[0.08em] uppercase font-semibold text-foreground/65 group-hover:text-foreground">
                  Öffnen
                  <ArrowUpRight
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    style={{ color: ACCENT }}
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   FINAL CTA
   ═══════════════════════════════════════════════════════════ */
const FinalCTA = () => (
  <section className="relative bg-[#08060c] text-white py-24 md:py-32 overflow-hidden">
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(60% 50% at 25% 30%, rgba(0,0,0,0.040) 0%, transparent 60%), radial-gradient(50% 40% at 80% 70%, rgba(0,0,0,0.024) 0%, transparent 65%)",
      }}
    />
    <div className="relative container px-6 text-center max-w-4xl">
      <div className={`text-lg text-white/55 mb-6`}>
        Zwei Wege weiter.
      </div>
      <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-display font-black tracking-[-0.025em] leading-[1.02] mb-10">
        Lesen.{" "}
        <span className={SERIF_ITALIC} style={{ color: ACCENT_SOFT }}>
          Oder buchen.
        </span>
      </h2>
      <p className="text-base md:text-lg leading-[1.65] text-white/65 max-w-2xl mx-auto mb-12">
        Magazin abonnieren für Geschichten zwischen Tisch und Bühne — oder
        direkt eine Show planen. Beides geht. Beides ist gut.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/#planer"
          className="inline-flex items-center justify-center gap-2 text-[13px] tracking-[0.08em] uppercase font-semibold px-8 py-4 rounded-full text-foreground bg-white transition-transform duration-300 hover:scale-[1.035]"
        >
          Show planen
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          to="/buchung"
          className="inline-flex items-center justify-center gap-2 text-[13px] tracking-[0.08em] uppercase font-semibold px-8 py-4 rounded-full text-white border border-white/30 hover:bg-white/10 transition-colors"
        >
          Anfrage stellen
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
      <p className="mt-10 text-[11px] tracking-[0.1em] uppercase text-white/40">
        Antwort innerhalb 24 Stunden · el@magicel.de · 5,0★ · 30+ Bewertungen
      </p>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════ */
const Blog = () => {
  const today = new Date().toISOString().split("T")[0];
  const published = useMemo(
    () => blogPosts.filter((p) => p.date <= today),
    [today],
  );

  const featured = useMemo(() => {
    return (
      published.find((p) => p.slug === FEATURED_SLUG) ??
      published.find((p) => p.featured) ??
      published[0]
    );
  }, [published]);

  const editorsPick = useMemo(() => {
    return published.filter((p) => p.slug !== featured?.slug).slice(0, 3);
  }, [published, featured]);

  return (
    <>
      <Helmet>
        <html lang="de" />
        <title>
          Magazin — Geschichten zwischen Tisch und Bühne | Emilian Leber
        </title>
        <meta
          name="description"
          content="Magazin von Magier Emilian Leber: Beobachtungen aus dem Magic Dinner, Hochzeit, Firmenfeier, Bühne. Quartalsweise neue Beiträge, 5,0★ aus 30+ Bewertungen."
        />
        <meta
          name="keywords"
          content="Magier Magazin, Zauberer Blog, Magic Dinner Geschichten, Hochzeitszauberer Tipps, Firmenfeier Entertainment, Emilian Leber Blog, Bayern Magier Magazin, Comedy-Magie Hintergrund, Plötzlich Magie Tour, Bühnenshow Behind the Scenes"
        />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <link rel="canonical" href="https://www.magicel.de/blog" />
        <meta
          property="og:title"
          content="Magazin — Geschichten zwischen Tisch und Bühne | Emilian Leber"
        />
        <meta
          property="og:description"
          content="Beobachtungen aus Magic Dinner, Hochzeit, Bühne und Backstage. Quartalsweise neue Beiträge von Magier Emilian Leber."
        />
        <meta property="og:url" content="https://www.magicel.de/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.magicel.de/og-image.jpg" />
        <meta property="og:locale" content="de_DE" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Magazin — Geschichten zwischen Tisch und Bühne | Emilian Leber"
        />
        <meta
          name="twitter:description"
          content="Beobachtungen aus Magic Dinner, Hochzeit, Bühne und Backstage."
        />
        <meta
          name="twitter:image"
          content="https://www.magicel.de/og-image.jpg"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "MagicEL Magazin",
            description:
              "Magazin von Magier Emilian Leber — Geschichten zwischen Tisch und Bühne.",
            url: "https://www.magicel.de/blog",
            inLanguage: "de-DE",
            publisher: {
              "@type": "Person",
              name: "Emilian Leber",
              url: "https://www.magicel.de/ueber-mich",
            },
            blogPost: published.map((p) => ({
              "@type": "BlogPosting",
              headline: p.title,
              datePublished: p.date,
              url: `https://www.magicel.de/blog/${p.slug}`,
              author: {
                "@type": "Person",
                name: p.author.name,
              },
              keywords: p.tags.join(", "),
            })),
          })}
        </script>
      </Helmet>
      <PageLayout>
        <Hero posts={published} />
        {featured && <FeaturedArtikel post={featured} />}
        <PullQuoteBlack />
        <div id="posts-liste-anchor" />
        <PostsListe posts={published} featuredSlug={featured?.slug ?? ""} />
        <RedaktionsSchaufenster posts={editorsPick} />
        <TopPosts posts={published} />
        <ThemenWolke posts={published} />
        <NewsletterSignup />
        <AutorVorstellung />
        <VerwandteRessourcen />
        <FinalCTA />
      </PageLayout>
    </>
  );
};

export default Blog;
