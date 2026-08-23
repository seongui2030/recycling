-- recycling / SDGs 12
-- Supabase SQL Editor에서 실행

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  name text,
  role text not null default 'donor'
    check (role in ('donor','staff','teacher','admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.donations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  donation_date timestamptz not null default now(),
  total_count integer not null default 0 check (total_count >= 0),
  status text not null default 'draft'
    check (status in ('draft','confirmed','reviewed','rejected')),
  created_at timestamptz not null default now()
);

create table if not exists public.donation_items (
  id uuid primary key default gen_random_uuid(),
  donation_id uuid not null references public.donations(id) on delete cascade,
  category text not null check (
    category in ('clothes','shoes','book','kitchenware','small_appliance','bag')
  ),
  quantity integer not null default 0 check (quantity >= 0),
  confidence numeric(5,4),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.donations enable row level security;
alter table public.donation_items enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
on public.profiles for select
using (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
on public.profiles for insert
with check (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
on public.profiles for update
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "donations_own_all" on public.donations;
create policy "donations_own_all"
on public.donations
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "items_select_own" on public.donation_items;
create policy "items_select_own"
on public.donation_items for select
using (
  exists (
    select 1 from public.donations d
    where d.id = donation_id and d.user_id = auth.uid()
  )
);

drop policy if exists "items_insert_own" on public.donation_items;
create policy "items_insert_own"
on public.donation_items for insert
with check (
  exists (
    select 1 from public.donations d
    where d.id = donation_id and d.user_id = auth.uid()
  )
);

drop policy if exists "items_update_own" on public.donation_items;
create policy "items_update_own"
on public.donation_items for update
using (
  exists (
    select 1 from public.donations d
    where d.id = donation_id and d.user_id = auth.uid()
  )
);

drop policy if exists "items_delete_own" on public.donation_items;
create policy "items_delete_own"
on public.donation_items for delete
using (
  exists (
    select 1 from public.donations d
    where d.id = donation_id and d.user_id = auth.uid()
  )
);

-- 신규 로그인 사용자의 profile 자동 생성
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, email, name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();
