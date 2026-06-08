import { useParams, Link } from "react-router-dom";
import NotFoundPage from "./NotFound";
import { Helmet } from "react-helmet-async";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
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
  Mail,
  Quote,
  Share2,
  Sparkles,
  Tag,
} from "lucide-react";

import VoltageShell from "@/components/voltage/VoltageShell";
import { ReviewsBlock, FinalCTA } from "@/components/voltage/sections";
import {
  INK,
  WHITE,
  PAPER,
  COBALT,
  MAGENTA,
  L_LINE,
  L_DIM,
  up,
  stagger,
  vp,
  Eyebrow,
} from "@/components/voltage/theme";

import weddingImg from "@/assets/wedding-magic.jpg";
import dinnerHeroImg from "@/assets/hero-dinner.jpg";
import dinnerBookImg from "@/assets/magicdinner-book.jpg";
import dinnerBuehneImg from "@/assets/magicdinner-buehne.jpg";
import dinnerEmilianImg from "@/assets/emilian-magic-dinner.jpg";
import stageHeroImg from "@/assets/hero-stage.jpg";
import stageShowImg from "@/assets/stage-show.jpg";
import buehneZuschauerImg from "@/assets/buehne-zuschauer.jpg";
import buehneDpsgImg from "@/assets/buehne-dpsg.jpg";
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
   HERO / HEADER (Voltage, hell)
   ═══════════════════════════════════════════════════════════ */
