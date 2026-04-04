# CRM Restructuring Plan: Magician's Booking Management

## Executive Summary

Consolidate 13+ sidebar items across 5 categories into 7 focused items. The central change is unifying portal_requests and portal_events into a single pipeline view ("Anfragen & Buchungen") with one detail page that serves as the operational hub for all booking-related work.

---

## 1. New Navigation Structure

### Sidebar (7 items, no category headers)

| # | Label | Route | Icon | Notes |
|---|-------|-------|------|-------|
| 1 | Dashboard | `/admin` | LayoutDashboard | KPIs, pipeline summary, quick actions, embedded todos |
| 2 | Anfragen & Buchungen | `/admin/bookings` | MessageCircle | Unified pipeline: requests + booked events |
| 3 | Kunden | `/admin/customers` | Users | Customer list + detail page |
| 4 | Kalender | `/admin/kalender` | CalendarRange | Calendar (unchanged) |
| 5 | Dokumente | `/admin/dokumente` | FileText | Document list with type/status filters |
| 6 | Mein Programm | `/admin/programm` | Sparkles | Effekte-DB, Pakete, Show-Konzept-Builder |
| 7 | Einstellungen | `/admin/settings` | Settings | Settings + Artikel-Stammdaten |

### Mobile Bottom Nav (5 items)
Dashboard, Anfragen & Buchungen, Kunden, Kalender, Mehr (opens slide-in with Dokumente, Programm, Einstellungen)

### What disappears from sidebar
- **Events** (merged into "Anfragen & Buchungen")
- **Mails** (demoted: accessible via Dashboard widget + embedded in customer/booking detail pages)
- **Todos** (demoted: embedded in Dashboard + booking detail pages)
- **Artikel** (moved into Einstellungen as a tab)
- **Effekte, Pakete, Shows** (consolidated under "Mein Programm")
- **Produktionen, Locations, Partner** (consolidated under "Mein Programm" as sub-tabs)

---

## 2. New Page Structure

### 2.1 Routes to Add

```
/admin/bookings                    → UnifiedPipelinePage (replaces AdminRequests + AdminEvents)
/admin/bookings/:id                → UnifiedBookingDetail (replaces AdminRequestDetail + AdminEventDetail)
/admin/bookings/new                → replaces AdminNewRequest + AdminNewEvent
/admin/programm                    → ProgrammPage (tabs: Effekte, Pakete, Shows, Produktionen, Locations, Partner)
```

### 2.2 Routes to Keep (unchanged)

```
/admin                             → AdminDashboard (enhanced with embedded todos + mail widget)
/admin/customers                   → AdminCustomers (unchanged)
/admin/customers/:id               → AdminCustomerDetail (enhanced)
/admin/customers/new               → AdminNewCustomer (unchanged)
/admin/kalender                    → AdminKalender (unchanged)
/admin/dokumente                   → AdminDokumenteListe (unchanged)
/admin/dokumente/:id               → AdminDokumentDetail (unchanged)
/admin/dokumente/:id/bearbeiten    → AdminDokumentEditor (unchanged)
/admin/dokumente/new               → AdminDokumentEditor (unchanged)
/admin/dokumente/angebote          → AdminDokumenteListe (unchanged, filter variant)
/admin/dokumente/rechnungen        → AdminDokumenteListe (unchanged, filter variant)
/admin/dokumente/auftragsbestaetigung → AdminDokumenteListe (unchanged, filter variant)
/admin/dokumente/mahnungen         → AdminDokumenteListe (unchanged, filter variant)
/admin/settings                    → AdminSettings (enhanced with Artikel tab)
/admin/login                       → AdminLogin (unchanged)
/admin/passwort-setzen             → AdminPasswordReset (unchanged)
```

### 2.3 Routes to Remove (add redirects)

