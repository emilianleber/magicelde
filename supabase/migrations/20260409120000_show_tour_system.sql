-- =====================================================================
-- Show/Tour-Planung System: Tables, ALTER, RLS, Data Migration
-- =====================================================================

-- 1. Create team_members table
CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  rolle text NOT NULL CHECK (rolle IN (
    'techniker','assistent','fotograf','videograf','moderator',
    'musiker','servicekraft','fahrer','sonstiges'
  )),
  kontakt_email text,
  kontakt_tel text,
  stundensatz numeric,
  tagessatz numeric,
  notizen text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 2. Create touren table
CREATE TABLE IF NOT EXISTS touren (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  beschreibung text NOT NULL DEFAULT '',
  show_id uuid REFERENCES shows_intern(id) ON DELETE SET NULL,
  status text NOT NULL DEFAULT 'planung' CHECK (status IN (
    'planung','aktiv','abgeschlossen','abgesagt'
  )),
  start_datum date,
  end_datum date,
  budget_gesamt jsonb NOT NULL DEFAULT '{}',
  notizen text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 3. Create tour_termine table
CREATE TABLE IF NOT EXISTS tour_termine (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tour_id uuid NOT NULL REFERENCES touren(id) ON DELETE CASCADE,
  datum date NOT NULL,
  uhrzeit_einlass time,
  uhrzeit_show time,
  uhrzeit_aufbau time,
  uhrzeit_soundcheck time,
  uhrzeit_abbau time,
  location_id uuid REFERENCES locations_intern(id) ON DELETE SET NULL,
  kapazitaet integer NOT NULL DEFAULT 0,
  ticket_preis numeric NOT NULL DEFAULT 0,
  tickets_verkauft integer NOT NULL DEFAULT 0,
  ticket_link text,
  ticket_anbieter text CHECK (ticket_anbieter IS NULL OR ticket_anbieter IN (
    'eventim','okticket','reservix','eigen','sonstiges'
  )),
  umsatz_ist numeric NOT NULL DEFAULT 0,
  kosten numeric NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'geplant' CHECK (status IN (
    'geplant','beworben','ausverkauft','abgeschlossen','abgesagt'
  )),
  notizen text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 4. Create tour_team table
CREATE TABLE IF NOT EXISTS tour_team (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tour_termin_id uuid NOT NULL REFERENCES tour_termine(id) ON DELETE CASCADE,
  team_member_id uuid NOT NULL REFERENCES team_members(id) ON DELETE CASCADE,
  rolle text,
  honorar numeric,
  bestaetigt boolean NOT NULL DEFAULT false
);

-- 5. Create show_team table
CREATE TABLE IF NOT EXISTS show_team (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  show_id uuid NOT NULL REFERENCES shows_intern(id) ON DELETE CASCADE,
  team_member_id uuid NOT NULL REFERENCES team_members(id) ON DELETE CASCADE,
  rolle text
);

-- 6. ALTER effekte: add new columns
ALTER TABLE effekte
  ADD COLUMN IF NOT EXISTS kategorie text,
  ADD COLUMN IF NOT EXISTS wow_rating integer,
  ADD COLUMN IF NOT EXISTS setup_zeit integer,
  ADD COLUMN IF NOT EXISTS video_url text,
  ADD COLUMN IF NOT EXISTS foto_urls text[],
  ADD COLUMN IF NOT EXISTS beschreibung text;

-- 7. ALTER shows_intern: add new columns + expand constraints
ALTER TABLE shows_intern
  ADD COLUMN IF NOT EXISTS beschreibung text,
  ADD COLUMN IF NOT EXISTS musik_playlist jsonb,
  ADD COLUMN IF NOT EXISTS texte_scripts jsonb,
  ADD COLUMN IF NOT EXISTS gema_daten jsonb,
  ADD COLUMN IF NOT EXISTS marketing_assets jsonb,
  ADD COLUMN IF NOT EXISTS budget jsonb;

-- Expand format constraint to include new values
ALTER TABLE shows_intern DROP CONSTRAINT IF EXISTS shows_intern_format_check;
ALTER TABLE shows_intern ADD CONSTRAINT shows_intern_format_check
  CHECK (format IN ('kundenbuchung','abendshow','magic-dinner','tourshow','close-up','workshop'));

-- Expand status constraint to include new values
ALTER TABLE shows_intern DROP CONSTRAINT IF EXISTS shows_intern_status_check;
ALTER TABLE shows_intern ADD CONSTRAINT shows_intern_status_check
  CHECK (status IN ('entwurf','gesendet','akzeptiert','proben','fertig','archiviert'));

-- 8. ALTER locations_intern: add new columns
ALTER TABLE locations_intern
  ADD COLUMN IF NOT EXISTS buehnen_hoehe numeric,
  ADD COLUMN IF NOT EXISTS strom_anschluss text,
  ADD COLUMN IF NOT EXISTS licht_vorhanden boolean,
  ADD COLUMN IF NOT EXISTS ton_vorhanden boolean,
  ADD COLUMN IF NOT EXISTS anfahrt_hinweise text,
  ADD COLUMN IF NOT EXISTS parkplaetze integer,
  ADD COLUMN IF NOT EXISTS website text;

-- 9. Enable RLS on all new tables
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE touren ENABLE ROW LEVEL SECURITY;
ALTER TABLE tour_termine ENABLE ROW LEVEL SECURITY;
ALTER TABLE tour_team ENABLE ROW LEVEL SECURITY;
ALTER TABLE show_team ENABLE ROW LEVEL SECURITY;

-- RLS policies: admin-only access via JWT email
CREATE POLICY "admin_team_members" ON team_members
  FOR ALL USING (auth.jwt() ->> 'email' = 'el@magicel.de')
  WITH CHECK (auth.jwt() ->> 'email' = 'el@magicel.de');

CREATE POLICY "admin_touren" ON touren
  FOR ALL USING (auth.jwt() ->> 'email' = 'el@magicel.de')
  WITH CHECK (auth.jwt() ->> 'email' = 'el@magicel.de');

CREATE POLICY "admin_tour_termine" ON tour_termine
  FOR ALL USING (auth.jwt() ->> 'email' = 'el@magicel.de')
  WITH CHECK (auth.jwt() ->> 'email' = 'el@magicel.de');

CREATE POLICY "admin_tour_team" ON tour_team
  FOR ALL USING (auth.jwt() ->> 'email' = 'el@magicel.de')
  WITH CHECK (auth.jwt() ->> 'email' = 'el@magicel.de');

CREATE POLICY "admin_show_team" ON show_team
  FOR ALL USING (auth.jwt() ->> 'email' = 'el@magicel.de')
  WITH CHECK (auth.jwt() ->> 'email' = 'el@magicel.de');

-- 10. Migrate data from partner_intern → team_members
INSERT INTO team_members (id, name, rolle, kontakt_email, kontakt_tel, notizen, created_at, updated_at)
SELECT
  id,
  name,
  CASE rolle
    WHEN 'technik' THEN 'techniker'
    WHEN 'fotograf' THEN 'fotograf'
    WHEN 'restaurant' THEN 'servicekraft'
    WHEN 'location' THEN 'sonstiges'
    ELSE 'sonstiges'
  END,
  kontakt_email,
  kontakt_tel,
  COALESCE(notizen, ''),
  created_at,
  updated_at
FROM partner_intern
ON CONFLICT (id) DO NOTHING;

-- 11. Migrate data from produktionen → touren
INSERT INTO touren (id, name, beschreibung, show_id, status, budget_gesamt, notizen, created_at, updated_at)
SELECT
  id,
  titel,
  COALESCE(kurzbeschreibung, ''),
  show_id,
  CASE status
    WHEN 'idee' THEN 'planung'
    WHEN 'konzept' THEN 'planung'
    WHEN 'produktion' THEN 'planung'
    WHEN 'bewerbung' THEN 'aktiv'
    WHEN 'aktiv' THEN 'aktiv'
    WHEN 'abgeschlossen' THEN 'abgeschlossen'
    ELSE 'planung'
  END,
  jsonb_build_object(
    'ticketpreis', COALESCE(kalkulation_ticketpreis, 0),
    'kapazitaet', COALESCE(kalkulation_kapazitaet, 0)
  ),
  COALESCE(notizen, ''),
  created_at,
  updated_at
FROM produktionen
ON CONFLICT (id) DO NOTHING;
