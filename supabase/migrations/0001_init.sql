-- Mountain Insulation: initial schema (app data + RLS)

create extension if not exists pgcrypto;

-- Common trigger for updated_at
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Profiles / roles
create table if not exists public.profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'customer' check (role in ('customer', 'staff', 'admin')),
  full_name text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create or replace function public.is_staff()
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.profiles p
    where p.user_id = auth.uid()
      and p.role in ('staff', 'admin')
  );
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.profiles p
    where p.user_id = auth.uid()
      and p.role = 'admin'
  );
$$;

alter table public.profiles enable row level security;

drop policy if exists profiles_select_own_or_staff on public.profiles;
create policy profiles_select_own_or_staff
on public.profiles
for select
using (user_id = auth.uid() or public.is_staff());

drop policy if exists profiles_insert_self on public.profiles;
create policy profiles_insert_self
on public.profiles
for insert
with check (user_id = auth.uid());

drop policy if exists profiles_update_own_or_staff on public.profiles;
create policy profiles_update_own_or_staff
on public.profiles
for update
using (user_id = auth.uid() or public.is_staff())
with check (user_id = auth.uid() or public.is_staff());

-- Quote requests (leads)
create table if not exists public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  customer_user_id uuid references auth.users (id) on delete set null,
  assigned_to_user_id uuid references auth.users (id) on delete set null,

  status text not null default 'new' check (status in ('new', 'contacted', 'scheduled', 'quoted', 'won', 'lost')),

  property_type text,
  building_stage text,
  insulation_types text[] not null default '{}'::text[],
  areas text[] not null default '{}'::text[],

  square_footage int,
  year_built int,
  current_insulation text,
  known_issues text[] not null default '{}'::text[],

  contact_name text not null,
  contact_email text not null,
  contact_phone text,
  property_address text,
  preferred_contact_method text,
  availability jsonb,

  additional_notes text,
  referral_source text
);

create index if not exists quote_requests_customer_user_id_idx
on public.quote_requests (customer_user_id);

drop trigger if exists quote_requests_set_updated_at on public.quote_requests;
create trigger quote_requests_set_updated_at
before update on public.quote_requests
for each row execute function public.set_updated_at();

alter table public.quote_requests enable row level security;

drop policy if exists quote_requests_select_own_or_staff on public.quote_requests;
create policy quote_requests_select_own_or_staff
on public.quote_requests
for select
using (public.is_staff() or customer_user_id = auth.uid());

drop policy if exists quote_requests_insert_authenticated on public.quote_requests;
create policy quote_requests_insert_authenticated
on public.quote_requests
for insert
with check (public.is_staff() or customer_user_id = auth.uid());

drop policy if exists quote_requests_update_staff on public.quote_requests;
create policy quote_requests_update_staff
on public.quote_requests
for update
using (public.is_staff())
with check (public.is_staff());

-- Quote request attachments (metadata; files live in Storage)
create table if not exists public.quote_request_attachments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  quote_request_id uuid not null references public.quote_requests (id) on delete cascade,
  storage_path text not null,
  file_name text not null,
  content_type text,
  size_bytes int
);

create index if not exists quote_request_attachments_quote_request_id_idx
on public.quote_request_attachments (quote_request_id);

alter table public.quote_request_attachments enable row level security;

drop policy if exists quote_request_attachments_select_own_or_staff on public.quote_request_attachments;
create policy quote_request_attachments_select_own_or_staff
on public.quote_request_attachments
for select
using (
  public.is_staff()
  or exists (
    select 1
    from public.quote_requests qr
    where qr.id = quote_request_id
      and qr.customer_user_id = auth.uid()
  )
);

drop policy if exists quote_request_attachments_insert_staff on public.quote_request_attachments;
create policy quote_request_attachments_insert_staff
on public.quote_request_attachments
for insert
with check (public.is_staff());

-- Projects
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  customer_user_id uuid not null references auth.users (id) on delete cascade,
  title text not null,
  status text not null default 'active' check (status in ('active', 'completed', 'on_hold', 'cancelled')),
  description text
);

drop trigger if exists projects_set_updated_at on public.projects;
create trigger projects_set_updated_at
before update on public.projects
for each row execute function public.set_updated_at();

alter table public.projects enable row level security;

drop policy if exists projects_select_own_or_staff on public.projects;
create policy projects_select_own_or_staff
on public.projects
for select
using (public.is_staff() or customer_user_id = auth.uid());

drop policy if exists projects_write_staff on public.projects;
create policy projects_write_staff
on public.projects
for all
using (public.is_staff())
with check (public.is_staff());

