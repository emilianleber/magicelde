import { useState } from "react";
import { Star, Award, Trophy } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/* ─── Google "G" Icon (brand colors) ─── */
const GoogleIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

/* ─── ProvenExpert Checkmark Icon (brand green) ─── */
const ProvenExpertIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="11" fill="#00A960" />
    <path
      d="M7 12.5l3 3 7-7"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

/* ─── Rating Badges (Google, ProvenExpert) ─── */
export const RatingBadges = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center justify-center gap-6 sm:gap-8 ${className}`}>
    {/* Google Badge */}
    <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
      <GoogleIcon className="w-5 h-5 flex-shrink-0" />
      <div className="flex items-center gap-1.5">
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <span className="font-display text-sm font-bold text-foreground">
          5.0
        </span>
      </div>
    </div>

    {/* ProvenExpert Badge */}
    <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
      <ProvenExpertIcon className="w-5 h-5 flex-shrink-0" />
      <div className="flex items-center gap-1.5">
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${
                i < 4
                  ? "fill-amber-400 text-amber-400"
                  : "fill-amber-400/80 text-amber-400/80"
              }`}
            />
          ))}
        </div>
        <span className="font-display text-sm font-bold text-foreground">
          4.9
        </span>
      </div>
      <span className="text-[10px] text-muted-foreground hidden sm:inline">
        ProvenExpert
      </span>
    </div>
  </div>
);

/* ─── Award Badges ─── */
export const AwardBadges = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center justify-center gap-3 ${className}`}>
    {[
      { icon: Trophy, label: "Kreativpreisträger" },
      { icon: Award, label: "Greatest Talent Finalist" },
      { icon: Star, label: "200+ Events" },
    ].map((a) => (
      <span
        key={a.label}
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border/50 bg-muted/40 text-[10px] font-semibold tracking-wide uppercase text-muted-foreground"
      >
        <a.icon className="w-3 h-3" />
        {a.label}
      </span>
    ))}
  </div>
);

/* ─── Client Logos ─── */
const clientLogos: { name: string; logo?: string }[] = [
  { name: "Schneider Weisse", logo: "/logos/schneider-weisse.png" },
  { name: "Sixt", logo: "/logos/sixt.png" },
  { name: "Sparkasse", logo: "/logos/sparkasse.png" },
  { name: "Versicherungskammer Bayern", logo: "/logos/vkb.png" },
  { name: "Wächter", logo: "/logos/waechter.png" },
  { name: "STRABAG", logo: "/logos/strabag.png" },
  { name: "Stadt Regensburg", logo: "/logos/stadt-regensburg.png" },
  { name: "DPSG", logo: "/logos/dpsg.png" },
  { name: "Steinhofer INGENIEURE", logo: "/logos/steinhofer.png" },
  { name: "Wald&Wiese", logo: "/logos/wald-wiese.png" },
  { name: "HEIM & HAUS", logo: "/logos/heim-haus.png" },
];

/* Logo Item – zeigt Bild falls vorhanden, sonst Text */
const LogoItem = ({ name, logo }: { name: string; logo?: string }) => {
  const [imgError, setImgError] = useState(false);

  if (logo && !imgError) {
    return (
      <img
        src={logo}
        alt={name}
        title={name}
        onError={() => setImgError(true)}
        className="h-8 md:h-10 w-auto max-w-[140px] object-contain opacity-40 hover:opacity-70 transition-opacity duration-300 grayscale hover:grayscale-0 select-none"
      />
    );
  }

  return (
    <span
      title={name}
      className="font-display text-lg md:text-xl font-bold text-muted-foreground/20 hover:text-muted-foreground/40 transition-colors duration-300 select-none whitespace-nowrap"
    >
      {name}
    </span>
  );
};

export const ClientLogos = ({
  title = "Vertrauen namhafter Unternehmen und Veranstalter.",
  className = "",
}: {
  title?: string;
  className?: string;
}) => {
  const { ref, isVisible } = useScrollReveal();
  // Doppelte Logos für endlose Scroll-Animation
  const doubled = [...clientLogos, ...clientLogos];

  return (
    <section className={`section-medium overflow-hidden ${className}`} ref={ref}>
      <div className="container px-6">
        <div className={`${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          {title && (
            <p className="font-sans text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground/40 text-center mb-10">
              {title}
            </p>
          )}
          {/* Scrolling Logo Carousel */}
          <div className="relative w-full overflow-hidden">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10" />
            {/* Scrolling track */}
            <div className="flex items-center gap-12 md:gap-16 animate-scroll-left">
              {doubled.map((item, i) => (
                <div key={`${item.name}-${i}`} className="shrink-0">
                  <LogoItem name={item.name} logo={item.logo} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── Combined Trust Strip (compact, unter Hero) ─── */
export const TrustStrip = ({ className = "" }: { className?: string }) => (
  <div className={`py-6 ${className}`}>
    <div className="container px-6">
      <div className="flex flex-col items-center gap-3">
        <RatingBadges />
        <AwardBadges />
      </div>
    </div>
  </div>
);

/* ─── Full Trust Section (für Referenzen / Firmenfeiern) ─── */
export const TrustSection = ({ className = "" }: { className?: string }) => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className={`section-large section-alt ${className}`} ref={ref}>
      <div className="container px-6">
        <div
          className={`max-w-3xl mx-auto text-center mb-16 ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          <span className="badge-gradient mb-8 inline-flex">Vertrauen</span>
          <h2 className="headline-section text-foreground mb-6">
            Ausgezeichnet & empfohlen.
          </h2>
          <p className="text-body max-w-xl mx-auto">
            Über 200 erfolgreiche Events, starke Bewertungen auf mehreren
            Plattformen und das Vertrauen namhafter Unternehmen und
            Veranstalter.
          </p>
        </div>

        <div
          className={`space-y-12 ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
          style={{ animationDelay: "0.15s" }}
        >
          <div className="flex flex-col items-center gap-6">
            <RatingBadges />
            <AwardBadges />
          </div>

          <div className="overflow-hidden relative">
            <p className="font-sans text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground/40 text-center mb-8">
              Bekannt von Events für
            </p>
            <div className="relative w-full overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10" />
              <div className="flex items-center gap-12 md:gap-16 animate-scroll-left">
                {[...clientLogos, ...clientLogos].map((item, i) => (
                  <div key={`${item.name}-${i}`} className="shrink-0">
                    <LogoItem name={item.name} logo={item.logo} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
