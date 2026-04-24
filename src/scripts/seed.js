import { createClient } from '@supabase/supabase-js';

// .env 또는 --env-file 로 환경변수가 들어왔다고 가정 (VITE_SUPABASE_URL 사용)
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;

// [주의] 이 스크립트는 서버에서만 실행되어야 하므로 서비스 롤 키를 사용합니다. 프론트엔드 코드에는 절대 노출하지 않습니다.
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error("❌ 오류: .env 파일에 SUPABASE_URL과 SUPABASE_SERVICE_ROLE_KEY를 설정해주세요.");
  process.exit(1);
}

// 서비스 롤 키를 사용하면 RLS 제약을 우회하여 데이터를 삽입하고, 유저를 임의로 가입시킬 수 있습니다.
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function runSeed() {
  console.log("🌱 테스트 데이터 초기화 시작...");

  // 0. 기존 테스트 데이터 초기화 (여러 번 실행해도 중복 데이터가 계속 쌓이지 않도록 방지)
  const { data: existingShop } = await supabase
    .from('shops')
    .select('id')
    .eq('owner_email', 'admin@charis.com')
    .maybeSingle();

  if (existingShop) {
    console.log("🧹 기존 테스트 샵을 발견하여 초기화(삭제) 합니다...");
    // on delete cascade 구조이므로 shop이 지워지면 관련된 customers, reservations, sales도 자동 삭제됩니다.
    await supabase.from('shops').delete().eq('id', existingShop.id);
  }

  // 1. 임시 샵(Shop) 생성 (SaaS 스키마 고려)
  const { data: shop, error: shopErr } = await supabase
    .from('shops')
    .insert([{
      name: '카리스 뷰티 (테스트 본점)',
      owner_email: 'admin@charis.com',
      contact: '010-0000-0000',
      plan: 'pro',
      ai_enabled: true
    }])
    .select()
    .single();

  if (shopErr) throw new Error("샵 생성 실패: " + shopErr.message);
  console.log(`✅ 샵 생성 완료: ${shop.name}`);

  // 2. Auth 유저 자동 생성 (관리자, 직원) - 이메일 인증 절차 완전 스킵
  const usersToCreate = [
    { email: 'admin@charis.com', password: 'password123', name: '이원장', role: 'admin' },
    { email: 'staff@charis.com', password: 'password123', name: '김디자이너', role: 'staff' },
  ];

  for (const u of usersToCreate) {
    const { data: authData, error: authErr } = await supabase.auth.admin.createUser({
      email: u.email,
      password: u.password,
      email_confirm: true // 이 옵션으로 이메일 인증을 서버측 강제로 완료 시킵니다 (보안 장점: 이메일 전송 불필요)
    });

    if (authErr) {
      if (authErr.message.includes('already registered')) {
        console.log(`⚠️ 이미 존재하는 사용자입니다: ${u.email} (수동으로 auth.users에서 삭제 후 다시 돌려주세요)`);
        continue;
      } else {
        throw new Error("유저 생성 실패: " + authErr.message);
      }
    }

    // Auth의 ID를 기반으로 public.users 테이블 연동 등록
    const { error: publicUserErr } = await supabase
      .from('users')
      .insert([{
        id: authData.user.id,
        shop_id: shop.id,
        email: u.email,
        name: u.name,
        role: u.role
      }]);

    if (publicUserErr) throw new Error(`public.user 생성 실패 (${u.email}): ` + publicUserErr.message);
    console.log(`✅ 계정 생성 완료: ${u.email} (Role: ${u.role})`);
  }

  // 3. 임시 고객 데이터 (신규, 단골, 휴면)
  const { data: customers, error: cErr } = await supabase
    .from('customers')
    .insert([
      { shop_id: shop.id, name: '이지민', phone: '010-1111-2222', type: 'REGULAR', memo: '민감성 피부', last_visit_date: '2026-04-10' },
      { shop_id: shop.id, name: '박서준', phone: '010-3333-4444', type: 'NEW', last_visit_date: '2026-04-14' },
      { shop_id: shop.id, name: '최유리', phone: '010-5555-6666', type: 'DORMANT', memo: '탈색모', last_visit_date: '2025-12-24' },
      { shop_id: shop.id, name: '강동원', phone: '010-7777-8888', type: 'NEW', last_visit_date: '2026-04-15' },
      { shop_id: shop.id, name: '김태희', phone: '010-9999-0000', type: 'REGULAR', last_visit_date: '2026-04-01' }
    ])
    .select();

  if (cErr) throw new Error("고객 데이터 생성 실패: " + cErr.message);
  console.log(`✅ 고객 데이터 ${customers.length}건 추가 완료`);

  // 4. 예약 데이터 및 매출 데이터
  const c1 = customers[0];
  const c2 = customers[1];

  const { data: reservations, error: rErr } = await supabase
    .from('reservations')
    .insert([
      { shop_id: shop.id, customer_id: c2.id, service_name: '남성 컷 + 다운펌', price: 55000, reservation_time: '2026-04-15T14:00:00Z', status: 'COMPLETED' },
      { shop_id: shop.id, customer_id: c1.id, service_name: '수분 집중 케어', price: 120000, reservation_time: '2026-04-16T16:00:00Z', status: 'CONFIRMED' }
    ])
    .select();

  if (rErr) throw new Error("예약 데이터 생성 실패: " + rErr.message);
  console.log(`✅ 예약 데이터 ${reservations.length}건 추가 완료`);

  const { error: sErr } = await supabase
    .from('sales')
    .insert([
      { shop_id: shop.id, reservation_id: reservations[0].id, customer_id: c2.id, amount: 55000, payment_type: 'CARD' }
    ]);

  if (sErr) throw new Error("매출 데이터 생성 실패: " + sErr.message);
  console.log(`✅ 매출 데이터 추가 완료`);

  console.log("🎉 모든 테스트 시드 데이터 초기화가 성공했습니다!");
}

runSeed().catch(err => {
  console.error("스크립트 실행 중 에러:", err);
  process.exit(1);
});
