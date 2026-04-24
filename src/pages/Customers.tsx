import React, { useState } from 'react';
import { useCRMData } from '../hooks/useCRMData';
import { usePermissions } from '../hooks/usePermissions';
import {
  Search, UserPlus, MessageCircle, Ticket, RotateCcw,
  CalendarPlus, AlertTriangle, TrendingUp, Zap,
  ChevronDown, ChevronUp, Crown, Coffee, Sparkles, Star
} from 'lucide-react';
import { differenceInDays } from 'date-fns';
import { BookingModal } from '../components/modals/BookingModal';
import { CustomerModal } from '../components/modals/CustomerModal';

export const Customers: React.FC = () => {
  const { customers: dbCustomers, loading, refreshData } = useCRMData();
  const { canUseAI } = usePermissions();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleAction = (label: string, name: string, customerId?: string) => {
    if (label === '예약 등록' && customerId) {
      setSelectedCustomerId(customerId);
      setIsBookingModalOpen(true);
      return;
    }
    alert(`${name} 고객님께 [${label}] 실행합니다.`);
  };

  const allCustomers = (dbCustomers || []).map(c => ({
    ...c,
    createdAt: c.created_at ? new Date(c.created_at).toLocaleDateString() : '',
    lastVisit: c.last_visit_date || undefined
  }));

  if (loading) return <div className="p-10 text-center text-slate-500 font-bold animate-pulse">고객 데이터를 불러오는 중입니다...</div>;


  // 더미 확장 데이터 (실데이터 연동 시 대체)
  const mockStats: Record<string, { visits: number; revenue: number; avgCycle: number }> = {
    'c1': { visits: 12, revenue: 540000, avgCycle: 21 },
    'c2': { visits: 1,  revenue: 55000,  avgCycle: 0 },
    'c3': { visits: 8,  revenue: 380000, avgCycle: 45 },
  };

  // VIP 자동 분류: 누적 매출 30만 이상 또는 방문 10회 이상
  const getCustomerGrade = (id: string, type: string) => {
    const stat = mockStats[id];
    if (!stat) return type;
    if (stat.revenue >= 400000 || stat.visits >= 10) return 'VIP';
    return type;
  };

  // 휴면 판단: 30일 이상 미방문
  const isDormant = (lastVisit?: string) => {
    if (!lastVisit) return true;
    return differenceInDays(new Date(), new Date(lastVisit)) >= 30;
  };

  // AI 추천 문구
  const getAiRecommendation = (id: string, lastVisit?: string) => {
    const stat = mockStats[id];
    if (!stat) return null;
    if (stat.avgCycle > 0 && lastVisit) {
      const daysSince = differenceInDays(new Date(), new Date(lastVisit));
      if (daysSince >= stat.avgCycle - 3) return { text: '재방문 시기입니다', color: 'text-amber-600 bg-amber-50 border-amber-200' };
    }
    if (stat.revenue >= 400000) return { text: '고가 시술 추천 대상', color: 'text-brand bg-brand/5 border-brand/20' };
    return null;
  };

  // 필터링
  const filtered = allCustomers
    .filter(c => {
      const grade = getCustomerGrade(c.id, c.type);
      if (activeFilter !== 'ALL' && grade !== activeFilter) return false;
      if (searchQuery && !c.name?.includes(searchQuery) && !c.phone?.includes(searchQuery)) return false;
      return true;
    })
    .sort((a, b) => {
      // 휴면 먼저, 그 다음 VIP
      const aDormant = isDormant(a.lastVisit) ? 0 : 1;
      const bDormant = isDormant(b.lastVisit) ? 0 : 1;
      return aDormant - bDormant;
    });

  const gradeConfig: Record<string, { label: string; colorClass: string; icon: React.FC<{className?: string}> }> = {
    'NEW':     { label: '신규',  colorClass: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: Sparkles },
    'REGULAR': { label: '단골',  colorClass: 'bg-blue-100 text-blue-700 border-blue-200',         icon: Star },
    'VIP':     { label: 'VIP',   colorClass: 'bg-amber-100 text-amber-700 border-amber-200',      icon: Crown },
    'DORMANT': { label: '휴면',  colorClass: 'bg-slate-100 text-slate-500 border-slate-200',      icon: Coffee },
  };

  const filterTabs = [
    { key: 'ALL',     label: '전체' },
    { key: 'NEW',     label: '신규' },
    { key: 'REGULAR', label: '단골' },
    { key: 'VIP',     label: 'VIP' },
    { key: 'DORMANT', label: '휴면' },
  ];

  const totalRevenue = Object.values(mockStats).reduce((s, v) => s + v.revenue, 0);
  const dormantCount = allCustomers.filter(c => isDormant(c.lastVisit)).length;

  return (
    <div className="space-y-4 max-w-[1600px] mx-auto pb-10">

      {/* ── 헤더 & 요약 KPI ── */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center bg-white p-5 rounded-xl shadow-sm border border-slate-100 gap-4">
        <div className="flex items-center gap-6">
          <div>
            <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Zap className="w-5 h-5 text-brand fill-brand" />
              CRM 매출 전환 센터
            </h1>
            <p className="text-[11px] text-slate-500 font-bold uppercase tracking-tight">Customer = Revenue Opportunity</p>
          </div>
          <div className="hidden md:flex gap-5 border-l border-slate-100 pl-6">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase">총 고객</p>
              <p className="font-black text-slate-900">{allCustomers.length}<span className="text-xs text-slate-400 font-bold">명</span></p>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase">누적 매출</p>
              <p className="font-black text-emerald-600">{totalRevenue.toLocaleString()}<span className="text-xs text-slate-400 font-bold">원</span></p>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase">휴면 위험</p>
              <p className="font-black text-rose-500">{dormantCount}<span className="text-xs text-slate-400 font-bold">명</span></p>
            </div>
          </div>
        </div>
        <div className="flex gap-2 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              type="text"
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border-none rounded-lg text-sm font-medium focus:ring-2 focus:ring-brand"
              placeholder="이름 또는 연락처 검색"
            />
          </div>
          <button 
            onClick={() => setIsCustomerModalOpen(true)}
            className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-black flex items-center gap-2 hover:bg-brand transition-all shadow-lg shadow-slate-900/10"
          >
            <UserPlus className="w-4 h-4" />
            <span>신규 고객</span>
          </button>
        </div>
      </div>

      {/* ── 필터 탭 ── */}
      <div className="flex gap-2 flex-wrap">
        {filterTabs.map(t => (
          <button
            key={t.key}
            onClick={() => setActiveFilter(t.key)}
            className={`px-4 py-2 rounded-lg text-[11px] font-black transition-all border ${
              activeFilter === t.key
                ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── 고객 리스트 ── */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        {/* 컬럼 헤더 */}
        <div className="grid grid-cols-12 gap-3 px-6 py-3 bg-slate-50 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
          <div className="col-span-3">CUSTOMER</div>
          <div className="col-span-1 text-center">GRADE</div>
          <div className="col-span-2 text-center">STATS</div>
          <div className="col-span-3">AI INSIGHT</div>
          <div className="col-span-3 text-right">QUICK ACTIONS</div>
        </div>

        <div className="divide-y divide-slate-50">
          {filtered.map(c => {
            const grade = getCustomerGrade(c.id, c.type);
            const dormant = isDormant(c.lastVisit);
            const stat = mockStats[c.id];
            const ai = getAiRecommendation(c.id, c.lastVisit);
            const daysSince = c.lastVisit ? differenceInDays(new Date(), new Date(c.lastVisit)) : 999;
            const cfg = gradeConfig[grade] || gradeConfig['NEW'];
            const isExpanded = expandedId === c.id;

            return (
              <div key={c.id} className={`${dormant ? 'bg-rose-50/30' : ''} transition-all`}>
                {/* 메인 Row */}
                <div className={`grid grid-cols-12 gap-3 px-6 py-4 items-center hover:bg-slate-50 group transition-all ${dormant ? 'border-l-2 border-l-rose-300' : ''}`}>

                  {/* 고객 기본 정보 */}
                  <div className="col-span-3 flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-sm ${
                      grade === 'VIP' ? 'bg-amber-100 text-amber-700' :
                      grade === 'REGULAR' ? 'bg-brand/10 text-brand' :
                      grade === 'DORMANT' ? 'bg-slate-100 text-slate-400' :
                      'bg-emerald-100 text-emerald-700'
                    }`}>
                      {c.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-black text-slate-900 truncate">{c.name}</p>
                      <p className="text-[10px] text-slate-400 truncate">{c.phone}</p>
                      {dormant && (
                        <p className="text-[9px] text-rose-500 font-black flex items-center gap-1 mt-0.5">
                          <AlertTriangle className="w-2.5 h-2.5" />
                          {daysSince}일째 미방문
                        </p>
                      )}
                    </div>
                  </div>

                  {/* 등급 배지 */}
                  <div className="col-span-1 flex justify-center">
                    <span className={`inline-flex items-center gap-1 text-[9px] font-black px-2 py-0.5 rounded-full border ${cfg.colorClass}`}>
                      <cfg.icon className="w-2.5 h-2.5" />
                      {cfg.label}
                    </span>
                  </div>

                  {/* 통계 */}
                  <div className="col-span-2 text-center">
                    {stat ? (
                      <div>
                        <p className="text-[11px] font-black text-slate-900">{stat.visits}회 방문</p>
                        <p className="text-[10px] text-emerald-600 font-bold">{stat.revenue.toLocaleString()}원</p>
                        <p className="text-[9px] text-slate-400 font-bold">주기 약 {stat.avgCycle || '-'}일</p>
                      </div>
                    ) : (
                      <p className="text-[10px] text-slate-300">데이터 없음</p>
                    )}
                  </div>

                  {/* AI 인사이트 */}
                  <div className="col-span-3">
                    {ai ? (
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[10px] font-black ${ai.color}`}>
                        <TrendingUp className="w-3 h-3" />
                        {ai.text}
                      </div>
                    ) : (
                      <p className="text-[10px] text-slate-300 font-medium">분석 중...</p>
                    )}
                  </div>

                  {/* 즉시 실행 버튼 */}
                  <div className="col-span-3 flex justify-end gap-1.5 items-center">
                    <button
                      onClick={() => handleAction('문자 발송', c.name)}
                      className="p-2 bg-slate-50 text-slate-500 rounded-lg border border-slate-100 hover:bg-slate-900 hover:text-white transition-all shadow-sm"
                      title="문자 보내기"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleAction('쿠폰 발송', c.name)}
                      className="p-2 bg-slate-50 text-brand rounded-lg border border-brand/20 hover:bg-brand hover:text-white transition-all shadow-sm"
                      title="쿠폰 발송"
                    >
                      <Ticket className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleAction('예약 등록', c.name, c.id)}
                      className="p-2 bg-slate-50 text-emerald-600 rounded-lg border border-emerald-100 hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
                      title="예약 등록"
                    >
                      <CalendarPlus className="w-3.5 h-3.5" />
                    </button>
                    {dormant ? (
                      <button
                        onClick={() => handleAction('재방문 유도 메시지', c.name)}
                        className="px-3 py-2 bg-rose-500 text-white rounded-lg text-[10px] font-black hover:bg-rose-600 transition-all shadow-sm"
                      >
                        웰컴백
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAction('재방문 유도', c.name)}
                        className="p-2 bg-slate-50 text-slate-500 rounded-lg border border-slate-100 hover:bg-slate-900 hover:text-white transition-all shadow-sm"
                        title="재방문 유도"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : c.id)}
                      className="p-2 text-slate-300 hover:text-slate-600 transition-colors"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* 확장 상세 패널 */}
                {isExpanded && (
                  <div className="px-6 pb-5 pt-2 bg-slate-50/60 border-t border-slate-100">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* 메모 & 기본 정보 */}
                      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">고객 메모</p>
                        <p className="text-sm text-slate-600 font-medium leading-relaxed">{c.memo || '메모 없음'}</p>
                        <div className="mt-3 pt-3 border-t border-slate-50 flex gap-4 text-[10px]">
                          <div>
                            <p className="text-slate-400 font-black">등록일</p>
                            <p className="text-slate-700 font-bold">{c.createdAt}</p>
                          </div>
                          <div>
                            <p className="text-slate-400 font-black">최근 방문</p>
                            <p className="text-slate-700 font-bold">{c.lastVisit || '-'}</p>
                          </div>
                        </div>
                      </div>

                      {/* 방문 통계 */}
                      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">방문 통계</p>
                        {stat ? (
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-[11px] text-slate-500 font-bold">총 방문 횟수</span>
                              <span className="font-black text-slate-900">{stat.visits}회</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-[11px] text-slate-500 font-bold">누적 매출</span>
                              <span className="font-black text-emerald-600">{stat.revenue.toLocaleString()}원</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-[11px] text-slate-500 font-bold">평균 방문 주기</span>
                              <span className="font-black text-slate-900">{stat.avgCycle > 0 ? `약 ${stat.avgCycle}일` : '신규'}</span>
                            </div>
                          </div>
                        ) : (
                          <p className="text-slate-300 text-sm">집계 데이터 없음</p>
                        )}
                      </div>

                      {/* AI 추천 액션 (SaaS 확장 권한 적용) */}
                      {canUseAI ? (
                        <div className="bg-slate-950 text-white p-4 rounded-xl shadow-sm relative overflow-hidden">
                          <div className="absolute right-2 top-2 opacity-10">
                            <Sparkles className="w-16 h-16 text-brand" />
                          </div>
                          <p className="text-[9px] font-black text-brand uppercase tracking-widest mb-2">AI Recommendation</p>
                          {ai ? (
                            <>
                              <p className="text-sm font-black mb-1">{ai.text}</p>
                              <p className="text-[10px] text-slate-400 mb-3 leading-relaxed">
                                {grade === 'VIP' ? '맞춤 프리미엄 케어 오퍼를 제안하세요.' : '정기 방문 리마인더 문자를 발송하세요.'}
                              </p>
                              <button
                                onClick={() => handleAction('AI 추천 액션', c.name)}
                                className="w-full py-2 bg-white text-slate-950 rounded-lg text-[10px] font-black hover:bg-brand hover:text-white transition-all"
                              >
                                AI 추천 실행하기
                              </button>
                            </>
                          ) : (
                            <p className="text-slate-500 text-xs">추천 분석 중...</p>
                          )}
                        </div>
                      ) : (
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
                          <Sparkles className="w-6 h-6 text-slate-300 mb-2" />
                          <p className="text-xs font-bold text-slate-600 mb-1">AI 고객 분석 기능</p>
                          <p className="text-[10px] text-slate-400">Pro 요금제 이상에서 <br/>해제되는 기능입니다.</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => {
          setIsBookingModalOpen(false);
          setSelectedCustomerId(undefined);
        }}
        onSuccess={() => {
          refreshData();
          alert('예약이 성공적으로 등록되었습니다!');
        }}
        initialCustomerId={selectedCustomerId}
      />
      <CustomerModal
        isOpen={isCustomerModalOpen}
        onClose={() => setIsCustomerModalOpen(false)}
        onSuccess={() => {
          refreshData();
          alert('고객이 성공적으로 등록되었습니다!');
        }}
      />
    </div>
  );
};

