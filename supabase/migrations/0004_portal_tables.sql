-- Customer portal tables: documents, messaging, appointments

-- Documents
create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  customer_user_id uuid not null references auth.users (id) on delete cascade,
  project_id uuid references public.projects (id) on delete set null,
  quote_request_id uuid references public.quote_requests (id) on delete set null,

  title text not null,
  doc_type text,
  storage_bucket text not null default 'quote-uploads',
  storage_path text not null,
  file_name text not null,
  content_type text,
  size_bytes int
);

drop trigger if exists documents_set_updated_at on public.documents;
create trigger documents_set_updated_at
before update on public.documents
for each row execute function public.set_updated_at();

create index if not exists documents_customer_user_id_idx
on public.documents (customer_user_id);

alter table public.documents enable row level security;

drop policy if exists documents_select_own_or_staff on public.documents;
create policy documents_select_own_or_staff
on public.documents
for select
using (public.is_staff() or customer_user_id = auth.uid());

drop policy if exists documents_write_staff on public.documents;
create policy documents_write_staff
on public.documents
for all
using (public.is_staff())
with check (public.is_staff());

-- Messaging
create table if not exists public.message_threads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  customer_user_id uuid not null references auth.users (id) on delete cascade,
  subject text not null,
  status text not null default 'open' check (status in ('open', 'closed'))
);

drop trigger if exists message_threads_set_updated_at on public.message_threads;
create trigger message_threads_set_updated_at
before update on public.message_threads
for each row execute function public.set_updated_at();

create index if not exists message_threads_customer_user_id_idx
on public.message_threads (customer_user_id);

alter table public.message_threads enable row level security;

drop policy if exists message_threads_select_own_or_staff on public.message_threads;
create policy message_threads_select_own_or_staff
on public.message_threads
for select
using (public.is_staff() or customer_user_id = auth.uid());

drop policy if exists message_threads_insert_own on public.message_threads;
create policy message_threads_insert_own
on public.message_threads
for insert
with check (customer_user_id = auth.uid());

drop policy if exists message_threads_update_staff on public.message_threads;
create policy message_threads_update_staff
on public.message_threads
for update
using (public.is_staff())
with check (public.is_staff());

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  thread_id uuid not null references public.message_threads (id) on delete cascade,
  sender_user_id uuid references auth.users (id) on delete set null,
  sender_role text not null default 'customer' check (sender_role in ('customer', 'staff', 'system')),
  body text not null
);

create index if not exists messages_thread_id_idx
on public.messages (thread_id, created_at desc);

alter table public.messages enable row level security;

drop policy if exists messages_select_thread_own_or_staff on public.messages;
create policy messages_select_thread_own_or_staff
on public.messages
for select
using (
  public.is_staff()
  or exists (
    select 1
    from public.message_threads t
    where t.id = thread_id
      and t.customer_user_id = auth.uid()
  )
);

drop policy if exists messages_insert_customer_or_staff on public.messages;
create policy messages_insert_customer_or_staff
on public.messages
for insert
with check (
  (sender_user_id = auth.uid() and sender_role = 'customer'
    and exists (
      select 1
      from public.message_threads t
      where t.id = thread_id
        and t.customer_user_id = auth.uid()
    )
  )
  or public.is_staff()
);

-- Appointment requests (simple for now)
create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  customer_user_id uuid not null references auth.users (id) on delete cascade,
  quote_request_id uuid references public.quote_requests (id) on delete set null,

  requested_times jsonb,
  notes text,
  status text not null default 'requested' check (status in ('requested', 'scheduled', 'cancelled'))
);

drop trigger if exists appointments_set_updated_at on public.appointments;
create trigger appointments_set_updated_at
before update on public.appointments
for each row execute function public.set_updated_at();

alter table public.appointments enable row level security;

drop policy if exists appointments_select_own_or_staff on public.appointments;
create policy appointments_select_own_or_staff
on public.appointments
for select
using (public.is_staff() or customer_user_id = auth.uid());

drop policy if exists appointments_insert_own on public.appointments;
create policy appointments_insert_own
on public.appointments
for insert
with check (customer_user_id = auth.uid());

drop policy if exists appointments_update_staff on public.appointments;
create policy appointments_update_staff
on public.appointments
for update
using (public.is_staff())
with check (public.is_staff());

