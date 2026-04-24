import React from 'react';
import { Navigate } from 'react-router-dom';
import { useCRMData } from '../hooks/useCRMData';
import { usePermissions } from '../hooks/usePermissions';
import { ArrowUpRight, Target, Lightbulb, TrendingDown, Settings, ArrowRight, TrendingUp } from 'lucide-react';
import { isToday } from 'date-fns';

export const Sales: React.FC = () => {
  const { canViewSales } = usePermissions();
  const { sales: dbSales, loading } = useCRMData();
  
  const handleAction = (label: string) => {
    alert(`[경영 제안 실행] ${label} 설정을 시작합니다.`);
  };

  // 라우터 레벨 URL 직접 접근 완전 차단!
  if (!canViewSales) {
    return <Navigate to="/" replace />;
  }

  const sales = (dbSales||[]).map(s => ({
    ...s, date: s.created_at ? s.created_at.split('T')[0] : '', 
    payment_method: s.payment_type
  }));

  if (loading) return <div className="p-10 text-center text-slate-500 font-bold animate-pulse">매출 데이터를 불러오는 중입니다...</div>;
  
  const todayTotal = sales
    .filter(s => isToday(new Date(s.date)))
    .reduce((sum, s) => sum + s.amount, 0);

  const avgSalesPrice = 87500; // Mock data average

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">매출 진단 센터</h1>
          <p className="text-slate-500 text-sm mt-1">단순 실적 보고를 넘어, 매출 성장을 위한 전략을 제안합니다.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="card border-l-4 border-l-brand relative overflow-hidden group">
          <div className="flex justify-between items-start mb-2">
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Today's Revenue</p>
            <ArrowUpRight className="w-4 h-4 text-brand" />
          </div>
          <p className="text-3xl font-black text-slate-900">{todayTotal.toLocaleString()}원</p>
          <div className="mt-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <p className="text-xs font-bold text-emerald-600">일일 목표의 85% 달성 중</p>
          </div>
        </div>

        <div className="card border-l-4 border-l-amber-400 relative overflow-hidden group">
          <div className="flex justify-between items-start mb-2">
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Average Ticket</p>
            <TrendingDown className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-3xl font-black text-slate-900">{avgSalesPrice.toLocaleString()}원</p>
          <div className="mt-4">
            <p className="text-xs font-bold text-amber-600 leading-tight">
              객단가 낮음: 고가 시술 추천이 필요합니다.
            </p>
          </div>
        </div>

        <div className="card bg-slate-900 text-white border-none shadow-xl">
           <div className="flex items-center gap-2 mb-4">
              <Target className="w-4 h-4 text-brand" />
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Monthly Forecast</p>
           </div>
           <p className="text-2xl font-black text-white">4,250,000원</p>
           <p className="text-xs text-slate-400 mt-2 font-medium">현재 추세 유지 시 예상 매출</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <div className="card border-2 border-slate-50">
            <h2 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
               <Lightbulb className="w-5 h-5 text-brand" />
               성장 전략 제안
            </h2>
            <div className="space-y-4">
               <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-4">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                     <Settings className="w-5 h-5 text-slate-400" />
                  </div>
                  <div className="flex-1">
                     <p className="font-bold text-sm text-slate-900 mb-1">프리미엄 패키지 업셀링</p>
                     <p className="text-xs text-slate-500 leading-relaxed mb-3">
                        객단가 상위 20% 고객들은 현재 '탈모 케어'에 관심이 많습니다. 관련 패키지 구성을 추천합니다.
                     </p>
                     <button onClick={() => handleAction('패키지 구성')} className="text-[11px] font-bold text-brand hover:underline flex items-center gap-1">
                        시술 메뉴 설정하러 가기 <ArrowRight className="w-3 h-3" />
                     </button>
                  </div>
               </div>

               <div className="p-4 bg-brand/5 rounded-xl border border-brand/10 flex items-start gap-4">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                     <TrendingUp className="w-5 h-5 text-brand" />
                  </div>
                  <div className="flex-1">
                     <p className="font-bold text-sm text-slate-900 mb-1">선권/회원권 판매 촉진</p>
                     <p className="text-xs text-slate-500 leading-relaxed mb-3">
                        이번 주 회원권 갱신 주기가 도래한 고객이 5명입니다. 멤버십 전용 혜택 문자를 발송하세요.
                     </p>
                     <button onClick={() => handleAction('회원권 프로모션')} className="bg-slate-900 text-white px-4 py-2 rounded-lg text-[10px] font-bold hover:bg-brand transition-colors">
                        멤버십 프로모션 실행
                     </button>
                  </div>
               </div>
            </div>
         </div>

         <div className="card">
            <h2 className="text-lg font-black text-slate-900 mb-4 p-2 border-b border-slate-50">실시간 결제 모니터링</h2>
            <div className="overflow-hidden">
               <table className="w-full text-left text-sm">
                  <thead className="text-slate-400 font-bold uppercase text-[10px]">
                  <tr>
                     <th className="px-4 py-3">일시</th>
                     <th className="px-4 py-3">결제 수단</th>
                     <th className="px-4 py-3 text-right">금액</th>
                  </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                  {sales.map(s => (
                     <tr key={s.id} className="hover:bg-slate-50/50">
                        <td className="px-4 py-4 text-slate-600 font-medium">{s.date}</td>
                        <td className="px-4 py-4 font-bold text-slate-900">
                           <span className="bg-slate-100 px-2 py-1 rounded text-[10px]">
                              {s.payment_method === 'CARD' ? '카드' : '현금'}
                           </span>
                        </td>
                        <td className="px-4 py-4 text-brand font-black text-right">
                           {s.amount.toLocaleString()}원
                        </td>
                     </tr>
                  ))}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
    </div>
  );
};
