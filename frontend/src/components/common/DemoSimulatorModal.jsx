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
  Zap,
  TrendingUp,
  AlertTriangle,
  Clock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useMall } from '../../context/MallContext';
import { useCart } from '../../context/CartContext';
import { useAuth, ROLES } from '../../context/AuthContext';
import { api } from '../../services/api';

export const DemoSimulatorModal = () => {
  const { isDemoModalOpen, setIsDemoModalOpen, currentTable, activeMasterOrder, setActiveMasterOrder, addNotification, refreshData } = useMall();
  const { clearCart } = useCart();
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

  // Feature 3 & 15: Create realistic Indian food court multi-store order
  const runStep1_CreateOrder = async () => {
    setCurrentStep(1);
    clearCart();

    const sampleItems = [
      {
        id: "item-p1",
        restaurantId: "rest-pizza",
        restaurantName: "Pizza Hub",
        name: "Farmhouse Veggie Supreme Pizza",
        price: 199,
        quantity: 1,
        isVeg: true,
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80"
      },
      {
        id: "item-s1",
        restaurantId: "rest-south",
        restaurantName: "South Kitchen",
        name: "Crispy Masala Dosa",
        price: 129,
        quantity: 1,
        isVeg: true,
        image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600&auto=format&fit=crop&q=80"
      },
      {
        id: "item-j1",
        restaurantId: "rest-juice",
        restaurantName: "Juice Bar",
        name: "Rich Alphonso Mango Shake",
        price: 89,
        quantity: 1,
        isVeg: true,
        image: "https://images.unsplash.com/photo-1546173159-315724a31696?w=600&auto=format&fit=crop&q=80"
      }
    ];

    try {
      const res = await api.createOrder({
        tableNumber: currentTable.number || "A17",
        customerName: "Hackathon Judge (Table A17)",
        customerPhone: "+91 98765 43210",
        items: sampleItems,
        paymentMethod: "UPI (Verified)",
        couponCode: "MALLBITE50"
      });

      if (res.success) {
        setActiveMasterOrder(res.data);
        triggerConfetti();
        addNotification(
          "Master Order Placed!",
          `Master Order #${res.data.id} split into 3 food outlets for Table ${currentTable.number || 'A17'}`,
          "success"
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const runStep2_KitchenPreparing = async () => {
    setCurrentStep(2);
    try {
      const res = await api.simulateDemoStep(1);
      if (res.success) {
        setActiveMasterOrder(res.order);
        addNotification("Kitchens Fired Up 🔥", "Pizza Hub, South Kitchen & Juice Bar are preparing items", "info");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const runStep3_ReadyForPickup = async () => {
    setCurrentStep(3);
    try {
      const res = await api.simulateDemoStep(2);
      if (res.success) {
        setActiveMasterOrder(res.order);
        addNotification("Food Ready 🔔", "All 3 kitchen tickets ready for batch runner collection", "info");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const runStep4_RunnerPickup = async () => {
    setCurrentStep(4);
    try {
      const res = await api.simulateDemoStep(3);
      if (res.success) {
        setActiveMasterOrder(res.order);
        addNotification("Consolidated Runner Pickup 🚲", "Runner Rohan completed sequential counter pickup route", "info");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const runStep5_Delivered = async () => {
    setCurrentStep(5);
    try {
      const res = await api.simulateDemoStep(5);
      if (res.success) {
        setActiveMasterOrder(res.order);
        triggerConfetti();
        addNotification("Delivered! 🎉", `Consolidated multi-outlet order delivered to Table ${currentTable.number || 'A17'}`, "success");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Simulate Order Surge & Crowd Level Spike
  const handleSimulateSurge = async () => {
    try {
      await api.simulateDemoActivity('spike_orders');
      addNotification("Crowd Surge Simulated 📈", "Orders spiked! Crowd level increased to 88%, Pizza Hub queue reached 28 orders.", "info");
      refreshData();
    } catch (err) {
      console.error(err);
    }
  };

  // Automated 15-second progression
  const runAutoSimulation = async () => {
    setIsRunningAuto(true);
    await runStep1_CreateOrder();
    await new Promise(r => setTimeout(r, 2500));
    await runStep2_KitchenPreparing();
    await new Promise(r => setTimeout(r, 2500));
    await runStep3_ReadyForPickup();
    await new Promise(r => setTimeout(r, 2500));
    await runStep4_RunnerPickup();
    await new Promise(r => setTimeout(r, 2500));
    await runStep5_Delivered();
    setIsRunningAuto(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#FAF7F2] rounded-3xl max-w-xl w-full shadow-2xl border border-[#EFE8DE] overflow-hidden my-auto text-left">
        
        {/* Header with DEMO MODE badge */}
        <div className="bg-[#2A2521] text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F95721] text-white flex items-center justify-center shadow-md">
              <Play className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black font-display text-white">Hackathon Demo Mode</h3>
                <span className="bg-amber-400 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                  DEMO MODE
                </span>
              </div>
              <p className="text-xs text-[#C5BCB2] mt-0.5">
                Simulated real-time multi-outlet activity for judging demonstrations
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsDemoModalOpen(false)}
            className="text-slate-400 hover:text-white p-1 rounded-full bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Transparency Notice */}
        <div className="bg-[#FFF4EC] px-5 py-2.5 border-b border-[#F6DEC9] text-[11px] text-[#6F665D] flex items-center justify-between font-bold">
          <span>⚠️ Transparency: Demo prediction based on simulated historical food-court data.</span>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5">
          
          {/* 1-Click Automated Demo Progression */}
          <div className="bg-white p-4 rounded-2xl border border-[#EFE8DE] space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-black text-sm text-[#2A2521]">15-Second Complete Journey Test</h4>
                <p className="text-xs text-[#8E857C]">Automatically steps through order creation to table delivery</p>
              </div>
              <button
                onClick={runAutoSimulation}
                disabled={isRunningAuto}
                className="bg-[#F95721] hover:bg-[#EA580C] text-white font-black text-xs px-4 py-2.5 rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-60 flex items-center gap-1.5 shrink-0"
              >
                <Zap className="w-4 h-4" />
                <span>{isRunningAuto ? "Simulating..." : "Run Auto Test"}</span>
              </button>
            </div>

            {/* Stepper Progress Visualizer */}
            <div className="grid grid-cols-5 gap-1 pt-2">
              {[
                { label: 'Order #MB1042', icon: ShoppingBag, stepNum: 1 },
                { label: '3 Kitchens Prep', icon: ChefHat, stepNum: 2 },
                { label: 'Ready for Pickup', icon: CheckCircle2, stepNum: 3 },
                { label: 'Smart Batching', icon: Bike, stepNum: 4 },
                { label: 'Table Delivered', icon: MapPin, stepNum: 5 }
              ].map(s => (
                <div
                  key={s.stepNum}
                  className={`p-2 rounded-xl text-center border text-[10px] font-bold transition-all ${
                    currentStep >= s.stepNum 
                      ? 'bg-[#EEF6EF] text-[#4E8752] border-[#D5EAD7]' 
                      : 'bg-[#FAF7F2] text-[#8E857C] border-[#EFE8DE]'
                  }`}
                >
                  <s.icon className={`w-3.5 h-3.5 mx-auto mb-1 ${currentStep >= s.stepNum ? 'text-[#4E8752]' : 'text-[#8E857C]'}`} />
                  <span className="line-clamp-1">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Manual Interactive Triggers */}
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-[#8E857C]">
              Manual Simulation Triggers
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              
              <button
                onClick={runStep1_CreateOrder}
                className="p-3 bg-white hover:bg-[#FAF7F2] border border-[#EFE8DE] rounded-xl text-left transition-all"
              >
                <div className="flex items-center gap-2 text-xs font-black text-[#2A2521]">
                  <ShoppingBag className="w-4 h-4 text-[#F95721]" />
                  <span>1. Place Multi-Outlet Order</span>
                </div>
                <div className="text-[11px] text-[#8E857C] mt-0.5">Pizza Hub + South Kitchen + Juice Bar (₹417)</div>
              </button>

              <button
                onClick={runStep2_KitchenPreparing}
                className="p-3 bg-white hover:bg-[#FAF7F2] border border-[#EFE8DE] rounded-xl text-left transition-all"
              >
                <div className="flex items-center gap-2 text-xs font-black text-[#2A2521]">
                  <ChefHat className="w-4 h-4 text-amber-500" />
                  <span>2. Trigger Kitchens to Cook</span>
                </div>
                <div className="text-[11px] text-[#8E857C] mt-0.5">Sets sub-orders to 'Preparing' status</div>
              </button>

              <button
                onClick={runStep3_ReadyForPickup}
                className="p-3 bg-white hover:bg-[#FAF7F2] border border-[#EFE8DE] rounded-xl text-left transition-all"
              >
                <div className="flex items-center gap-2 text-xs font-black text-[#2A2521]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>3. Kitchens Ready for Pickup</span>
                </div>
                <div className="text-[11px] text-[#8E857C] mt-0.5">Counters FC-01, FC-02 & FC-03 notify runner</div>
              </button>

              <button
                onClick={runStep4_RunnerPickup}
                className="p-3 bg-white hover:bg-[#FAF7F2] border border-[#EFE8DE] rounded-xl text-left transition-all"
              >
                <div className="flex items-center gap-2 text-xs font-black text-[#2A2521]">
                  <Bike className="w-4 h-4 text-blue-600" />
                  <span>4. Synchronize Smart Batch Route</span>
                </div>
                <div className="text-[11px] text-[#8E857C] mt-0.5">Consolidates 3 outlets into 1 delivery batch</div>
              </button>

              <button
                onClick={runStep5_Delivered}
                className="p-3 bg-white hover:bg-[#FAF7F2] border border-[#EFE8DE] rounded-xl text-left transition-all"
              >
                <div className="flex items-center gap-2 text-xs font-black text-[#2A2521]">
                  <MapPin className="w-4 h-4 text-purple-600" />
                  <span>5. Drop Food at Table A17</span>
                </div>
                <div className="text-[11px] text-[#8E857C] mt-0.5">Completes master order #MB1042</div>
              </button>

              <button
                onClick={handleSimulateSurge}
                className="p-3 bg-white hover:bg-[#FAF7F2] border border-[#EFE8DE] rounded-xl text-left transition-all"
              >
                <div className="flex items-center gap-2 text-xs font-black text-[#2A2521]">
                  <TrendingUp className="w-4 h-4 text-rose-600" />
                  <span>Surge Crowd & Queues</span>
                </div>
                <div className="text-[11px] text-[#8E857C] mt-0.5">Simulates rush hour orders spike in admin</div>
              </button>

            </div>
          </div>

          {/* Quick Jump to Live Tracker */}
          {activeMasterOrder && (
            <div className="pt-2">
              <button
                onClick={() => {
                  setCurrentRole(ROLES.CUSTOMER);
                  setIsDemoModalOpen(false);
                }}
                className="w-full bg-[#2A2521] hover:bg-black text-white font-black text-xs py-3 rounded-xl transition-all flex items-center justify-center gap-1.5"
              >
                <span>View Order #{activeMasterOrder.id} in Customer Tracker</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
