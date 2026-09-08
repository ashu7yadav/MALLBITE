import React, { useState } from 'react';
import { 
  X, 
  Play, 
  Sparkles, 
  CheckCircle2, 
  ChefHat, 
  Bike, 
  ShoppingBag, 
  MapPin, 
  ArrowRight,
  RotateCcw,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useMall } from '../../context/MallContext';
import { useCart } from '../../context/CartContext';
import { useAuth, ROLES } from '../../context/AuthContext';
import { api } from '../../services/api';

export const DemoSimulatorModal = () => {
  const { isDemoModalOpen, setIsDemoModalOpen, currentTable, activeMasterOrder, setActiveMasterOrder, addNotification } = useMall();
  const { addToCart, clearCart, setIsCartDrawerOpen } = useCart();
  const { setCurrentRole } = useAuth();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunningAuto, setIsRunningAuto] = useState(false);

  if (!isDemoModalOpen) return null;

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // Step 1: Preload multi-restaurant items & create order
  const runStep1_CreateOrder = async () => {
    setCurrentStep(1);
    clearCart();

    const sampleItems = [
      {
        id: "item-101",
        restaurantId: "rest-1",
        restaurantName: "Burger House",
        name: "Classic Veg Crunch Burger",
        price: 149,
        quantity: 1,
        isVeg: true,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80"
      },
      {
        id: "item-201",
        restaurantId: "rest-2",
        restaurantName: "Pizza Corner",
        name: "Farmhouse Veggie Supreme Pizza",
        price: 299,
        quantity: 1,
        isVeg: true,
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80"
      },
      {
        id: "item-401",
        restaurantId: "rest-4",
        restaurantName: "Coffee Culture",
        name: "Signature Iced Cold Coffee",
        price: 129,
        quantity: 1,
        isVeg: true,
        image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=600&auto=format&fit=crop&q=80"
      }
    ];

    try {
      const res = await api.createOrder({
        tableNumber: currentTable.number || "A-24",
        customerName: "Hackathon Judge (Table A-24)",
        customerPhone: "+91 98765 43210",
        items: sampleItems,
        paymentMethod: "UPI (Google Pay Instant)",
        couponCode: "MALLBITE50"
      });

      if (res.success) {
        setActiveMasterOrder(res.data);
        triggerConfetti();
        addNotification(
          "Master Order Placed!",
          `Master Order #${res.data.id} split into 3 kitchen sub-orders for Table ${currentTable.number}`,
          "success"
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Step 2: Kitchens start cooking
  const runStep2_KitchenPreparing = async () => {
    setCurrentStep(2);
    try {
      await api.simulateDemoStep(1);
      addNotification(
        "Kitchens Started Preparing",
        "Burger House, Pizza Corner & Coffee Culture are actively preparing your items!",
        "info"
      );
    } catch (err) {
      console.error(err);
    }
  };

  // Step 3: Kitchens mark ready
  const runStep3_FoodReady = async () => {
    setCurrentStep(3);
    try {
      await api.simulateDemoStep(2);
      addNotification(
        "All Dishes Ready for Pickup",
        "Food counters FC-04, FC-02 & FC-01 have marked dishes ready for runner pickup!",
        "success"
      );
    } catch (err) {
      console.error(err);
    }
  };

  // Step 4: Runner picks up
  const runStep4_RunnerPickup = async () => {
    setCurrentStep(4);
    try {
      await api.simulateDemoStep(3);
      addNotification(
        "Runner Picked Up from All Counters",
        "Rohan Verma (Runner #1) collected all 3 orders and is heading to your table.",
        "info"
      );
    } catch (err) {
      console.error(err);
    }
  };

  // Step 5: Delivered to table
  const runStep5_Delivered = async () => {
    setCurrentStep(5);
    try {
      await api.simulateDemoStep(5);
      triggerConfetti();
      addNotification(
        "🎉 Food Arrived at Table!",
        `All 3 food orders delivered directly to Table ${currentTable.number}! Enjoy your meal!`,
        "success"
      );
    } catch (err) {
      console.error(err);
    }
  };

  // Auto-run complete demo
  const runFullAutoDemo = async () => {
    setIsRunningAuto(true);
    await runStep1_CreateOrder();
    await new Promise(r => setTimeout(r, 2500));
    await runStep2_KitchenPreparing();
    await new Promise(r => setTimeout(r, 2500));
    await runStep3_FoodReady();
    await new Promise(r => setTimeout(r, 2500));
    await runStep4_RunnerPickup();
    await new Promise(r => setTimeout(r, 2500));
    await runStep5_Delivered();
    setIsRunningAuto(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 relative">
          <button 
            onClick={() => setIsDemoModalOpen(false)}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-brand-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Zap className="w-4 h-4 fill-brand-400" />
            Hackathon Live Evaluation Simulator
          </div>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            MALLBITE End-to-End Live Demo Flow
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Simulate the complete customer journey: 3 Friends at <strong>Table {currentTable.number}</strong> order from 3 different restaurants in 1 cart, pay once, and get food delivered.
          </p>
        </div>

        {/* Simulator Control Area */}
        <div className="p-6 space-y-6">
          
          {/* Quick Auto Play CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-brand-50/80 border border-brand-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-500 text-white flex items-center justify-center shadow-md shadow-brand-500/30">
                <Play className="w-5 h-5 fill-white ml-0.5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">1-Click Full Automation</h4>
                <p className="text-xs text-slate-500">Runs all 5 stages in 12 seconds with live state sync.</p>
              </div>
            </div>
            <button
              onClick={runFullAutoDemo}
              disabled={isRunningAuto}
              className="w-full sm:w-auto bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-brand-500/25 flex items-center justify-center gap-2 transition-transform active:scale-95"
            >
              {isRunningAuto ? (
                <>
                  <RotateCcw className="w-4 h-4 animate-spin" />
                  <span>Simulating Flow...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>Run Auto Demo</span>
                </>
              )}
            </button>
          </div>

          {/* Interactive Step-by-Step Pipeline */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Or Trigger Individual Steps Manually:
            </h4>

            {/* Step 1 */}
            <div className={`p-3.5 rounded-xl border transition-all flex items-center justify-between ${currentStep >= 1 ? 'bg-emerald-50/60 border-emerald-300' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${currentStep >= 1 ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-600'}`}>
                  1
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Multi-Store Cart Checkout</div>
                  <div className="text-[11px] text-slate-500">Burger House + Pizza Corner + Coffee Culture at Table {currentTable.number}</div>
                </div>
              </div>
              <button
                onClick={runStep1_CreateOrder}
                className="text-xs font-bold bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 px-3 py-1.5 rounded-lg shadow-sm"
              >
                Trigger Order
              </button>
            </div>

            {/* Step 2 */}
            <div className={`p-3.5 rounded-xl border transition-all flex items-center justify-between ${currentStep >= 2 ? 'bg-emerald-50/60 border-emerald-300' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${currentStep >= 2 ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-600'}`}>
                  2
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Kitchens Start Cooking</div>
                  <div className="text-[11px] text-slate-500">All 3 outlet kitchens receive separate sub-orders (#B782, #P491, #C221)</div>
                </div>
              </div>
              <button
                onClick={runStep2_KitchenPreparing}
                className="text-xs font-bold bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 px-3 py-1.5 rounded-lg shadow-sm"
              >
                Cooking
              </button>
            </div>

            {/* Step 3 */}
            <div className={`p-3.5 rounded-xl border transition-all flex items-center justify-between ${currentStep >= 3 ? 'bg-emerald-50/60 border-emerald-300' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${currentStep >= 3 ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-600'}`}>
                  3
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Food Ready at Counters</div>
                  <div className="text-[11px] text-slate-500">Kitchens mark ready for runner pickup at Counters FC-04, FC-02, FC-01</div>
                </div>
              </div>
              <button
                onClick={runStep3_FoodReady}
                className="text-xs font-bold bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 px-3 py-1.5 rounded-lg shadow-sm"
              >
                Mark Ready
              </button>
            </div>

            {/* Step 4 */}
            <div className={`p-3.5 rounded-xl border transition-all flex items-center justify-between ${currentStep >= 4 ? 'bg-emerald-50/60 border-emerald-300' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${currentStep >= 4 ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-600'}`}>
                  4
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Runner Picked Up from All Counters</div>
                  <div className="text-[11px] text-slate-500">Runner collects from 3 counters and heads to Table {currentTable.number}</div>
                </div>
              </div>
              <button
                onClick={runStep4_RunnerPickup}
                className="text-xs font-bold bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 px-3 py-1.5 rounded-lg shadow-sm"
              >
                Runner Pickup
              </button>
            </div>

            {/* Step 5 */}
            <div className={`p-3.5 rounded-xl border transition-all flex items-center justify-between ${currentStep >= 5 ? 'bg-emerald-50/60 border-emerald-300' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${currentStep >= 5 ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-600'}`}>
                  5
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Delivered to Table {currentTable.number} 🎉</div>
                  <div className="text-[11px] text-slate-500">Customer gets notification & all 3 orders arrive together</div>
                </div>
              </div>
              <button
                onClick={runStep5_Delivered}
                className="text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg shadow-sm"
              >
                Deliver to Table
              </button>
            </div>
          </div>

          {/* Quick Role Switch in Modal */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-semibold text-slate-500">View live screen as:</span>
            <div className="flex items-center gap-1.5">
              <button 
                onClick={() => { setCurrentRole(ROLES.CUSTOMER); setIsDemoModalOpen(false); }}
                className="px-2.5 py-1 text-[11px] font-bold bg-emerald-100 text-emerald-800 rounded-lg hover:bg-emerald-200"
              >
                Customer Tracker
              </button>
              <button 
                onClick={() => { setCurrentRole(ROLES.RESTAURANT); setIsDemoModalOpen(false); }}
                className="px-2.5 py-1 text-[11px] font-bold bg-amber-100 text-amber-800 rounded-lg hover:bg-amber-200"
              >
                Kitchen Admin
              </button>
              <button 
                onClick={() => { setCurrentRole(ROLES.DELIVERY); setIsDemoModalOpen(false); }}
                className="px-2.5 py-1 text-[11px] font-bold bg-purple-100 text-purple-800 rounded-lg hover:bg-purple-200"
              >
                Delivery Runner
              </button>
              <button 
                onClick={() => { setCurrentRole(ROLES.MALL_ADMIN); setIsDemoModalOpen(false); }}
                className="px-2.5 py-1 text-[11px] font-bold bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200"
              >
                Mall Admin
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
