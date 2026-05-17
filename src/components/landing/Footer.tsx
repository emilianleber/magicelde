import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { staedte } from "@/data/staedte";
import logoImg from "@/assets/logo-clean.webp";

const SERIF_ITALIC =
  "font-['Instrument_Serif',ui-serif,Georgia,serif] italic font-normal";
const ACCENT = "#9a2640";

const FOOTER_COLS = [
  {
    heading: "Anlässe",
    items: [
      { to: "/hochzeit", label: "Hochzeit" },
      { to: "/firmenfeiern", label: "Firmenfeier" },
      { to: "/geburtstage", label: "Geburtstag · Jubiläum" },
    ],
  },
  {
    heading: "Konzepte",
    items: [
      { to: "/buehnenshow", label: "Bühnenshow" },
      { to: "/close-up", label: "Close-Up" },
      { to: "/magic-dinner", label: "Magic Dinner" },
      { to: "/comedy-zauberei", label: "Comedy & Zauberei" },
      { to: "/moderation", label: "Moderation" },
    ],
  },
  {
    heading: "Mehr",
    items: [
      { to: "/ueber-mich", label: "Über mich" },
      { to: "/referenzen", label: "Referenzen" },
      { to: "/blog", label: "Magazin" },
      { to: "/tickets", label: "Tickets" },
      { to: "/faq", label: "FAQ" },
    ],
  },
  {
    heading: "Kontakt",
    items: [
      { to: "/kontakt", label: "Kontakt" },
      { to: "/buchung", label: "Anfragen" },
      { to: "/presse", label: "Presse" },
      { to: "/kundenportal/login", label: "Kundenportal" },
    ],
  },
];

const SOCIALS = [
  { href: "https://www.instagram.com/_magicel/", label: "Instagram" },
  { href: "https://www.youtube.com/channel/UCDm5lC0Dq3b8vhJpwRJcXCA", label: "YouTube" },
  { href: "https://de.linkedin.com/in/emilian-leber-3b3414369", label: "LinkedIn" },
  { href: "https://www.facebook.com/people/Emilian-Leber-Zauberer-Mentalist/61582946450467/", label: "Facebook" },
];

const Footer = () => (
  <footer className="relative bg-[hsl(36,30%,97%)] border-t border-foreground/10 pt-20 md:pt-28 pb-12 mt-20 md:mt-28">
    <div className="container px-6">
      <div className="grid lg:grid-cols-12 gap-x-12 gap-y-14 mb-16 md:mb-20">
        {/* Brand block */}
        <div className="lg:col-span-4 max-w-sm">
          <Link to="/" className="flex items-center gap-2.5 mb-6">
            <img src={logoImg} alt="Emilian Leber" className="h-7 w-auto" />
            <span className="font-display font-black text-foreground text-lg tracking-tight">
              Emilian Leber
            </span>
          </Link>
          <p
            className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/70 leading-[1.45] mb-8`}
          >
            Bühne, Close-Up und Magic Dinner — aus Bayern, deutschlandweit.
          </p>
          <p className="text-sm text-foreground/55 leading-[1.65] mb-7 max-w-xs">
            Über 200 Events, 100+ Hochzeiten, 5,0 Sterne bei 30+ Bewertungen.
            Persönliche Antwort innerhalb 24 Stunden.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-foreground/65 hover:text-foreground transition-colors group"
              >
                {s.label}
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8 md:gap-10">
          {FOOTER_COLS.map((col) => (
            <div key={col.heading}>
              <p
                className={`${SERIF_ITALIC} text-sm text-foreground/45 mb-5`}
              >
                {col.heading}.
              </p>
              <ul className="space-y-2.5">
                {col.items.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="text-sm text-foreground/75 hover:text-[var(--accent)] transition-colors"
                      style={{ ["--accent" as never]: ACCENT }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* City links */}
      <div className="border-t border-foreground/10 pt-10 mb-10">
        <p
          className={`${SERIF_ITALIC} text-sm text-foreground/45 mb-4`}
        >
          Zauberer in deiner Stadt.
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-1.5">
          {staedte.slice(0, 14).map((s) => (
            <Link
              key={s.slug}
              to={`/zauberer/${s.slug}`}
              className="text-xs text-foreground/45 hover:text-[var(--accent)] transition-colors"
              style={{ ["--accent" as never]: ACCENT }}
            >
              {s.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-foreground/10 pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <p className="text-xs text-foreground/45">
          © {new Date().getFullYear()} Emilian Leber. Alle Rechte vorbehalten.
        </p>
        <div className="flex flex-wrap gap-6">
          <Link
            to="/impressum"
            className="text-xs text-foreground/55 hover:text-foreground transition-colors"
          >
            Impressum
          </Link>
          <Link
            to="/datenschutz"
            className="text-xs text-foreground/55 hover:text-foreground transition-colors"
          >
            Datenschutz
          </Link>
          <Link
            to="/agb"
            className="text-xs text-foreground/55 hover:text-foreground transition-colors"
          >
            AGB
          </Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
