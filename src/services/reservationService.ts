import { supabase } from '../lib/supabase';
import type { Reservation } from '../types/schema';

export const reservationService = {
  /** 샵 전체 예약 조회 (고객 정보 JOIN) */
  async getAll(shopId: string): Promise<Reservation[]> {
    const { data, error } = await supabase
      .from('reservations')
      .select(`
        *,
        customer:customers(id, name, phone, type)
      `)
      .eq('shop_id', shopId)
      .order('reservation_time', { ascending: true });
    if (error) throw error;
    return data ?? [];
  },

  /** 오늘 예약만 조회 */
  async getToday(shopId: string): Promise<Reservation[]> {
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase
      .from('reservations')
      .select(`
        *,
        customer:customers(id, name, phone, type)
      `)
      .eq('shop_id', shopId)
      .gte('reservation_time', `${today}T00:00:00`)
      .lte('reservation_time', `${today}T23:59:59`)
      .order('reservation_time', { ascending: true });
    if (error) throw error;
    return data ?? [];
  },

  /** 예약 생성 */
  async create(payload: Omit<Reservation, 'id' | 'created_at' | 'customer'>): Promise<Reservation> {
    const { data, error } = await supabase
      .from('reservations')
      .insert(payload)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  /** 예약 상태 변경 */
  async updateStatus(id: string, status: Reservation['status']): Promise<void> {
    const { error } = await supabase
      .from('reservations')
      .update({ status })
      .eq('id', id);
    if (error) throw error;
  },

  /** 예약 삭제 */
  async remove(id: string): Promise<void> {
    const { error } = await supabase
      .from('reservations')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },
};
