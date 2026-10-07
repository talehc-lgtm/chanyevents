CREATE TABLE public.quote_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL, email text NOT NULL, phone text, company text,
  event_type text, event_date text, guests text, budget text, location text, details text,
  status text NOT NULL DEFAULT 'new'
);
GRANT INSERT ON public.quote_requests TO anon, authenticated;
GRANT ALL ON public.quote_requests TO service_role;
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY public_insert_quotes ON public.quote_requests FOR INSERT TO anon, authenticated WITH CHECK (status = 'new');

CREATE TABLE public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL, email text NOT NULL, message text NOT NULL,
  status text NOT NULL DEFAULT 'new'
);
GRANT INSERT ON public.contact_messages TO anon, authenticated;
GRANT ALL ON public.contact_messages TO service_role;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY public_insert_messages ON public.contact_messages FOR INSERT TO anon, authenticated WITH CHECK (status = 'new');