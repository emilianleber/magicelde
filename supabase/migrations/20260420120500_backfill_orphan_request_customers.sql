-- Backfill: Für jede Anfrage (portal_requests) ohne customer_id rückwirkend
-- einen Kunden anlegen bzw. einen existierenden per email finden und verlinken.
-- Nötig, weil die ursprüngliche UPSERT-Logik durch den falschen Unique-Index fehlschlug,
-- sodass Anfragen ankamen aber kein Kunde angelegt wurde (z.B. Hendrik Naew).

-- Defensive: user_id und kundennummer nullable machen, falls noch NOT NULL
-- (die App fügt ohne diese Felder ein, Live-DB ist bereits so, hier nur zur Absicherung)
ALTER TABLE public.portal_customers ALTER COLUMN user_id DROP NOT NULL;
ALTER TABLE public.portal_customers ALTER COLUMN kundennummer DROP NOT NULL;

-- 1) Für jede eindeutige email in orphan-Anfragen einen Kunden anlegen,
--    falls noch kein Kunde mit dieser email existiert.
--    DISTINCT ON holt den ältesten Request pro email als Quelle.
INSERT INTO public.portal_customers (name, email, company, phone)
SELECT DISTINCT ON (LOWER(r.email))
  COALESCE(NULLIF(TRIM(r.name), ''), r.email) AS name,
  LOWER(TRIM(r.email))                        AS email,
  NULLIF(TRIM(r.firma), '')                   AS company,
  NULLIF(TRIM(r.phone), '')                   AS phone
FROM public.portal_requests r
WHERE r.customer_id IS NULL
  AND r.email IS NOT NULL
  AND TRIM(r.email) <> ''
  AND NOT EXISTS (
    SELECT 1 FROM public.portal_customers c
    WHERE LOWER(c.email) = LOWER(TRIM(r.email))
  )
ORDER BY LOWER(r.email), r.created_at ASC
ON CONFLICT (email) DO NOTHING;

-- 2) Alle orphan-Anfragen mit dem (jetzt existierenden) Kunden verlinken
UPDATE public.portal_requests r
SET customer_id = c.id
FROM public.portal_customers c
WHERE r.customer_id IS NULL
  AND r.email IS NOT NULL
  AND LOWER(c.email) = LOWER(TRIM(r.email));
