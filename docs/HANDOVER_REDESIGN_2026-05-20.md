# magicel.de · Re-Design Handover — 2026-05-20

Hi nächste KI. Du übernimmst das Re-Design der magicel.de-Site nach einem intensiven Refactor-Sprint (ca. 60 Commits, ~30 000 LOC neu). Der Sprint hat CI v3 (Frameblox-Editorial-Stil mit dark Heros, italic-serif Akzenten, cream BG, Burgunder-Glow) implementiert — **aber dem Inhaber Emilian Leber ist es zu KI-generiert geworden**: zu viel Cream/Beige, zu viel Italic-Serif, zu viel Glow/Glanz.

**Dein Auftrag**: aufräumen, beruhigen, professionell ohne Schnörkel. Editorial bleibt, aber **deutlich entschlackt**.

---

## 0 · Schnellstart

- **Repo**: `github.com/emilianleber/magicelde`
- **Worktree**: `/Users/emilianleber/magicelde/.claude/worktrees/sweet-shockley-ce7a5c`
- **Branch**: `claude/sweet-shockley-ce7a5c` — Push direkt nach `main` deployt Vercel automatisch
- **Stack**: React + Vite + Tailwind + TypeScript + React-Router
- **Dev**: `npx vite --port 5199` (oder Preview-Tools via `.claude/launch.json`)
- **Build-Check vor jedem Commit**: `npx vite build 2>&1 | tail -3`
- **SWC-Quote-Check**: deutsche „..." in JS-Strings (`title:`, `body:`, etc.) brechen den Build → durch eckige Klammern `[...]` ersetzen. JSX-Text-Content (`<p>„text"</p>`) ist safe.

---

## 1 · User-Verhalten (READ THIS FIRST)

Emilian (User) hat folgende Eigenarten — **respektiere sie**:

1. **„In diesem Chat bist du der Chef"** — autonom entscheiden, KEINE Auswahlfragen (`AskUserQuestion` nicht verwenden). Liefern statt fragen.
2. **Er liest nicht lang** — kurze End-of-Turn-Messages, eine konkrete „WAS DU JETZT MACHST"-Block falls eine User-Action wirklich nötig ist (Eingaben, Klicks).
3. **Bestätigungs-Pattern**: er sagt „passt" wenn was passt. Sagt nichts → noch nicht passt → er meldet sich mit Korrektur.
4. **„Beispiel"-Regel** (sehr wichtig): wenn er „bsw" oder „beispielsweise" sagt, ist das **ein Beispiel für ein Pattern**, nicht das einzige Problem. Du musst dann **selbst weitere Stellen mit dem gleichen Problem finden** und alle mitfixen. Beispiele:
   - „magazin bsw ist irrelevant" → er meinte Blog/FAQ/Kontakt/Tickets/Legal-Pages auch (Logo-Bauchbinde war auf zu vielen)
   - „bei tickets, presse, referenzen, magazin, FAQ" → das sind Beispiele, du musst alle kleinen Sub-Pages prüfen
5. **Screenshots ernst nehmen** — wenn er einen Screenshot zeigt, ist das ein konkreter Bug-Beleg. Vor User-Korrektur die echte URL/Page identifizieren.
6. **Mehrfach-Korrekturen sind Pattern-Signal** — wenn er ein Thema 2× erwähnt (z. B. Italic-Serif zu viel, Cream zu viel), ist es nicht punktuell sondern **global**. Lösung: globaler Audit, nicht Einzelfix.
7. **Mobile-First** — er testet primär auf Handy. „auf manchen seiten passt das nicht am handy" → Mobile-Layout-Bugs.
8. **Authentizität** — er hasst erfundene USPs („Gastro-Sohn. Bühnenkünstler." → raus), erfundene Versicherungssummen („5 Mio €" → raus), erfundene Reviews. Nur echte Stationen.

---

## 2 · Was IST im aktuellen Sprint passiert

### Foundation (komplett neu)
- `src/components/landing/ShowPlanerModal.tsx` — Fullscreen-Modal mit 9 Fragen + Summary, Cookie-Resume
- `src/components/landing/ShowPlanerTrigger.tsx` — FAB unten rechts + Resume-Banner + Exit-Intent
- `src/components/landing/Chatbot.tsx` — Chatbot „Karta" mit Keyword-Knowledge
- `src/components/landing/LogoMarquee.tsx` — durchlaufende Logo-Bauchbinde
- `src/components/landing/EmailReminderBanner.tsx` — 24h-Reminder
- `src/components/TabTitleSwitcher.tsx` — Tab-Title-Toggle „Wir vermissen dich ✨" bei Tab-Switch
- `src/lib/emailCapture.ts` — Email-Persistence
- `src/lib/showPlaner.ts` — Show-Planer-Draft-Storage
- `src/lib/videos.ts` — Zentral `TVA_VIDEO_ID = "R0_mXGxzC9E"`

### Hauptpages refactored (Stand 2026-05-20)
| Page | LOC | Status |
|---|---|---|
| Index | 2300 | ✅ refactored |
| Hochzeit | 2114 | ✅ refactored |
| Firmenfeiern | 1907 | ✅ refactored |
| Geburtstage | 1037 | ✅ refactored |
| Buehnenshow | ~900 | ✅ refactored |
| CloseUp | ~1000 | ✅ refactored |
| MagicDinner | ~3500 | ✅ refactored (Referenz!) |
| Moderation | ~900 | ✅ refactored |
| ComedyZauberei | 1771 | ✅ refactored |
| UeberMich | 2367 | ✅ refactored |
| Referenzen | 1816 | ✅ refactored |
| Presse | 2112 | ✅ refactored — **zu viel** |
| Tickets | 2300 | ✅ refactored — **zu viel** |
| Blog | 1418 | ✅ refactored — **zu viel** für „Magazin = irrelevant" |
| BlogPost | 1161 | ✅ refactored |
| Kontakt | 1944 | ✅ refactored — **zu viel** |
| FAQ | 437 | ✅ schlank (gut so) |
| Impressum/Datenschutz/AGB | 162/219/203 | ✅ Plain-Text |
| EventAgenturen | 1000+ | ✅ refactored |
| MesseMagier | 750+ | ✅ refactored |
| Buchung | 388 | ✅ refactored (Plain) |
| StadtSeite Template | 2200+ | ✅ refactored — **prüfen** |
| MagicDinnerSummerEdition | 1000+ | 🆕 NEU — **zu viel Design** |

### Daten
- `src/data/staedte.ts` — 109 Städte (Bayern + DE + AT + 30 Regensburg-Umland + 4 Landkreise)
- `src/data/blogPosts.ts` — 10 echte Blog-Posts (250-500 Wörter Body)
- `public/sitemap.xml` — 141 URLs, Stand 2026-05-19
- `public/portfolio/Emilian_Leber_Portfolio.pdf` — Portfolio (802 KB)

---

## 3 · KRITISCHE PROBLEME (User-Direktive: alle global fixen)

### A) **Cream/Beige immer noch zu viel**

User hat das jetzt **3×** moniert:
1. „Gelb / Beige etwas zu viel das ist nicht gut"
2. „immernoch zu viel beige und fade farbe"
3. „es es ist mir im globalen design immernoch zu viel gelb/beige"

Bereits gemacht: `hsl(36,30%,97%)` → `hsl(40,25%,98.5%)` → `hsl(30,8%,98.5%)`. **Reicht nicht.** Lösung:

- **Alle Section-BGs auf neutralen Off-White**: `hsl(0,0%,97%)` oder `hsl(0,0%,98%)`
- ODER pure white BG durchgängig, nur einzelne Sections mit subtiler 1px-Border statt BG-Wechsel
- **Amber-Akzente** (`#c79042`, `#f3d9a8`, `#f0d8a8`) → nur in extrem seltenen Cases (z. B. ein einzelnes Italic-Wort in einer dunklen Pull-Quote). Sonst raus.
- **Cream-Hero auf Datenschutz/FAQ/Kontakt** (`linear-gradient(180deg, #f5ecdc 0%, #f9f1e2, ...)`) → pure white oder linear-grey-gradient.

