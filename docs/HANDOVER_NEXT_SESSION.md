# Handover — magicel.de (Voltage-Rollout, Stand 2026-06-09)

**Branch `feat/voltage-rollout` == `main` (deployed auf Vercel).** Letzter HEAD ~`c7cd891`.
Deploy = `git push origin HEAD:main` (Vercel baut automatisch). Build/Verify lokal: `npm run build` (muss „✓ Prerendered 699 routes" zeigen). `npx tsc --noEmit -p tsconfig.json` muss exit 0 sein.

## Wo wir stehen
Die GANZE Public-Seite ist auf dem „Voltage"-Design (Cobalt #1D3FFF / Ink #0A0B0F / weiß / kühles Grau, Outfit-Schrift, **kein Gold/Burgunder/Serif/Lila**):
Startseite (`StartDemo.tsx`, Route `/`), 10 Detailseiten, 110 Stadt-Seiten (`StadtSeite.tsx`), 545 Service-Stadt-Seiten (`ServiceStadtSeite.tsx`), Tickets, MagicDinnerSummerEdition, Referenzen, UeberMich, FAQ, Kontakt, Presse, Blog, BlogPost, WissenSeite, Buchung — alle in `<VoltageShell>` (`src/components/voltage/VoltageShell.tsx`) bzw. StartDemo eigenes Layout.
Übrig in Alt-Look (bewusst, schlicht): Legal (AGB/Datenschutz/Impressum), Danke, Unsubscribe, NotFound, Kundenportal, tote `Index.tsx` (nicht geroutet). Diese nutzen noch `PageLayout` (das jetzt VoltageHeader/Footer rendert).

## Architektur-Kurzform
- Shared Voltage: `src/components/voltage/` — `theme.tsx` (Tokens, Links KONZEPTE/ANLAESSE_NAV → echte Routen, REVIEWS, CLIENT_LOGOS), `VoltageShell.tsx` (Helmet-SEO + Lenis + Header/Footer + `<Chatbot/>`), `VoltageHeader.tsx`, `VoltageFooter.tsx`, `sections.tsx` (SubHero, Stats, FactsGrid, Steps, GlassFeatures, Statement, PullQuote, ReviewsBlock, LogoMarquee, FAQ, FinalCTA, SectionHeader), `creative.tsx` (SplitFeature, Bento, FlowBand, InteractiveTabs, WarumCarousel, FormatCards, ExampleSets, DarkShowcase, PolaroidWall).
- SEO build-time: `scripts/seo-content.mjs` + `scripts/inject-meta.mjs` (JSON-LD + statischer Body pro Route, AEO 100/100) — **unabhängig von React-Komponenten, NICHT kaputt machen**. Daten: `src/data/staedte.ts` (110 Städte: slug/name/region/intro/highlight/seoText/langText/faq/bekannteLocations/**kollegenEmpfehlung**), `src/data/serviceFormats.ts`.
- Lenis Smooth-Scroll in VoltageShell + StartDemo mit `prevent:(node)=>node.closest('[role="dialog"],[data-lenis-prevent],[aria-modal="true"]')`.
- Floating-FAB = `ShowPlanerTrigger` (via `PublicChrome` in `App.tsx`, auf allen Nicht-/demo-Routen), dispatcht `open-chatbot`-Event; Chatbot-Panel lauscht darauf.
- CRM/Formulare: Kontakt-Form → Redirect `/buchung`; Buchung = Haupt-Lead-Formular (Supabase). **Formular-/Submit-Logik NIE anfassen, nur Optik.**

## KONVENTIONEN (wichtig!)
- **Kein Gold/Burgunder/Serif/Lila.** Nur Cobalt/Ink/weiß/kühl. Magenta #FF2D7A nur als winziger Punktuations-Punkt.
- **KEINE deutschen typografischen Anführungszeichen („ " ‚ ') in JS-String-Literalen** → bricht SWC/Vite-Build. In JSX-Text ok.
- **Bilder: Querformat-Container brauchen Querformat-Bilder** (sonst Kopf abgeschnitten). QUER: audience-reactions, emilian-magic-dinner, hero-dinner, hero-closeup, hero-stage, moderator-hero, magicdinner-buehne, wedding-magic, staunen, hero-birthday. HOCH: stage-show, closeup, magicdinner-book, buehne-dpsg, buehne-zuschauer, haende-interaktion, schneider-weisse-closeup, emotionen. Jedes Bild **max. 1×/Seite**.
- SEO/JSON-LD/Helmet/Quiz/WeitereStaedte/interne Links bei Umbauten 1:1 erhalten.
- Pre-existing uncommittet im Working-Tree (NICHT von uns, in Ruhe lassen / nicht committen): `package.json`/`package-lock` (außer lenis), `public/sitemap.xml` (build-generiert), `scripts/inject-meta.mjs`, `src/components/landing/StadtLinks.tsx`, ggf. Admin-Files.

---
## OFFENE AUFGABEN (vom User, 2026-06-09) — DAS HIER ABARBEITEN
1. **Kollegen-Empfehlung-Link fehlt auf Stadt-Seiten** (Bsp. `/zauberer/hannover`): vorher war dort der externe Link „Zauberer simabu" → http://www.simabu.com/. Quelle: `src/data/staedte.ts` Feld `kollegenEmpfehlung` (pro Stadt, externer Kollegen-Link). Beim Lean-Umbau von `StadtSeite.tsx` wanderte `KollegenEmpfehlung` in das „Mehr über {Stadt}"-Accordion ODER ging verloren → prüfen, dass `data.kollegenEmpfehlung` wieder sichtbar als Link rendert (idealerweise eigene kleine Section ODER im Accordion, aber als echter `<a href>`). Gleiches Feld auch in `ServiceStadtSeite.tsx` prüfen.
2. **Widgets/Karten verlinken nicht auf Unterseiten** (z.B. „Bühnenshow"-Karte führt nicht zu `/buehnenshow`). Auf den umgebauten Seiten die Karten/Tabs/Carousel-Items auditieren: Format-/Anlass-Karten müssen `to="/buehnenshow"` etc. haben. Achtung: `InteractiveTabs` hat per Design KEINE Links (nur Bild/Text-Vorschau) → ggf. Links ergänzen oder durch `FormatCards` (mit `h`/Link) ersetzen. `WarumCarousel`-Karten haben i.d.R. keine Links. Systematisch prüfen: StadtSeite, ServiceStadtSeite, Detailseiten, Tickets, Referenzen.
3. **Footer umstrukturieren + mehr SEO-Stadt-Links** (`src/components/voltage/VoltageFooter.tsx`): aktuell Konzepte/Anlässe/Kontakt + 3 Städte. Gewünscht: mehr Spalten, eine „Städte"-Spalte mit Städten **über ganz Deutschland verteilt** (Berlin, Hamburg, München, Köln, Frankfurt, Stuttgart, Düsseldorf, Leipzig, Dresden, Hannover, Nürnberg, Regensburg … — Slugs aus `staedte.ts`, Link `/zauberer/<slug>`). Footer „etwas umstrukturieren". Außerdem **Magazin (/blog), FAQ (/faq), Legal** verlinken. Nicht überfüllen.
4. **Kundenportal-Login einbauen** + kurze Erklärung: Link zu `/kundenportal/login` (Seite existiert: `KundenportalLogin.tsx`/`Kundenportal.tsx`) im Footer, mit 1 Satz Erklärung (z.B. „Kundenportal — Angebote, Verträge & Dokumente einsehen.").
5. **FAQ-Seite fehlt** in der Navigation/Verlinkung: `/faq` existiert (umgebaut), aber kein Menüpunkt/Footer-Link → ergänzen (Header-Nav `VoltageHeader.tsx` und/oder Footer).
6. **Laptop: offenes Menü scrollt nicht** — stattdessen scrollt die Seite dahinter. Das ist das `lg:hidden` Vollbild-Menü in `VoltageHeader.tsx` (zeigt sich bei schmalem Laptop-Fenster <1024px). Der Scroll-Container (`<div className="flex-1 overflow-y-auto px-7 py-4">`, ~Z110) braucht **`data-lenis-prevent`** (Lenis schluckt sonst den Scroll). Außerdem prüfen, dass Body-Scroll-Lock greift (VoltageHeader setzt `document.documentElement.style.overflow="hidden"` bei menuOpen — mit Lenis ggf. wirkungslos; `data-lenis-prevent` am Menü-Container ist der eigentliche Fix, analog ShowPlanerModal).

## Nach Umsetzung
Jede Änderung: `npx tsc --noEmit` + `npm run build` grün (699 Routen), dann `git push origin HEAD:main` + `git push origin HEAD`. Bei Push-Reject (non-FF, paralleler Commit auf main): `git fetch origin main` → `git merge origin/main --no-edit` → push.

## Weiterführend
- `docs/SEO_GEO_AEO_PLAN.md` — Mitbewerberanalyse + Maßnahmen (Inhaber-To-do: Google Business Profile + Reviews + Backlinks).
- Memory: `project_magicelde_voltage_rollout.md` (Runden 1–9, alle Entscheidungen).
