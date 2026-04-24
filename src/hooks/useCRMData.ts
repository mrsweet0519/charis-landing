import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useShop } from '../contexts/ShopContext';
import type { Customer, Reservation, Sales, User as Staff } from '../types/schema';

export const useCRMData = () => {
  const { currentShop } = useShop();
  
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [sales, setSales] = useState<Sales[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!currentShop) return;
    setLoading(true);
    setError(null);
    try {
      // 고객 데이터 로드
      const { data: cData, error: cErr } = await supabase
        .from('customers')
        .select('*')
        .eq('shop_id', currentShop.id)
        .order('created_at', { ascending: false });
      if (cErr) throw cErr;

      // 예약 데이터 로드 (고객 정보 일부 Join)
      const { data: rData, error: rErr } = await supabase
        .from('reservations')
        .select('*, customer:customers(name, phone, type)')
        .eq('shop_id', currentShop.id)
        .order('reservation_time', { ascending: false });
      if (rErr) throw rErr;

      // 매출 데이터 로드
      const { data: sData, error: sErr } = await supabase
        .from('sales')
        .select('*')
        .eq('shop_id', currentShop.id)
        .order('created_at', { ascending: false });
      if (sErr) throw sErr;

      // 직원 데이터 로드
      const { data: stData, error: stErr } = await supabase
        .from('users')
        .select('*')
        .eq('shop_id', currentShop.id);
      if (stErr) throw stErr;

      setCustomers(cData as Customer[]);
      setReservations(rData as Reservation[]);
      setSales(sData as Sales[]);
      setStaff(stData as Staff[]);
    } catch (err: unknown) {
      console.error('CRM 데이터 로드 실패:', err);
      setError(err instanceof Error ? err.message : 'CRM 데이터 로드 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!currentShop) {
      setCustomers([]);
      setReservations([]);
      setSales([]);
      setStaff([]);
      setLoading(false);
      return;
    }

    fetchData();
  }, [currentShop]);

  return { customers, reservations, sales, staff, loading, error, refreshData: fetchData };
};
