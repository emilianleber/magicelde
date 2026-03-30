-- Add customer_id to portal_todos so todos can be linked to a customer
ALTER TABLE public.portal_todos
  ADD COLUMN IF NOT EXISTS customer_id UUID REFERENCES public.portal_customers(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_portal_todos_customer_id ON public.portal_todos(customer_id);

-- Drop the restrictive status CHECK constraint on portal_events
-- The app uses a richer workflow status set:
-- in_planung, details_offen, vertrag_gesendet, vertrag_bestaetigt,
-- rechnung_gesendet, rechnung_bezahlt, event_erfolgt, storniert
ALTER TABLE public.portal_events
  DROP CONSTRAINT IF EXISTS portal_events_status_check;
