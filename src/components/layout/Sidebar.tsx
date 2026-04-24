import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, Users, CircleDollarSign, LogOut } from 'lucide-react';
import { useShop } from '../../contexts/ShopContext';
import { usePermissions } from '../../hooks/usePermissions';

export const Sidebar: React.FC = () => {
  const { currentShop, currentUser, logout } = useShop();
  const { canViewSales } = usePermissions();

  const links = [
    { to: '/', icon: LayoutDashboard, label: '대시보드', show: true },
    { to: '/bookings', icon: CalendarDays, label: '예약 관리', show: true },
    { to: '/customers', icon: Users, label: '고객 관리', show: true },
    { to: '/sales', icon: CircleDollarSign, label: '매출 관리', show: canViewSales },
  ].filter(l => l.show);

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen fixed left-0 top-0">
      <div className="p-6">
        <h1 className="text-xl font-bold text-white tracking-wide">
          {currentShop?.name || 'Beauty SaaS CRM'}
        </h1>
        <div className="mt-2 text-xs">
          <span className="bg-brand/20 text-brand px-2 py-0.5 rounded-full font-bold">
            {currentUser?.role === 'admin' ? '원장 (관리자)' : '직원'}
          </span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                isActive
                  ? 'bg-brand text-white font-medium shadow-sm'
                  : 'hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <link.icon className="w-5 h-5" />
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button
          onClick={logout}
          className="flex items-center space-x-3 px-4 py-2 w-full rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>로그아웃</span>
        </button>
      </div>
    </aside>
  );
};
