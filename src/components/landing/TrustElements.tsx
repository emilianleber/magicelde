import { Star, Award, Trophy, ExternalLink } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/* ─── Rating Badges (Google, ProvenExpert) ─── */
export const RatingBadges = ({ className = "" }: { className?: string }) => (
  <div className={`flex flex-wrap items-center justify-center gap-5 ${className}`}>
    {[
      { platform: "Google", score: "4.9", reviews: "120+ Bewertungen" },
      { platform: "ProvenExpert", score: "4.8", reviews: "Top Empfehlung" },
    ].map((r) => (
      <div
        key={r.platform}
        className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-background/80 backdrop-blur-sm border border-border/50 shadow-sm"
      >
        <div>
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="font-display text-sm font-bold text-foreground">{r.platform}</span>
            <span className="font-display text-sm font-bold text-foreground">{r.score}</span>
          </div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-[10px] text-muted-foreground ml-1">{r.reviews}</span>
          </div>
        </div>
      </div>
    ))}
  </div>
);

/* ─── Award Badges ─── */
export const AwardBadges = ({ className = "" }: { className?: string }) => (
  <div className={`flex flex-wrap items-center justify-center gap-4 ${className}`}>
    {[
      { icon: Trophy, label: "Kreativpreisträger" },
      { icon: Award, label: "Greatest Talent Finalist" },
      { icon: Star, label: "500+ Events" },
    ].map((a) => (
      <div
        key={a.label}
        className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-border/50 bg-background/60 backdrop-blur-sm"
      >
        <a.icon className="w-3.5 h-3.5 text-accent" />
        <span className="font-sans text-[11px] font-semibold tracking-wide uppercase text-foreground/80">{a.label}</span>
      </div>
    ))}
  </div>
);

/* ─── Client Logos ─── */
const clientLogos = [
  "BMW", "Siemens", "Allianz", "Audi", "Deutsche Bank",
  "Mercedes-Benz", "SAP", "Porsche", "BASF", "Bosch",
];

export const ClientLogos = ({ title = "Vertrauen führender Unternehmen.", className = "" }: { title?: string; className?: string }) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className={`section-medium ${className}`} ref={ref}>
      <div className="container px-6">
        <div className={`${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          {title && (
            <p className="font-sans text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground/40 text-center mb-10">
              {title}
            </p>
          )}
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 max-w-4xl mx-auto">
            {clientLogos.map((name) => (
              <span
                key={name}
                className="font-display text-lg md:text-xl font-bold text-muted-foreground/20 hover:text-muted-foreground/40 transition-colors duration-300 select-none"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── Combined Trust Strip (compact, unter Hero) ─── */
export const TrustStrip = ({ className = "" }: { className?: string }) => (
  <div className={`py-10 ${className}`}>
    <div className="container px-6">
      <div className="flex flex-col items-center gap-6">
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
        <div className={`max-w-3xl mx-auto text-center mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-gradient mb-8 inline-flex">Vertrauen</span>
          <h2 className="headline-section text-foreground mb-6">Ausgezeichnet & empfohlen.</h2>
          <p className="text-body max-w-xl mx-auto">
            Über 500 erfolgreiche Events, Top-Bewertungen auf allen Plattformen
            und das Vertrauen namhafter Unternehmen.
          </p>
        </div>

        <div className={`space-y-12 ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
          {/* Ratings */}
          <div className="flex flex-col items-center gap-6">
            <RatingBadges />
            <AwardBadges />
          </div>

          {/* Logos */}
          <div>
            <p className="font-sans text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground/40 text-center mb-8">
              Bekannt von Events für
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 max-w-4xl mx-auto">
              {clientLogos.map((name) => (
                <span
                  key={name}
                  className="font-display text-lg md:text-xl font-bold text-muted-foreground/20 hover:text-muted-foreground/40 transition-colors duration-300 select-none"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
