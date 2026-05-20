# SEO + AEO Master-Plan — magicel.de

**Ziel:** für jeden Suchbegriff rund um „Zauberer", „Magier", „Magic Dinner", „Close-Up" etc. in Bayern + DE auf Platz 1. Gleichzeitig in ChatGPT, Perplexity, Claude, Google AI Overview als **die** Antwort auftauchen.

**Stand:** 2026-05-20 · 11 Blog-Posts, 109 Stadt-Seiten, gute Heros, vollständige Form-Pipeline.

---

## 1 · Aktueller Stand · Was IST schon gut

- **Domain-Struktur**: ~141 indexierbare URLs (sitemap.xml v2026-05-19).
- **Editorial-Heros**: jede Anlass-Page hat eigene H1, Trust-Strip, Stat-Strip, Featured-Image.
- **Stadt-Seiten**: `/zauberer/:stadt` für 109 Bayern/DE/AT-Städte mit eigenen Headlines + Locations.
- **Magazin/Blog**: 11 Posts mit Editorial-Sektionen (Heading/Quote/List/Callout) — Long-Tail-Potenzial.
- **Daten-Authentizität**: 17 echte Logos, 3 echte Reviews, echte TV-Stationen.
- **Performance**: Vite Build, lazy-loaded Routes, optimierte Bilder.
- **Form-Pipeline**: alle Lead-Capture-Forms hängen jetzt an Resend (über Supabase). DSGVO-konformes Unsubscribe.
- **JSON-LD**: rudimentär vorhanden (Blog-Schema, Person, LocalBusiness teilweise).
- **Mobile-Optimierung**: viele aktuelle Mobile-Fixes gemacht, Hero vertikal mittig, FAB-Menu funktional.

---

## 2 · Was FEHLT für #1-Position

### A) Technical-SEO (Foundation)

1. **JSON-LD Schema-Markup vollständig + valide** auf jeder Page-Sorte:
   - `Person` (Emilian Leber) auf /ueber-mich
   - `LocalBusiness` mit `areaServed: Germany` auf Index
   - `Event` JSON-LD auf MagicDinnerSummerEdition + jede zukünftige Show
   - `Service` für jedes Format (Hochzeit, Firmenfeier, etc.)
   - `Review` + `AggregateRating` ([itemReviewed: Person Emilian Leber]) — KRITISCH für Sterne in SERP
   - `FAQPage` auf /faq (Google zeigt FAQ-Snippets)
   - `BreadcrumbList` auf jeder Sub-Page
   - `WebSite` mit `SearchAction` (Google Sitelinks Searchbox)

2. **Sitemap-Audit + Refresh**:
   - Alle 109 Stadt-Seiten + Detail-Seiten + Blog drin
   - `lastmod`-Dates aktuell (für jeden Push automatisch)
   - Priority + ChangeFreq korrekt gewichtet
   - Submitten in Google Search Console + Bing Webmaster Tools

3. **robots.txt** prüfen:
   - `/admin/*` blockieren
   - `/api/*` blockieren
   - Sitemap-Link enthalten

