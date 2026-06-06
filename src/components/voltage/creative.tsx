/**
 * VOLTAGE — kreative, abwechslungsreiche Sections (Stripe/Anyfin-Stil).
 * Signature-Elemente der Startseite als Bausteine: Flow-Linie, Foto-Splits, Bento,
 * Glas-Notifications, interaktive Tabs, Dark-Showcase. Bewusst KEINE uniformen Widget-Grids.
 */
import { useState, type ComponentType, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Layers } from "lucide-react";
import {
  INK, WHITE, PAPER, COBALT, MAGENTA, L_LINE, L_DIM, D_DIM, PANEL_BG, CARD_LIGHT,
  ANFRAGE_HREF, up, stagger, vp, glass, glassDark, Eyebrow, Stars, GoogleG,
} from "./theme";

type Icon = ComponentType<{ className?: string; style?: React.CSSProperties }>;
const H2 = { fontSize: "clamp(2rem,4.4vw,3.4rem)", lineHeight: 1.04 } as const;

/* ════════ 1. SplitFeature — asymmetrisch Foto + Text (Stripe-Workhorse) ════════ */
export function SplitFeature({ eyebrow, title, sub, points, image, imageAlt, reverse, dark, stat }: {
  eyebrow: string; title: ReactNode; sub: ReactNode; points?: string[];
  image: string; imageAlt: string; reverse?: boolean; dark?: boolean; stat?: { v: string; l: string };
}) {
  return (
    <motion.section variants={stagger} initial="hidden" whileInView="show" viewport={vp}
      className="px-5 md:px-10 py-16 md:py-24" style={dark ? { background: INK, color: WHITE } : undefined}>
      <div className={`max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${reverse ? "lg:[direction:rtl]" : ""}`}>
        <motion.div variants={up} className="relative [direction:ltr]">
          <div className="relative rounded-[28px] overflow-hidden" style={{ boxShadow: "0 40px 80px -34px rgba(10,11,15,0.4)" }}>
            <img src={image} alt={imageAlt} className="w-full h-[360px] md:h-[500px] object-cover object-top" loading="lazy" />
          </div>
          {stat && (
            <div className="hidden sm:block absolute -right-4 -bottom-5 rounded-[22px] px-6 py-5" style={dark ? { ...glassDark } : { background: WHITE, boxShadow: "0 24px 60px -24px rgba(10,11,15,0.3)", border: `1px solid ${L_LINE}` }}>
              <p className="font-extrabold leading-none" style={{ fontSize: "2.6rem", color: dark ? WHITE : COBALT }}>{stat.v}</p>
              <p className="text-[13px] mt-1.5" style={{ color: dark ? D_DIM : L_DIM }}>{stat.l}</p>
            </div>
          )}
        </motion.div>
        <motion.div variants={up} className="[direction:ltr]">
          <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
          <h2 className="font-extrabold tracking-[-0.02em]" style={{ ...H2, color: dark ? WHITE : INK }}>{title}</h2>
          <p className="mt-5 text-[16px] md:text-lg leading-[1.65]" style={{ color: dark ? D_DIM : L_DIM }}>{sub}</p>
          {points && (
            <ul className="mt-7 space-y-3">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-[15.5px]" style={{ color: dark ? "#d9d6e0" : "#3a3833" }}>
                  <span className="shrink-0 mt-0.5 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: dark ? `${COBALT}33` : `${COBALT}16`, color: dark ? "#9db0ff" : COBALT }}><Check className="w-4 h-4" /></span>
                  {p}
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
}

/* ════════ 2. Bento — gemischte Karten (Foto / Stat / Glas / Zitat), wie das Warum-Karussell ════════ */
type BentoItem =
  | { kind: "photo"; span?: string; image: string; chip?: string; title: string }
  | { kind: "cobalt"; span?: string; v: string; l: string; note?: string }
  | { kind: "glass"; span?: string; Icon: Icon; t: string; d: string }
  | { kind: "quote"; span?: string; text: string; name: string };

export function Bento({ eyebrow, title, sub, items }: { eyebrow: string; title: ReactNode; sub?: ReactNode; items: BentoItem[] }) {
  return (
    <motion.section variants={stagger} initial="hidden" whileInView="show" viewport={vp}
      className="px-5 md:px-10 py-16 md:py-24" style={{ background: PAPER, borderTop: `1px solid ${L_LINE}`, borderBottom: `1px solid ${L_LINE}` }}>
      <div className="max-w-7xl mx-auto">
        <motion.div variants={up} className="max-w-3xl mb-10"><Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="font-extrabold tracking-[-0.02em]" style={{ ...H2, color: INK }}>{title}</h2>
          {sub && <p className="mt-4 text-[16px] md:text-lg leading-[1.6]" style={{ color: L_DIM }}>{sub}</p>}
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[200px] gap-4">
          {items.map((it, i) => {
            const span = it.span || "";
            if (it.kind === "photo") return (
              <motion.div key={i} variants={up} className={`relative rounded-[24px] overflow-hidden ${span}`}>
                <img src={it.image} alt="" className="absolute inset-0 w-full h-full object-cover object-top" loading="lazy" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,11,15,0.05) 30%, rgba(10,11,15,0.85) 100%)" }} />
                {it.chip && <span className="absolute top-5 left-5 px-3.5 py-1.5 rounded-full text-[12.5px] font-semibold" style={{ ...glass, color: INK }}>{it.chip}</span>}
                <h3 className="absolute left-6 bottom-5 right-6 font-extrabold text-white" style={{ fontSize: "clamp(1.25rem,1.7vw,1.7rem)", lineHeight: 1.08 }}>{it.title}</h3>
              </motion.div>
            );
            if (it.kind === "cobalt") return (
              <motion.div key={i} variants={up} className={`rounded-[24px] p-7 flex flex-col justify-center ${span}`} style={{ background: COBALT, color: WHITE }}>
                <p className="font-extrabold tracking-[-0.02em] leading-none" style={{ fontSize: "clamp(2.5rem,4vw,3.5rem)" }}>{it.v}</p>
                <p className="mt-2 text-[14px] font-semibold" style={{ color: "rgba(255,255,255,0.85)" }}>{it.l}</p>
                {it.note && <p className="mt-1 text-[12.5px]" style={{ color: "rgba(255,255,255,0.6)" }}>{it.note}</p>}
              </motion.div>
            );
            if (it.kind === "quote") return (
              <motion.div key={i} variants={up} className={`rounded-[24px] p-7 flex flex-col justify-between ${span}`} style={{ background: CARD_LIGHT, border: `1px solid ${L_LINE}` }}>
                <div className="flex items-center gap-2"><GoogleG s={20} /><Stars s={14} /></div>
                <p className="text-[15px] leading-snug mt-3" style={{ color: INK }}>„{it.text}"</p>
                <p className="text-[12.5px] mt-3" style={{ color: L_DIM }}>{it.name}</p>
              </motion.div>
            );
            return (
              <motion.div key={i} variants={up} className={`rounded-[24px] p-7 flex flex-col ${span}`} style={{ background: WHITE, border: `1px solid ${L_LINE}` }}>
                <span className="w-12 h-12 rounded-[14px] flex items-center justify-center" style={{ background: `${COBALT}14`, color: COBALT }}><it.Icon className="w-6 h-6" /></span>
                <h3 className="text-[18px] font-bold mt-4" style={{ color: INK }}>{it.t}</h3>
                <p className="mt-1.5 text-[14px] leading-[1.55]" style={{ color: L_DIM }}>{it.d}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}

/* ════════ 3. FlowBand — Flow-Linie (dashed→solid) im beigen Panel (Signature) ════════ */
export function FlowBand({ eyebrow, title, sub, milestones }: { eyebrow: string; title: ReactNode; sub?: ReactNode; milestones: { t: string; d: string }[] }) {
  return (
    <section className="px-4 md:px-8 py-14 md:py-20" style={{ background: WHITE }}>
      <div className="max-w-[1364px] mx-auto rounded-[28px] md:rounded-[44px] overflow-hidden px-6 md:px-14 pt-12 md:pt-16 pb-12 md:pb-16" style={{ background: PANEL_BG }}>
        <motion.div variants={up} initial="hidden" whileInView="show" viewport={vp} className="max-w-3xl">
          <span className="inline-block px-3.5 py-1.5 rounded-full text-[13px] font-semibold mb-5" style={{ background: INK, color: WHITE }}>{eyebrow}</span>
          <h2 className="font-extrabold tracking-[-0.02em]" style={{ ...H2, color: INK }}>{title}</h2>
          {sub && <p className="mt-4 text-[16px] md:text-lg leading-[1.6]" style={{ color: L_DIM }}>{sub}</p>}
        </motion.div>
        {/* Flow-Linie */}
        <div className="relative mt-12 mb-2" style={{ height: 120 }}>
          <svg aria-hidden className="absolute left-0 right-0 w-full" style={{ top: 20, height: 90 }} viewBox="0 0 760 200" fill="none" preserveAspectRatio="none">
            <line x1="0" y1="100" x2="760" y2="100" stroke={COBALT} strokeWidth="3" vectorEffect="non-scaling-stroke" />
            <path d="M0,100 C27,40 53,40 80,100 C107,156 133,156 160,100 C187,48 213,48 240,100 C267,150 293,150 320,100 C347,58 373,58 400,100 C427,142 453,142 480,100 C507,70 533,70 560,100 C587,128 613,128 640,100 C667,86 693,86 720,100 L760,100" stroke="rgba(10,11,15,0.3)" strokeWidth="3" strokeDasharray="0.1 13" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          </svg>
          <span aria-hidden className="absolute w-14 h-14 rounded-[18px] flex items-center justify-center" style={{ top: 38, right: 0, background: COBALT, color: WHITE, boxShadow: `0 18px 34px -12px ${COBALT}99` }}><Layers className="w-6 h-6" /></span>
        </div>
        {/* Milestones */}
        <div className="grid sm:grid-cols-3 gap-4 mt-6">
          {milestones.map((m, i) => (
            <motion.div key={m.t} variants={up} initial="hidden" whileInView="show" viewport={vp} className="rounded-[20px] p-5 flex items-start gap-3" style={{ ...glass, color: INK }}>
              <span className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[14px] font-bold" style={{ background: COBALT, color: WHITE }}>{i + 1}</span>
              <span><span className="block text-[15px] font-bold leading-tight">{m.t}</span><span className="block text-[13px] mt-0.5 leading-snug" style={{ color: L_DIM }}>{m.d}</span></span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════ 4. NotificationFlow — Glas-Notification-Stack (Buchungs-/Prozess-Flow) ════════ */
export function NotificationFlow({ eyebrow, title, sub, steps }: { eyebrow: string; title: ReactNode; sub: ReactNode; steps: { Icon: Icon; t: string; d: string }[] }) {
  return (
    <motion.section variants={stagger} initial="hidden" whileInView="show" viewport={vp} className="px-5 md:px-10 py-16 md:py-24">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div variants={up}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="font-extrabold tracking-[-0.02em]" style={{ ...H2, color: INK }}>{title}</h2>
          <p className="mt-5 text-[16px] md:text-lg leading-[1.65]" style={{ color: L_DIM }}>{sub}</p>
          <Link to={ANFRAGE_HREF} className="mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[14px] font-semibold transition-transform hover:scale-[1.02]" style={{ background: COBALT, color: WHITE }}>Jetzt anfragen <ArrowRight className="w-4 h-4" /></Link>
        </motion.div>
        <motion.div variants={up} className="relative rounded-[32px] p-7 md:p-10 overflow-hidden" style={{ background: CARD_LIGHT, border: `1px solid ${L_LINE}` }}>
          <div aria-hidden className="absolute -top-20 -right-16 w-[360px] h-[360px] rounded-full" style={{ background: `radial-gradient(circle, ${COBALT}1f, transparent 62%)` }} />
          <div className="relative space-y-4">
            {steps.map((s, i) => (
              <div key={s.t} className="relative">
                <div className="flex items-start gap-3 rounded-[22px] px-4 py-4" style={{ ...glass, color: INK, marginLeft: i * 14 }}>
                  <span className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: i === steps.length - 1 ? COBALT : `${COBALT}16`, color: i === steps.length - 1 ? WHITE : COBALT }}><s.Icon className="w-5 h-5" /></span>
                  <span className="min-w-0"><span className="block text-[15px] font-bold leading-tight">{s.t}</span><span className="block text-[13px] mt-0.5 leading-snug" style={{ color: L_DIM }}>{s.d}</span></span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

/* ════════ 5. InteractiveTabs — Pills + Bild-Preview (Anlässe-Stil, interaktiv) ════════ */
export function InteractiveTabs({ eyebrow, title, tabs }: { eyebrow: string; title: ReactNode; tabs: { t: string; d: string; img: string }[] }) {
  const [idx, setIdx] = useState(0);
  return (
    <motion.section variants={stagger} initial="hidden" whileInView="show" viewport={vp} className="px-5 md:px-10 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        <motion.div variants={up} className="max-w-2xl mb-8"><Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="font-extrabold tracking-[-0.02em]" style={{ ...H2, color: INK }}>{title}</h2>
        </motion.div>
        <motion.div variants={up} className="no-bar flex gap-2 overflow-x-auto pb-2 mb-6">
          {tabs.map((a, i) => (
            <button key={a.t} onClick={() => setIdx(i)} className="shrink-0 px-4 py-2.5 rounded-full text-[14px] font-semibold transition-colors" style={i === idx ? { background: COBALT, color: WHITE } : { background: WHITE, color: INK, border: `1px solid ${L_LINE}` }}>{a.t}</button>
          ))}
        </motion.div>
        <motion.div variants={up} className="relative rounded-[24px] overflow-hidden" style={{ border: `1px solid ${L_LINE}` }}>
          <AnimatePresence mode="wait">
            <motion.div key={idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="relative">
              <img src={tabs[idx].img} alt={tabs[idx].t} className="w-full h-[360px] md:h-[460px] object-cover object-top" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(10,11,15,0.86) 0%, rgba(10,11,15,0.45) 52%, rgba(10,11,15,0.15) 100%)" }} />
              <div className="absolute inset-0 flex flex-col justify-end p-7 md:p-12 max-w-2xl">
                <h3 className="font-extrabold text-white" style={{ fontSize: "clamp(1.75rem,3.5vw,3rem)", lineHeight: 1.04 }}>{tabs[idx].t}</h3>
                <p className="mt-3 max-w-lg text-[15px] md:text-base" style={{ color: "rgba(255,255,255,0.85)" }}>{tabs[idx].d}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.section>
  );
}

/* ════════ 6. DarkShowcase — dunkle Foto+Text-Section (Über-Stil) ════════ */
export function DarkShowcase({ eyebrow, title, paras, image, imageAlt, badge, reverse }: {
  eyebrow: string; title: ReactNode; paras: string[]; image: string; imageAlt: string; badge?: string; reverse?: boolean;
}) {
  return (
    <section className="px-5 md:px-10 py-20 md:py-28" style={{ background: INK, color: WHITE }}>
      <div className={`max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${reverse ? "lg:[direction:rtl]" : ""}`}>
        <motion.div variants={up} initial="hidden" whileInView="show" viewport={vp} className="relative rounded-[24px] overflow-hidden [direction:ltr]" style={{ boxShadow: "0 40px 90px -34px rgba(0,0,0,0.6)" }}>
          <img src={image} alt={imageAlt} className="w-full h-[420px] md:h-[520px] object-cover object-top" loading="lazy" />
          {badge && <span className="absolute top-5 left-5 text-[12px] font-bold px-3.5 py-2 rounded-full" style={{ ...glassDark, color: WHITE }}>{badge}</span>}
        </motion.div>
        <motion.div variants={up} initial="hidden" whileInView="show" viewport={vp} className="[direction:ltr]">
          <Eyebrow dark>{eyebrow}</Eyebrow>
          <h2 className="font-extrabold tracking-[-0.02em]" style={{ ...H2, color: WHITE }}>{title}</h2>
          <div className="mt-6 space-y-5 text-[15.5px] md:text-base leading-[1.75]" style={{ color: D_DIM }}>
            {paras.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
