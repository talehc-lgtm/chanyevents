CREATE TABLE public.casting_evaluations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  full_name text NOT NULL,
  phone text,
  number integer,
  presentation integer,
  posture integer,
  elocution integer,
  smile integer,
  experience integer,
  comment text,
  decision text NOT NULL DEFAULT 'pending'
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.casting_evaluations TO authenticated;
GRANT ALL ON public.casting_evaluations TO service_role;
ALTER TABLE public.casting_evaluations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage casting" ON public.casting_evaluations FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));