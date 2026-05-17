# Handover — magicel.de Website-Redesign Session 2026-05-17 (Multi-Audience-Phase)

**Stand**: 2026-05-17, latest commit `b383662` (vor diesem Doc-Commit) auf `main`.

Hi nächste KI. Du übernimmst nach einer langen Session, in der wir bereits **9 Pages** komplett auf den neuen CI-v3-Stil refactored haben + **2 neue B2B-Pages** erstellt + **3 wiederverwendbare Komponenten** gebaut. Dieser Chat war so lang, dass wir in einem neuen weitermachen. Bitte lies erst die zwei wichtigen Vor-Dokus und dann diesen Stand:

1. **[docs/HANDOVER_WEBSITE_REDESIGN.md](HANDOVER_WEBSITE_REDESIGN.md)** — ursprüngliche Handover-Anleitung, Page-Prio-Liste, User-Verhalten
2. **[docs/CI_MAGICEL.md](CI_MAGICEL.md)** — Corporate Identity v3 (Tokens, Patterns, Per-Page-Empfehlungen)
3. **Dieses Doc** — alles aus der zweiten Session (was geändert wurde, was noch fehlt, was du beachten musst)

---

## ✅ Komplett fertig in dieser Session (deployed auf main)

### Pages refactored (alle MagicDinner-Hero + CI v3 + verkaufsoptimiert)

| Page | URL | Page-eigene Twists |
|---|---|---|
| **Startseite** | `/` | Konzept-Intro nach Hero, Format-Hub (Tab-Selector 3 Hauptformate), Anlässe 2x2 mit Booking-Mock-Widget + Cake-Candles-Widget (kein Foto!), Comedy-Section, Quiz Modal |
| **Hochzeit** | `/hochzeit` | Drei-Akte-Reportage (Sektempfang/Dinner/Tanz), Polaroid-Wall, Vertrauens-Vertrag mit Signature-Mockup, Location-Setup-Split (Cream vs Smaragd) |
| **Firmenfeier** | `/firmenfeiern` | Agency-Banner zwischen Hero+Anlässe, 4-B2B-Anlässe-Selector, ROI-Slider, Industries-Logo-Cloud GROSS, Vorstand-Counter ("3 Min."), **2 Case-Studies** (Magic Camp 200 Gäste + STRABAG 80 Gäste Regensburg), 4 B2B-Format-Optionen, 5-Step-Buchungs-Ablauf, FAQ |
| **Geburtstage** | `/geburtstage` | Alter-Generator (interactive pills 30er-Gold), Memory-Lane (3 Anekdoten→Tricks), Pull-Quote schwarz |
| **Close-Up** | `/close-up` | **Editorial-Layout** mit 5-Phasen-Ablauf links + Wahl-Trick-Beispiel-Card rechts (sticky), Effekt-Katalog (3 Familien) |
| **Bühnenshow** | `/buehnenshow` | Drama-Kurve SVG-Diagramm, Tech-Rider mit Mock-PDF-Card |
| **Magic Dinner** | `/magic-dinner` | Audience-Liste (5 Personas als breite Editorial-Zeilen), Restaurant-Partner-Section (Kooperations-Modelle), Ticket-Event-Section, alle bisherigen Sections + Wald & Wiese |
| **Moderation** | `/moderation` | Show-Phasen-Timeline mit alternierenden Karten (Begrüßung/Programm/Übergänge/Verabschiedung) |
| **Event-Agenturen** ⭐ NEU | `/event-agenturen` | Schnellangebot-Promise (8h), Schnittstellen-Section, Email-Mockup mit Anhang-Liste + "in 8 h"-Badge, 6 Vorteile-Liste (typografisch), Frame-Agreement-FAQs |
| **Messe-Magier** ⭐ NEU | `/messe-magier` | KPI-Hero mit XL "3×"-Stat, Editorial-Vorteile-Liste, 5-Step-Ablauf (Briefing→Routine→Stand-Walk→Übergabe→Recap), 4 Messetypen, **Messe-Woche-Timeline** (Mo-So Editorial statt Pricing-Cards) |

