import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-16">
      <div className="container px-6">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
          <div className="max-w-xs">
            <p className="font-display text-lg italic text-foreground mb-2">MagicEL</p>
            <p className="text-detail">
              Emilian Leber — Moderner Zauberer für unvergessliche Events.
            </p>
          </div>
          <div className="flex flex-wrap gap-12">
            <div className="space-y-3">
              <Link to="/hochzeit" className="block font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">Hochzeiten</Link>
              <Link to="/firmenfeiern" className="block font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">Firmenfeiern</Link>
              <a href="/#ueber-mich" className="block font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">Über mich</a>
            </div>
            <div className="space-y-3">
              <a href="mailto:kontakt@magicel.de" className="block font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">kontakt@magicel.de</a>
              <a href="https://instagram.com/magicel" target="_blank" rel="noopener noreferrer" className="block font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">Instagram</a>
              <a href="https://youtube.com/@magicel" target="_blank" rel="noopener noreferrer" className="block font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">YouTube</a>
            </div>
          </div>
        </div>
        <div className="border-t border-border/50 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-sans text-xs text-muted-foreground/60">
            © {new Date().getFullYear()} MagicEL — Emilian Leber
          </p>
          <div className="flex gap-6">
            <a href="#" className="font-sans text-xs text-muted-foreground/60 hover:text-foreground transition-colors">Impressum</a>
            <a href="#" className="font-sans text-xs text-muted-foreground/60 hover:text-foreground transition-colors">Datenschutz</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
