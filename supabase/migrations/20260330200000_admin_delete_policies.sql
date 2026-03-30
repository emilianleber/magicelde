-- Allow admins to perform all operations on portal tables
-- Drop existing admin policies first to avoid conflicts, then recreate

-- ── portal_events ─────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Admins can select all events"  ON public.portal_events;
DROP POLICY IF EXISTS "Admins can insert events"       ON public.portal_events;
DROP POLICY IF EXISTS "Admins can update events"       ON public.portal_events;
DROP POLICY IF EXISTS "Admins can delete events"       ON public.portal_events;

CREATE POLICY "Admins can select all events" ON public.portal_events FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.portal_admins WHERE email = auth.jwt() ->> 'email'));

CREATE POLICY "Admins can insert events" ON public.portal_events FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM public.portal_admins WHERE email = auth.jwt() ->> 'email'));

CREATE POLICY "Admins can update events" ON public.portal_events FOR UPDATE
  USING (EXISTS (SELECT 1 FROM public.portal_admins WHERE email = auth.jwt() ->> 'email'));

CREATE POLICY "Admins can delete events" ON public.portal_events FOR DELETE
  USING (EXISTS (SELECT 1 FROM public.portal_admins WHERE email = auth.jwt() ->> 'email'));

-- ── portal_customers ──────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Admins can select all customers" ON public.portal_customers;
DROP POLICY IF EXISTS "Admins can insert customers"      ON public.portal_customers;
DROP POLICY IF EXISTS "Admins can update customers"      ON public.portal_customers;
DROP POLICY IF EXISTS "Admins can delete customers"      ON public.portal_customers;

CREATE POLICY "Admins can select all customers" ON public.portal_customers FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.portal_admins WHERE email = auth.jwt() ->> 'email'));

CREATE POLICY "Admins can insert customers" ON public.portal_customers FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM public.portal_admins WHERE email = auth.jwt() ->> 'email'));

CREATE POLICY "Admins can update customers" ON public.portal_customers FOR UPDATE
  USING (EXISTS (SELECT 1 FROM public.portal_admins WHERE email = auth.jwt() ->> 'email'));

CREATE POLICY "Admins can delete customers" ON public.portal_customers FOR DELETE
  USING (EXISTS (SELECT 1 FROM public.portal_admins WHERE email = auth.jwt() ->> 'email'));

-- ── portal_requests ───────────────────────────────────────────────────────────
ALTER TABLE IF EXISTS public.portal_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can select all requests" ON public.portal_requests;
DROP POLICY IF EXISTS "Admins can insert requests"      ON public.portal_requests;
DROP POLICY IF EXISTS "Admins can update requests"      ON public.portal_requests;
DROP POLICY IF EXISTS "Admins can delete requests"      ON public.portal_requests;
DROP POLICY IF EXISTS "Users can view own requests"     ON public.portal_requests;
DROP POLICY IF EXISTS "Users can insert own requests"   ON public.portal_requests;

CREATE POLICY "Admins can select all requests" ON public.portal_requests FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.portal_admins WHERE email = auth.jwt() ->> 'email'));

CREATE POLICY "Admins can insert requests" ON public.portal_requests FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM public.portal_admins WHERE email = auth.jwt() ->> 'email'));

CREATE POLICY "Admins can update requests" ON public.portal_requests FOR UPDATE
  USING (EXISTS (SELECT 1 FROM public.portal_admins WHERE email = auth.jwt() ->> 'email'));

CREATE POLICY "Admins can delete requests" ON public.portal_requests FOR DELETE
  USING (EXISTS (SELECT 1 FROM public.portal_admins WHERE email = auth.jwt() ->> 'email'));

CREATE POLICY "Users can view own requests" ON public.portal_requests FOR SELECT
  USING (
    customer_id IN (SELECT id FROM public.portal_customers WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can insert own requests" ON public.portal_requests FOR INSERT
  WITH CHECK (
    customer_id IN (SELECT id FROM public.portal_customers WHERE user_id = auth.uid())
    OR customer_id IS NULL
  );
