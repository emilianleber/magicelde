-- Cache für externe Kalender-Termine (CalDAV/iCloud)
CREATE TABLE IF NOT EXISTS public.calendar_events_cache (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  uid TEXT NOT NULL,
  summary TEXT,
  start_date DATE NOT NULL,
  start_time TIME,
  end_date DATE,
  end_time TIME,
  location TEXT,
  description TEXT,
  all_day BOOLEAN DEFAULT FALSE,
  source TEXT DEFAULT 'ical', -- 'ical', 'google', 'outlook'
  synced_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(uid)
);

ALTER TABLE public.calendar_events_cache ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin full access calendar_events_cache" ON public.calendar_events_cache
  FOR ALL USING (EXISTS (SELECT 1 FROM public.portal_admins WHERE email = auth.jwt() ->> 'email'));
