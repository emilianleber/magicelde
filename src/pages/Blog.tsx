import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  blogPosts,
  CATEGORIES,
  FEATURED_SLUG,
  type BlogPost,
} from "@/data/blogPosts";
import { captureEmail, markEmailSubmitted } from "@/lib/emailCapture";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Clock,
  Feather,
  Filter,
  Mail,
  MapPin,
  Sparkles,
  Star,
  Tag,
} from "lucide-react";

import VoltageShell from "@/components/voltage/VoltageShell";
import { ReviewsBlock } from "@/components/voltage/sections";
import {
  INK,
  WHITE,
  PAPER,
  COBALT,
  MAGENTA,
  L_LINE,
  L_DIM,
  D_DIM,
  Eyebrow,
} from "@/components/voltage/theme";

import weddingImg from "@/assets/wedding-magic.jpg";
import dinnerBookImg from "@/assets/magicdinner-book.jpg";
import dinnerBuehneImg from "@/assets/magicdinner-buehne.jpg";
import buehneZuschauerImg from "@/assets/buehne-zuschauer.jpg";
import buehneDpsgImg from "@/assets/buehne-dpsg.jpg";
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

/* Voltage: Cobalt-Akzent, Ink/Weiss/kuehl, kein Gold/Burgunder/Serif. */

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
   HERO (Voltage SubHero-Stil — hell, Cobalt-Akzent)
   ═══════════════════════════════════════════════════════════ */
