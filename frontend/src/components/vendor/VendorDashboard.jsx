import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Users, 
  Clock, 
  AlertTriangle, 
  Sparkles, 
  BarChart3, 
  Store, 
  ChefHat, 
  Package, 
  ArrowLeft,
  ArrowRight,
  Flame,
  CheckCircle2,
  Info
} from 'lucide-react';
import { useMall } from '../../context/MallContext';
import { useAuth, ROLES } from '../../context/AuthContext';
import { api } from '../../services/api';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const VendorDashboard = () => {
  const { restaurants, addNotification } = useMall();
  const { setCurrentRole } = useAuth();

  const [selectedOutletId, setSelectedOutletId] = useState(restaurants[0]?.id || "rest-burger");
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);

  const currentOutlet = restaurants.find(r => r.id === selectedOutletId) || restaurants[0] || { name: "Burger House" };

  useEffect(() => {
    const fetchForecast = async () => {
      setLoading(true);
      try {
        const res = await api.getVendorDemandForecast(selectedOutletId);
        if (res && res.success) {
          setForecastData(res.data);
        } else {
          // Fallback forecast matching user prompt
          setForecastData({
            outletId: currentOutlet.id,
            outletName: currentOutlet.name,
            counterNumber: currentOutlet.counterNumber || "FC-04",
            nextHourDemand: { expectedOrders: 42, expectedItems: 87, growthPercentage: 24 },
            popularItems: [
              { name: "Chicken Burger", predictedDemand: 18, price: 179, trend: "+32%" },
              { name: "Paneer Pizza", predictedDemand: 14, price: 199, trend: "+20%" },
              { name: "Veg Noodles", predictedDemand: 11, price: 129, trend: "+15%" },
              { name: "Cold Coffee", predictedDemand: 9, price: 99, trend: "+8%" }
            ],
            queueProjection: { currentQueue: 7, expectedQueueIn30Min: 11, surgeStatus: "SURGE EXPECTED" },
            kitchenCapacity: { currentPercentage: 72, recommendedStaffing: "+1 worker during 7:30 PM–8:30 PM" },
            lowStockAlert: {
              ingredient: "Chicken Patty & Brioche Buns",
              estimatedRemaining: 22,
              predictedDemand: 31,
              alertMessage: "Possible stock shortage in approximately 45 minutes."
            },
            hourlyTrends: [
              { hour: "5 PM", orders: 18, revenue: 4200 },
              { hour: "6 PM", orders: 28, revenue: 6800 },
              { hour: "7 PM", orders: 42, revenue: 10500 },
              { hour: "8 PM (Peak)", orders: 48, revenue: 12400 },
              { hour: "9 PM", orders: 34, revenue: 8600 }
            ],
            aiExplanation: "Demand is predicted to increase because the current order rate is 24% higher than the previous comparable period."
          });
        }
      } catch {
        // Safe fallback
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, [selectedOutletId]);

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20 animate-in fade-in duration-200 text-left">
      
      {/* Top Header & Outlet Switcher */}
      <div className="bg-[#2A2521] text-white rounded-3xl p-6 sm:p-8 shadow-elevated border border-[#3E362F] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <button
            onClick={() => setCurrentRole(ROLES.CUSTOMER)}
            className="inline-flex items-center gap-2 text-xs font-black text-amber-300 hover:text-white mb-3 bg-white/10 hover:bg-white/20 px-3.5 py-1.5 rounded-xl border border-white/15 transition-all hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-brand-400" />
            <span>← Back to Customer Food Court</span>
          </button>
          
          <div className="flex items-center gap-2 text-[#F95721] text-xs font-black uppercase tracking-wider mb-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>AI Demand Prediction & Kitchen Operations OS</span>
          </div>

          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black font-display text-white">
              {currentOutlet.name} Demand Control
            </h1>
            <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-emerald-500/30 uppercase">
              AI Forecast Active
            </span>
          </div>
          <p className="text-xs text-[#A89F95] mt-1 font-medium">
            Explainable telemetry forecasting next-hour rush, kitchen staffing & stock depletion
          </p>
        </div>

        {/* Outlet Switcher */}
        <div className="flex flex-wrap items-center gap-2 bg-white/10 p-1.5 rounded-2xl border border-white/10">
          {restaurants.slice(0, 4).map(r => (
            <button
              key={r.id}
              onClick={() => setSelectedOutletId(r.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${selectedOutletId === r.id ? 'bg-[#F95721] text-white shadow-md' : 'text-slate-300 hover:text-white hover:bg-white/10'}`}
            >
              {r.name}
            </button>
          ))}
        </div>
      </div>

      {forecastData && (
        <>
          {/* Top 4 KPI Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* 1. Next Hour Demand */}
            <div className="bg-white p-5 rounded-3xl border border-[#EFE8DE] shadow-soft space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-[#8E857C]">
                <span className="uppercase tracking-wider">Next-Hour Demand</span>
                <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-md font-black text-[10px]">
                  +{forecastData.nextHourDemand?.growthPercentage}% Surge
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-[#2A2521] font-display">
                  {forecastData.nextHourDemand?.expectedOrders}
                </span>
                <span className="text-xs text-[#8E857C] font-semibold">orders expected</span>
              </div>
              <p className="text-[11px] text-[#6F665D]">
                Projected total volume: <strong>{forecastData.nextHourDemand?.expectedItems} food items</strong>
              </p>
            </div>

            {/* 2. Expected Queue */}
            <div className="bg-white p-5 rounded-3xl border border-[#EFE8DE] shadow-soft space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-[#8E857C]">
                <span className="uppercase tracking-wider">Expected Queue</span>
                <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-md font-black text-[10px]">
                  In 30 Mins
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-amber-600 font-display">
                  {forecastData.queueProjection?.expectedQueueIn30Min}
                </span>
                <span className="text-xs text-[#8E857C] font-semibold">
                  (current: {forecastData.queueProjection?.currentQueue})
                </span>
              </div>
              <p className="text-[11px] text-[#6F665D]">
                Status: <strong className="text-amber-600">{forecastData.queueProjection?.surgeStatus}</strong>
              </p>
            </div>

            {/* 3. Kitchen Capacity */}
            <div className="bg-white p-5 rounded-3xl border border-[#EFE8DE] shadow-soft space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-[#8E857C]">
                <span className="uppercase tracking-wider">Kitchen Capacity</span>
                <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-md font-black text-[10px]">
                  Load Gauge
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-blue-600 font-display">
                  {forecastData.kitchenCapacity?.currentPercentage}%
                </span>
                <span className="text-xs text-[#8E857C] font-semibold">occupied</span>
              </div>
              <p className="text-[11px] text-blue-900 font-bold bg-blue-50 p-1.5 rounded-lg border border-blue-100">
                {forecastData.kitchenCapacity?.recommendedStaffing}
              </p>
            </div>

            {/* 4. Stock Depletion Signal */}
            <div className="bg-white p-5 rounded-3xl border border-[#EFE8DE] shadow-soft space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-[#8E857C]">
                <span className="uppercase tracking-wider">Low Stock Warning</span>
                <span className="bg-rose-100 text-rose-700 px-2 py-0.5 rounded-md font-black text-[10px]">
                  Alert
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-rose-600 font-display">
                  ~45 min
                </span>
                <span className="text-xs text-[#8E857C] font-semibold">to shortage</span>
              </div>
              <p className="text-[11px] text-rose-800 font-semibold truncate" title={forecastData.lowStockAlert?.ingredient}>
                {forecastData.lowStockAlert?.ingredient}
              </p>
            </div>

          </div>

          {/* Feature 4: Low Stock Alert Banner */}
          {forecastData.lowStockAlert && (
            <div className="bg-[#FFF4EC] border border-[#F6DEC9] rounded-3xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-500 text-white flex items-center justify-center font-black shrink-0 shadow-md shadow-rose-500/20">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-black text-[#2A2521] font-display">
                      Low Stock Alert: {forecastData.lowStockAlert.ingredient}
                    </h4>
                    <span className="bg-rose-100 text-rose-800 text-[10px] font-black px-2 py-0.5 rounded-md">
                      Depletion Risk
                    </span>
                  </div>
                  <p className="text-xs text-[#6F665D] mt-0.5">
                    Estimated remaining: <strong>{forecastData.lowStockAlert.estimatedRemaining} units</strong> • Predicted demand: <strong>{forecastData.lowStockAlert.predictedDemand} units</strong>. {forecastData.lowStockAlert.alertMessage}
                  </p>
                </div>
              </div>

              <button
                onClick={() => addNotification("Stock Acknowledged", "Kitchen staff alerted to prepare buffer batches.", "success")}
                className="bg-[#2A2521] hover:bg-black text-white text-xs font-black px-4 py-2.5 rounded-xl transition-all shrink-0 active:scale-95"
              >
                Pre-portion Buffer Now
              </button>
            </div>
          )}

          {/* Charts & Popular Items Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-w-0">
            
            {/* Orders & Demand Trend Chart */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-[#EFE8DE] shadow-soft min-w-0 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-black font-display text-base text-[#2A2521]">
                    Predicted Hourly Order Surge
                  </h3>
                  <p className="text-xs text-[#8E857C] font-medium">
                    Telemetry curve across {currentOutlet.name} counters
                  </p>
                </div>
                <span className="text-xs font-black text-[#F95721] bg-[#FFF2EB] px-3 py-1 rounded-full border border-[#F6DEC9]">
                  Peak Rush: 7:30 PM – 8:30 PM
                </span>
              </div>

              <div className="h-64 sm:h-72 w-full min-w-0">
                <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                  <BarChart data={forecastData.hourlyTrends}>
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

              <div className="p-3 bg-[#FAF7F2] rounded-2xl border border-[#EFE8DE] text-xs text-[#6F665D] flex items-start gap-2">
                <Info className="w-4 h-4 text-[#F95721] shrink-0 mt-0.5" />
                <span>
                  <strong>AI Forecast Explanation:</strong> {forecastData.aiExplanation}
                </span>
              </div>
            </div>

            {/* Popular Items Forecast */}
            <div className="bg-white rounded-3xl p-6 border border-[#EFE8DE] shadow-soft min-w-0 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-black font-display text-base text-[#2A2521]">
                  Top Expected Dishes
                </h3>
                <span className="text-[10px] font-black uppercase text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                  Next 60 Mins
                </span>
              </div>

              <div className="space-y-3">
                {forecastData.popularItems?.map((item, idx) => (
                  <div key={idx} className="p-3.5 bg-[#FAF7F2] rounded-2xl border border-[#EFE8DE] flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-lg bg-[#2A2521] text-white text-[10px] font-black flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className="font-extrabold text-xs text-[#2A2521]">
                          {item.name}
                        </span>
                      </div>
                      <span className="text-[10px] text-emerald-600 font-bold block mt-1">
                        {item.trend}
                      </span>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-black text-[#F95721] font-display">
                        ~{item.predictedDemand} units
                      </div>
                      <span className="text-[10px] text-[#8E857C] font-semibold">
                        ₹{item.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <div className="p-3 bg-emerald-50 text-emerald-900 rounded-2xl border border-emerald-200/80 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-[11px] font-medium">Prepping top 4 items saves ~8 min average queue wait during peak rush.</span>
                </div>
              </div>
            </div>

          </div>
        </>
      )}

    </div>
  );
};