```
/admin/requests       → redirect to /admin/bookings?view=anfragen
/admin/requests/:id   → redirect to /admin/bookings/:id
/admin/events         → redirect to /admin/bookings?view=gebucht
/admin/events/:id     → lookup event → redirect to /admin/bookings/:requestId
/admin/new-request    → redirect to /admin/bookings/new
/admin/events/new     → redirect to /admin/bookings/new?status=gebucht
/admin/mails          → keep temporarily, hide from sidebar (accessible via URL)
/admin/todos          → keep temporarily, hide from sidebar (accessible via URL)
/admin/effekte        → redirect to /admin/programm?tab=effekte
/admin/pakete         → redirect to /admin/programm?tab=pakete
/admin/shows          → redirect to /admin/programm?tab=shows
/admin/produktionen   → redirect to /admin/programm?tab=produktionen
/admin/locations      → redirect to /admin/programm?tab=locations
/admin/partner        → redirect to /admin/programm?tab=partner
/admin/artikel        → redirect to /admin/settings?tab=artikel
/admin/documents/*    → redirect to /admin/dokumente (old route alias)
```

### 2.4 Pages to Create (new files)

| File | Purpose |
|------|---------|
| `src/pages/AdminBookings.tsx` | Unified pipeline list page |
| `src/pages/AdminBookingDetail.tsx` | Unified booking detail hub |
| `src/pages/AdminBookingNew.tsx` | Create new request/booking |
| `src/pages/AdminProgramm.tsx` | Tabbed container for Effekte/Pakete/Shows/Produktionen/Locations/Partner |

### 2.5 Pages to Eventually Remove (after redirects are stable)

AdminRequests.tsx, AdminEvents.tsx, AdminRequestDetail.tsx, AdminEventDetail.tsx, AdminNewRequest.tsx, AdminNewEvent.tsx, AdminEffekte.tsx, AdminPakete.tsx, AdminShows.tsx, AdminProduktionen.tsx, AdminLocations.tsx, AdminPartner.tsx, AdminArtikel.tsx

---

## 3. Unified Booking Detail Page Layout (AdminBookingDetail.tsx)

This is the most critical new page. It replaces both AdminRequestDetail and AdminEventDetail.

### 3.1 Visual Structure (top to bottom)

```
┌─────────────────────────────────────────────────────────────────────┐
│ ← Back to Pipeline          Booking #2024-042         [Actions ▼]  │
├─────────────────────────────────────────────────────────────────────┤
│                     STATUS PIPELINE BAR                             │
│  ● Neu → In Bearbeitung → Angebot gesendet → Gebucht →            │
│     Durchgeführt → Abgeschlossen                                   │
│  (clickable steps; current step highlighted; abgelehnt/storniert   │
│   shown as off-ramp badges)                                        │
├────────────────────────────────┬────────────────────────────────────┤
│   LEFT COLUMN (2/3 width)     │   RIGHT COLUMN (1/3 width)        │
│                                │                                    │
│ ┌─ Event Details Card ────┐   │ ┌─ Kunde ─────────────────┐       │
│ │ Datum, Uhrzeit, Ort     │   │ │ Name, Firma, Email,     │       │
│ │ Anlass, Gäste, Format   │   │ │ Telefon                 │       │
│ │ [Edit inline]           │   │ │ [→ Kundendetail]        │       │
│ └─────────────────────────┘   │ │ or [Kunde zuordnen/     │       │
│                                │ │     erstellen]          │       │
│ ┌─ Show / Paket ──────────┐   │ └─────────────────────────┘       │
│ │ Assigned Paket badge     │   │                                    │
│ │ Effekte-Liste            │   │ ┌─ Interne Notizen ──────┐       │
│ │ [Paket zuweisen / ändern]│   │ │ Auto-save textarea     │       │
│ └─────────────────────────┘   │ └─────────────────────────┘       │
│                                │                                    │
│ ┌─ Dokumente ─────────────┐   │ ┌─ Todos ─────────────────┐       │
│ │ Tab: Angebote | AB | RE │   │ │ Linked todos for this   │       │
│ │ ┌───────────────────┐   │   │ │ booking + quick add     │       │
│ │ │ AN-2024-001 Draft │   │   │ └─────────────────────────┘       │
│ │ │ [Bearbeiten][Send]│   │   │                                    │
│ │ └───────────────────┘   │   │ ┌─ Zahlungen ─────────────┐       │
│ │ [+ Neues Dokument]      │   │ │ (visible once invoiced) │       │
│ │ [Angebot → AB → RE      │   │ │ Paid / Open amounts    │       │
│ │  conversion buttons]    │   │ │ [+ Zahlung erfassen]    │       │
│ └─────────────────────────┘   │ └─────────────────────────┘       │
│                                │                                    │
│ ┌─ Kommunikation ─────────┐   │                                    │
│ │ Timeline: sent mails,   │   │                                    │
│ │ change requests,        │   │                                    │
│ │ portal messages         │   │                                    │
│ │ [Nachricht senden]      │   │                                    │
│ └─────────────────────────┘   │                                    │
├────────────────────────────────┴────────────────────────────────────┤
```