const Hero = ({ posts }: { posts: BlogPost[] }) => {
  const minutes = totalReadMinutes(posts);
  const themes = new Set(posts.map((p) => p.category)).size;

  return (
    <header
      className="relative overflow-hidden px-5 md:px-10 pt-10 md:pt-16 pb-14 md:pb-20"
      style={{ background: WHITE }}
    >
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-44 -left-24 w-[680px] h-[680px] rounded-full"
          style={{ background: `radial-gradient(circle, ${COBALT}1f 0%, transparent 60%)`, filter: "blur(30px)" }}
        />
        <div
          className="absolute -top-28 right-[-60px] w-[520px] h-[520px] rounded-full"
          style={{ background: `radial-gradient(circle, ${MAGENTA}1a 0%, transparent 60%)`, filter: "blur(30px)" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <Eyebrow>Magazin · MagicEL — Ausgabe Frühjahr 2026</Eyebrow>
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          <div className="lg:col-span-8">
            <h1
              className="font-extrabold tracking-[-0.03em]"
              style={{ fontSize: "clamp(2.5rem,6vw,5.25rem)", lineHeight: 0.98, color: INK }}
            >
              Magazin der Bühne und{" "}
              <span style={{ color: COBALT }}>Tafel</span>
              <span style={{ color: MAGENTA }}>.</span>
            </h1>
          </div>

          <div className="lg:col-span-4">
            <p className="text-[16px] md:text-lg leading-[1.65] max-w-md" style={{ color: L_DIM }}>
              Geschichten aus dem Alltag eines Magiers zwischen Tafel, Bühne
              und Probe. Beobachtungen, Handwerk, Hinter-den-Kulissen — alle
              vier bis sechs Wochen ein neuer Beitrag.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm" style={{ color: L_DIM }}>
              <span className="inline-flex items-center gap-2 tabular-nums">
                <BookOpen className="w-4 h-4" style={{ color: COBALT }} />
                <strong className="font-bold" style={{ color: INK }}>{posts.length}</strong> Artikel
              </span>
              <span style={{ color: "rgba(10,11,15,0.25)" }}>·</span>
              <span className="inline-flex items-center gap-2 tabular-nums">
                <Tag className="w-4 h-4" style={{ color: COBALT }} />
                <strong className="font-bold" style={{ color: INK }}>{themes}</strong> Themen
              </span>
              <span style={{ color: "rgba(10,11,15,0.25)" }}>·</span>
              <span className="inline-flex items-center gap-2 tabular-nums">
                <Clock className="w-4 h-4" style={{ color: COBALT }} />
                <strong className="font-bold" style={{ color: INK }}>{minutes}</strong> Min. Lesezeit
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

/* ═══════════════════════════════════════════════════════════
   FEATURED ARTIKEL (Titelstory — Foto + Detail, Cobalt)
   ═══════════════════════════════════════════════════════════ */
const FeaturedArtikel = ({ post }: { post: BlogPost }) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="px-5 md:px-10 py-16 md:py-24" style={{ background: WHITE }}>
      <div className="max-w-7xl mx-auto">
        <div
          className={`flex items-center gap-3 mb-10 ${isVisible ? "opacity-100" : "opacity-0"} transition-opacity duration-700`}
        >
          <Sparkles className="w-4 h-4" style={{ color: COBALT }} />
          <span className="text-[12px] tracking-[0.16em] uppercase font-semibold" style={{ color: L_DIM }}>
            Im Fokus dieser Ausgabe
          </span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <Link
            to={`/blog/${post.slug}`}
            className={`group block lg:col-span-7 relative overflow-hidden rounded-[28px] ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            } transition-all duration-700`}
            style={{ boxShadow: "0 40px 80px -34px rgba(10,11,15,0.4)" }}
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={coverImg(post.cover)}
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                style={{ objectPosition: "center top" }}
                loading="lazy"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{ background: "linear-gradient(180deg, rgba(10,11,15,0) 45%, rgba(10,11,15,0.6) 100%)" }}
              />
              <div className="absolute top-6 left-6 flex items-center gap-3">
                <span
                  className="text-[11px] tracking-[0.14em] uppercase font-bold px-3 py-1.5 rounded-full text-white"
                  style={{ background: COBALT }}
                >
                  Titelstory
                </span>
                <span className="text-[12px] tracking-[0.1em] uppercase text-white/90 font-semibold backdrop-blur-md bg-white/15 px-3 py-1.5 rounded-full">
                  {post.category}
                </span>
              </div>
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white text-sm">
                <span className="text-base md:text-lg tabular-nums">
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
            <div className="text-[12px] uppercase tracking-[0.16em] font-semibold mb-4" style={{ color: L_DIM }}>
              Titelstory
            </div>
            <h2
              className="font-extrabold tracking-[-0.02em] mb-6"
              style={{ fontSize: "clamp(1.8rem,3.6vw,3rem)", lineHeight: 1.05, color: INK }}
            >
              {post.title}{" "}
              {post.titleAccent && (
                <span style={{ color: COBALT }}>{post.titleAccent}</span>
              )}
            </h2>
            <p className="text-base md:text-lg leading-[1.65] mb-8" style={{ color: L_DIM }}>
              {post.excerpt}
            </p>
            <div className="flex items-center gap-4 mb-8 text-sm" style={{ color: L_DIM }}>
              <div className="flex items-center gap-2">
                <Feather className="w-4 h-4" style={{ color: COBALT }} />
                <span className="font-semibold" style={{ color: INK }}>
                  {post.author.name}
                </span>
              </div>
              <span style={{ color: "rgba(10,11,15,0.25)" }}>·</span>
              <span className="tabular-nums">{formatDate(post.date)}</span>
              <span style={{ color: "rgba(10,11,15,0.25)" }}>·</span>
              <span className="tabular-nums">{post.readTime}</span>
            </div>
            <Link
              to={`/blog/${post.slug}`}
              className="inline-flex items-center gap-2 text-[13px] tracking-[0.08em] uppercase font-semibold px-6 py-3 rounded-full text-white transition-transform duration-300 hover:scale-[1.035]"
              style={{ background: COBALT }}
            >
              Artikel lesen
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="mt-10 pt-8 flex flex-wrap gap-2" style={{ borderTop: `1px solid ${L_LINE}` }}>
              {post.tags.slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="text-[11px] tracking-[0.06em] uppercase font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: `${COBALT}14`, color: COBALT }}
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
    <section
      className="px-5 md:px-10 py-16 md:py-24"
      style={{ background: PAPER, borderTop: `1px solid ${L_LINE}`, borderBottom: `1px solid ${L_LINE}` }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 mb-12 items-end">
          <div className="lg:col-span-7">
            <Eyebrow>Alle Beiträge</Eyebrow>
            <h2
              className="font-extrabold tracking-[-0.02em]"
              style={{ fontSize: "clamp(1.75rem,4.4vw,3.4rem)", lineHeight: 1.04, color: INK }}
            >
              Geschichten zwischen{" "}
              <span style={{ color: COBALT }}>Tisch und Bühne.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base md:text-lg leading-[1.6]" style={{ color: L_DIM }}>
              Filtere nach Themenfeld oder lies einfach von oben nach unten.
              Die neuesten Beiträge stehen zuerst. Tags sind klickbar — sie
              filtern die Liste weiter.
            </p>
          </div>
        </div>

        {/* Kategorien Tabs */}
        <div className="flex items-center gap-2 mb-6">
          <Filter className="w-4 h-4" style={{ color: L_DIM }} />
          <span className="text-[12px] tracking-[0.16em] uppercase font-semibold" style={{ color: L_DIM }}>
            Themenfeld
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
                    ? { background: COBALT, color: WHITE }
                    : { background: WHITE, color: L_DIM, border: `1px solid ${L_LINE}` }
                }
              >
                {cat}
              </button>
            );
          })}
        </div>

        {activeTag && (
          <div className="mb-10 flex items-center gap-3 text-sm">
            <span style={{ color: L_DIM }}>Aktiver Tag-Filter:</span>
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-white font-semibold"
              style={{ background: COBALT }}
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
        <div className="divide-y" style={{ borderColor: L_LINE, borderTop: `1px solid ${L_LINE}`, borderBottom: `1px solid ${L_LINE}` }}>
          {visiblePosts.length === 0 ? (
            <div className="py-16 text-center">
              <p style={{ color: L_DIM }}>
                Keine Beiträge zu diesem Filter. Wechsle das Themenfeld.
              </p>
            </div>
          ) : (
            visiblePosts.map((post, i) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group grid grid-cols-12 gap-6 md:gap-10 py-8 md:py-10 items-start transition-colors duration-300 px-2 -mx-2 rounded-2xl hover:bg-white"
              >
                {/* Datum + Nr */}
                <div className="col-span-12 md:col-span-2 flex md:flex-col gap-3 md:gap-1">
                  <span
                    className="text-[11px] tracking-[0.14em] uppercase font-bold tabular-nums"
                    style={{ color: COBALT }}
                  >
                    №&nbsp;{String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base md:text-lg tabular-nums" style={{ color: L_DIM }}>
                    {formatDate(post.date)}
                  </span>
                </div>

                {/* Title + Excerpt + Meta */}
                <div className="col-span-12 md:col-span-7">
                  <div className="text-[11px] tracking-[0.14em] uppercase font-bold mb-2" style={{ color: L_DIM }}>
                    {post.category}
                  </div>
                  <h3
                    className="font-bold tracking-[-0.015em] leading-tight mb-3 transition-colors duration-300 group-hover:text-[#1D3FFF]"
                    style={{ fontSize: "clamp(1.5rem,2.4vw,2.1rem)", color: INK }}
                  >
                    {post.title}{" "}
                    {post.titleAccent && (
                      <span style={{ color: COBALT, fontWeight: 400 }}>
                        {post.titleAccent}
                      </span>
                    )}
                  </h3>
                  <p className="text-base leading-[1.6] mb-4 max-w-2xl" style={{ color: L_DIM }}>
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs" style={{ color: L_DIM }}>
                    <span className="inline-flex items-center gap-1.5">
                      <Feather className="w-3 h-3" />
                      {post.author.name}
                    </span>
                    <span style={{ color: "rgba(10,11,15,0.2)" }}>·</span>
                    <span className="inline-flex items-center gap-1.5 tabular-nums">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                    <span style={{ color: "rgba(10,11,15,0.2)" }}>·</span>
                    <span className="tabular-nums">{post.words} Wörter</span>
                  </div>
                </div>

                {/* Tag + Arrow */}
                <div className="col-span-12 md:col-span-3 flex md:justify-end items-start">
                  <div className="flex flex-col items-start md:items-end gap-3">
                    <span
                      className="text-[10px] tracking-[0.1em] uppercase font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: `${COBALT}14`, color: COBALT }}
                    >
                      {post.tags[0]}
                    </span>
                    <span
                      className="inline-flex items-center gap-2 text-[12px] tracking-[0.08em] uppercase font-semibold transition-colors group-hover:text-[#0A0B0F]"
                      style={{ color: L_DIM }}
                    >
                      Lesen
                      <ArrowUpRight
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                        style={{ color: COBALT }}
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
  const { ref, isVisible } = useScrollReveal();
  if (posts.length < 3) return null;
  const [large, small1, small2] = posts;

  return (
    <section ref={ref} className="px-5 md:px-10 py-16 md:py-24" style={{ background: WHITE }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 mb-12 items-end">
          <div className="lg:col-span-7">
            <Eyebrow>Editor's Pick</Eyebrow>
            <h2
              className="font-extrabold tracking-[-0.02em]"
              style={{ fontSize: "clamp(1.75rem,4.4vw,3.4rem)", lineHeight: 1.04, color: INK }}
            >
              Drei <span style={{ color: COBALT }}>Lieblinge.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base md:text-lg leading-[1.6]" style={{ color: L_DIM }}>
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
            className="group lg:col-span-7 relative overflow-hidden rounded-[28px] h-[520px] md:h-[600px] block"
          >
            <img
              src={coverImg(large.cover)}
              alt={large.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
              style={{ objectPosition: "center top" }}
              loading="lazy"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: "linear-gradient(180deg, rgba(10,11,15,0.05) 0%, rgba(10,11,15,0.85) 100%)" }}
            />
            <div className="absolute inset-x-0 bottom-0 p-8 md:p-10 text-white">
              <div className="flex items-center gap-3 mb-4 text-[11px] tracking-[0.14em] uppercase font-bold">
                <span className="px-2.5 py-1 rounded-full" style={{ background: COBALT }}>
                  {large.category}
                </span>
                <span className="text-white/70">{large.readTime}</span>
              </div>
              <h3
                className="font-extrabold tracking-[-0.02em] mb-3 max-w-2xl"
                style={{ fontSize: "clamp(1.875rem,3.5vw,3rem)", lineHeight: 1.04 }}
              >
                {large.title}{" "}
                {large.titleAccent && <span>{large.titleAccent}</span>}
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
                className="group relative overflow-hidden rounded-[28px] h-[250px] md:h-[286px] block"
              >
                <img
                  src={coverImg(p.cover)}
                  alt={p.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                  style={{ objectPosition: "center top" }}
                  loading="lazy"
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(180deg, rgba(10,11,15,0.15) 0%, rgba(10,11,15,0.82) 100%)" }}
                />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <div className="text-[10px] tracking-[0.14em] uppercase font-bold mb-2 text-white/80">
                    {p.category} · {p.readTime}
                  </div>
                  <h4 className="text-lg md:text-xl font-bold leading-snug">
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
   TOP-POSTS (Mock Read-Count) — dunkle Ink-Section
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
    <section className="px-5 md:px-10 py-16 md:py-24" style={{ background: INK, color: WHITE }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 mb-12 items-end">
          <div className="lg:col-span-7">
            <Eyebrow dark>Am meisten gelesen</Eyebrow>
            <h2
              className="font-extrabold tracking-[-0.02em]"
              style={{ fontSize: "clamp(1.75rem,4.4vw,3.4rem)", lineHeight: 1.04, color: WHITE }}
            >
              Top-Beiträge <span style={{ color: "#9db0ff" }}>dieses Quartals.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base md:text-lg leading-[1.6]" style={{ color: D_DIM }}>
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
                  className="col-span-2 md:col-span-1 text-3xl md:text-5xl font-extrabold tabular-nums"
                  style={{ color: "#9db0ff" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="col-span-7 md:col-span-8">
                  <div className="text-[10px] tracking-[0.14em] uppercase font-bold mb-1" style={{ color: D_DIM }}>
                    {p.category}
                  </div>
                  <h3 className="text-lg md:text-2xl font-bold leading-snug text-white group-hover:translate-x-1 transition-transform duration-300">
                    {p.title}
                  </h3>
                </div>
                <div className="col-span-3 text-right">
                  <div className="text-[11px] tracking-[0.1em] uppercase" style={{ color: D_DIM }}>
                    Gelesen
                  </div>
                  <div className="text-base md:text-xl font-bold tabular-nums" style={{ color: "#9db0ff" }}>
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
   STATEMENT (ruhige Aussage, ersetzt Pull-Quote-Black)
   ═══════════════════════════════════════════════════════════ */
const StatementBlock = () => (
  <section className="px-5 md:px-10 py-24 md:py-36" style={{ background: WHITE }}>
    <div className="max-w-4xl mx-auto text-center">
      <p className="flex items-center justify-center gap-2 text-[12px] tracking-[0.16em] uppercase font-semibold mb-7" style={{ color: L_DIM }}>
        <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: COBALT }} />
        Die Editorial-Idee
      </p>
      <h2
        className="font-extrabold tracking-[-0.02em]"
        style={{ fontSize: "clamp(2rem,4.6vw,3.6rem)", lineHeight: 1.1, color: INK }}
      >
        Manche Geschichten passen nicht{" "}
        <span style={{ color: COBALT }}>auf die Bühne.</span>{" "}
        Genau die landen hier.
      </h2>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════
   NEWSLETTER
   ═══════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════
   AUTOR VORSTELLUNG
   ═══════════════════════════════════════════════════════════ */
const AutorVorstellung = () => (
  <section className="px-5 md:px-10 py-16 md:py-24" style={{ background: WHITE }}>
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className="lg:col-span-5 relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px]" style={{ boxShadow: "0 40px 80px -34px rgba(10,11,15,0.4)" }}>
            <img
              src={portraitImg}
              alt="Emilian Leber, Magier und Autor des Magazins"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: "center top" }}
              loading="lazy"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: "linear-gradient(180deg, transparent 55%, rgba(10,11,15,0.55) 100%)" }}
            />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <div className="text-sm text-white/70">Im Magazin schreibt</div>
              <div className="text-lg font-bold">Emilian Leber</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <Eyebrow>Über den Autor</Eyebrow>
          <h2
            className="font-extrabold tracking-[-0.02em] mb-6"
            style={{ fontSize: "clamp(1.75rem,4.4vw,3.4rem)", lineHeight: 1.04, color: INK }}
          >
            Magier seit acht.{" "}
            <span style={{ color: COBALT }}>Schreibend seit jetzt.</span>
          </h2>
          <div className="space-y-4 text-base md:text-lg leading-[1.65] max-w-xl mb-8" style={{ color: L_DIM }}>
            <p>
              Ich heiße Emilian Leber, bin 1
              <span className="tabular-nums">8</span> und seit acht Jahren
              Magier. 2024 stand ich bei Talents of Magic als Finalist auf der
              Bühne, im selben Jahr beim Greatest Talent. 2025 begann mein
              erstes komplettes Berufsjahr. Dazu die erste eigene abendfüllende
              Show [Plötzlich Magie — Magic Meets Comedy].
            </p>
            <p>
              Dieses Magazin entstand, weil viele Geschichten zwischen Saal
              und Probe nicht in einen Buchungs-Brief passen. Hier landen die
              Beobachtungen aus dem Backstage, die Antworten auf
              Buchungsfragen, die Hintergründe zu einzelnen Abenden und
              gelegentlich ein Ausblick auf das, was als nächstes kommt.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <Link
              to="/ueber-mich"
              className="inline-flex items-center gap-2 text-[13px] tracking-[0.08em] uppercase font-semibold px-6 py-3 rounded-full text-white transition-transform duration-300 hover:scale-[1.035]"
              style={{ background: COBALT }}
            >
              Mehr zur Person
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/presse"
              className="inline-flex items-center gap-2 text-[13px] tracking-[0.08em] uppercase font-semibold transition-colors"
              style={{ color: L_DIM }}
            >
              Pressebereich
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm" style={{ color: L_DIM }}>
            <span className="inline-flex items-center gap-2">
              <Star className="w-4 h-4" style={{ color: COBALT }} />
              <span className="tabular-nums">5,0</span> · 30+ Bewertungen
            </span>
            <span>·</span>
            <span className="tabular-nums">200+ Events</span>
            <span>·</span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="w-4 h-4" style={{ color: COBALT }} />
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
    <section
      className="px-5 md:px-10 py-16 md:py-24"
      style={{ background: PAPER, borderTop: `1px solid ${L_LINE}`, borderBottom: `1px solid ${L_LINE}` }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 mb-12 items-end">
          <div className="lg:col-span-7">
            <Eyebrow>Themenwolke</Eyebrow>
            <h2
              className="font-extrabold tracking-[-0.02em]"
              style={{ fontSize: "clamp(1.75rem,4.4vw,3.4rem)", lineHeight: 1.04, color: INK }}
            >
              Was hier <span style={{ color: COBALT }}>besprochen wird.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base md:text-lg leading-[1.6]" style={{ color: L_DIM }}>
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
                className="hover:text-[#1D3FFF] transition-colors leading-none font-semibold"
                style={{
                  fontSize: `${size}px`,
                  color:
                    ratio > 0.66
                      ? INK
                      : ratio > 0.33
                        ? "rgba(10,11,15,0.78)"
                        : "rgba(10,11,15,0.5)",
                }}
              >
                {tag}
                <span
                  className="tabular-nums ml-1 text-[11px] align-super font-extrabold"
                  style={{ color: COBALT }}
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
      eyebrow: "Pressebereich",
      title: "Pressemitteilungen & Pressefotos",
      body: "Alles, was Redaktionen brauchen: Pressefotos in Druckqualität, Vita-PDF, Kontakt.",
      image: portraitBuchImg,
    },
    {
      to: "/referenzen",
      eyebrow: "Referenzen",
      title: "Echte Kunden & Reviews",
      body: "17+ Kundenlogos, 200+ Events, drei ausführliche Reviews zum Nachlesen.",
      image: audienceImg,
    },
    {
      to: "/buchung",
      eyebrow: "Buchung",
      title: "Anfrage in 24 Stunden",
      body: "Termin, Anlass, Location — und du hast in unter einem Tag Antwort plus Konzept.",
      image: schneiderImg,
    },
  ];

  return (
    <section className="px-5 md:px-10 py-16 md:py-24" style={{ background: WHITE }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 mb-12 items-end">
          <div className="lg:col-span-7">
            <Eyebrow>Im Haus</Eyebrow>
            <h2
              className="font-extrabold tracking-[-0.02em]"
              style={{ fontSize: "clamp(1.75rem,4.4vw,3.4rem)", lineHeight: 1.04, color: INK }}
            >
              Verwandte <span style={{ color: COBALT }}>Bereiche.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base md:text-lg leading-[1.6]" style={{ color: L_DIM }}>
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
              className="group block rounded-[24px] overflow-hidden hover:-translate-y-1 transition-transform duration-500"
              style={{ background: PAPER, border: `1px solid ${L_LINE}` }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={it.image}
                  alt={it.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
                  style={{ objectPosition: "center top" }}
                  loading="lazy"
                />
              </div>
              <div className="p-6 md:p-7">
                <div className="text-[12px] tracking-[0.14em] uppercase font-semibold mb-2" style={{ color: COBALT }}>
                  {it.eyebrow}
                </div>
                <h3 className="text-xl md:text-2xl font-bold leading-snug mb-3" style={{ color: INK }}>
                  {it.title}
                </h3>
                <p className="text-sm leading-[1.6] mb-4" style={{ color: L_DIM }}>
                  {it.body}
                </p>
                <span className="inline-flex items-center gap-2 text-[12px] tracking-[0.08em] uppercase font-semibold" style={{ color: L_DIM }}>
                  Öffnen
                  <ArrowUpRight
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    style={{ color: COBALT }}
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
   FINAL CTA (Cobalt-Karte, Voltage-Stil)
   ═══════════════════════════════════════════════════════════ */
const FinalCTA = () => (
  <section className="px-5 md:px-10 py-16 md:py-24">
    <div
      className="max-w-7xl mx-auto relative overflow-hidden rounded-[26px] px-6 md:px-14 py-16 md:py-24"
      style={{ background: COBALT }}
    >
      <div aria-hidden className="absolute -top-16 -right-10 w-72 h-72 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }} />
      <h2
        className="relative font-extrabold tracking-[-0.03em] max-w-3xl"
        style={{ fontSize: "clamp(2.25rem,5.5vw,4.25rem)", lineHeight: 1.0, color: WHITE }}
      >
        Lesen. <span style={{ color: "#cfd8ff" }}>Oder buchen.</span>
      </h2>
      <p className="relative mt-6 max-w-xl text-[16px] md:text-lg leading-[1.55]" style={{ color: "rgba(255,255,255,0.88)" }}>
        Magazin abonnieren für Geschichten zwischen Tisch und Bühne — oder
        direkt eine Show planen. Beides geht. Beides ist gut.
      </p>
      <div className="relative mt-9 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        <Link
          to="/#planer"
          className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[14px] font-semibold transition-transform hover:scale-[1.02]"
          style={{ background: WHITE, color: COBALT }}
        >
          Show planen
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          to="/buchung"
          className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[14px] font-semibold"
          style={{ border: "1px solid rgba(255,255,255,0.4)", color: WHITE }}
        >
          Anfrage stellen
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
      <p className="relative mt-10 text-[11px] tracking-[0.1em] uppercase" style={{ color: "rgba(255,255,255,0.55)" }}>
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

  const title =
    "Magazin — Geschichten zwischen Tisch und Bühne | Emilian Leber";
  const description =
    "Magazin von Magier Emilian Leber: Beobachtungen aus dem Magic Dinner, Hochzeit, Firmenfeier, Bühne. Quartalsweise neue Beiträge, 5,0★ aus 30+ Bewertungen.";

  return (
    <VoltageShell title={title} description={description} path="/blog" noindex={false}>
      <Helmet>
        <meta
          name="keywords"
          content="Magier Magazin, Zauberer Blog, Magic Dinner Geschichten, Hochzeitszauberer Tipps, Firmenfeier Entertainment, Emilian Leber Blog, Bayern Magier Magazin, Comedy-Magie Hintergrund, Plötzlich Magie, Bühnenshow Behind the Scenes"
        />
        <meta property="og:url" content="https://www.magicel.de/blog" />
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

      <Hero posts={published} />
      {featured && <FeaturedArtikel post={featured} />}
      <StatementBlock />
      <div id="posts-liste-anchor" />
      <PostsListe posts={published} featuredSlug={featured?.slug ?? ""} />
      <RedaktionsSchaufenster posts={editorsPick} />
      <TopPosts posts={published} />
      <ThemenWolke posts={published} />
      <AutorVorstellung />
      <ReviewsBlock paper />
      <VerwandteRessourcen />
      <FinalCTA />
    </VoltageShell>
  );
};

export default Blog;
