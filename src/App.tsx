import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Landing } from './pages/Landing';

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-black px-6 text-white flex items-center justify-center">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 rounded-full border-2 border-white/10 border-t-[#D4AF37] animate-spin" />
        <p className="mt-4 text-sm uppercase tracking-[0.28em] text-white/60">Loading</p>
      </div>
    </div>
  );
}

function CRMEntry() {
  const [CRMApp, setCRMApp] = React.useState<React.ComponentType | null>(null);
  const [loadError, setLoadError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    let mounted = true;

    import('./routes/CRMApp')
      .then((module) => {
        if (mounted) {
          setCRMApp(() => module.default);
        }
      })
      .catch((error) => {
        if (mounted) {
          setLoadError(error instanceof Error ? error : new Error('Failed to load CRM app.'));
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (loadError) {
    return (
      <div className="min-h-screen bg-black px-6 text-white flex items-center justify-center">
        <div className="max-w-md text-center">
          <p className="text-xs uppercase tracking-[0.32em] text-[#D4AF37]">CRM Load Error</p>
          <h1 className="mt-4 text-3xl font-semibold text-white">CRM 화면을 불러오지 못했습니다.</h1>
          <p className="mt-3 text-sm leading-6 text-white/65">{loadError.message}</p>
        </div>
      </div>
    );
  }

  if (!CRMApp) {
    return <LoadingFallback />;
  }

  return (
    <Router>
      <CRMApp />
    </Router>
  );
}

function App() {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
  const isLandingRoute = pathname === '/' || pathname === '/landing';

  if (isLandingRoute) {
    return <Landing />;
  }

  return <CRMEntry />;
}

export default App;
