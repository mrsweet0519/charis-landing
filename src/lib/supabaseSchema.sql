-- ============================================================
-- Charis Beauty CRM - Supabase Database Schema
-- Supabase SQL Editor에서 이 파일 전체를 실행하세요.
-- ============================================================

-- 1. shops 테이블
create table if not exists public.shops (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  owner_email text,
  contact text,
  address text,
  created_at timestamptz default now()
);

-- 2. users 테이블 (Supabase Auth 연동)
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  shop_id uuid references public.shops(id) on delete cascade,
  email text not null,
  name text,
  role text check (role in ('admin', 'staff')) default 'admin',
  created_at timestamptz default now()
);

-- 3. customers 테이블
create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid references public.shops(id) on delete cascade not null,
  name text not null,
  phone text,
  memo text,
  last_visit_date date,
  type text check (type in ('NEW', 'REGULAR', 'DORMANT')) default 'NEW',
  created_at timestamptz default now()
);

-- 4. reservations 테이블
create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid references public.shops(id) on delete cascade not null,
  customer_id uuid references public.customers(id) on delete set null,
  staff_id uuid references public.users(id) on delete set null,
  service_name text not null,
  price integer default 0,
  reservation_time timestamptz not null,
  status text check (status in ('PENDING', 'CONFIRMED', 'CANCELLED', 'NOSHOW', 'COMPLETED')) default 'PENDING',
  memo text,
  created_at timestamptz default now()
);

-- 5. sales 테이블
create table if not exists public.sales (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid references public.shops(id) on delete cascade not null,
  reservation_id uuid references public.reservations(id) on delete set null,
  customer_id uuid references public.customers(id) on delete set null,
  amount integer not null default 0,
  payment_type text check (payment_type in ('CASH', 'CARD', 'TRANSFER')) default 'CARD',
  note text,
  created_at timestamptz default now()
);

-- ============================================================
-- Row Level Security (RLS) 설정
-- ============================================================

alter table public.shops enable row level security;
alter table public.users enable row level security;
alter table public.customers enable row level security;
alter table public.reservations enable row level security;
alter table public.sales enable row level security;

-- shops: 로그인한 유저가 자신의 shop만 접근
drop policy if exists "Users can access own shop" on public.shops;
create policy "Users can access own shop"
  on public.shops for select, update, delete
  using (
    id in (
      select shop_id from public.users where id = auth.uid()
    )
  );

create policy "Enable insert for authenticated users"
  on public.shops for insert
  with check (auth.role() = 'authenticated');

-- users: 본인 레코드만 접근
drop policy if exists "Users can access own profile" on public.users;
create policy "Users can select own profile"
  on public.users for select
  using (id = auth.uid());

create policy "Users can update own profile"
  on public.users for update
  using (id = auth.uid());

create policy "Enable insert for owners of profile"
  on public.users for insert
  with check (auth.uid() = id);

-- customers: shop_id 기준 분리
drop policy if exists "Shop can access own customers" on public.customers;
create policy "Shop can access own customers"
  on public.customers for all
  using (
    shop_id in (
      select shop_id from public.users where id = auth.uid()
    )
  );

-- reservations: shop_id 기준 분리
drop policy if exists "Shop can access own reservations" on public.reservations;
create policy "Shop can access own reservations"
  on public.reservations for all
  using (
    shop_id in (
      select shop_id from public.users where id = auth.uid()
    )
  );

-- sales: shop_id 기준 분리
drop policy if exists "Shop can access own sales" on public.sales;
create policy "Shop can access own sales"
  on public.sales for all
  using (
    shop_id in (
      select shop_id from public.users where id = auth.uid()
    )
  );

-- ============================================================
-- 테스트용 샘플 데이터 (선택 사항 - 삭제 가능)
-- ============================================================

-- 샘플 shop 삽입 (auth 없이 데이터 확인용)
-- insert into public.shops (name, owner_email, contact)
-- values ('카리스 뷰티', 'owner@charis.com', '010-0000-0000');
