# magicel.de — Corporate Identity v3 (Frameblox-Editorial)

Verbindliche Design-Sprache, abgeleitet aus dem Magic-Dinner-Refactor.
**Ziel**: Frameblox-Editorial-Stil mit Dinner-Palette, glass-Touches und
scroll-aktivem Storytelling. **Regel**: jede Page nutzt die Bausteine,
aber baut 2-3 page-eigene Akzente ein. Nicht copy-pasten.

---

## 1 · Paletten (aus Bildwelt abgeleitet)

| Token | Hex | Verwendung |
|---|---|---|
| **Primär — Smaragd-deep** | `#0e3d2a` | dunkle Gradient-Cards, Magic-Dinner-Sakko-Echo |
| Primär — Smaragd-mid | `#1f5e3f` | hellerer Smaragd-Mix |
| Primär — Smaragd-soft | `#2a7a52` | Glow-Hint |
| **Sekundär — Amber-deep** | `#8a5a14` | Restaurant-Warm-Accent |
| Sekundär — Amber-mid | `#c79042` | Brass-Accent, Hover-Highlights |
| Sekundär — Amber-soft | `#f0d8a8` | Hero-Pastell |
| Sekundär — Cream | `#f5ecdc` | Tischwäsche-Off-White, Section-Backgrounds |
| **Tertiär — Burgunder-deep** `ACCENT_DEEP` | `#5c1622` | Dark Card Gradient |
| **Tertiär — Burgunder-mid** `ACCENT` | `#9a2640` | **DER Akzent.** Listen-Nummern, Active-States, Glass-Borders |
| Tertiär — Burgunder-soft | `#e4b8c0` | Pastell |
| Text-Primary | `hsl(260 15% 12%)` | nicht pures Schwarz |
| Text-Secondary | `text-foreground/65` | Body |
| Text-Tertiary | `text-foreground/45` | Eyebrows |
| Dark Hero BG | `#08060c` | Vollbild-Hero, Final-CTA, Black-Sections |

**Mono-Regel**: ein Gradient mischt nur EINE Farbfamilie (Cream→Amber, oder Smaragd-mono, oder Burgunder-mono). NIE Cream+Amber+Burgunder in EINEM Verlauf (= Bratensoßen-Look).

**Akzent-Regel**: Burgunder ist die EINE Akzentfarbe. Wenn etwas „heraussticht" — aktive Listenpunkte, italic-serif-Akzent in Headlines, Glass-Card-Border bei Selection, CTA-Submit-Buttons — dann Burgunder. Konsequent einsetzen, nicht alle Items rot machen.

---

## 2 · Typografie

```ts
// Fonts (in <Helmet> oder index.css preconnect)
'Inter Tight'         → font-display (Headlines, bold/black)
'Inter'               → default sans (Body)
'Instrument Serif'    → italic-Serif für Eyebrows + Headline-Accents
                        loaded via Helmet preconnect Google Fonts
```

Token zum Reuse: `const SERIF_ITALIC = "font-['Instrument_Serif',ui-serif,Georgia,serif] italic font-normal"`

### Skala

| Element | Klasse | Beispiel |
|---|---|---|
| Hero H1 | `text-[clamp(3rem,9vw,9rem)] font-black tracking-[-0.035em] leading-[0.95]` | „Zwischen Vorspeise und Dessert" |
| Section H2 | `text-[clamp(2.25rem,5.5vw,5.5rem)] font-black tracking-[-0.025em] leading-[1.02]` | „Vier Anlässe. *Ein Format.*" |
| Section H2 small | `text-[clamp(1.75rem,4vw,3.5rem)]` | „Bekannt aus." |
| Sub-H3 | `text-xl md:text-2xl font-bold leading-snug` | Card-Titles |
| Eyebrow italic | `SERIF_ITALIC text-lg md:text-xl text-foreground/55 mb-6` | „Das Konzept." |
| Body | `text-base md:text-lg leading-[1.65] text-foreground/65` | Section-Body |
| Pill-CTA | `text-[13px] tracking-[0.08em] uppercase font-semibold` | „Format-Finder →" |

