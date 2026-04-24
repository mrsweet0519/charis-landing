import React, { useState } from 'react';
import { useCRMData } from '../hooks/useCRMData';
import { 
  Plus, CheckCircle, 
  MessageSquare, Phone, AlertTriangle, 
  Search, Calendar, Sparkles, X, 
  Send, Ticket, Scissors, DollarSign
} from 'lucide-react';
import { BookingModal } from '../components/modals/BookingModal';
import { PaymentModal } from '../components/modals/PaymentModal';

export const Booking: React.FC = () => {
  const { reservations: dbReservations, customers: dbCustomers, loading, refreshData } = useCRMData();
  const [isMarketingModalOpen, setIsMarketingModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentData, setPaymentData] = useState<{ resId?: string; cusId?: string; amount?: number }>({});
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const handleAction = (
    label: string,
    name: string,
    data?: { id?: string; customer_id?: string; price?: number }
  ) => {
    if (label === '결제' && data) {
      setPaymentData({ resId: data.id, cusId: data.customer_id, amount: data.price });
      setIsPaymentModalOpen(true);
      return;
    }
    alert(`${name} 고객님의 예약을 ${label} 처리합니다.`);
  };

  const handleMarketingAction = (label: string, name: string) => {
    alert(`${name} 고객님께 ${selectedSlot} 빈 시간 채우기 [${label}]을 실행했습니다.`);
    setIsMarketingModalOpen(false);
  };

  // 데이터 필터링
  const reservations = (dbReservations||[]).map(r => ({
    ...r, date: r.reservation_time ? r.reservation_time.split('T')[0] : '', 
    time: r.reservation_time ? r.reservation_time.substring(11,16) : '', 
    services: [r.service_name]
  }));
  const customers = (dbCustomers||[]).map(c => ({
    ...c, type: c.type, lastVisit: c.last_visit_date || ''
  }));

  if (loading) return <div className="p-10 text-center text-slate-500 font-bold animate-pulse">예약 데이터를 불러오는 중입니다...</div>;

  // 빈 시간 슬롯 정의 (가상의 빈 시간)
  const emptySlots = ['10:00', '13:00', '17:00'];

  // 추천 고객 (마케팅용)
  const recommendedCustomers = [
    { name: '김태희', type: 'VIP', reason: '최근 방문 1달 전', history: '수분 집중 케어' },
    { name: '정우성', type: 'DORMANT', reason: '6개월 미방문', history: '남성 펌' },
    { name: '송혜교', type: 'REGULAR', reason: '단골 고객', history: '단백질 클리닉' },
  ];

  return (
    <div className="space-y-4 max-w-[1600px] mx-auto pb-10">
      {/* 1. 집중 운영 헤더 (Summary Row) */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center bg-white p-5 rounded-xl shadow-sm border border-slate-100 gap-6">
        <div className="flex items-center gap-6">
          <div>
            <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-brand" />
              예약 운영 센터
            </h1>
            <p className="text-[11px] text-slate-500 font-bold uppercase tracking-tight">Revenue-Oriented Booking System</p>
          </div>
          <div className="hidden sm:flex gap-4 border-l border-slate-100 pl-6 text-sm">
             <div>
                <p className="text-[10px] text-slate-400 font-black uppercase">Completion Rate</p>
                <p className="font-black text-emerald-600">82% <span className="text-[10px] text-slate-400 font-bold">(Target 90%)</span></p>
             </div>
             <div>
                <p className="text-[10px] text-slate-400 font-black uppercase">Empty Slots</p>
                <p className="font-black text-rose-500">{emptySlots.length} Slots <span className="text-[10px] text-slate-400 font-bold">(Fill now)</span></p>
             </div>
          </div>
        </div>

        <div className="flex gap-2 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-64">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
             <input type="text" placeholder="고객명, 연락처 검색 (자동완성)" className="w-full pl-9 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm font-medium focus:ring-2 focus:ring-brand" />
          </div>
          <button 
            onClick={() => setIsBookingModalOpen(true)}
            className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-black flex items-center gap-2 hover:bg-brand transition-all shadow-lg shadow-slate-900/10"
          >
            <Plus className="w-4 h-4" />
            <span>신규 예약</span>
          </button>
        </div>
      </div>

      {/* 2. 고밀도 가로형 예약 센터 (Main List) */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Table Header (Minimal) */}
        <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-slate-50 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
           <div className="col-span-1">TIME</div>
           <div className="col-span-2">CUSTOMER</div>
           <div className="col-span-3">SERVICES</div>
           <div className="col-span-1 text-center">STAFF</div>
           <div className="col-span-2 text-right">REVENUE</div>
           <div className="col-span-1 text-center">STATUS</div>
           <div className="col-span-2 text-right">QUICK ACTION</div>
        </div>

        {/* List Content */}
        <div className="divide-y divide-slate-50">
          {reservations.map(res => {
            const customer = customers.find(c => c.id === res.customer_id);
            const isNoShowRisk = customer?.type === 'DORMANT' || res.status === 'PENDING'; // Mock logic

            return (
              <div key={res.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-slate-50 transition-all group">
                {/* Time */}
                <div className="col-span-1">
                   <div className="font-black text-slate-900 tabular-nums">{res.time}</div>
                   <div className="text-[10px] text-slate-400 font-bold uppercase">{res.date.split('-').slice(1).join('/')}</div>
                </div>

                {/* Customer */}
                <div className="col-span-2 flex items-center gap-2">
                   <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center font-black text-xs text-slate-500">
                     {customer?.name.charAt(0)}
                   </div>
                   <div className="min-w-0">
                      <p className="font-black text-slate-900 truncate">{customer?.name}</p>
                      <p className="text-[10px] text-slate-400 truncate">{customer?.phone}</p>
                   </div>
                </div>

                {/* Services */}
                <div className="col-span-3">
                   <div className="flex flex-wrap gap-1">
                      {res.services.map((s, i) => (
                        <span key={i} className="flex items-center gap-1 bg-slate-50 text-slate-600 px-2 py-0.5 rounded text-[10px] font-bold border border-slate-100">
                           <Scissors className="w-2.5 h-2.5" />
                           {s}
                        </span>
                      ))}
                   </div>
                </div>

                {/* Staff */}
                <div className="col-span-1 text-center">
                   <div className="inline-flex items-center justify-center w-7 h-7 bg-brand/10 text-brand rounded text-[10px] font-black">
                     실장
                   </div>
                </div>

                {/* Revenue */}
                <div className="col-span-2 text-right">
                   <div className="font-black text-slate-900 tabular-nums flex items-center justify-end gap-1">
                      <DollarSign className="w-3 h-3 text-emerald-500" />
                      {res.price.toLocaleString()}원
                   </div>
                   <p className="text-[9px] text-slate-400 font-bold">목표 기여도 12%</p>
                </div>

                {/* Status Badge */}
                <div className="col-span-1 text-center">
                   {isNoShowRisk ? (
                      <span className="inline-flex items-center gap-1 text-[9px] font-black bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full animate-pulse border border-rose-200">
                         <AlertTriangle className="w-2.5 h-2.5" />
                         노쇼위험
                      </span>
                   ) : (
                      <span className="inline-flex items-center gap-1 text-[9px] font-black bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200">
                         <CheckCircle className="w-2.5 h-2.5" />
                         확정
                      </span>
                   )}
                </div>

                {/* Actions */}
                <div className="col-span-2 text-right flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                   {res.status !== 'COMPLETED' && (
                      <button onClick={() => handleAction('결제', customer?.name || '', res)} className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-600 hover:text-white transition-all shadow-sm" title="결제 처리">
                         <DollarSign className="w-3.5 h-3.5" />
                      </button>
                   )}
                   <button onClick={() => handleAction('알림톡', customer?.name || '')} className="p-2 bg-slate-50 text-slate-500 rounded-lg hover:bg-slate-900 hover:text-white transition-all shadow-sm" title="알림 보내기">
                      <MessageSquare className="w-3.5 h-3.5" />
                   </button>
                   <button onClick={() => handleAction('전화', customer?.name || '')} className="p-2 bg-slate-50 text-slate-500 rounded-lg hover:bg-brand hover:text-white transition-all shadow-sm" title="전화 연결">
                      <Phone className="w-3.5 h-3.5" />
                   </button>
                </div>
              </div>
            );
          })}

          {/* Empty Slot Integration (Action Point) */}
          {emptySlots.map(slot => (
            <div key={slot} className="grid grid-cols-12 gap-4 px-6 py-4 items-center bg-slate-50/30 border-2 border-dashed border-transparent hover:border-brand/20 hover:bg-brand/5 transition-all group cursor-pointer" onClick={() => { setSelectedSlot(slot); setIsMarketingModalOpen(true); }}>
               <div className="col-span-1">
                  <div className="font-black text-slate-300 tabular-nums">{slot}</div>
                  <div className="text-[9px] text-slate-300 font-bold">EMPTY</div>
               </div>
               <div className="col-span-9">
                  <div className="flex items-center gap-3">
                     <div className="p-2 bg-white rounded-lg border border-slate-100 text-brand shadow-sm">
                        <Sparkles className="w-4 h-4" />
                     </div>
                     <div>
                        <p className="text-sm font-black text-slate-400 group-hover:text-brand transition-colors">이 시간대가 비어있습니다. 매출 기회로 전환하시겠습니까?</p>
                        <p className="text-[10px] text-slate-400 font-medium">단골 고객 또는 휴면 고객에게 마케팅 메시지를 발송해 예약을 채우세요.</p>
                     </div>
                  </div>
               </div>
               <div className="col-span-2 text-right">
                  <button className="bg-white border border-brand/50 text-brand px-4 py-2 rounded-lg text-[10px] font-black hover:bg-brand hover:text-white transition-all shadow-sm uppercase tracking-tighter">
                    이 시간 채우기 (AI 추천)
                  </button>
               </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. 빈 시간 채우기 마케팅 팝업 (Modal) */}
      {isMarketingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
           <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                 <div>
                    <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                       <Sparkles className="w-5 h-5 text-brand" />
                       [{selectedSlot}] 예약 유도 타겟 검색
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-1">이 시간대에 방문 가능성이 높은 고객입니다.</p>
                 </div>
                 <button onClick={() => setIsMarketingModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <X className="w-5 h-5 text-slate-400" />
                 </button>
              </div>

              <div className="p-6 space-y-4 max-h-[400px] overflow-y-auto">
                 {recommendedCustomers.map((c, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-brand/30 transition-all group">
                       <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xs ${
                             c.type === 'VIP' ? 'bg-amber-100 text-amber-700' :
                             c.type === 'DORMANT' ? 'bg-rose-100 text-rose-700' : 'bg-brand/10 text-brand'
                          }`}>
                             {c.type.charAt(0)}
                          </div>
                          <div>
                             <p className="font-black text-slate-900 flex items-center gap-2">
                                {c.name} 
                                <span className="text-[9px] font-bold px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-400">{c.type}</span>
                             </p>
                             <p className="text-[10px] text-slate-500 font-bold">{c.reason}</p>
                             <p className="text-[9px] text-slate-400 mt-0.5 italic">최근: {c.history}</p>
                          </div>
                       </div>
                       <div className="flex gap-2">
                          <button onClick={() => handleMarketingAction('문자', c.name)} className="p-2 bg-white text-slate-600 rounded-xl border border-slate-200 hover:bg-slate-950 hover:text-white transition-all shadow-sm">
                             <Send className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleMarketingAction('쿠폰', c.name)} className="p-2 bg-white text-brand rounded-xl border border-brand/20 hover:bg-brand hover:text-white transition-all shadow-sm">
                             <Ticket className="w-4 h-4" />
                          </button>
                       </div>
                    </div>
                 ))}
              </div>

              <div className="p-6 bg-slate-50 border-t border-slate-100">
                 <button onClick={() => setIsMarketingModalOpen(false)} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-sm hover:bg-brand transition-all shadow-lg">
                    닫기
                 </button>
              </div>
           </div>
        </div>
      )}
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
        onSuccess={() => {
          refreshData();
          alert('예약이 성공적으로 등록되었습니다!');
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
