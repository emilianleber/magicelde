-- Comprehensive fix for portal_customers UPDATE RLS
-- Customers must be able to update their own profile (both by user_id and by email for first-login case)

-- Drop all existing customer UPDATE policies to avoid conflicts
DROP POLICY IF EXISTS "Users can update own customer profile"     ON public.portal_customers;
DROP POLICY IF EXISTS "Users can link own customer profile by email" ON public.portal_customers;
DROP POLICY IF EXISTS "Users can update own avatar by email"      ON public.portal_customers;

-- Single unified UPDATE policy: matches by user_id OR by email
CREATE POLICY "Users can update own customer profile"
  ON public.portal_customers FOR UPDATE
  USING (
    auth.uid() = user_id
    OR email = auth.jwt() ->> 'email'
  )
  WITH CHECK (
    auth.uid() = user_id
    OR email = auth.jwt() ->> 'email'
  );

-- Also fix SELECT to consolidate
DROP POLICY IF EXISTS "Users can view own customer profile"        ON public.portal_customers;
DROP POLICY IF EXISTS "Users can find own customer profile by email" ON public.portal_customers;

CREATE POLICY "Users can view own customer profile"
  ON public.portal_customers FOR SELECT
  USING (
    auth.uid() = user_id
    OR email = auth.jwt() ->> 'email'
  );