const HeroSection = ({ post }: { post: BlogPost }) => (
  <header className="relative overflow-hidden px-5 md:px-10 pt-10 md:pt-16 pb-12 md:pb-16" style={{ background: WHITE }}>
    <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute -top-44 -left-24 w-[680px] h-[680px] rounded-full" style={{ background: `radial-gradient(circle, ${COBALT}1f 0%, transparent 60%)`, filter: "blur(30px)" }} />
      <div className="absolute -top-28 right-[-60px] w-[520px] h-[520px] rounded-full" style={{ background: `radial-gradient(circle, ${MAGENTA}1a 0%, transparent 60%)`, filter: "blur(30px)" }} />
    </div>
    <motion.div variants={stagger} initial="hidden" animate="show" className="relative max-w-4xl mx-auto">
      <motion.div variants={up}>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-[12px] tracking-[0.1em] uppercase font-semibold mb-8 transition-colors hover:text-[#1D3FFF]"
          style={{ color: L_DIM }}
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zum Magazin
        </Link>
      </motion.div>

      <motion.div variants={up}>
        <Eyebrow>{post.category}</Eyebrow>
      </motion.div>

      <motion.h1
        variants={up}
        className="font-extrabold tracking-[-0.03em]"
        style={{ fontSize: "clamp(2.25rem,5vw,4rem)", lineHeight: 1.02, color: INK }}
      >
        {post.title}
        {post.titleAccent && (
          <>
            {" "}
            <span style={{ color: COBALT }}>{post.titleAccent}</span>
          </>
        )}
      </motion.h1>

      <motion.p
        variants={up}
        className="mt-6 max-w-2xl text-[16px] md:text-lg leading-[1.6]"
        style={{ color: L_DIM }}
      >
        {post.excerpt}
      </motion.p>

      <motion.div
        variants={up}
        className="mt-10 pt-7 flex flex-wrap items-center gap-x-7 gap-y-4 text-sm"
        style={{ borderTop: `1px solid ${L_LINE}` }}
      >
        <div className="flex items-center gap-3">
          <span
            className="w-10 h-10 rounded-full flex items-center justify-center text-[14px] font-bold"
            style={{ background: COBALT, color: WHITE }}
          >
            EL
          </span>
          <div>
            <div className="text-[10px] tracking-[0.14em] uppercase font-bold" style={{ color: L_DIM }}>
              Geschrieben von
            </div>
            <div className="font-bold" style={{ color: INK }}>
              {post.author.name}
            </div>
          </div>
        </div>
        <span className="hidden md:inline" style={{ color: L_LINE }}>·</span>
        <div>
          <div className="text-[10px] tracking-[0.14em] uppercase font-bold" style={{ color: L_DIM }}>
            Veröffentlicht
          </div>
          <div className="text-base font-medium" style={{ color: INK }}>
            {formatDate(post.date)}
          </div>
        </div>
        <span className="hidden md:inline" style={{ color: L_LINE }}>·</span>
        <div className="inline-flex items-center gap-2" style={{ color: L_DIM }}>
          <Clock className="w-4 h-4" style={{ color: COBALT }} />
          <span className="tabular-nums font-semibold" style={{ color: INK }}>{post.readTime}</span>
          <span style={{ color: L_LINE }}>·</span>
          <span className="tabular-nums">{post.words} Wörter</span>
        </div>
      </motion.div>
    </motion.div>
  </header>
);

/* ═══════════════════════════════════════════════════════════
   FEATURE IMAGE
   ═══════════════════════════════════════════════════════════ */
const FeatureImage = ({ post }: { post: BlogPost }) => (
  <section className="px-5 md:px-10 pt-2 pb-10" style={{ background: WHITE }}>
    <div className="max-w-5xl mx-auto">
      <div className="relative aspect-[16/9] rounded-[28px] overflow-hidden" style={{ boxShadow: "0 40px 80px -34px rgba(10,11,15,0.4)" }}>
        <img
          src={coverImg(post.cover)}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center top" }}
          loading="eager"
        />
      </div>
      <p className="text-sm mt-4 text-center max-w-3xl mx-auto" style={{ color: L_DIM }}>
        Aus dem Magazin · {post.category} · {formatDate(post.date)}
      </p>
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
      <div className="rounded-[22px] p-6 md:p-7" style={{ background: PAPER, border: `1px solid ${L_LINE}` }}>
        <div className="flex items-center gap-2 mb-5">
          <BookOpen className="w-4 h-4" style={{ color: COBALT }} />
          <span className="text-[11px] tracking-[0.14em] uppercase font-bold" style={{ color: L_DIM }}>
            Im Beitrag
          </span>
        </div>
        <ol className="space-y-3 text-sm">
          {headings.map((h, i) => (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className="flex items-baseline gap-3 leading-snug transition-colors"
                style={{
                  color: activeId === h.id ? COBALT : L_DIM,
                  fontWeight: activeId === h.id ? 700 : 400,
                }}
              >
                <span className="text-base tabular-nums flex-shrink-0" style={{ color: COBALT }}>
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
   POST BODY (Reading Layout, Voltage)
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
            className="font-extrabold tracking-[-0.02em] mt-14 mb-6"
            style={{ fontSize: "clamp(1.6rem,3.4vw,2.5rem)", lineHeight: 1.1, color: INK, scrollMarginTop: "120px" }}
          >
            {s.text}
          </h2>
        );
      }
      case "paragraph":
        return (
          <p
            key={idx}
            className="text-base md:text-lg leading-[1.75] my-5"
            style={{ color: "#3a3833" }}
          >
            {s.text}
          </p>
        );
      case "quote":
        return (
          <blockquote
            key={idx}
            className="my-12 rounded-[24px] px-6 md:px-10 py-8 md:py-10 relative overflow-hidden"
            style={{ background: INK, color: WHITE }}
          >
            <Quote className="absolute top-4 left-6 w-8 h-8 opacity-40" style={{ color: COBALT }} />
            <div className="relative">
              <p className="font-extrabold tracking-[-0.02em]" style={{ fontSize: "clamp(1.35rem,3vw,2.25rem)", lineHeight: 1.22, color: WHITE }}>
                „{s.text}"
              </p>
              {s.attribution && (
                <p className="mt-5 text-xs tracking-[0.14em] uppercase font-semibold" style={{ color: "rgba(255,255,255,0.6)" }}>
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
            className="my-8 space-y-3 list-decimal pl-6 marker:font-bold"
            style={{ ["--tw-marker" as never]: COBALT } as React.CSSProperties}
          >
            {s.items.map((it, i) => (
              <li key={i} className="text-base md:text-lg leading-[1.65] pl-2" style={{ color: "#3a3833" }}>
                {it}
              </li>
            ))}
          </ol>
        ) : (
          <ul key={idx} className="my-8 space-y-4">
            {s.items.map((it, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="mt-3 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: COBALT }} />
                <span className="text-base md:text-lg leading-[1.65]" style={{ color: "#3a3833" }}>
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
            className="my-10 rounded-[18px] p-6 md:p-7"
            style={{ borderLeft: `4px solid ${COBALT}`, background: PAPER }}
          >
            <div className="text-base font-semibold mb-3" style={{ color: COBALT }}>
              {s.eyebrow}
            </div>
            <p className="text-base md:text-lg leading-[1.6] font-medium" style={{ color: INK }}>
              {s.text}
            </p>
          </aside>
        );
      default:
        return null;
    }
  };

  return (
    <article>
      {post.sections.map(renderSection)}

      <div className="mt-16 pt-10" style={{ borderTop: `1px solid ${L_LINE}` }}>
        <div className="flex items-center gap-2 mb-4">
          <Tag className="w-4 h-4" style={{ color: COBALT }} />
          <span className="text-[11px] tracking-[0.14em] uppercase font-bold" style={{ color: L_DIM }}>
            Themenfelder
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <Link
              key={t}
              to={`/blog#tag=${encodeURIComponent(t)}`}
              className="text-[11px] tracking-[0.06em] uppercase font-semibold px-3 py-1.5 rounded-full transition-transform hover:scale-105"
              style={{ background: `${COBALT}14`, color: COBALT }}
            >
              {t}
            </Link>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4 text-sm" style={{ color: L_DIM }}>
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
            className="inline-flex items-center gap-2 text-[12px] tracking-[0.08em] uppercase font-semibold transition-colors hover:text-[#1D3FFF]"
          >
            <Share2 className="w-4 h-4" style={{ color: COBALT }} />
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
  <motion.section
    variants={stagger}
    initial="hidden"
    whileInView="show"
    viewport={vp}
    className="px-5 md:px-10 py-16 md:py-24"
    style={{ background: PAPER, borderTop: `1px solid ${L_LINE}`, borderBottom: `1px solid ${L_LINE}` }}
  >
    <div className="max-w-5xl mx-auto grid md:grid-cols-12 gap-8 md:gap-12 items-center">
      <motion.div variants={up} className="md:col-span-4">
        <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden" style={{ boxShadow: "0 30px 60px -30px rgba(10,11,15,0.4)" }}>
          <img
            src={portraitImg}
            alt={`${post.author.name}, Magier`}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "center top" }}
            loading="lazy"
          />
        </div>
      </motion.div>
      <motion.div variants={up} className="md:col-span-8">
        <Eyebrow>Über den Autor</Eyebrow>
        <h3 className="font-extrabold tracking-[-0.02em]" style={{ fontSize: "clamp(1.6rem,3.4vw,2.5rem)", lineHeight: 1.05, color: INK }}>
          {post.author.name}.{" "}
          <span style={{ color: COBALT }}>{post.author.role}.</span>
        </h3>
        <p className="mt-5 text-base md:text-lg leading-[1.65] max-w-xl" style={{ color: L_DIM }}>
          Seit acht Jahren Magier, seit 2024 Finalist bei Talents of Magic und
          Greatest Talent, 2025 erstes vollberufliches Jahr. 2026 Tour [Plötzlich
          Magie — Magic Meets Comedy], Premiere am 22. Februar in der Alten
          Mälzerei Regensburg.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Link
            to="/ueber-mich"
            className="inline-flex items-center gap-2 text-[12px] tracking-[0.08em] uppercase font-semibold px-5 py-2.5 rounded-full transition-transform duration-300 hover:scale-[1.035]"
            style={{ background: COBALT, color: WHITE }}
          >
            Vita ansehen
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            to="/presse"
            className="inline-flex items-center gap-2 text-[12px] tracking-[0.08em] uppercase font-semibold transition-colors hover:text-[#1D3FFF]"
            style={{ color: L_DIM }}
          >
            Presseanfrage
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </motion.div>
    </div>
  </motion.section>
);

/* ═══════════════════════════════════════════════════════════
   WEITERE ANSICHTEN (Related Posts — Bento)
   ═══════════════════════════════════════════════════════════ */
const WeitereAnsichten = ({ slug }: { slug: string }) => {
  const related = getRelatedPosts(slug, 3);
  if (related.length < 1) return null;
  const [large, ...rest] = related;

  return (
    <motion.section
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={vp}
      className="px-5 md:px-10 py-16 md:py-24"
      style={{ background: WHITE }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div variants={up} className="grid lg:grid-cols-12 gap-8 mb-10 items-end">
          <div className="lg:col-span-7">
            <Eyebrow>Lies als nächstes</Eyebrow>
            <h2 className="font-extrabold tracking-[-0.02em]" style={{ fontSize: "clamp(1.8rem,4vw,3.25rem)", lineHeight: 1.05, color: INK }}>
              Drei weitere <span style={{ color: COBALT }}>Beiträge.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base md:text-lg leading-[1.65]" style={{ color: L_DIM }}>
              Themenverwandt oder bewusst kontrastierend — drei Vorschläge aus der
              Redaktion.
            </p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-6 md:gap-8">
          {large && (
            <motion.div variants={up} className="lg:col-span-7">
              <Link
                to={`/blog/${large.slug}`}
                className="group relative overflow-hidden rounded-[24px] h-[420px] md:h-[500px] block"
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
                <div className="absolute inset-x-0 bottom-0 p-7 md:p-9" style={{ color: WHITE }}>
                  <div className="text-[11px] tracking-[0.14em] uppercase font-bold mb-3">
                    {large.category} · {large.readTime}
                  </div>
                  <h3 className="font-extrabold leading-[1.05]" style={{ fontSize: "clamp(1.5rem,3vw,2.25rem)" }}>
                    {large.title}
                  </h3>
                </div>
              </Link>
            </motion.div>
          )}

          <div className="lg:col-span-5 grid grid-rows-2 gap-6 md:gap-8">
            {rest.map((p) => (
              <motion.div key={p.slug} variants={up}>
                <Link
                  to={`/blog/${p.slug}`}
                  className="group relative overflow-hidden rounded-[24px] h-[200px] md:h-[238px] block"
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
                    style={{ background: "linear-gradient(180deg, rgba(10,11,15,0.15) 0%, rgba(10,11,15,0.85) 100%)" }}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-5" style={{ color: WHITE }}>
                    <div className="text-[10px] tracking-[0.14em] uppercase font-bold mb-1" style={{ color: "rgba(255,255,255,0.75)" }}>
                      {p.category}
                    </div>
                    <h4 className="text-base md:text-lg font-bold leading-snug">
                      {p.title}
                    </h4>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
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
    <motion.section
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={vp}
      className="px-5 md:px-10 py-16 md:py-24"
      style={{ background: PAPER, borderTop: `1px solid ${L_LINE}`, borderBottom: `1px solid ${L_LINE}` }}
    >
      <div className="max-w-4xl mx-auto grid md:grid-cols-12 gap-8 items-center">
        <motion.div variants={up} className="md:col-span-6">
          <Eyebrow>Magazin-Update</Eyebrow>
          <h3 className="font-extrabold tracking-[-0.02em]" style={{ fontSize: "clamp(1.5rem,3vw,2.25rem)", lineHeight: 1.1, color: INK }}>
            Beim nächsten Beitrag{" "}
            <span style={{ color: COBALT }}>eine Mail.</span>
          </h3>
          <p className="mt-4 text-base leading-[1.6]" style={{ color: L_DIM }}>
            Einmal im Quartal. Keine Werbung, kein Funnel, keine Verkaufstaktik.
            Abmelden jederzeit per Klick.
          </p>
        </motion.div>
        <motion.div variants={up} className="md:col-span-6">
          {sent ? (
            <div className="rounded-[22px] p-7 text-center" style={{ background: WHITE, border: `1px solid ${L_LINE}` }}>
              <Sparkles className="w-8 h-8 mx-auto mb-3" style={{ color: COBALT }} />
              <p className="text-base" style={{ color: INK }}>
                Eingetragen. Du hörst beim nächsten Beitrag von mir.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="rounded-[22px] p-6" style={{ background: WHITE, border: `1px solid ${L_LINE}` }}>
              <div className="flex items-center gap-2 mb-4">
                <Mail className="w-4 h-4" style={{ color: COBALT }} />
                <span className="text-[11px] tracking-[0.14em] uppercase font-bold" style={{ color: L_DIM }}>
                  Abonnieren
                </span>
              </div>
              <div className="space-y-3">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Dein Name"
                  className="w-full rounded-2xl px-4 py-3 text-sm focus:outline-none"
                  style={{ background: PAPER, border: `1px solid ${L_LINE}`, color: INK }}
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="dein.name@beispiel.de"
                  className="w-full rounded-2xl px-4 py-3 text-sm focus:outline-none"
                  style={{ background: PAPER, border: `1px solid ${L_LINE}`, color: INK }}
                />
              </div>
              <button
                type="submit"
                className="mt-4 w-full inline-flex items-center justify-center gap-2 text-[12px] tracking-[0.08em] uppercase font-semibold px-5 py-3 rounded-full"
                style={{ background: COBALT, color: WHITE }}
              >
                Magazin abonnieren
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </motion.section>
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
    <motion.section
      variants={up}
      initial="hidden"
      whileInView="show"
      viewport={vp}
      className="px-5 md:px-10 py-16 md:py-24"
      style={{ background: WHITE }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="relative overflow-hidden rounded-[24px] p-8 md:p-12" style={{ background: PAPER, border: `1px solid ${L_LINE}` }}>
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8">
              <div className="text-[12px] tracking-[0.16em] uppercase font-semibold mb-3" style={{ color: COBALT }}>
                {meta.eyebrow}
              </div>
              <h3 className="font-extrabold tracking-[-0.02em]" style={{ fontSize: "clamp(1.6rem,3.4vw,2.5rem)", lineHeight: 1.05, color: INK }}>
                {meta.title}
              </h3>
              <p className="mt-4 text-base md:text-lg leading-[1.6] max-w-xl" style={{ color: L_DIM }}>
                {meta.body}
              </p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <Link
                to={path}
                className="inline-flex items-center gap-2 text-[12px] tracking-[0.08em] uppercase font-semibold px-6 py-3.5 rounded-full transition-transform duration-300 hover:scale-[1.035]"
                style={{ background: COBALT, color: WHITE }}
              >
                {meta.cta}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

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

  const title = `${post.title} | MagicEL Magazin`;
  const description = post.excerpt.slice(0, 160);

  return (
    <VoltageShell title={title} description={description} path={`/blog/${post.slug}`} noindex={false}>
      <Helmet>
        <meta
          name="keywords"
          content={[
            ...post.tags,
            "Magier Magazin",
            "Emilian Leber Blog",
            "Zauberer Geschichten",
          ].join(", ")}
        />
        <meta property="og:url" content={`https://www.magicel.de/blog/${post.slug}`} />
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

      <HeroSection post={post} />
      <FeatureImage post={post} />

      <section className="px-5 md:px-10 pb-10" style={{ background: WHITE }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-3 order-2 lg:order-1">
            <TableOfContents post={post} />
          </div>
          <div className="lg:col-span-9 order-1 lg:order-2">
            <div className="max-w-3xl">
              <PostBody post={post} />
            </div>
          </div>
        </div>
      </section>

      <AutorBox post={post} />
      <WeitereAnsichten slug={post.slug} />
      <ReviewsBlock paper={false} />
      <NewsletterInline />
      <CTAImEvent post={post} />

      <FinalCTA
        title={
          <>
            Erlebt es <span style={{ color: MAGENTA }}>selbst.</span>
          </>
        }
        sub="Show planen in drei Minuten oder direkt mailen. Antwort innerhalb 24 Stunden, ohne Verkaufstaktik."
      />
    </VoltageShell>
  );
};

export default BlogPostPage;
