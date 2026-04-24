import React, { useState, useEffect } from 'react';
import { X, Calendar, User, Sparkles, Check, ChevronDown, UserPlus, Search } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useShop } from '../../contexts/ShopContext';
import { useCRMData } from '../../hooks/useCRMData';
import { format } from 'date-fns';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialCustomerId?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, onSuccess, initialCustomerId }) => {
  const { currentShop } = useShop();
  const { customers, staff } = useCRMData();
  
  const [isNewCustomer, setIsNewCustomer] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(initialCustomerId || '');
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  
  const [serviceName, setServiceName] = useState('');
  const [selectedStaffId, setSelectedStaffId] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [time, setTime] = useState('10:00');
  const [status, setStatus] = useState<'PENDING' | 'CONFIRMED'>('CONFIRMED');
  const [isLoading, setIsLoading] = useState(false);

  // 초기값 설정
  useEffect(() => {
    if (initialCustomerId) {
      setSelectedCustomerId(initialCustomerId);
      setIsNewCustomer(false);
    }
    if (staff && staff.length > 0 && !selectedStaffId) {
      setSelectedStaffId(staff[0].id);
    }
  }, [initialCustomerId, staff, isOpen]);

  if (!isOpen) return null;

  const timeSlots = [
    '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', 
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', 
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', 
    '19:00', '19:30', '20:00'
  ];

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentShop) return;
    
    setIsLoading(true);
    try {
      let finalCustomerId = selectedCustomerId;

      // 1. 신규 고객일 경우 먼저 등록
      if (isNewCustomer) {
        if (!newName) throw new Error('고객 성함을 입력해주세요.');
        const { data: cData, error: cErr } = await supabase
          .from('customers')
          .insert({
            shop_id: currentShop.id,
            name: newName,
            phone: newPhone,
            type: 'NEW'
          })
          .select()
          .single();
        
        if (cErr) throw cErr;
        finalCustomerId = cData.id;
      }

      if (!finalCustomerId) throw new Error('고객을 선택하거나 등록해주세요.');
      if (!serviceName) throw new Error('시술명을 입력해주세요.');

      // 2. 예약 등록
      const reservationTime = `${date}T${time}:00Z`; // UTC 기준 (실제 운영시 타임존 고려 필요)
      
      const { error: rErr } = await supabase
        .from('reservations')
        .insert({
          shop_id: currentShop.id,
          customer_id: finalCustomerId,
          staff_id: selectedStaffId || null,
          service_name: serviceName,
          price: price,
          reservation_time: reservationTime,
          status: status,
          memo: ''
        });

      if (rErr) throw rErr;

      onSuccess();
      onClose();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : '예약 등록 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* 헤더 */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-brand" />
              신규 예약 등록
            </h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Premium CRM Booking System</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto custom-scrollbar">
          
          {/* ── 고객 선택 영역 ── */}
          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Customer Information</label>
              <button 
                type="button"
                onClick={() => setIsNewCustomer(!isNewCustomer)}
                className="text-[11px] font-black text-brand flex items-center gap-1 hover:underline"
              >
                {isNewCustomer ? (
                  <><Search className="w-3 h-3"/> 기존 고객 검색</>
                ) : (
                  <><UserPlus className="w-3 h-3"/> 신규 고객 등록</>
                )}
              </button>
            </div>

            {isNewCustomer ? (
              <div className="grid grid-cols-2 gap-3 p-4 bg-brand/5 rounded-xl border border-brand/10 animate-in slide-in-from-top-2 duration-300">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-brand ml-1">이름 *</p>
                  <input 
                    required
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-brand/20 rounded-lg text-sm focus:ring-2 focus:ring-brand outline-none" 
                    placeholder="성함 입력"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-brand ml-1">연락처</p>
                  <input 
                    value={newPhone}
                    onChange={e => setNewPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-brand/20 rounded-lg text-sm focus:ring-2 focus:ring-brand outline-none" 
                    placeholder="010-0000-0000"
                  />
                </div>
              </div>
            ) : (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <select 
                  required={!isNewCustomer}
                  value={selectedCustomerId}
                  onChange={e => setSelectedCustomerId(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand appearance-none outline-none"
                >
                  <option value="">고객을 선택해주세요 ({customers.length}명)</option>
                  {customers.map(c => (
                    <option key={c.id} value={c.id}>{c.name} ({c.phone || '연락처없음'})</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* 담당자 선택 */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Staff</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <select 
                  value={selectedStaffId}
                  onChange={e => setSelectedStaffId(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand appearance-none outline-none"
                >
                  {staff.map(s => (
                    <option key={s.id} value={s.id}>{s.name || s.email} ({s.role === 'admin' ? '원장' : '직원'})</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* 시술 금액 */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Price (KRW)</label>
              <input 
                type="number"
                value={price}
                onChange={e => setPrice(Number(e.target.value))}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-black text-emerald-600 focus:ring-2 focus:ring-brand outline-none"
              />
            </div>
          </div>

          {/* 시술명 (자유 입력) */}
          <div className="space-y-2">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Service Name</label>
            <div className="relative">
              <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand" />
              <input 
                required
                value={serviceName}
                onChange={e => setServiceName(e.target.value)}
                placeholder="예: 디자인 컷 + 다운펌"
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-brand outline-none"
              />
            </div>
          </div>

          {/* 스케줄 선택 (날짜/시간) */}
          <div className="space-y-3">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Schedule</label>
            <div className="grid grid-cols-1 gap-3">
              <input 
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-brand outline-none"
              />
              <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-3 bg-slate-50 rounded-xl border border-slate-100">
                {timeSlots.map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTime(t)}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-black transition-all ${
                      time === t 
                        ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-105' 
                        : 'bg-white text-slate-500 border border-slate-200 hover:border-brand hover:text-brand'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 예약 상태 */}
          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
             <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest mr-auto">Status</span>
             <div className="flex gap-2">
                <button 
                  type="button" 
                  onClick={() => setStatus('PENDING')}
                  className={`px-4 py-2 rounded-lg text-xs font-black transition-all ${status === 'PENDING' ? 'bg-amber-100 text-amber-700 border border-amber-200 shadow-sm' : 'bg-white text-slate-400'}`}
                >
                  대기
                </button>
                <button 
                  type="button" 
                  onClick={() => setStatus('CONFIRMED')}
                  className={`px-4 py-2 rounded-lg text-xs font-black transition-all ${status === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200 shadow-sm' : 'bg-white text-slate-400'}`}
                >
                  확정
                </button>
             </div>
          </div>

          {/* 저장 버튼 */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-slate-900 text-white rounded-2xl text-base font-black hover:bg-brand transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
          >
            {isLoading ? (
              <span className="animate-pulse">데이터 저장 중...</span>
            ) : (
              <>
                <Check className="w-5 h-5" />
                예약 등록 완료
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
