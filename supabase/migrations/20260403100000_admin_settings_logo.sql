-- Add logo URL and subtitle to admin_settings
ALTER TABLE public.admin_settings
  ADD COLUMN IF NOT EXISTS company_logo_url TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS company_subtitle TEXT DEFAULT '';

-- Create logos storage bucket (public read)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'logos',
  'logos',
  true,
  2097152,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
) ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public can read logos"       ON storage.objects;
DROP POLICY IF EXISTS "Auth users can upload logos" ON storage.objects;
DROP POLICY IF EXISTS "Auth users can update logos" ON storage.objects;
DROP POLICY IF EXISTS "Auth users can delete logos" ON storage.objects;

CREATE POLICY "Public can read logos" ON storage.objects
  FOR SELECT USING (bucket_id = 'logos');

CREATE POLICY "Auth users can upload logos" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'logos');

CREATE POLICY "Auth users can update logos" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'logos');

CREATE POLICY "Auth users can delete logos" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'logos');
