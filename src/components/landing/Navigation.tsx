import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Showkonzepte", href: "/#showkonzepte" },
  { label: "Hochzeiten", href: "/hochzeit" },
  { label: "Firmenfeiern", href: "/firmenfeiern" },
  { label: "Über mich", href: "/#ueber-mich" },
  { label: "Referenzen", href: "/#referenzen" },
];

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const showDark = scrolled || !isHome;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl shadow-[0_1px_0_hsl(var(--border))] py-3"
          : "py-5"
      }`}
    >
      <div className="container flex items-center justify-between px-6">
        <Link to="/" className="font-display text-2xl italic" style={{ color: showDark ? "hsl(var(--foreground))" : "white" }}>
          Magic<span className="text-primary">EL</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isAnchor = item.href.startsWith("/#");
            if (isAnchor) {
              return (
                <a
                  key={item.href}
                  href={isHome ? item.href.replace("/", "") : item.href}
                  className="font-sans text-[13px] font-medium tracking-wide transition-colors duration-200 hover:text-primary"
                  style={{ color: showDark ? "hsl(var(--muted-foreground))" : "hsla(0,0%,100%,0.8)" }}
                >
                  {item.label}
                </a>
              );
            }
            return (
              <Link
                key={item.href}
                to={item.href}
                className="font-sans text-[13px] font-medium tracking-wide transition-colors duration-200 hover:text-primary"
                style={{ color: showDark ? "hsl(var(--muted-foreground))" : "hsla(0,0%,100%,0.8)" }}
              >
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
          className="md:hidden p-2"
          style={{ color: showDark ? "hsl(var(--foreground))" : "white" }}
          aria-label="Menü"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-t border-border mt-2 mx-4 rounded-2xl shadow-[0_8px_32px_hsla(0,0%,0%,0.08)] p-6 flex flex-col gap-4 animate-fade-up">
          {navItems.map((item) => {
            const isAnchor = item.href.startsWith("/#");
            if (isAnchor) {
              return (
                <a
                  key={item.href}
                  href={isHome ? item.href.replace("/", "") : item.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-sans text-sm font-medium text-foreground"
                >
                  {item.label}
                </a>
              );
            }
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className="font-sans text-sm font-medium text-foreground"
              >
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
