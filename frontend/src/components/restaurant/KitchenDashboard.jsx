import React, { useState, useEffect } from 'react';
import { 
  Store, 
  Clock, 
  CheckCircle2, 
  ChefHat, 
  Flame, 
  AlertCircle, 
  TrendingUp, 
  Star, 
  UtensilsCrossed, 
  MapPin,
  RefreshCw,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useMall } from '../../context/MallContext';
import { api } from '../../services/api';

export const KitchenDashboard = () => {
  const { selectedRestaurantId, setSelectedRestaurantId } = useAuth();
  const { restaurants, addNotification } = useMall();

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'menu'
  const [restaurantData, setRestaurantData] = useState(null);
  const [allOrders, setAllOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentRestaurant = restaurants.find(r => r.id === selectedRestaurantId) || restaurants[0];

  const fetchKitchenData = async () => {
    if (!currentRestaurant) return;
    try {
      const [restRes, ordersRes, menuRes] = await Promise.all([
        api.getRestaurantById(currentRestaurant.id),
        api.getOrders(),
        api.getMenu({ restaurantId: currentRestaurant.id })
      ]);
      if (restRes.success) setRestaurantData(restRes.data);
      if (ordersRes.success) setAllOrders(ordersRes.data);
      if (menuRes.success) setMenuItems(menuRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKitchenData();
    const interval = setInterval(fetchKitchenData, 3000);
    return () => clearInterval(interval);
  }, [selectedRestaurantId]);

  // Extract sub-orders belonging to this specific restaurant
  const kitchenSubOrders = [];
  allOrders.forEach(master => {
    if (master.subOrders) {
      master.subOrders.forEach(sub => {
        if (sub.restaurantId === selectedRestaurantId || (currentRestaurant && sub.restaurantName === currentRestaurant.name)) {
          kitchenSubOrders.push({
            ...sub,
            masterId: master.id,
            tableNumber: master.tableNumber,
            tableName: master.tableName,
            createdAt: master.createdAt,
            paymentStatus: master.paymentStatus
          });
        }
      });
    }
  });

  const handleUpdateStatus = async (subOrderId, newStatus) => {
    try {
      const res = await api.updateSubOrderStatus(subOrderId, newStatus);
      if (res.success) {
        addNotification("Kitchen Status Updated", `Order #${subOrderId} marked as ${newStatus}`, "success");
        fetchKitchenData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleStock = async (itemId, currentAvailability) => {
    try {
      const res = await api.toggleItemAvailability(itemId, !currentAvailability);
      if (res.success) {
        setMenuItems(prev => prev.map(it => it.id === itemId ? { ...it, isAvailable: !currentAvailability } : it));
        addNotification("Stock Updated", `Item is now ${!currentAvailability ? 'In Stock' : 'Out of Stock'}`, "info");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20 animate-in fade-in duration-200">
      
      {/* Top Header & Restaurant Switcher Bar */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-black text-xl shadow-md shadow-amber-500/25">
            <ChefHat className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                {currentRestaurant?.name || "Kitchen Admin"}
              </h1>
              <span className="bg-emerald-100 text-emerald-800 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full">
                Live Open
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Food Court Counter: <strong>{currentRestaurant?.counterNumber}</strong> • Real-time kitchen order dispatch
            </p>
          </div>
        </div>

        {/* Outlet Switcher */}
        <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1">
          <span className="text-xs font-bold text-slate-400 shrink-0">Switch Outlet:</span>
          {restaurants.map((r) => (
            <button
              key={r.id}
              onClick={() => setSelectedRestaurantId(r.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${selectedRestaurantId === r.id ? 'bg-slate-900 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
            >
              {r.name}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards (Matches PRD Section 13) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Today's Orders</span>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            {currentRestaurant?.todayOrders || 128}
          </div>
          <span className="text-[11px] font-bold text-emerald-600 mt-1 block">↑ 14% vs yesterday</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Today's Revenue</span>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            ₹{(currentRestaurant?.todayRevenue || 42850).toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] font-bold text-emerald-600 mt-1 block">Paid & Verified</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Active Kitchen Queue</span>
          <div className="text-2xl sm:text-3xl font-black text-amber-500 mt-1">
            {kitchenSubOrders.filter(o => o.status !== "Delivered").length}
          </div>
          <span className="text-[11px] font-bold text-slate-500 mt-1 block">Live in preparation</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Average Rating</span>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 flex items-center gap-1">
            <span>{currentRestaurant?.rating || 4.6}</span>
            <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
          </div>
          <span className="text-[11px] font-bold text-slate-500 mt-1 block">{currentRestaurant?.reviewsCount || 840} reviews</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-colors ${activeTab === 'orders' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          Live Kitchen Orders ({kitchenSubOrders.length})
        </button>
        <button
          onClick={() => setActiveTab('menu')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-colors ${activeTab === 'menu' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          Menu & Stock Manager ({menuItems.length})
        </button>
      </div>

      {/* Tab 1: Live Kitchen Orders */}
      {activeTab === 'orders' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Column 1: Incoming & Accepted */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b-2 border-amber-400">
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                <span>Incoming / Accepted</span>
              </h3>
              <span className="text-xs font-bold text-slate-400">
                {kitchenSubOrders.filter(o => o.status === "Accepted").length}
              </span>
            </div>

            {kitchenSubOrders.filter(o => o.status === "Accepted").length === 0 ? (
              <div className="bg-white rounded-2xl p-6 text-center text-xs text-slate-400 border border-slate-200">
                No new incoming tickets.
              </div>
            ) : (
              kitchenSubOrders.filter(o => o.status === "Accepted").map((sub) => (
                <div key={sub.id} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="bg-amber-100 text-amber-900 font-extrabold text-xs px-2.5 py-0.5 rounded-md">
                      Sub-Order #{sub.id}
                    </span>
                    <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-md">
                      Table {sub.tableNumber}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs text-slate-800 font-semibold">
                    {sub.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span>{it.quantity} × {it.name}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => handleUpdateStatus(sub.id, "Preparing")}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white font-black text-xs py-2 rounded-xl shadow-sm transition-transform active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <Flame className="w-3.5 h-3.5" />
                    <span>Start Cooking</span>
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Column 2: In Preparation */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b-2 border-blue-500">
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
                <span>In Preparation (Cooking)</span>
              </h3>
              <span className="text-xs font-bold text-slate-400">
                {kitchenSubOrders.filter(o => o.status === "Preparing").length}
              </span>
            </div>

            {kitchenSubOrders.filter(o => o.status === "Preparing").length === 0 ? (
              <div className="bg-white rounded-2xl p-6 text-center text-xs text-slate-400 border border-slate-200">
                No dishes currently in preparation.
              </div>
            ) : (
              kitchenSubOrders.filter(o => o.status === "Preparing").map((sub) => (
                <div key={sub.id} className="bg-white rounded-2xl p-4 border border-blue-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="bg-blue-100 text-blue-900 font-extrabold text-xs px-2.5 py-0.5 rounded-md">
                      Sub-Order #{sub.id}
                    </span>
                    <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-md">
                      Table {sub.tableNumber}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs text-slate-800 font-semibold">
                    {sub.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span>{it.quantity} × {it.name}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => handleUpdateStatus(sub.id, "Ready for Pickup")}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black text-xs py-2 rounded-xl shadow-sm transition-transform active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mark Ready for Pickup</span>
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Column 3: Ready for Pickup / Runner Assigned */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b-2 border-emerald-500">
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span>Ready at Counter / Picked Up</span>
              </h3>
              <span className="text-xs font-bold text-slate-400">
                {kitchenSubOrders.filter(o => o.status === "Ready for Pickup" || o.status === "Picked Up" || o.status === "Delivered").length}
              </span>
            </div>

            {kitchenSubOrders.filter(o => o.status === "Ready for Pickup" || o.status === "Picked Up" || o.status === "Delivered").map((sub) => (
              <div key={sub.id} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-2 opacity-90">
                <div className="flex items-center justify-between">
                  <span className="bg-emerald-100 text-emerald-900 font-extrabold text-xs px-2.5 py-0.5 rounded-md">
                    #{sub.id} • {sub.status}
                  </span>
                  <span className="text-xs font-bold text-slate-700">Table {sub.tableNumber}</span>
                </div>
                <div className="text-xs text-slate-500">
                  {sub.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* Tab 2: Menu & Stock Manager */}
      {activeTab === 'menu' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft">
          <h3 className="font-extrabold text-base text-slate-900 mb-4">
            Menu Item Availability ({currentRestaurant?.name})
          </h3>

          <div className="divide-y divide-slate-100">
            {menuItems.map((it) => (
              <div key={it.id} className="py-3.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                    <img src={it.image} alt={it.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs sm:text-sm text-slate-900">{it.name}</h4>
                    <span className="text-xs font-bold text-slate-500">₹{it.price} • {it.category}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`text-xs font-bold ${it.isAvailable ? 'text-emerald-600' : 'text-rose-500'}`}>
                    {it.isAvailable ? 'In Stock' : 'Out of Stock'}
                  </span>
                  <button
                    onClick={() => handleToggleStock(it.id, it.isAvailable)}
                    className={`p-1 rounded-xl transition-colors ${it.isAvailable ? 'text-emerald-600' : 'text-slate-400'}`}
                  >
                    {it.isAvailable ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
