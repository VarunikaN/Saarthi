create extension if not exists vector;

create table public.source_chunks (
  id uuid primary key default gen_random_uuid(),
  domain text not null,
  effective_date date not null,
  source_title text not null,
  source_url text not null,
  content text not null,
  embedding vector(1536)
);

create or replace function public.match_source_chunks(query_embedding vector(1536), match_count int default 5)
returns table (id uuid, domain text, effective_date date, source_title text, source_url text, content text, similarity float)
language sql stable as $$
  select id, domain, effective_date, source_title, source_url, content, 1 - (embedding <=> query_embedding)
  from public.source_chunks
  order by embedding <=> query_embedding
  limit match_count;
$$;

create or replace function public.search_source_chunks(query_text text, match_count int default 5)
returns table (id uuid, domain text, effective_date date, source_title text, source_url text, content text)
language sql stable as $$
  select id, domain, effective_date, source_title, source_url, content
  from public.source_chunks
  where to_tsvector('english', source_title || ' ' || content) @@ websearch_to_tsquery('english', query_text)
  order by ts_rank(to_tsvector('english', source_title || ' ' || content), websearch_to_tsquery('english', query_text)) desc
  limit match_count;
$$;

alter table public.source_chunks enable row level security;

create policy "public read source chunks"
on public.source_chunks for select to anon using (true);

grant execute on function public.match_source_chunks(vector, int) to anon;
grant execute on function public.search_source_chunks(text, int) to anon;

insert into public.source_chunks (domain, effective_date, source_title, source_url, content) values
(
  'Scholarships',
  '2026-08-06',
  'National Scholarship Portal',
  'https://scholarships.gov.in/',
  'The National Scholarship Portal is the Government of India portal for scholarship application services. Applicants should use current portal notices, scheme information, eligibility conditions, timelines, and required-document guidance before applying.'
),
(
  'Benefits',
  '2026-08-06',
  'myScheme',
  'https://www.myscheme.gov.in/',
  'myScheme is a Government of India platform that helps people discover schemes and directs them to official application information. Scheme requirements, application availability, and eligibility can change, so users should verify details on the linked official page.'
),
(
  'Health insurance',
  '2026-08-06',
  'Ayushman Bharat PM-JAY',
  'https://pmjay.gov.in/',
  'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana provides official information about the scheme, beneficiary services, and help channels. Coverage and beneficiary status must be verified through official PM-JAY tools or authorised support, not inferred from a chat response.'
),
(
  'Health insurance',
  '2026-08-06',
  'National Health Authority beneficiary resources',
  'https://nha.gov.in/',
  'The National Health Authority publishes official PM-JAY resources and programme information. Users seeking hospitalisation coverage or beneficiary support should rely on current National Health Authority and PM-JAY channels for confirmation.'
);
