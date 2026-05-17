# Handover — magicel.de Website-Redesign

**Stand**: 2026-05-17, deployed Commit `27dd222` auf `main`.

Hi nächste KI. Du übernimmst das Redesign der gesamten magicel.de
Marketing-Seite. Magic Dinner ist fertig und live. Deine Aufgabe: die
restlichen Marketing-Pages auf das gleiche Design-Niveau heben, **ohne
einfach Sections zu kopieren**.

---

## Was bereits steht

- **[src/pages/MagicDinner.tsx](../src/pages/MagicDinner.tsx)** — die Referenz-Implementierung, ~3100 LOC
  - Live unter https://www.magicel.de/magic-dinner
  - 17 Sections im neuen Frameblox-Editorial-Stil
  - Custom interaktiver Quiz mit Konfetti + Inline-Formular
  - Scroll-aktive Story-Timeline mit Sticky-Photo
  - Liquid-Glass-Cards mit echtem backdrop-blur
  - Word-by-word Hero-Animation
- **[docs/CI_MAGICEL.md](CI_MAGICEL.md)** — die destillierte Corporate Identity v3
  - Paletten, Typo, 8 Section-Patterns, Component-Recipes, Animation-Library
  - **Sektion 7: Per-Page-Empfehlungen für 11 Pages** mit jeweils 2-3 page-eigenen Twists
  - Anti-Patterns, Inhalt-Regeln, SEO-Pflicht, Tech-Checkliste
- **[/public/logos/](../public/logos/)** — 17 echte Kunden-Logos (HEIM & HAUS, STRABAG, VKB, XXXLutz, Sixt, Sparkasse, Wald & Wiese, Stadt Regensburg, Oktoberfest, Turmtheater, …)

---

## Was als nächstes dran ist

Die folgenden Marketing-Pages müssen nach CI redesignt werden. Reihenfolge nach Impact (Content-Substanz × Traffic):

| Priorität | Page | Slug | Status |
|---|---|---|---|
| 1 | **Hochzeit** | `/hochzeit` | hat schon altes „neues Design", muss auf CI v3 |
| 2 | **Firmenfeiern** | `/firmenfeiern` | hat schon altes „neues Design", muss auf CI v3 |
| 3 | **Über-Mich** | `/ueber-mich` | echte Story-Substanz, dankbarste Page |
| 4 | **Index** (Startseite) | `/` | komplexester Refactor (alle Formate vereinen) |
| 5 | **Geburtstage** | `/geburtstage` | mittel-komplex |
| 6 | **Close-Up** | `/close-up` | spezifisch, mit Hollywood-Sequenz-Twist |
| 7 | **Bühnenshow** | `/buehnenshow` | mit Drama-Kurve-Twist |
| 8 | **Referenzen** | `/referenzen` | Logo-Cloud-fokussiert |
| 9 | Comedy | `/comedy-zauberei` | |
| 10 | Moderation | `/moderation` | |
| 11 | Kontakt | `/kontakt` | klein |
| 12 | FAQ | `/faq` | klein |

Für jede Page steht in `docs/CI_MAGICEL.md` Sektion 7 die **per-page Empfehlung mit 2-3 eigenen Twists** — daran halten, nicht 1:1 kopieren.

---

## Wie du vorgehst (pro Page)

### Vorbereitung
1. Lies **[docs/CI_MAGICEL.md](CI_MAGICEL.md)** komplett (das ist dein Bauplan)
2. Lies **[src/pages/MagicDinner.tsx](../src/pages/MagicDinner.tsx)** für Code-Patterns (Hero, Quiz, Sticky-Timeline, 2x2-Stagger, Liquid-Glass)
3. Lies die **bestehende Page** die du refactorst — was steht inhaltlich drin? Was sind die echten Stories/Fakten der Seite? Nicht erfinden, sondern was schon da ist neu inszenieren

### Beim Refactor
4. Halte die **Pflicht-Section-Reihenfolge** (CI §6) ein
5. Pick **3-4 rotierende Bausteine** zusätzlich (Format-Selector / Quiz / Karten-Fächer / Scroll-Timeline)
6. **Implementiere die 2-3 page-eigenen Twists** aus CI §7
7. Verwende den **bestehenden Color-Token-Block** + `SERIF_ITALIC`-Konstante aus MagicDinner.tsx — kopier die Tokens ans Seitenanfang oder zieh sie in `src/lib/design.ts` (TODO falls bei der dritten Page noch nicht raus-refactored)
8. **Schau die Page in `bun dev` an** — Port 5199 ist schon laufend (sonst `bun dev` neu starten)

### Verification
9. Mobile + Desktop screenshots via preview tools
10. Check Tech-Checkliste (CI §12) — vor allem **keine deutschen „..." in JS-Strings** (SWC bricht sonst, siehe Magic Dinner Bug-History)
11. Test alle interaktiven Elemente (Quiz-Click-Through, Format-Selector, Scroll-Animation)

### Push
12. Commit mit beschreibendem `feat([page-name]): …`
13. Push direkt auf `main`: `git push origin HEAD:main` (Vercel deployed automatisch)

---

## Was du NIE machst

