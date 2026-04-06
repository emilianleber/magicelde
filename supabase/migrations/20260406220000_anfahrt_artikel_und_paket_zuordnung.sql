-- Paket-Zuordnung auf Anfragen speichern
ALTER TABLE public.portal_requests ADD COLUMN IF NOT EXISTS paket_id UUID;
