-- The live database has 'firma' column instead of 'company' on portal_customers.
-- Safely rename firma → company, or add company if neither exists.
DO $$
BEGIN
  -- Case 1: 'firma' exists but 'company' doesn't → rename
  IF EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'portal_customers' AND column_name = 'firma'
    ) AND NOT EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'portal_customers' AND column_name = 'company'
    ) THEN
    ALTER TABLE public.portal_customers RENAME COLUMN firma TO company;

  -- Case 2: Neither exists → add company
  ELSIF NOT EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'portal_customers' AND column_name = 'company'
    ) THEN
    ALTER TABLE public.portal_customers ADD COLUMN company TEXT;
  END IF;

  -- Case 3: Both exist → copy firma values into company where company is null, then drop firma
  IF EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'portal_customers' AND column_name = 'firma'
    ) AND EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'portal_customers' AND column_name = 'company'
    ) THEN
    UPDATE public.portal_customers SET company = firma WHERE company IS NULL AND firma IS NOT NULL;
    ALTER TABLE public.portal_customers DROP COLUMN firma;
  END IF;
END $$;

-- Also ensure portal_requests still has firma (it's separate and keeps its own column)
-- portal_requests.firma stays as-is since it stores the raw form input
