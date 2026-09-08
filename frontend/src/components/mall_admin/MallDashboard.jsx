import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  TrendingUp, 
  Users, 
  QrCode, 
  Sparkles, 
  Download, 
  Printer, 
  Store, 
  MapPin, 
  AlertTriangle,
  Clock,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { api } from '../../services/api';
import { useMall } from '../../context/MallContext';

export const MallDashboard = () => {
  const { currentMall, addNotification } = useMall();
  const [analytics, setAnalytics] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // overview | heatmap | qr | ai
  const [loading, setLoading] = useState(true);

  // New QR Generation state
  const [newTableNum, setNewTableNum] = useState('A-35');
  const [newZone, setNewZone] = useState('North Food Court');
  const [newFloor, setNewFloor] = useState('Level 2');

  const fetchAnalytics = async () => {
    try {
      const res = await api.getMallAnalytics();
      if (res.success) {
        setAnalytics(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const handlePrintQR = () => {
    window.print();
    addNotification("Print Dialog Opened", `Printing Table Tent Card for Table ${newTableNum}`, "info");
  };

  const handleDownloadQR = () => {
    addNotification("QR Downloaded", `Table ${newTableNum} QR code downloaded for sticker printing`, "success");
  };

  if (loading || !analytics) {
    return (
      <div className="text-center py-20 text-slate-400 text-xs">
        Loading Mall Operating System Control Room...
      </div>
    );
  }

  const kpis = analytics.kpis;

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20 animate-in fade-in duration-200">
      
      {/* Mall Control Room Top Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-elevated flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-brand-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Building2 className="w-4 h-4" />
            <span>Mall Digital Infrastructure OS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            {currentMall.name} — Control Center
          </h1>
          <p className="text-xs text-slate-300 mt-1 font-medium">
            Centralized food court telemetry, multi-store order routing & table occupancy analytics
          </p>
        </div>

        {/* Action Tabs */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${activeTab === 'overview' ? 'bg-brand-500 text-white shadow-sm' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
          >
            Overview & Telemetry
          </button>
          <button
            onClick={() => setActiveTab('heatmap')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${activeTab === 'heatmap' ? 'bg-brand-500 text-white shadow-sm' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
          >
            Mall Floor Heatmap
          </button>
          <button
            onClick={() => setActiveTab('qr')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${activeTab === 'qr' ? 'bg-brand-500 text-white shadow-sm' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
          >
            QR Code Generator
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${activeTab === 'ai' ? 'bg-brand-500 text-white shadow-sm' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
          >
            AI Demand Forecast
          </button>
        </div>
      </div>

      {/* KPI Cards (Matches PRD Section 14) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Mall Food Orders</span>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">{kpis.totalOrders}</div>
          <span className="text-[11px] font-bold text-emerald-600 mt-1 block">↑ 18.2% this week</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Food Court GMV Revenue</span>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">{kpis.totalRevenue}</div>
          <span className="text-[11px] font-bold text-emerald-600 mt-1 block">8.5% Mall commission yield</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Active Food Outlets</span>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">{kpis.activeRestaurants}</div>
          <span className="text-[11px] font-bold text-blue-600 mt-1 block">100% On-premise uptime</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Average Delivery SLA</span>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">{kpis.avgDeliveryTime}</div>
          <span className="text-[11px] font-bold text-emerald-600 mt-1 block">Table drop accuracy: 99.6%</span>
        </div>
      </div>

      {/* Tab: Overview & Hourly Chart */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">Food Court Orders Per Hour</h3>
                <p className="text-xs text-slate-500 font-medium">Telemetry across all 6 connected outlets</p>
              </div>
              <span className="text-xs font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
                Peak: 7:00 PM – 9:00 PM
              </span>
            </div>

            <div className="h-64 sm:h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics.ordersPerHour}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="hour" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff' }}
                    formatter={(val, name) => [val, name === 'orders' ? 'Orders' : 'Revenue']}
                  />
                  <Bar dataKey="orders" fill="#fc8019" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Popular Categories */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft flex flex-col justify-between">
            <div>
              <h3 className="font-extrabold text-base text-slate-900 mb-1">Top Selling Food Categories</h3>
              <p className="text-xs text-slate-500 font-medium mb-4">Share of total mall order volume</p>

              <div className="space-y-4">
                {analytics.popularCategories.map((cat, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                      <span>{cat.name}</span>
                      <span>{cat.percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-brand-500 h-full rounded-full"
                        style={{ width: `${cat.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 bg-amber-50/70 p-3 rounded-2xl border border-amber-200/60 text-xs text-amber-900 font-medium">
              💡 <strong>Insight:</strong> Burgers & Pizzas comprise 60% of all multi-store cart pairs in Level 2 North Court.
            </div>
          </div>
        </div>
      )}

      {/* Tab: Mall Floor Heatmap (PRD Section 15) */}
      {activeTab === 'heatmap' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-lg text-slate-900">Food Court Seating Zone Heatmap</h3>
              <p className="text-xs text-slate-500 font-medium">Live traffic density & revenue generation by mall zone</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-bold">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-red-500"></span> High Traffic</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-500"></span> Medium</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500"></span> Low</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analytics.heatmap.map((zone, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border transition-all flex flex-col justify-between"
                style={{ borderColor: zone.color, backgroundColor: `${zone.color}0D` }}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-black text-sm text-slate-900">{zone.zoneId}</h4>
                    <span
                      className="text-xs font-black px-2.5 py-0.5 rounded-full text-white"
                      style={{ backgroundColor: zone.color }}
                    >
                      {zone.intensity} Activity
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium mb-4">{zone.note}</p>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-200/60 text-center">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Active Tables</span>
                    <span className="text-sm font-black text-slate-900">{zone.activeCustomers} seated</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Orders Today</span>
                    <span className="text-sm font-black text-slate-900">{zone.ordersCount}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Revenue</span>
                    <span className="text-sm font-black text-slate-900">{zone.revenue}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: QR Code Generator & Manager (PRD Section 21) */}
      {activeTab === 'qr' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft">
          <div className="max-w-3xl mx-auto space-y-6">
            <div>
              <h3 className="font-extrabold text-xl text-slate-900">Mall Table QR Code Generator & Printer</h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Generate high-resolution printable table tent cards with embedded mall & table identification metadata.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-50 p-6 rounded-3xl border border-slate-200">
              
              {/* Form Input */}
              <div className="space-y-4 text-xs font-bold">
                <div>
                  <label className="block text-slate-500 uppercase tracking-wider mb-1">Table Number / Label</label>
                  <input
                    type="text"
                    value={newTableNum}
                    onChange={(e) => setNewTableNum(e.target.value.toUpperCase())}
                    placeholder="E.g. A-24, B-12..."
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 font-black focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-500 uppercase tracking-wider mb-1">Food Court Zone</label>
                  <select
                    value={newZone}
                    onChange={(e) => setNewZone(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-bold focus:outline-none focus:border-brand-500"
                  >
                    <option>North Food Court</option>
                    <option>South Atrium Lounge</option>
                    <option>Sky Garden Terrace</option>
                    <option>Central Plaza Tables</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-500 uppercase tracking-wider mb-1">Floor Level</label>
                  <input
                    type="text"
                    value={newFloor}
                    onChange={(e) => setNewFloor(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-bold focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    onClick={handleDownloadQR}
                    className="flex-1 bg-brand-500 hover:bg-brand-600 text-white font-extrabold py-2.5 px-3 rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-transform active:scale-95"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PNG</span>
                  </button>
                  <button
                    onClick={handlePrintQR}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Tent Card</span>
                  </button>
                </div>
              </div>

              {/* Live Card Preview */}
              <div className="bg-white rounded-2xl p-6 border-2 border-slate-900 shadow-elevated text-center flex flex-col items-center">
                <div className="text-[10px] uppercase font-black tracking-widest text-brand-500 mb-1">
                  MALLBITE TABLE QR
                </div>
                <h4 className="text-base font-black text-slate-900">
                  {currentMall.name}
                </h4>
                <p className="text-[10px] text-slate-400 font-bold mb-4">{newZone} • {newFloor}</p>

                <div className="p-3 bg-white rounded-xl shadow-inner border border-slate-200">
                  <QRCodeSVG
                    value={`https://mallbite.app/order?mall=phoenix&table=${newTableNum}`}
                    size={140}
                    level="H"
                    includeMargin={true}
                  />
                </div>

                <div className="mt-4 bg-slate-900 text-white rounded-xl px-4 py-1.5 font-black text-sm tracking-wider">
                  TABLE {newTableNum}
                </div>
                <p className="text-[10px] text-slate-500 mt-2 font-semibold">
                  Scan once. Order from all outlets. Pay once.
                </p>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Tab: AI Demand Forecasting (PRD Section 17) */}
      {activeTab === 'ai' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-500 to-amber-400 text-white flex items-center justify-center shadow-md shadow-brand-500/30">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-xl text-slate-900">AI Food Demand & Staffing Forecast</h3>
              <p className="text-xs text-slate-500 font-medium">Predictive machine intelligence based on historical footfall & rush patterns</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-brand-50/80 rounded-2xl p-6 border border-brand-200 space-y-3">
              <div className="flex items-center gap-2 text-brand-800 font-black text-sm">
                <Clock className="w-4 h-4 text-brand-600" />
                <span>Upcoming Peak Rush Window</span>
              </div>
              <div className="text-3xl font-black text-slate-900">
                {analytics.aiDemandForecast.peakWindow}
              </div>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Projected multi-store order volume: <strong className="text-brand-700 font-bold">{analytics.aiDemandForecast.expectedOrders}</strong> across food court tables.
              </p>
            </div>

            <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-black text-sm">
                <Zap className="w-4 h-4" />
                <span>AI Recommended Action</span>
              </div>
              <div className="text-lg font-extrabold text-white">
                Increase Active Delivery Runners by +{analytics.aiDemandForecast.recommendedStaffIncrease}
              </div>
              <p className="text-xs text-slate-300 font-medium">
                Ensures table delivery SLA remains strictly under 15 minutes during peak evening dinner rush.
              </p>
            </div>
          </div>

          {/* Kitchen prep recommendations */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
            <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-2">
              Automated Prep Advice Sent to Outlets:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {analytics.aiDemandForecast.suggestedOutletsPrep.map((prep, idx) => (
                <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{prep}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
