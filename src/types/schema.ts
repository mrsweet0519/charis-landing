/**
 * Supabase DB 스키마와 1:1 대응하는 TypeScript 타입 정의
 */

export interface Shop {
  id: string;
  name: string;
  owner_email?: string;
  contact?: string;
  address?: string;
  plan?: 'basic' | 'pro' | 'premium';
  max_customers?: number;
  sms_count?: number;
  sms_limit?: number;
  ai_enabled?: boolean;
  created_at: string;
}

export interface User {
  id: string;
  shop_id: string;
  email: string;
  name?: string;
  role: 'admin' | 'staff';
  created_at: string;
}

export interface Customer {
  id: string;
  shop_id: string;
  name: string;
  phone?: string;
  memo?: string;
  last_visit_date?: string;
  type: 'NEW' | 'REGULAR' | 'DORMANT';
  created_at: string;
}

export interface Reservation {
  id: string;
  shop_id: string;
  customer_id?: string;
  staff_id?: string;
  service_name: string;
  price: number;
  reservation_time: string; // ISO datetime
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'NOSHOW' | 'COMPLETED';
  memo?: string;
  created_at: string;
  // JOIN 결과 포함 (optional)
  customer?: Customer;
}

export interface Sales {
  id: string;
  shop_id: string;
  reservation_id?: string;
  customer_id?: string;
  amount: number;
  payment_type: 'CASH' | 'CARD' | 'TRANSFER';
  note?: string;
  created_at: string;
}
