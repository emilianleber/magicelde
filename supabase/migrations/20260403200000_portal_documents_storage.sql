-- portal-documents Storage Bucket + RLS Policies für Admin-Upload

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'portal-documents',
  'portal-documents',
  false,
  52428800,  -- 50 MB
  ARRAY['application/pdf', 'image/jpeg', 'image/png', 'image/webp', 'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
)
ON CONFLICT (id) DO NOTHING;

-- Admin: Vollzugriff
DROP POLICY IF EXISTS "Admin can upload portal documents"  ON storage.objects;
DROP POLICY IF EXISTS "Admin can read portal documents"   ON storage.objects;
DROP POLICY IF EXISTS "Admin can update portal documents" ON storage.objects;
DROP POLICY IF EXISTS "Admin can delete portal documents" ON storage.objects;
DROP POLICY IF EXISTS "Customers can read own documents"  ON storage.objects;

CREATE POLICY "Admin can upload portal documents" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'portal-documents'
    AND auth.jwt() ->> 'email' = 'el@magicel.de'
  );

CREATE POLICY "Admin can read portal documents" ON storage.objects
  FOR SELECT TO authenticated
  USING (
    bucket_id = 'portal-documents'
    AND auth.jwt() ->> 'email' = 'el@magicel.de'
  );

CREATE POLICY "Admin can update portal documents" ON storage.objects
  FOR UPDATE TO authenticated
  USING (
    bucket_id = 'portal-documents'
    AND auth.jwt() ->> 'email' = 'el@magicel.de'
  );

CREATE POLICY "Admin can delete portal documents" ON storage.objects
  FOR DELETE TO authenticated
  USING (
    bucket_id = 'portal-documents'
    AND auth.jwt() ->> 'email' = 'el@magicel.de'
  );

-- Kunden: nur eigene Dokumente lesen (via signed URL / public path)
CREATE POLICY "Customers can read own documents" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'portal-documents');