**Headlines mit Italic-Serif-Akzent (Frameblox-Mark)**:
```jsx
<h2 className="font-display font-black ...">
  Tisch oder Bühne.{" "}
  <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
    Oder beides.
  </span>
</h2>
```
Italic-Akzent: am Ende der Headline, optional in Burgunder oder Cream-Amber.

---

## 3 · Section-Patterns (die immer wiederkehrende Bausteine)

### A · 2-Spalten-Frameblox-Header
```
LEFT (col-span-7): italic-eyebrow + grosse Headline mit serif-accent
RIGHT (col-span-5, optional pt-8): erklärender Body 1-3 Sätze, max-w-md
```

### B · 2x2 Cards mit Stagger (60/40)
```
Row 1: grid-cols-[3fr_2fr]  → colored card (60%) + clean widget card (40%)
Row 2: grid-cols-[2fr_3fr]  → clean widget card (40%) + colored card (60%)
Alle Cards: feste Höhe h-[320px] md:h-[380px] (NICHT aspect-ratio)
Colored cards: gradient bg, Title bottom-left, optional Pull-Quote
Widget cards: cream bg, generiertes Visual oben (Booking-Mock, Avatar-Cluster, Stat-Pill) + Text unten
```

### C · Scroll-Activated Timeline (Sticky-Photo)
```
LEFT (col-span-7): vertikale Timeline mit Number-Bubbles, Burgunder-fill-Line wächst
RIGHT (col-span-5, h-full): sticky photo mit Glass-Caption
IntersectionObserver per Phase: active = burgundy bubble + black text, inactive = grey
```

### D · Editorial-Split mit Glass-Foto
```
LEFT (col-span-6 or 7): Eyebrow + Big Headline + Body + Inline-Stat-Row
RIGHT (col-span-5 or 6): Foto h-[460-640px] mit zwei Glass-Cards (Stat oben rechts + Caption unten)
```

### E · Interaktiver Format-Selector (Tab-Style)
```
LEFT (col-span-5): klickbare Optionen mit 01/02/03 (italic-serif),
                   active hat burgundy left-border + scale + body expanded
RIGHT (col-span-7, sticky): Crossfade-Photo + Glass-Stat + Glass-Caption
useState für active, onMouseEnter + onClick wechseln Auswahl
```

### F · Press / Award Strip
```
2-Col Header oben, dann grid-cols-2 md:grid-cols-5 cards
Jede card: rounded-2xl + bg-foreground/[0.025] + border + Icon-Bubble in burgundy gradient + Bold-Name + italic-serif-Sub
```

### G · Logo Cloud (Kundenreferenzen)
```
KEIN Widget-Container. Grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6
gap-x-10 md:gap-x-14, gap-y-12 md:gap-y-16
img max-h-[80px] grayscale opacity-65 hover:opacity-100 hover:grayscale-0 hover:scale-105
```

### H · Final-CTA (Black Full-Bleed)
```
bg-black + radial-glow-blobs (burgundy + amber)
Massive Headline + Body + Pill-CTA (white on dark) + tiny disclaimer
```

---

## 4 · Component-Bausteine

### Hero (Vollbild Photo-Backdrop)
- min-h-screen
- Backdrop-Photo + dark-overlay-gradient (`linear-gradient(95deg, rgba(8,6,12,0.92)→0.28)`)
- Warm Amber-Glow oben-rechts (radial, opacity 0.28)
- Bokeh-Partikel-Layer (10 warme Lichtpunkte, langsam driftend)
- Content: Stars+Rating + Spezialgebiet-Badge + italic-eyebrow + word-by-word H1 + body + Pill-CTA + secondary-link
- Inline-Stats unten (kein Glass-Widget): tabular nums + ·-Separator
- Entrance: heroWordIn keyframes (translateY 56px + scale 0.96 + rotate −1.5° + blur 8px → 0), stagger 80ms pro Wort
- Star-pulse loop, Photo zoom-in 1.18 → 1.02 entrance
- Scroll-Parallax: photo translateY = scrollY * 0.22 (gedrosselt via rAF)

