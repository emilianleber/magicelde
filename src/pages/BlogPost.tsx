import { useParams, Link } from "react-router-dom";
import NotFoundPage from "./NotFound";
import { Helmet } from "react-helmet-async";
import { useEffect, useMemo, useState } from "react";
import PageLayout from "@/components/landing/PageLayout";
import {
  blogPosts,
  getRelatedPosts,
  type BlogPost,
  type BlogSection,
} from "@/data/blogPosts";
import { captureEmail, markEmailSubmitted } from "@/lib/emailCapture";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Clock,
  Feather,
  Mail,
  Quote,
  Share2,
  Sparkles,
  Star,
  Tag,
} from "lucide-react";

import weddingImg from "@/assets/wedding-magic.jpg";
import dinnerHeroImg from "@/assets/hero-dinner.jpg";
import dinnerBookImg from "@/assets/magicdinner-book.jpg";
import dinnerBuehneImg from "@/assets/magicdinner-buehne.jpg";
import dinnerEmilianImg from "@/assets/emilian-magic-dinner.jpg";
import stageHeroImg from "@/assets/hero-stage.jpg";
import stageShowImg from "@/assets/stage-show.jpg";
import buehneZuschauerImg from "@/assets/buehne-zuschauer.jpg";
import buehneDpsgImg from "@/assets/buehne-dpsg.jpg";
import closeupImg from "@/assets/closeup.jpg";
import closeupHeroImg from "@/assets/hero-closeup.jpg";
import magicImg from "@/assets/hero-magic.jpg";
import firmenfeierImg from "@/assets/hero-firmenfeier-stock.jpg";
import audienceImg from "@/assets/audience-reactions.jpg";
import staunenImg from "@/assets/staunen.jpg";
import haendeImg from "@/assets/haende-interaktion.jpg";
import emotionenImg from "@/assets/emotionen.jpg";
import portraitKartenImg from "@/assets/portrait-karten.jpg";
import portraitBuchImg from "@/assets/emilian-portrait-buch.jpg";
import portraitImg from "@/assets/magician-portrait.jpg";
import schneiderImg from "@/assets/schneider-weisse-closeup.jpg";

const SERIF_ITALIC =
  "font-['Instrument_Serif',ui-serif,Georgia,serif] italic font-normal";
const ACCENT = "#9a2640";
const ACCENT_DEEP = "#5c1622";
const ACCENT_SOFT = "#e4b8c0";

