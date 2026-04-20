-- Der bestehende Unique-Index lag auf LOWER(email) (Expression-Index) und war partial (WHERE email IS NOT NULL).
-- Das ist inkompatibel zu `INSERT ... ON CONFLICT (email)` (supabase-js upsert mit onConflict: "email"),
-- weshalb UPSERT in create-portal-request still fehlschlug und Kunden nicht angelegt wurden.

-- Sicherheitsnetz: Alle Mails lowercasen, damit der neue plain Index deduplizieren kann
UPDATE public.portal_customers
SET email = LOWER(email)
WHERE email IS NOT NULL AND email <> LOWER(email);

-- Sicherheitsnetz: Duplikate entfernen, ältesten Eintrag behalten
WITH dupes AS (
  SELECT id, ROW_NUMBER() OVER (PARTITION BY email ORDER BY created_at ASC) AS rn
  FROM public.portal_customers
  WHERE email IS NOT NULL
)
DELETE FROM public.portal_customers WHERE id IN (SELECT id FROM dupes WHERE rn > 1);

-- Alten Expression-/Partial-Index droppen (ist für ON CONFLICT (email) nicht nutzbar)
DROP INDEX IF EXISTS public.idx_portal_customers_email_unique;

-- Neuer plain Unique-Index auf email → funktioniert mit ON CONFLICT (email).
-- NULL-Werte sind in Postgres per Default nicht eindeutig, mehrere NULLs sind also erlaubt.
CREATE UNIQUE INDEX IF NOT EXISTS idx_portal_customers_email_unique
  ON public.portal_customers (email);
