import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import AnimatedWords from "./AnimatedWords";

interface BackgroundHeroProps {
  imageSrc: string;
  badge?: string;
  headline: string;
  animatedWords?: string[];
  subline: string;
  ctaPrimary?: { text: string; to: string };
  ctaSecondary?: { text: string; href: string };
  overlay?: "light" | "medium" | "dark";
}

const BackgroundHero = ({
  imageSrc,
  badge,
  headline,
  animatedWords,
  subline,
  ctaPrimary = { text: "Jetzt anfragen", to: "/buchung" },
  ctaSecondary,
  overlay = "medium",
}: BackgroundHeroProps) => {
  const overlayClass = {
    light: "bg-black/20",
    medium: "bg-black/40",
    dark: "bg-black/60",
  }[overlay];

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={imageSrc}
          alt=""
          className="h-full w-full object-cover scale-105"
          style={{ animation: "slowZoom 20s ease-in-out infinite alternate" }}
        />
        <div className={`absolute inset-0 ${overlayClass}`} />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center text-center">
          {badge && (
            <span className="mb-6 inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur-md md:text-sm">
              {badge}
            </span>
          )}

          <h1 className="max-w-5xl text-center font-bold tracking-tight text-white leading-[0.9] text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="block">{headline}</span>
            {animatedWords?.length ? (
              <span className="mt-2 block min-h-[1.1em] text-blue-500">
                <AnimatedWords words={animatedWords} />
              </span>
            ) : null}
          </h1>

          <p className="mt-8 max-w-3xl text-center text-lg leading-relaxed text-white/85 md:text-2xl">
            {subline}
          </p>

          {(ctaPrimary || ctaSecondary) && (
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              {ctaPrimary && (
                <Link
                  to={ctaPrimary.to}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-black transition hover:scale-[1.02]"
                >
                  {ctaPrimary.text}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}

              {ctaSecondary && (
                <a
                  href={ctaSecondary.href}
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-md transition hover:bg-white/15"
                >
                  {ctaSecondary.text}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BackgroundHero;
