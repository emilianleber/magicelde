-- Prevent duplicate customers by enforcing unique email (case-insensitive)
-- First: deduplicate existing rows – keep the oldest record per email
WITH dupes AS (
  SELECT id, email, ROW_NUMBER() OVER (PARTITION BY LOWER(email) ORDER BY created_at ASC) AS rn
  FROM public.portal_customers
  WHERE email IS NOT NULL
)
DELETE FROM public.portal_customers WHERE id IN (SELECT id FROM dupes WHERE rn > 1);

-- Normalize existing emails to lowercase
UPDATE public.portal_customers SET email = LOWER(email) WHERE email IS NOT NULL AND email <> LOWER(email);

-- Create unique index on lowercase email
CREATE UNIQUE INDEX IF NOT EXISTS idx_portal_customers_email_unique
  ON public.portal_customers (LOWER(email))
  WHERE email IS NOT NULL;
