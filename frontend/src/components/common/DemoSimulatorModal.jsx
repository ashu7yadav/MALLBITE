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
  Clock,
  Leaf,
  Users,
  Layers,
  Timer
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useMall } from '../../context/MallContext';
import { useCart } from '../../context/CartContext';
import { useAuth, ROLES } from '../../context/AuthContext';
import { api } from '../../services/api';

export const DemoSimulatorModal = ({ onOpenGroupPlanner }) => {
  const { isDemoModalOpen, setIsDemoModalOpen, currentTable, setCurrentTable, activeMasterOrder, setActiveMasterOrder, addNotification, refreshData } = useMall();
  const { clearCart, addToCart } = useCart();
  const { setCurrentRole } = useAuth();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunningAuto, setIsRunningAuto] = useState(false);
  const [demoLog, setDemoLog] = useState([]);

  if (!isDemoModalOpen) return null;

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const addLog = (title, detail) => {
    setDemoLog(prev => [{ title, detail, time: new Date().toLocaleTimeString() }, ...prev.slice(0, 5)]);
  };

  // 4-Person Scenario Items
  const judgeScenarioItems = [
    {
      id: "item-bh-1",
      restaurantId: "rest-burger",
      restaurantName: "Burger House",
      name: "Classic Crunchy Veg Burger",
      price: 149,
      quantity: 1,
      isVeg: true,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80",
      targetPerson: "Ananya (Pure Veg)"
    },
    {
      id: "item-pc-2",
      restaurantId: "rest-pizza",
      restaurantName: "Pizza Corner",
      name: "Jain Farmhouse Garden Pizza",
      price: 179,
      quantity: 1,
      isVeg: true,
      isJain: true,
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80",
      targetPerson: "Rohan (Strict Jain)"
    },
    {
      id: "item-we-2",
      restaurantId: "rest-wok",
      restaurantName: "Wok Express",
      name: "Teriyaki Chicken Rice Bowl",
      price: 229,
      quantity: 1,
      isVeg: false,
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80",
      targetPerson: "Priya (Non-Veg)"
    },
    {
      id: "item-bh-3",
      restaurantId: "rest-burger",
      restaurantName: "Burger House",
      name: "Crispy Peri-Peri Fries",
      price: 99,
      quantity: 1,
      isVeg: true,
      image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?w=600&auto=format&fit=crop&q=80",
      targetPerson: "Kabir (Budget Snack)"
    }
  ];

  // STEP 1: Table Detection & Group Food Planning
  const runStep1_GroupSolve = async () => {
    setCurrentStep(1);
    setCurrentTable({ number: "A17", section: "North Food Atrium", qrCode: "QR-A17" });
    addLog("Table A17 Identified", "4 Guests detected: Ananya (Veg), Rohan (Jain), Priya (Non-Veg), Kabir (Budget).");
    addNotification("Table A17 Configured", "AI Group Solver aligned 4 dietary constraints under ₹656 total.", "info");
  };

  // STEP 2: Multi-Outlet Master Order Placement
  const runStep2_PlaceMasterOrder = async () => {
    setCurrentStep(2);
    clearCart();

    try {
      const res = await api.createOrder({
        tableNumber: "A17",
        customerName: "Table A17 Group (Judge Demo)",
        customerPhone: "+91 98765 43210",
        items: judgeScenarioItems,
        paymentMethod: "Unified UPI",
        couponCode: "HACKATHON2026",
        isReusablePackaging: true
      });

      if (res.success) {
        setActiveMasterOrder(res.data);
        triggerConfetti();
        addLog("Master Order Created", `#${res.data.id} split into Burger House, Pizza Corner, Wok Express.`);
        addNotification(
          "Master Order Placed!",
          `Master Order #${res.data.id} generated with 3 outlet sub-orders for Table A17.`,
          "success"
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  // STEP 3: Transparent Queue Optimization & Start Staggering
  const runStep3_QueueStagger = async () => {
    setCurrentStep(3);
    addLog("Queue Optimizer Active", "Longest prep (Pizza 15m) starts now. Wok starts at T+5m delay, Burger at T+8m delay.");
    addNotification("Queue Synchronized ⏱️", "Kitchen start delays calculated so all dishes finish simultaneously at Table A17.", "info");
    try {
      await api.simulateDemoStep(1);
    } catch (err) {
      console.error(err);
    }
  };

  // STEP 4: Eco Score & Packaging Calculation
  const runStep4_EcoScore = async () => {
    setCurrentStep(4);
    addLog("Eco Intelligence Computed", "Eco Score: 84/100 | 3 bags saved | 2 delivery trips consolidated | 310g CO2 saved.");
    addNotification("Eco Score 84/100 🌿", "Multi-outlet consolidation eliminated 2 individual delivery trips to Table A17.", "success");
    try {
      await api.simulateDemoStep(2);
    } catch (err) {
      console.error(err);
    }
  };

  // STEP 5: Kitchens Ready & Coordinated Runner Pickup
  const runStep5_RunnerPickup = async () => {
    setCurrentStep(5);
    addLog("Runner Rohan Dispatched", "Collected from Pizza Corner (FC-01) -> Wok Express (FC-03) -> Burger House (FC-02).");
    addNotification("Consolidated Runner Route 🚲", "Runner Rohan collected all 3 kitchen tickets in 1 single loop.", "info");
    try {
      const res = await api.simulateDemoStep(3);
      if (res.success) setActiveMasterOrder(res.order);
    } catch (err) {
      console.error(err);
    }
  };

  // STEP 6: Table A17 Final Delivery
  const runStep6_Delivered = async () => {
    setCurrentStep(6);
    addLog("Delivered to Table A17", "All 4 dishes served piping hot together! Cycle completed in synchronized time.");
    try {
      const res = await api.simulateDemoStep(5);
      if (res.success) {
        setActiveMasterOrder(res.order);
        triggerConfetti();
        addNotification("Order Complete 🎉", "Table A17 group served simultaneously across 3 different restaurants!", "success");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Simulate Order Surge for Vendor OS
  const handleSimulateSurge = async () => {
    try {
      await api.simulateDemoActivity('spike_orders');
      addNotification("Crowd Surge Simulated 📈", "Orders spiked! Crowd level surged to 88%, Burger House queue reached 18 orders.", "info");
      refreshData();
    } catch (err) {
      console.error(err);
    }
  };

  // 60-Second Full Judge Flow
  const runAutoSimulation = async () => {
    setIsRunningAuto(true);
    await runStep1_GroupSolve();
    await new Promise(r => setTimeout(r, 2200));
    await runStep2_PlaceMasterOrder();
    await new Promise(r => setTimeout(r, 2500));
    await runStep3_QueueStagger();
    await new Promise(r => setTimeout(r, 2500));
    await runStep4_EcoScore();
    await new Promise(r => setTimeout(r, 2500));
    await runStep5_RunnerPickup();
    await new Promise(r => setTimeout(r, 2500));
    await runStep6_Delivered();
    setIsRunningAuto(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#FAF7F2] rounded-3xl max-w-2xl w-full shadow-2xl border border-[#EFE8DE] overflow-hidden my-auto text-left">
        
        {/* Header with DEMO MODE badge */}
        <div className="bg-[#2A2521] text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#F95721] text-white flex items-center justify-center shadow-lg shadow-[#F95721]/30">
              <Sparkles className="w-6 h-6 fill-current animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black font-display text-white">Hackathon AI Judge Demo</h3>
                <span className="bg-amber-400 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider">
                  LIVE SIMULATION
                </span>
              </div>
              <p className="text-xs text-[#C5BCB2] mt-0.5">
                Full 4-Person Table A17 Multi-Outlet Scenario & AI Engine Showcase
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsDemoModalOpen(false)}
            className="text-slate-400 hover:text-white p-1.5 rounded-full bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Transparency Banner */}
        <div className="bg-[#FFF4EC] px-5 py-2.5 border-b border-[#F6DEC9] text-[11px] text-[#6F665D] flex items-center justify-between font-medium">
          <div className="flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-[#F95721] shrink-0" />
            <span>Table A17 Scenario: Ananya (Veg), Rohan (Jain), Priya (Non-Veg), Kabir (Budget).</span>
          </div>
          <span className="text-[10px] font-bold uppercase bg-white px-2 py-0.5 rounded text-[#2A2521] border border-[#F6DEC9]">
            Target: ₹700 Budget
          </span>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          
          {/* 1-Click Automated Judge Journey */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#EFE8DE] shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="font-black text-sm text-[#2A2521] flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-[#F95721]" />
                  <span>RUN FULL AI DEMO (60s Automated Flow)</span>
                </h4>
                <p className="text-xs text-[#8E857C]">
                  Demonstrates all 5 AI modules: Group Planner → Split Order → Queue Stagger → Eco Score → Unified Delivery
                </p>
              </div>
              <button
                onClick={runAutoSimulation}
                disabled={isRunningAuto}
                className="bg-[#F95721] hover:bg-[#EA580C] text-white font-black text-xs px-5 py-3 rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-60 flex items-center justify-center gap-2 shrink-0"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{isRunningAuto ? "Running AI Simulation..." : "Run Complete Flow"}</span>
              </button>
            </div>

            {/* Stepper Progress Visualizer */}
            <div className="grid grid-cols-6 gap-1 pt-2">
              {[
                { label: '1. Group AI', icon: Users, stepNum: 1 },
                { label: '2. Split Order', icon: ShoppingBag, stepNum: 2 },
                { label: '3. Stagger Delay', icon: Timer, stepNum: 3 },
                { label: '4. Eco Intel', icon: Leaf, stepNum: 4 },
                { label: '5. Single Runner', icon: Bike, stepNum: 5 },
                { label: '6. Table A17', icon: MapPin, stepNum: 6 }
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

          {/* Interactive Step Triggers */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-[#8E857C]">
                Interactive Step-by-Step Controls
              </span>
              {onOpenGroupPlanner && (
                <button
                  onClick={() => {
                    setIsDemoModalOpen(false);
                    onOpenGroupPlanner();
                  }}
                  className="text-xs font-bold text-[#F95721] hover:underline flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Open AI Group Planner UI</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              
              <button
                onClick={runStep1_GroupSolve}
                className={`p-3 rounded-xl text-left border transition-all ${
                  currentStep === 1 ? 'bg-orange-50/70 border-orange-300 ring-2 ring-orange-400/20' : 'bg-white hover:bg-[#FAF7F2] border-[#EFE8DE]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-black text-[#2A2521]">
                    <Users className="w-4 h-4 text-[#F95721]" />
                    <span>Step 1: Solve Group Diet</span>
                  </div>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-orange-100 text-orange-800">4 People</span>
                </div>
                <div className="text-[11px] text-[#8E857C] mt-1">Ananya (Veg) + Rohan (Jain) + Priya (NonVeg) + Kabir</div>
              </button>

              <button
                onClick={runStep2_PlaceMasterOrder}
                className={`p-3 rounded-xl text-left border transition-all ${
                  currentStep === 2 ? 'bg-orange-50/70 border-orange-300 ring-2 ring-orange-400/20' : 'bg-white hover:bg-[#FAF7F2] border-[#EFE8DE]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-black text-[#2A2521]">
                    <ShoppingBag className="w-4 h-4 text-emerald-600" />
                    <span>Step 2: Split Master Order</span>
                  </div>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">3 Outlets</span>
                </div>
                <div className="text-[11px] text-[#8E857C] mt-1">Order #MB1042: Burger House, Pizza Corner & Wok Express</div>
              </button>

              <button
                onClick={runStep3_QueueStagger}
                className={`p-3 rounded-xl text-left border transition-all ${
                  currentStep === 3 ? 'bg-orange-50/70 border-orange-300 ring-2 ring-orange-400/20' : 'bg-white hover:bg-[#FAF7F2] border-[#EFE8DE]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-black text-[#2A2521]">
                    <Timer className="w-4 h-4 text-blue-600" />
                    <span>Step 3: Staggered Queue Delays</span>
                  </div>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">Simultaneous Finish</span>
                </div>
                <div className="text-[11px] text-[#8E857C] mt-1">Pizza starts T+0m, Wok T+5m delay, Burger T+8m delay</div>
              </button>

              <button
                onClick={runStep4_EcoScore}
                className={`p-3 rounded-xl text-left border transition-all ${
                  currentStep === 4 ? 'bg-orange-50/70 border-orange-300 ring-2 ring-orange-400/20' : 'bg-white hover:bg-[#FAF7F2] border-[#EFE8DE]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-black text-[#2A2521]">
                    <Leaf className="w-4 h-4 text-green-600" />
                    <span>Step 4: Compute Eco Score</span>
                  </div>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-green-100 text-green-800">84/100 Points</span>
                </div>
                <div className="text-[11px] text-[#8E857C] mt-1">Saves 3 bags, eliminates 2 runner trips to Table A17</div>
              </button>

              <button
                onClick={runStep5_RunnerPickup}
                className={`p-3 rounded-xl text-left border transition-all ${
                  currentStep === 5 ? 'bg-orange-50/70 border-orange-300 ring-2 ring-orange-400/20' : 'bg-white hover:bg-[#FAF7F2] border-[#EFE8DE]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-black text-[#2A2521]">
                    <Bike className="w-4 h-4 text-purple-600" />
                    <span>Step 5: Batch Runner Pickup</span>
                  </div>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-100 text-purple-800">1 Runner</span>
                </div>
                <div className="text-[11px] text-[#8E857C] mt-1">Single collection loop FC-01 → FC-02 → FC-03</div>
              </button>

              <button
                onClick={runStep6_Delivered}
                className={`p-3 rounded-xl text-left border transition-all ${
                  currentStep === 6 ? 'bg-orange-50/70 border-orange-300 ring-2 ring-orange-400/20' : 'bg-white hover:bg-[#FAF7F2] border-[#EFE8DE]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-black text-[#2A2521]">
                    <MapPin className="w-4 h-4 text-rose-600" />
                    <span>Step 6: Table A17 Delivery</span>
                  </div>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-100 text-rose-800">Piping Hot</span>
                </div>
                <div className="text-[11px] text-[#8E857C] mt-1">All 4 members get their meal served at the exact same moment</div>
              </button>

            </div>
          </div>

          {/* Quick Simulation Activity Feed */}
          {demoLog.length > 0 && (
            <div className="bg-white p-4 rounded-2xl border border-[#EFE8DE] space-y-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#8E857C]">
                Simulation Real-Time Execution Log
              </span>
              <div className="space-y-1.5">
                {demoLog.map((log, i) => (
                  <div key={i} className="text-xs flex items-start gap-2 text-[#2A2521] border-b border-[#FAF7F2] pb-1.5 last:border-b-0">
                    <span className="text-[10px] text-[#8E857C] font-mono shrink-0">{log.time}</span>
                    <div>
                      <span className="font-bold text-[#F95721]">{log.title}: </span>
                      <span className="text-[#6F665D]">{log.detail}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Vendor Surge Simulator & Role Quick-Switch */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            <button
              onClick={handleSimulateSurge}
              className="p-3 bg-white hover:bg-[#FAF7F2] border border-[#EFE8DE] rounded-xl text-left transition-all"
            >
              <div className="flex items-center gap-2 text-xs font-black text-[#2A2521]">
                <TrendingUp className="w-4 h-4 text-rose-600" />
                <span>Simulate Food Court Rush</span>
              </div>
              <div className="text-[11px] text-[#8E857C] mt-0.5">Spikes queue to 18 orders for Vendor OS demonstration</div>
            </button>

            <button
              onClick={() => {
                setCurrentRole(ROLES.RESTAURANT);
                setIsDemoModalOpen(false);
              }}
              className="p-3 bg-white hover:bg-[#FAF7F2] border border-[#EFE8DE] rounded-xl text-left transition-all"
            >
              <div className="flex items-center gap-2 text-xs font-black text-[#2A2521]">
                <ChefHat className="w-4 h-4 text-[#F95721]" />
                <span>Switch to Vendor OS Dashboard</span>
              </div>
              <div className="text-[11px] text-[#8E857C] mt-0.5">View AI Demand Forecast & Kitchen Capacity</div>
            </button>
          </div>

          {/* Jump to Live Tracker if Order is Active */}
          {activeMasterOrder && (
            <div className="pt-1">
              <button
                onClick={() => {
                  setCurrentRole(ROLES.CUSTOMER);
                  setIsDemoModalOpen(false);
                }}
                className="w-full bg-[#2A2521] hover:bg-black text-white font-black text-xs py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <span>View Order #{activeMasterOrder.id} in Customer Queue Tracker</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
