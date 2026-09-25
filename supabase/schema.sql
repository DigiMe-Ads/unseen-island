-- The Unseen Island: content overrides, contact enquiries and admin access.
-- Safe to re-run.

-- Admins ---------------------------------------------------------------------
create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

alter table public.admins enable row level security;

drop policy if exists "admins can see admins" on public.admins;
create policy "admins can see admins" on public.admins
  for select to authenticated using (public.is_admin());

-- Site content ---------------------------------------------------------------
-- One row per section; `data` holds only the fields changed from the defaults in the code.
create table if not exists public.site_content (
  id text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users (id) on delete set null
);

alter table public.site_content enable row level security;

drop policy if exists "content is public" on public.site_content;
create policy "content is public" on public.site_content
  for select to anon, authenticated using (true);

drop policy if exists "admins insert content" on public.site_content;
create policy "admins insert content" on public.site_content
  for insert to authenticated with check (public.is_admin());

drop policy if exists "admins update content" on public.site_content;
create policy "admins update content" on public.site_content
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admins delete content" on public.site_content;
create policy "admins delete content" on public.site_content
  for delete to authenticated using (public.is_admin());

-- Enquiries ------------------------------------------------------------------
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 200),
  email text not null check (char_length(email) between 3 and 320 and email like '%@%'),
  interest text check (char_length(interest) <= 200),
  dates text check (char_length(dates) <= 200),
  message text not null check (char_length(message) between 1 and 5000),
  status text not null default 'new' check (status in ('new', 'read', 'archived')),
  created_at timestamptz not null default now()
);

-- How the visitor sent it: the form alone, or the form plus a pre-filled WhatsApp message.
alter table public.inquiries add column if not exists channel text not null default 'form' check (channel in ('form', 'whatsapp'));

create index if not exists inquiries_created_at_idx on public.inquiries (created_at desc);

alter table public.inquiries enable row level security;

-- Visitors may only submit new enquiries; they can never read them back.
drop policy if exists "anyone can submit an enquiry" on public.inquiries;
create policy "anyone can submit an enquiry" on public.inquiries
  for insert to anon, authenticated with check (status = 'new');

drop policy if exists "admins read enquiries" on public.inquiries;
create policy "admins read enquiries" on public.inquiries
  for select to authenticated using (public.is_admin());

drop policy if exists "admins update enquiries" on public.inquiries;
create policy "admins update enquiries" on public.inquiries
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admins delete enquiries" on public.inquiries;
create policy "admins delete enquiries" on public.inquiries
  for delete to authenticated using (public.is_admin());

-- Grants (RLS above decides which rows each role can touch) -------------------
revoke all on public.admins, public.site_content, public.inquiries from anon, authenticated;
grant select on public.site_content to anon, authenticated;
grant insert, update, delete on public.site_content to authenticated;
grant insert (name, email, interest, dates, message, channel) on public.inquiries to anon, authenticated;
grant select, update, delete on public.inquiries to authenticated;
grant select on public.admins to authenticated;
grant execute on function public.is_admin() to anon, authenticated;

-- Image storage --------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('site-images', 'site-images', true, 10485760, array['image/webp', 'image/jpeg', 'image/png', 'image/avif', 'image/gif'])
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "admins list site images" on storage.objects;
create policy "admins list site images" on storage.objects
  for select to authenticated using (bucket_id = 'site-images' and public.is_admin());

drop policy if exists "admins upload site images" on storage.objects;
create policy "admins upload site images" on storage.objects
  for insert to authenticated with check (bucket_id = 'site-images' and public.is_admin());

drop policy if exists "admins update site images" on storage.objects;
create policy "admins update site images" on storage.objects
  for update to authenticated using (bucket_id = 'site-images' and public.is_admin());

drop policy if exists "admins delete site images" on storage.objects;
create policy "admins delete site images" on storage.objects
  for delete to authenticated using (bucket_id = 'site-images' and public.is_admin());
