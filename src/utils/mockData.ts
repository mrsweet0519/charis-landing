import type { Customer, Reservation, Sales } from '../types/schema';

export const mockCustomers: Customer[] = [
  {
    id: 'c1',
    shop_id: 'shop-1',
    name: '이지민',
    phone: '010-1111-2222',
    memo: '민감성 피부, 수분 케어 위주 선호',
    type: 'REGULAR',
    last_visit_date: '2026-04-10',
    created_at: '2026-01-15'
  },
  {
    id: 'c2',
    shop_id: 'shop-1',
    name: '박서준',
    phone: '010-3333-4444',
    memo: '남성 컷, 다운펌 정기적 시술',
    type: 'NEW',
    last_visit_date: '2026-04-14',
    created_at: '2026-04-14'
  },
  {
    id: 'c3',
    shop_id: 'shop-1',
    name: '최유리',
    phone: '010-5555-6666',
    memo: '탈색모, 케라틴 트리트먼트 권장',
    type: 'DORMANT',
    last_visit_date: '2025-12-24',
    created_at: '2025-05-10'
  }
];

export const mockReservations: Reservation[] = [
  {
    id: 'r1',
    shop_id: 'shop-1',
    customer_id: 'c2',
    staff_id: 'staff-1',
    service_name: '남성 컷, 다운펌',
    status: 'CONFIRMED',
    price: 55000,
    reservation_time: '2026-04-15T14:00:00',
    created_at: '2026-04-14'
  },
  {
    id: 'r2',
    shop_id: 'shop-1',
    customer_id: 'c1',
    staff_id: 'staff-1',
    service_name: '수분 집중 케어',
    status: 'PENDING',
    price: 120000,
    reservation_time: '2026-04-15T16:00:00',
    created_at: '2026-04-14'
  }
];

export const mockSales: Sales[] = [
  {
    id: 's1',
    shop_id: 'shop-1',
    reservation_id: 'r1',
    amount: 55000,
    payment_type: 'CARD',
    created_at: '2026-04-15'
  }
];