### Liquid Glass Card
Recipe (für Stat-Badges, Floating Captions, Wald-&-Wiese-Style):
```css
background: linear-gradient(155deg, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.18) 55%, rgba(255,255,255,0.08) 100%);
backdrop-filter: blur(40px) saturate(200%) brightness(115%);
border: 1px solid rgba(255,255,255,0.45);
box-shadow: 0 50px 100px -25px rgba(0,0,0,0.65),
            0 15px 35px -10px rgba(0,0,0,0.4),
            inset 0 1px 0 rgba(255,255,255,0.85),
            inset 0 0 0 1px rgba(255,255,255,0.12),
            inset 0 -1px 0 rgba(255,255,255,0.08);
```
Plus Top-Edge-Highlight (px line gradient), Chrome-Glare oben-links, Warm-Refraction-Spot unten-rechts (alle als pseudo-radial-blurs).

### Booking-Confirmation Widget (für clean Cards)
- White rounded-2xl Card, p-4 md:p-5
- Top: grüner Status-Dot + „BESTÄTIGT" + "#2024-XXX"
- Body: bold sans Title + italic-serif Datum
- Mini-Stepper (4 Schritte als h-1 Bars, ersten zwei burgundy)
- Footer: 60 Gäste + colored Tag (z.B. „Tisch + Bühne" in burgundy)

### Avatar-Cluster (für clean Cards)
- 5 Buchstaben-Avatars (12-14px), gradient-bg per Letter, white-3px-ring, überlappend `-space-x-3`
- Darunter: 5-Star Rating + tiny grey text mit „100+ Hochzeitsgäste begeistert"

### Custom Quiz (Magic Dinner Pattern)
- Section: pure white bg, max-w-5xl, no Frame
- Progress-Bar: 4 Segmente, burgundy gradient fills
- Question: italic-eyebrow + massive headline + hint
- Options: 2-3 oder 4 Cards, white/cream bg, border on select burgundy, scale 1.02 on select
- onClick → feedback toast „Gute Wahl ✨" + auto-advance nach 1.1s
- Final answer → confetti burst (CSS-only 36 particles, custom colors)
- Result: Empfehlung + Antworten-Tags + Inline-Formular (Name/Email/Datum/Nachricht) mit submit → `/buchung?prefill=...`

### Vertical Story Timeline (Sticky-Photo)
- IntersectionObserver per `<li>` mit rootMargin `-45% 0 -45% 0`
- activePhase state, fillPct = (active+1)/total * 100
- Background-line `bg-foreground/12`, Fill-line dynamic height burgundy gradient
- Number-Bubble: active = burgundy gradient + scale-1.08 + burgundy glow, inactive = grey
- Text colors transition 500ms: time→burgundy, title→full black, body→rgba(0,0,0,0.78)

### Karten-Fächer (Photo-Fan)
- 5 photos rotated -14°/-7°/0°/+7°/+14°, translateY by |tilt|*1.2, z-index based on |i-2|
- White 4px ring + soft warm shadow
- Soft Pastel (cream/amber mono) radial background

---

## 5 · Animation-Library (CSS-only)

```css
@keyframes heroWordIn { /* word-by-word reveal mit spring */ }
@keyframes heroFadeUp { /* fade + 24px up */ }
@keyframes heroZoomIn { /* photo entrance, scale 1.18 → 1.02 */ }
@keyframes heroOvershoot { /* spring overshoot, scale 0.88 → 1.04 → 1 */ }
@keyframes heroFloat { /* infinite -6px loop */ }
@keyframes heroStarPulse { /* scale 1 → 1.12, drop-shadow glow */ }
@keyframes heroBokehDrift { /* particle slow drift up + fade */ }
@keyframes confettiDrop { /* particle fall + rotate 720°, opacity in/out */ }
```

Easings: `cubic-bezier(0.16, 1, 0.3, 1)` (smooth) und `cubic-bezier(0.34, 1.56, 0.64, 1)` (spring overshoot).

Hover-Mikro-Interaktionen:
- Cards: `transition-transform duration-500 hover:-translate-y-1` + Shadow-Expand
- Photo-Container: `overflow-hidden` + `group-hover:scale-[1.04] transition-transform duration-[1400ms] ease-out`
- Pill-CTA: `hover:scale-[1.035] active:scale-[0.97]` mit spring-easing
- Icon-Cluster: `group-hover:scale-110`

---

## 6 · Page-Layouten — Pflicht-Reihenfolge

```
1.  <Hero>              vollbild dark + photo + bokeh
2.  <TrustStrip>        press/awards (5 items, burgundy icons konsistent)
3.  <KundenReferenzen>  echte Logos, NO Widget-Container
4.  <PullQuote>         black full-bleed, ein einzelner moment
5.  <KonzeptSection>    editorial split + glass-stat-card auf foto
6.  <WasDuBekommst>     3-Col-Features unter shared headline
7.  <FormatSelector>    interaktive Tab-Auswahl mit Crossfade-Photo
8.  <Ablauf>            typografische Zeit-Liste 4 Phasen
9.  <BeispielAbend>     scroll-aktive vertical Timeline + Sticky-Photo + Pull-Quote
10. <KartenFaecher>     5-Foto-Fan auf cream pastel
11. <QuizSection>       pure white, custom interaktiver Quiz mit Confetti + Inline-Form
12. <AnlaesseSection>   2x2 stagger (60/40) mixed Cards
13. <WaldUndWiese>      dark photo-bg + Glass-Restaurant-Card (extern verlinkbar)
14. <Stimmen>           3 Reviews mit Letter-Avatar + 5-Star
15. <ZahlenInline>      kompakte Stats-Zeile
16. <FAQ>               accordion, max-w-3xl
17. <FinalCTA>          black full-bleed mit radial glows + pill-CTA
```

**Pflicht für jede Page**: Hero, TrustStrip, KundenReferenzen, KonzeptSection, BeispielAbend, AnlaesseSection (Format-spezifisch), Stimmen, FAQ, FinalCTA.

**Optional + ROTIEREND** (so dass nicht jede Page identisch ist):
- KartenFaecher / FormatSelector / Quiz / 2x2 Card-Grid / Timeline — wähle 3-4 pro Page

---

## 7 · Per-Page-Empfehlungen (mit eigenen Twists pro Seite)

Diese Liste ist verbindlich für die nächste Welle Page-Refactors. Jede Page nutzt die CI-Bausteine + eigene Page-spezifische Akzente.

### **Index.tsx** — Startseite (Überblick aller Formate)
- **Hero-Variante**: nicht ein einzelnes Backdrop-Photo sondern **Photo-Mosaik** (3-4 kleine Fotos in einem Mosaik-Layout), zeigt alle Formate gleichzeitig
- **Format-Selector** als Hauptelement (Tisch / Bühne / Close-Up / Hochzeit / Firmenfeier) — DAS Interaktionselement
- Eigenständig: **„Welches Format passt zu deinem Anlass?"** als Mini-Quiz (3 Fragen → führt zu jeweiliger Format-Page)
- Stagger-Cards 2x2 mit den 4 Hauptformaten
- Wald-&-Wiese **NICHT** auf Index — gehört zu Magic Dinner

### **Hochzeit.tsx**
- **Hero**: Foto Brautpaar mit Konfetti
- **Eigenes Twist**: 3 vertikale Slot-Phasen (Sektempfang / Hochzeitsdinner / nach Mitternacht) als Story-Timeline mit IntersectionObserver — pro Phase ein eigener Format-Vorschlag
- **Anlass-Stagger-Cards**: Vorstellung der 3 Hochzeits-Formate (Close-Up beim Empfang / Tisch-zu-Tisch beim Dinner / Bühne vor Hochzeitstanz)
- **Stimmen**: nur Hochzeits-Reviews
- **Eigene Section**: **„30 Sekunden — was passt zu eurer Hochzeit?"** Hochzeits-spezifischer Quiz (mit Gästezahl / Location / Trauring-Effekt-Option)
- Wald-&-Wiese ersetzt durch: **„Eure Location, mein Setup"** mit Anforderungs-Checkliste

### **Firmenfeiern.tsx**
- **Hero**: Foto großes Publikum / Konferenz-Setting, dark professional Look
- **Format-Selector**: Vorstandsdinner / Kundenabend / Incentive / Mitarbeiter-Weihnachtsfeier
- **Eigene Section**: **„Industries served"** — Logo-Cloud wie auf Magic Dinner aber GROSS (12-15 echte Firmen-Logos)
- **Twist**: **„ROI-Rechner"** Mini-Widget (Anzahl Mitarbeiter × Engagement-Boost = Value) — verspielt aber sales-orientiert
- **Stimmen**: Vorstands-/B2B-Reviews
- **Bewertung-Widget** für Card 3 in 2x2 → **„Vorstand zückte Karten nach: 3 min"** als Counter
- Wald-&-Wiese ersetzt durch: **„Bringe Magic in eure Location"** mit Logistik-Liste

### **Geburtstage.tsx**
- **Hero**: Foto Geburtstagstafel mit Kerzen, warm
- **Eigene Section**: **„Geburtstags-Generator"** — wähle Alter (30/40/50/60/70+) → personalized Format-Empfehlung mit verschiedenen Tonalitäten
- **2x2 Cards**: Goldene Hochzeit / 50er / 70er / Kindergeburtstag-Variante
- **Twist**: **Memory-Lane-Section** — User gibt Anekdoten/Hobbys ein, sieht wie sie in Magic-Routine eingebaut werden (interaktiv)
- **Stimmen**: nur Geburtstags-Reviews
- Wald-&-Wiese leicht abgewandelt: **„Restaurants für Geburtstage in Bayern"** mit 3-4 Location-Empfehlungen

### **CloseUp.tsx**
- **Hero**: extreme Closeup mit Karten in Händen, dark dramatic
- **Eigene Section**: **„Hollywood-Sequenz"** — 5-Frame visuelle Step-by-Step-Anleitung wie ein Tisch-Trick abläuft (Frame-für-Frame mit Image OR SVG-Diagrammen)
- **Format-Selector**: 5-7 Min Tafel-Magie / Walk-Around-Empfang / Wedding-Party-Mix
- **Twist**: **„Effekt-Katalog"** — kleine Auswahl an Tricks (Karte verschwindet / Ring wandert / Mentalmagic) als 3-Spalten-Pattern
- **Stimmen**: Close-Up-Reviews mit kleinem Foto-Inset
- Custom Quiz für Close-Up Konfiguration (Dauer / Stil / Spezialeffekt)

### **Buehnenshow.tsx**
- **Hero**: Bühnen-Truss-Foto mit roten Lichtern
- **Eigene Section**: **„Drama-Kurve"** SVG-Visualisierung — wie eine Bühnenshow aufgebaut ist (Spannungsverlauf über die Show)
- **Format-Selector**: 15-Min Highlight / 30-Min Show / Abendprogramm 60+ Min
- **Twist**: **„Tech-Rider"** als Glass-Card (Beleuchtung / Sound / Bühne) — zeigt B2B-Professionalität
- **Stimmen**: Show-Bewertungen
- Quiz mit Bühne-spezifischen Fragen (Publikumsgröße / Anlass / Show-Dauer)

### **ComedyZauberei.tsx**
- **Hero**: Foto lachende Zuschauer, viel Bewegung
- **Eigene Section**: **„Lachzähler"** — animierte Stat-Karte mit „Durchschnitt 17 Lacher in 20 Min" Counter
- **Twist**: Split-Diptychon: links Zaubertricks, rechts Comedy-Sets — beide gleichberechtigt
- **Format-Selector**: nur Comedy / Comedy + Zauberei / pure Stand-Up
- Custom Quiz mit Humor-Stil-Fragen

### **Moderation.tsx**
- **Hero**: Foto roter Anzug auf TV-Stage
- **Eigene Section**: **„Show-Phasen"** als typografische Zeit-Liste (Begrüßung / Programm / Übergang / Verabschiedung) mit Min-Angaben
- **Format-Selector**: TV-Galas / Firmenpräsentationen / Award-Shows / Private Events
- **Twist**: **„Stimm-Sample"** Audio-Player Widget (Audio-Files vorhanden? sonst skip)
- Stimmen mit Veranstalter-Logos

### **UeberMich.tsx** — die persönlichste Page
- **Hero**: Studio-Portrait, ruhig, schwarz Hintergrund
- **Eigene Section**: **„Werdegang-Timeline"** — vertikale Timeline mit Jahreszahlen (8/12/2023/24/25), nicht Sticky-Photo sondern Sticky-Quote-Pull
- **Twist**: **„Drei Tools auf der Bühne"** — Karte / Münze / Buch als 3 Hero-Karten (kein Stagger)
- **Trust-Strip mit echten Stationen + Auszeichnungen** stark ausgebaut (Greatest Talent, Talents of Magic, etc.)
- **Stimmen**: 3 sehr persönliche Quotes
- **„Buche persönlich an"** Final-CTA: Foto Emilian + persönlicher Brief-Stil

### **Referenzen.tsx** — Hauptkundenliste-Seite
- **Hero**: minimaler text-only Hero („200+ Events seit 2015")
- **Logo-Cloud Hauptelement** — alle 17+ echten Logos, kein grayscale, groß und prominent
- **Eigene Section**: **Filter-System** (nach Branche / Art / Jahr) — interaktiv
- **Case-Study-Cards** für 3 Top-Referenzen: VKB · STRABAG · XXXLutz mit jeweils kurzer Story
- **Stimmen**: alle echten Reviews

### **Kontakt.tsx**
- **Hero**: NICHT vollbild — kleinerer Hero mit „Schreibe mir."
- **Hauptelement**: Custom Inline-Form mit allen Feldern (kein Quiz)
- **Twist**: **„Antwortzeiten-Heatmap"** — kleine Karte zeigt wann ich am schnellsten antworte (verspielt)
- **Wald-&-Wiese** Cards mit den 3 Kontakt-Wegen (Email / Telefon / WhatsApp) als Glass-Cards

### **FAQ.tsx**
- **Hero**: Frage-Style „Was wolltet ihr schon immer wissen?"
- **Eigene Section**: **FAQ als Tabs gruppiert** (Allgemein / Buchung / Technik / Preise) statt linear scroll
- **Search-Field** über den FAQs — JavaScript-Filter
- **„Frage nicht beantwortet? Hier fragen."** Mini-Form am Ende

---

## 8 · Anti-Patterns (vermeiden)

- ❌ Cream + Amber + Burgunder in EINEM Verlauf (Bratensoße)
- ❌ Riesige Counter-Zahlen (`text-[clamp(7rem,18vw,18rem)]`) — stattdessen inline tabular-nums
- ❌ Gradient-Bar oben auf jeder Card (`h-[2px]` top-strich)
- ❌ Icon-Bubbles in Card-Headers (lucide-icon in 48px Kreis mit Gradient-BG) — nur bei TrustStrip OK
- ❌ Avatar-Bubbles in Testimonials (große Kreise mit Initial) — verwende stattdessen Letter-Avatars 11px max
- ❌ Drei „dunkle Feature-Cards" in einem Grid
- ❌ Mehr als 4 Bilder pro Page als Hauptmotive (Karten-Fächer hat 5 ist OK weil ein Element)
- ❌ Gradient-Text in Eyebrows (nur in Hero H1 + max 1 weiterem Akzent)
- ❌ Emojis als Deko in Cards (raus)
- ❌ Studio-Portrait mit schwarzem BG auf bunten Gradients (sieht washed-out)
- ❌ Frameblox-Headlines in Englisch („Plan smarter. Focus better.") — alles deutsch und Magic-Dinner-kontextuell
- ❌ Aspect-Ratio + h-full Mismatch in Grid-Cards — verwende feste h-[XXXpx] auf allen Cards einer Reihe
- ❌ Quiz in Widget-Frame eingeklemmt — Quiz IST die Section

---

## 9 · Inhalt-Regeln (NICHT erfinden)

- **Echte Zahlen**: 5,0★ · 30+ Bewertungen · 200+ Events · 100+ Hochzeiten · 100+ Close-Up · 80+ Geburtstage · 10+ Magic Dinners · 24h Antwort
- **Echte Reviews** (nur diese 3):
  - Jan von Lehmann — Firmenfeier · 200 Gäste
  - Katrin Raß — Hochzeitsplanerin
  - Martina Senftl — Eventkundin
- **Echte Kunden-Logos** in `/public/logos/`: 17 Stück (HEIM & HAUS, STRABAG, VKB, XXXLutz, Sixt, Sparkasse, Schneider Weisse, Wald & Wiese, Stadt Regensburg, Oktoberfest, Turmtheater, Steinhofer, DPSG, Drying Little Tears, Business Entertainment, Wächter, Greatest Talent)
- **Echte Stationen** (Karriere):
  - 8 Jahre: Anfang Zauberei
  - 12 Jahre: erster bezahlter Gig
  - 2023: erste abendfüllende Show
  - Sep 2023: Greatest Talent · Finalist
  - 2024: Talents of Magic · Finalist + Kreativpreis
  - 2024: Deutsche Jugendmeisterschaft · Top 30
  - 2025: vollberuflich + TVA TV-Auftritt
  - 2026: „Plötzlich Magie — Magic Meets Comedy"
- **Wald & Wiese**: in **Sinzing** bei Regensburg, Restaurant-Hauspartner, URL `restaurant-waldwiese.de`
- **Region**: Bayern primär, deutschlandweit

**KEINE Preise** auf Pages. Anfrage über `/buchung`.

---

## 10 · SEO-Pflicht pro Page

```jsx
<Helmet>
  <html lang="de" />
  <title>[Page] — [Sub-Keyword] | Emilian Leber</title>
  <meta name="description" content="[155-160 char, mit primary keyword + Bayern/DE + 5,0★]" />
  <meta name="keywords" content="[10-12 keywords komma-separiert]" />
  <meta name="robots" content="index,follow,max-image-preview:large" />
  <link rel="canonical" href="https://www.magicel.de/[slug]" />
  {/* OG + Twitter Card komplett */}
  {/* JSON-LD: Service + Person-Provider + AggregateRating 5.0/30 + FAQPage + BreadcrumbList */}
  {/* Google-Fonts preconnect für Instrument Serif */}
</Helmet>
```

Plus: semantisches `<main>`, `<article itemScope itemType="https://schema.org/Review">` auf Review-Cards, Alt-Text mit Keyword auf allen `<img>`.

---

## 11 · Tonalität (Copy)

- **Du-Anrede** (B2C-Pages), Ihr-Anrede (Hochzeit, Firmen wenn Brautpaar/Team angesprochen)
- Sätze **kurz, szenisch, konkret** — keine Marketing-Floskeln
- **Italic-Serif-Phrasen am Ende von Headlines** für Akzent
- Story-Snippets statt Bullet-Points
- Konkrete Zeitangaben (5–7 Min, 19:00, 2,5 Stunden)
- **„Mutter hat geweint. Mehr Erfolg geht nicht."** als Tonbeispiel

---

## 12 · Tech-Checkliste pro Page-Refactor

- [ ] Helmet mit SEO + Schema vollständig
- [ ] Hero mit Bokeh + word-by-word + scroll-parallax
- [ ] 3-4 Section-Patterns aus Liste 3, rotierend
- [ ] **2-3 page-eigene Akzente** aus Liste 7
- [ ] Burgunder-Akzent konsequent (nicht überall)
- [ ] Mono-Gradient-Regel eingehalten
- [ ] Glass-Card-Recipe für Floating-Elemente
- [ ] IntersectionObserver für Scroll-Activation wo passend
- [ ] Hover-Mikro-Interaktionen
- [ ] **Keine Emojis** in Production-Cards
- [ ] Keine englischen Headlines
- [ ] Echte Inhalte (Zahlen, Reviews, Stationen)
- [ ] Mobile-first verifiziert
- [ ] `bun dev` startet ohne SWC-Syntax-Error (deutsche „..." nicht in JS-Strings!)

---

**Referenz-Implementierung**: [src/pages/MagicDinner.tsx](../src/pages/MagicDinner.tsx)
**Stand der Doku**: 2026-05-17 nach Vollausbau Magic Dinner.
