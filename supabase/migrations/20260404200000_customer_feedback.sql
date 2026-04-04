-- Kundenfeedback nach Events
CREATE TABLE IF NOT EXISTS public.customer_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES public.portal_customers(id),
  event_id UUID REFERENCES public.portal_events(id),
  -- Bewertung 1-5 Sterne
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  -- Freitextfelder
  highlights TEXT DEFAULT '',
  verbesserungen TEXT DEFAULT '',
  weiterempfehlung BOOLEAN DEFAULT true,
  kommentar TEXT DEFAULT '',
  -- Tracking
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS
ALTER TABLE public.customer_feedback ENABLE ROW LEVEL SECURITY;

-- Kunden dürfen eigenes Feedback sehen und erstellen
CREATE POLICY "Kunden: eigenes Feedback lesen"
  ON public.customer_feedback FOR SELECT
  USING (customer_id IN (
    SELECT id FROM public.portal_customers WHERE user_id = auth.uid()
  ));

CREATE POLICY "Kunden: Feedback erstellen"
  ON public.customer_feedback FOR INSERT
  WITH CHECK (customer_id IN (
    SELECT id FROM public.portal_customers WHERE user_id = auth.uid()
  ));

-- Admin darf alles
CREATE POLICY "Admin: Feedback lesen"
  ON public.customer_feedback FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.portal_admins WHERE email = auth.jwt()->>'email'
  ));

-- Service Role hat vollen Zugriff
CREATE POLICY "Service: voller Zugriff"
  ON public.customer_feedback FOR ALL
  USING (true)
  WITH CHECK (true);
