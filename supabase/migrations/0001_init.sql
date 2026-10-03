-- Szczep: schemat Supabase + pgvector
-- Odpalić w SQL Editorze przed supabase/seed.sql

create extension if not exists vector with schema extensions;

create type public.municipality_type as enum (
  'WIEŚ',
  'MAŁE_MIASTO',
  'DUŻE_MIASTO'
);

create type public.draft_status as enum (
  'DRAFT',
  'PENDING_APPROVAL',
  'PUBLISHED'
);

create table public.innovations (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  requirements text not null,
  category text not null,
  embedding extensions.vector(1536),
  author_id uuid not null
);

create index innovations_embedding_hnsw_idx
  on public.innovations
  using hnsw (embedding extensions.vector_cosine_ops);

create table public.surveys (
  id uuid primary key default gen_random_uuid(),
  innovation_id uuid not null references public.innovations (id) on delete cascade,
  municipality_type public.municipality_type not null,
  missing_resources text not null,
  implemented_workarounds text not null,
  success_rating smallint not null check (success_rating between 1 and 5)
);

create table public.innovation_drafts (
  id uuid primary key default gen_random_uuid(),
  innovation_id uuid not null references public.innovations (id) on delete cascade,
  proposed_variants jsonb not null,
  status public.draft_status not null default 'DRAFT',
  created_by uuid not null
);
