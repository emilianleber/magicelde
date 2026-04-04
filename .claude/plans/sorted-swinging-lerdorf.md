# CRM Restructuring Plan — Workflow-Optimierung

## Kontext

Das CRM hat aktuell **13+ Sidebar-Eintraege** verteilt auf 5 Kategorien. Anfragen, Events und Dokumente sind separate Seiten, obwohl sie immer zu einem Kunden/Vorgang gehoeren. Der Zauberer braucht einen einfachen, kundenorientierten Workflow: Anfrage rein → bearbeiten → Angebot → Buchung → Rechnung — alles an einem Ort.

**Kernprinzip: Ein Event ist eine gebuchte Anfrage.** Kein separates Konzept.

---

## 1. Neue Navigation (7 statt 13+ Eintraege)

```
VORHER:                              NACHHER:
─────────────────────                ─────────────────────
CRM:                                 Dashboard
  Dashboard                          Anfragen & Buchungen
  Anfragen                           Kunden
  Events          ← entfaellt        Kalender
  Kunden                             Dokumente
  Kalender                           Mein Programm
Kommunikation:                       Einstellungen
  Mails           ← in Dashboard
  Todos           ← in Dashboard
Finanzen:
  Dokumente
  Artikel         ← in Einstellungen
Produktionen:
  Effekte   ┐
  Pakete    │
  Shows     ├── "Mein Programm"
  Produktionen│
  Locations │
  Partner   ┘
System:
  Einstellungen
```

**Mobile Bottom-Nav:** Dashboard, Anfragen, Kunden, Kalender, Mehr (→ Dokumente, Mein Programm, Einstellungen)

---

## 2. Unified Status-Pipeline

Statt 2 getrennte Status-Systeme (Anfragen + Events) → **eine Pipeline**:

```
neu → in_bearbeitung → angebot_gesendet → gebucht → in_vorbereitung → durchgefuehrt → abgeschlossen
                                            ↗ (manuell buchbar)
Nebengleise: abgelehnt, storniert, archiviert
```

- Status aendert sich **automatisch**: Angebot senden → `angebot_gesendet`, Kunde akzeptiert im Portal → `gebucht`, Rechnung bezahlt → entsprechender Status
- Neue Spalte `unified_status` in `portal_requests` (bestehende Status-Felder bleiben fuer Kompatibilitaet)

---

## 3. Hauptseiten im Detail

### 3a. Anfragen & Buchungen (`/admin/bookings`)
- **Pipeline-Ansicht** mit Tabs: Alle | Neu | In Bearbeitung | Angebot | Gebucht | Durchgefuehrt
- Jede Zeile zeigt: Kunde, Datum, Anlass, Status-Badge, naechste Aktion
- Filter + Suche
- Button "Neue Anfrage" + "Neues Event" (fuer manuelle Buchungen ohne Anfrage)

### 3b. Booking Detail (`/admin/bookings/:id`) — DIE zentrale Seite
Layout in Sektionen:

```
┌─────────────────────────────────────────────────────────┐
│ ● Status-Pipeline-Bar (klickbar zum Aendern)            │
│ [Neu] → [In Bearb.] → [Angebot] → [Gebucht] → [Done]  │
├──────────────────────────┬──────────────────────────────┤
│ LINKS (2/3):             │ RECHTS (1/3):                │
│                          │                              │
│ Event-Details            │ Kunde                        │
│ - Datum, Uhrzeit, Ort   │ - Name, Firma, Kontakt       │
│ - Anlass, Format         │ - [Zum Kunden →]             │
│ - Gaeste                 │                              │
│ - Notizen                │ Schnellaktionen              │
│                          │ - Angebot erstellen          │
│ Dokumente (inline)       │ - Rechnung erstellen         │
│ - Angebote mit Status    │ - Nachricht senden           │
│ - Rechnungen mit Status  │ - Todo anlegen               │
│ - [+ Neues Dokument]     │                              │
│                          │ Paket / Show                 │
│ Zahlungen                │ - Zugewiesenes Paket         │
│ - Uebersicht bezahlt/    │ - [Paket zuweisen]           │
│   offen                  │                              │
│                          │ Todos                        │
│ Kommunikation            │ - Offene Aufgaben            │
│ - Timeline aller         │                              │
│   Nachrichten            │                              │
├──────────────────────────┴──────────────────────────────┤
│ Interne Notizen                                         │
└─────────────────────────────────────────────────────────┘
```

