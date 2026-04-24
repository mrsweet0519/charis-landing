import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useShop } from '../../contexts/ShopContext';
import { UserPlus } from 'lucide-react';

export const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [shopName, setShopName] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useShop();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { ok, error } = await signup(email, password, name, shopName, phone);
      if (ok) {
        localStorage.setItem('charis_saved_email', email);
        alert('회원가입이 완료되었습니다! 사장님 환영합니다.');
        navigate('/');
      } else {
        alert(`로그인 실패: ${error}`);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : '알 수 없는 오류';
      alert(`시스템 오류: ${message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand/10 text-brand mb-4">
            <UserPlus className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Charis Beauty</h1>
          <p className="text-slate-500 mt-2">원장님, 우리 샵만의 CRM을 시작해 보세요!</p>
        </div>

        <div className="card shadow-lg shadow-slate-200/50">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                원장님 성함
              </label>
              <input
                type="text"
                required
                className="input"
                placeholder="예: 김원장"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                미용실(샵) 이름
              </label>
              <input
                type="text"
                required
                className="input"
                placeholder="예: 카리스 뷰티 본점"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                이메일 주소 (로그인 아이디)
              </label>
              <input
                type="email"
                required
                className="input"
                placeholder="hello@charis.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                휴대폰 번호 (선택)
              </label>
              <input
                type="tel"
                className="input"
                placeholder="010-0000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                비밀번호
              </label>
              <input
                type="password"
                required
                minLength={6}
                className="input"
                placeholder="6자리 이상 입력해주세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full py-3 mt-6 text-base shadow-md shadow-brand/20 flex justify-center items-center"
            >
              {isLoading ? '가입 진행 중...' : '무료로 시작하기'}
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm">
            <span className="text-slate-500">이미 계정이 있으신가요? </span>
            <Link to="/login" className="text-brand font-bold hover:underline">
              로그인하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
