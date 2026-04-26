import { Link } from "react-router-dom";
import { ArrowRight, Play, Star } from "lucide-react";
import heroStartImg from "@/assets/hero-start.jpg";

/**
 * Editorial hero — full-bleed photo + structured white typography.
 * Three jobs: build trust, explain what Emilian does, give a clear booking CTA.
 * "Anlässe" (event types) and "Formate" (show formats) are separated — they are different things.
 */
const LandingHero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden text-white flex flex-col">
      {/* Full-bleed background */}
      <div className="absolute inset-0">
        <img src={heroStartImg} alt="" className="h-full w-full object-cover" />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, rgba(15,10,25,0.8) 0%, rgba(15,10,25,0.55) 45%, rgba(15,10,25,0.2) 80%, rgba(15,10,25,0.05) 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-56"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(15,10,25,0.55))",
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 container px-6 flex-1 flex items-center pt-28 md:pt-32 pb-20 md:pb-24">
        <div className="w-full max-w-5xl">
          {/* Trust row */}
          <div
            className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-10 opacity-0 animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-300 text-amber-300"
                  />
                ))}
              </div>
              <span className="text-sm text-white/90">
                <strong className="font-semibold text-white">5,0</strong>
                <span className="text-white/60"> · 30+ Bewertungen</span>
              </span>
            </div>

            <span aria-hidden className="hidden md:block h-4 w-px bg-white/20" />

            <span className="text-sm text-white/85">
              <strong className="font-semibold text-white">200+ Events</strong>
              <span className="text-white/60"> seit 2014</span>
            </span>

            <span aria-hidden className="hidden md:block h-4 w-px bg-white/20" />

            <span className="text-sm text-white/75">
              Finalist{" "}
              <strong className="font-medium text-white">
                Talents of Magic
              </strong>
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-display font-black tracking-[-0.01em] leading-[1.08] text-[clamp(2.5rem,5.8vw,5.5rem)] opacity-0 animate-fade-up"
            style={{ animationDelay: "0.25s" }}
          >
            <span className="block">Magie, die</span>
            <span
              className="block mt-1"
              style={{
                background:
                  "linear-gradient(100deg, hsl(225 95% 75%) 0%, hsl(285 85% 75%) 50%, hsl(340 95% 75%) 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              bleibt.
            </span>
          </h1>

          {/* What he does */}
          <p
            className="mt-10 max-w-2xl text-lg md:text-xl leading-[1.55] text-white/85 font-light opacity-0 animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            Interaktive Zauberkunst und Comedy — direkt bei deinen Gästen. Für{" "}
            <span className="text-white font-medium">Hochzeiten</span>,{" "}
            <span className="text-white font-medium">Firmenfeiern</span> und{" "}
            <span className="text-white font-medium">Geburtstage</span>.
          </p>

          {/* CTAs */}
          <div
            className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-5 opacity-0 animate-fade-up"
            style={{ animationDelay: "0.55s" }}
          >
            <Link
              to="/buchung"
              className="group inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-[15px] font-semibold text-[#0f0a19] bg-white hover:bg-white/95 transition-transform hover:scale-[1.01] shadow-[0_12px_40px_rgba(0,0,0,0.25)]"
            >
              <span>Jetzt anfragen</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href="#showkonzepte"
              className="group inline-flex items-center gap-3 text-white/85 hover:text-white transition-colors"
            >
              <span className="relative flex items-center justify-center w-11 h-11 rounded-full border border-white/30 bg-white/5 backdrop-blur-sm group-hover:scale-105 transition-transform">
                <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5" />
              </span>
              <span className="font-sans text-[15px] font-medium">
                Zur Show
              </span>
            </a>
          </div>

          <p
            className="mt-4 text-xs md:text-sm text-white/55 opacity-0 animate-fade-up"
            style={{ animationDelay: "0.7s" }}
          >
            Kostenlos · Unverbindlich · Antwort innerhalb von 24h
          </p>
        </div>
      </div>

      {/* Bottom strip — Formate only */}
      <div className="relative z-10 container px-6 pb-10 md:pb-12">
        <div className="pt-7 md:pt-8 border-t border-white/15 text-[13px]">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="shrink-0 text-white/45 uppercase tracking-wider text-[11px]">
              Formate
            </span>
            {[
              { label: "Close-Up", to: "/close-up" },
              { label: "Bühnenshow", to: "/buehnenshow" },
              { label: "Magic Dinner", to: "/magic-dinner" },
              { label: "Moderation", to: "/moderation" },
            ].map((a) => (
              <Link
                key={a.label}
                to={a.to}
                className="text-white/85 hover:text-white underline-offset-4 hover:underline transition-colors"
              >
                {a.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
