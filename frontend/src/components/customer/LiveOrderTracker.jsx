import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Bike, 
  Store, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Star, 
  Phone, 
  ShieldCheck, 
  RefreshCw,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useMall } from '../../context/MallContext';
import { useCart } from '../../context/CartContext';
import { api } from '../../services/api';

export const LiveOrderTracker = ({ onBackToHome }) => {
  const { activeMasterOrder, currentTable, refreshData, addNotification } = useMall();
  const [expandedSubOrder, setExpandedSubOrder] = useState(null);
  const [ratingModalOpen, setRatingModalOpen] = useState(false);
  const [ratingStars, setRatingStars] = useState(5);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  if (!activeMasterOrder) {
    return (
      <div className="bg-white rounded-3xl p-8 text-center border border-slate-200/80 shadow-soft max-w-lg mx-auto my-12">
        <Clock className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h3 className="font-extrabold text-base text-slate-800">No Active Order</h3>
        <p className="text-xs text-slate-500 mt-1 mb-5">
          You haven't placed an order yet for Table {currentTable.number}.
        </p>
        <button
          onClick={onBackToHome}
          className="bg-brand-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md"
        >
          Browse Menus
        </button>
      </div>
    );
  }

  const order = activeMasterOrder;
  const isDelivered = order.orderStatus === "Delivered" || order.deliveryStatus === "Delivered";

  // Calculate master progression percentage
  const getProgressPercentage = () => {
    if (isDelivered) return 100;
    if (order.deliveryStatus === "On the Way" || order.orderStatus.includes("Arriving")) return 80;
    if (order.deliveryStatus === "Picked Up" || order.orderStatus.includes("Pickup")) return 60;
    if (order.orderStatus === "Preparing") return 40;
    return 20;
  };

  const submitRating = () => {
    setReviewSubmitted(true);
    confetti({ particleCount: 50, spread: 60 });
    addNotification("Review Submitted ⭐", `Thank you for rating 5 stars!`, "success");
    setTimeout(() => {
      setRatingModalOpen(false);
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20 animate-in fade-in duration-200">
      
      {/* Top Banner with Master Order ID & Table Notice */}
      <div className="bg-slate-900 rounded-3xl p-6 text-white relative overflow-hidden shadow-elevated">
        <div className="absolute right-0 top-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl" />

        <div className="flex flex-wrap items-center justify-between gap-3 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-brand-500 text-white text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-sm">
                Master Order
              </span>
              <span className="text-xs text-slate-400 font-bold">
                #{order.id}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-1">
              {isDelivered ? "All Orders Delivered! 🎉" : "Your food is being prepared 🍔"}
            </h2>
            <div className="flex items-center gap-2 text-xs text-amber-300 font-bold mt-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>Delivering to Table {order.tableNumber || currentTable.number} • Level 2 North Court</span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Est. Arrival</span>
            <span className="text-lg sm:text-xl font-black text-white">{isDelivered ? "Delivered" : order.estimatedDeliveryTime || "12-15 mins"}</span>
          </div>
        </div>

        {/* Live Stepper Bar */}
        <div className="mt-6 pt-6 border-t border-slate-800 relative z-10">
          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden mb-3">
            <div
              className="bg-gradient-to-r from-amber-400 to-brand-500 h-full rounded-full transition-all duration-700 ease-out"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>

          {/* Stepper Labels */}
          <div className="grid grid-cols-4 text-center text-[10px] sm:text-xs font-bold text-slate-400">
            <span className={getProgressPercentage() >= 20 ? 'text-amber-400' : ''}>✓ Order Placed</span>
            <span className={getProgressPercentage() >= 40 ? 'text-amber-400' : ''}>✓ Preparing</span>
            <span className={getProgressPercentage() >= 60 ? 'text-amber-400' : ''}>✓ Runner Pickup</span>
            <span className={isDelivered ? 'text-emerald-400 font-black' : ''}>● Table Delivered</span>
          </div>
        </div>
      </div>

      {/* Delivery Runner Card */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-soft flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center border border-brand-200/60 shadow-sm shrink-0">
            <Bike className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Assigned Mall Runner</div>
            <h4 className="text-sm font-extrabold text-slate-900">{order.deliveryStaff || "Rohan Verma (Runner #1)"}</h4>
            <p className="text-xs text-slate-500 font-medium">
              {isDelivered 
                ? `Delivered all items safely to Table ${order.tableNumber || currentTable.number}` 
                : `Collecting multi-restaurant items across food court counters for Table ${order.tableNumber || currentTable.number}`
              }
            </p>
          </div>
        </div>

        {isDelivered ? (
          <button
            onClick={() => setRatingModalOpen(true)}
            className="bg-amber-100 hover:bg-amber-200 text-amber-900 font-extrabold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 shrink-0 shadow-sm transition-transform active:scale-95"
          >
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>Rate Order</span>
          </button>
        ) : (
          <div className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-xl border border-emerald-200 shrink-0">
            On Track
          </div>
        )}
      </div>

      {/* Breakdown of Individual Outlet Sub-Orders (The Core Innovation!) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
            Split Kitchen Orders ({order.subOrders ? order.subOrders.length : 0})
          </h3>
          <span className="text-xs font-bold text-slate-500">Auto-synchronized in real-time</span>
        </div>

        <div className="space-y-3">
          {order.subOrders && order.subOrders.map((sub) => {
            const isSubReady = sub.status === "Ready for Pickup" || sub.status === "Picked Up" || sub.status === "Delivered";

            return (
              <div
                key={sub.id}
                className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-black text-xs border border-slate-200">
                      {sub.counterNumber || "FC"}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-sm text-slate-900">{sub.restaurantName}</h4>
                        <span className="text-xs font-bold text-slate-400">#{sub.id}</span>
                      </div>
                      <span className="text-xs text-slate-500 font-medium">
                        {sub.items.length} items • Counter {sub.counterNumber}
                      </span>
                    </div>
                  </div>

                  {/* Status badge */}
                  <div className="text-right">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-extrabold shadow-sm ${
                      sub.status === "Delivered" 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : isSubReady 
                        ? 'bg-blue-100 text-blue-800 animate-pulse' 
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {sub.status}
                    </span>
                  </div>
                </div>

                {/* Sub-order items list */}
                <div className="mt-3 pt-3 border-t border-slate-100 text-xs space-y-1.5">
                  {sub.items.map((it, idx) => (
                    <div key={idx} className="flex items-center justify-between text-slate-700 font-medium">
                      <span>{it.quantity} × {it.name}</span>
                      <span className="font-bold text-slate-900">₹{it.price * it.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bill Summary */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm text-xs space-y-2">
        <h4 className="font-extrabold text-sm text-slate-900 pb-2 border-b border-slate-100">Payment & Bill Details</h4>
        <div className="flex justify-between text-slate-600 font-medium">
          <span>Item Total</span>
          <span>₹{order.subtotal}</span>
        </div>
        <div className="flex justify-between text-slate-600 font-medium">
          <span>Convenience Fee & Taxes</span>
          <span>₹{(order.convenienceFee || 10) + (order.gstTaxes || 0)}</span>
        </div>
        {order.discount > 0 && (
          <div className="flex justify-between text-emerald-600 font-bold">
            <span>Coupon Discount</span>
            <span>-₹{order.discount}</span>
          </div>
        )}
        <div className="flex justify-between text-slate-900 font-black text-sm pt-2 border-t border-slate-200">
          <span>Paid via {order.paymentMethod || "UPI"}</span>
          <span>₹{order.totalAmount}</span>
        </div>
      </div>

      {/* Rating Modal */}
      {ratingModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center shadow-2xl animate-in zoom-in-95 duration-150">
            <Award className="w-12 h-12 text-amber-500 mx-auto mb-2" />
            <h3 className="font-black text-lg text-slate-900">Rate Your MallBite Experience</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              How was your multi-outlet meal at Table {order.tableNumber || currentTable.number}?
            </p>

            {/* Stars */}
            <div className="flex justify-center gap-2 mb-5">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  onClick={() => setRatingStars(s)}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <Star className={`w-7 h-7 ${s <= ratingStars ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`} />
                </button>
              ))}
            </div>

            <button
              onClick={submitRating}
              className="w-full bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-xs py-3 rounded-xl shadow-md transition-transform active:scale-95"
            >
              {reviewSubmitted ? "Thank You!" : "Submit Review"}
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
