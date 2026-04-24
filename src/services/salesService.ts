import { supabase } from '../lib/supabase';
import type { Sales } from '../types/schema';

export const salesService = {
  /** 샵 전체 매출 조회 */
  async getAll(shopId: string): Promise<Sales[]> {
    const { data, error } = await supabase
      .from('sales')
      .select('*')
      .eq('shop_id', shopId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data ?? [];
  },

  /** 오늘 매출 합계 */
  async getTodayTotal(shopId: string): Promise<number> {
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase
      .from('sales')
      .select('amount')
      .eq('shop_id', shopId)
      .gte('created_at', `${today}T00:00:00`)
      .lte('created_at', `${today}T23:59:59`);
    if (error) throw error;
    return (data ?? []).reduce((sum, s) => sum + (s.amount ?? 0), 0);
  },

  /** 이번 달 매출 합계 */
  async getMonthTotal(shopId: string): Promise<number> {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    const { data, error } = await supabase
      .from('sales')
      .select('amount')
      .eq('shop_id', shopId)
      .gte('created_at', firstDay);
    if (error) throw error;
    return (data ?? []).reduce((sum, s) => sum + (s.amount ?? 0), 0);
  },

  /** 어제 매출 합계 (전일 대비용) */
  async getYesterdayTotal(shopId: string): Promise<number> {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yd = yesterday.toISOString().split('T')[0];
    const { data, error } = await supabase
      .from('sales')
      .select('amount')
      .eq('shop_id', shopId)
      .gte('created_at', `${yd}T00:00:00`)
      .lte('created_at', `${yd}T23:59:59`);
    if (error) throw error;
    return (data ?? []).reduce((sum, s) => sum + (s.amount ?? 0), 0);
  },

  /** 매출 기록 생성 */
  async create(payload: Omit<Sales, 'id' | 'created_at'>): Promise<Sales> {
    const { data, error } = await supabase
      .from('sales')
      .insert(payload)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  /** 최근 결제 내역 N건 */
  async getRecent(shopId: string, limit = 10): Promise<Sales[]> {
    const { data, error } = await supabase
      .from('sales')
      .select('*')
      .eq('shop_id', shopId)
      .order('created_at', { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data ?? [];
  },
};