### 3.2 Status Pipeline (unified enum)

Replace the two separate status systems with one:

**Request statuses (current):** neu, in_bearbeitung, details_besprechen, angebot_gesendet, warte_auf_kunde, bestätigt, abgelehnt, archiviert

**Event statuses (current):** in_planung, details_offen, vertrag_gesendet, vertrag_bestaetigt, rechnung_gesendet, rechnung_bezahlt, event_erfolgt, storniert

**New unified pipeline:**

```
neu → in_bearbeitung → angebot_gesendet → gebucht → in_vorbereitung →
  rechnung_gesendet → bezahlt → durchgefuehrt → abgeschlossen
```

Off-ramp statuses (shown as badges, not pipeline steps):
- `abgelehnt` — customer declined
- `storniert` — cancelled after booking
- `archiviert` — closed/archived

### 3.3 Key Behaviors

1. **Status auto-progression:** When a document of type "Angebot" is sent → status auto-updates to `angebot_gesendet`. When customer accepts in portal → `gebucht`. When invoice sent → `rechnung_gesendet`. When payment recorded → `bezahlt`.

2. **Inline document creation:** The DocumentCreator component (already exists) opens inline. Document conversion flow (Angebot → AB → Rechnung) uses existing `quelldokument_id` / `folgedokument_id` links.

3. **Customer linking:** If request came from website form (no customer_id), show a prompt to link/create customer. Use existing customer matching by email.

4. **Paket/Show assignment:** Dropdown to select from existing Pakete. Once assigned, shows the effects list. Can also create a custom show concept inline.

### 3.4 Implementation Approach

Build `AdminBookingDetail.tsx` by combining code from `AdminRequestDetail.tsx` and `AdminEventDetail.tsx`. Both pages already have:
- Customer info panel
- Document section with DocumentCreator
- Change requests / communication
- Mail sending
- Status management
- Edit mode for event details

The new page merges these, using the unified status enum and adding the pipeline bar + paket/show/todo/payment sections.

---

## 4. Unified Pipeline List Page (AdminBookings.tsx)

### 4.1 Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│ Anfragen & Buchungen                          [+ Neue Anfrage]     │
├─────────────────────────────────────────────────────────────────────┤
│ View: [Pipeline ▼]  [Kanban]  [Liste]          🔍 Suche...        │
│ Filter: [Alle] [Offen] [Gebucht] [Abgeschlossen] [Archiv]         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│ Pipeline view (default):                                           │
│ Grouped by status, each card shows:                                │
│ - Customer name / Firma                                            │
│ - Anlass + Datum                                                   │
│ - Status badge                                                     │
│ - Amount (if offer/invoice exists)                                 │
│                                                                     │
│ Kanban view (optional, future):                                    │
│ - Columns per status group                                        │
│ - Drag cards between columns                                       │
│                                                                     │
│ List view:                                                         │
│ - Table format, sortable columns                                   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 4.2 Data Source

Query `portal_requests` as the primary table. Join to `portal_events` (via `event_id`) for booked requests. Use the unified status field from `portal_requests`.

---

## 5. Customer Detail Page (Enhanced AdminCustomerDetail.tsx)

### 5.1 Additions to Existing Page

The current page already has tabs (anfragen, events, dokumente, mails). Changes:

1. **Merge "anfragen" and "events" tabs** into a single "Buchungen" tab showing all bookings from this customer using unified status.
2. **Add "Todos" section** in sidebar or as a tab — linked todos for this customer.
3. **Add quick actions bar:** "Neue Anfrage", "Neues Dokument", "Nachricht senden".
4. **Billing address panel** already exists — add inline edit.
5. **Native Dokumente section** already exists — keep.

### 5.2 Route
Stays at `/admin/customers/:id`. No route change needed.

---

## 6. "Mein Programm" Page (AdminProgramm.tsx)

### 6.1 Layout

Tabbed page consolidating 6 current pages:

