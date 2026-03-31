-- Create customer-avatars storage bucket (public read, authenticated write)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'customer-avatars',
  'customer-avatars',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
) ON CONFLICT (id) DO NOTHING;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Public can read avatars"       ON storage.objects;
DROP POLICY IF EXISTS "Auth users can upload avatars" ON storage.objects;
DROP POLICY IF EXISTS "Auth users can update avatars" ON storage.objects;
DROP POLICY IF EXISTS "Auth users can delete avatars" ON storage.objects;

-- Anyone can read (public bucket for displaying avatars in portal)
CREATE POLICY "Public can read avatars" ON storage.objects
  FOR SELECT USING (bucket_id = 'customer-avatars');

-- Any authenticated user can upload to customer-avatars
CREATE POLICY "Auth users can upload avatars" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'customer-avatars');

-- Any authenticated user can update (overwrite) in customer-avatars
CREATE POLICY "Auth users can update avatars" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'customer-avatars');

-- Any authenticated user can delete from customer-avatars
CREATE POLICY "Auth users can delete avatars" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'customer-avatars');
