ALTER TABLE public.job_applications
  ADD COLUMN IF NOT EXISTS age integer,
  ADD COLUMN IF NOT EXISTS height_cm integer,
  ADD COLUMN IF NOT EXISTS speaks_french boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS speaks_english boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS full_availability boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS cv_path text,
  ADD COLUMN IF NOT EXISTS photo_paths text[];

CREATE POLICY "Anyone can upload application files"
ON storage.objects FOR INSERT TO anon, authenticated
WITH CHECK (bucket_id = 'applications');