const COVER_MAP: Record<string, string> = {
  "wedding-magic": weddingImg,
  dinner: dinnerHeroImg,
  "dinner-book": dinnerBookImg,
  "dinner-buehne": dinnerBuehneImg,
  "dinner-emilian": dinnerEmilianImg,
  stage: stageHeroImg,
  "stage-show": stageShowImg,
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

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const categoryToFormatPath: Record<string, string> = {
  Hochzeit: "/hochzeit",
  Firmenfeiern: "/firmenfeiern",
  "Magic Dinner": "/magic-dinner",
  Tour: "/tickets",
  Buchung: "/buchung",
  "Hinter den Kulissen": "/ueber-mich",
  Hintergrund: "/buehnenshow",
};

const slugify = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/* ═══════════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════════ */
const HeroKeyframes = () => (
  <style>{`
    @keyframes postHeroIn { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes postHeroWordIn { from { opacity: 0; transform: translateY(40px) scale(0.96); filter: blur(6px); } to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); } }
    @keyframes postBokehDrift { 0% { transform: translateY(0) scale(1); opacity: 0.15; } 30% { opacity: 0.9; } 70% { opacity: 0.9; } 100% { transform: translateY(-90px) scale(1.1); opacity: 0; } }
    .post-fade { opacity: 0; animation: postHeroIn 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
    .post-word { display: inline-block; opacity: 0; animation: postHeroWordIn 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards; will-change: transform, opacity, filter; }
    .post-bokeh { opacity: 0; animation-name: postBokehDrift; animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1); animation-iteration-count: infinite; }
    .toc-active { color: #5c1622; font-weight: 700; }
    .post-body p { margin: 1.25em 0; }
    .post-body p:first-child::first-letter { font-family: 'Instrument Serif', Georgia, serif; font-style: italic; font-size: 4.5em; float: left; line-height: 0.85; margin: 0.08em 0.12em 0 0; color: #5c1622; }
  `}</style>
);

const HeroSection = ({ post }: { post: BlogPost }) => {
  const titleWords = post.title.split(" ");
  return (
    <section className="relative bg-[#fafafa] overflow-hidden">
      <HeroKeyframes />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(70% 60% at 80% 10%, rgba(0,0,0,0.024) 0%, transparent 60%), radial-gradient(60% 50% at 12% 90%, rgba(0,0,0,0.040) 0%, transparent 65%)",
        }}
      />
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { size: 16, left: "8%", top: "30%", dur: 14, delay: 0, o: 0.45 },
          { size: 20, left: "78%", top: "20%", dur: 18, delay: 2, o: 0.35 },
          { size: 10, left: "22%", top: "70%", dur: 16, delay: 4, o: 0.55 },
          { size: 14, left: "62%", top: "60%", dur: 19, delay: 6, o: 0.4 },
        ].map((b, i) => (
          <div
            key={i}
            className="absolute rounded-full post-bokeh"
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

      <div className="relative z-10 container px-6 pt-28 md:pt-36 pb-16 md:pb-24">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-[12px] tracking-[0.1em] uppercase font-semibold text-foreground/55 hover:text-foreground transition-colors mb-10 post-fade"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zum Magazin
        </Link>

        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-9">
            <div
              className={`${SERIF_ITALIC} text-lg md:text-xl mb-6 post-fade`}
              style={{ color: ACCENT, animationDelay: "0.05s" }}
            >
              {post.category}.
            </div>
            <h1 className="text-[clamp(1.875rem,4vw,3.5rem)] font-display font-black tracking-[-0.025em] leading-[1.02] mb-8">
              {titleWords.map((w, i) => (
                <span
                  key={i}
                  className="post-word"
                  style={{
                    animationDelay: `${0.15 + i * 0.06}s`,
                    marginRight: "0.22em",
                  }}
                >
                  {w}
                </span>
              ))}
              {post.titleAccent && (
                <>
                  <br />
                  <span
                    className={`post-word`}
                    style={{
                      color: ACCENT,
                      animationDelay: `${0.15 + titleWords.length * 0.06}s`,
                    }}
                  >
                    {post.titleAccent}
                  </span>
                </>
              )}
            </h1>

            <p
              className="text-lg md:text-xl leading-[1.6] text-foreground/70 max-w-3xl post-fade"
              style={{ animationDelay: "0.45s" }}
            >
              {post.excerpt}
            </p>
          </div>
        </div>

        <div
          className="mt-12 pt-8 border-t border-foreground/10 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm post-fade"
          style={{ animationDelay: "0.55s" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
              style={{
                background: `linear-gradient(135deg, ${ACCENT_DEEP}, ${ACCENT})`,
              }}
            >
              EL
            </div>
            <div>
              <div className="text-[10px] tracking-[0.14em] uppercase font-bold text-foreground/55">
                Geschrieben von
              </div>
              <div className="font-bold text-foreground/85">
                {post.author.name}
              </div>
            </div>
          </div>
          <span className="text-foreground/25 hidden md:inline">·</span>
          <div>
            <div className="text-[10px] tracking-[0.14em] uppercase font-bold text-foreground/55">
              Veröffentlicht
            </div>
            <div className={`text-base text-foreground/85`}>
              {formatDate(post.date)}
            </div>
          </div>
          <span className="text-foreground/25 hidden md:inline">·</span>
          <div className="inline-flex items-center gap-2 text-foreground/65">
            <Clock className="w-4 h-4" style={{ color: ACCENT }} />
            <span className="tabular-nums font-semibold">{post.readTime}</span>
            <span className="text-foreground/30">·</span>
            <span className="tabular-nums">{post.words} Wörter</span>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   FEATURE IMAGE
   ═══════════════════════════════════════════════════════════ */
const FeatureImage = ({ post }: { post: BlogPost }) => (
  <section className="bg-background pt-2 pb-10">
    <div className="container px-6">
      <div className="max-w-5xl mx-auto">
        <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-[0_60px_120px_-50px_rgba(8,6,12,0.4)]">
          <img
            src={coverImg(post.cover)}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "center 30%" }}
            loading="eager"
          />
        </div>
        <p
          className={`text-sm text-foreground/45 mt-4 text-center max-w-3xl mx-auto`}
        >
          Aus dem Magazin · {post.category} · {formatDate(post.date)}
        </p>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════
   TABLE OF CONTENTS (Sticky Sidebar)
   ═══════════════════════════════════════════════════════════ */
const TableOfContents = ({ post }: { post: BlogPost }) => {
  const headings = useMemo(
    () =>
      post.sections
        .filter((s): s is { type: "heading"; text: string; id?: string } =>
          s.type === "heading",
        )
        .map((s) => ({
          id: s.id ?? slugify(s.text),
          text: s.text,
        })),
    [post.sections],
  );

  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (headings.length === 0) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
    );
    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <aside className="lg:sticky lg:top-32">
      <div className="bg-[#fafafa] rounded-3xl p-6 md:p-8">
        <div className="flex items-center gap-2 mb-5">
          <BookOpen className="w-4 h-4" style={{ color: ACCENT }} />
          <span className="text-[11px] tracking-[0.14em] uppercase font-bold text-foreground/65">
            Im Beitrag
          </span>
        </div>
        <ol className="space-y-3 text-sm">
          {headings.map((h, i) => (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className={`flex items-baseline gap-3 leading-snug transition-colors ${
                  activeId === h.id
                    ? "toc-active"
                    : "text-foreground/60 hover:text-foreground"
                }`}
              >
                <span
                  className={`text-base tabular-nums flex-shrink-0`}
                  style={{ color: ACCENT }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{h.text}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </aside>
  );
};

/* ═══════════════════════════════════════════════════════════
   POST BODY (Editorial Reading Layout)
   ═══════════════════════════════════════════════════════════ */
const PostBody = ({ post }: { post: BlogPost }) => {
  const renderSection = (s: BlogSection, idx: number) => {
    switch (s.type) {
      case "heading": {
        const id = s.id ?? slugify(s.text);
        return (
          <h2
            key={idx}
            id={id}
            className="text-2xl md:text-4xl font-display font-black tracking-[-0.02em] leading-[1.1] mt-14 mb-6"
            style={{ scrollMarginTop: "120px" }}
          >
            {s.text.split(" ").map((w, i, arr) =>
              i === arr.length - 1 ? (
                <span
                  key={i}

                  style={{ color: ACCENT }}
                >
                  {" "}
                  {w}
                </span>
              ) : (
                <span key={i}>{i === 0 ? w : ` ${w}`}</span>
              ),
            )}
          </h2>
        );
      }
      case "paragraph":
        return (
          <p
            key={idx}
            className="text-base md:text-lg leading-[1.75] text-foreground/80"
          >
            {s.text}
          </p>
        );
      case "quote":
        return (
          <blockquote
            key={idx}
            className="my-12 -mx-4 md:-mx-8 px-6 md:px-10 py-8 md:py-10 rounded-3xl bg-[#08060c] text-white relative overflow-hidden"
          >
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(60% 70% at 50% 50%, rgba(0,0,0,0.040) 0%, transparent 70%)",
              }}
            />
            <Quote
              className="absolute top-4 left-6 w-8 h-8 opacity-40"
              style={{ color: ACCENT_SOFT }}
            />
            <div className="relative">
              <p
                className={`${SERIF_ITALIC} text-2xl md:text-4xl leading-[1.2] text-white`}
              >
                {s.text}
              </p>
              {s.attribution && (
                <p className="mt-5 text-xs tracking-[0.14em] uppercase text-white/55 font-semibold">
                  — {s.attribution}
                </p>
              )}
            </div>
          </blockquote>
        );
      case "list":
        return s.ordered ? (
          <ol
            key={idx}
            className="my-8 space-y-3 list-decimal pl-6 marker:text-[color:var(--accent)] marker:font-bold"
            style={
              { ['--accent' as never]: ACCENT } as React.CSSProperties
            }
          >
            {s.items.map((it, i) => (
              <li
                key={i}
                className="text-base md:text-lg leading-[1.65] text-foreground/80 pl-2"
              >
                {it}
              </li>
            ))}
          </ol>
        ) : (
          <ul key={idx} className="my-8 space-y-4">
            {s.items.map((it, i) => (
              <li key={i} className="flex items-start gap-4">
                <span
                  className="mt-3 w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: ACCENT }}
                />
                <span className="text-base md:text-lg leading-[1.65] text-foreground/80">
                  {it}
                </span>
              </li>
            ))}
          </ul>
        );
      case "callout":
        return (
          <aside
            key={idx}
            className="my-10 rounded-2xl p-6 md:p-7 border-l-4"
            style={{
              borderColor: ACCENT,
              background: "#fafafa",
            }}
          >
            <div
              className={`text-base mb-3`}
              style={{ color: ACCENT_DEEP }}
            >
              {s.eyebrow}
            </div>
            <p className="text-base md:text-lg leading-[1.6] text-foreground/85 font-medium">
              {s.text}
            </p>
          </aside>
        );
      default:
        return null;
    }
  };

  return (
    <article className="post-body">
      {post.sections.map(renderSection)}

      <div className="mt-16 pt-10 border-t border-foreground/10">
        <div className="flex items-center gap-2 mb-4">
          <Tag className="w-4 h-4" style={{ color: ACCENT }} />
          <span className="text-[11px] tracking-[0.14em] uppercase font-bold text-foreground/55">
            Themenfelder
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <Link
              key={t}
              to={`/blog#tag=${encodeURIComponent(t)}`}
              className="text-[11px] tracking-[0.06em] uppercase font-semibold px-3 py-1.5 rounded-full transition-transform hover:scale-105"
              style={{
                background: ACCENT_SOFT + "55",
                color: ACCENT_DEEP,
              }}
            >
              {t}
            </Link>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-foreground/55">
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: post.title,
                  text: post.excerpt,
                  url: window.location.href,
                });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert("Link kopiert.");
              }
            }}
            className="inline-flex items-center gap-2 text-[12px] tracking-[0.08em] uppercase font-semibold hover:text-foreground transition-colors"
          >
            <Share2 className="w-4 h-4" style={{ color: ACCENT }} />
            Beitrag teilen
          </button>
        </div>
      </div>
    </article>
  );
};