- **Englische Headlines** verwenden ("Plan smarter. Focus better." war ein Bug)
- **Bratensoßen-Gradients** (Cream + Amber + Burgunder gemischt = ungenießbar). Mono pro Farbfamilie
- **Emojis in Production-Cards** als Deko
- **Studio-Portrait mit schwarzem BG auf bunten Gradients** mixen (sieht washed-out)
- **Zahlen erfinden** — alle stehen in CI §9
- **Reviews erfinden** — die 3 echten in CI §9
- **Preise auf Pages** — alle Anfragen über `/buchung`
- **Wald & Wiese auf ANDERE Pages** kopieren — gehört nur Magic Dinner. Andere Pages haben eigene Location-Sections (Hochzeit: „Eure Location, mein Setup", Firmenfeiern: „Bringe Magic in eure Location", Geburtstage: „Restaurants für Geburtstage in Bayern", etc.)
- **Magic Dinner Quiz auf andere Pages** kopieren — jede Page bekommt einen format-spezifischen Quiz mit anderen Fragen + anderem Result-Mapping
- **Aspect-Ratio + h-full Mismatch** in Grid-Cards (führt zu Höhen-Inkonsistenz, siehe Magic Dinner Bug-History) — feste `h-[320px] md:h-[380px]` auf allen Cards einer Row

---

## User-Verhalten (was er erwartet)

- **Visuell** sehr penibel, gibt Screenshots mit Notizen
- Mag **Frameblox-Editorial-Stil** stark (Headlines mit italic-serif Akzent, 2-Spalten-Header, Stagger-Layout)
- **Will keine Widget-Container** wo nicht nötig (z.B. Logos sollen frei stehen, Quiz soll die Section selbst sein)
- **Bestätigungs-Pattern**: er sagt „passt" wenn was passt. Sagt er nichts → noch nicht passt
- **Section-für-Section** durchgehen — nicht alles auf einmal anpacken
- Will **„cooler"** + **„imposant"** + **„coole highlights und coole bilder"** — Substanz statt Sparsamkeit
- Trifft **„autonomous"-Entscheidungen** — fragt nicht jede Kleinigkeit ab, soll selbständig liefern
- **Karriere-Branding**: Bayern + deutschlandweit, Magic-Dinner ist Spezialgebiet, Bühne + Close-Up = die zwei Hauptformate die durch JEDE Page durchgezogen werden müssen

---

## Tech-Setup

- **Repo**: https://github.com/emilianleber/magicelde
- **Stack**: React + Vite + Tailwind + TypeScript + React-Router
- **Deploy**: Vercel auto-deploy auf push to `main`
- **Worktree**: aktuell in `/Users/emilianleber/magicelde/.claude/worktrees/loving-hawking-3583af` auf Branch `claude/loving-hawking-3583af`. Direct-push zu main mit `git push origin HEAD:main` ist gangbar (kein Divergence aktuell).
- **Dev-Server**: `bun dev` auf Port 5199 (Magic-Preview-Tools können laufenden Server nutzen)
- **Font-Loading**: Instrument Serif kommt in jeder Page via Helmet Google Fonts preconnect — siehe Magic Dinner Hero
- **Auto-Memory**: zentrale Anweisungen in `/Users/emilianleber/.claude/projects/-Users-emilianleber-magicelde/memory/MEMORY.md` (memory wird automatisch geladen)

---

## Bekannte Bugs / Gotchas

- **Deutsche typografische Anführungszeichen („…")** innerhalb von JS-Strings (`"..."`) brechen SWC mit „Expected ',', got 'XYZ'". Workaround: in JSX-Text-Content (`>…<`) sind sie OK, in `"..."` String-Literals nicht. Alternativen: weglassen oder durch einfache Klammern `[...]` ersetzen.
- **`fetchPriority` prop** auf `<img>` triggert React-Warning (lowercase nicht erlaubt). Weglassen.
- **`bg-white/92`** (Tailwind opacity außerhalb der Standard-Skala) wird ignoriert. Nur 0,5,10,…,90,95,100 oder arbitrary `bg-white/[0.92]`.
- **`aspect-ratio` + `h-full`** in Grid-Cards führt zu Height-Mismatch. Lösung: feste Pixel-Höhe auf allen Cards einer Row.
- **`backdrop-filter`** wirkt nur wenn dahinter Variation ist — dunkler-überlagernder-Photo + zu opake Card-Bg = Effekt unsichtbar. Card-Bg-Opacity hoch genug (`0.18-0.38` statt `0.04-0.22`) und Photo darunter durchsichtig genug halten.

---

## Erste 3 Schritte für dich

1. **Lies** `docs/CI_MAGICEL.md` — vollständig
2. **Lies** `src/pages/MagicDinner.tsx` Hero + 2x2 Card-Grid + Quiz-Component — verstehe die Patterns
3. **Frag den User**: „Welche Page als nächstes — Hochzeit, Firmenfeiern oder Über-Mich? Hochzeit hat schon viel Substanz, Firmenfeiern ist B2B-strategisch wichtig, Über-Mich ist visuell dankbarst." Lass ihn entscheiden, dann leg los.

Viel Erfolg.
