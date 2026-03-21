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

  const linkCls = "font-sans text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors duration-200";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-2xl border-b border-border/50 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container flex items-center justify-between px-6">
        <Link to="/" className="flex items-center">
          <img src={logoImg} alt="MagicEL" className="h-7 w-auto" />
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-7">
          {/* Anlässe Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("anlaesse")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className={`${linkCls} flex items-center gap-1`}>
              Anlässe <ChevronDown className="w-3 h-3" />
            </button>
            {activeDropdown === "anlaesse" && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3">
                <div className="bg-white/95 backdrop-blur-2xl rounded-2xl border border-border/50 shadow-lg p-4 min-w-[180px] animate-fade-up" style={{ animationDuration: "0.2s" }}>
                  <Link to="/hochzeit" className="block px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">Hochzeiten</Link>
                  <Link to="/firmenfeiern" className="block px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">Firmenfeiern</Link>
                  <Link to="/geburtstage" className="block px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">Geburtstage</Link>
                </div>
              </div>
            )}
          </div>

          {/* Konzepte Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("konzepte")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className={`${linkCls} flex items-center gap-1`}>
              Konzepte <ChevronDown className="w-3 h-3" />
            </button>
            {activeDropdown === "konzepte" && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3">
                <div className="bg-white/95 backdrop-blur-2xl rounded-2xl border border-border/50 shadow-lg p-4 min-w-[180px] animate-fade-up" style={{ animationDuration: "0.2s" }}>
                  <Link to="/buehnenshow" className="block px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">Bühnenshow</Link>
                  <Link to="/close-up" className="block px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">Close-Up</Link>
                  <Link to="/magic-dinner" className="block px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">Magic Dinner</Link>
                </div>
              </div>
            )}
          </div>

          <Link to="/ueber-mich" className={linkCls}>Über mich</Link>
          <Link to="/referenzen" className={linkCls}>Referenzen</Link>

          <Link
            to="/buchung"
            className="inline-flex items-center px-5 py-2 rounded-full bg-foreground font-sans text-[13px] font-medium text-background transition-all duration-200 hover:bg-foreground/85 active:scale-[0.97]"
          >
            Anfragen
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-foreground"
          aria-label="Menü"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-2xl border-t border-border/50 mt-1 mx-4 rounded-2xl p-6 flex flex-col gap-1 animate-fade-up shadow-lg">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/50 px-3 pt-2 pb-1">Anlässe</p>
          <Link to="/hochzeit" className="px-3 py-2 font-sans text-sm text-foreground rounded-lg hover:bg-muted/50">Hochzeiten</Link>
          <Link to="/firmenfeiern" className="px-3 py-2 font-sans text-sm text-foreground rounded-lg hover:bg-muted/50">Firmenfeiern</Link>
          <Link to="/geburtstage" className="px-3 py-2 font-sans text-sm text-foreground rounded-lg hover:bg-muted/50">Geburtstage</Link>

          <p className="font-sans text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/50 px-3 pt-4 pb-1">Konzepte</p>
          <Link to="/buehnenshow" className="px-3 py-2 font-sans text-sm text-foreground rounded-lg hover:bg-muted/50">Bühnenshow</Link>
          <Link to="/close-up" className="px-3 py-2 font-sans text-sm text-foreground rounded-lg hover:bg-muted/50">Close-Up</Link>
          <Link to="/magic-dinner" className="px-3 py-2 font-sans text-sm text-foreground rounded-lg hover:bg-muted/50">Magic Dinner</Link>

          <div className="border-t border-border/50 my-3" />
          <Link to="/ueber-mich" className="px-3 py-2 font-sans text-sm text-foreground rounded-lg hover:bg-muted/50">Über mich</Link>
          <Link to="/referenzen" className="px-3 py-2 font-sans text-sm text-foreground rounded-lg hover:bg-muted/50">Referenzen</Link>
          <Link to="/faq" className="px-3 py-2 font-sans text-sm text-foreground rounded-lg hover:bg-muted/50">FAQ</Link>
          <Link to="/kontakt" className="px-3 py-2 font-sans text-sm text-foreground rounded-lg hover:bg-muted/50">Kontakt</Link>

          <Link
            to="/buchung"
            className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-foreground font-sans text-sm font-medium text-background mt-3"
          >
            Jetzt anfragen
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
