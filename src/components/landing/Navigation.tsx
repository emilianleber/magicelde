import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logoImg from "@/assets/logo-clean.webp";

const navItems = [
  { label: "Showkonzepte", href: "/#showkonzepte" },
  { label: "Hochzeiten", href: "/hochzeit" },
  { label: "Firmenfeiern", href: "/firmenfeiern" },
  { label: "Über mich", href: "/#ueber-mich" },
];

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isAnchor = item.href.startsWith("/#");
            const cls = "font-sans text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors duration-200";
            if (isAnchor) {
              return (
                <a key={item.href} href={isHome ? item.href.replace("/", "") : item.href} className={cls}>
                  {item.label}
                </a>
              );
            }
            return (
              <Link key={item.href} to={item.href} className={cls}>
                {item.label}
              </Link>
            );
          })}
          <a
            href={isHome ? "#kontakt" : "/#kontakt"}
            className="inline-flex items-center px-5 py-2 rounded-full bg-foreground font-sans text-[13px] font-medium text-background transition-all duration-200 hover:bg-foreground/85 active:scale-[0.97]"
          >
            Anfragen
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-foreground"
          aria-label="Menü"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-2xl border-t border-border/50 mt-1 mx-4 rounded-2xl p-6 flex flex-col gap-4 animate-fade-up">
          {navItems.map((item) => {
            const isAnchor = item.href.startsWith("/#");
            if (isAnchor) {
              return (
                <a key={item.href} href={isHome ? item.href.replace("/", "") : item.href} onClick={() => setMobileOpen(false)} className="font-sans text-sm text-foreground">
                  {item.label}
                </a>
              );
            }
            return (
              <Link key={item.href} to={item.href} onClick={() => setMobileOpen(false)} className="font-sans text-sm text-foreground">
                {item.label}
              </Link>
            );
          })}
          <a
            href={isHome ? "#kontakt" : "/#kontakt"}
            onClick={() => setMobileOpen(false)}
            className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-foreground font-sans text-sm font-medium text-background"
          >
            Anfragen
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
