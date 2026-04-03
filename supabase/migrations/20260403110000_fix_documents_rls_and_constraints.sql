-- ── Fix portal_documents: RLS policies + NULL constraint + type constraint ─────

-- 1. Allow customer_id to be NULL (admin-created documents without a customer)
ALTER TABLE public.portal_documents
  ALTER COLUMN customer_id DROP NOT NULL;

-- 2. Update type constraint to include all workflow document types
ALTER TABLE public.portal_documents DROP CONSTRAINT IF EXISTS portal_documents_type_check;
ALTER TABLE public.portal_documents ADD CONSTRAINT portal_documents_type_check
  CHECK (type IN (
    'Angebot',
    'Auftragsbestätigung',
    'Rechnung',
    'Abschlagsrechnung',
    'Mahnung',
    'Gutschrift',
    'Stornorechnung',
    'Vertrag',
    'Info',
    'Ablaufplan',
    'Sonstiges'
  ));

-- 3. Add admin full-access RLS policies on portal_documents
DROP POLICY IF EXISTS "Admin full access portal_documents" ON public.portal_documents;
CREATE POLICY "Admin full access portal_documents" ON public.portal_documents
  FOR ALL
  USING (auth.jwt() ->> 'email' = 'el@magicel.de')
  WITH CHECK (auth.jwt() ->> 'email' = 'el@magicel.de');

-- 4. Add admin full-access RLS policy on document_positions
DROP POLICY IF EXISTS "Admin full access document_positions" ON public.document_positions;
CREATE POLICY "Admin full access document_positions" ON public.document_positions
  FOR ALL
  USING (auth.jwt() ->> 'email' = 'el@magicel.de')
  WITH CHECK (auth.jwt() ->> 'email' = 'el@magicel.de');

-- 5. Admin access to admin_settings (update for number increment)
DROP POLICY IF EXISTS "Admin full access admin_settings" ON public.admin_settings;
CREATE POLICY "Admin full access admin_settings" ON public.admin_settings
  FOR ALL
  USING (auth.jwt() ->> 'email' = 'el@magicel.de')
  WITH CHECK (auth.jwt() ->> 'email' = 'el@magicel.de');
