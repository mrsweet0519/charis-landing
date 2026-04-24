import { supabase } from '../lib/supabase';
import type { Customer } from '../types/schema';

export const customerService = {
  /** 샵 전체 고객 조회 */
  async getAll(shopId: string): Promise<Customer[]> {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('shop_id', shopId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data ?? [];
  },

  /** 고객 단건 조회 */
  async getById(id: string): Promise<Customer | null> {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  /** 고객 생성 */
  async create(payload: Omit<Customer, 'id' | 'created_at'>): Promise<Customer> {
    const { data, error } = await supabase
      .from('customers')
      .insert(payload)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  /** 고객 수정 */
  async update(id: string, payload: Partial<Customer>): Promise<Customer> {
    const { data, error } = await supabase
      .from('customers')
      .update(payload)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  /** 고객 삭제 */
  async remove(id: string): Promise<void> {
    const { error } = await supabase
      .from('customers')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },
};
