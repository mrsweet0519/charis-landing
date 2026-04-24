import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { User, Shop } from '../types/schema';

interface ShopContextType {
  currentShop: Shop | null;
  currentUser: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, pass: string) => Promise<{ ok: boolean; error?: string }>;
  signup: (email: string, pass: string, name: string, shopName: string, phone: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const getErrorMessage = (err: unknown) => err instanceof Error ? err.message : String(err);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentShop, setCurrentShop] = useState<Shop | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false); // 데이터 중복 로드 방지 소켓

  // Supabase Auth 세션 감지 및 유저/샵 정보 로드
  useEffect(() => {
    const loadSession = async () => {
      try {
        console.log('--- 시스템 초기화 시작 ---');
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          await fetchUserAndShop(session.user.id);
        }
      } catch (err) {
        console.error('초기 세션 로드 중 오류 발생:', err);
      } finally {
        console.log('--- 시스템 초기화 종료 (Loading OFF) ---');
        setLoading(false);
      }
    };

    const safetyTimer = setTimeout(() => {
      console.warn('보안 타이머: 로딩이 너무 길어 강제로 해제합니다.');
      setLoading(false);
    }, 5000);

    loadSession();

    // Auth 상태 변화 구독 (로그인/로그아웃 자동 감지)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth 상태 변화:', event, session?.user?.id);
        if (session?.user) {
          // 이미 정보가 있고 ID가 같다면 로드 생략 (성능 최적화)
          if (currentUser?.id === session.user.id && currentShop) return;
          await fetchUserAndShop(session.user.id);
        } else {
          setCurrentUser(null);
          setCurrentShop(null);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
      clearTimeout(safetyTimer);
    };
  }, []);

  /** Supabase users 테이블에서 유저 정보 + shop 정보 로드 (조인 쿼리로 최적화) */
  const fetchUserAndShop = async (authUserId: string) => {
    if (isFetching) return;
    try {
      setIsFetching(true);
      console.log('데이터 로드 시작 (User ID):', authUserId);
      
      // users + shops 정보를 한 번의 쿼리로 병합 (속도 최적화)
      const { data, error } = await supabase
        .from('users')
        .select(`
          *,
          shops (*)
        `)
        .eq('id', authUserId)
        .single();

      if (error || !data) {
        throw new Error('사용자 프로필 정보를 찾을 수 없습니다.');
      }

      const user = data as User & { shops: Shop | null };
      const shop = user.shops;

      if (!shop) {
        throw new Error('샵 정보를 찾을 수 없습니다.');
      }

      setCurrentUser(user);
      setCurrentShop(shop);
      
      console.log('데이터 로드 완료:', shop.name);
    } catch (err: unknown) {
      const message = getErrorMessage(err);
      console.error('세션 로드 데이터 상세 오류:', err);
      // 에러 시 세션 초기화 (로그아웃 유도)
      if (message.includes('찾을 수 없습니다')) {
        setCurrentUser(null);
        setCurrentShop(null);
      }
      throw err; 
    } finally {
      setIsFetching(false);
    }
  };

  const login = async (email: string, pass: string): Promise<{ ok: boolean; error?: string }> => {
    try {
      // 로그인 시도 전 상태 초기화
      setIsFetching(false); 
      
      const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass });
      
      if (error) return { ok: false, error: error.message };
      if (!data.user) return { ok: false, error: '인증 유저 정보가 없습니다.' };

      // onAuthStateChange에서 감지하여 fetchUserAndShop을 호출하겠지만,
      // 즉시 전환을 위해 여기서 명시적으로 호출 (이미 fetch 중이면 skip됨)
      await fetchUserAndShop(data.user.id);
      
      return { ok: true };
    } catch (err: unknown) {
      console.error('Login Process Error:', err);
      return { ok: false, error: getErrorMessage(err) || '알 수 없는 로그인 오류가 발생했습니다.' };
    }
  };

  const signup = async (email: string, pass: string, name: string, shopName: string, phone: string): Promise<{ ok: boolean; error?: string }> => {
    try {
      setLoading(true);
      // 1. Supabase Auth 유저 가입
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password: pass,
        options: {
          data: { name, phone }
        }
      });
      if (authError || !authData.user) return { ok: false, error: authError?.message || '가입 실패' };

      // 2. 새로운 샵 생성
      const { data: shopData, error: shopError } = await supabase
        .from('shops')
        .insert({
          name: shopName,
          owner_email: email,
          contact: phone,
          plan: 'basic',
          ai_enabled: false
        })
        .select()
        .single();
      
      if (shopError || !shopData) return { ok: false, error: '샵 기초 데이터 생성 중 오류: ' + (shopError?.message || '') };

      // 3. User 테이블 매핑
      const { error: mapError } = await supabase
        .from('users')
        .insert({
          id: authData.user.id,
          shop_id: shopData.id,
          email,
          name,
          role: 'admin'
        });
      
      if (mapError) return { ok: false, error: '유저 권한 매핑 중 오류: ' + mapError.message };

      // 모든 과정 성공시 세션 새로고침
      await fetchUserAndShop(authData.user.id);
      return { ok: true };
    } catch (err: unknown) {
      return { ok: false, error: getErrorMessage(err) };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
    setCurrentShop(null);
  };

  return (
    <ShopContext.Provider value={{
      currentShop,
      currentUser,
      isAuthenticated: !!currentUser,
      loading,
      login,
      signup,
      logout,
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (context === undefined) throw new Error('useShop must be used within a ShopProvider');
  return context;
};
