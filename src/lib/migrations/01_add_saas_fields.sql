-- ==========================================
-- Migration: 01_add_saas_fields.sql
-- ==========================================
-- 목적: 기존 데이터를 보존하면서 SaaS 유료 전환에 필요한 
-- 플랜, 기능 제한 관련 컬럼을 안전하게 추가합니다.
-- ==========================================

-- 1. shops 테이블에 기능 추가
ALTER TABLE public.shops 
ADD COLUMN IF NOT EXISTS plan text check (plan in ('basic', 'pro', 'premium')) default 'basic',
ADD COLUMN IF NOT EXISTS max_customers integer default 100,
ADD COLUMN IF NOT EXISTS sms_count integer default 0,
ADD COLUMN IF NOT EXISTS sms_limit integer default 100,
ADD COLUMN IF NOT EXISTS ai_enabled boolean default false;

-- 2. 기존 RLS 정책은 수정하지 않습니다. (그대로 유지)
