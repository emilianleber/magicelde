-- Avatar URL for customers
ALTER TABLE public.portal_customers ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- Due date + amount for documents (for invoice display)
ALTER TABLE public.portal_documents ADD COLUMN IF NOT EXISTS due_date DATE;
ALTER TABLE public.portal_documents ADD COLUMN IF NOT EXISTS amount DECIMAL(10,2);

-- action field for change requests (stornierung, angebot_annehmen, angebot_ablehnen, change_request)
ALTER TABLE public.portal_change_requests ADD COLUMN IF NOT EXISTS action TEXT DEFAULT 'change_request';

-- Allow customers to SELECT their own documents by email-linked customer
DROP POLICY IF EXISTS "Users can view own documents by email" ON public.portal_documents;
CREATE POLICY "Users can view own documents by email" ON public.portal_documents FOR SELECT
  USING (customer_id IN (
    SELECT id FROM public.portal_customers
    WHERE email = auth.jwt() ->> 'email'
  ));

-- Allow customers to view their own events by email-linked customer
DROP POLICY IF EXISTS "Users can view own events by email" ON public.portal_events;
CREATE POLICY "Users can view own events by email" ON public.portal_events FOR SELECT
  USING (customer_id IN (
    SELECT id FROM public.portal_customers
    WHERE email = auth.jwt() ->> 'email'
  ));

-- Allow customers to UPDATE their avatar_url
DROP POLICY IF EXISTS "Users can update own avatar by email" ON public.portal_customers;
CREATE POLICY "Users can update own avatar by email" ON public.portal_customers FOR UPDATE
  USING (email = auth.jwt() ->> 'email');
