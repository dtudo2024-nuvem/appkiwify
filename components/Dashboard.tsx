import React, { useState, useMemo, useEffect, useRef } from 'react';
import type { Sale } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, ShoppingCart, BarChart3, Star } from 'lucide-react';
import { Platform } from '../types';

interface DashboardProps {
  salesData: Sale[];
  loading: boolean;
}

type TimeRange = 'today' | 'week' | 'month' | 'all';

const StatCard: React.FC<{ title: string; value: string; icon: React.ElementType; color: string }> = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white p-4 rounded-lg shadow flex items-center">
    <div className={`p-3 rounded-full mr-4 ${color}`}>
      <Icon className="text-white" size={24} />
    </div>
    <div>
      <p className="text-sm text-slate-500">{title}</p>
      <p className="text-xl font-bold text-slate-800">{value}</p>
    </div>
  </div>
);

const Dashboard: React.FC<DashboardProps> = ({ salesData, loading }) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('month');
  const [newSaleId, setNewSaleId] = useState<string | null>(null);

  const prevSalesDataRef = useRef<Sale[]>([]);
  useEffect(() => {
    // Animate new sale if it's added to the top of the list
    if (salesData.length > 0 && salesData[0].id !== prevSalesDataRef.current[0]?.id) {
      // Avoid animation on initial load
      if (prevSalesDataRef.current.length > 0) {
        const newSale = salesData[0];
        setNewSaleId(newSale.id);
        const timer = setTimeout(() => setNewSaleId(null), 2500); // Animation duration
        return () => clearTimeout(timer);
      }
    }
    prevSalesDataRef.current = salesData;
  }, [salesData]);
  
  const filteredData = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    if (timeRange === 'all') {
      return salesData;
    }

    let startDate: Date;
    switch (timeRange) {
      case 'today':
        startDate = today;
        break;
      case 'week':
        const dayOfWeek = today.getDay(); // Sunday - 0, Monday - 1...
        startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - dayOfWeek);
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
    }
    return salesData.filter(s => new Date(s.saleDate) >= startDate);
  }, [salesData, timeRange]);

  const totalCommission = filteredData.reduce((sum, s) => sum + s.commission, 0);
  const totalSales = filteredData.length;
  const averageTicket = totalSales > 0 ? totalCommission / totalSales : 0;
  
  const getTopPlatform = () => {
    if (filteredData.length === 0) return 'N/A';
    const platformCommissions: Record<string, number> = {};
    filteredData.forEach(sale => {
      platformCommissions[sale.platform] = (platformCommissions[sale.platform] || 0) + sale.commission;
    });
    return Object.entries(platformCommissions).sort((a, b) => b[1] - a[1])[0][0];
  };
  const topPlatform = getTopPlatform();

  const chartData = filteredData
    .sort((a, b) => a.saleDate.getTime() - b.saleDate.getTime())
    .map(sale => ({
      name: sale.saleDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
      Comissão: sale.commission,
    }));

  const platformColors: Record<Platform, string> = {
    [Platform.Hotmart]: 'bg-red-500',
    [Platform.Monetizze]: 'bg-blue-500',
    [Platform.Eduzz]: 'bg-yellow-500',
    [Platform.Kiwify]: 'bg-green-500',
  };

  const recentSales = filteredData.slice(0, 5);

  const timeRangeLabels: Record<TimeRange, string> = {
    today: 'Hoje',
    week: 'Semana',
    month: 'Mês',
    all: 'Tudo'
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
       <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>

      <div className="flex w-full bg-slate-200 p-1 rounded-lg">
        {(['today', 'week', 'month', 'all'] as TimeRange[]).map(range => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`w-full py-1.5 text-sm font-semibold rounded-md transition-colors duration-300 ${
              timeRange === range ? 'bg-white text-primary shadow' : 'text-slate-600 hover:bg-slate-300'
            }`}
          >
            {timeRangeLabels[range]}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <StatCard title={`Comissão (${timeRangeLabels[timeRange]})`} value={`R$ ${totalCommission.toFixed(2).replace('.', ',')}`} icon={DollarSign} color="bg-primary" />
        <StatCard title={`Vendas (${timeRangeLabels[timeRange]})`} value={`${totalSales}`} icon={ShoppingCart} color="bg-green-500" />
        <StatCard title="Ticket Médio" value={`R$ ${averageTicket.toFixed(2).replace('.', ',')}`} icon={BarChart3} color="bg-orange-500" />
        <StatCard title="Plataforma Destaque" value={topPlatform} icon={Star} color="bg-purple-500" />
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-slate-700 mb-4">Evolução de Ganhos</h2>
        <div style={{ width: '100%', height: 250 }}>
          <ResponsiveContainer>
            <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tickFormatter={(value) => `R$${value}`} tick={{ fontSize: 12 }} />
              <Tooltip formatter={(value: number) => [`R$ ${value.toFixed(2).replace('.', ',')}`, 'Comissão']} />
              <Bar dataKey="Comissão" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-slate-700 mb-4">Últimas Vendas ({timeRangeLabels[timeRange]})</h2>
        <ul className="space-y-3">
          {recentSales.length > 0 ? recentSales.map(sale => (
            <li 
              key={sale.id} 
              className={`flex items-center justify-between p-2 rounded-md transition-all duration-1000 ${
                sale.id === newSaleId ? 'bg-green-100 scale-105 shadow-md' : 'bg-transparent'
              }`}
            >
                <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${platformColors[sale.platform]}`}></div>
                    <div>
                        <p className="font-medium text-slate-800">{sale.productName}</p>
                        <p className="text-xs text-slate-500">{sale.saleDate.toLocaleDateString('pt-BR')} - {sale.platform}</p>
                    </div>
                </div>
              <p className="font-bold text-green-600">+ R$ {sale.commission.toFixed(2).replace('.', ',')}</p>
            </li>
          )) : <p className="text-slate-500 text-center py-4">Nenhuma venda neste período.</p>}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;