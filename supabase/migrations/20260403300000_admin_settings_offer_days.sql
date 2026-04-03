-- Standardwert für "Gültig bis" bei Angeboten (in Tagen)
ALTER TABLE public.admin_settings
  ADD COLUMN IF NOT EXISTS default_offer_days INTEGER DEFAULT 14;
