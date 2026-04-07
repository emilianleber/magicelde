-- Mehrere Kalender unterstützen
CREATE TABLE IF NOT EXISTS public.calendar_sources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,          -- z.B. "Privat", "Arbeit", "Geburtstage"
  url TEXT NOT NULL,           -- iCal URL
  color TEXT DEFAULT '#6366f1', -- Farbe im Kalender
  enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.calendar_sources ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin full access calendar_sources" ON public.calendar_sources
  FOR ALL USING (EXISTS (SELECT 1 FROM public.portal_admins WHERE email = auth.jwt() ->> 'email'));

-- Source-ID auf cache-Tabelle für Zuordnung
ALTER TABLE public.calendar_events_cache ADD COLUMN IF NOT EXISTS source_id UUID REFERENCES public.calendar_sources(id) ON DELETE CASCADE;
