import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logoImg from "@/assets/logo-clean.webp";

const SERIF_ITALIC =
  "font-['Instrument_Serif',ui-serif,Georgia,serif] italic font-normal";
const ACCENT = "#9a2640";
const ACCENT_DEEP = "#5c1622";

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

  const desktopLinkCls = scrolled
    ? "font-sans text-[13px] font-medium text-foreground/70 hover:text-foreground transition-colors duration-200"
    : "font-sans text-[13px] font-medium text-white hover:text-white transition-colors duration-200 [text-shadow:0_1px_4px_rgba(0,0,0,0.5)]";

  const logoTextCls = scrolled
    ? "font-display font-black text-foreground text-lg hidden sm:inline tracking-tight"
    : "font-display font-black text-white text-lg hidden sm:inline tracking-tight [text-shadow:0_1px_6px_rgba(0,0,0,0.6)]";

  const logoImgCls = scrolled
    ? "h-7 w-auto transition-all duration-500"
    : "h-7 w-auto brightness-0 invert transition-all duration-500 drop-shadow-md";

  const mobilePanelCls =
    "lg:hidden bg-white/95 backdrop-blur-2xl border border-foreground/10 mt-2 mx-3 rounded-2xl p-4 pt-[env(safe-area-inset-top)] flex flex-col gap-0.5 animate-fade-up shadow-[0_30px_70px_-20px_rgba(40,20,40,0.25)] max-h-[78vh] overflow-y-auto";

  const mobileLinkCls =
    "px-3 py-3 font-sans text-sm text-foreground rounded-xl hover:bg-foreground/5 transition-colors";

  const mobileHeadingCls = `${SERIF_ITALIC} text-base text-foreground/45 px-3 pt-1 pb-1.5`;

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
      className="block px-4 py-3 rounded-xl hover:bg-foreground/[0.04] transition-colors group"
    >
      <span
        className="block text-sm font-medium text-foreground transition-colors group-hover:text-[var(--accent)]"
        style={{ ["--accent" as never]: ACCENT }}
      >
        {label}
      </span>
      <span className={`block ${SERIF_ITALIC} text-xs text-foreground/55 mt-0.5`}>
        {sub}
      </span>
    </Link>
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/85 backdrop-blur-2xl border-b border-foreground/8 py-3"
          : "bg-gradient-to-b from-black/45 via-black/15 to-transparent py-4"
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
              Anlässe <ChevronDown className="w-3 h-3" />
            </button>

            {activeDropdown === "anlaesse" && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3">
                <div
                  className="bg-white/97 backdrop-blur-2xl rounded-2xl border border-foreground/10 shadow-[0_30px_70px_-20px_rgba(40,20,40,0.3)] p-3 min-w-[240px] animate-fade-up"
                  style={{ animationDuration: "0.25s" }}
                >
                  <DropdownItem to="/hochzeit" label="Hochzeit" sub="Drei Akte Magie" />
                  <DropdownItem to="/firmenfeiern" label="Firmenfeier" sub="Vorstand, Kunden, Team" />
                  <DropdownItem to="/geburtstage" label="Geburtstag · Jubiläum" sub="Persönliche Magie" />
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
              Konzepte <ChevronDown className="w-3 h-3" />
            </button>

            {activeDropdown === "konzepte" && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3">
                <div
                  className="bg-white/97 backdrop-blur-2xl rounded-2xl border border-foreground/10 shadow-[0_30px_70px_-20px_rgba(40,20,40,0.3)] p-3 min-w-[240px] animate-fade-up"
                  style={{ animationDuration: "0.25s" }}
                >
                  <DropdownItem to="/buehnenshow" label="Bühnenshow" sub="Für alle gleichzeitig" />
                  <DropdownItem to="/close-up" label="Close-Up" sub="Direkt am Tisch" />
                  <DropdownItem to="/magic-dinner" label="Magic Dinner" sub="Tisch + Bühne" />
                  <DropdownItem to="/comedy-zauberei" label="Comedy & Zauberei" sub="Lachen + Staunen" />
                  <DropdownItem to="/moderation" label="Moderation" sub="Durch den Abend" />
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

      {mobileOpen && (
        <div className={mobilePanelCls}>
          <p className={mobileHeadingCls}>Anlässe.</p>
          <Link to="/hochzeit" className={mobileLinkCls}>
            Hochzeit
          </Link>
          <Link to="/firmenfeiern" className={mobileLinkCls}>
            Firmenfeier
          </Link>
          <Link to="/geburtstage" className={mobileLinkCls}>
            Geburtstag · Jubiläum
          </Link>

          <p className={`${mobileHeadingCls} pt-3`}>Konzepte.</p>
          <Link to="/buehnenshow" className={mobileLinkCls}>
            Bühnenshow
          </Link>
          <Link to="/close-up" className={mobileLinkCls}>
            Close-Up
          </Link>
          <Link to="/magic-dinner" className={mobileLinkCls}>
            Magic Dinner
          </Link>
          <Link to="/comedy-zauberei" className={mobileLinkCls}>
            Comedy & Zauberei
          </Link>
          <Link to="/moderation" className={mobileLinkCls}>
            Moderation
          </Link>

          <div className="border-t border-foreground/10 my-2.5" />

          <Link to="/ueber-mich" className={mobileLinkCls}>
            Über mich
          </Link>
          <Link to="/referenzen" className={mobileLinkCls}>
            Referenzen
          </Link>
          <Link to="/tickets" className={mobileLinkCls}>
            Tickets
          </Link>
          <Link to="/blog" className={mobileLinkCls}>
            Magazin
          </Link>
          <Link to="/faq" className={mobileLinkCls}>
            FAQ
          </Link>
          <Link to="/kontakt" className={mobileLinkCls}>
            Kontakt
          </Link>

          <Link
            to="/buchung"
            className="mt-3 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[12px] tracking-[0.08em] font-semibold uppercase text-white"
            style={{
              background: `linear-gradient(135deg, ${ACCENT_DEEP}, ${ACCENT})`,
              boxShadow: "0 12px 28px -8px rgba(154,38,64,0.5)",
            }}
          >
            Jetzt anfragen
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