### Neue Komponenten

| File | Zweck |
|---|---|
| `src/components/landing/CustomQuiz.tsx` | Shared Quiz-Komponente mit Step-Feedback-Toasts ("Gute Wahl ✨"), Konfetti am Ende, Inline-Anfrage-Formular. Pro Page eigene config. |
| Update `Navigation.tsx` | Desktop solid Dropdowns mit Hover-Akzent (ArrowRight slidet rein, Border-Akzent), Mobile vollflächig fixed inset-0 mit Anlässe/Konzepte/Mehr-Sections + Trust-Strip |
| Update `Footer.tsx` | Cream-BG, italic-serif Spalten-Headings, Burgunder-Hover |
| Update `QuizWizard.tsx` | CI v3 Tokens (Burgunder statt Blau/Lila) für Trigger-Modal-Quiz |

### Memory-Files erstellt (User-Regeln die für ALLE zukünftigen Pages gelten)

Wichtige Regeln, die `/Users/emilianleber/.claude/projects/-Users-emilianleber-magicelde/memory/` gespeichert sind. Lies sie alle:

1. **`feedback_hero_konsistent.md`** — Hero auf ALLEN Hauptseiten identisch zu MagicDinner (left-aligned, Amber-Bokeh, word-by-word). Nur kleinere Unterseiten dürfen kleineren Hero haben.
2. **`feedback_format_balance.md`** — Close-Up UND Bühne IMMER gleichwertig erwähnen. Nie nur "Tischmagie" als Default. Beispiel: Hero-Eyebrow "Tisch und Bühne zwischen den Gängen" (nicht "Tischmagie zwischen den Gängen").
3. **`feedback_custom_quiz_animated.md`** — Jede Page mit Quiz nutzt `CustomQuiz`, pro Page eigene Fragen + Konfetti + Step-Feedback.
4. **`feedback_swc_quotes.md`** ⭐ **WICHTIG** — deutsche „..." innerhalb JS-Strings brechen SWC! Vor jedem Commit `grep '„'` machen, durch eckige Klammern `[...]` ersetzen.
5. **`feedback_autonomous_decisions.md`** — User will keine Auswahl-Fragen. Selbst entscheiden und liefern.
6. **`project_magicelde_2026-05-17_session2.md`** — 5 Buyer-Personas (Privat / Firmen / Agency / Messe / Restaurant)

### Quick-Fixes in dieser Session

- ✅ Email überall `el@magicel.de` (nicht `hello@`)
- ✅ Erfahrung: "10 Jahre seit 2016" (nicht "8 Jahre", nicht "seit 2017")
- ✅ Preise raus: keine Pakete-Preise, keine "ab X€"-Angaben in FAQs/Sections. Stattdessen "verbindliches Angebot nach Anfrage"
- ✅ NBSP global angewendet (Headline-Spaces sind non-breaking)
- ✅ Index Firmenfeier-Booking-Widget verkleinert (340→260px) + mehr Padding
- ✅ Magic Dinner + Hochzeit Pages: Close-Up + Bühne explicit balanciert

---

## ⚠️ Noch ZU TUN — explizit aus dieser Session

User hat in den letzten Messages explizit gesagt:

### A. Mehr Sections / Substanz auf bestehenden Pages

> "auf bühnenshow, close up sind viel zu wenige sections es braucht viel mehr informationen"

**Bühnenshow** (aktuell: Hero + DramaKurve + TechRider + Quiz + Stimmen + Trust + FAQ + CTA = 8 Sections) — User will **mehr**. Vorschläge:
- Format-Varianten-Section (Highlight 10-20 Min / Hauptshow 25-40 Min / Abendprogramm 45-60+ Min) mit konkreten Inhalten pro Variante
- Beispiel-Show als Editorial-Magazin-Story ("Wie eine 20-Minuten-Show aussieht" mit narrativer Beschreibung pro Phase)
- Show-Highlights / Effekt-Beispiele (3-4 Mentaleffekte / Bühnen-Routinen) — analog zu Close-Up's Effekt-Katalog
- Bühnen-spezifische Anekdote / Pull-Quote schwarz full-bleed
- "Wann passt eine Bühnenshow" — Anlass-Mix (Gala / Award-Show / Hochzeit-Vorprogramm / Firmen-Großevent)

