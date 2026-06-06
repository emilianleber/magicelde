# Handover — Voltage Design-Rollout auf Unterseiten

**Stand: 2026-06-06 (autonome Nacht-Session).** Branch: `feat/voltage-rollout` (Commit `19b3b9b`).

## Ziel (User-Auftrag)
Das „Plain Voltage"-Design der Demo-Startseite (`/demo`, `StartDemo.tsx`) auf die Website ausrollen:
pro Template eine echte Test-Seite, **echte** Links/Logo/Bewertungen, alle Menü-Seiten. Als
navigierbarer Prototyp unter `/demo/*` (noindex), Live-Seite bleibt unangetastet. Branch, kein Push/Deploy.

## Was gebaut wurde

### Shared Design-System — `src/components/voltage/`
- **theme.tsx** — Single Source of Truth: Farb-Tokens (INK/PAPER/COBALT/MAGENTA…), **echte Links**
  (PHONE `+4915563744696`, EMAIL `el@magicel.de`, WHATSAPP, INSTAGRAM `_magicel`, YOUTUBE, FACEBOOK,
  LINKEDIN, ANFRAGE_HREF=`/demo/kontakt`), Nav-Daten (KONZEPTE, ANLAESSE_NAV), **echte Bewertungen**
  (Katrin Raß, Jan von Lehmann, Martina Senftl — 5,0 · 30+), CLIENT_LOGOS, Style-Helfer (glass, glassDark,
  cta, ghost), Motion-Varianten (up/stagger/vp), Atome (GoogleG, Stars, Eyebrow), `VoltageGlobalStyle`
  (erzwingt Outfit-Headings via `.voltage-root h1..h6` + pv-Utilities).
- **VoltageHeader.tsx** — Utility-Bar + Sticky-Nav mit **echtem Logo** (`logo-clean.webp`), Konzepte- +
  Anlässe-Dropdowns (→ /demo/* via react-router `Link`), Referenzen/Über/Kontakt, Anfragen-CTA, Mobile-Menü.
  Bekommt `scrolled` als Prop.
- **VoltageFooter.tsx** — Brand + Kontakt + **echte Socials** (4 Icons) + Spalten + Riesen-Wortmarke „Erst staunen."
- **VoltageShell.tsx** — Lenis + Helmet(SEO, noindex default, canonical `www.magicel.de`) + Header + `<main>` + Footer + Demo-Badge. Props: `title, description, path, children, noindex?`.
- **sections.tsx** — wiederverwendbare Bausteine: `SubHero, SectionHeader, Stats, FactsGrid, Steps,
  GlassFeatures, Statement, PullQuote, ReviewsBlock, LogoMarquee, FinalCTA, FAQ`.

### 13 Template-Seiten — `src/pages/demo/` (alle noindex, alle verifiziert renderfähig)
- **Konzepte (Show-Detail-Template):** Buehnenshow, CloseUp, MagicDinner, Moderation, Comedy
- **Anlässe (Occasion-Template):** Hochzeit, Firmenfeiern, Geburtstage, EventAgenturen, Messe
- **Eigene Templates:** Ueber (Bio + dunkle Story-Section + Auszeichnungen), Referenzen (Stats + Kunden-Grid
  + echte Reviews), Kontakt (3 Kontaktwege + Demo-Formular + FAQ)
- Buehnenshow/Hochzeit/Ueber/Referenzen/Kontakt = von mir gebaut (Template-Referenzen). Die 8 Derivate =
  per Workflow-Agenten gebaut, alle render-verifiziert (h1 + Sektionen + keine Fehler).

### Routen — `src/App.tsx`
- `/demo/*` Routen in BEIDEN Blöcken (PublicRoutes + localhost-Block), lazy.
- `PublicChrome`-Komponente: blendet alte Site-Popups (EngagementPopup/ShowPlaner/EmailBanner) auf `/demo*` aus.

## Verifiziert
Alle 13 `/demo/*` Seiten rendern (h1 korrekt, ~10 Sektionen, keine React-Fehler), Dev-Server kompiliert
fehlerfrei. Hero von Buehnenshow per Screenshot bestätigt (Logo, Dropdowns, Cobalt-Headline, object-top-Bild,
Glas-Review-Badge, echtes Rating) — Design-Qualität wie StartDemo.

## ⚠️ Bekanntes Preview-Artefakt (KEIN echter Bug)
Der Headless-Preview-Tab drosselt `requestAnimationFrame` → Framer-Motion Reveal-Animationen (opacity 0→1)
„frieren" bei ~0 ein. Betrifft auch StartDemo im Preview. **Im echten Browser (Vordergrund) laufen sie normal.**
Für Verifikations-Screenshots: `<style>` mit `.voltage-root [style*="opacity"]{opacity:1!important;transform:none!important}` injizieren.

## TODO / Nächste Schritte
1. **StartDemo-Integration:** echtes Logo in StartDemo-Nav/Footer, Nav-Links → /demo/* (Shows-Dropdown,
   Referenzen, Über, Kontakt), damit die Home den Prototyp verbindet. (Surgical, StartDemo-Look bewahren.)
2. **Visuelle Politur** der Unterseiten im echten Browser prüfen (Animationen, Bild-Crops object-top,
   Sektions-Abstände). Memory `feedback_magicelde_images_top` beachten.
3. Optional: Tickets/Magazin/FAQ-Seite, Stadt-Template, mehr Anlässe.
4. Wenn der User abnimmt: Design auf die echten Routen (`/`, `/buehnenshow`, …) übernehmen + index erlauben.

## Wichtige Regeln (Memory)
- Fotos immer `object-position: top` (Köpfe sonst abgeschnitten) — `feedback_magicelde_images_top`.
- Keine deutschen „…" in JS-String-Literalen (SWC-Build bricht) — in JSX-Text/Attributen ok. Komponenten
  (PullQuote/ReviewsBlock) fügen die „" selbst im JSX-Text hinzu → Seiten übergeben reinen Text.
- Kein Gold/Geld-Look, Cobalt-Akzent, Outfit als einzige Schrift.
- `__lenis` Debug-Handle ist global gesetzt (harmlos, hilft beim Screenshotten).
