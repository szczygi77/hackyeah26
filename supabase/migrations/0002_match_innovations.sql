-- Wyszukiwanie semantyczne: 3 najbliższe innowacje (cosine distance).
-- Odpalić w SQL Editorze po 0001_init.sql.

create or replace function public.match_innovations(
  query_embedding extensions.vector(1536),
  match_count int default 3
)
returns table (
  id uuid,
  title text,
  description text,
  requirements text,
  category text,
  similarity float
)
language sql
stable
set search_path = public, extensions
as $$
  select
    i.id,
    i.title,
    i.description,
    i.requirements,
    i.category,
    (1 - (i.embedding <=> query_embedding))::float as similarity
  from public.innovations i
  where i.embedding is not null
  order by i.embedding <=> query_embedding
  limit match_count;
$$;

grant execute on function public.match_innovations(extensions.vector(1536), int) to service_role;
