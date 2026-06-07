/** VOLTAGE Shell — Lenis + Helmet(SEO) + Header + Footer. Jede /demo/* Seite nutzt das. */
import { useEffect, useState, type ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import Lenis from "lenis";
import { INK, WHITE, SANS, SITE_URL, VoltageGlobalStyle } from "./theme";
import VoltageHeader from "./VoltageHeader";
import VoltageFooter from "./VoltageFooter";

interface Props {
  title: string;
  description: string;
  path?: string;          // z.B. "/demo/buehnenshow" → canonical
  children: ReactNode;
  noindex?: boolean;      // Prototyp: default noindex
}

export default function VoltageShell({ title, description, path = "/demo", children, noindex = true }: Props) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
    (window as unknown as { __lenis?: unknown }).__lenis = lenis;
    lenis.on("scroll", (e: { scroll: number }) => setScrolled(e.scroll > 40));
    let raf = 0;
    const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);

  return (
    <div className="voltage-root pv-root min-h-screen overflow-x-hidden" style={{ background: WHITE, color: INK, fontFamily: SANS }}>
      <Helmet>
        <html lang="de" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content={noindex ? "noindex,nofollow" : "index,follow,max-image-preview:large"} />
        <link rel="canonical" href={`${SITE_URL}${path}`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap" />
      </Helmet>
      <VoltageGlobalStyle />

      {noindex && (
        <div className="fixed bottom-4 left-4 z-[60] text-[10px] tracking-[0.16em] uppercase font-bold px-3 py-1.5 rounded-full" style={{ background: INK, color: WHITE }}>Demo · nicht live</div>
      )}

      <VoltageHeader scrolled={scrolled} />
      <main>{children}</main>
      <VoltageFooter />
    </div>
  );
}
