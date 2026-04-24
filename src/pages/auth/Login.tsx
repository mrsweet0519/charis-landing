import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useShop } from '../../contexts/ShopContext';
import { Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showProgressMsg, setShowProgressMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // UX 향상 필드
  const [rememberEmail, setRememberEmail] = useState(true);
  const [keepLoggedIn, setKeepLoggedIn] = useState(true);

  const { login, isAuthenticated, loading: authLoading } = useShop();
  const navigate = useNavigate();

  // 1. 이미 로그인된 세션이 있으면 즉시 대시보드로 리다이렉트 (깜빡임 방지)
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, authLoading, navigate]);

  // 2. 저장된 이메일 불러오기
  useEffect(() => {
    const savedEmail = localStorage.getItem('charis_saved_email');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberEmail(true);
    }
  }, []);

  // 3. 로딩이 1초 이상 지속될 경우 안내 문구 표시 타이머
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isLoading) {
      timer = setTimeout(() => {
        setShowProgressMsg(true);
      }, 1000);
    } else {
      setShowProgressMsg(false);
    }
    return () => clearTimeout(timer);
  }, [isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return; // 연타 방지
    
    setIsLoading(true);
    setErrorMsg(null);
    
    try {
      // 15초 타임아웃 레이스 (시스템 중단 방지)
      const loginPromise = login(email, password);
      const timeoutPromise = new Promise<{ ok: false, error: string }>((resolve) => 
        setTimeout(() => resolve({ ok: false, error: '시간이 너무 오래 걸립니다. 네트워크를 확인해주세요.' }), 15000)
      );

      const result = await Promise.race([loginPromise, timeoutPromise]) as { ok: boolean; error?: string };

      if (result.ok) {
        // 이메일 저장 로직
        if (rememberEmail) {
          localStorage.setItem('charis_saved_email', email);
        } else {
          localStorage.removeItem('charis_saved_email');
        }
        
        // 성공 시 즉시 이동 (App.tsx의 로딩이 끝나면 자연스럽게 대시보드 노출)
        navigate('/');
      } else {
        setErrorMsg(result.error || '이메일 또는 비밀번호가 일치하지 않습니다.');
      }
    } catch (err: unknown) {
      console.error('로그인 오류:', err);
      setErrorMsg('인증 서버와 통신 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 초기 로딩 중에는 아무것도 보여주지 않거나 스피너를 보여줌 (리다이렉트 대기)
  if (authLoading && !isAuthenticated) {
    return null; 
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10 transition-all duration-700 ease-out">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand/10 text-brand mb-4 shadow-inner">
            <Sparkles className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Charis Beauty</h1>
          <p className="text-slate-500 mt-2">뷰티샵 원장님을 위한 올인원 운영 시스템</p>
        </div>

        <div className="card shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden bg-white">
          <form onSubmit={handleSubmit} className="p-1 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">
                  이메일
                </label>
                <input
                  type="email"
                  required
                  autoFocus
                  className="input transition-all duration-200 focus:ring-4 focus:ring-brand/10"
                  placeholder="admin@charis.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">
                  비밀번호
                </label>
                <input
                  type="password"
                  required
                  className="input transition-all duration-200 focus:ring-4 focus:ring-brand/10"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* 체크 옵션 영역 */}
            <div className="flex items-center justify-between px-1">
              <label className="flex items-center gap-2 group cursor-pointer">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={rememberEmail}
                    onChange={(e) => setRememberEmail(e.target.checked)}
                  />
                  <div className="w-5 h-5 border-2 border-slate-300 rounded-md transition-all peer-checked:bg-brand peer-checked:border-brand"></div>
                  <CheckCircle2 className="absolute w-3.5 h-3.5 text-white scale-0 transition-transform peer-checked:scale-100 left-0.5" />
                </div>
                <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">이메일 기억하기</span>
              </label>

              <label className="flex items-center gap-2 group cursor-pointer">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={keepLoggedIn}
                    onChange={(e) => setKeepLoggedIn(e.target.checked)}
                  />
                  <div className="w-5 h-5 border-2 border-slate-300 rounded-md transition-all peer-checked:bg-brand peer-checked:border-brand"></div>
                  <CheckCircle2 className="absolute w-3.5 h-3.5 text-white scale-0 transition-transform peer-checked:scale-100 left-0.5" />
                </div>
                <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">로그인 상태 유지</span>
              </label>
            </div>

            {/* 에러 메시지 */}
            {errorMsg && (
              <div className="flex items-center gap-2 p-3.5 text-sm bg-red-50 text-red-600 rounded-xl border border-red-100 animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <p className="font-medium">{errorMsg}</p>
              </div>
            )}
            
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full py-3.5 text-base font-bold shadow-lg shadow-brand/20 flex flex-col justify-center items-center gap-1 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span>{isLoading ? '로그인 처리 중...' : '로그인'}</span>
                {showProgressMsg && (
                  <span className="text-[10px] opacity-80 font-normal animate-pulse">
                    계정 정보를 불러오는 중입니다...
                  </span>
                )}
              </button>
            </div>
          </form>
          
          <div className="mt-8 mb-2 text-center text-sm">
            <span className="text-slate-500">아직 계정이 없으신가요? </span>
            <Link to="/signup" className="text-brand font-bold hover:underline ml-1">
              원장님 회원가입
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
