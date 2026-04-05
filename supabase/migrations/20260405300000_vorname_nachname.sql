-- Vorname/Nachname als separate Felder
ALTER TABLE public.portal_customers
  ADD COLUMN IF NOT EXISTS vorname TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS nachname TEXT DEFAULT '';

ALTER TABLE public.portal_requests
  ADD COLUMN IF NOT EXISTS vorname TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS nachname TEXT DEFAULT '';

-- Bestehende Daten migrieren: name → vorname + nachname
UPDATE public.portal_customers
SET vorname = SPLIT_PART(name, ' ', 1),
    nachname = SUBSTRING(name FROM POSITION(' ' IN name) + 1)
WHERE name IS NOT NULL AND name != '' AND vorname = '';

UPDATE public.portal_requests
SET vorname = SPLIT_PART(name, ' ', 1),
    nachname = SUBSTRING(name FROM POSITION(' ' IN name) + 1)
WHERE name IS NOT NULL AND name != '' AND vorname = '';