### 3c. Kunden-Detail (`/admin/customers/:id`)
- Kontaktdaten + Rechnungsadresse
- **Tabs**: Uebersicht | Anfragen & Buchungen | Dokumente | Kommunikation
- Uebersicht zeigt: alle offenen Vorgaenge, letzte Dokumente, naechstes Event
- Schnellaktionen: Neue Anfrage, Neues Dokument

### 3d. Mein Programm (`/admin/programm`)
- **Tabs**: Effekte | Pakete | Show-Konzepte | Locations | Partner
- Bestehende Seiteninhalte werden zu Tab-Komponenten extrahiert
- Produktionen werden vereinfacht oder in Show-Konzepte integriert

### 3e. Dashboard
- Pipeline-Widget (Anfragen nach Status)
- Naechste Events
- Offene Rechnungen + faellige Zahlungen
- Offene Todos (eingebettet, nicht separate Seite)
- Letzte Mails (eingebettet)

### 3f. Einstellungen (`/admin/settings`)
- Bestehende Settings
- **Neuer Tab**: Artikel-Stammdaten (von `/admin/artikel` hierher verschoben)

---

## 4. Datenbank-Aenderungen

### Neue Spalte in `portal_requests`:
```sql
ALTER TABLE portal_requests
  ADD COLUMN unified_status TEXT DEFAULT 'neu',
  ADD COLUMN paket_id UUID REFERENCES pakete(id),
  ADD COLUMN show_id UUID REFERENCES shows_intern(id);
```

### Sync-Trigger:
- Wenn `unified_status` auf `gebucht` wechselt → automatisch `portal_events` Eintrag erstellen/aktualisieren
- Wenn `portal_events.status` sich aendert (z.B. durch Kundenportal) → `unified_status` synchronisieren
- Bestehende Kundenportal-Queries auf `portal_events` bleiben funktional

### Kein Table-Merge:
`portal_events` bleibt bestehen fuer Rueckwaertskompatibilitaet mit Kundenportal, Dokumenten-FKs, Timeline, etc. Die UI abstrahiert einfach darueber.

---

## 5. Implementierungs-Reihenfolge (inkrementell, jede Phase eigenstaendig deploybar)

### Phase 1: Navigation + Routing
- `AdminLayout.tsx`: Sidebar auf 7 Eintraege reduzieren
- `App.tsx`: Neue Routen + Redirects fuer alte URLs
- Dateien: `AdminLayout.tsx`, `App.tsx`

### Phase 2: Pipeline-Listenseite
- Neue `AdminBookings.tsx` Seite mit vereinter Liste (Requests + Events)
- Status-Tabs, Filter, Suche
- Dateien: Neue `AdminBookings.tsx`, Services anpassen

### Phase 3: Booking Detail (groesste Aenderung)
- Neue `AdminBookingDetail.tsx` als zentrale Hub-Seite
- Pipeline-Bar Komponente
- Inline-Dokumente-Sektion
- Kunden-Panel, Todos-Panel, Zahlungs-Panel
- Dateien: Neue `AdminBookingDetail.tsx` + Subkomponenten

### Phase 4: Mein Programm
- Container-Seite mit Tabs
- Bestehende Seiteninhalte als Komponenten extrahieren
- Dateien: Neue `AdminProgramm.tsx`, bestehende Pages refactoren

### Phase 5: Dashboard + Kunden-Detail verbessern
- Todos + Mails als Widgets im Dashboard einbetten
- Kunden-Detail mit Tabs aufwerten
- Dateien: `AdminDashboard.tsx`, `AdminCustomerDetail.tsx`

### Phase 6: Einstellungen + Artikel zusammenfuehren
- Artikel als Tab in Einstellungen
- Dateien: `AdminSettings.tsx`

### Phase 7: Datenbank-Migration
- `unified_status` Spalte + Backfill
- Sync-Trigger zwischen requests und events
- Dateien: Neue Supabase-Migration

### Phase 8: Cleanup
- Alte Seiten entfernen (AdminEvents, AdminTodos als standalone, etc.)
- Redirect-Routen verifizieren
- Testen

---

## 6. Verifizierung
- Alle alten URLs (`/admin/events`, `/admin/todos`, etc.) redirecten korrekt
- Kundenportal funktioniert unveraendert (nutzt `portal_events` direkt)
- Pipeline-Status synchronisiert korrekt zwischen requests und events
- Dokumente koennen inline aus Booking-Detail erstellt werden
- Mobile Navigation funktioniert mit neuer Struktur
