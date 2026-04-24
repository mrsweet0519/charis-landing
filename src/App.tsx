import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ShopProvider } from './contexts/ShopContext';
import { AppShell } from './components/layout/AppShell';
import { Login } from './pages/auth/Login';
import { Signup } from './pages/auth/Signup';
import { Dashboard } from './pages/Dashboard';
import { Booking } from './pages/Booking';
import { Customers } from './pages/Customers';
import { Sales } from './pages/Sales';
import { Landing } from './pages/Landing'; // 신규 추가
import { useShop } from './contexts/ShopContext';
import { Sparkles } from 'lucide-react';

function AppContent() {
  const { loading } = useShop();
  const [showEmergencyButton, setShowEmergencyButton] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (loading) setShowEmergencyButton(true);
    }, 4000); // 4초 후 비상 버튼 노출
    return () => clearTimeout(timer);
  }, [loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="relative mb-8">
          <div className="w-20 h-20 border-4 border-brand/5 border-t-brand rounded-full animate-spin duration-[1500ms]"></div>
          <Sparkles className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-brand animate-pulse" />
          
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-brand/10 blur-2xl rounded-full -z-10 animate-pulse"></div>
        </div>
        
        <div className="text-center space-y-3 animate-in fade-in zoom-in-95 duration-1000">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Charis Beauty</h2>
          <div className="flex flex-col items-center">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-2">
              All-in-one CRM
            </p>
            <div className="w-48 h-1 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-brand animate-[loading_2s_ease-in-out_infinite]"></div>
            </div>
          </div>
        </div>
        
        {showEmergencyButton && (
          <div className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <button 
              onClick={() => window.location.href = '/login'}
              className="px-6 py-3 bg-white border border-slate-200 text-slate-600 text-sm font-bold rounded-2xl shadow-sm hover:shadow-md hover:bg-slate-50 transition-all active:scale-95"
            >
              화면이 바뀌지 않나요? 직접 진입하기
            </button>
          </div>
        )}

        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes loading {
            0% { transform: translateX(-100%); }
            50% { transform: translateX(0); }
            100% { transform: translateX(100%); }
          }
        `}} />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/landing" element={<Landing />} />
        
        <Route element={<AppShell />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/bookings" element={<Booking />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/sales" element={<Sales />} />
        </Route>
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}

export default App;