/* ═══════════════════════════════════════════════════════════
   AUTOR BOX
   ═══════════════════════════════════════════════════════════ */
const AutorBox = ({ post }: { post: BlogPost }) => (
  <section className="bg-[#fafafa] py-16 md:py-20">
    <div className="container px-6 max-w-5xl">
      <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
        <div className="md:col-span-4">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
            <img
              src={portraitImg}
              alt={`${post.author.name}, Magier`}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: "center 20%" }}
              loading="lazy"
            />
          </div>
        </div>
        <div className="md:col-span-8">
          <div className={`text-lg text-foreground/55 mb-4`}>
            Über den Autor.
          </div>
          <h3 className="text-2xl md:text-4xl font-display font-black tracking-[-0.02em] leading-[1.05] mb-5">
            {post.author.name}.{" "}
            <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
              {post.author.role}.
            </span>
          </h3>
          <p className="text-base md:text-lg leading-[1.65] text-foreground/70 mb-6 max-w-xl">
            Seit acht Jahren Magier, seit 2024 Finalist bei Talents of Magic
            und Greatest Talent, 2025 erstes vollberufliches Jahr. 2026 Tour
            [Plötzlich Magie — Magic Meets Comedy], Premiere am 22. Februar in
            der Alten Mälzerei Regensburg.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/ueber-mich"
              className="inline-flex items-center gap-2 text-[12px] tracking-[0.08em] uppercase font-semibold px-5 py-2.5 rounded-full text-white transition-transform duration-300 hover:scale-[1.035]"
              style={{
                background: `linear-gradient(135deg, ${ACCENT_DEEP}, ${ACCENT})`,
              }}
            >
              Vita ansehen
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/presse"
              className="inline-flex items-center gap-2 text-[12px] tracking-[0.08em] uppercase font-semibold text-foreground/70 hover:text-foreground transition-colors"
            >
              Presseanfrage
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════
   WEITERE ANSICHTEN (Related Posts — Bento)
   ═══════════════════════════════════════════════════════════ */
