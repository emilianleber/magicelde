# Voltage → Live-Rollout-Plan (alle ~700 Seiten)

**Branch `feat/voltage-rollout`.** Ziel: das neue Voltage-Design (siehe `/demo/*`) auf die ECHTE Seite ausrollen,
sodass alle Seiten das neue Design haben. **Kein Push/Deploy ohne Freigabe** — alles auf dem Branch, reviewbar.

---

## STATUS (Stand 2026-06-07)

### ✅ Demo-Prototyp fertig & verifiziert (Voltage = gewählte Richtung)
- Palette kühl: kein Beige/Creme (PAPER `#F4F6F9`, PANEL_BG `#EEF1F6`, CARD_LIGHT `#FFFFFF`).
- **WarumCarousel** („Sechs Gründe") ersetzt FlowBand/Bento auf ALLEN Detailseiten (keine Kachel-Widget-Grids mehr).
- **FAQ** auf allen 9 Format-/Anlass-Seiten (6 echte Fragen) + auf der Startseite.
- **Startseite +2 Sektionen**: „So läuft's ab" (4-Schritt-Ablauf) + FAQ.
- **Bilder**: jedes Bild max. 1×/Seite, keine Doppel, Crops gefixt (closeup `center 78%`, magicdinner-book `center 60%`),
  greatest-talent/talents-of-magic-team NICHT mehr verwendet.
- Alle /demo/* render-verifiziert (h1 da, keine Errors), tsc grün.
- Commits: `0cedf9f`, `a8f45bf`, `e2504be`.

### ⏳ Offen = der eigentliche Live-Rollout (groß, SEO-kritisch — siehe unten)

---

## ⚠️ KRITISCH: Design-Konflikt Live vs. Demo
Die **Live-Seite ist NICHT neutral** — sie ist im **„Frameblox-Editorial"-Stil**: Burgunder-Akzent `#9a2640`,
**Serif-Italic-Headlines** (Instrument Serif), Gold-Töne. Das ist GENAU der Look, den der User für Voltage verbietet
(Outfit-only, Cobalt, kein Serif/Gold/Burgunder). **Kein** Live-Page nutzt bisher Voltage.
→ **Entscheidung (autonom, da User „selbst entscheiden"): Voltage gewinnt.** Die ältere Frameblox-Editorial-Arbeit
  (u. a. Live-MagicDinner) wird durch die neuere, vielfach iterierte Voltage-Demo abgelöst. Live-Rollout = burgundy/serif → cool Voltage.

---

## Wie die „~700 Seiten" entstehen (aus Recon)
Fast alles ist **template-generiert** — Rollout = 2 Template-Engines + ~33 handgebaute Seiten, NICHT 700 einzeln.
- `src/data/staedte.ts` — **110 Städte** (Felder: `slug, name, region, intro, highlight, einwohner, bekannteLocations[], faq[], seoText, langText, kollegenEmpfehlung?`).
- `src/data/serviceFormats.ts` — **7 Formate** (Felder: `slug, name, routePrefix, detailHref, hero.metaTitle/metaDescription({stadt}), intro, highlights[], ablauf[], faqGlobal[], canonicalPrefix?`).
- **`StadtSeite.tsx`** (2.471 Z, **20 Sektionen**) × 110 = **110 Stadt-Seiten** (`/zauberer/:stadt`).
- **`ServiceStadtSeite.tsx`** (417 Z) × 5 Formate × 110 = **~545 Service+Stadt-Seiten** (`/zauberer-hochzeit/:stadt`, `/magic-dinner-:stadt`, `/zaubershow-:stadt` …; `canonicalPrefix` + Vercel-301 für Alt-URLs).
- `BlogPost.tsx` (~18) · `WissenSeite.tsx` (8) — CMS/Data-getrieben.
- ~33 handgebaute Einzelseiten unter `src/pages/` (Index, Hochzeit, Buehnenshow, CloseUp, MagicDinner, Firmenfeiern, Geburtstage, ComedyZauberei, Moderation, EventAgenturen, MesseMagier, Referenzen, UeberMich, FAQ, Kontakt, Buchung, Blog, Presse, Datenschutz, Impressum, AGB, Tickets, Danke …).

### StadtSeite-Sektionen (Render-Reihenfolge, alle stadt-substituiert):
Hero · WarumStadt · TrustStrip · Formate · HochzeitsmagierStadt · Anlaesse · FirmenzaubererStadt · AblaufBuchung ·
MagicDinnerStadt · PullQuote · InDerNaehe · Locations · Garantien · AnreiseVerfuegbarkeit · **CustomQuiz** · Stimmen ·
Video · FAQ · LangText · KollegenEmpfehlung · WeitereStaedte.

---

## 🔒 SEO-Preservation — NICHT verhandelbar (sonst Ranking-/Buchungs-Schaden)
SEO wird **build-time** injiziert: `scripts/seo-content.mjs` (rendert `<main>` + JSON-LD pro Route aus den Data-Files) +
`scripts/inject-meta.mjs` (699 prerendered HTML, title/desc/canonical/og). Helmet in den Templates setzt title/desc/canonical.
Beim Reskin GILT:
1. **Routen-URLs identisch** lassen (`/zauberer/:stadt`, `/magic-dinner-:stadt`, …). Keine Slugs ändern.
2. **Helmet-Block (title/desc/canonical/JSON-LD) unverändert** im Template behalten.
3. **Jeden stadt-/format-substituierten Textstring 1:1 übernehmen** (die `${data.name}`-Keyword-Sätze SIND der SEO-Wert).
   Nur Markup/Klassen/Komponenten tauschen — Text-Inhalt NICHT umschreiben/kürzen.
4. **Semantische Struktur erhalten**: genau ein `<h1>`, gleiche h2/h3-Hierarchie, alle internen `<Link>`s (Format-/Anlass-/Städte-Links).
5. **Data-Files-Felder nicht entfernen/umbenennen** (Felder hinzufügen ok). `keywordList()` behalten.
6. **canonicalPrefix-Logik** (`/magic-dinner-…`, `/zaubershow-…` kanonisch; alte URLs 301) muss weiter funktionieren.
7. **No-JS/AEO-Body** (`#root`-Static-Main aus seo-content.mjs) bleibt — nicht von Component-Änderung abhängig.

**Verifikation nach Konversion:** `npm run build` → `dist/` muss ~699 HTML haben; Stichprobe `/zauberer/regensburg`,
`/magic-dinner-muenchen`: `<title>`/`<meta desc>`/`<link canonical>`/JSON-LD vorhanden; No-JS-`<main>` mit h1/Absätzen/Links lesbar;
Text-Diff gegen alt = nur Markup, kein verlorener Keyword-Satz.

---

## Phasen
1. **✅ Kreativ-Direction lock** (Demo): Carousel + FAQ + Startseite-Sektionen + Bilder + kühle Palette — FERTIG & abgenommen-reif.
2. **Live-Templates konvertieren** (größter Hebel, ~655 Seiten):
   - `StadtSeite.tsx` → Voltage (20 Sektionen reskinnen; Vorlage: Demo `StadtRegensburg` + StartDemo. SEO-Text 1:1 behalten).
   - `ServiceStadtSeite.tsx` → Voltage (gleiche Regeln; canonicalPrefix beachten).
   - **Empfehlung**: pro Template ein dedizierter Agent mit FRISCHEM Kontext (die Files sind groß) + danach Build-Verify.
     Wegen SEO-Risiko bevorzugt in fokussierter Session, nicht am Ende eines langen Kontexts.
3. **Handgebaute Seiten konvertieren**: Index zuerst, dann Detail-/Anlass-/Trust-/Legal-Seiten auf VoltageShell + Sektionen.
   Inhaltstiefe der echten Seiten matchen (Quiz, Beispiel-Rundown, Tech-Rider, Polaroid, Trust-Vertrag) — als Voltage-Komponenten, nicht überfüllt.
4. **Gaps bauen** (kein Demo-Äquivalent): Presse, Tickets (+SummerEdition), Wissen, BlogPost, Legal (Datenschutz/Impressum/AGB), Danke.
5. **Go-Live**: `noindex` der /demo entfernen bzw. Voltage auf echte Routen schalten. **Erst nach Freigabe. Kein Deploy ohne OK.**

## Empfohlene nächste Aktion
Live-Rollout = großer, SEO-kritischer Eingriff in die umsatzrelevanten Seiten. Prototyp/Direction sind gelockt.
**Schritt 2 (StadtSeite + ServiceStadtSeite konvertieren) sollte als sorgfältige, build-/SEO-verifizierte Migration laufen**
(idealerweise fokussierte Session, frischer Kontext, ggf. Workflow mit einem Agent pro Template). Kein Deploy bis Freigabe.
