import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logoImg from "@/assets/logo-clean.webp";

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
    ? "font-sans text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
    : "font-sans text-[13px] font-medium text-white/88 hover:text-white transition-colors duration-200";

  const logoTextCls = scrolled
    ? "font-display font-black text-foreground text-lg hidden sm:inline tracking-tight"
    : "font-display font-black text-white text-lg hidden sm:inline tracking-tight drop-shadow-md";

  const mobilePanelCls =
    "lg:hidden bg-background/95 backdrop-blur-2xl border border-border/30 mt-2 mx-3 rounded-2xl p-4 flex flex-col gap-0.5 animate-fade-up shadow-xl max-h-[78vh] overflow-y-auto";

  const mobileLinkCls =
    "px-3 py-2 font-sans text-sm text-foreground rounded-xl hover:bg-muted/60 transition-colors";

  const mobileHeadingCls =
    "font-sans text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/40 px-3 pt-1 pb-1.5";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-2xl border-b border-border/50 py-3"
          : "bg-gradient-to-b from-black/45 via-black/15 to-transparent py-4"
      }`}
    >
      <div className="container flex items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5 min-w-0">
          <img src={logoImg} alt="Emilian Leber" className="h-7 w-auto" />
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
                  className="bg-background/95 backdrop-blur-2xl rounded-2xl border border-border/50 shadow-lg p-3 min-w-[220px] animate-fade-up"
                  style={{ animationDuration: "0.25s" }}
                >
                  {[
                    { to: "/hochzeit", label: "Hochzeiten", sub: "Magische Momente" },
                    { to: "/firmenfeiern", label: "Firmenfeiern", sub: "Business Entertainment" },
                    { to: "/geburtstage", label: "Geburtstage", sub: "Unvergessliche Feiern" },
                  ].map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="block px-4 py-3 rounded-xl hover:bg-muted/60 transition-colors group"
                    >
                      <span className="block text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                        {item.label}
                      </span>
                      <span className="block text-xs text-muted-foreground mt-0.5">
                        {item.sub}
                      </span>
                    </Link>
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
              Konzepte <ChevronDown className="w-3 h-3" />
            </button>

            {activeDropdown === "konzepte" && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3">
                <div
                  className="bg-background/95 backdrop-blur-2xl rounded-2xl border border-border/50 shadow-lg p-3 min-w-[220px] animate-fade-up"
                  style={{ animationDuration: "0.25s" }}
                >
                  {[
                    { to: "/buehnenshow", label: "Bühnenshow", sub: "Das große Erlebnis" },
                    { to: "/close-up", label: "Close-Up Magie", sub: "Hautnah & interaktiv" },
                    { to: "/magic-dinner", label: "Magic Dinner", sub: "Genuss trifft Staunen" },
                    { to: "/moderation", label: "Moderation", sub: "Charme & Bühnenpräsenz" },
                  ].map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="block px-4 py-3 rounded-xl hover:bg-muted/60 transition-colors group"
                    >
                      <span className="block text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                        {item.label}
                      </span>
                      <span className="block text-xs text-muted-foreground mt-0.5">
                        {item.sub}
                      </span>
                    </Link>
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
          <Link to="/kundenportal/login" className={desktopLinkCls}>
            Kundenportal
          </Link>

          <Link to="/buchung" className="btn-primary !px-6 !py-2.5 !text-[13px]">
            Anfragen
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`lg:hidden p-2 transition-colors ${
            scrolled ? "text-foreground" : "text-white"
          }`}
          aria-label="Menü"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className={mobilePanelCls}>
          <p className={mobileHeadingCls}>Anlässe</p>
          <Link to="/hochzeit" className={mobileLinkCls}>
            Hochzeiten
          </Link>
          <Link to="/firmenfeiern" className={mobileLinkCls}>
            Firmenfeiern
          </Link>
          <Link to="/geburtstage" className={mobileLinkCls}>
            Geburtstage
          </Link>

          <p className={mobileHeadingCls + " pt-3"}>Konzepte</p>
          <Link to="/buehnenshow" className={mobileLinkCls}>
            Bühnenshow
          </Link>
          <Link to="/close-up" className={mobileLinkCls}>
            Close-Up Magie
          </Link>
          <Link to="/magic-dinner" className={mobileLinkCls}>
            Magic Dinner
          </Link>
          <Link to="/moderation" className={mobileLinkCls}>
            Moderation
          </Link>

          <div className="border-t border-border/30 my-2.5" />

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
          <Link to="/kundenportal/login" className={mobileLinkCls}>
            Kundenportal
          </Link>

          <Link to="/buchung" className="btn-primary justify-center mt-3">
            Jetzt anfragen
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navigation;