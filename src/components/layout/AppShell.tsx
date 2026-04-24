import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useShop } from '../../contexts/ShopContext';

export const AppShell: React.FC = () => {
  const { isAuthenticated } = useShop();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-surface flex">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col pl-0">
        <Header />
        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
