/** VOLTAGE — wiederverwendbare Section-Bausteine für die Unterseiten. */
import type { ComponentType, ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Play, ChevronDown } from "lucide-react";
import {
  INK, WHITE, PAPER, COBALT, MAGENTA, L_LINE, L_DIM, D_DIM, PANEL_BG, CARD_LIGHT,
  RATING, RATING_COUNT, REVIEWS, CLIENT_LOGOS, ANFRAGE_HREF, PHONE_HREF, PHONE_DISPLAY,
  cta, ghost, glass, up, stagger, vp, Eyebrow, Stars, GoogleG,
} from "./theme";

type Icon = ComponentType<{ className?: string; style?: React.CSSProperties }>;

const h2Style = { fontSize: "clamp(2rem,4.5vw,3.5rem)", lineHeight: 1.02 } as const;
const h3Style = { fontSize: "clamp(1.5rem,2.4vw,2.1rem)", lineHeight: 1.06 } as const;

/* ── Eyebrow + H2 + Sub ── */
export function SectionHeader({ eyebrow, title, sub, center, dark }: { eyebrow?: string; title: ReactNode; sub?: ReactNode; center?: boolean; dark?: boolean }) {
  return (
    <motion.div variants={up} className={`${center ? "text-center mx-auto" : ""} max-w-3xl ${center ? "" : ""}`}>
      {eyebrow && (center
        ? <p className="flex items-center justify-center gap-2 text-[12px] tracking-[0.16em] uppercase font-semibold mb-5" style={{ color: dark ? D_DIM : L_DIM }}><span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: COBALT }} />{eyebrow}</p>
        : <Eyebrow dark={dark}>{eyebrow}</Eyebrow>)}
      <h2 className="font-extrabold tracking-[-0.02em]" style={{ ...h2Style, color: dark ? WHITE : INK }}>{title}</h2>
      {sub && <p className="mt-4 text-[16px] md:text-lg leading-[1.6]" style={{ color: dark ? D_DIM : L_DIM }}>{sub}</p>}
    </motion.div>
  );
}

