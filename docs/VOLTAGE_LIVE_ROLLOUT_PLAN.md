# Voltage → Live-Rollout-Plan (alle ~870 Seiten)

**Branch `feat/voltage-rollout`.** Ziel: das neue Voltage-Design (siehe `/demo/*`) auf die ECHTE Seite ausrollen,
sodass alle Seiten das neue Design haben. **Kein Push/Deploy ohne Freigabe** — alles auf dem Branch, reviewbar.

## Wie die „700+ Seiten" entstehen (aus Audit)
Fast alles ist **template-generiert** — Rollout = ~6 Templates + ~10 handgebaute Seiten umstellen, NICHT 700 einzeln.
- `src/data/staedte.ts` — **110 Städte** (Array, keine DB).
- `StadtSeite.tsx` × 110 = **110 Stadt-Seiten** (`/zauberer/:stadt`).
- `ServiceStadtSeite.tsx` × 6 Services × 110 = **660 Service+Stadt-Seiten** (`/zauberer-hochzeit/:stadt`, `/magic-dinner-:stadt`, `/zaubershow-:stadt` …).
- `BlogPost.tsx`/`WissenSeite.tsx` — CMS-getrieben (~20–50).
- Rest: handgebaute Einzelseiten.

## Inhaltstiefe der echten Detailseiten (Benchmark — neue müssen das matchen!)
- **Hochzeit.tsx** (~1700 Z, 10 Sektionen): Hero (Video) · Drei Akte · **Polaroid-Wall** · **Format-Finder-Quiz (5 Fragen → 6 Empfehlungen)** · **Vertrauens-Vertrag (5 Versprechen + Briefing-Mockup)** · Location-Setup (4 Typen + „brauche/bringe") · Planerin-Quote (XL, dunkel) · Brautpaar-Stimmen · **Buchungs-Flow (4 Schritte, scroll-Progress)** · Trust-Strip (Awards).
- **Buehnenshow.tsx** (~1500 Z, 9 Sektionen): Hero · Drama-Kurve · Format-Varianten (4, inkl. Tonalität DAX vs Startup) · **Beispiel-Show-Rundown (Minute für Minute)** · Pull-Quote · Effekt-Highlights · Anlass-Mix · **Tech-Rider** · Stimmen.
→ User-Feedback „zu wenig erklärt" ist berechtigt: Demo-Detailseiten sind dünner. Neue Seiten brauchen diese Tiefe
  (Quiz, Beispiel-Rundown, Tech-Rider, Trust-Vertrag, Buchungs-Flow), aber im Voltage-Stil & NICHT überfüllt.
- **StadtSeite**: Hero „Zauberer in [Stadt]." · Warum-Stadt (Split) · Trust · 3 Formate (mit Stadt-Text) · **Stadt-FAQ** · CTA. = Startseite-light + Stadt-SEO. H1/Meta stark Stadt-lastig (25 Keyword-Varianten).

## Kreative Richtung (WICHTIG — vor Rollout fixen)
User: „zu unkreativ, zu viele runde Kachel-Widget-Grids". Vorbild = **Demo-Startseite + Anyfin + echte Live-Seite**.
→ Weniger 3-Karten-Icon-Grids (FactsGrid/GlassFeatures/FormatCards/ExampleSets/Bento als runde Tiles),
  mehr **editorial/foto-getrieben/full-bleed** (wie StartDemo Warum-Karussell, Polaroid-Wall, Quiz, Beispiel-Rundown).
  Inhalt der FormatCards/ExampleSets BEHALTEN, aber editorialer präsentieren. Nicht überfüllen.

## Phasen
1. **Kreativ-Direction lock**: Detailseiten content-reich + editorial machen (Quiz, Beispiel-Rundown, Trust-Vertrag, Polaroid, Tech-Rider als Voltage-Komponenten). Startseite +1–2 Sektionen (mehr Testimonials/Text — andere Zauberer ansehen).
2. **City = Homepage-Stil + Stadt-SEO**: `/demo/zauberer-regensburg` ist Vorlage (jetzt mit FAQ + Region-Links). Datengetrieben für 110 Städte.
3. **Gaps bauen** (noch KEINE Demo-Version): FAQ, Presse, Tickets, Blog/BlogPost, Wissen, Impressum/Datenschutz/AGB, ServiceStadtSeite.
4. **Live-Rollout**: pro Live-Template/Seite das Voltage-Layout einsetzen (VoltageShell + Sektionen). Reihenfolge: Templates zuerst (StadtSeite, ServiceStadtSeite → 770 Seiten), dann Einzelseiten. `noindex` entfernen wenn live. **Erst nach Design-Freigabe.**

## Gaps (kein Demo-Äquivalent)
Blog, BlogPost, FAQ, Presse, Tickets (+ SummerEdition), Wissen, Impressum, Datenschutz, AGB, ServiceStadtSeite, StadtSeite-Template (datengetrieben), Danke.
