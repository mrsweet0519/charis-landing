import React from 'react';
import { useCRMData } from '../hooks/useCRMData';
import { 
  Ticket, 
  Zap, UserPlus, Send, PlusCircle, CheckCircle, 
  Clock, Flame, Star, Coffee, ChevronRight
} from 'lucide-react';
import { isToday } from 'date-fns';
import { BookingModal } from '../components/modals/BookingModal';
import { CustomerModal } from '../components/modals/CustomerModal';
import { PaymentModal } from '../components/modals/PaymentModal';

export const Dashboard: React.FC = () => {
  const { customers, reservations, sales, loading, refreshData } = useCRMData();
  const [isBookingModalOpen, setIsBookingModalOpen] = React.useState(false);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = React.useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = React.useState(false);
  const [paymentData, setPaymentData] = React.useState<{ resId?: string; cusId?: string; amount?: number }>({});

  const handleAction = (
    label: string,
    data?: { id?: string; customer_id?: string; price?: number }
  ) => {
    if (label === '예약 등록') {
      setIsBookingModalOpen(true);
      return;
    }
    if (label === '고객 등록') {
      setIsCustomerModalOpen(true);
      return;
    }
    if (label === '결제' && data) {
      setPaymentData({ resId: data.id, cusId: data.customer_id, amount: data.price });
      setIsPaymentModalOpen(true);
      return;
    }
    alert(`[액션] ${label} 기능을 실행합니다.`);
  };

  // 데이터 필터링 및 임시 스키마 맵퍼 (프론트엔드 코드 최소화)
  const shopReservations = (reservations||[]).map(r => ({
    ...r, date: r.reservation_time ? r.reservation_time.split('T')[0] : '', 
    time: r.reservation_time ? r.reservation_time.substring(11,16) : '', 
    services: [r.service_name]
  }));
  const shopCustomers = (customers||[]).map(c => ({
    ...c, type: c.type, lastVisit: c.last_visit_date || ''
  }));
  const shopSales = (sales||[]).map(s => ({
    ...s, date: s.created_at ? s.created_at.split('T')[0] : '', 
    amount: s.amount
  }));

  if (loading) return <div className="p-10 text-center text-slate-500 font-bold animate-pulse">대시보드 데이터를 불러오는 중입니다...</div>;

  // 파생 데이터
  const todayReservations = shopReservations.filter(r => isToday(new Date(r.date))).sort((a,b) => a.time.localeCompare(b.time));
  const newCustomers = shopCustomers.filter(c => c.type === 'NEW');
  const todaySalesAmount = shopSales.filter(s => isToday(new Date(s.date))).reduce((sum, s) => sum + s.amount, 0);

  return (
    <div className="space-y-4 max-w-[1600px] mx-auto pb-10">
      {/* 1. 상단 헤더 & 빠른 실행 영역 */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-4 rounded-xl shadow-sm border border-slate-100 gap-4">
        <div>
          <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Zap className="w-5 h-5 text-brand fill-brand" />
            LIVE 운영 센터
          </h1>
          <p className="text-[11px] text-slate-500 font-bold uppercase tracking-tight">Today: {new Date().toLocaleDateString()}</p>
        </div>
        
        {/* 빠른 실행 버튼 (Quick Actions) */}
        <div className="flex flex-wrap gap-2">
           <button onClick={() => handleAction('예약 등록')} className="flex items-center gap-2 bg-slate-900 text-white px-3 py-2 rounded-lg text-[11px] font-bold hover:bg-brand transition-all shadow-md">
             <PlusCircle className="w-3.5 h-3.5" />
             <span>예약 등록</span>
           </button>
           <button onClick={() => handleAction('고객 등록')} className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-2 rounded-lg text-[11px] font-bold text-slate-600 hover:border-brand hover:text-brand transition-all">
             <UserPlus className="w-3.5 h-3.5" />
             <span>고객 등록</span>
           </button>
           <button onClick={() => handleAction('문자 전송')} className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-2 rounded-lg text-[11px] font-bold text-slate-600 hover:border-brand hover:text-brand transition-all">
             <Send className="w-3.5 h-3.5" />
             <span>문자 전송</span>
           </button>
           <button onClick={() => handleAction('쿠폰 발송')} className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-2 rounded-lg text-[11px] font-bold text-slate-600 hover:border-brand hover:text-brand transition-all">
             <Ticket className="w-3.5 h-3.5" />
             <span>쿠폰 발송</span>
           </button>
        </div>
      </div>

      {/* 2. 핵심 지표 고밀도 카드 영역 (Top Stats) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 오늘 예약 */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between group hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-2">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Bookings</p>
            <span className="text-[9px] font-black bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">예약부족</span>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <h2 className="text-3xl font-black text-slate-900 tabular-nums">{todayReservations.length}</h2>
            <span className="text-[10px] font-bold text-blue-600">+2 (전일대비)</span>
          </div>
          <div className="text-[10px] text-slate-500 font-bold mb-3 truncate">
            {todayReservations.length > 0 ? `다음: ${todayReservations[0].time} (${shopCustomers.find(c => c.id === todayReservations[0].customer_id)?.name})` : '대기 예약 없음'}
          </div>
          <div className="border-t border-slate-50 pt-3 flex flex-col gap-2">
             <p className="text-[11px] text-slate-700 font-bold">→ 오후 시간대 예약이 부족합니다</p>
             <button onClick={() => handleAction('알림톡 전송')} className="w-full bg-slate-50 text-[10px] font-black py-2 rounded-lg hover:bg-slate-900 hover:text-white transition-all uppercase tracking-tighter">
               예약 유도 알림톡 보내기
             </button>
          </div>
        </div>

        {/* 신규 고객 */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between group hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-2">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">New Clients</p>
            <span className="text-[9px] font-black bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded">마케팅필요</span>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <h2 className="text-3xl font-black text-slate-900 tabular-nums">{newCustomers.length}</h2>
            <span className="text-[10px] font-bold text-emerald-600">Active</span>
          </div>
          <div className="text-[10px] text-slate-500 font-bold mb-3 truncate">
            최근: {newCustomers.slice(0, 2).map(c => c.name).join(', ')}
          </div>
          <div className="border-t border-slate-50 pt-3 flex flex-col gap-2">
             <p className="text-[11px] text-slate-700 font-bold">→ 신규 유입 증대를 위한 제안이 있습니다</p>
             <button onClick={() => handleAction('마케팅 실행')} className="w-full bg-slate-50 text-[10px] font-black py-2 rounded-lg hover:bg-slate-900 hover:text-white transition-all uppercase tracking-tighter">
               첫 방문 쿠폰 배포하기
             </button>
          </div>
        </div>

        {/* 오늘 매출 */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between group hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-2">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Revenue Today</p>
            <span className="text-[9px] font-black bg-brand/10 text-brand px-1.5 py-0.5 rounded">객단가낮음</span>
          </div>
          <div className="flex flex-col mb-1">
            <h2 className="text-2xl font-black text-slate-900 tabular-nums">{todaySalesAmount.toLocaleString()}원</h2>
            <span className="text-[10px] font-bold text-rose-500">-12% (전일동시간대)</span>
          </div>
          <div className="text-[10px] text-slate-500 font-bold mb-3">
             목표 대비 74% 달성 중
          </div>
          <div className="border-t border-slate-50 pt-3 flex flex-col gap-2">
             <p className="text-[11px] text-slate-700 font-bold">→ 고가 시술 추천이 필요합니다</p>
             <button onClick={() => handleAction('시술 분석')} className="w-full bg-slate-50 text-[10px] font-black py-2 rounded-lg hover:bg-slate-900 hover:text-white transition-all uppercase tracking-tighter">
               프리미엄 패키지 설정
             </button>
          </div>
        </div>

        {/* 노쇼/위험 */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between group hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-2">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Risk Factor</p>
            <span className="text-[9px] font-black bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded">주의필요</span>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <h2 className="text-3xl font-black text-slate-900 tabular-nums">1</h2>
            <span className="text-[10px] font-bold text-rose-600">N-Show Alert</span>
          </div>
          <div className="text-[10px] text-slate-500 font-bold mb-3">
             오후 4:00 예약자 연락 중
          </div>
          <div className="border-t border-slate-50 pt-3 flex flex-col gap-2">
             <p className="text-[11px] text-slate-700 font-bold">→ 노쇼 방지 알림을 보내세요</p>
             <button onClick={() => handleAction('방지문자 전송')} className="w-full bg-rose-50 text-rose-600 text-[10px] font-black py-2 rounded-lg hover:bg-rose-600 hover:text-white transition-all uppercase tracking-tighter">
               강력 노쇼 경고 문자 발송
             </button>
          </div>
        </div>
      </div>

      {/* 3. 메인 운영 영역 (3 Column Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Col 1: 오늘 해야 할 일 (TODO) */}
        <div className="lg:col-span-3 flex flex-col gap-4">
           <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
              <h3 className="text-xs font-black text-slate-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-brand" /> 오늘 해야 할 일
              </h3>
              <div className="space-y-3">
                 <div className="group border-b border-transparent hover:border-slate-100 pb-2 transition-all">
                    <p className="text-[11px] font-black text-slate-900">노쇼 위험 고객 (10분 전)</p>
                    <p className="text-[10px] text-slate-500 mb-2 font-medium">이지민 고객님 미도착</p>
                    <button onClick={() => handleAction('전화 연결')} className="p-1 px-3 bg-slate-900 text-white rounded text-[10px] font-black hover:bg-brand transition-colors">
                      [알림 보내기]
                    </button>
                 </div>
                 <div className="group border-b border-transparent hover:border-slate-100 pb-2 transition-all">
                    <p className="text-[11px] font-black text-slate-900">재방문 필요 고객 (3명)</p>
                    <p className="text-[10px] text-slate-500 mb-2 font-medium">정기 시술 주기 경과</p>
                    <button onClick={() => handleAction('CRM 문자')} className="p-1 px-3 bg-slate-100 text-slate-700 rounded text-[10px] font-black hover:bg-slate-900 hover:text-white transition-colors">
                      [알림 보내기]
                    </button>
                 </div>
                 <div className="group pb-2 transition-all">
                    <p className="text-[11px] font-black text-slate-900">빈 시간 슬롯 발견</p>
                    <p className="text-[10px] text-slate-500 mb-2 font-medium">오후 5:00 ~ 6:00 (60분)</p>
                    <button onClick={() => handleAction('핫딜 쿠폰')} className="p-1 px-3 bg-brand/10 text-brand rounded text-[10px] font-black hover:bg-brand hover:text-white transition-colors">
                      [핫딜 진행하기]
                    </button>
                 </div>
              </div>
           </div>

           <div className="bg-slate-950 text-white rounded-xl p-4 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4">
               <Flame className="w-20 h-20 text-brand" />
             </div>
             <p className="text-[9px] font-black text-brand uppercase tracking-widest mb-1">AI Recommendation</p>
             <p className="text-[11px] font-bold leading-relaxed text-slate-300">
               오늘 날씨가 매우 덥습니다. <br/>
               <span className="text-white">'두피 쿨링 단기 썸머 이벤트'</span><br/> 
               멤버십 고객들에게 발송해볼까요?
             </p>
             <button className="mt-4 w-full bg-white text-slate-950 py-2 rounded-lg text-[10px] font-black hover:bg-brand transition-all">
                AI 추천 마케팅 시작
             </button>
           </div>
        </div>

        {/* Col 2: 오늘 상세 일정 (Schedule) */}
        <div className="lg:col-span-6 card p-0 overflow-hidden flex flex-col">
           <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <h3 className="text-xs font-black text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand" /> 오늘 예약 타임라인
              </h3>
              <span className="text-[9px] font-bold text-slate-400">총 {todayReservations.length}건</span>
           </div>
           <div className="flex-1 overflow-y-auto max-h-[500px] p-2 space-y-1">
              {todayReservations.map(res => {
                 const customer = shopCustomers.find(c => c.id === res.customer_id);
                 return (
                    <div key={res.id} className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl border border-transparent hover:border-slate-100 group transition-all">
                       <div className="w-12 h-12 bg-slate-900 text-white flex flex-col items-center justify-center rounded-lg shadow-sm">
                          <span className="text-[13px] font-black tabular-nums">{res.time}</span>
                       </div>
                       <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                             <p className="font-black text-sm text-slate-900 truncate">{customer?.name}</p>
                             {customer?.type === 'REGULAR' && <Star className="w-3 h-3 text-amber-400 fill-amber-400" />}
                          </div>
                          <p className="text-[10px] text-slate-500 font-bold truncate">{res.services.join(', ')}</p>
                       </div>
                       <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          {res.status !== 'COMPLETED' && (
                             <button onClick={() => handleAction('결제', res)} className="px-3 py-1.5 bg-brand text-white text-[10px] font-black rounded-lg shadow-brand/10 shadow-lg">결제</button>
                          )}
                          <button onClick={() => handleAction('수정')} className="px-3 py-1.5 bg-white border border-slate-200 text-slate-500 text-[10px] font-black rounded-lg hover:border-slate-900 hover:text-slate-900">변경</button>
                       </div>
                    </div>
                 );
              })}
           </div>
        </div>

        {/* Col 3: 고객 인사이트 (Customer Insights) */}
        <div className="lg:col-span-3 flex flex-col gap-4">
           {/* VIP 리스트 */}
           <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-black text-slate-900 flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> VIP 케어
                </h3>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
              </div>
              <div className="space-y-3">
                 {shopCustomers.filter(c => c.type === 'REGULAR').slice(0, 3).map(c => (
                   <div key={c.id} className="flex justify-between items-center group">
                      <div>
                        <p className="text-[11px] font-black text-slate-900">{c.name}</p>
                        <p className="text-[9px] text-slate-400 font-bold">최근방문: {c.lastVisit}</p>
                      </div>
                      <button onClick={() => handleAction('전담 케어')} className="text-[9px] font-black text-brand opacity-0 group-hover:opacity-100 transition-all">관리</button>
                   </div>
                 ))}
              </div>
              <div className="mt-4 border-t border-slate-50 pt-3 flex flex-col gap-2">
                  <p className="text-[11px] text-brand font-black">[단골관리] → VIP 혜택 안내 시점</p>
                  <button onClick={() => handleAction('VIP 쿠폰')} className="w-full bg-brand/5 text-brand text-[10px] font-black py-2 rounded-lg hover:bg-brand hover:text-white transition-all">
                    전용 쿠폰 발송하기
                  </button>
              </div>
           </div>

           {/* 휴면 고객 */}
           <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-black text-slate-900 flex items-center gap-2">
                  <Coffee className="w-4 h-4 text-slate-400" /> 휴면 고객 유도
                </h3>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
              </div>
              <div className="space-y-3">
                 {shopCustomers.filter(c => c.type === 'DORMANT').slice(0, 2).map(c => (
                   <div key={c.id} className="flex justify-between items-center group">
                      <div>
                        <p className="text-[11px] font-black text-slate-900">{c.name}</p>
                        <p className="text-[9px] text-rose-400 font-bold">미방문 {c.lastVisit}</p>
                      </div>
                      <button onClick={() => handleAction('강력 유도')} className="text-[9px] font-black text-rose-600 opacity-0 group-hover:opacity-100 transition-all">유도</button>
                   </div>
                 ))}
              </div>
              <div className="mt-4 border-t border-slate-50 pt-3 flex flex-col gap-2">
                  <p className="text-[11px] text-slate-700 font-black">[휴면유도] → 재방문 이벤트 제안</p>
                  <button onClick={() => handleAction('웰컴 문자')} className="w-full bg-slate-900 text-white text-[10px] font-black py-2 rounded-lg hover:bg-brand transition-all">
                    웰컴백 문자 전송
                  </button>
              </div>
           </div>
        </div>

      </div>

      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
        onSuccess={() => {
          refreshData();
          alert('예약이 성공적으로 등록되었습니다!');
        }}
      />
      <CustomerModal
        isOpen={isCustomerModalOpen}
        onClose={() => setIsCustomerModalOpen(false)}
        onSuccess={() => {
          refreshData();
          alert('고객이 성공적으로 등록되었습니다!');
        }}
      />
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onSuccess={() => {
          refreshData();
          alert('결제가 완료되었습니다!');
        }}
        reservationId={paymentData.resId}
        customerId={paymentData.cusId}
        initialAmount={paymentData.amount}
      />
    </div>
  );
};