const WeitereAnsichten = ({ slug }: { slug: string }) => {
  const related = getRelatedPosts(slug, 3);
  if (related.length < 1) return null;
  const [large, ...rest] = related;

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container px-6">
        <div className="grid lg:grid-cols-12 gap-10 mb-12 items-end">
          <div className="lg:col-span-7">
            <div className={`text-lg text-foreground/55 mb-5`}>
              Lies als nächstes.
            </div>
            <h2 className="text-[clamp(1.8rem,4vw,3.6rem)] font-display font-black tracking-[-0.025em] leading-[1.05]">
              Drei weitere{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                Beiträge.
              </span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base md:text-lg leading-[1.65] text-foreground/65">
              Themenverwandt oder bewusst kontrastierend — drei Vorschläge aus
              der Redaktion.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 md:gap-8">
          {large && (
            <Link
              to={`/blog/${large.slug}`}
              className="group lg:col-span-7 relative overflow-hidden rounded-3xl h-[420px] md:h-[500px] block"
            >
              <img
                src={coverImg(large.cover)}
                alt={large.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                style={{ objectPosition: "center 30%" }}
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
              <div className="absolute inset-x-0 bottom-0 p-7 md:p-9 text-white">
                <div className="text-[11px] tracking-[0.14em] uppercase font-bold mb-3">
                  {large.category} · {large.readTime}
                </div>
                <h3 className="text-2xl md:text-4xl font-display font-black leading-[1.05] mb-2">
                  {large.title}
                </h3>
              </div>
            </Link>
          )}

          <div className="lg:col-span-5 grid grid-rows-2 gap-6 md:gap-8">
            {rest.map((p) => (
              <Link
                key={p.slug}
                to={`/blog/${p.slug}`}
                className="group relative overflow-hidden rounded-3xl h-[200px] md:h-[238px] block"
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
                      "linear-gradient(180deg, rgba(8,6,12,0.15) 0%, rgba(8,6,12,0.85) 100%)",
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <div className="text-[10px] tracking-[0.14em] uppercase font-bold text-white/75 mb-1">
                    {p.category}
                  </div>
                  <h4 className="text-base md:text-lg font-display font-bold leading-snug">
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
   NEWSLETTER (Variante für Post)
   ═══════════════════════════════════════════════════════════ */
const NewsletterInline = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (email.includes("@") && email.length > 5) {
      captureEmail(email, "blog-post-newsletter", { name });
    }
  }, [email, name]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    markEmailSubmitted();
    setSent(true);
  };

  return (
    <section className="bg-[#fafafa] py-16 md:py-20">
      <div className="container px-6 max-w-4xl">
        <div className="grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-6">
            <div className={`text-lg text-foreground/55 mb-4`}>
              Magazin-Update.
            </div>
            <h3 className="text-2xl md:text-3xl font-display font-black tracking-[-0.02em] leading-[1.1] mb-4">
              Beim nächsten Beitrag{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                eine Mail.
              </span>
            </h3>
            <p className="text-base text-foreground/65 leading-[1.6]">
              Einmal im Quartal. Keine Werbung, kein Funnel, keine
              Verkaufstaktik. Abmelden jederzeit per Klick.
            </p>
          </div>
          <div className="md:col-span-6">
            {sent ? (
              <div className="bg-white rounded-3xl p-7 text-center">
                <Sparkles
                  className="w-8 h-8 mx-auto mb-3"
                  style={{ color: ACCENT }}
                />
                <p className="text-base text-foreground/75">
                  Eingetragen. Du hörst beim nächsten Beitrag von mir.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="bg-white rounded-3xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Mail className="w-4 h-4" style={{ color: ACCENT }} />
                  <span className="text-[11px] tracking-[0.14em] uppercase font-bold text-foreground/65">
                    Abonnieren
                  </span>
                </div>
                <div className="space-y-3">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Dein Name"
                    className="w-full bg-foreground/[0.04] border border-foreground/10 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-foreground/30"
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="dein.name@beispiel.de"
                    className="w-full bg-foreground/[0.04] border border-foreground/10 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-foreground/30"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-4 w-full inline-flex items-center justify-center gap-2 text-[12px] tracking-[0.08em] uppercase font-semibold px-5 py-3 rounded-full text-white"
                  style={{
                    background: `linear-gradient(135deg, ${ACCENT_DEEP}, ${ACCENT})`,
                  }}
                >
                  Magazin abonnieren
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   PULL QUOTE (Black Full-Bleed)
   ═══════════════════════════════════════════════════════════ */
const PullQuoteBlack = ({ post }: { post: BlogPost }) => {
  // Nimm das erste quote-Element oder Default
  const quote =
    post.sections.find(
      (s): s is { type: "quote"; text: string; attribution?: string } =>
        s.type === "quote",
    ) ?? {
      text: "Manche Geschichten passen nicht auf die Bühne.",
      attribution: undefined,
    };

  return (
    <section className="relative bg-[#08060c] text-white py-20 md:py-28 overflow-hidden">
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
          className="w-10 h-10 mx-auto mb-6 opacity-70"
          style={{ color: ACCENT_SOFT }}
        />
        <blockquote
          className={`${SERIF_ITALIC} text-2xl md:text-5xl leading-[1.15]`}
        >
          {quote.text}
        </blockquote>
        {quote.attribution && (
          <p className="mt-6 text-xs tracking-[0.14em] uppercase text-white/55 font-semibold">
            — {quote.attribution}
          </p>
        )}
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   CTA IM EVENT (Format-bezogener Cross-Link)
   ═══════════════════════════════════════════════════════════ */
const CTAImEvent = ({ post }: { post: BlogPost }) => {
  const path = categoryToFormatPath[post.category];
  if (!path) return null;

  const labelMap: Record<string, { eyebrow: string; title: string; body: string; cta: string }> = {
    "/hochzeit": {
      eyebrow: "Für Hochzeitsplaner.",
      title: "Plant ihr gerade eure Hochzeit?",
      body: "Sektempfang, Dinner, nach dem Tanzen — die drei Slots, die zur Hochzeit passen. Wir schauen gemeinsam, welcher zu eurem Ablauf passt.",
      cta: "Zur Hochzeitsseite",
    },
    "/firmenfeiern": {
      eyebrow: "Für Eventmanager:innen.",
      title: "Plant ihr ein Firmenevent?",
      body: "Vorstandsdinner bis Mitarbeiter-Weihnachtsfeier: jedes Format mit eigener Dosierung. Wir finden die Richtige.",
      cta: "Zur Firmenfeier-Seite",
    },
    "/magic-dinner": {
      eyebrow: "Magic Dinner als Format.",
      title: "Interesse am Format?",
      body: "Ob im Restaurant Wald und Wiese in Sinzing oder in eurer Wunschlocation — Magic Dinner ist ein durchkomponiertes Abendformat.",
      cta: "Zur Magic-Dinner-Seite",
    },
    "/tickets": {
      eyebrow: "Plötzlich Magie — die Tour.",
      title: "Tickets für die Tour 2026",
      body: "Premiere am 22. Februar 2026 in der Alten Mälzerei Regensburg. Weitere Stops in Bayern folgen.",
      cta: "Tour-Termine ansehen",
    },
    "/buchung": {
      eyebrow: "Direktanfrage.",
      title: "Konkrete Anfrage stellen",
      body: "Datum, Ort, Anlass — und du hast innerhalb 24 Stunden Antwort plus konkreten Vorschlag.",
      cta: "Anfrage starten",
    },
    "/ueber-mich": {
      eyebrow: "Mehr zur Person.",
      title: "Werdegang und Vita",
      body: "Von der ersten Karte mit acht über Greatest Talent und Talents of Magic bis zur eigenen Tour 2026.",
      cta: "Zur Vita",
    },
    "/buehnenshow": {
      eyebrow: "Format Bühnenshow.",
      title: "Bühnenshow buchen",
      body: "Comedy-Magic-Show mit Drama-Kurve. 15, 30 oder 60 Minuten — je nach Anlass.",
      cta: "Zur Bühnenshow",
    },
  };

  const meta = labelMap[path] ?? labelMap["/buchung"];

  return (
    <section className="bg-background py-16 md:py-20">
      <div className="container px-6 max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl bg-[#fafafa] p-8 md:p-12">
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(50% 60% at 90% 10%, rgba(0,0,0,0.040) 0%, transparent 60%)",
            }}
          />
          <div className="relative grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8">
              <div
                className={`text-lg mb-3`}
                style={{ color: ACCENT }}
              >
                {meta.eyebrow}
              </div>
              <h3 className="text-2xl md:text-4xl font-display font-black tracking-[-0.02em] leading-[1.05] mb-4">
                {meta.title}
              </h3>
              <p className="text-base md:text-lg leading-[1.6] text-foreground/65 max-w-xl">
                {meta.body}
              </p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <Link
                to={path}
                className="inline-flex items-center gap-2 text-[12px] tracking-[0.08em] uppercase font-semibold px-6 py-3.5 rounded-full text-white transition-transform duration-300 hover:scale-[1.035]"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT_DEEP}, ${ACCENT})`,
                }}
              >
                {meta.cta}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   CTA FINAL
   ═══════════════════════════════════════════════════════════ */
const CTAFinal = () => (
  <section className="relative bg-[#08060c] text-white py-24 md:py-32 overflow-hidden">
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(60% 50% at 25% 30%, rgba(0,0,0,0.040) 0%, transparent 60%), radial-gradient(50% 40% at 80% 70%, rgba(0,0,0,0.024) 0%, transparent 65%)",
      }}
    />
    <div className="relative container px-6 max-w-4xl text-center">
      <div className={`text-lg text-white/55 mb-5`}>
        Anders als gelesen.
      </div>
      <h2 className="text-[clamp(1.75rem,3.5vw,2.875rem)] font-display font-black tracking-[-0.025em] leading-[1.05] mb-8">
        Erlebt es{" "}
        <span className={SERIF_ITALIC} style={{ color: ACCENT_SOFT }}>
          selbst.
        </span>
      </h2>
      <p className="text-base md:text-lg leading-[1.65] text-white/65 max-w-2xl mx-auto mb-10">
        Show planen in drei Minuten oder direkt mailen. Antwort innerhalb 24
        Stunden, ohne Verkaufstaktik.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/#planer"
          className="inline-flex items-center justify-center gap-2 text-[13px] tracking-[0.08em] uppercase font-semibold px-8 py-4 rounded-full text-foreground bg-white transition-transform duration-300 hover:scale-[1.035]"
        >
          Show planen
          <ArrowRight className="w-4 h-4" />
        </Link>
        <a
          href="mailto:el@magicel.de"
          className="inline-flex items-center justify-center gap-2 text-[13px] tracking-[0.08em] uppercase font-semibold px-8 py-4 rounded-full text-white border border-white/30 hover:bg-white/10 transition-colors"
        >
          el@magicel.de
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
      <p className="mt-10 text-[11px] tracking-[0.1em] uppercase text-white/40">
        5,0★ · 30+ Bewertungen · Regensburg · Bayern · DACH
      </p>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════ */
const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = useMemo(
    () => blogPosts.find((p) => p.slug === slug),
    [slug],
  );

  useEffect(() => {
    if (post) window.scrollTo(0, 0);
  }, [post]);

  if (!post) return <NotFoundPage />;

  const ogImageMap: Record<string, string> = {
    "wedding-magic": "https://www.magicel.de/og-wedding.jpg",
    dinner: "https://www.magicel.de/og-dinner.jpg",
    stage: "https://www.magicel.de/og-stage.jpg",
  };
  const ogImage =
    ogImageMap[post.cover] ?? "https://www.magicel.de/og-image.jpg";

  return (
    <>
      <Helmet>
        <html lang="de" />
        <title>{post.title} | MagicEL Magazin</title>
        <meta
          name="description"
          content={post.excerpt.slice(0, 160)}
        />
        <meta
          name="keywords"
          content={[
            ...post.tags,
            "Magier Magazin",
            "Emilian Leber Blog",
            "Zauberer Geschichten",
          ].join(", ")}
        />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <link
          rel="canonical"
          href={`https://www.magicel.de/blog/${post.slug}`}
        />
        <meta property="og:title" content={`${post.title} | MagicEL Magazin`} />
        <meta property="og:description" content={post.excerpt.slice(0, 160)} />
        <meta
          property="og:url"
          content={`https://www.magicel.de/blog/${post.slug}`}
        />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={ogImage} />
        <meta property="og:locale" content="de_DE" />
        <meta
          property="article:published_time"
          content={`${post.date}T09:00:00+02:00`}
        />
        <meta
          property="article:modified_time"
          content={`${post.date}T09:00:00+02:00`}
        />
        <meta property="article:author" content={post.author.name} />
        <meta property="article:section" content={post.category} />
        {post.tags.map((t) => (
          <meta key={t} property="article:tag" content={t} />
        ))}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt.slice(0, 160)} />
        <meta name="twitter:image" content={ogImage} />
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
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            image: ogImage,
            datePublished: `${post.date}T09:00:00+02:00`,
            dateModified: `${post.date}T09:00:00+02:00`,
            author: {
              "@type": "Person",
              name: post.author.name,
              url: "https://www.magicel.de/ueber-mich",
            },
            publisher: {
              "@type": "Person",
              name: "Emilian Leber",
              url: "https://www.magicel.de",
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://www.magicel.de/blog/${post.slug}`,
            },
            keywords: post.tags.join(", "),
            articleSection: post.category,
            wordCount: post.words,
            inLanguage: "de-DE",
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Magazin",
                item: "https://www.magicel.de/blog",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: post.category,
                item: "https://www.magicel.de/blog",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: post.title,
                item: `https://www.magicel.de/blog/${post.slug}`,
              },
            ],
          })}
        </script>
      </Helmet>
      <PageLayout>
        <HeroSection post={post} />
        <FeatureImage post={post} />

        <section className="bg-background pb-10">
          <div className="container px-6">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-3 order-2 lg:order-1">
                <TableOfContents post={post} />
              </div>
              <div className="lg:col-span-9 order-1 lg:order-2">
                <div className="max-w-3xl">
                  <PostBody post={post} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <PullQuoteBlack post={post} />
        <AutorBox post={post} />
        <WeitereAnsichten slug={post.slug} />
        <NewsletterInline />
        <CTAImEvent post={post} />
        <CTAFinal />
      </PageLayout>
    </>
  );
};

export default BlogPostPage;