4. **Core Web Vitals** (Google's neue Ranking-Faktoren):
   - LCP (Largest Contentful Paint) <2.5s — Hero-Image preload + WebP/AVIF
   - INP (Interaction to Next Paint) <200ms — Reduce JS bundle, defer non-critical
   - CLS (Cumulative Layout Shift) <0.1 — Image dimensions, font-display: swap
   - Test: PageSpeed Insights, jeden Push monitoren

5. **Hreflang** (auch wenn nur DE):
   - `<link rel="alternate" hreflang="de-DE" href="..."/>` auf allen Pages
   - Klare Default `<html lang="de">`

6. **Canonical-Tags** auf jeder Page (gegen Duplicate-Content durch URL-Params).

7. **Image-SEO**:
   - Alle Bilder mit beschreibendem Alt-Text + Filename (`emilian-leber-hochzeit-tegernsee-2025.jpg` statt `IMG_2342.jpg`)
   - WebP/AVIF mit JPG-Fallback
   - `width` + `height` Attribute für CLS-Schutz
   - `loading="lazy"` ausser Hero (`loading="eager"`)

### B) Content-SEO (Long-Tail + Authority)

1. **Keyword-Research-driven Pages**:
   - Bisher: Format-Pages (Hochzeit, Firmenfeier, etc.)
   - Fehlt: **Service+Stadt-Kombinationen** als eigene Pages
     - `/zauberer-hochzeit/regensburg` — separate Page mit hochzeits-spezifischen Stadt-Daten
     - `/zauberer-firmenfeier/münchen`, `/magier-firmenfeier/nürnberg`, etc.
     - Allein 5 Formate × 109 Städte = 545 zusätzliche Long-Tail-Pages
   - Pro Page: 600-1200 Wörter, eigene H1, lokale Trust-Signals (Locations vor Ort, Anfahrtsdaten)

2. **Magazin-Strategie ausbauen**:
   - Aktuell 11 Posts → Ziel 50+ im ersten Jahr
   - 1 Post/Woche minimum für Crawl-Frequenz-Signal
   - Topics nach Search-Intent-Clustern:
     - **Informational**: „Was kostet ein Zauberer?", „Wie buche ich einen Magier?", „Wie lange dauert eine Bühnenshow?"
     - **Comparison**: „Zauberer vs Comedian vs DJ", „Close-Up vs Bühnenshow"
     - **How-To**: „Hochzeitsplaner-Checkliste: Entertainment", „Firmenfeier-Programm gestalten"
     - **Location-bezogen**: „Top-Locations für Magic Dinner in Bayern", „Hochzeitslocations Tegernsee"
     - **Reviews/Case-Studies**: ausführliche Auftrittsberichte mit Bildern

3. **FAQ-Page massiv ausbauen**:
   - Aktuell ~30 FAQs — sollte 80+ sein
   - Jede FAQ als Snippet-fähig formatiert (Frage als H3, Antwort 40-60 Wörter mit Daten)
   - Häufige Long-Tail-Queries direkt beantworten

4. **Testimonials & Case-Studies erweitern**:
   - 3 echte Reviews → 20+ über Zeit sammeln (per ProvenExpert-Widget einbinden = direkt validiert)
   - Detaillierte Case-Studies pro Branche (Hochzeit/Firma/Privat) mit echtem Story-Arc

5. **Glossar/Encyclopedia-Section**:
   - Z.B. `/wissen/mentalmagie`, `/wissen/close-up-magie`, `/wissen/magic-dinner-konzept`
   - Definitions-Pages erobern „Was ist X?"-Queries

### C) Local-SEO (KILLER für #1 in jedem Ort)

1. **Google Business Profile** (vormals My Business):
   - Account anlegen für „Emilian Leber Zauberer" mit Hauptsitz Regensburg
   - Service-Area = ganz Deutschland (Mehrfach-Locations-Workaround)
   - Bilder, Posts, Reviews aktiv pflegen
   - Q&A-Bereich nutzen für FAQ-Migration

2. **Lokale Citations** (NAP-Konsistenz: Name, Address, Phone überall identisch):
   - Yelp, Gelbe Seiten, 11880, Hochzeitsportale (Hochzeitsplaza, weddingful, etc.)
   - Branchenverzeichnisse: Magier-Verbände, Eventportale
   - Locations-Partner-Verzeichnisse

3. **Stadt-Seiten anreichern**:
   - Echte Location-Empfehlungen pro Stadt (mit Adresse, Telefon, Link)
   - Lokale Anekdoten/Auftrittsdaten falls vorhanden
   - Anfahrtsdaten (Entfernung von Regensburg + Fahrzeit + Bahn-Anbindung)
   - Stadt-spezifische Bilder (auch lizenzfreie Skyline-Shots besser als nichts)
   - Lokale Schema: `LocalBusiness` mit `serviceArea` = jeweilige Stadt

4. **Wikipedia-Eintrag** (mittelfristig):
   - Sobald Reputation reicht (TV-Auftritte, Wettbewerbe, Tour) → Wikipedia-Stub auf Deutsch
   - Verlinkt zurück = massive Domain-Authority

### D) Backlink-Strategie

1. **PR/Erwähnungen**:
   - Pressemitteilungen zu jeder Tour/Special-Edition an lokale Medien
   - Idowa, MZ (Mittelbayerische Zeitung), Wochenblatt Regensburg, BR
   - Hochzeitsblogs, Eventblogs, Lifestyle-Magazine
   - Podcast-Auftritte (Branche: Hochzeit, Event, Entrepreneur)

2. **Partner-Verlinkungen**:
   - Wald & Wiese (haben schon Magic-Dinner-Page mit Bild) → Reverse-Link sicherstellen
   - Alte Mälzerei, Turmtheater, andere Locations → bei jedem Auftritt Link verhandeln
   - Hochzeitsplaner, DJs, Catering, Fotografen (Branchen-Vernetzung)

3. **Gast-Beiträge**:
   - Auf Branchen-Blogs Beiträge platzieren (Hochzeitsplaner-Magazine, Event-Mag)
   - Eigenes Wissen weitergeben → ankommende Links

4. **Verzeichnis-Einträge mit Backlink**:
   - Künstler-Verbände (z.B. Magischer Zirkel von Deutschland)
   - Event-Künstler-Verzeichnisse mit DoFollow

### E) Internal-Linking-Strategie

1. **Topic-Cluster-Modell**:
   - Pillar-Page: `/magic-dinner` (Hauptthema)
   - Cluster: `/blog/drei-sekunden-stille`, `/blog/magic-dinner-sommer-terrasse`, etc.
   - Pillar verlinkt alle Cluster, Cluster verlinken zurück zum Pillar
   - Gleich für Hochzeit, Firmenfeier, Close-Up

2. **Breadcrumbs überall**:
   - `Home > Magic Dinner > Summer Edition`
   - Mit JSON-LD `BreadcrumbList`

3. **Related-Content-Blocks** ausbauen:
   - Am Ende jeder Page 3-5 thematisch verwandte Pages (statt zufällige)
   - Algorithmischer Match auf tags + category

---

## 3 · AEO (Answer Engine Optimization)

Antwort-Maschinen (ChatGPT, Claude, Perplexity, Google AI Overview) funktionieren anders als klassische Suchmaschinen. Sie wollen:

### Strukturierte Antworten
- **Klare Frage-Antwort-Patterns**: jede FAQ-Antwort in den ersten 1-2 Sätzen vollständig
- **Definitionen am Anfang**: „Magic Dinner ist ein gastronomisches Format, bei dem ein Magier während eines Restaurant-Abends Close-Up-Magie direkt am Tisch der Gäste vorführt."
- **Zahlen + Fakten greifbar**: „Magic Dinner Summer Edition: 11. Juli 2026, Restaurant Wald & Wiese Sinzing, max. 50 Plätze."

### LLM-freundliche Markup-Patterns
- **Listen** (Ordered & Unordered) für Schritt-für-Schritt-Antworten
- **Tabellen** für Vergleiche (z.B. Close-Up vs Bühnenshow)
- **Code-Blocks für strukturierte Daten** (z.B. Preis-Bereiche, Anfahrtszeiten)
- **TL;DR-Sections** am Anfang langer Artikel

### Authoritative Signals
- **Über-Mich-Page als Trust-Source** (mit Vita, Auszeichnungen, Stationen)
- **Bylines** auf Blog-Posts (Author + Bio)
- **Quellen-Verlinkungen** (z.B. zu echten Reviews bei ProvenExpert/Google)
- **Konsistente Terminologie** quer durch Site (Magic Dinner immer gleich definieren)

### Crawler-Zugang für LLMs
- **llms.txt** im Root (analog robots.txt aber für LLM-Crawler)
- Erlaube GPTBot, ClaudeBot, PerplexityBot, GoogleOther
- Definiere wichtigste Pages explizit

### Dialog-fähige FAQ
- Conversational Tone in FAQ-Antworten (statt SEO-Phrasen-Optimierung)
- Natürliche Sprache, wie sie ein Mensch formulieren würde
- Format: „Frage. — Antwort in 2-3 Sätzen mit konkretem Detail."

---

## 4 · Roadmap · Reihenfolge

### Phase 1 · Foundation (Woche 1-2)
1. JSON-LD Schemas komplett auf allen Pages
2. Sitemap automatisch generiert + bei Google Search Console + Bing einreichen
3. robots.txt + llms.txt sauber
4. Google Business Profile aktivieren
5. Image-SEO-Audit (Alt + WebP)
6. Core Web Vitals Audit, kritische Issues fixen

### Phase 2 · Content-Skalierung (Woche 3-8)
7. **Service+Stadt-Kombinations-Pages bauen** (das ist der GROSSE Hebel)
   - Generator-Script: pro Format × Stadt eine Page mit Template + lokale Daten
   - 5 Formate × 109 Städte = 545 zusätzliche Pages
   - Jede unique durch lokale Locations, Anfahrtsdaten, lokale Anekdoten
8. FAQ-Page auf 80+ Fragen ausbauen
9. Blog wöchentlich neuer Post (Topic-Cluster-Strategie)
10. Testimonial-Sammlung systematisieren (ProvenExpert-Widget + eigene Datenbank)

### Phase 3 · Off-Site & Local (Woche 6-12)
11. NAP-konsistente Citations in 20+ Verzeichnissen
12. PR-Outreach für lokale Medien-Coverage
13. Partner-Backlinks (Wald & Wiese, Locations, Hochzeitsplaner)
14. Gast-Beiträge auf 3-5 Branchen-Blogs

### Phase 4 · Authority + AEO (Woche 8+)
15. Wikipedia-Stub initiieren (sobald 3+ Medien-Erwähnungen)
16. Glossar/Wissens-Section für Definitions-Pages
17. Conversational FAQ-Refresh für LLM-Optimierung
18. Schema-Markup-Pflege fortlaufend

---

## 5 · Reflexion · Kann das wirklich #1-Position überall bringen?

**Ehrliche Antwort: für viele Queries ja, für ALLE garantiert nein.**

### Wo es realistisch ist (#1 erreichbar):
- **Long-Tail-Stadt-Queries** wie „Zauberer Regensburg", „Magier Tegernsee Hochzeit", „Close-Up Bayern Firmenfeier" — Top-3 in 6-12 Monaten realistisch mit konsequenter Umsetzung. Wenig Konkurrenz, viele Queries.
- **Brand-Queries** „Emilian Leber", „Magic Dinner Sinzing", „Plötzlich Magie" — schon jetzt #1 oder werden es nach Indexierung.
- **Long-Tail-Magazin-Themen** „Drei Sekunden Stille Magie", „Magic Dinner was ist das" — über Blog-Posts dominierbar.

### Wo es schwer ist (#1 unrealistisch):
- **Generische High-Volume-Queries** wie „Zauberer buchen Deutschland" oder „Magier München" — hier dominieren etablierte Konkurrenten (Branchenverzeichnisse, große Agenturen, Magier mit 10+ Jahren SEO-Vorsprung).
- **Plattform-Konkurrenz**: Yelp, EventInc, Eventbrite, Hochzeitsplaza ranken oft vor einzelnen Künstler-Sites — diese sind kaum zu schlagen ohne riesigen Backlink-Aufbau.

### Was realistisch erreichbar ist (12-18 Monate):
- **#1 für Brand-Queries** + 5-10 Stadt-Service-Kombinationen in Top-3
- **Featured-Snippet-Reign** für 20-30 informational queries („Was kostet ein Hochzeitszauberer?")
- **Local-Pack-Position** für „Zauberer + [Stadt]" in 50+ Städten via Google Business Profile + lokale Citations
- **AEO-Sichtbarkeit**: in ChatGPT/Claude als zitierte Quelle für magic-dinner-bezogene Antworten
- **Realistisch DoFollow-Backlinks**: 30-80 in 12 Monaten bei aktiver Outreach

### Was IRREAL ist:
- „Bei JEDEM Suchbegriff der irgendwas mit Zauberer zu tun hat auf Platz 1" — das wäre selbst für Künstler mit 7-stelligem SEO-Budget unrealistisch. Es gibt zu viele Branchen-Aggregatoren, zu viel etablierte Konkurrenz, und Google rotiert ohnehin in den Top-3.

### Was die wahre Aufgabe ist:
**Nicht „überall #1" — sondern bei den Queries die Buchungen bringen, vorne sein.** Eine Brautmutter sucht nicht „Zauberer Deutschland", sondern „Hochzeitszauberer Tegernsee Empfang". Genau dort gewinnen wir mit:
1. einer Page die exakt diesen Use-Case bedient
2. echten Reviews + Trust-Signals
3. funktionierender Lead-Capture (was wir jetzt haben)

---

## 6 · Was DU als Operator/Owner machen musst

### Sofort
- [ ] Google Business Profile anlegen oder claim (Firma: Emilian Leber Zauberer · Adresse: Regensburg · Servicegebiet: Deutschland)
- [ ] Bing Webmaster Tools Account
- [ ] Google Search Console Account, Sitemap einreichen
- [ ] ProvenExpert-Widget richtig auf Site einbauen (mit Live-Reviews)

### Inhaltlich (über Zeit)
- [ ] Pro Auftritt 1-2 Sätze + Foto sammeln → speist Case-Study-Pipeline
- [ ] Bei jedem zufriedenen Kunden um Google/ProvenExpert-Review bitten
- [ ] Bei jedem Tour-Stop: Local-Press-Outreach (Stadt-Zeitung kontaktieren)

### Investitions-Entscheidungen
- Bezahltes Tool: **Ahrefs** oder **SEMrush** für Keyword-Research (99-199€/Monat) — sonst SEO ohne Daten
- **ProvenExpert Premium** (~30€/Monat) für mehr Bewertungs-Features
- Optional: einmaliges **technisches SEO-Audit** durch Profi (500-1500€) für initiale Foundation

### Was die Site selbst weiter braucht (Phase 2)
- Generator für die 545 Stadt-Service-Pages (Template + Daten-Combine)
- FAQ-Page von ~30 → 80+ ausbauen
- Wöchentlicher Blog-Post-Plan

---

## 7 · Realistisches Erfolgs-Bild

**Nach 6 Monaten:**
- 80+ Stadt-spezifische Long-Tail-Pages indexiert
- 20+ neue Blog-Posts (Topic-Cluster-Strategie)
- Google Business Profile aktiv, 30+ Reviews
- 30-50 DoFollow-Backlinks
- **#1 für Brand + 5-10 Stadt-Queries**
- **Featured-Snippets für 10-15 informational queries**

**Nach 12 Monaten:**
- 200+ neue Pages
- 50+ Blog-Posts
- 80+ Reviews
- 80-150 DoFollow-Backlinks
- **#1-3 für 20-30 Stadt-Service-Kombinationen**
- **Spürbare AEO-Präsenz** in ChatGPT/Claude/Perplexity
- **Wikipedia-Eintrag** (wenn Medien-Cover reicht)

**Nach 24 Monaten:**
- Domain-Authority spürbar > viele Wettbewerber
- Top-3-Ranking für die meisten kommerziell relevanten Queries in Bayern
- AEO-Quelle bei magic-dinner/zauberer-themen
- 200+ Reviews, mehrere Pressemitteilungen pro Jahr

Das ist kein „in 4 Wochen überall #1" — sondern eine konsequente, gut umgesetzte, ehrliche Roadmap zu **Marktführerschaft im Segment "Zauberer Bayern"**.

---

— Stand 2026-05-20 · Plan ist umsetzbar mit Disziplin, kostet primär Zeit, sekundär Tools-Budget (~300€/Monat).
