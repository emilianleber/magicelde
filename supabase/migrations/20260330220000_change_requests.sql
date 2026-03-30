CREATE TABLE IF NOT EXISTS public.portal_change_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES public.portal_customers(id) ON DELETE CASCADE NOT NULL,
  request_id UUID REFERENCES public.portal_requests(id) ON DELETE CASCADE,
  event_id UUID REFERENCES public.portal_events(id) ON DELETE CASCADE,
  type TEXT NOT NULL DEFAULT 'change_request', -- 'change_request'
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'offen', -- 'offen', 'angenommen', 'abgelehnt'
  admin_response TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.portal_change_requests ENABLE ROW LEVEL SECURITY;
-- Admin full access
CREATE POLICY "Admins full access change_requests" ON public.portal_change_requests FOR ALL
  USING (EXISTS (SELECT 1 FROM public.portal_admins WHERE email = auth.jwt() ->> 'email'))
  WITH CHECK (EXISTS (SELECT 1 FROM public.portal_admins WHERE email = auth.jwt() ->> 'email'));
-- Customer can view and insert own
CREATE POLICY "Customers can view own change requests" ON public.portal_change_requests FOR SELECT
  USING (customer_id IN (SELECT id FROM public.portal_customers WHERE user_id = auth.uid()));
CREATE POLICY "Customers can insert own change requests" ON public.portal_change_requests FOR INSERT
  WITH CHECK (customer_id IN (SELECT id FROM public.portal_customers WHERE user_id = auth.uid()));
