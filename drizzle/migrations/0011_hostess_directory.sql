create table public.hostess_directory (
  id uuid primary key default gen_random_uuid(),
  sort_order integer not null default 0,
  full_name text not null,
  position text not null,
  phone text,
  email text,
  photo text,
  city text,
  created_at timestamptz not null default now()
);
grant select, insert, update, delete on public.hostess_directory to authenticated;
grant all on public.hostess_directory to service_role;
alter table public.hostess_directory enable row level security;
create policy "Admins manage hostess directory" on public.hostess_directory for all to authenticated
using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));