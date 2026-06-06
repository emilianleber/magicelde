/** VOLTAGE Header — Utility-Bar + Sticky-Nav (Konzepte/Anlässe-Dropdowns) + Vollbild-Mobile-Menü. */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Phone, Mail, MapPin, ChevronDown, Menu, X,
} from "lucide-react";
import {
  INK, WHITE, COBALT, L_LINE, L_DIM, D_DIM,
  PHONE_HREF, PHONE_DISPLAY, EMAIL_HREF, ANFRAGE_HREF, KONZEPTE, ANLAESSE_NAV, cta, panel,
} from "./theme";
import logo from "@/assets/logo-clean.webp";

const NAV_MOBILE = [
  { t: "Bühnenshow", h: "/demo/buehnenshow" },
  { t: "Close-Up", h: "/demo/close-up" },
  { t: "Magic Dinner", h: "/demo/magic-dinner" },
  { t: "Hochzeit", h: "/demo/hochzeit" },
  { t: "Firmenfeier", h: "/demo/firmenfeiern" },
  { t: "Referenzen", h: "/demo/referenzen" },
  { t: "Über mich", h: "/demo/ueber" },
  { t: "Kontakt", h: "/demo/kontakt" },
];

const Logo = () => (
  <Link to="/demo" className="flex items-center gap-2.5 shrink-0" aria-label="Emilian Leber — Startseite">
    <img src={logo} alt="Emilian Leber" className="h-7 w-auto" />
    <span className="text-[16px] font-extrabold tracking-tight" style={{ color: INK }}>Emilian Leber</span>
  </Link>
);

export default function VoltageHeader({ scrolled }: { scrolled: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.documentElement.style.overflow = ""; };
  }, [menuOpen]);

  const solid = scrolled || menuOpen;

  return (
    <>
      {/* Utility-Bar */}
      <div className="hidden md:flex items-center justify-between px-10 py-2.5 text-[12.5px]" style={{ background: INK, color: D_DIM }}>
        <div className="flex items-center gap-6">
          <a href={PHONE_HREF} className="hover:text-white inline-flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> {PHONE_DISPLAY}</a>
          <a href={EMAIL_HREF} className="hover:text-white inline-flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> el@magicel.de</a>
          <span className="inline-flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Regensburg & deutschlandweit</span>
        </div>
        <span className="inline-flex items-center gap-2" style={{ color: WHITE }}><span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: COBALT }} /> Termine 2026 frei</span>
      </div>

      {/* Sticky-Nav */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-5 md:px-10 py-4 transition-colors duration-300" style={{ background: solid ? `${WHITE}f5` : "transparent", backdropFilter: solid ? "blur(14px)" : "none", borderBottom: `1px solid ${solid ? L_LINE : "transparent"}` }}>
        <Logo />
        <div className="hidden lg:flex items-center gap-7 text-[14px] font-medium" style={{ color: INK }}>
          {/* Konzepte */}
          <div className="pv-has-dd relative">
            <button className="inline-flex items-center gap-1 py-2">Konzepte <ChevronDown className="w-3.5 h-3.5" /></button>
            <div className="pv-dd absolute top-full left-0 pt-3 z-50">
              <div className="w-[460px] rounded-[18px] p-3 grid grid-cols-1 gap-1" style={panel}>
                {KONZEPTE.map(({ t, d, h, Icon }) => (
                  <Link key={t} to={h} className="flex gap-3 p-3 rounded-[12px] transition-colors hover:bg-[#F5F3EF]">
                    <span className="shrink-0 w-9 h-9 rounded-[9px] flex items-center justify-center" style={{ background: `${COBALT}12`, color: COBALT }}><Icon className="w-[18px] h-[18px]" /></span>
                    <span className="min-w-0"><span className="block text-[14px] font-semibold leading-tight" style={{ color: INK }}>{t}</span><span className="block text-[12px] leading-snug mt-0.5" style={{ color: L_DIM }}>{d}</span></span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {/* Anlässe */}
          <div className="pv-has-dd relative">
            <button className="inline-flex items-center gap-1 py-2">Anlässe <ChevronDown className="w-3.5 h-3.5" /></button>
            <div className="pv-dd absolute top-full left-0 pt-3 z-50">
              <div className="w-[420px] rounded-[18px] p-3 grid grid-cols-1 gap-1" style={panel}>
                {ANLAESSE_NAV.map(({ t, d, h }) => (
                  <Link key={t} to={h} className="flex items-center gap-3 p-3 rounded-[12px] transition-colors hover:bg-[#F5F3EF]">
                    <span className="shrink-0 w-2 h-2 rounded-full" style={{ background: COBALT }} />
                    <span className="min-w-0"><span className="block text-[14px] font-semibold leading-tight" style={{ color: INK }}>{t}</span><span className="block text-[12px] leading-snug mt-0.5" style={{ color: L_DIM }}>{d}</span></span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Link to="/demo/referenzen" className="pv-link py-2">Referenzen</Link>
          <Link to="/demo/ueber" className="pv-link py-2">Über mich</Link>
          <Link to="/demo/kontakt" className="pv-link py-2">Kontakt</Link>
        </div>
        <div className="flex items-center gap-2">
          <Link to={ANFRAGE_HREF} className={`${cta} hidden sm:inline-flex`} style={{ background: COBALT, color: WHITE, padding: "10px 20px" }}>Anfragen <ArrowRight className="w-4 h-4" /></Link>
          <button className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-full" style={{ border: `1px solid ${L_LINE}`, color: INK }} aria-label="Menü öffnen" onClick={() => setMenuOpen((v) => !v)}>
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile-Menü */}
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 z-[55] flex flex-col" style={{ background: WHITE }}>
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${L_LINE}` }}>
            <Logo />
            <button onClick={() => setMenuOpen(false)} aria-label="Menü schließen" className="inline-flex items-center justify-center w-11 h-11 rounded-full" style={{ border: `1px solid ${L_LINE}`, color: INK }}><X className="w-5 h-5" /></button>
          </div>
          <div className="flex-1 overflow-y-auto flex flex-col justify-center px-7">
            {NAV_MOBILE.map((n) => (
              <Link key={n.t} to={n.h} onClick={() => setMenuOpen(false)} className="py-2.5 font-extrabold tracking-[-0.02em]" style={{ fontSize: "clamp(1.6rem,7vw,2.2rem)", color: INK, lineHeight: 1.15 }}>{n.t}<span style={{ color: COBALT }}>.</span></Link>
            ))}
          </div>
          <div className="px-7 pb-10 space-y-5">
            <Link to={ANFRAGE_HREF} onClick={() => setMenuOpen(false)} className="flex items-center justify-center gap-2 rounded-full px-6 py-4 text-[16px] font-semibold" style={{ background: COBALT, color: WHITE }}>Termin anfragen <ArrowRight className="w-4 h-4" /></Link>
            <div className="flex items-center gap-6 text-[15px]" style={{ color: L_DIM }}>
              <a href={PHONE_HREF} className="inline-flex items-center gap-2"><Phone className="w-4 h-4" style={{ color: COBALT }} /> Anrufen</a>
              <a href={EMAIL_HREF} className="inline-flex items-center gap-2"><Mail className="w-4 h-4" style={{ color: COBALT }} /> E-Mail</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
