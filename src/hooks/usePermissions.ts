import { useShop } from '../contexts/ShopContext';

export const usePermissions = () => {
  const { currentShop, currentUser } = useShop();

  const isAdmin = currentUser?.role === 'admin';
  const isStaff = currentUser?.role === 'staff';

  const plan = currentShop?.plan || 'basic';
  const isProMode = plan === 'pro' || plan === 'premium';
  
  // 기능 권한 정의
  const canViewSales = isAdmin; // 매출/수익 탭은 관리자만
  const canManageSettings = isAdmin; // 샵 설정은 관리자만
  const canDeleteCustomer = isAdmin; // 고객 삭제는 관리자만
  
  // SaaS 확장 권한 (내부 준비)
  const canUseAI = currentShop?.ai_enabled && isProMode;
  const canSendBulkSMS = isProMode && (currentShop?.sms_count || 0) < (currentShop?.sms_limit || 100);

  return {
    isAdmin,
    isStaff,
    plan,
    canViewSales,
    canManageSettings,
    canDeleteCustomer,
    canUseAI,
    canSendBulkSMS
  };
};
