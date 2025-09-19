create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  prenom text not null,
  telephone text not null,
  created_at timestamp with time zone default now()
);

alter table public.registrations enable row level security;
do $$ begin
  if not exists (
    select 1 from pg_policies where tablename = 'registrations' and policyname = 'Allow read'
  ) then
    create policy "Allow read" on public.registrations for select using (true);
  end if;
  if not exists (
    select 1 from pg_policies where tablename = 'registrations' and policyname = 'Allow insert anon'
  ) then
    create policy "Allow insert anon" on public.registrations for insert with check (true);
  end if;
end $$;





