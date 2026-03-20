import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Showkonzepte", href: "#showkonzepte" },
  { label: "Anlässe", href: "#anlaesse" },
  { label: "Über mich", href: "#ueber-mich" },
  { label: "Referenzen", href: "#referenzen" },
];

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-light shadow-[0_2px_24px_hsla(0,0%,0%,0.08)] py-3"
          : "py-5"
      }`}
    >
      <div className="container flex items-center justify-between px-6">
        <a href="#" className="font-display text-xl font-bold" style={{ color: scrolled ? "hsl(var(--foreground))" : "hsl(var(--primary-foreground))" }}>
          Magic<span className="text-primary">EL</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-sans text-sm font-medium transition-colors duration-200 hover:text-primary"
              style={{ color: scrolled ? "hsl(var(--foreground))" : "hsla(0,0%,100%,0.85)" }}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#kontakt"
            className="inline-flex items-center px-5 py-2.5 rounded-lg bg-primary font-sans text-sm font-semibold text-primary-foreground transition-all duration-200 hover:shadow-[0_4px_16px_hsla(0,97%,27%,0.35)] active:scale-[0.97]"
          >
            Anfragen
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2"
          style={{ color: scrolled ? "hsl(var(--foreground))" : "hsl(var(--primary-foreground))" }}
          aria-label="Menü"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass-light mt-2 mx-4 rounded-xl p-6 flex flex-col gap-4 animate-fade-up">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="font-sans text-base font-medium text-foreground"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#kontakt"
            onClick={() => setMobileOpen(false)}
            className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-primary font-sans text-sm font-semibold text-primary-foreground"
          >
            Anfragen
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