```
┌─────────────────────────────────────────────────────────────────────┐
│ Mein Programm                                                      │
├─────────────────────────────────────────────────────────────────────┤
│ [Effekte] [Pakete] [Shows] [Produktionen] [Locations] [Partner]   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│ Content of selected tab (reuses existing page components)          │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 6.2 Implementation

Extract the main content (below AdminLayout wrapper) from each existing page into a reusable component:
- `AdminEffekte.tsx` → `EffekteTab` component
- `AdminPakete.tsx` → `PaketeTab` component
- `AdminShows.tsx` → `ShowsTab` component
- `AdminProduktionen.tsx` → `ProduktionenTab` component
- `AdminLocations.tsx` → `LocationsTab` component
- `AdminPartner.tsx` → `PartnerTab` component

`AdminProgramm.tsx` wraps them in an AdminLayout with a tab bar. URL param `?tab=effekte` controls which tab is active.

---

## 7. Database Changes

### 7.1 Option A: Keep Two Tables, Unified UI (RECOMMENDED)

Keep `portal_requests` and `portal_events` as separate tables but unify at the UI level. This is safer and requires no data migration.

**Changes needed:**

```sql
-- Add unified status to portal_requests (replaces the implicit two-phase system)
ALTER TABLE portal_requests
  ADD COLUMN IF NOT EXISTS unified_status TEXT DEFAULT 'neu';

