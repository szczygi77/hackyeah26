-- Szczep: dane testowe
-- Wymaga wcześniejszego uruchomienia supabase/migrations/0001_init.sql
-- Stałe UUID, żeby skrypt dało się powtórzyć (ON CONFLICT DO NOTHING).

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
  'b2222222-2222-4222-8222-222222222222'
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
