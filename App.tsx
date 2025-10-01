
import React, { useState, useEffect, useCallback } from 'react';
import { LayoutDashboard, Link, FolderKanban, User, Bell, X } from 'lucide-react';

import type { Sale, Notification } from './types';
import { mockFetchNewSale, mockFetchSalesData } from './services/affiliateService';

import Login from './components/Login';
import Dashboard from './components/Dashboard';
import LinkGenerator from './components/LinkGenerator';
import Materials from './components/Materials';
import Profile from './components/Profile';

type View = 'dashboard' | 'links' | 'materials' | 'profile';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [salesData, setSalesData] = useState<Sale[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [notification, setNotification] = useState<Notification | null>(null);

  const fetchSales = useCallback(async () => {
    setLoading(true);
    const data = await mockFetchSalesData();
    setSalesData(data);
    setLoading(false);
  }, []);
  
  useEffect(() => {
    if (isAuthenticated) {
      fetchSales();
    }
  }, [isAuthenticated, fetchSales]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const intervalId = setInterval(async () => {
      const newSale = await mockFetchNewSale();
      if (newSale) {
        setSalesData(prevSales => [newSale, ...prevSales]);
        setNotification({
          id: Date.now(),
          message: `🎉 Parabéns! Você recebeu uma comissão de R$ ${newSale.commission.toFixed(2).replace('.', ',')}`,
        });
        setTimeout(() => setNotification(null), 5000);
      }
    }, 15000); // Check for new sale every 15 seconds

    return () => clearInterval(intervalId);
  }, [isAuthenticated]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard salesData={salesData} loading={loading} />;
      case 'links':
        return <LinkGenerator />;
      case 'materials':
        return <Materials />;
      case 'profile':
        return <Profile onLogout={handleLogout} />;
      default:
        return <Dashboard salesData={salesData} loading={loading} />;
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'links', label: 'Links', icon: Link },
    { id: 'materials', label: 'Materiais', icon: FolderKanban },
    { id: 'profile', label: 'Perfil', icon: User },
  ];

  return (
    <div className="min-h-screen font-sans bg-slate-100 text-slate-800 flex flex-col md:max-w-lg md:mx-auto md:shadow-lg">
      {notification && (
        <div className="fixed top-5 right-5 z-50 bg-white border border-green-400 text-slate-800 rounded-lg shadow-lg p-4 flex items-start animate-fade-in-down">
          <Bell className="text-green-500 mr-3 mt-1" size={20} />
          <p className="flex-1">{notification.message}</p>
          <button onClick={() => setNotification(null)} className="ml-4 text-slate-400 hover:text-slate-600">
            <X size={18} />
          </button>
        </div>
      )}
      
      <main className="flex-1 p-4 pb-24">
        {renderView()}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-t-md md:max-w-lg md:mx-auto md:left-auto">
        <div className="flex justify-around">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id as View)}
              className={`flex flex-col items-center justify-center w-full py-2 px-1 text-center transition-colors duration-200 ${
                currentView === item.id ? 'text-primary' : 'text-slate-500 hover:text-primary'
              }`}
            >
              <item.icon size={24} strokeWidth={currentView === item.id ? 2.5 : 2} />
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default App;
