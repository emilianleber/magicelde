-- Kalender-Integration Einstellungen
ALTER TABLE public.admin_settings ADD COLUMN IF NOT EXISTS calendar_provider TEXT; -- 'google', 'apple', 'outlook'
ALTER TABLE public.admin_settings ADD COLUMN IF NOT EXISTS calendar_url TEXT;      -- CalDAV URL
ALTER TABLE public.admin_settings ADD COLUMN IF NOT EXISTS calendar_username TEXT;  -- Benutzername (Apple ID)
ALTER TABLE public.admin_settings ADD COLUMN IF NOT EXISTS calendar_password TEXT;  -- App-spezifisches Passwort (verschlüsselt)
ALTER TABLE public.admin_settings ADD COLUMN IF NOT EXISTS calendar_enabled BOOLEAN DEFAULT FALSE;
