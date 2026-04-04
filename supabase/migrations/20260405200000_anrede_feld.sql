-- Anrede-Feld für Kunden und Anfragen
ALTER TABLE public.portal_customers
  ADD COLUMN IF NOT EXISTS anrede TEXT DEFAULT '';

ALTER TABLE public.portal_requests
  ADD COLUMN IF NOT EXISTS anrede TEXT DEFAULT '';
