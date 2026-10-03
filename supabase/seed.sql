-- Szczep: dane testowe
-- Wymaga wcześniejszego uruchomienia supabase/migrations/0001_init.sql
-- i 0003_profiles_and_draft_feedback.sql (trigger profiles).
-- Stałe UUID, żeby skrypt dało się powtórzyć (ON CONFLICT DO NOTHING).
--
-- Logowanie (Supabase Auth):
--   innowator@demo.szczep / innowator-demo  (INNOVATOR)
--   admin@demo.szczep     / admin-demo      (ADMIN)

insert into public.innovations (
  id,
  title,
  description,
  requirements,
  category,
  embedding,
  author_id
) values (
  'a1111111-1111-4111-8111-111111111111',
  'Młodzieżowa Strefa Wsparcia',
  'Lokalne miejsce, w którym młodzież może przyjść po wsparcie rówieśnicze, rozmowę z osobą dorosłą i pomoc w sprawach szkoły, domu i zdrowia psychicznego. Strefa działa po lekcjach, bez skierowania.',
  'Potrzebny jest lokal dostępny po południu, co najmniej jedna osoba prowadząca na stałe oraz kontakt do specjalisty (psycholog lub pedagog), do którego można odesłać trudniejsze sprawy.',
  'dzieci, młodzież i rodziny',
  (select array_fill(0::real, array[1536])::extensions.vector),
  'd4444444-4444-4444-8444-444444444441'
)
on conflict (id) do nothing;

insert into public.surveys (
  id,
  innovation_id,
  municipality_type,
  missing_resources,
  implemented_workarounds,
  success_rating
) values
  (
    'c3333333-3333-4333-8333-333333333331',
    'a1111111-1111-4111-8111-111111111111',
    'WIEŚ',
    'Brakowało własnego lokalu. W gminie nie było świetlicy ani sali, którą dałoby się oddać młodzieży na stałe.',
    'Spotkania przeniesiono do remizy OSP. Druhowie udostępnili salę po południu, gdy wóz nie wyjeżdżał.',
    4
  ),
  (
    'c3333333-3333-4333-8333-333333333332',
    'a1111111-1111-4111-8111-111111111111',
    'MAŁE_MIASTO',
    'Problemem był brak specjalistów. W mieście nie było psychologa ani pedagoga, który mógłby przyjmować młodzież na miejscu.',
    'Raz w miesiącu przyjeżdżał specjalista z powiatu na dyżur. Na co dzień strefę prowadził nauczyciel po godzinach.',
    3
  ),
  (
    'c3333333-3333-4333-8333-333333333333',
    'a1111111-1111-4111-8111-111111111111',
    'DUŻE_MIASTO',
    'Lokal i kadra były. Brakowało stałych godzin otwarcia, więc młodzież nie wiedziała, kiedy strefa działa.',
    'Ustalono dyżur od poniedziałku do czwartku, 15:00–18:00, i wywieszono grafik w szkole oraz w MOPS.',
    5
  )
on conflict (id) do nothing;

-- Konta testowe. Trigger on_auth_user_created zapisuje public.profiles.
-- pgcrypto w Supabase jest w schemacie extensions.

insert into auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) values
  (
    '00000000-0000-0000-0000-000000000000',
    'd4444444-4444-4444-8444-444444444441',
    'authenticated',
    'authenticated',
    'innowator@demo.szczep',
    extensions.crypt('innowator-demo', extensions.gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{"role":"INNOVATOR"}',
    now(),
    now(),
    '',
    '',
    '',
    ''
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    'd4444444-4444-4444-8444-444444444442',
    'authenticated',
    'authenticated',
    'admin@demo.szczep',
    extensions.crypt('admin-demo', extensions.gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{"role":"ADMIN"}',
    now(),
    now(),
    '',
    '',
    '',
    ''
  )
on conflict (id) do nothing;

insert into auth.identities (
  id,
  user_id,
  provider_id,
  identity_data,
  provider,
  last_sign_in_at,
  created_at,
  updated_at
) values
  (
    'e5555555-5555-4555-8555-555555555551',
    'd4444444-4444-4444-8444-444444444441',
    'd4444444-4444-4444-8444-444444444441',
    jsonb_build_object(
      'sub', 'd4444444-4444-4444-8444-444444444441',
      'email', 'innowator@demo.szczep',
      'email_verified', true
    ),
    'email',
    now(),
    now(),
    now()
  ),
  (
    'e5555555-5555-4555-8555-555555555552',
    'd4444444-4444-4444-8444-444444444442',
    'd4444444-4444-4444-8444-444444444442',
    jsonb_build_object(
      'sub', 'd4444444-4444-4444-8444-444444444442',
      'email', 'admin@demo.szczep',
      'email_verified', true
    ),
    'email',
    now(),
    now(),
    now()
  )
on conflict (id) do nothing;

insert into public.innovation_drafts (
  id,
  innovation_id,
  proposed_variants,
  status,
  created_by
) values (
  'f6666666-6666-4666-8666-666666666661',
  'a1111111-1111-4111-8111-111111111111',
  jsonb_build_object(
    'ruralVariant', 'Spotkania przenieś do remizy OSP po południu. Dyżur osoby dorosłej w stałych godzinach, a trudniejsze sprawy odsyłaj do specjalisty z powiatu.',
    'urbanVariant', 'Ustal dyżur od poniedziałku do czwartku, 15:00–18:00, i wywieś grafik w szkole oraz w MOPS, żeby młodzież wiedziała, kiedy strefa działa.'
  ),
  'DRAFT',
  'd4444444-4444-4444-8444-444444444441'
)
on conflict (id) do nothing;
