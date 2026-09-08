import React, { useState, useEffect } from 'react';
import { 
  Bike, 
  MapPin, 
  CheckCircle2, 
  Store, 
  Clock, 
  Phone, 
  Sparkles, 
  Navigation, 
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../../services/api';
import { useMall } from '../../context/MallContext';

export const DeliveryDashboard = () => {
  const { addNotification } = useMall();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const res = await api.getDeliveryTasks();
      if (res.success) {
        setTasks(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    const interval = setInterval(fetchTasks, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleUpdateStatus = async (taskId, newStatus, tableNumber) => {
    try {
      const res = await api.updateDeliveryStatus(taskId, newStatus);
      if (res.success) {
        if (newStatus === "Delivered") {
          confetti({ particleCount: 70, spread: 70 });
          addNotification("Order Delivered! 🎉", `Delivered to Table ${tableNumber}. Customer notified!`, "success");
        } else {
          addNotification("Delivery Updated", `Task marked as ${newStatus}`, "info");
        }
        fetchTasks();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 animate-in fade-in duration-200">
      
      {/* Runner Profile Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-md">
            <Bike className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white">Rohan Verma</h1>
              <span className="bg-emerald-500 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                Active On-Duty
              </span>
            </div>
            <p className="text-xs text-slate-300 font-medium mt-0.5">
              Mall Food Court Runner #1 • Assigned Zone: <strong>North Court (Level 2)</strong>
            </p>
          </div>
        </div>

        <div className="text-left sm:text-right bg-white/10 px-4 py-2 rounded-2xl">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Active Drop Tasks</span>
          <span className="text-xl font-black text-amber-300">
            {tasks.filter(t => t.status !== "Delivered").length} Tables
          </span>
        </div>
      </div>

      {/* Task Stream */}
      <div>
        <h2 className="text-lg font-black text-slate-900 mb-4">Assigned Multi-Outlet Deliveries</h2>

        {loading ? (
          <div className="text-center py-12 text-slate-400 text-xs">Loading delivery assignments...</div>
        ) : tasks.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center border border-slate-200 text-slate-500 text-xs">
            No active delivery tasks. You're ready for new customer orders!
          </div>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => {
              const isDelivered = task.status === "Delivered";

              return (
                <div
                  key={task.id}
                  className={`bg-white rounded-3xl p-5 sm:p-6 border transition-all ${isDelivered ? 'border-slate-200 opacity-75' : 'border-purple-200 shadow-soft ring-1 ring-purple-100'}`}
                >
                  {/* Target Table Destination */}
                  <div className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-100 gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-black text-sm">
                        <MapPin className="w-5 h-5 text-purple-700" />
                      </div>
                      <div>
                        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Target Destination</div>
                        <h3 className="text-base sm:text-lg font-black text-slate-900">
                          Table {task.tableNumber} (North Court, Level 2)
                        </h3>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-xs font-black uppercase ${
                        isDelivered 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : task.status === 'On the Way' 
                          ? 'bg-purple-100 text-purple-800 animate-pulse' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {task.status}
                      </span>
                    </div>
                  </div>

                  {/* Multi-Counter Pickups Checklist (PRD Section 3.D) */}
                  <div className="py-4 space-y-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                      Multi-Outlet Collection Checklist:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {task.pickups.map((pick, idx) => (
                        <div
                          key={idx}
                          className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between text-xs"
                        >
                          <div className="flex items-center gap-2">
                            <Store className="w-4 h-4 text-brand-500" />
                            <div>
                              <span className="font-extrabold text-slate-900">{pick.restaurantName}</span>
                              <div className="text-[10px] text-slate-500">Pick at: {pick.counterNumber}</div>
                            </div>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${pick.isPicked || isDelivered ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'}`}>
                            {pick.isPicked || isDelivered ? '✓ Collected' : 'Pickup Ready'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons for Runner */}
                  {!isDelivered && (
                    <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-2 justify-end">
                      {task.status === "Assigned" && (
                        <button
                          onClick={() => handleUpdateStatus(task.id, "Picked Up", task.tableNumber)}
                          className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-transform active:scale-95"
                        >
                          Mark Picked Up from All Counters
                        </button>
                      )}

                      {task.status === "Picked Up" && (
                        <button
                          onClick={() => handleUpdateStatus(task.id, "On the Way", task.tableNumber)}
                          className="bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-md transition-transform active:scale-95 flex items-center gap-1.5"
                        >
                          <Navigation className="w-3.5 h-3.5" />
                          <span>On the Way to Table {task.tableNumber}</span>
                        </button>
                      )}

                      {task.status === "On the Way" && (
                        <button
                          onClick={() => handleUpdateStatus(task.id, "Delivered", task.tableNumber)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-md transition-transform active:scale-95 flex items-center gap-1.5"
                        >
                          <Check className="w-4 h-4 stroke-[3]" />
                          <span>Delivered to Customer at Table {task.tableNumber}</span>
                        </button>
                      )}
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};