-- Add event-specific fields to portal_requests for the unified view
ALTER TABLE portal_requests
  ADD COLUMN IF NOT EXISTS start_time TIME,
  ADD COLUMN IF NOT EXISTS end_time TIME,
  ADD COLUMN IF NOT EXISTS paket_id UUID REFERENCES pakete(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS show_id UUID REFERENCES shows_intern(id) ON DELETE SET NULL;

-- Backfill unified_status from existing status values
UPDATE portal_requests SET unified_status = status WHERE status IS NOT NULL;

-- For requests that have a linked event, derive unified_status from event status
UPDATE portal_requests r
SET unified_status = CASE
  WHEN e.status = 'in_planung' THEN 'gebucht'
  WHEN e.status = 'details_offen' THEN 'in_vorbereitung'
  WHEN e.status = 'vertrag_gesendet' THEN 'in_vorbereitung'
  WHEN e.status = 'vertrag_bestaetigt' THEN 'in_vorbereitung'
  WHEN e.status = 'rechnung_gesendet' THEN 'rechnung_gesendet'
  WHEN e.status = 'rechnung_bezahlt' THEN 'bezahlt'
  WHEN e.status = 'event_erfolgt' THEN 'durchgefuehrt'
  WHEN e.status = 'storniert' THEN 'storniert'
  ELSE 'gebucht'
END
FROM portal_events e
WHERE r.event_id = e.id;
```

**Why Option A:**
- No risk of breaking existing Kundenportal queries
- portal_events foreign keys (from portal_documents, shows_intern, portal_timeline) remain intact
- Incremental: the old pages still work during transition
- portal_events can still be created for the customer-facing portal view

### 7.2 Option B: Merge Tables (NOT recommended for now)

Merging portal_events into portal_requests would require updating every foreign key reference (portal_documents.event_id, shows_intern.event_id, portal_timeline.event_id, portal_change_requests.event_id, etc.) and all Kundenportal queries. Too risky for incremental migration.

### 7.3 Additional Schema Changes

```sql
-- Link todos to bookings (requests) directly
ALTER TABLE portal_todos
  ADD COLUMN IF NOT EXISTS request_id UUID REFERENCES portal_requests(id) ON DELETE SET NULL;

-- Index for fast pipeline queries
CREATE INDEX IF NOT EXISTS idx_portal_requests_unified_status
  ON portal_requests(unified_status);
CREATE INDEX IF NOT EXISTS idx_portal_requests_datum
  ON portal_requests(datum);
```

---

## 8. Migration Strategy (Incremental Phases)

### Phase 1: Database + Unified Status (1 day)
1. Run migration to add `unified_status` column to `portal_requests`
2. Run migration to add `start_time`, `end_time`, `paket_id`, `show_id` to `portal_requests`
3. Backfill `unified_status` from existing data
4. Add `request_id` to `portal_todos`

**Files to change:**
- New migration file in `supabase/migrations/`

### Phase 2: Navigation Restructure (1 day)
1. Update `src/components/admin/AdminLayout.tsx`:
   - Replace `crmNavItems`, `komNavItems`, `finanzNavItems`, `prodNavItems` arrays with new 7-item flat array
   - Remove `SectionLabel` usage in nav
   - Update `bottomNavItems` for mobile
2. Add redirect routes in `src/App.tsx` for old URLs

**Files to change:**
- `/src/components/admin/AdminLayout.tsx`
- `/src/App.tsx`

### Phase 3: Unified Pipeline List Page (2 days)
1. Create `src/pages/AdminBookings.tsx`
   - Combine data loading from `AdminRequests.tsx` + `AdminEvents.tsx`
   - Query `portal_requests` with JOIN to `portal_events` and `portal_customers`
   - Implement pipeline view with filter tabs (Alle, Offen, Gebucht, Abgeschlossen, Archiv)
   - Implement list view (table)
2. Add route in `App.tsx`
3. Wire up in sidebar

**Files to change:**
- New: `/src/pages/AdminBookings.tsx`
- `/src/App.tsx` (add route)

### Phase 4: Unified Booking Detail Page (3-4 days)
This is the largest piece of work.

1. Create `src/pages/AdminBookingDetail.tsx`
   - **Step 4a:** Copy `AdminRequestDetail.tsx` as starting point
   - **Step 4b:** Add status pipeline bar component (`StatusPipeline`)
   - **Step 4c:** Merge event detail fields (start_time, end_time from event or request)
   - **Step 4d:** Add show/paket assignment section
   - **Step 4e:** Add inline todo section (query `portal_todos` where `request_id = :id`)
   - **Step 4f:** Add payment tracking section (query `dokument_zahlungen` for linked documents)
   - **Step 4g:** Integrate DocumentCreator with document conversion flow
   - **Step 4h:** Add communication timeline (merge portal_messages + mail history + change_requests chronologically)

2. Create helper components:
   - `src/components/admin/StatusPipeline.tsx` — visual pipeline bar
   - `src/components/admin/BookingDocuments.tsx` — documents section with inline create/convert
   - `src/components/admin/BookingCommunication.tsx` — unified communication timeline
   - `src/components/admin/BookingTodos.tsx` — embedded todo list
   - `src/components/admin/BookingPayments.tsx` — payment tracking

**Files to change:**
- New: `/src/pages/AdminBookingDetail.tsx`
- New: `/src/pages/AdminBookingNew.tsx`
- New: `/src/components/admin/StatusPipeline.tsx`
- New: `/src/components/admin/BookingDocuments.tsx`
- New: `/src/components/admin/BookingCommunication.tsx`
- New: `/src/components/admin/BookingTodos.tsx`
- New: `/src/components/admin/BookingPayments.tsx`
- `/src/App.tsx` (add routes)

### Phase 5: "Mein Programm" Consolidation (1 day)
1. Extract content from AdminEffekte/AdminPakete/AdminShows/AdminProduktionen/AdminLocations/AdminPartner into tab components
2. Create `src/pages/AdminProgramm.tsx` with tab navigation
3. Add route + redirects

**Files to change:**
- New: `/src/pages/AdminProgramm.tsx`
- Refactor: extract inner content from 6 existing pages into exportable components
- `/src/App.tsx` (add route + redirects)

### Phase 6: Enhanced Dashboard + Customer Detail (1 day)
1. Dashboard: Add embedded todo widget, improve mail widget
2. Customer detail: Merge anfragen/events tabs into single "Buchungen" tab, add quick actions

**Files to change:**
- `/src/pages/AdminDashboard.tsx` (enhance widgets)
- `/src/pages/AdminCustomerDetail.tsx` (merge tabs)

### Phase 7: Settings + Artikel Merge (0.5 day)
1. Move Artikel-Stammdaten into AdminSettings as a tab
2. Add tab UI to AdminSettings

**Files to change:**
- `/src/pages/AdminSettings.tsx` (add Artikel tab)

### Phase 8: Cleanup (0.5 day)
1. Remove old page files (or keep with deprecation comments)
2. Verify all redirects work
3. Test Kundenportal still works (it queries portal_events/portal_documents directly — should be unaffected)

---

## 9. Key Technical Decisions

### 9.1 Unified status lives on portal_requests

The `unified_status` column on `portal_requests` is the single source of truth for the pipeline. When status changes, if there is a linked `portal_events` record, its status gets updated too (for backward compatibility with Kundenportal).

### 9.2 portal_events is kept but becomes secondary

- Created automatically when unified_status transitions to `gebucht`
- Updated in sync when unified_status changes
- Still used by Kundenportal for customer-facing views
- The admin never navigates to event pages directly anymore

### 9.3 Existing DocumentCreator reused

The `DocumentCreator` component already accepts `customerId`, `eventId`, `requestId` props. It can be used directly in the new booking detail page. The document workflow system (quelldokument_id / folgedokument_id) already supports conversion chains.

### 9.4 Type consolidation

Create a shared types file:

```typescript
// src/types/bookings.ts
export type UnifiedStatus =
  | 'neu'
  | 'in_bearbeitung'
  | 'angebot_gesendet'
  | 'gebucht'
  | 'in_vorbereitung'
  | 'rechnung_gesendet'
  | 'bezahlt'
  | 'durchgefuehrt'
  | 'abgeschlossen'
  | 'abgelehnt'
  | 'storniert'
  | 'archiviert';

export interface Booking {
  // From portal_requests
  id: string;
  created_at: string;
  unified_status: UnifiedStatus;
  name: string;
  firma?: string | null;
  email: string;
  phone: string | null;
  anlass: string | null;
  datum: string | null;
  uhrzeit?: string | null;
  start_time?: string | null;
  end_time?: string | null;
  ort: string | null;
  gaeste: number | null;
  format: string | null;
  nachricht: string | null;
  notizen_intern: string | null;
  customer_id?: string | null;
  event_id?: string | null;
  paket_id?: string | null;
  show_id?: string | null;
}
```

### 9.5 Status auto-update triggers

Implement as Supabase database triggers or as application-level logic in the booking detail page:

- Document type "Angebot" with status "gesendet" → booking `unified_status` = 'angebot_gesendet'
- Change request with action "angebot_annehmen" → booking `unified_status` = 'gebucht' + auto-create portal_events record
- Document type "Rechnung" with status "gesendet" → booking `unified_status` = 'rechnung_gesendet'
- Payment recorded covering full amount → booking `unified_status` = 'bezahlt'

Prefer application-level logic (in the save handlers) over database triggers for transparency and debuggability.

---

## 10. Risk Mitigation

1. **Kundenportal compatibility:** The Kundenportal (`/kundenportal`) queries `portal_events` and `portal_documents` directly. Since we keep these tables and update them in sync, the portal continues to work.

2. **Bookmark/URL compatibility:** All old admin URLs get redirects. No broken links.

3. **Data integrity:** The `unified_status` backfill migration handles existing data. New bookings use the unified flow from the start.

4. **Rollback:** Since old pages are kept (just hidden from nav), reverting is as simple as restoring the old sidebar arrays. The database changes are additive (new columns, no column drops).

---

## Summary of File Changes

### New Files (to create)
- `supabase/migrations/YYYYMMDD_unified_bookings.sql`
- `src/types/bookings.ts`
- `src/pages/AdminBookings.tsx`
- `src/pages/AdminBookingDetail.tsx`
- `src/pages/AdminBookingNew.tsx`
- `src/pages/AdminProgramm.tsx`
- `src/components/admin/StatusPipeline.tsx`
- `src/components/admin/BookingDocuments.tsx`
- `src/components/admin/BookingCommunication.tsx`
- `src/components/admin/BookingTodos.tsx`
- `src/components/admin/BookingPayments.tsx`

### Files to Modify
- `src/App.tsx` — new routes + redirects
- `src/components/admin/AdminLayout.tsx` — new nav structure
- `src/pages/AdminDashboard.tsx` — enhanced widgets
- `src/pages/AdminCustomerDetail.tsx` — merged tabs
- `src/pages/AdminSettings.tsx` — Artikel tab

### Files to Eventually Remove (Phase 8)
- AdminRequests.tsx, AdminEvents.tsx, AdminRequestDetail.tsx, AdminEventDetail.tsx
- AdminNewRequest.tsx, AdminNewEvent.tsx
- AdminEffekte.tsx, AdminPakete.tsx, AdminShows.tsx
- AdminProduktionen.tsx, AdminLocations.tsx, AdminPartner.tsx, AdminArtikel.tsx
