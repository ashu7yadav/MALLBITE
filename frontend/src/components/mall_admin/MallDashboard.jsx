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
  CheckCircle2,
  PlusCircle,
  X,
  FileSpreadsheet,
  Share2,
  DollarSign,
  ArrowRight,
  ChevronRight,
  Copy,
  ExternalLink,
  Eye
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { api } from '../../services/api';
import { useMall } from '../../context/MallContext';

export const MallDashboard = () => {
  const { allMalls, currentMall, switchMall, switchTable, addNotification, refreshData } = useMall();
  const [analytics, setAnalytics] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // overview | heatmap | qr | outlets | ai
  const [loading, setLoading] = useState(true);

  // QR Standee Generator state
  const [newTableNum, setNewTableNum] = useState('A-12');
  const [newZone, setNewZone] = useState('Zone A (North Food Atrium)');
  const [newFloor, setNewFloor] = useState('Level 3');
  const [batchMode, setBatchMode] = useState(false);
  const [batchPrefix, setBatchPrefix] = useState('A-');
  const [batchStart, setBatchStart] = useState(1);
  const [batchEnd, setBatchEnd] = useState(12);

  // Modals for Onboarding
  const [isAddOutletOpen, setIsAddOutletOpen] = useState(false);
  const [isAddMallOpen, setIsAddMallOpen] = useState(false);

  // New Outlet Form State
  const [outletForm, setOutletForm] = useState({
    name: '',
    tagline: '',
    category: 'Fast Food • Multi-Cuisine',
    counterNumber: 'FC-07',
    floor: 'Level 3 Food Court',
    priceForTwo: '₹350',
    isVegOnly: false,
    bannerImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80',
    offerTag: '15% OFF UPTO ₹100'
  });

  // New Mall Form State
  const [mallForm, setMallForm] = useState({
    name: 'City Mall Food Atrium',
    city: 'Metro City',
    location: 'Central Atrium Level 3',
    totalTables: 35
  });

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
    addNotification("Print Dialog Opened", `Ready to print Table Standees for ${currentMall.name}`, "info");
  };

  const handleCreateOutlet = async (e) => {
    e.preventDefault();
    if (!outletForm.name) return;
    try {
      const res = await api.createRestaurant(outletForm);
      if (res.success) {
        addNotification("Food Outlet Onboarded!", `${outletForm.name} is now live in ${currentMall.name}`, "success");
        setIsAddOutletOpen(false);
        refreshData();
        setOutletForm({
          name: '',
          tagline: '',
          category: 'Fast Food • Multi-Cuisine',
          counterNumber: 'FC-08',
          floor: 'Level 3 Food Court',
          priceForTwo: '₹350',
          isVegOnly: false,
          bannerImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80',
          offerTag: '15% OFF UPTO ₹100'
        });
      }
    } catch {
      addNotification("Error", "Could not add outlet", "error");
    }
  };

  const handleCreateMall = async (e) => {
    e.preventDefault();
    if (!mallForm.name) return;
    try {
      const res = await api.createMall(mallForm);
      if (res.success) {
        addNotification("New Shopping Mall Onboarded!", `${mallForm.name} has been added to MALLBITE.`, "success");
        setIsAddMallOpen(false);
        refreshData();
      }
    } catch {
      addNotification("Error", "Could not onboard mall", "error");
    }
  };

  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://mallbite.app';

  if (loading || !analytics) {
    return (
      <div className="text-center py-20 text-slate-400 text-xs font-bold">
        Loading Mall Operating System Control Room...
      </div>
    );
  }

  const kpis = analytics.kpis;

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20 animate-in fade-in duration-200">
      
      {/* Mall Control Room Top Header */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-elevated border border-slate-800 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-brand-400 text-xs font-black uppercase tracking-wider mb-1.5">
            <Building2 className="w-4 h-4 text-brand-500" />
            <span>Mall Digital Infrastructure OS Control Center</span>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black font-display text-white">
              {currentMall.name}
            </h1>
            <span className="bg-brand-500/30 text-amber-300 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-brand-400/40 uppercase">
              Live Hub
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1 font-medium">
            Centralized food court telemetry, multi-store order routing & table occupancy analytics
          </p>
        </div>

        {/* Quick Mall Switcher & Add Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={currentMall.id}
            onChange={(e) => switchMall(e.target.value)}
            aria-label="Active Food Court Location"
            className="bg-slate-800 border border-slate-700 text-white text-xs font-bold rounded-xl px-3 py-2 focus:outline-none focus:border-brand-500"
          >
            <option value="mall-city">City Center Mall Food Court</option>
            <option value="mall-1">Phoenix Marketcity Food Hub</option>
            <option value="mall-dlf">DLF Promenade Food Atrium</option>
            <option value="mall-ambience">Ambience Mall Food Sphere</option>
          </select>

          <button
            onClick={() => setIsAddOutletOpen(true)}
            className="flex items-center gap-1.5 bg-gradient-to-r from-brand-500 to-amber-500 hover:from-brand-400 hover:to-amber-400 text-white font-black text-xs px-3.5 py-2 rounded-xl shadow-md transition-all hover:scale-105 active:scale-95"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Add Food Outlet</span>
          </button>

          <button
            onClick={() => setIsAddMallOpen(true)}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs px-3.5 py-2 rounded-xl border border-slate-700 transition-colors"
          >
            <Building2 className="w-3.5 h-3.5 text-blue-400" />
            <span>Onboard Mall</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-2xl text-xs font-black transition-all ${activeTab === 'overview' ? 'bg-slate-950 text-white shadow-md' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
        >
          Overview & Telemetry
        </button>
        <button
          onClick={() => setActiveTab('qr')}
          className={`px-4 py-2 rounded-2xl text-xs font-black transition-all flex items-center gap-1.5 ${activeTab === 'qr' ? 'bg-brand-500 text-white shadow-md' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
        >
          <QrCode className="w-3.5 h-3.5" />
          <span>Printable Table Standees & QR</span>
        </button>
        <button
          onClick={() => setActiveTab('heatmap')}
          className={`px-4 py-2 rounded-2xl text-xs font-black transition-all ${activeTab === 'heatmap' ? 'bg-slate-950 text-white shadow-md' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
        >
          Floor Heatmap
        </button>
        <button
          onClick={() => setActiveTab('ai')}
          className={`px-4 py-2 rounded-2xl text-xs font-black transition-all flex items-center gap-1.5 ${activeTab === 'ai' ? 'bg-slate-950 text-white shadow-md' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>AI Demand Forecast</span>
        </button>
      </div>

      {/* B2B SaaS Header & Live Crowd Indicator (Features 8 & 9) */}
      <div className="bg-[#2A2521] text-white rounded-3xl p-6 sm:p-7 border border-[#3E362F] shadow-soft space-y-4 text-left">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#F95721] text-white flex items-center justify-center font-black">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xl font-black font-display text-white">MallBite Intelligence</h2>
              <p className="text-xs text-[#A89F95]">Centralized real-time telemetry & operational operating system</p>
            </div>
          </div>

          <span className="self-start sm:self-auto bg-emerald-500/20 text-emerald-300 text-xs font-black px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>AI Telemetry Active</span>
          </span>
        </div>

        {/* Feature 9: Crowd Level Gauge */}
        <div className="bg-black/30 rounded-2xl p-4 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-black uppercase tracking-wider text-[#C5BCB2]">
              Live Food Court Crowd Level
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-2xl font-black text-amber-400 font-display">78%</span>
              <span className="bg-rose-500/20 text-rose-300 text-[10px] font-black uppercase px-2 py-0.5 rounded-md border border-rose-500/30">
                Status: BUSY
              </span>
              <span className="text-xs text-slate-300">• Peak expected: <strong>7:00 PM – 8:30 PM</strong></span>
            </div>
          </div>

          <div className="w-full md:w-64 space-y-1">
            <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-amber-400 to-[#F95721] h-full rounded-full" style={{ width: '78%' }} />
            </div>
            <div className="flex justify-between text-[10px] text-[#A89F95] font-bold">
              <span>Low</span>
              <span>Moderate</span>
              <span className="text-amber-300 font-black">Busy (78%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards (Feature 8) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-left">
        <div className="bg-white rounded-3xl p-5 border border-[#EFE8DE] shadow-soft">
          <span className="text-xs font-black text-[#8E857C] uppercase tracking-wider block">Today's Orders</span>
          <div className="text-2xl sm:text-3xl font-black font-display text-[#2A2521] mt-1">1,248</div>
          <span className="text-[11px] font-bold text-emerald-600 mt-1 block">↑ 18.2% vs yesterday</span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-[#EFE8DE] shadow-soft">
          <span className="text-xs font-black text-[#8E857C] uppercase tracking-wider block">Active Customers</span>
          <div className="text-2xl sm:text-3xl font-black font-display text-[#2A2521] mt-1">642</div>
          <span className="text-[11px] font-bold text-blue-600 mt-1 block">Across 36 Food Court Tables</span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-[#EFE8DE] shadow-soft">
          <span className="text-xs font-black text-[#8E857C] uppercase tracking-wider block">Food Court Revenue</span>
          <div className="text-2xl sm:text-3xl font-black font-display text-[#2A2521] mt-1">₹2.84L</div>
          <span className="text-[11px] font-bold text-[#F95721] mt-1 block">Avg Order: ₹437</span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-[#EFE8DE] shadow-soft">
          <span className="text-xs font-black text-[#8E857C] uppercase tracking-wider block">Average Wait Time</span>
          <div className="text-2xl sm:text-3xl font-black font-display text-[#2A2521] mt-1">11 min</div>
          <span className="text-[11px] font-bold text-emerald-600 mt-1 block">Within 15m SLA target</span>
        </div>
      </div>

      {/* Tab: Overview & Hourly Chart + Live Queues Table */}
      {activeTab === 'overview' && (
        <div className="space-y-6 text-left">
          
          {/* Live Outlet Queue Table (Feature 8) */}
          <div className="bg-white rounded-3xl p-6 border border-[#EFE8DE] shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-black font-display text-base text-[#2A2521]">
                  Live Food Court — Outlet Queues & Preparation Telemetry
                </h3>
                <p className="text-xs text-[#8E857C] font-medium">
                  Real-time algorithmic wait estimation: <code>(Current Queue × Avg Prep) / Active Staff</code>
                </p>
              </div>
              <span className="text-xs font-bold text-[#4E8752] bg-[#EEF6EF] px-3 py-1 rounded-full border border-[#D5EAD7]">
                6 Connected Counters
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-[#EFE8DE] text-[#8E857C] font-black uppercase text-[10px]">
                    <th className="pb-3">Outlet Name</th>
                    <th className="pb-3">Counter</th>
                    <th className="pb-3">Active Orders</th>
                    <th className="pb-3">Staff Active</th>
                    <th className="pb-3">Estimated Wait</th>
                    <th className="pb-3">Queue Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#FAF4EB]">
                  {[
                    { name: 'Pizza Hub', counter: 'FC-02', orders: 23, staff: 3, wait: '18 min', status: 'High', color: '#EF4444' },
                    { name: 'South Kitchen', counter: 'FC-03', orders: 8, staff: 3, wait: '7 min', status: 'Low', color: '#10B981' },
                    { name: 'Food Corner', counter: 'FC-04', orders: 14, staff: 3, wait: '9 min', status: 'Medium', color: '#F59E0B' },
                    { name: 'Juice Bar', counter: 'FC-01', orders: 4, staff: 2, wait: '4 min', status: 'Low', color: '#10B981' },
                    { name: 'Spice Route', counter: 'FC-05', orders: 11, staff: 4, wait: '14 min', status: 'Medium', color: '#F59E0B' },
                    { name: 'Dessert Lab', counter: 'FC-06', orders: 5, staff: 2, wait: '7 min', status: 'Low', color: '#10B981' }
                  ].map((outlet, idx) => (
                    <tr key={idx} className="hover:bg-[#FAF7F2] font-semibold text-[#2A2521]">
                      <td className="py-3 font-black text-[#2A2521] font-display">{outlet.name}</td>
                      <td className="py-3 text-[#6F665D] font-mono">{outlet.counter}</td>
                      <td className="py-3 font-bold">{outlet.orders} orders</td>
                      <td className="py-3 text-[#6F665D]">{outlet.staff} staff</td>
                      <td className="py-3 font-bold">{outlet.wait}</td>
                      <td className="py-3">
                        <span 
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-black"
                          style={{ 
                            backgroundColor: `${outlet.color}15`, 
                            color: outlet.color, 
                            border: `1px solid ${outlet.color}30` 
                          }}
                        >
                          ● {outlet.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Feature 12: Lightweight Inventory Signals */}
          <div className="bg-[#FFF8F2] rounded-3xl p-6 border border-[#F6DEC9] shadow-soft space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#F95721]" />
                <h3 className="font-black font-display text-base text-[#2A2521]">
                  Inventory Signals & Predictive Warnings
                </h3>
              </div>
              <span className="text-[10px] bg-white px-2.5 py-0.5 rounded-md font-bold text-[#8E857C] border border-[#F6DEC9]">
                Synced with Dinner Rush Forecast
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="bg-white p-3.5 rounded-2xl border border-[#F6DEC9]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-black text-[#2A2521]">⚠️ Fresh Paneer</span>
                  <span className="text-[10px] bg-rose-100 text-rose-700 font-black px-1.5 py-0.2 rounded">Low Stock</span>
                </div>
                <p className="text-[11px] text-[#6F665D]">
                  Food Corner & Spice Route demand high. Estimated exhaustion in 45 mins.
                </p>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-[#F6DEC9]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-black text-[#2A2521]">⚠️ Pizza Base Dough</span>
                  <span className="text-[10px] bg-amber-100 text-amber-700 font-black px-1.5 py-0.2 rounded">Warning</span>
                </div>
                <p className="text-[11px] text-[#6F665D]">
                  Expected to run low during 7:30 PM peak. Recommended: Pre-stretch 30 doughs.
                </p>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-[#D5EAD7]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-black text-[#2A2521]">✓ Dosa Batter & Dairy</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-700 font-black px-1.5 py-0.2 rounded">Healthy</span>
                </div>
                <p className="text-[11px] text-[#6F665D]">
                  South Kitchen & Juice Bar buffers optimal for expected customer volume.
                </p>
              </div>
            </div>
          </div>

          {/* Orders Per Hour Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-[#EFE8DE] shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-black font-display text-base text-[#2A2521]">Orders Per Hour</h3>
                  <p className="text-xs text-[#8E857C] font-medium">Telemetry across all connected restaurant counters</p>
                </div>
                <span className="text-xs font-black text-[#F95721] bg-[#FFF2EB] px-3 py-1 rounded-full border border-[#F6DEC9]">
                  Peak Rush: 7:00 PM – 8:30 PM
                </span>
              </div>

              <div className="h-64 sm:h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analytics.ordersPerHour}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="hour" stroke="#94a3b8" fontSize={11} />
                    <YAxis stroke="#94a3b8" fontSize={11} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#2a2521', borderRadius: '16px', color: '#fff', border: 'none', fontSize: '12px' }}
                    />
                    <Bar dataKey="orders" fill="#F95721" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Revenue Split Breakdown */}
            <div className="bg-white rounded-3xl p-6 border border-[#EFE8DE] shadow-soft flex flex-col justify-between">
              <div>
                <h3 className="font-black font-display text-base text-[#2A2521] mb-1">Mall Commission Split</h3>
                <p className="text-xs text-[#8E857C] font-medium mb-4">Automated payouts & food court billing</p>
                
                <div className="space-y-3">
                  <div className="p-3.5 bg-[#FAF7F2] rounded-2xl border border-[#EFE8DE] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#8E857C] font-black uppercase tracking-wider block">Mall Platform Fee (8.5%)</span>
                      <span className="text-sm font-black text-[#2A2521]">₹24,140</span>
                    </div>
                    <span className="bg-emerald-100 text-emerald-700 text-xs font-black px-2.5 py-1 rounded-xl">Settled</span>
                  </div>

                  <div className="p-3.5 bg-[#FAF7F2] rounded-2xl border border-[#EFE8DE] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#8E857C] font-black uppercase tracking-wider block">Restaurant Outlets Share (91.5%)</span>
                      <span className="text-sm font-black text-[#2A2521]">₹2,59,860</span>
                    </div>
                    <span className="bg-blue-100 text-blue-700 text-xs font-black px-2.5 py-1 rounded-xl">Dispatched</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => addNotification("Export Report", "Financial settlement CSV downloaded.", "success")}
                className="mt-6 w-full flex items-center justify-center gap-2 bg-[#2A2521] hover:bg-black text-white font-black text-xs py-3 rounded-2xl transition-all"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                <span>Export Daily Payout Settlement</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Table QR Standee & Sticker Maker (Print-Ready for City Mall) */}
      {activeTab === 'qr' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-black font-display text-xl text-slate-950">
                Food Court Table QR Standee & Sticker Maker
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Generate high-resolution printable table standees for <strong>{currentMall.name}</strong>. Customers scan once to order from all food outlets.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setBatchMode(!batchMode)}
                className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all ${batchMode ? 'bg-brand-500 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
              >
                {batchMode ? 'Batch Mode (Multiple Tables)' : 'Single Table Mode'}
              </button>
              <button
                onClick={handlePrintQR}
                className="flex items-center gap-1.5 bg-slate-950 hover:bg-slate-900 text-white font-black text-xs px-4 py-2 rounded-xl shadow-md transition-all"
              >
                <Printer className="w-4 h-4 text-amber-400" />
                <span>Print Standees (A4)</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start bg-slate-50 p-6 rounded-3xl border border-slate-200">
            {/* Form Settings */}
            <div className="space-y-4 text-xs font-bold">
              <div>
                <label className="block text-slate-500 uppercase tracking-wider mb-1">Shopping Mall</label>
                <div className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 font-extrabold flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-brand-500" />
                  <span>{currentMall.name}</span>
                </div>
              </div>

              {!batchMode ? (
                <div>
                  <label className="block text-slate-500 uppercase tracking-wider mb-1">Table Number</label>
                  <input
                    type="text"
                    value={newTableNum}
                    onChange={(e) => setNewTableNum(e.target.value.toUpperCase())}
                    placeholder="E.g. A-12, B-05, C-10..."
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 font-black focus:outline-none focus:border-brand-500"
                  />
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-slate-500 uppercase tracking-wider mb-1">Prefix</label>
                    <input
                      type="text"
                      value={batchPrefix}
                      onChange={(e) => setBatchPrefix(e.target.value.toUpperCase())}
                      className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-2 text-xs text-slate-900 font-black focus:outline-none focus:border-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 uppercase tracking-wider mb-1">From #</label>
                    <input
                      type="number"
                      value={batchStart}
                      onChange={(e) => setBatchStart(Number(e.target.value))}
                      className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-2 text-xs text-slate-900 font-black focus:outline-none focus:border-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 uppercase tracking-wider mb-1">To #</label>
                    <input
                      type="number"
                      value={batchEnd}
                      onChange={(e) => setBatchEnd(Number(e.target.value))}
                      className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-2 text-xs text-slate-900 font-black focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-slate-500 uppercase tracking-wider mb-1">Zone Label</label>
                <input
                  type="text"
                  value={newZone}
                  onChange={(e) => setNewZone(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-bold focus:outline-none focus:border-brand-500"
                />
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

              <div className="pt-2">
                <button
                  onClick={handlePrintQR}
                  className="w-full bg-gradient-to-r from-brand-500 to-amber-500 hover:from-brand-600 hover:to-amber-600 text-white font-black py-3 px-4 rounded-2xl shadow-md flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Table Standee Cards</span>
                </button>
              </div>
            </div>

            {/* Live Standee Preview (A4 Card Format) */}
            <div className="lg:col-span-2 flex items-center justify-center p-4">
              <div className="w-full max-w-sm bg-white rounded-3xl p-6 border-4 border-slate-950 shadow-elevated text-center flex flex-col items-center relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-3 bg-gradient-to-r from-brand-500 via-orange-500 to-amber-500"></div>

                <div className="flex items-center gap-1.5 mt-2 mb-1">
                  <div className="w-6 h-6 rounded-lg bg-brand-500 flex items-center justify-center text-white font-black text-xs">
                    M
                  </div>
                  <span className="text-sm font-black font-display text-slate-950 tracking-tight">
                    MALL<span className="text-brand-500">BITE</span>
                  </span>
                </div>

                <h4 className="text-base font-black text-slate-900 font-display">
                  {currentMall.name}
                </h4>
                <p className="text-[10px] text-slate-400 font-bold mb-3">{newZone} • {newFloor}</p>

                {/* Scannable SVG QR Code */}
                <div className="p-3 bg-white rounded-2xl shadow-md border-2 border-slate-200 inline-block">
                  <QRCodeSVG
                    value={`${currentOrigin}/?mall=${currentMall.id}&table=${newTableNum}`}
                    size={160}
                    level="H"
                    includeMargin={false}
                  />
                </div>

                {/* Big Table Pill */}
                <div className="mt-4 bg-slate-950 text-white rounded-2xl px-6 py-2 font-black font-display text-lg tracking-wider shadow-sm">
                  TABLE {newTableNum}
                </div>

                {/* 3 Step Instruction Guide on Standee */}
                <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-3 gap-1 text-[9px] font-bold text-slate-600 text-center w-full">
                  <div>
                    <span className="block font-black text-brand-600">1. SCAN QR</span>
                    <span>No App Needed</span>
                  </div>
                  <div>
                    <span className="block font-black text-brand-600">2. MULTI-ORDER</span>
                    <span>Pick any outlet</span>
                  </div>
                  <div>
                    <span className="block font-black text-brand-600">3. TABLE DROP</span>
                    <span>Direct delivery</span>
                  </div>
                </div>
              </div>

              {/* Standee QR Actions & Live Test */}
              <div className="w-full max-w-sm mt-4 p-3.5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2.5">
                <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center justify-between">
                  <span>Encoded QR URL:</span>
                  <span className="text-emerald-600 font-bold">Active & Scannable</span>
                </div>
                <div className="text-[11px] font-mono font-bold text-slate-700 bg-slate-50 p-2 rounded-xl border border-slate-200 truncate">
                  {`${currentOrigin}/?mall=${currentMall.id}&table=${newTableNum}`}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      switchTable(newTableNum, currentMall.id);
                      addNotification("Simulated Scan Success", `Switched to Table ${newTableNum} at ${currentMall.name}`, "success");
                    }}
                    className="flex items-center justify-center gap-1.5 bg-brand-50 hover:bg-brand-100 text-brand-700 font-extrabold text-xs py-2 px-3 rounded-xl border border-brand-200 transition-all active:scale-95"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Test Table Scan</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(`${currentOrigin}/?mall=${currentMall.id}&table=${newTableNum}`);
                      addNotification("URL Copied", "Direct table URL copied to clipboard", "info");
                    }}
                    className="flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-2 px-3 rounded-xl border border-slate-200 transition-all active:scale-95"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy QR Link</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Floor Heatmap */}
      {activeTab === 'heatmap' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-black font-display text-lg text-slate-950">Food Court Seating Zone Heatmap</h3>
              <p className="text-xs text-slate-500 font-medium">Live traffic density & revenue generation by mall zone in {currentMall.name}</p>
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
                className="p-5 rounded-3xl border transition-all flex flex-col justify-between shadow-sm hover:shadow-md"
                style={{ borderColor: zone.color, backgroundColor: `${zone.color}0D` }}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-black text-sm text-slate-950 font-display">{zone.zoneId}</h4>
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
                    <span className="text-[10px] text-slate-400 uppercase font-black block">Active Tables</span>
                    <span className="text-sm font-black text-slate-900">{zone.activeCustomers} seated</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-black block">Orders Today</span>
                    <span className="text-sm font-black text-slate-900">{zone.ordersCount}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-black block">Revenue</span>
                    <span className="text-sm font-black text-slate-900">{zone.revenue}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: AI Demand Forecasting */}
      {activeTab === 'ai' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-500 to-amber-400 text-white flex items-center justify-center shadow-md shadow-brand-500/30">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-black font-display text-xl text-slate-950">AI Food Court Demand & Staffing Forecast</h3>
              <p className="text-xs text-slate-500 font-medium">Predictive machine intelligence for {currentMall.name}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-brand-50/80 rounded-3xl p-6 border border-brand-200 space-y-3">
              <div className="flex items-center gap-2 text-brand-800 font-black text-sm">
                <Clock className="w-4 h-4 text-brand-600" />
                <span>Upcoming Peak Rush Window</span>
              </div>
              <div className="text-3xl font-black font-display text-slate-950">
                {analytics.aiDemandForecast.peakWindow}
              </div>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Projected multi-store order volume: <strong className="text-brand-700 font-bold">{analytics.aiDemandForecast.expectedOrders}</strong> across food court tables.
              </p>
            </div>

            <div className="bg-slate-950 text-white rounded-3xl p-6 shadow-md space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-black text-sm">
                <Zap className="w-4 h-4" />
                <span>AI Recommended Staffing</span>
              </div>
              <div className="text-lg font-black font-display text-white">
                Increase Active Runners by +{analytics.aiDemandForecast.recommendedStaffIncrease}
              </div>
              <p className="text-xs text-slate-300 font-medium">
                Maintains runner pickup speed and ensures table delivery SLA remains strictly under 12 minutes.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Onboard Food Outlet */}
      {isAddOutletOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-elevated border border-slate-100 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black font-display text-lg text-slate-950">
                Onboard New Food Court Outlet
              </h3>
              <button 
                onClick={() => setIsAddOutletOpen(false)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateOutlet} className="space-y-3 text-xs font-bold">
              <div>
                <label className="block text-slate-500 uppercase tracking-wider mb-1">Restaurant / Brand Name</label>
                <input
                  type="text"
                  required
                  value={outletForm.name}
                  onChange={(e) => setOutletForm({ ...outletForm, name: e.target.value })}
                  placeholder="E.g. Taco Fiesta, Dosa Express, Subway..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 font-bold focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-500 uppercase tracking-wider mb-1">Counter Number</label>
                  <input
                    type="text"
                    required
                    value={outletForm.counterNumber}
                    onChange={(e) => setOutletForm({ ...outletForm, counterNumber: e.target.value })}
                    placeholder="FC-07"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-bold focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 uppercase tracking-wider mb-1">Cuisine / Category</label>
                  <input
                    type="text"
                    value={outletForm.category}
                    onChange={(e) => setOutletForm({ ...outletForm, category: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-bold focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-500 uppercase tracking-wider mb-1">Short Tagline</label>
                <input
                  type="text"
                  value={outletForm.tagline}
                  onChange={(e) => setOutletForm({ ...outletForm, tagline: e.target.value })}
                  placeholder="Authentic tacos & crispy quesadillas"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-bold focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isVeg"
                  checked={outletForm.isVegOnly}
                  onChange={(e) => setOutletForm({ ...outletForm, isVegOnly: e.target.checked })}
                  className="rounded border-slate-300 text-brand-500 focus:ring-brand-500"
                />
                <label htmlFor="isVeg" className="text-slate-700 font-bold text-xs">
                  Pure Vegetarian Outlet
                </label>
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddOutletOpen(false)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-brand-500 hover:bg-brand-600 text-white font-black py-2.5 rounded-xl shadow-md"
                >
                  Add to Food Court
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Onboard New Mall */}
      {isAddMallOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-elevated border border-slate-100 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black font-display text-lg text-slate-950">
                Onboard New Shopping Mall
              </h3>
              <button 
                onClick={() => setIsAddMallOpen(false)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateMall} className="space-y-3 text-xs font-bold">
              <div>
                <label className="block text-slate-500 uppercase tracking-wider mb-1">Mall Name</label>
                <input
                  type="text"
                  required
                  value={mallForm.name}
                  onChange={(e) => setMallForm({ ...mallForm, name: e.target.value })}
                  placeholder="E.g. City Mall Food Court, Lulu Mall..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 font-bold focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-500 uppercase tracking-wider mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={mallForm.city}
                    onChange={(e) => setMallForm({ ...mallForm, city: e.target.value })}
                    placeholder="Delhi, Mumbai, Bengaluru..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-bold focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 uppercase tracking-wider mb-1">Total Tables</label>
                  <input
                    type="number"
                    value={mallForm.totalTables}
                    onChange={(e) => setMallForm({ ...mallForm, totalTables: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-bold focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-500 uppercase tracking-wider mb-1">Floor & Location</label>
                <input
                  type="text"
                  value={mallForm.location}
                  onChange={(e) => setMallForm({ ...mallForm, location: e.target.value })}
                  placeholder="Level 3 Central Food Atrium"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-bold focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddMallOpen(false)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-slate-950 hover:bg-slate-900 text-white font-black py-2.5 rounded-xl shadow-md"
                >
                  Launch Mall OS
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