**Close-Up** (aktuell: Hero + Ablauf + Effekt-Katalog + Quiz + Stimmen + Trust + FAQ + CTA = 8 Sections) — User will **mehr**. Vorschläge:
- Setting-Varianten (Sektempfang Walk-Around / Tisch-zu-Tisch beim Dinner / Stehtische am Ende des Abends)
- "Ein typischer Abend mit Close-Up" — Editorial-Story über einen realen Auftritt
- Trick-Repertoire-Bento (mit der Tisch-Wahl-Routine ergänzt um weitere Beispiele)
- Anlass-Mix-Section
- Pull-Quote schwarz

### B. Moderation expand + Kombi-Aspekt

> "viel zu wenige sektions auf moderations seite. auch mit kombination mit zauberei etc. comedy"

**Moderation** braucht:
- **Kombi-Section** "Moderation + Zauberei + Comedy" — wie die drei Disziplinen zusammenspielen, was den USP ausmacht (anderer Moderator kann nicht zaubern, anderer Zauberer kann nicht moderieren)
- Show-Beispiele aus realen Events
- Anlass-Matrix (Gala / Award / Hochzeit / Firmen / Comedy-Show)
- Tech-Rider auch für Moderation
- Comedy-Anteil-Slider/Visualizer

### C. Vercel-Deploy mehrfach gefehlt

User hat Screenshot mit Vercel-Error gezeigt (Commit `92dc636`). Ursache war deutsche „..." in JS-Strings (siehe SWC-Memory). Fixes wurden gepusht in `0b8b421`, `a97e1a6`, `f2a3ab1`. Aktueller `b383662` sollte sauber bauen. **Vor jedem Push selbst `npx vite build` lokal testen** falls möglich, oder mindestens `grep '„' src/pages/*.tsx` checken.

### D. Headline-Leerzeichen-Issue ist tricky

Header-Pattern `["Karten", "in"]` map'd mit `{w}{" "}` braucht NBSP (U+00A0). Mein globaler Python-Script hat das angewendet, aber bei NEUEN Files (Moderation) hat es nicht gegriffen. **Wenn du neue Pages schreibst**: direkt in der `.map()` `{" "}` mit NBSP nutzen (das `" "` zwischen den Quotes muss tatsächlich U+00A0 sein, nicht U+0020).

### E. Restliche Pages (noch nicht angefasst — original Stand)

- **Comedy-Zauberei** (`/comedy-zauberei`) — alter Stand, Refactor noch offen. User-Wunsch: Lachzähler-Stat + Split-Diptychon Zaubertricks/Comedy + Custom Quiz
- **Über-Mich** (`/ueber-mich`) — alter Stand. User-Wunsch: Werdegang-Timeline (8 Jahre alt Anfang, 12 J. erster Gig, 2023 Greatest Talent, 2024 Talents of Magic, etc.) + persönlicher Brief im Final-CTA + "Drei Tools auf der Bühne" (Karte/Münze/Buch) als Hero-Cards. **Achtung**: dort steht "seit 2017" — bitte fixen auf "seit 2016, zehn Jahre".
- **Referenzen** (`/referenzen`) — alter Stand. User-Wunsch: Logo-Cloud als HAUPTELEMENT (alle 17+ Logos GROSS, nicht klein), Filter-System (nach Branche/Jahr), 3 Top-Case-Studies (VKB/STRABAG/XXXLutz)
- **Blog/Magazin** (`/blog`) — Listing-Page, weniger dringend
- **Tickets** (`/tickets`) — Public-Show-Termine, weniger dringend
- **FAQ** (`/faq`) — Tab-Gruppierung + Search-Field nach CI §7
- **Kontakt** (`/kontakt`) — kleinerer Hero erlaubt, Custom Inline-Form
- **Presse** (`/presse`) — Pressemitteilungen, EPK
- **Impressum / Datenschutz / AGB** — legal pages, nur Style-Refresh
- **Stadtseiten** (`StadtSeite.tsx` template) — CI-Update

