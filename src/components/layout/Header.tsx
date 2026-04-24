import React from 'react';
import { useShop } from '../../contexts/ShopContext';
import { UserCircle } from 'lucide-react';

export const Header: React.FC = () => {
  const { currentUser } = useShop();

  return (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-end px-8 sticky top-0 z-10 w-full">
      <div className="flex items-center space-x-3">
        <div className="text-right">
          <p className="text-sm font-medium text-slate-900">{currentUser?.name}</p>
          <p className="text-xs text-slate-500">{currentUser?.role === 'admin' ? '관리자' : '직원'}</p>
        </div>
        <div className="w-9 h-9 bg-brand/10 text-brand rounded-full flex items-center justify-center">
          <UserCircle className="w-6 h-6" />
        </div>
      </div>
    </header>
  );
};