/* ── Seiten-Hero (hell, Portrait/Foto rechts + Glas-Review) ── */
export function SubHero({ eyebrow, title, sub, image, imageAlt, badge, primary = { label: "Termin anfragen", href: ANFRAGE_HREF }, secondary }: {
  eyebrow: string; title: ReactNode; sub: ReactNode; image: string; imageAlt: string; badge?: string;
  primary?: { label: string; href: string }; secondary?: { label: string; href: string };
}) {
  return (
    <header className="relative overflow-hidden px-5 md:px-10 pt-10 md:pt-16 pb-14 md:pb-20" style={{ background: WHITE }}>
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-44 -left-24 w-[680px] h-[680px] rounded-full" style={{ background: `radial-gradient(circle, ${COBALT}1f 0%, transparent 60%)`, filter: "blur(30px)" }} />
        <div className="absolute -top-28 right-[-60px] w-[520px] h-[520px] rounded-full" style={{ background: `radial-gradient(circle, ${MAGENTA}1a 0%, transparent 60%)`, filter: "blur(30px)" }} />
      </div>
      <motion.div variants={stagger} initial="hidden" animate="show" className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        <div>
          <motion.div variants={up}><Eyebrow>{eyebrow}</Eyebrow></motion.div>
          <motion.h1 variants={up} className="font-extrabold tracking-[-0.03em]" style={{ fontSize: "clamp(2.5rem,6vw,5.25rem)", lineHeight: 0.98, color: INK }}>{title}</motion.h1>
          <motion.p variants={up} className="mt-6 max-w-lg text-[16px] md:text-lg leading-[1.6]" style={{ color: L_DIM }}>{sub}</motion.p>
          <motion.div variants={up} className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <Link to={primary.href} className={cta} style={{ background: COBALT, color: WHITE }}>{primary.label} <ArrowRight className="w-4 h-4" /></Link>
            {secondary && <Link to={secondary.href} className={ghost} style={{ border: `1px solid ${L_LINE}`, color: INK }}><Play className="w-4 h-4" /> {secondary.label}</Link>}
          </motion.div>
          <motion.div variants={up} className="mt-8 inline-flex items-center gap-3 text-[13px]" style={{ color: L_DIM }}>
            <Stars s={15} /> <span style={{ color: INK, fontWeight: 600 }}>{RATING}</span> · {RATING_COUNT} Google-Bewertungen <GoogleG s={15} />
          </motion.div>
        </div>
        <motion.div variants={up} className="relative mx-auto w-full max-w-[420px] lg:max-w-none">
          <div className="relative rounded-[24px] overflow-hidden mx-auto lg:ml-auto lg:mr-0 w-full max-w-[420px]" style={{ boxShadow: "0 40px 80px -34px rgba(10,11,15,0.4)" }}>
            <img src={image} alt={imageAlt} className="w-full h-[420px] md:h-[520px] object-cover object-top" loading="eager" />
          </div>
          {badge && (
            <div className="hidden sm:block absolute -left-5 bottom-8 rounded-[22px] px-5 py-4" style={glass}>
              <div className="flex items-center gap-2 mb-1.5"><GoogleG s={18} /><Stars s={13} /></div>
              <p className="text-[13.5px] font-semibold leading-snug" style={{ color: INK }}>{badge}</p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </header>
  );
}

/* ── Stats (schwarze Zahlen) ── */
export function Stats({ items }: { items: { v: string; l: string }[] }) {
  return (
    <motion.section variants={stagger} initial="hidden" whileInView="show" viewport={vp} className="px-5 md:px-10 py-14 md:py-20">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-y-10">
        {items.map((s, i) => (
          <motion.div key={s.l} variants={up} className="px-4 md:px-8 text-center md:text-left" style={{ borderLeft: i % 4 === 0 ? "none" : `1px solid ${L_LINE}` }}>
            <p className="font-extrabold tracking-[-0.02em]" style={{ fontSize: "clamp(2.25rem,4vw,3.25rem)", color: INK }}>{s.v}</p>
            <p className="mt-1.5 text-[13.5px]" style={{ color: L_DIM }}>{s.l}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

/* ── Fakten-Grid (Dauer, Gäste, Technik …) ── */
export function FactsGrid({ items }: { items: { Icon: Icon; k: string; v: string }[] }) {
  return (
    <motion.section variants={stagger} initial="hidden" whileInView="show" viewport={vp} className="px-5 md:px-10 py-6">
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map(({ Icon, k, v }) => (
          <motion.div key={k} variants={up} className="rounded-[20px] p-6" style={{ background: WHITE, border: `1px solid ${L_LINE}` }}>
            <span className="w-11 h-11 rounded-[12px] flex items-center justify-center" style={{ background: `${COBALT}14`, color: COBALT }}><Icon className="w-5 h-5" /></span>
            <p className="mt-4 text-[13px] tracking-wide uppercase" style={{ color: L_DIM }}>{k}</p>
            <p className="mt-1 text-[19px] font-bold" style={{ color: INK }}>{v}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

/* ── Nummerierte Schritte (z.B. drei Akte) ── */
export function Steps({ eyebrow, title, sub, items }: { eyebrow?: string; title: ReactNode; sub?: ReactNode; items: { t: string; d: string }[] }) {
  return (
    <motion.section variants={stagger} initial="hidden" whileInView="show" viewport={vp} className="px-5 md:px-10 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        <SectionHeader eyebrow={eyebrow} title={title} sub={sub} />
        <div className="grid md:grid-cols-3 gap-5 mt-10">
          {items.map((s, i) => (
            <motion.div key={s.t} variants={up} className="rounded-[24px] p-7 flex flex-col" style={{ background: CARD_LIGHT, border: `1px solid ${L_LINE}` }}>
              <span className="w-12 h-12 rounded-full flex items-center justify-center text-[18px] font-extrabold" style={{ background: COBALT, color: WHITE }}>{i + 1}</span>
              <h3 className="font-extrabold mt-5" style={{ ...h3Style, color: INK }}>{s.t}</h3>
              <p className="mt-2.5 text-[15px] leading-[1.55]" style={{ color: L_DIM }}>{s.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

/* ── Glas-/Feature-Karten (Gründe, Highlights) ── */
export function GlassFeatures({ eyebrow, title, sub, items }: { eyebrow?: string; title: ReactNode; sub?: ReactNode; items: { Icon: Icon; t: string; d: string }[] }) {
  return (
    <motion.section variants={stagger} initial="hidden" whileInView="show" viewport={vp} className="px-5 md:px-10 py-16 md:py-24" style={{ background: PAPER, borderTop: `1px solid ${L_LINE}`, borderBottom: `1px solid ${L_LINE}` }}>
      <div className="max-w-7xl mx-auto">
        <SectionHeader eyebrow={eyebrow} title={title} sub={sub} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {items.map(({ Icon, t, d }) => (
            <motion.div key={t} variants={up} className="rounded-[22px] p-7" style={{ background: WHITE, border: `1px solid ${L_LINE}` }}>
              <span className="w-12 h-12 rounded-[14px] flex items-center justify-center" style={{ background: `${COBALT}14`, color: COBALT }}><Icon className="w-6 h-6" /></span>
              <h3 className="text-[19px] font-bold mt-5" style={{ color: INK }}>{t}</h3>
              <p className="mt-2 text-[14.5px] leading-[1.6]" style={{ color: L_DIM }}>{d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

/* ── Ruhige Statement-Section ── */
export function Statement({ eyebrow = "Die Idee", children }: { eyebrow?: string; children: ReactNode }) {
  return (
    <motion.section variants={up} initial="hidden" whileInView="show" viewport={vp} className="px-5 md:px-10 py-24 md:py-36" style={{ background: WHITE }}>
      <div className="max-w-4xl mx-auto text-center">
        <p className="flex items-center justify-center gap-2 text-[12px] tracking-[0.16em] uppercase font-semibold mb-7" style={{ color: L_DIM }}><span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: COBALT }} /> {eyebrow}</p>
        <h2 className="font-extrabold tracking-[-0.02em]" style={{ fontSize: "clamp(2rem,4.6vw,3.6rem)", lineHeight: 1.1, color: INK }}>{children}</h2>
      </div>
    </motion.section>
  );
}

/* ── Pull-Quote (beige, ruhig) ── */
export function PullQuote({ text, name, role }: { text: string; name: string; role: string }) {
  return (
    <motion.section variants={up} initial="hidden" whileInView="show" viewport={vp} className="px-5 md:px-10 py-20 md:py-28" style={{ background: PAPER }}>
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center mb-6"><Stars s={20} /></div>
        <blockquote className="font-extrabold tracking-[-0.02em]" style={{ fontSize: "clamp(1.5rem,3.2vw,2.5rem)", lineHeight: 1.22, color: INK }}>„{text}"</blockquote>
        <p className="mt-7 text-[14px] inline-flex items-center gap-2" style={{ color: L_DIM }}><GoogleG s={16} /> {name} · {role}</p>
      </div>
    </motion.section>
  );
}

/* ── Echte Google-Bewertungen ── */
export function ReviewsBlock({ paper = true }: { paper?: boolean }) {
  return (
    <motion.section id="reviews" variants={stagger} initial="hidden" whileInView="show" viewport={vp} className="px-5 md:px-10 py-16 md:py-24" style={paper ? { background: PAPER, borderTop: `1px solid ${L_LINE}`, borderBottom: `1px solid ${L_LINE}` } : { background: WHITE }}>
      <div className="max-w-7xl mx-auto">
        <motion.div variants={up} className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">
          <div className="flex items-center gap-4">
            <GoogleG s={42} />
            <div>
              <div className="flex items-center gap-2"><span className="text-3xl font-extrabold" style={{ color: INK }}>{RATING}</span><Stars s={18} /></div>
              <p className="text-[13.5px] mt-1" style={{ color: L_DIM }}>basierend auf <strong style={{ color: INK }}>{RATING_COUNT}</strong> Bewertungen · Google & ProvenExpert</p>
            </div>
          </div>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-4">
          {REVIEWS.map((r) => (
            <motion.div key={r.name} variants={up} className="rounded-[18px] p-6 flex flex-col" style={{ background: WHITE, border: `1px solid ${L_LINE}` }}>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-10 h-10 rounded-full flex items-center justify-center text-[15px] font-bold" style={{ background: COBALT, color: WHITE }}>{r.name[0]}</span>
                <div className="flex-1 min-w-0"><p className="text-[14px] font-semibold leading-tight" style={{ color: INK }}>{r.name}</p><p className="text-[11.5px]" style={{ color: L_DIM }}>{r.role}</p></div>
                <GoogleG s={18} />
              </div>
              <Stars s={14} />
              <p className="text-[14.5px] leading-[1.6] mt-3" style={{ color: "#3a3833" }}>„{r.text}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

/* ── Kunden-Logo-Marquee ── */
export function LogoMarquee({ label = "Vertraut von über 200 Auftraggebern" }: { label?: string }) {
  return (
    <section className="py-9 md:py-12 overflow-hidden" style={{ background: PAPER, borderTop: `1px solid ${L_LINE}`, borderBottom: `1px solid ${L_LINE}` }}>
      <p className="text-center text-[12px] tracking-[0.12em] uppercase mb-8 font-medium" style={{ color: L_DIM }}>{label}</p>
      <div className="pv-marquee relative" style={{ maskImage: "linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent)" }}>
        <div className="pv-track flex w-max items-center gap-16 md:gap-20">
          {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((l, i) => (<img key={i} src={`/logos/${l}`} alt="" className="pv-logo h-11 md:h-14 w-auto object-contain shrink-0" style={{ opacity: 0.85 }} loading="lazy" />))}
        </div>
      </div>
    </section>
  );
}

/* ── Final-CTA (Cobalt-Karte) ── */
export function FinalCTA({ title, sub }: { title: ReactNode; sub: string }) {
  return (
    <motion.section id="kontakt" variants={up} initial="hidden" whileInView="show" viewport={vp} className="px-5 md:px-10 py-16 md:py-24">
      <div className="max-w-7xl mx-auto relative overflow-hidden rounded-[26px] px-6 md:px-14 py-16 md:py-24" style={{ background: COBALT }}>
        <div aria-hidden className="absolute -top-16 -right-10 w-72 h-72 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }} />
        <h2 className="relative font-extrabold tracking-[-0.03em] max-w-3xl" style={{ fontSize: "clamp(2.25rem,5.5vw,4.25rem)", lineHeight: 1.0, color: WHITE }}>{title}</h2>
        <p className="relative mt-6 max-w-xl text-[16px] md:text-lg leading-[1.55]" style={{ color: "rgba(255,255,255,0.88)" }}>{sub}</p>
        <div className="relative mt-9 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <Link to={ANFRAGE_HREF} className={cta} style={{ background: WHITE, color: COBALT }}>Anfrage senden <ArrowRight className="w-4 h-4" /></Link>
          <a href={PHONE_HREF} className={ghost} style={{ border: "1px solid rgba(255,255,255,0.4)", color: WHITE }}>{PHONE_DISPLAY}</a>
        </div>
      </div>
    </motion.section>
  );
}

/* ── FAQ-Accordion (CSS-only via details/summary) ── */
export function FAQ({ eyebrow = "Häufige Fragen", title = "Gut zu wissen.", items }: { eyebrow?: string; title?: string; items: { q: string; a: string }[] }) {
  return (
    <motion.section variants={stagger} initial="hidden" whileInView="show" viewport={vp} className="px-5 md:px-10 py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        <SectionHeader eyebrow={eyebrow} title={title} center />
        <div className="mt-10 space-y-3">
          {items.map((f) => (
            <motion.details key={f.q} variants={up} className="group rounded-[18px] px-6 py-5" style={{ background: WHITE, border: `1px solid ${L_LINE}` }}>
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none">
                <span className="text-[16px] font-semibold" style={{ color: INK }}>{f.q}</span>
                <ChevronDown className="w-5 h-5 shrink-0 transition-transform group-open:rotate-180" style={{ color: COBALT }} />
              </summary>
              <p className="mt-3 text-[15px] leading-[1.6]" style={{ color: L_DIM }}>{f.a}</p>
            </motion.details>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
