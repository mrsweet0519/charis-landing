import React, { useState } from 'react';
import { X, UserPlus, Check, User, Phone, StickyNote } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useShop } from '../../contexts/ShopContext';

interface CustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const CustomerModal: React.FC<CustomerModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { currentShop } = useShop();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [memo, setMemo] = useState('');
  const [type, setType] = useState<'NEW' | 'REGULAR' | 'DORMANT'>('NEW');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentShop) return;
    if (!name) return alert('이름을 입력해주세요.');

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('customers')
        .insert({
          shop_id: currentShop.id,
          name,
          phone,
          memo,
          type
        });

      if (error) throw error;

      onSuccess();
      onClose();
      // 초기화
      setName('');
      setPhone('');
      setMemo('');
      setType('NEW');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : '알 수 없는 오류';
      alert(`고객 등록 실패: ${message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-brand" />
              신규 고객 등록
            </h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-4">
          <div className="space-y-1">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Customer Name *</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-brand outline-none" 
                placeholder="고객 성함"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-brand outline-none" 
                placeholder="010-0000-0000"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Customer Type</label>
            <div className="flex gap-2 p-1 bg-slate-50 rounded-xl border border-slate-100">
              {(['NEW', 'REGULAR', 'DORMANT'] as const).map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className={`flex-1 py-2 rounded-lg text-[10px] font-black transition-all ${
                    type === t 
                      ? 'bg-white text-brand shadow-sm border border-brand/10' 
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {t === 'NEW' ? '신규' : t === 'REGULAR' ? '단골' : '휴면'}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Notes</label>
            <div className="relative">
              <StickyNote className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <textarea 
                value={memo}
                onChange={e => setMemo(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand outline-none h-24 resize-none" 
                placeholder="고객 특징, 시술 시 주의사항 등"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-slate-900 text-white rounded-2xl text-sm font-black hover:bg-brand transition-all shadow-lg flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
          >
            {isLoading ? (
              <span className="animate-pulse">등록 중...</span>
            ) : (
              <>
                <Check className="w-4 h-4" />
                고객 등록하기
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
