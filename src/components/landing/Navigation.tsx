import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, ArrowRight, ArrowUpRight, Star, Clock } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logoImg from "@/assets/logo-clean.webp";

const SERIF_ITALIC =
  "font-['Instrument_Serif',ui-serif,Georgia,serif] italic font-normal";
const ACCENT = "#9a2640";
const ACCENT_DEEP = "#5c1622";

const ANLAESSE = [
  { to: "/hochzeit", label: "Hochzeit", sub: "Drei Akte Magie" },
  { to: "/firmenfeiern", label: "Firmenfeier", sub: "Vorstand, Kunden, Team" },
  { to: "/geburtstage", label: "Geburtstag · Jubiläum", sub: "Persönliche Magie" },
  { to: "/event-agenturen", label: "Event-Agenturen", sub: "Schnellangebot · White-Label" },
  { to: "/messe-magier", label: "Messe · Roadshow", sub: "Lead-Generator am Stand" },
];

const KONZEPTE = [
  { to: "/buehnenshow", label: "Bühnenshow", sub: "Für alle gleichzeitig" },
  { to: "/close-up", label: "Close-Up", sub: "Direkt am Tisch" },
  { to: "/magic-dinner", label: "Magic Dinner", sub: "Tisch + Bühne" },
  { to: "/comedy-zauberei", label: "Comedy & Zauberei", sub: "Lachen + Staunen" },
  { to: "/moderation", label: "Moderation", sub: "Durch den Abend" },
];

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [location]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (mobileOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [mobileOpen]);

  const desktopLinkCls = scrolled
    ? "font-sans text-[13px] font-medium text-foreground/70 hover:text-foreground transition-colors duration-200"
    : "font-sans text-[13px] font-medium text-white hover:text-white/90 transition-colors duration-200 [text-shadow:0_1px_4px_rgba(0,0,0,0.5)]";

  const logoTextCls = scrolled
    ? "font-display font-black text-foreground text-lg hidden sm:inline tracking-tight"
    : "font-display font-black text-white text-lg hidden sm:inline tracking-tight [text-shadow:0_1px_6px_rgba(0,0,0,0.6)]";

  const logoImgCls = scrolled
    ? "h-7 w-auto transition-all duration-500"
    : "h-7 w-auto brightness-0 invert transition-all duration-500 drop-shadow-md";

  const DropdownItem = ({
    to,
    label,
    sub,
  }: {
    to: string;
    label: string;
    sub: string;
  }) => (
    <Link
      to={to}
      className="group/item relative block px-4 py-3.5 rounded-xl hover:bg-[var(--accent-bg)] transition-all duration-300 overflow-hidden"
      style={{ ["--accent-bg" as never]: "rgba(154,38,64,0.06)" }}
    >
      {/* Hover-Akzent left border */}
      <span
        aria-hidden
        className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full transition-all duration-300 group-hover/item:w-1"
        style={{
          background: `linear-gradient(180deg, ${ACCENT_DEEP}, ${ACCENT})`,
          opacity: 0,
          transform: "scaleY(0.4)",
        }}
      />
      <style>{`
        .group\\/item:hover > span[aria-hidden] { opacity: 1 !important; transform: scaleY(1) !important; }
      `}</style>
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <span
            className="block text-sm font-medium text-foreground transition-colors group-hover/item:text-[var(--accent)]"
            style={{ ["--accent" as never]: ACCENT }}
          >
            {label}
          </span>
          <span className={`block ${SERIF_ITALIC} text-xs text-foreground/55 mt-0.5`}>
            {sub}
          </span>
        </div>
        <ArrowRight
          className="w-3.5 h-3.5 opacity-0 -translate-x-1 transition-all duration-300 group-hover/item:opacity-100 group-hover/item:translate-x-0"
          style={{ color: ACCENT }}
        />
      </div>
    </Link>
  );

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/98 backdrop-blur-xl border-b border-foreground/10 py-3 shadow-[0_8px_24px_-16px_rgba(0,0,0,0.12)]"
            : "bg-gradient-to-b from-black/50 via-black/20 to-transparent py-4"
        }`}
      >
        <div className="container flex items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2.5 min-w-0">
            <img src={logoImg} alt="Emilian Leber" className={logoImgCls} />
            <span className={logoTextCls}>Emilian Leber</span>
          </Link>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-7">
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("anlaesse")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className={`${desktopLinkCls} flex items-center gap-1`}>
                Anlässe <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === "anlaesse" ? "rotate-180" : ""}`} />
              </button>

              {activeDropdown === "anlaesse" && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3">
                  <div
                    className="bg-white rounded-2xl border border-foreground/10 shadow-[0_40px_80px_-20px_rgba(40,20,40,0.3)] p-3 min-w-[260px] animate-fade-up"
                    style={{ animationDuration: "0.25s" }}
                  >
                    {ANLAESSE.map((item) => (
                      <DropdownItem key={item.to} {...item} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("konzepte")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className={`${desktopLinkCls} flex items-center gap-1`}>
                Konzepte <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === "konzepte" ? "rotate-180" : ""}`} />
              </button>

              {activeDropdown === "konzepte" && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3">
                  <div
                    className="bg-white rounded-2xl border border-foreground/10 shadow-[0_40px_80px_-20px_rgba(40,20,40,0.3)] p-3 min-w-[260px] animate-fade-up"
                    style={{ animationDuration: "0.25s" }}
                  >
                    {KONZEPTE.map((item) => (
                      <DropdownItem key={item.to} {...item} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link to="/ueber-mich" className={desktopLinkCls}>
              Über mich
            </Link>
            <Link to="/referenzen" className={desktopLinkCls}>
              Referenzen
            </Link>
            <Link to="/tickets" className={desktopLinkCls}>
              Tickets
            </Link>
            <Link to="/blog" className={desktopLinkCls}>
              Magazin
            </Link>

            <Link
              to="/buchung"
              className="group inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-[12px] tracking-[0.08em] font-semibold uppercase text-white transition-all hover:scale-[1.03] active:scale-[0.97]"
              style={{
                background: `linear-gradient(135deg, ${ACCENT_DEEP}, ${ACCENT})`,
                boxShadow: scrolled
                  ? "0 10px 25px -8px rgba(154,38,64,0.4)"
                  : "0 10px 30px -6px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.1) inset",
              }}
            >
              Anfragen
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors ${
              scrolled ? "text-foreground" : "text-white"
            }`}
            aria-label="Menü"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-[60] bg-white overflow-y-auto animate-fade-up" style={{ animationDuration: "0.3s" }}>
          {/* Mobile Top Bar */}
          <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-xl border-b border-foreground/8 px-6 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5">
              <img src={logoImg} alt="Emilian Leber" className="h-7 w-auto" />
              <span className="font-display font-black text-foreground text-lg tracking-tight">
                Emilian Leber
              </span>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="w-11 h-11 rounded-full flex items-center justify-center bg-foreground/[0.04] hover:bg-foreground/[0.08] transition-colors"
              aria-label="Menü schließen"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>
          </div>

          {/* Mobile Body */}
          <div className="px-6 py-8 pb-20">
            {/* Trust strip */}
            <div className="flex items-center gap-4 mb-10 pb-7 border-b border-foreground/10">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div>
                <p className="font-display font-bold text-foreground text-sm leading-tight">
                  5,0 · 30+ Bewertungen
                </p>
                <p className={`${SERIF_ITALIC} text-xs text-foreground/55`}>
                  Antwort innerhalb 24 h
                </p>
              </div>
            </div>

            {/* Anlässe Section */}
            <div className="mb-10">
              <p className={`${SERIF_ITALIC} text-base text-foreground/55 mb-4 px-1`}>
                Anlässe.
              </p>
              <div className="grid gap-2">
                {ANLAESSE.map((item, i) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="group relative flex items-center justify-between px-4 py-4 rounded-2xl bg-foreground/[0.03] border border-foreground/8 transition-all duration-300 hover:bg-foreground/[0.06] hover:border-foreground/15 hover:-translate-y-0.5 hover:shadow-[0_15px_30px_-15px_rgba(0,0,0,0.15)]"
                    style={{ animationDelay: `${i * 0.04}s` }}
                  >
                    <div>
                      <p className="font-display font-bold text-foreground text-base leading-tight">
                        {item.label}
                      </p>
                      <p className={`${SERIF_ITALIC} text-sm text-foreground/55 mt-0.5`}>
                        {item.sub}
                      </p>
                    </div>
                    <ArrowRight
                      className="w-4 h-4 transition-all group-hover:translate-x-1"
                      style={{ color: ACCENT }}
                    />
                  </Link>
                ))}
              </div>
            </div>

            {/* Konzepte Section */}
            <div className="mb-10">
              <p className={`${SERIF_ITALIC} text-base text-foreground/55 mb-4 px-1`}>
                Konzepte.
              </p>
              <div className="grid gap-2">
                {KONZEPTE.map((item, i) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="group relative flex items-center justify-between px-4 py-4 rounded-2xl bg-foreground/[0.03] border border-foreground/8 transition-all duration-300 hover:bg-foreground/[0.06] hover:border-foreground/15 hover:-translate-y-0.5 hover:shadow-[0_15px_30px_-15px_rgba(0,0,0,0.15)]"
                    style={{ animationDelay: `${i * 0.04}s` }}
                  >
                    <div>
                      <p className="font-display font-bold text-foreground text-base leading-tight">
                        {item.label}
                      </p>
                      <p className={`${SERIF_ITALIC} text-sm text-foreground/55 mt-0.5`}>
                        {item.sub}
                      </p>
                    </div>
                    <ArrowRight
                      className="w-4 h-4 transition-all group-hover:translate-x-1"
                      style={{ color: ACCENT }}
                    />
                  </Link>
                ))}
              </div>
            </div>

            {/* Mehr Section */}
            <div className="mb-10">
              <p className={`${SERIF_ITALIC} text-base text-foreground/55 mb-4 px-1`}>
                Mehr.
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { to: "/ueber-mich", label: "Über mich" },
                  { to: "/referenzen", label: "Referenzen" },
                  { to: "/tickets", label: "Tickets" },
                  { to: "/blog", label: "Magazin" },
                  { to: "/faq", label: "FAQ" },
                  { to: "/kontakt", label: "Kontakt" },
                ].map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="px-4 py-3 rounded-xl text-sm font-medium text-foreground/75 bg-foreground/[0.02] hover:bg-foreground/[0.06] hover:text-foreground transition-colors text-center"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Big CTA */}
            <div className="space-y-3">
              <Link
                to="/buchung"
                className="group inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-4 text-[13px] tracking-[0.08em] font-semibold uppercase text-white w-full transition-all hover:scale-[1.02]"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT_DEEP}, ${ACCENT})`,
                  boxShadow: "0 18px 40px -10px rgba(154,38,64,0.5)",
                }}
              >
                Jetzt anfragen
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <a
                href="tel:+4915563744696"
                className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-[13px] tracking-[0.08em] font-semibold uppercase text-foreground w-full border border-foreground/15 hover:bg-foreground/[0.04] transition-colors"
              >
                Direkt anrufen
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* Bottom Info */}
            <div className="mt-10 pt-7 border-t border-foreground/10 grid grid-cols-2 gap-4 text-center">
              <div>
                <p className={`${SERIF_ITALIC} text-sm text-foreground/55 mb-0.5`}>
                  Standort
                </p>
                <p className="font-display font-bold text-foreground text-sm">
                  Bayern · DE
                </p>
              </div>
              <div>
                <p className={`${SERIF_ITALIC} text-sm text-foreground/55 mb-0.5`}>
                  Erfahrung
                </p>
                <p className="font-display font-bold text-foreground text-sm">
                  200+ Events seit 2016
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
