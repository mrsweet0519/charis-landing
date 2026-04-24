import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

import { ShopProvider } from '../contexts/ShopContext';
import { AppShell } from '../components/layout/AppShell';
import { Login } from '../pages/auth/Login';
import { Signup } from '../pages/auth/Signup';
import { Dashboard } from '../pages/Dashboard';
import { Booking } from '../pages/Booking';
import { Customers } from '../pages/Customers';
import { Sales } from '../pages/Sales';
import { useShop } from '../contexts/ShopContext';
import { isSupabaseConfigured } from '../lib/supabase';

function CRMContent() {
  const { loading } = useShop();
  const [showEmergencyButton, setShowEmergencyButton] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (loading) setShowEmergencyButton(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, [loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="relative mb-8">
          <div className="w-20 h-20 border-4 border-brand/5 border-t-brand rounded-full animate-spin duration-[1500ms]" />
          <Sparkles className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-brand animate-pulse" />
          <div className="absolute inset-0 bg-brand/10 blur-2xl rounded-full -z-10 animate-pulse" />
        </div>

        <div className="text-center space-y-3 animate-in fade-in zoom-in-95 duration-1000">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Charis Beauty</h2>
          <div className="flex flex-col items-center">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-2">
              All-in-one CRM
            </p>
            <div className="w-48 h-1 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-brand animate-[loading_2s_ease-in-out_infinite]" />
            </div>
          </div>
        </div>

        {showEmergencyButton && (
          <div className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <button
              onClick={() => {
                window.location.href = '/login';
              }}
              className="px-6 py-3 bg-white border border-slate-200 text-slate-600 text-sm font-bold rounded-2xl shadow-sm hover:shadow-md hover:bg-slate-50 transition-all active:scale-95"
            >
              로그인 화면으로 직접 이동하기
            </button>
          </div>
        )}

        <style
          dangerouslySetInnerHTML={{
            __html: `
              @keyframes loading {
                0% { transform: translateX(-100%); }
                50% { transform: translateX(0); }
                100% { transform: translateX(100%); }
              }
            `,
          }}
        />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<AppShell />}>
        <Route index element={<Dashboard />} />
      </Route>
      <Route element={<AppShell />}>
        <Route path="/bookings" element={<Booking />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/sales" element={<Sales />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function CRMApp() {
  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen bg-slate-950 px-6 text-white flex items-center justify-center">
        <div className="max-w-lg rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#D4AF37]">
            CRM Configuration Required
          </p>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-white">
            CRM 환경변수가 아직 연결되지 않았습니다.
          </h1>
          <p className="mt-4 text-sm leading-6 text-white/70">
            랜딩페이지는 정상적으로 열리지만 CRM 경로는 Supabase 환경변수가 있어야 동작합니다.
            Vercel 프로젝트에 `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`를 추가한 뒤 다시 배포해 주세요.
          </p>
          <a
            href="/"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full border border-[#D4AF37] bg-[#D4AF37] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:-translate-y-0.5"
          >
            랜딩으로 돌아가기
          </a>
        </div>
      </div>
    );
  }

  return (
    <ShopProvider>
      <CRMContent />
    </ShopProvider>
  );
}
