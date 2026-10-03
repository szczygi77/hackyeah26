-- Role użytkowników i status szkiców.
-- Odpalić w SQL Editorze po 0001_init.sql i 0002_match_innovations.sql.
-- Nowej wartości enuma (REJECTED) nie używamy w tym skrypcie:
-- w jednej transakcji PostgreSQL nie pozwala jej od razu wstawić.

create type public.user_role as enum (
  'INNOVATOR',
  'ADMIN'
);

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  role public.user_role not null default 'INNOVATOR'
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  assigned_role public.user_role := 'INNOVATOR';
  meta_role text := new.raw_user_meta_data ->> 'role';
begin
  if meta_role in ('INNOVATOR', 'ADMIN') then
    assigned_role := meta_role::public.user_role;
  end if;

  insert into public.profiles (id, email, role)
  values (new.id, coalesce(new.email, ''), assigned_role)
  on conflict (id) do nothing;

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- security definer omija RLS, żeby polityka admina nie zapętlała się na profiles.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'ADMIN'
  );
$$;

alter table public.profiles enable row level security;

create policy profiles_select_own
  on public.profiles
  for select
  to authenticated
  using (id = auth.uid());

create policy profiles_select_admin
  on public.profiles
  for select
  to authenticated
  using (public.is_admin());

grant select on public.profiles to authenticated;
grant all on public.profiles to service_role;
grant execute on function public.is_admin() to authenticated;

alter type public.draft_status add value if not exists 'REJECTED';

alter table public.innovation_drafts
  add column if not exists feedback text;
