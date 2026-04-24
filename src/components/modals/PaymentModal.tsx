import React, { useState, useEffect } from 'react';
import { X, DollarSign, Check, CreditCard, Banknote, Wallet, StickyNote } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useShop } from '../../contexts/ShopContext';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  reservationId?: string;
  customerId?: string;
  initialAmount?: number;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ 
  isOpen, onClose, onSuccess, reservationId, customerId, initialAmount 
}) => {
  const { currentShop } = useShop();
  const [amount, setAmount] = useState<number>(initialAmount || 0);
  const [paymentType, setPaymentType] = useState<'CASH' | 'CARD' | 'TRANSFER'>('CARD');
  const [note, setNote] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialAmount) setAmount(initialAmount);
  }, [initialAmount, isOpen]);

  if (!isOpen) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentShop) return;
    if (amount <= 0) return alert('결제 금액을 입력해주세요.');

    setIsLoading(true);
    try {
      // 1. 매출 데이터 등록
      const { error: sErr } = await supabase
        .from('sales')
        .insert({
          shop_id: currentShop.id,
          reservation_id: reservationId || null,
          customer_id: customerId || null,
          amount,
          payment_type: paymentType,
          note
        });

      if (sErr) throw sErr;

      // 2. 예약 기반 결제라면 예약 상태를 'COMPLETED'로 변경
      if (reservationId) {
        await supabase
          .from('reservations')
          .update({ status: 'COMPLETED' })
          .eq('id', reservationId);
      }

      onSuccess();
      onClose();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : '알 수 없는 오류';
      alert(`결제 처리 실패: ${message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-emerald-50/30">
          <div>
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-600" />
              결제 및 매출 기록
            </h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-5">
          <div className="space-y-2 text-center py-4 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Amount</p>
            <div className="relative inline-block">
              <input 
                type="number"
                required
                value={amount}
                onChange={e => setAmount(Number(e.target.value))}
                className="w-full text-center text-3xl font-black text-slate-900 bg-transparent outline-none border-b-2 border-transparent focus:border-emerald-500 transition-all px-4"
                placeholder="0"
              />
              <span className="absolute right-[-20px] bottom-1 text-sm font-bold text-slate-400">원</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Payment Method</label>
            <div className="grid grid-cols-3 gap-2">
              {([
                { id: 'CARD', label: '카드', icon: CreditCard, color: 'text-blue-600' },
                { id: 'CASH', label: '현금', icon: Banknote, color: 'text-emerald-600' },
                { id: 'TRANSFER', label: '이체', icon: Wallet, color: 'text-amber-600' },
              ] as const).map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setPaymentType(item.id)}
                  className={`flex flex-col items-center justify-center gap-2 py-3 rounded-xl border transition-all ${
                    paymentType === item.id 
                      ? `bg-white border-slate-900 shadow-md ring-2 ring-slate-900/5` 
                      : 'bg-slate-50 border-slate-100 text-slate-400 grayscale'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${paymentType === item.id ? item.color : ''}`} />
                  <span className={`text-[11px] font-black ${paymentType === item.id ? 'text-slate-900' : ''}`}>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Notes (Optional)</label>
            <div className="relative">
              <StickyNote className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <textarea 
                value={note}
                onChange={e => setNote(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-[12px] font-bold focus:ring-2 focus:ring-emerald-500 outline-none h-20 resize-none" 
                placeholder="결제 관련 특이사항 (DC 내역 등)"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-emerald-600 text-white rounded-2xl text-base font-black hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
          >
            {isLoading ? (
              <span className="animate-pulse">처리 중...</span>
            ) : (
              <>
                <Check className="w-5 h-5" />
                결제 완료 처리
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
