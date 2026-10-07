DROP POLICY IF EXISTS public_insert_applications ON public.job_applications;
CREATE POLICY public_insert_applications ON public.job_applications
FOR INSERT TO anon, authenticated
WITH CHECK (
  score IS NULL AND ai_summary IS NULL AND ai_recommendation IS NULL AND evaluated_at IS NULL
  AND char_length(position) BETWEEN 2 AND 100
  AND char_length(full_name) BETWEEN 2 AND 100
  AND char_length(phone) BETWEEN 8 AND 20
  AND (email IS NULL OR char_length(email) <= 255)
  AND (city IS NULL OR char_length(city) <= 100)
  AND (experience IS NULL OR char_length(experience) <= 500)
  AND (message IS NULL OR char_length(message) <= 1000)
  AND (age IS NULL OR age BETWEEN 16 AND 70)
  AND (height_cm IS NULL OR height_cm BETWEEN 140 AND 220)
  AND (photo_paths IS NULL OR array_length(photo_paths, 1) <= 2)
  AND (cv_path IS NULL OR cv_path ~ '^[0-9a-f-]{36}/[0-9a-f-]{36}\.[a-z0-9]{1,5}$')
);

DROP POLICY IF EXISTS "Anyone can upload application files" ON storage.objects;
CREATE POLICY "Anyone can upload application files"
ON storage.objects FOR INSERT TO anon, authenticated
WITH CHECK (
  bucket_id = 'applications'
  AND name ~ '^[0-9a-f-]{36}/[0-9a-f-]{36}\.(pdf|doc|docx|jpg|jpeg|png|webp|heic|gif)$'
);