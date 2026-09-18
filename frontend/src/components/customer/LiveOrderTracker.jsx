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
  Award,
  ArrowLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useMall } from '../../context/MallContext';
import { useCart } from '../../context/CartContext';
import { api } from '../../services/api';
import { QueueTimeline } from './QueueTimeline';
import { EcoScoreBadge } from '../common/EcoScoreBadge';
import { queueOptimizer } from '../../services/queueOptimizer';
import { ecoScoreService } from '../../services/ecoScoreService';

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
      
      {/* Top Back Navigation Option */}
      {onBackToHome && (
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs font-black text-[#2A2521] hover:text-[#F95721] bg-white px-4 py-2 rounded-2xl border border-[#EFE8DE] shadow-xs transition-all hover:scale-105 active:scale-95"
        >
          <ArrowLeft className="w-4 h-4 text-[#F95721]" />
          <span>Back to Food Court Home</span>
        </button>
      )}

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

      {/* FEATURE 7: SMART ORDER BATCHING CARD */}
      <div className="bg-gradient-to-br from-[#FFF4EC] via-[#FAF4EB] to-white rounded-3xl p-5 sm:p-6 border border-[#F6DEC9] shadow-xs text-left space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-[#F95721] text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
              Smart Batch #{order.smartBatch?.batchId || "B204"}
            </span>
            <span className="text-xs font-black text-[#2A2521]">
              {order.subOrders ? order.subOrders.length : 3} outlets ➔ 1 delivery
            </span>
          </div>
          <span className="text-xs font-bold text-[#F95721] bg-white px-2.5 py-1 rounded-xl border border-[#F6DEC9]">
            ⏱️ Target Pickup Window: {order.smartBatch?.recommendedPickupWindow || "12 minutes"}
          </span>
        </div>

        <p className="text-xs text-[#6F665D] leading-relaxed">
          Instead of dispatching multiple individual delivery trips, MallBite synchronizes kitchen readiness and consolidates your multi-outlet meal into one optimized runner pickup route.
        </p>

        {/* Pickup Route Visualization */}
        <div className="bg-white p-3.5 rounded-2xl border border-[#F6DEC9] space-y-1.5">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#8E857C] block">
            Optimized Runner Route
          </span>
          <div className="text-xs font-black text-[#2A2521] flex items-center gap-1.5 flex-wrap">
            {order.smartBatch?.optimizedRouteString ? (
              <span>{order.smartBatch.optimizedRouteString}</span>
            ) : (
              <span>Juice Bar (FC-01) ➔ South Kitchen (FC-03) ➔ Pizza Hub (FC-02) ➔ Deliver to Table {order.tableNumber || "A17"}</span>
            )}
          </div>
        </div>
      </div>

      {/* FEATURE 2: SMART QUEUE SYNCHRONIZATION TIMELINE */}
      {(() => {
        const queueData = order.queueOptimization || queueOptimizer.synchronizeSchedule(order.subOrders, []);
        return (
          <QueueTimeline
            schedule={queueData.schedule}
            targetDeliveryMinutes={queueData.targetDeliveryMinutes}
            tableNumber={order.tableNumber || currentTable.number || "A17"}
            timelineSummary={queueData.timelineSummary}
          />
        );
      })()}

      {/* FEATURE 3: ECO SCORE DETAILS */}
      {(() => {
        const eco = order.ecoScore || ecoScoreService.calculate(order.items || [], order.subOrders?.length || 2);
        return (
          <EcoScoreBadge
            ecoScore={eco.score}
            packagingSaved={eco.packagingSaved}
            tripsAvoided={eco.deliveryTripsAvoided}
            explanation={eco.explanation}
          />
        );
      })()}

      {/* Breakdown of Individual Outlet Sub-Orders (Feature 6 & 7) */}
      <div className="text-left">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
            Split Kitchen Orders ({order.subOrders ? order.subOrders.length : 0})
          </h3>
          <span className="text-xs font-bold text-[#F95721] bg-[#FFF2EB] px-2.5 py-0.5 rounded-full border border-[#F6DEC9]">
            Real-time Sub-Order Sync
          </span>
        </div>

        <div className="space-y-3">
          {order.subOrders && order.subOrders.map((sub) => {
            const isReady = sub.status === "Ready for Pickup" || sub.status === "Ready" || sub.status === "Picked Up" || sub.status === "Delivered";
            const isPreparing = sub.status === "Preparing" || isReady;

            return (
              <div
                key={sub.id}
                className="bg-white rounded-2xl border border-[#EFE8DE] p-4 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FFF4EC] text-[#F95721] flex items-center justify-center font-black text-xs border border-[#F6DEC9]">
                      {sub.counterNumber || "FC"}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-sm text-[#2A2521] font-display">{sub.restaurantName}</h4>
                        <span className="text-xs font-bold text-[#8E857C]">#{sub.id}</span>
                      </div>
                      <span className="text-xs text-[#6F665D] font-medium">
                        {sub.items.length} items • Counter {sub.counterNumber} • Est: {sub.estimatedTime || "10m"}
                      </span>
                    </div>
                  </div>

                  {/* Status badge */}
                  <div className="text-right">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-extrabold shadow-xs ${
                      sub.status === "Delivered" 
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                        : isReady 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 animate-pulse' 
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}>
                      {sub.status}
                    </span>
                  </div>
                </div>

                {/* Per-Outlet Step Checkmarks: Order Received ✓ Preparing ✓ Ready ○ */}
                <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-[#EFE8DE] flex items-center justify-between text-[11px] font-extrabold text-[#6F665D]">
                  <span className="text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Order Received</span>
                  </span>
                  <span className="text-[#C5BCB2]">➔</span>
                  <span className={`flex items-center gap-1 ${isPreparing ? 'text-emerald-700' : 'text-[#8E857C]'}`}>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Preparing</span>
                  </span>
                  <span className="text-[#C5BCB2]">➔</span>
                  <span className={`flex items-center gap-1 ${isReady ? 'text-emerald-700' : 'text-[#8E857C]'}`}>
                    <span className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${isReady ? 'border-emerald-700 bg-emerald-700 text-white' : 'border-slate-300'}`}>
                      {isReady ? '✓' : ''}
                    </span>
                    <span>Ready</span>
                  </span>
                </div>

                {/* Sub-order items list */}
                <div className="pt-2 border-t border-[#FAF4EB] text-xs space-y-1.5">
                  {sub.items.map((it, idx) => (
                    <div key={idx} className="flex items-center justify-between text-[#6F665D] font-medium">
                      <span>{it.quantity} × {it.name}</span>
                      <span className="font-bold text-[#2A2521]">₹{it.price * it.quantity}</span>
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
