import React, { useState, useEffect } from 'react';
import { Clock, Store, MapPin, ChevronRight, CheckCircle2, RotateCcw, Star } from 'lucide-react';
import { api } from '../../services/api';
import { useMall } from '../../context/MallContext';

export const OrderHistory = ({ onSelectOrder }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.getOrders();
        if (res.success) {
          setOrders(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="max-w-3xl mx-auto space-y-4 pb-20 animate-in fade-in duration-200">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">Your Food Court Orders</h2>
          <p className="text-xs text-slate-500 font-medium">History of unified multi-outlet orders</p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-400 text-xs">Loading past orders...</div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-3xl p-8 text-center border border-slate-200 text-slate-500 text-xs">
          No orders found yet.
        </div>
      ) : (
        orders.map((ord) => (
          <div
            key={ord.id}
            onClick={() => onSelectOrder && onSelectOrder(ord)}
            className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-soft hover:shadow-md transition-all cursor-pointer space-y-3"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="bg-brand-50 text-brand-700 font-black text-xs px-2.5 py-0.5 rounded-lg border border-brand-200">
                  #{ord.id}
                </span>
                <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  Table {ord.tableNumber}
                </span>
              </div>
              <span className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full ${ord.orderStatus === 'Delivered' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                {ord.orderStatus}
              </span>
            </div>

            {/* Outlets involved */}
            <div className="space-y-1.5">
              {ord.subOrders && ord.subOrders.map((sub) => (
                <div key={sub.id} className="flex items-center justify-between text-xs text-slate-700">
                  <div className="flex items-center gap-1.5 font-bold">
                    <Store className="w-3.5 h-3.5 text-slate-400" />
                    <span>{sub.restaurantName}</span>
                    <span className="text-slate-400 font-normal">({sub.items.map(i => `${i.quantity}x ${i.name}`).join(', ')})</span>
                  </div>
                  <span className="text-slate-500 font-semibold">{sub.status}</span>
                </div>
              ))}
            </div>

            {/* Footer Total */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
              <span className="text-slate-500">Total Paid: <strong className="text-slate-900 text-sm">₹{ord.totalAmount}</strong></span>
              <span className="text-brand-600 flex items-center gap-1">
                <span>View Live Tracker</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