---

## 🔑 Kritische Regeln die du AB JETZT befolgen musst

### 1. Vor JEDEM Commit:

```bash
# 1. Suche deutsche „..." innerhalb JS-Strings (NICHT JSX-text-content)
python3 -c "
import re, glob
for f in glob.glob('/Users/emilianleber/magicelde/.claude/worktrees/clever-bhaskara-d00e8e/src/pages/*.tsx'):
  with open(f) as fh: src = fh.read()
  for m in re.finditer(r'\"[^\"\n]{0,250}„[^\"\n]{0,250}\"', src):
    print(f'{f}: {m.group()[:140]}')
"
# Falls Treffer: ersetze „...\" durch [...] in JS-Strings

# 2. Headline NBSP-Check  
grep -E '\? " " :' /Users/emilianleber/magicelde/.claude/worktrees/clever-bhaskara-d00e8e/src/pages/*.tsx | head
# Wenn `? " "` mit ASCII-Space gefunden → durch NBSP ersetzen
```

### 2. Auf JEDER Page

- **Hero** = identisches MagicDinner-Pattern (siehe MagicDinner.tsx lines 173-389 als Referenz)
- **CustomQuiz** statt QuizWizardInline auf neuen Pages
- **Close-Up + Bühne** beide explizit erwähnen (nicht nur eines als Default)
- **CI v3 Tokens** ACCENT=#9a2640, ACCENT_DEEP=#5c1622, AMBER_MID=#c79042, EMERALD_DEEP=#0e3d2a, CREAM=#f5ecdc
- **SERIF_ITALIC** const + italic-Akzent in Headlines
- **el@magicel.de** als Email (nicht hello@)
- **Keine Preise** auf Pages — alle Anfragen via `/buchung`
- **10 Jahre / seit 2016** (nicht 8, nicht 2017)
- **Kein Bubble-Widget-Spam** — User mag keine repetitiven Card-Grids mit Icon-Bubble + Title + Body. Stattdessen: Editorial-Layouts, asymmetrische Bento-Grids, Magazin-Listen, Photo-Mockups, SVG-Diagrams. **Wechsle das Section-Design oft.**

### 3. Bei neuen Pages — Page-eigene Twists einbauen

Aus CI v3 §7 (siehe `docs/CI_MAGICEL.md`):
- Comedy: Lachzähler-Counter + Split-Diptychon
- Über-Mich: Werdegang-Timeline mit Sticky-Quote + "Drei Tools auf der Bühne"
- Referenzen: Logo-Cloud-Hauptelement + Filter-System + Case-Study-Cards
- FAQ: Tab-Gruppen + Search
- Kontakt: Antwortzeiten-Heatmap (verspielt)

### 4. Section-Design-Vielfalt

**Avoid** auf neueren Pages:
- Mehr als 2 Card-Grids mit gleicher Struktur pro Page
- Identisches "Icon-Bubble + H3 + Body"-Pattern wiederholt
- Symmetrische 3-spaltige Card-Grids ohne Variation

**Statt dessen**:
- Asymmetrische 60/40 oder 5fr_7fr Splits
- Sticky-Sidebar mit scrollendem Content daneben
- Magazin-Lese-Listen (vertikale Story mit Trennlinien)
- Mockup-Photo-Cards (Email/Booking/Briefing als visueller Fokus)
- SVG-Diagrams (Drama-Kurve, Process-Flow)
- Pull-Quote schwarz full-bleed zwischen content-Sections
- Bento-Grids mit unterschiedlichen Card-Größen
- Foto-Diptychon links/rechts mit Text dazwischen

---

## 🎯 Empfohlene erste Schritte für dich

1. **Lies die 3 Doku-Dokumente** (HANDOVER, CI v3, dieses Doc)
2. **Lies alle 6 Memory-Files** unter `/Users/emilianleber/.claude/projects/-Users-emilianleber-magicelde/memory/`
3. **Prio 1**: Bühnenshow + Close-Up + Moderation expanden (mehr Sections, Substanz)
4. **Prio 2**: Über-Mich neu (mit Werdegang-Timeline + "seit 2016"-Fix)
5. **Prio 3**: Comedy-Zauberei neu
6. **Prio 4**: Referenzen + restliche Info-Pages

