-- 'books' 테이블 생성
-- 이 SQL을 Supabase SQL Editor에서 실행하세요.

create table public.books (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  author text not null,
  cover_url text,
  rating integer default 0,
  memo text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS (Row Level Security) 설정
-- 테스트를 위해 모든 사용자가 접근 가능하도록 설정합니다.
alter table public.books enable row level security;

create policy "Allow public access" on public.books
  for all using (true) with check (true);
