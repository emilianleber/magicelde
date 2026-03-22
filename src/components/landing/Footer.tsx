import { Link } from "react-router-dom";
import { staedte } from "@/data/staedte";
import logoImg from "@/assets/logo-clean.webp";

const Footer = () => (
  <footer className="border-t border-border/50 pt-20 pb-12">
    <div className="container px-6">
      <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
        <div className="max-w-sm">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <img src={logoImg} alt="MagicEL" className="h-6 w-auto" />
            <span className="font-display font-bold text-foreground text-lg">MagicEL</span>
          </Link>
          <p className="text-detail mb-6">
            Moderner Comedy-Zauberer für Firmenfeiern, Hochzeiten, Galas und private Events.
            Staunen. Lachen. Erinnern.
          </p>
          <div className="flex gap-4">
  {[
    { href: "https://www.instagram.com/_magicel/", label: "Instagram" },
    { href: "https://www.youtube.com/channel/UCDm5lC0Dq3b8vhJpwRJcXCA", label: "YouTube" },
    { href: "https://de.linkedin.com/in/emilian-leber-3b3414369", label: "LinkedIn" },
    { href: "https://www.facebook.com/people/Emilian-Leber-Zauberer-Mentalist/61582946450467/", label: "Facebook" },
  ].map((s) => (
    <a
      key={s.label}
      href={s.href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-foreground hover:text-blue-500 transition"
    >
             {s.label}
      </a>
    ))}
  </div>
</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-12">
          <div className="space-y-3">
            <p className="font-display text-sm font-bold text-foreground mb-4">Anlässe</p>
            <Link to="/hochzeit" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Hochzeiten</Link>
            <Link to="/firmenfeiern" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Firmenfeiern</Link>
            <Link to="/geburtstage" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Geburtstage</Link>
          </div>
          <div className="space-y-3">
            <p className="font-display text-sm font-bold text-foreground mb-4">Konzepte</p>
            <Link to="/buehnenshow" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Bühnenshow</Link>
            <Link to="/close-up" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Close-Up</Link>
            <Link to="/magic-dinner" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Magic Dinner</Link>
            <Link to="/moderation" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Moderation</Link>
          </div>
          <div className="space-y-3">
            <p className="font-display text-sm font-bold text-foreground mb-4">Mehr</p>
            <Link to="/ueber-mich" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Über mich</Link>
            <Link to="/referenzen" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Referenzen</Link>
            <Link to="/blog" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Magazin</Link>
            <Link to="/tickets" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Tickets</Link>
            <Link to="/faq" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">FAQ</Link>
          </div>
          <div className="space-y-3">
            <p className="font-display text-sm font-bold text-foreground mb-4">Kontakt</p>
            <Link to="/kontakt" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Kontakt</Link>
            <Link to="/buchung" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Anfragen</Link>
            <Link to="/presse" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Presse</Link>
            <Link to="/kundenportal/login" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Kundenportal</Link>
          </div>
        </div>
      </div>

      {/* City links */}
      <div className="border-t border-border/50 pt-8 mb-8">
        <p className="font-display text-xs font-bold text-muted-foreground/40 uppercase tracking-widest mb-4">Zauberer in deiner Stadt</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1.5">
          {staedte.slice(0, 14).map((s) => (
            <Link key={s.slug} to={`/zauberer/${s.slug}`} className="text-xs text-muted-foreground/50 hover:text-accent transition-colors">
              {s.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-border/50 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-xs text-muted-foreground/50">
          © {new Date().getFullYear()} MagicEL — Emilian Leber. Alle Rechte vorbehalten.
        </p>
        <div className="flex gap-6">
          <Link to="/impressum" className="text-xs text-muted-foreground/50 hover:text-foreground transition-colors">Impressum</Link>
          <Link to="/datenschutz" className="text-xs text-muted-foreground/50 hover:text-foreground transition-colors">Datenschutz</Link>
          <Link to="/agb" className="text-xs text-muted-foreground/50 hover:text-foreground transition-colors">AGB</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
