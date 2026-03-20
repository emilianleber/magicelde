import { Instagram, Youtube, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="section-dark py-16">
      <div className="container px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <p className="font-display text-2xl font-bold mb-4" style={{ color: "hsl(var(--section-dark-foreground))" }}>
              Magic<span className="text-primary">EL</span>
            </p>
            <p className="font-sans text-sm leading-relaxed" style={{ color: "hsla(0,0%,100%,0.55)" }}>
              Emilian Leber — Moderner Zauberer für Events, Firmenfeiern, Hochzeiten und mehr.
            </p>
          </div>
          <div>
            <p className="font-sans text-sm font-semibold uppercase tracking-[0.15em] mb-4" style={{ color: "hsl(var(--section-dark-foreground))" }}>
              Kontakt
            </p>
            <div className="space-y-3">
              <a href="mailto:kontakt@magicel.de" className="flex items-center gap-3 font-sans text-sm hover:text-primary transition-colors" style={{ color: "hsla(0,0%,100%,0.65)" }}>
                <Mail className="w-4 h-4" /> kontakt@magicel.de
              </a>
              <a href="tel:+4917612345678" className="flex items-center gap-3 font-sans text-sm hover:text-primary transition-colors" style={{ color: "hsla(0,0%,100%,0.65)" }}>
                <Phone className="w-4 h-4" /> +49 176 1234 5678
              </a>
            </div>
          </div>
          <div>
            <p className="font-sans text-sm font-semibold uppercase tracking-[0.15em] mb-4" style={{ color: "hsl(var(--section-dark-foreground))" }}>
              Social Media
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com/magicel" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:bg-[hsla(0,0%,100%,0.15)] transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" style={{ color: "hsl(var(--section-dark-foreground))" }} />
              </a>
              <a href="https://youtube.com/@magicel" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:bg-[hsla(0,0%,100%,0.15)] transition-colors" aria-label="YouTube">
                <Youtube className="w-5 h-5" style={{ color: "hsl(var(--section-dark-foreground))" }} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t pt-8" style={{ borderColor: "hsla(0,0%,100%,0.1)" }}>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="font-sans text-xs" style={{ color: "hsla(0,0%,100%,0.4)" }}>
              © {new Date().getFullYear()} MagicEL — Emilian Leber. Alle Rechte vorbehalten.
            </p>
            <div className="flex gap-6">
              <a href="#" className="font-sans text-xs hover:text-primary transition-colors" style={{ color: "hsla(0,0%,100%,0.4)" }}>Impressum</a>
              <a href="#" className="font-sans text-xs hover:text-primary transition-colors" style={{ color: "hsla(0,0%,100%,0.4)" }}>Datenschutz</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
