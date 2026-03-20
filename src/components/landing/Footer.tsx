import { Instagram, Youtube, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border py-16">
      <div className="container px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <Link to="/" className="font-display text-2xl italic text-foreground">
              Magic<span className="text-primary">EL</span>
            </Link>
            <p className="font-sans text-sm text-muted-foreground leading-relaxed mt-4">
              Emilian Leber — Moderner Zauberer für Events, Firmenfeiern, Hochzeiten und mehr.
            </p>
          </div>
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-foreground mb-4">
              Seiten
            </p>
            <div className="space-y-3">
              <Link to="/hochzeit" className="block font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">Hochzeiten</Link>
              <Link to="/firmenfeiern" className="block font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">Firmenfeiern</Link>
              <a href="/#ueber-mich" className="block font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">Über mich</a>
              <a href="/#referenzen" className="block font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">Referenzen</a>
            </div>
          </div>
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-foreground mb-4">
              Kontakt
            </p>
            <div className="space-y-3">
              <a href="mailto:kontakt@magicel.de" className="flex items-center gap-3 font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="w-4 h-4" /> kontakt@magicel.de
              </a>
              <a href="tel:+4917612345678" className="flex items-center gap-3 font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Phone className="w-4 h-4" /> +49 176 1234 5678
              </a>
            </div>
          </div>
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-foreground mb-4">
              Social Media
            </p>
            <div className="flex gap-3">
              <a href="https://instagram.com/magicel" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted-foreground/10 transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4 text-foreground" />
              </a>
              <a href="https://youtube.com/@magicel" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted-foreground/10 transition-colors" aria-label="YouTube">
                <Youtube className="w-4 h-4 text-foreground" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-border pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="font-sans text-xs text-muted-foreground">
              © {new Date().getFullYear()} MagicEL — Emilian Leber. Alle Rechte vorbehalten.
            </p>
            <div className="flex gap-6">
              <a href="#" className="font-sans text-xs text-muted-foreground hover:text-foreground transition-colors">Impressum</a>
              <a href="#" className="font-sans text-xs text-muted-foreground hover:text-foreground transition-colors">Datenschutz</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
