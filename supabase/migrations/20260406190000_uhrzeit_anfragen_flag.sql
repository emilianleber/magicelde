-- Flag: Admin kann Uhrzeit-Anfrage im Kundenportal aktivieren
ALTER TABLE public.portal_requests ADD COLUMN IF NOT EXISTS uhrzeit_anfragen BOOLEAN DEFAULT FALSE;
ALTER TABLE public.portal_events ADD COLUMN IF NOT EXISTS uhrzeit_anfragen BOOLEAN DEFAULT FALSE;
