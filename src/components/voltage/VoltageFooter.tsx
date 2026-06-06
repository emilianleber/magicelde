/** VOLTAGE Footer — Brand + Kontakt + Social + Spalten + Riesen-Wortmarke. */
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Instagram, Youtube, Facebook, Linkedin } from "lucide-react";
import {
  INK, WHITE, COBALT, D_LINE, D_DIM,
  PHONE_HREF, PHONE_DISPLAY, EMAIL_HREF, WHATSAPP, INSTAGRAM, YOUTUBE, FACEBOOK, LINKEDIN,
  KONZEPTE, ANLAESSE_NAV,
} from "./theme";
import logo from "@/assets/logo-clean.webp";

const STAEDTE = ["Regensburg", "München", "Nürnberg", "Ingolstadt", "Landshut", "Passau"];
const SOCIALS = [
  { Icon: Instagram, href: INSTAGRAM, label: "Instagram" },
  { Icon: Youtube, href: YOUTUBE, label: "YouTube" },
  { Icon: Facebook, href: FACEBOOK, label: "Facebook" },
  { Icon: Linkedin, href: LINKEDIN, label: "LinkedIn" },
];

export default function VoltageFooter() {
  return (
    <footer className="relative overflow-hidden" style={{ background: INK, color: D_DIM }}>
      <div aria-hidden className="absolute -top-32 -right-24 w-[560px] h-[560px] rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${COBALT}26, transparent 60%)` }} />
      <div className="relative max-w-7xl mx-auto px-5 md:px-10 pt-20 md:pt-24 pb-10 grid grid-cols-2 md:grid-cols-12 gap-y-12 gap-x-8">
        <div className="col-span-2 md:col-span-4">
          <div className="flex items-center gap-2.5">
            <img src={logo} alt="Emilian Leber" className="h-7 w-auto" style={{ filter: "brightness(0) invert(1)" }} />
            <span className="text-[20px] font-extrabold tracking-tight" style={{ color: WHITE }}>Emilian Leber</span>
          </div>
          <p className="text-[15px] leading-[1.65] mt-4 max-w-xs" style={{ color: D_DIM }}>Comedy-Zauberer aus Regensburg. Bühnenshow, Close-Up und Magic Dinner für Hochzeiten, Firmenfeiern & Events — deutschlandweit.</p>
          <div className="mt-6 space-y-2.5 text-[14.5px]">
            <a href={PHONE_HREF} className="flex items-center gap-2.5 hover:text-white transition-colors"><Phone className="w-4 h-4" style={{ color: COBALT }} /> {PHONE_DISPLAY}</a>
            <a href={EMAIL_HREF} className="flex items-center gap-2.5 hover:text-white transition-colors"><Mail className="w-4 h-4" style={{ color: COBALT }} /> el@magicel.de</a>
            <span className="flex items-center gap-2.5"><MapPin className="w-4 h-4" style={{ color: COBALT }} /> Regensburg & deutschlandweit</span>
          </div>
          <div className="flex items-center gap-3 mt-7">{SOCIALS.map(({ Icon, href, label }) => (<a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="w-11 h-11 rounded-full flex items-center justify-center transition-colors hover:text-white hover:border-white/40" style={{ border: `1px solid ${D_LINE}` }}><Icon className="w-[18px] h-[18px]" /></a>))}</div>
        </div>
        <div className="md:col-span-2 md:col-start-7"><p className="text-[12px] tracking-[0.1em] uppercase mb-4 font-semibold" style={{ color: WHITE }}>Konzepte</p><ul className="space-y-3 text-[14.5px]">{KONZEPTE.map((s) => <li key={s.t}><Link to={s.h} className="hover:text-white transition-colors">{s.t}</Link></li>)}</ul></div>
        <div className="md:col-span-2"><p className="text-[12px] tracking-[0.1em] uppercase mb-4 font-semibold" style={{ color: WHITE }}>Anlässe</p><ul className="space-y-3 text-[14.5px]">{ANLAESSE_NAV.map((a) => <li key={a.t}><Link to={a.h} className="hover:text-white transition-colors">{a.t}</Link></li>)}</ul></div>
        <div className="md:col-span-2"><p className="text-[12px] tracking-[0.1em] uppercase mb-4 font-semibold" style={{ color: WHITE }}>Kontakt</p><ul className="space-y-3 text-[14.5px]"><li><Link to="/demo/kontakt" className="hover:text-white transition-colors">Termin anfragen</Link></li><li><a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp</a></li>{STAEDTE.slice(0, 3).map((c) => <li key={c}><a href={c === "Regensburg" ? "/demo/zauberer-regensburg" : "#"} className="hover:text-white transition-colors">Zauberer {c}</a></li>)}</ul></div>
      </div>
      <div className="relative px-5 md:px-10">
        <div className="max-w-7xl mx-auto" style={{ borderTop: `1px solid ${D_LINE}` }}>
          <p className="font-extrabold tracking-[-0.04em] leading-[0.82] py-9 md:py-12 select-none whitespace-nowrap" style={{ fontSize: "clamp(3rem,14vw,12rem)", color: "rgba(255,255,255,0.055)" }}>Erst staunen.</p>
        </div>
      </div>
      <div className="relative max-w-7xl mx-auto px-5 md:px-10 py-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-[12.5px]" style={{ borderTop: `1px solid ${D_LINE}` }}>
        <div className="flex items-center gap-6"><a href="/impressum" className="hover:text-white transition-colors">Impressum</a><a href="/datenschutz" className="hover:text-white transition-colors">Datenschutz</a><a href="/agb" className="hover:text-white transition-colors">AGB</a></div>
        <span>© 2026 Emilian Leber · MagicEL Entertainment · Demo-Entwurf</span>
      </div>
    </footer>
  );
}