**Pages mit Cream-BG (alle prüfen + neutralisieren)**:
- Index (KonzeptIntro, AnlaesseSection, ComedyZaubereiSection, ZahlenInline)
- Alle 9 Anlässe-Pages (Hochzeit/Firmenfeier/etc.) — Wechsel cream/weiß in jeder zweiten Section
- StadtSeite Template — viele cream Sections (WarumStadt, Anlaesse, AblaufBuchung, MagicDinnerStadt, Garantien, Locations, AnreiseVerfuegbarkeit, FAQ, LangText, WeitereStaedte)
- Tickets, Presse, Referenzen, Kontakt, Magic Dinner Summer Edition

### B) **SERIF_ITALIC (Instrument Serif italic) immer noch zu oft**

User hat das jetzt **3×** moniert:
1. „dieses serif schrift ist gut aber zu oft also zu oft in der überschift wiederholt oder in normalen texten footer etc."
2. „es sollte nur als highlight überschrift genommen werden und nicht so oft"
3. „zu viel kursiv italic texte in jeder section zu viel in hero in header in menü in footer in unterseiten in überschriften"

Bereits gemacht: 240 Stellen reduziert (Eyebrows + Subs + Footer). **Reicht nicht.** Lösung:

- **SERIF_ITALIC darf NUR noch 1× pro H1/H2 als Highlight-Akzent-Span** vorkommen (z. B. „Zauberer für *eure Hochzeit.*" — das eine kursive Wort am Ende). Sonst überall raus.
- **Komplett raus aus**:
  - Header-Dropdown-Subs (`Navigation.tsx` DropdownItem-`sub`)
  - Resume-Banner Body („Du hast eine Show begonnen — magst weitermachen?")
  - Show-Planer-Modal Step-Hint-Tipp-Card-Body
  - Magic-Dinner-Detail-Page (Hero-Subline, alle Section-Subs)
  - StadtSeite Hero-Subline, Quote-Caption, alle Sub-Items
  - Card-Captions in Cards überall
  - „Stand März 2026" Footer-Notes
  - Pull-Quote-Cards (Tonality-Markenzeichen-Texts)
- **Behalten**:
  - 1× pro H2 (Highlight-Akzent-Wort, max 1-3 Worte, mit `paddingRight: "0.18em"`)
  - Vielleicht 1× in Hero-H1 als Highlight (z. B. „Magic Dinner *Summer Edition*")

**Suchen über alle Files**:
```bash
grep -rn 'SERIF_ITALIC' src/ | grep -v '// '  # alle Stellen
grep -rn '\${SERIF_ITALIC}' src/  # template-string-usage
```

### C) **Glow/Glanz/Licht-Effekte zu viel**

User hat das jetzt **3×** moniert:
1. „auch diese ganzen glow effekte müssen reduziert werden"
2. „hinter dem planer dieser glow ist zu viel"
3. „die Glow/glanz und licht effekte in widgets mockups sections, buttons, hero, header usw müssen reduziert werden, die siete ist sonst unruihg und alles wirkt gerade sehr KI generiert"

Bereits gemacht: Opacities halbiert (319 Stellen), dann nochmal halbiert (381 Stellen). **Reicht nicht.** Lösung:

- **Alle `radial-gradient` Glow-Blobs in Heros komplett raus** (oder opacity < 0.04). Aktuell:
  - Top-right Amber-Glow `rgba(199,144,66,0.12-0.14)`
  - Top-left Burgunder-Glow `rgba(154,38,64,0.13-0.18)`
  - Bottom Glow auf PullQuote schwarzem BG
  - In Heros: `-top-32 right-0 w-[680px] h-[680px] rounded-full blur-3xl`
- **Hero-Bokeh-Particles** (10 amber Lichtpunkte in BOKEH-Array) — komplett raus oder maximal 3 statt 10
- **Box-Shadows mit Burgunder-Tönung** → subtile neutrale shadows. Aktuell:
  - `boxShadow: "0 14px 30px -10px rgba(154,38,64,0.18)"` auf jedem Button
  - `boxShadow: "0 50px 100px -30px rgba(40,20,40,0.4)"` auf Cards
- **Glass-Cards mit `backdrop-blur(40px) saturate(200%) brightness(115%)`** → solid weiße Card oder solid dunkle Card, ohne Glass-Effekt. Aktuell auf:
  - Magic-Dinner-Caption-Cards, Index-Stat-Glass, Bühnenshow-TechRider-Card-Glow, Referenzen-Foto-Captions
- **Photo-Filter** auf Hero-Images (`filter: saturate(0.92) contrast(1.08) brightness(0.7)`) → reduzieren auf `brightness(0.85)` ohne saturate/contrast, oder ganz raus
- **CTA-Hover-Scale** `hover:scale-[1.035]` → kompletter Verzicht oder `hover:scale-[1.01]`
- **Animations**: `heroWordIn` mit `rotate(-1.5deg) blur(8px)` Spring-Overshoot → reduzieren auf simples fade-up
- **Hero-Star-Pulse** `heroStarPulse` mit `drop-shadow(0 0 8px rgba(199,144,66,0.55))` → komplett raus oder nur kurz Pulsing ohne Glow
- **Confetti** in Show-Planer Submit-State — OK behalten (User mag Konfetti)
- **Liquid-Glass-Cards** überall — durch solid weiße Cards mit subtilem border ersetzen

**Mass-Search**:
```bash
grep -rn 'backdrop-blur\|blur-3xl\|drop-shadow\|boxShadow.*154,38,64\|radial-gradient.*0\.1\|rotate(-1\.5deg)' src/ | wc -l
```

### D) **3 Floating Buttons (Show-Planer + Chatbot + WhatsApp) zu viel**

User-Quote: „aktuell gibts show planer, chatbot und whatsapp, das ist irgendwie zu viel weil auch whatsapp vor chatbot ist, aber eigentlich ist alles wichtig aber 3 sind zu viel eigentlich sind auch 2 zuviel. kann man das kombinieren oder in header oder so verschieben?"

**WhatsApp-FAB finden** — vermutlich in `Chatbot.tsx` oder als separates Component. Stand: `<Chatbot />` rendert links unten, `<ShowPlanerTrigger />` rendert rechts unten. **WhatsApp muss noch identifiziert werden.**

**Lösung-Optionen**:
1. **Konsolidieren** — ein einziger FAB mit Click-Expand-Menü (3 Aktionen: Chat / WhatsApp / Show-Planer)
2. **Header-CTA** — „Show planen" als prominenter Header-Button (rechts neben „Anfragen"), Chat als kleines Icon im Header, WhatsApp als Footer-Link
3. **Chatbot-Hauptmenü** — nur Chatbot-FAB sichtbar, beim Öffnen: Welcome-Menü mit Buttons „💬 Chat starten / 📱 WhatsApp / ✨ Show-Planer öffnen"

Mein Vorschlag: **Option 1** mit Click-Expand-Menü. Ein FAB unten rechts, beim Klick fächern sich 3 Mini-Buttons darüber auf (Show-Planer/Chat/WhatsApp).

---

## 4 · WAS NOCH SCHLANKER MUSS

User: „bei vielen anderen seiten hast du sehr sehr viel unnötiges gemacht bei bspw. tickets, presse, referenzen, magazin, FAQ,... lauter so eigentlich kleine seten."

**Sub-Pages drastisch kürzen** (alle aktuell 1500-2300 LOC, sollten 500-800 sein):

### Tickets (`src/pages/Tickets.tsx`, 2300 LOC)
Aktuelle Sections: Hero · MagicDinnerAbende · WasErwartetDich · TicketKategorien · PullQuote · Locations · AktuelleTourShow · TourDaten · Video · Stimmen · FAQ · NewsletterCTA. **Zu viel.**
Schlank: Hero (klein) + MagicDinnerAbende-Featured-Card (Summer Edition) + Sub-Liste der anderen Termine + FAQ-3-Items + CTA. Fertig.
Tour-Show 2026: in eigene Section nur 1 Block.

### Presse (`src/pages/Presse.tsx`, 2112 LOC)
Aktuelle Sections: Hero · LogoMarquee · BekanntAus (5 TV-Items) · PortfolioDownload · Pressemitteilungen (6 Items) · EPK-Download-Mockup (8 Attachments) · Pressefotos (10 Items Bento) · Boilerplate (3 Längen mit Copy) · PloetzlichMagie · InterviewZitate · PullQuote · Video · PressFAQ · PressKontaktDirekt. **VIEL zu viel.**
Schlank: Hero + BekanntAus (5 Items) + Portfolio-Download (1 Card) + Pressemitteilungen-Liste (4-5 Items) + Pressefotos-Grid (10 Items) + Boilerplate (3 Längen) + PressKontakt. Fertig.

### Referenzen (`src/pages/Referenzen.tsx`, 1816 LOC)
Aktuelle Sections: Hero (XXL 200+ Zahl) · LogoMarquee · GroßeLogoCloud · FilterSection · StatsEditorial · 3 CaseStudies · BranchenListe · Stimmen · Video · Zeitleiste · PullQuote · FAQ · KollegenEmpfehlung · WeitereStaedte · FinalCTA. **Zu viel.**
Schlank: Hero + Logo-Cloud (17 Logos) + 3 Case-Studies (kurz) + Stimmen (3 Reviews) + FAQ-2-Items + FinalCTA. Fertig.

### Blog/Magazin (`src/pages/Blog.tsx`, 1418 LOC + `BlogPost.tsx`, 1161 LOC)
User: „Magazin bsw ist irrelevant" — also bewusst klein halten.
Schlank: Hero (klein) + Featured-Post + Post-Liste (alle 10 Posts als Magazin-Liste) + Newsletter-Form (1 Zeile). Fertig.
BlogPost: Hero + FeatureImage + Body + Author-Box + 3 Related-Posts + CTA. Sticky-TOC + Drop-Cap raus.

### Kontakt (`src/pages/Kontakt.tsx`, 1944 LOC)
Aktuelle Sections: Hero · LogoMarquee · DreiKontaktwege · Kontaktformular · AntwortzeitenHeatmap (kreativ aber overkill) · ShowPlanerVorschlag · PullQuote · HäufigeAnliegen · StandortMap (SVG) · VertrauenStrip · FinalCTA. **Zu viel.**
Schlank: Hero (klein) + Kontaktformular (das ist die Hauptsache!) + 3 Kontaktwege (Email/Telefon/WhatsApp als Icon-Buttons) + Footer-CTA. AntwortzeitenHeatmap + StandortMap-SVG raus.

### Magic Dinner Summer Edition (`src/pages/MagicDinnerSummerEdition.tsx`, 1000+ LOC, NEU)
Aktuelle Sections: Hero (dark) · AblaufSection (4-Schritte mit Tipp-Sidebar) · WannWoSection · ReservierungsSection (3 Channels + Formular) · WasErwartetSection (6 Items) · FAQSection (8 Items) · WeitereEditionenSection · FinalCTA. **Zu viel.**
Schlank: Hero · Ablauf-4-Schritte (kompakt, ohne Tipp-Sidebar) · Wann/Wo (1 Karte) · Reservierungs-Form · FAQ-3-Items · FinalCTA. Fertig.

### Stadtseiten (`src/pages/StadtSeite.tsx`, 2200+ LOC Template)
20 Sections pro Stadt aktuell. User hat dazu nichts explizit gesagt aber vermutlich auch zu viel. **Prüfen**: vielleicht alle Sub-Sections wie Garantien/AnreiseVerfuegbarkeit/MagicDinnerStadt/Locations als 1 zusammenhängender Editorial-Body statt 20 einzelner Sections.

---

## 5 · BEISPIEL-REGEL — WAS DU ZUSÄTZLICH FINDEN MUSST

User nennt oft Beispiele aber meint das ganze Pattern. Hier was er bereits genannt hat + wo du proaktiv suchen sollst:

| User-Beispiel | Wo du suchen musst |
|---|---|
| „magazin bsw ist irrelevant" | Logo-Bauchbinde auch raus von: Blog, BlogPost, FAQ, Kontakt, Tickets, Impressum, Datenschutz, AGB ✅ (war erledigt) |
| „bei tickets, presse, referenzen, magazin, FAQ" | Alle Sub-Pages schlanker (siehe §4) |
| „die ganzen glow effekte" | ALLE radial-gradients + box-shadows + drop-shadows + blur-3xl |
| „in widgets mockups sections, buttons, hero, header usw" | Buttons (Submit/CTA), Cards (Glass), Heros (Bokeh+Glow), Hovers (scale+shadow), Photo-Filter |
| „in hero in header in menü in footer in unterseiten in überschriften" | SERIF_ITALIC suchen in: Navigation Header-Dropdowns, Footer-Lines, Resume-Banner, Show-Planer-Modal, Chatbot, ALLEN H2-Subs, Eyebrows |
| „immer wenn ich bsw oder beispiel sag dann ist deine aufgabe mehr zu finden" | **Selbstreflexiv** — bei jedem zukünftigen „bsw" muss Agent vergleichbare Stellen finden |
| „dieses serif schrift" (auf Hero/Header/Menü/Footer) | Suchen ob noch andere Components SERIF haben: PageLayout, EngagementPopup, alle Modals, alle Mini-Components |

---

## 6 · ECHTE INHALTE (NICHT ERFINDEN)

### Person & Karriere
- **Emilian Leber**, geboren **2008** (User-Korrektur)
- Wohnort: **Regensburg**, Bayern
- Email: **el@magicel.de** (NIE `hello@`)
- Telefon: **+49 15563744696**
- Anfahrtsgebiet: Bayern primär, deutschlandweit

### Stationen
- **8 Jahre alt (2016)** → erste Tricks
- **12 Jahre alt (2020)** → erster bezahlter Gig
- **2023** → erste abendfüllende Show, **Greatest Talent Finalist**
- **2024** → Talents of Magic Finalist + Kreativpreis, Deutsche Jugendmeisterschaft Top 30, **TVA-Interview mit 16** (NICHT „eigene TV-Sendung mit 21", User-Korrektur)
- **2025** → vollberuflich
- **2026** → **Plötzlich Magie** Tour-Premiere am **22.02.2026 in der Alten Mälzerei Regensburg** (NICHT Wald & Wiese, User-Korrektur)

### Zahlen
- **5,0 ★ · 30+ Bewertungen** (ProvenExpert + Google)
- **200+ Events** seit 2016
- 100+ Hochzeiten · 100+ Firmen-Engagements · 80+ Geburtstage · 100+ Close-Up · 10+ Magic Dinners

### Echte Reviews (NUR diese 3)
1. **Jan von Lehmann** — Firmenfeier · 200 Gäste · Versicherungs-Konzern (VKB Magic Camp)
2. **Katrin Raß** — Hochzeitsplanerin
3. **Martina Senftl** — Eventkundin

### Echte Logos (in `/public/logos/`, 17 Stück)
HEIM & HAUS · STRABAG · VKB · XXXLutz · Sixt · Sparkasse · Schneider Weisse · Wald & Wiese · Stadt Regensburg · Oktoberfest · Turmtheater · Steinhofer · **DPSG (Auftritt war in der Alten Mälzerei!)** · Drying Little Tears · Business Entertainment · Wächter · Greatest Talent

### Echte Case-Studies (User-bestätigt)
1. **Magic Camp** (VKB-Konzern) · 200 Gäste · Ingolstadt-Nähe · Workshop+Pitch+Vertrag+Briefing
2. **STRABAG** · 80 Gäste · Regensburg-Weihnachtsfeier · Bühne→Combo-Anpassung wegen Raumgröße

### Restaurant Wald & Wiese
- Hauspartner für Magic Dinner
- Adresse: Sinzing bei Regensburg
- Web: `restaurant-waldwiese.de`
- Tel: +49 941 9469770
- Email: info@restaurant-waldwiese.de
- **Magic Dinner Summer Edition: 11. Juli 2026, max. 50 Plätze**

### Sonstiges
- **TVA-Video-ID**: `R0_mXGxzC9E` (Source: `https://youtu.be/R0_mXGxzC9E`)
- **Idowa-Artikel**: `https://www.idowa.de/regionen/woerth-und-regensburg/regensburg/aus-kindertraum-wird-buehnenzauber-der-17-jaehrige-magier-emilian-leber-art-349796`
- **Portfolio-PDF**: `/portfolio/Emilian_Leber_Portfolio.pdf` (802 KB)

### NICHT ERLAUBT
- ❌ „Versicherung 5 Mio €" (User: gibt's nicht, nur „Berufshaftpflicht")
- ❌ „Gastro-Sohn. Bühnenkünstler." als USP (kein USP, nur in Magic Dinner als Story-Element ok)
- ❌ „Erste eigene TV-Sendung mit 21" (es war ein **TV-Interview mit 16**, also 2024)
- ❌ „Plötzlich Magie Premiere im Wald & Wiese" (es ist die **Alte Mälzerei Regensburg**)
- ❌ Englische Headlines („Plan smarter" etc.)
- ❌ Emojis als Deko in Production-Cards

---

## 7 · TECHNISCHE NOTES (Bugs die nicht wieder kommen dürfen)

### A) opacity-0 nach Scroll-Reveal-Bug
`useScrollReveal()` mit `isVisible ? "animate-fade-up" : "opacity-0"` auf Container mit Höhe > 4000 px triggert nie → Content unsichtbar. **Lösung**: Content immer visible, animate-fade-up nur add-on. Pattern in 193 Stellen gefixt (`cabbd67`), aber **prüfe bei neuen Sections**.

### B) SWC bricht bei deutschen „..." in JS-Strings
```ts
body: "Ein Text mit „Anführungszeichen" innen."  // BRICHT BUILD
body: "Ein Text mit [Anführungszeichen] innen."  // OK
```
**Vor jedem Commit**: `grep '„' src/pages/*.tsx | grep -v '^.*: *>'` (JSX-Content ist OK).

### C) Stale-Chunk nach Vercel-Deploy
`main.tsx` hat Auto-Reload-Mechanism via `vite:preloadError` + 30s-Throttle. Funktioniert. Falls Page weiß: → Stale Chunk → User reloadet.

### D) Hero-Headline NBSP-Spacing
JSX `{" "}` zwischen Hero-Word-Spans mit `display:inline-block` rendert manchmal ohne Space → „Zaubererin" statt „Zauberer in". **Fix**: `marginRight: "0.22em"` auf jedem Word-Span statt `{" "}`.

### E) Italic-Serif-Overflow in H2
Italic-Chars haben Char-Lean nach rechts → bei `col-span-7` Grid-Spalte überschießen sie in `col-span-5` Body. **Fix**: italic-Span auf eigene Zeile via `<br />` statt inline, ODER `paddingRight: "0.18em"` auf italic-Span.

### F) YouTube-iframe-Controls
Iframe-URL muss `?controls=1&modestbranding=1&playsinline=1&autoplay=1` haben damit Pause/Spulen funktioniert.

### G) Dark-Header-Logo-Lesbarkeit
Tailwind arbitrary `[filter:...]` wird von `brightness-0 invert` überschrieben. **Lösung**: inline `style={{ filter: "brightness(0) invert(1) drop-shadow(0 2px 6px rgba(0,0,0,0.8))" }}`.

---

## 8 · ARBEITSWEISE — wie du heißigen Schritt für Schritt vorgehst

### Schritt 1: Verschaffe dir Überblick
```bash
git log --oneline origin/main -20  # letzte Commits anschauen
wc -l src/pages/*.tsx | sort -rn | head -15  # Top 15 LOC-Pages
grep -rn 'SERIF_ITALIC' src/ | wc -l  # Italic-Stellen zählen
grep -rn 'rgba(154,38,64\|rgba(199,144,66' src/ | wc -l  # Glow-Stellen
grep -rn 'hsl(30,8%\|hsl(40,25%\|hsl(36,30%' src/ | wc -l  # Cream-Stellen
```

### Schritt 2: Globale Audits via Python
Patterns global ersetzen, **commit pro Pattern-Familie**:
- Commit A: Cream-Killer (alle hsl-Cream → neutral)
- Commit B: SERIF_ITALIC selektiv reduzieren (Eyebrows + Subs + Footers + Mini-Captions)
- Commit C: Glow-Killer (radial-gradients + box-shadows mit Burgunder/Amber)
- Commit D: Hero-Bokeh + Star-Pulse + Animation-Simplification
- Commit E: FAB-Konsolidierung (3 → 1)

### Schritt 3: Page-für-Page Schlankheits-Pass
- Reihenfolge: **Presse → Referenzen → Tickets → Kontakt → Blog → Magic-Dinner-Detail → StadtSeite-Template**
- Pro Page: Liste alle Sections, entscheide welche raus
- Behalte die ECHTEN Hauptpages (Index, Hochzeit, Firmenfeier, MagicDinner, etc.) substantiell — User hat die nicht moniert
- Push jeden Page-Refactor separat

### Schritt 4: Preview-Verify am Ende
Stadt-Page + Index + Buchung + FAQ live in Preview anschauen, screenshot-vergleich vor/nach.

### Schritt 5: Commit-Format
```
fix(scope): kurze Zusammenfassung

User-Quote: „..."

Was wurde geändert (mit konkreten Zahlen):
- Cream-BG: hsl(...) → hsl(...) (X Stellen)
- SERIF_ITALIC raus aus N Stellen (welche Pattern)
- Glow reduziert in N Stellen

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
```

### Schritt 6: NIE...
- Englische Headlines verwenden
- User-Action-Block am Ende der Antwort vergessen falls eine nötig ist
- Fragen statt liefern
- Kursiv-Italic in Eyebrows reaktivieren
- Cream-BG wieder einführen
- Glass-Cards neu bauen
- box-shadow Burgunder neu hinzufügen

---

## 9 · KONKRETE NÄCHSTE-AUFGABEN-CHECKLIST (Phase A)

1. **WhatsApp-FAB finden** — `grep -rn 'whatsapp\|WhatsApp' src/components/` — entscheiden ob in Chatbot integriert oder separat. Wenn separat: 3 FABs konsolidieren zu 1 mit Click-Expand-Menü.
2. **Cream global eliminieren** — alle `hsl(30,8%,98.5%)` → `hsl(0,0%,98%)` ODER weiße BG mit subtilem Border. Plus Cream-Hero auf FAQ/Kontakt/Datenschutz (alte Pages mit `CREAM = "#f5ecdc"`).
3. **SERIF_ITALIC global reduzieren** — strikter Audit:
   - Alle `${SERIF_ITALIC}` Verwendungen mit grep listen
   - Behalten: nur ein einziges Italic-Wort pro H1/H2 in Hauptpages
   - Raus aus allen Sub-Components, Modals, Footers, Headers, Captions
4. **Glow-Killer** — alle `radial-gradient` mit Burgunder/Amber Color → opacity < 0.04 oder ganz raus
5. **Hero-Bokeh raus** — `BOKEH = [...10 Particles...]` Array auf 0 oder 3 reduzieren
6. **Box-Shadow-Burgunder raus** — alle `rgba(154,38,64,...)` in `box-shadow` durch `rgba(0,0,0,0.06)` ersetzen
7. **Glass-Cards auflösen** — alle `backdrop-blur(40px) saturate(200%)` → solid white card mit `border: 1px solid foreground/10`
8. **Page-Schlankheit** (Reihenfolge):
   - `Presse.tsx` (2112 → ~600 LOC)
   - `Referenzen.tsx` (1816 → ~700 LOC)
   - `Tickets.tsx` (2300 → ~700 LOC)
   - `Kontakt.tsx` (1944 → ~500 LOC)
   - `Blog.tsx` (1418 → ~400 LOC) + `BlogPost.tsx` (1161 → ~500 LOC)
   - `MagicDinnerSummerEdition.tsx` (1000+ → ~500 LOC)

---

## 10 · WICHTIGE PFADE & FILES

```
# Repo-Root
/Users/emilianleber/magicelde

# Worktree (hier arbeitest du)
/Users/emilianleber/magicelde/.claude/worktrees/sweet-shockley-ce7a5c

# Memory-Files (Auto-Memory, persistiert)
/Users/emilianleber/.claude/projects/-Users-emilianleber-magicelde/memory/MEMORY.md
+ alle feedback_*.md + project_*.md

# Build-Test
npx vite build 2>&1 | tail -3

# Push
git push origin HEAD:main   # → Vercel deployt automatisch

# Preview-Dev-Server
.claude/launch.json hat `magicelde` Eintrag, Port 5199
Preview-Tools können laufenden Server reuse
```

---

## 11 · CHECKLIST VOR ENDE DEINER SESSION

- [ ] Cream/Beige ist komplett raus oder auf neutralgrau
- [ ] SERIF_ITALIC nur noch in Highlight-Words (max 1 pro H1/H2)
- [ ] Glow/Glanz unter 0.04 Opacity oder ganz raus
- [ ] 3 FABs → 1 FAB konsolidiert (oder in Header verschoben)
- [ ] Presse + Referenzen + Tickets + Kontakt + Blog drastisch schlanker
- [ ] Magic Dinner Summer Edition entschlackt
- [ ] StadtSeite-Template geprüft (eventuell auch schlanker)
- [ ] Build grün (`npx vite build`)
- [ ] Keine deutschen „..." in JS-Strings
- [ ] Live-Preview-Check auf Mobile + Desktop screenshoten und vergleichen
- [ ] Push auf `main`, Vercel deploy abwarten
- [ ] User-freundliche End-of-Session-Message: was gemacht, was offen

---

## 12 · TON-OF-VOICE in der Endgültigen Nachricht an User

Wenn du fertig bist, sag dem User **kurz**:
- Was du gemacht hast (1-2 Sätze)
- Welche Commits gepusht wurden
- Was noch offen ist (max 3 Bullets)
- Frage NICHT „passt das?" — er sagt von selbst „passt" oder schickt Korrekturen

---

**Viel Erfolg.** Der User hat nach 60+ Commits Geduld verloren. Er will Beruhigung, Klarheit, professionelles Design ohne KI-Schnörkel. Italic-Akzente sind erlaubt, aber sparsam. Editorial-Layouts sind erlaubt, aber nicht für jede kleine Sub-Page. Cream/Beige raus. Glow raus. **Konsolidiere, schlanker, neutraler.**

— Claude Opus (vorige Session)
