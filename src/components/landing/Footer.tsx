import { Link } from "react-router-dom";
import { staedte } from "@/data/staedte";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-16">
      <div className="container px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2 md:col-span-1">
            <p className="font-display text-lg italic text-foreground mb-2">MagicEL</p>
            <p className="text-detail">
              Emilian Leber — Moderner Zauberer für unvergessliche Events.
            </p>
          </div>

          <div className="space-y-3">
            <p className="font-sans text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/50 mb-4">Anlässe</p>
            <Link to="/hochzeit" className="block font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">Hochzeiten</Link>
            <Link to="/firmenfeiern" className="block font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">Firmenfeiern</Link>
            <Link to="/geburtstage" className="block font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">Geburtstage</Link>
          </div>

          <div className="space-y-3">
            <p className="font-sans text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/50 mb-4">Konzepte</p>
            <Link to="/buehnenshow" className="block font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">Bühnenshow</Link>
            <Link to="/close-up" className="block font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">Close-Up</Link>
            <Link to="/magic-dinner" className="block font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">Magic Dinner</Link>
          </div>

          <div className="space-y-3">
            <p className="font-sans text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/50 mb-4">Mehr</p>
            <Link to="/ueber-mich" className="block font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">Über mich</Link>
            <Link to="/referenzen" className="block font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">Referenzen</Link>
            <Link to="/faq" className="block font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">FAQ</Link>
            <Link to="/presse" className="block font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">Presse</Link>
            <Link to="/kontakt" className="block font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">Kontakt</Link>
          </div>
        </div>

        {/* SEO city links */}
        <div className="border-t border-border/50 pt-8 mb-8">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/50 mb-4">Zauberer in deiner Stadt</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {staedte.slice(0, 12).map((s) => (
              <Link key={s.slug} to={`/zauberer/${s.slug}`} className="font-sans text-xs text-muted-foreground/60 hover:text-foreground transition-colors">
                {s.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="border-t border-border/50 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-sans text-xs text-muted-foreground/60">
            © {new Date().getFullYear()} MagicEL — Emilian Leber
          </p>
          <div className="flex gap-6">
            <a href="https://instagram.com/magicel" target="_blank" rel="noopener noreferrer" className="font-sans text-xs text-muted-foreground/60 hover:text-foreground transition-colors">Instagram</a>
            <a href="https://youtube.com/@magicel" target="_blank" rel="noopener noreferrer" className="font-sans text-xs text-muted-foreground/60 hover:text-foreground transition-colors">YouTube</a>
            <a href="#" className="font-sans text-xs text-muted-foreground/60 hover:text-foreground transition-colors">Impressum</a>
            <a href="#" className="font-sans text-xs text-muted-foreground/60 hover:text-foreground transition-colors">Datenschutz</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