Pro Page: ~1500-2500 LOC, **kreative Section-Variation**, Custom-Quiz wo passend, **Hero immer MagicDinner-Pattern**, immer mit `grep '„'` check vor Commit.

Push direkt auf `main`: `git push origin HEAD:main` — Vercel deployed automatisch.

---

## 📊 Echte Inhalte (NICHT erfinden)

- **5,0 ★** · 30+ Bewertungen
- **200+ Events** · 100+ Hochzeiten · 80+ Geburtstage · 100+ Firmen-Engagements · 100+ Close-Up · 10+ Magic Dinners
- **24h Antwort** · Bayern + deutschlandweit
- **Echte 3 Reviews** (NUR diese):
  - Jan von Lehmann — Firmenfeier · 200 Gäste (VKB)
  - Katrin Raß — Hochzeitsplanerin
  - Martina Senftl — Eventkundin
- **2 echte Case-Studies** (User-bestätigt 2026-05-17):
  - Magic Camp · 200 Gäste · Versicherungs-Konzern nahe Ingolstadt · Workshop-Konzept + Pitch + Vertrag + Briefing
  - STRABAG · 80 Gäste · Weihnachtsfeier Regensburg · Bühne→Combo Anpassung wegen Raumgröße · Email/Telefon/vor-Ort mit Restaurant-Chef
- **Echte Stationen**:
  - 2016: Anfang Karriere
  - 8 Jahre alt: erste Tricks
  - 12 Jahre alt: erster bezahlter Gig
  - 2023: erste abendfüllende Show + Sep 2023 Greatest Talent (Finalist)
  - 2024: Talents of Magic (Finalist + Kreativpreis) + Deutsche Jugendmeisterschaft (Top 30)
  - 2025: vollberuflich + TVA TV-Auftritt
  - 2026: „Plötzlich Magie — Magic Meets Comedy"

**Email**: el@magicel.de
**Telefon**: +49 15563744696

---

## 🚀 Recent Commits Reference

```
b383662 feat(creativity): MD Audience + Messe KPI als Editorial-Layouts
f2a3ab1 feat(agenturen): VorteileSection kreativ neu — Email-Mockup
a97e1a6 fix: Email el@magicel.de + Preise raus + NBSP global + Close-Up-Sequenz neu
0b8b421 fix(messe): SWC-Bug — deutsche Anführungszeichen
92dc636 feat(magic-dinner): Audience-Klärung + Restaurant-Partner + Ticket-Section
f630816 feat(b2b): Event-Agenturen + Messe-Magier Pages + Year-Fix
eeb8c09 feat(multi): Firmenfeier-Expansion + Header-Refactor + Quick-Fixes
045f848 feat(geburtstage): Vollrefactor — Alter-Generator + Memory-Lane + Quiz
2657d4b feat(index): Intro + Widgets + Comedy + Custom-Quiz
34703ec feat(index): Startseite Vollrefactor — Format-Hub + verkaufsoptimiert
b78ba36 fix(quiz): CI v3 Tokens — Burgunder statt Blau/Lila
cc51698 fix(content): Close-Up + Bühne gleichwertig
a9d51fc fix(hero): NBSP zwischen Headline-Wörtern
b88abfb fix(hochzeit): Hero auf MagicDinner-Pattern angeglichen
4a578bd feat(hochzeit): Vollrefactor — verkaufsoptimierte Hochzeits-Page
27dd222 feat(magic-dinner): Frameblox-Editorial Vollrefactor + CI v3 Doku
```

---

Viel Erfolg! 🎩 Der User mag substanzielle Pages mit kreativen Section-Layouts und ist sehr penibel mit Details (Leerzeichen, Preise, Bilder vs Widgets). Be careful with German „..." in JS-strings (häufigster Bug-Trigger), check NBSP after each new Headline. Push frequent.

— Claude Opus (vorherige Session)
