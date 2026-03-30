-- Allow customers to find/link their own portal record by email
-- (needed when user_id is still NULL — e.g. first login after admin created the record)

DROP POLICY IF EXISTS "Users can find own customer profile by email"  ON public.portal_customers;
DROP POLICY IF EXISTS "Users can link own customer profile by email"   ON public.portal_customers;

-- SELECT by email (needed for first-login lookup before user_id is set)
CREATE POLICY "Users can find own customer profile by email"
  ON public.portal_customers FOR SELECT
  USING (email = auth.jwt() ->> 'email');

-- UPDATE by email (needed to write user_id into record on first login)
CREATE POLICY "Users can link own customer profile by email"
  ON public.portal_customers FOR UPDATE
  USING (email = auth.jwt() ->> 'email');
