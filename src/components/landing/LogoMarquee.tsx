import { useScrollReveal } from "@/hooks/useScrollReveal";

const LOGOS = [
  { src: "/logos/vkb.png", alt: "VKB Versicherungskammer Bayern" },
  { src: "/logos/strabag.png", alt: "STRABAG" },
  { src: "/logos/xxxlutz.png", alt: "XXXLutz" },
  { src: "/logos/sixt.png", alt: "Sixt" },
  { src: "/logos/sparkasse.png", alt: "Sparkasse" },
  { src: "/logos/heim-haus.png", alt: "HEIM & HAUS" },
  { src: "/logos/schneider-weisse.png", alt: "Schneider Weisse" },
  { src: "/logos/wald-wiese.png", alt: "Wald & Wiese" },
  { src: "/logos/stadt-regensburg.png", alt: "Stadt Regensburg" },
  { src: "/logos/stadt-deggendorf.svg", alt: "Stadt Deggendorf" },
  { src: "/logos/oktoberfest.png", alt: "Oktoberfest" },
  { src: "/logos/turmtheater.png", alt: "Turmtheater" },
  { src: "/logos/greatest-talent.png", alt: "Greatest Talent (TV)" },
  { src: "/logos/business-entertainment.png", alt: "Business Entertainment" },
  { src: "/logos/dpsg.png", alt: "DPSG" },
  { src: "/logos/drying-little-tears.png", alt: "Drying Little Tears" },
  { src: "/logos/steinhofer.png", alt: "Steinhofer" },
  { src: "/logos/waechter.png", alt: "Wächter" },
];


interface LogoMarqueeProps {
  /** Optional eyebrow above the marquee. Default: italic-serif text. */
  eyebrow?: string;
  /** Optional headline. */
  headline?: string;
  /** Background variant — light cream or transparent. */
  variant?: "cream" | "white" | "transparent";
  /** Compact: smaller padding, no headline */
  compact?: boolean;
}

const LogoMarquee = ({
  eyebrow = "Auftritte für",
  headline,
  variant = "cream",
  compact = false,
}: LogoMarqueeProps) => {
  const { ref, isVisible } = useScrollReveal();
  const bg =
    variant === "cream"
      ? "bg-[hsl(0,0%,98%)]"
      : variant === "white"
        ? "bg-white"
        : "bg-transparent";

  return (
    <section
      ref={ref}
      className={`relative ${bg} ${compact ? "py-12 md:py-16" : "py-20 md:py-28"} border-y border-foreground/10 overflow-hidden`}
    >
      <style>{`
        @keyframes logoScroll {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
        .logo-track {
          display: flex;
          width: max-content;
          animation: logoScroll 55s linear infinite;
          will-change: transform;
        }
        /* gap als margin-right auf jedes Item — sorgt für gleichmäßigen
           Abstand auch zwischen letztem Item der ersten Hälfte und erstem
           Item der zweiten Hälfte → nahtloser -50%-Loop ohne Lücke. */
        .logo-item { margin-right: 4rem; }
        @media (hover: hover) {
          .logo-marquee:hover .logo-track {
            animation-play-state: paused;
          }
        }
        @media (max-width: 768px) {
          .logo-item { margin-right: 2.5rem; }
          .logo-track { animation-duration: 35s; }
        }
        @media (prefers-reduced-motion: reduce) {
          .logo-track { animation: none; flex-wrap: wrap; width: 100%; justify-content: center; }
          .logo-item { margin-right: 2rem; }
        }
      `}</style>

      {!compact && (
        <div className="container px-6 mb-10 md:mb-14">
          <div
            className={`max-w-3xl ${isVisible ? "animate-fade-up" : "opacity-0"}`}
          >
            <p
              className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-3"
            >
              {eyebrow}
            </p>
            {headline && (
              <h2 className="font-display font-black tracking-[-0.025em] leading-[1.05] text-[clamp(1.5rem,3.5vw,2.75rem)] text-foreground">
                {headline}
              </h2>
            )}
          </div>
        </div>
      )}

      <div className="logo-marquee relative">
        {/* Fade edges */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 z-10"
          style={{
            background:
              variant === "cream"
                ? "linear-gradient(90deg, hsl(0,0%,98%) 0%, transparent 100%)"
                : variant === "white"
                  ? "linear-gradient(90deg, #ffffff 0%, transparent 100%)"
                  : "linear-gradient(90deg, hsl(0 0% 100% / 0.0) 0%, transparent 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 z-10"
          style={{
            background:
              variant === "cream"
                ? "linear-gradient(-90deg, hsl(0,0%,98%) 0%, transparent 100%)"
                : variant === "white"
                  ? "linear-gradient(-90deg, #ffffff 0%, transparent 100%)"
                  : "linear-gradient(-90deg, hsl(0 0% 100% / 0.0) 0%, transparent 100%)",
          }}
        />

        <div className="logo-track">
          {[...LOGOS, ...LOGOS].map((l, i) => (
            <div
              key={`${l.alt}-${i}`}
              className="logo-item shrink-0 flex items-center justify-center"
              style={{ height: compact ? 48 : 72 }}
            >
              <img
                src={l.src}
                alt={l.alt}
                className="h-full w-auto object-contain transition-transform duration-500 hover:scale-105"
                style={{ filter: "saturate(1.05)" }}
                loading="eager"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoMarquee;
