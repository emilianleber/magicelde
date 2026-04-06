-- Konzept/Show-Zuordnung auf Anfragen
ALTER TABLE public.portal_requests ADD COLUMN IF NOT EXISTS show_id UUID;
