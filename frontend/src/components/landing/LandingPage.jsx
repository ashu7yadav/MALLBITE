import React, { useState } from 'react';
import { 
  QrCode, 
  ShoppingBag, 
  CreditCard, 
  MapPin, 
  Building2, 
  Store, 
  Bike, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Play,
  Clock,
  Layers,
  BarChart3,
  Cpu
} from 'lucide-react';
import { useAuth, ROLES } from '../../context/AuthContext';
import { useMall } from '../../context/MallContext';
import { ArchitectureModal } from '../common/ArchitectureModal';

export const LandingPage = () => {
  const { setCurrentRole } = useAuth();
  const { setIsDemoModalOpen, setIsQrScannerOpen } = useMall();
  const [isArchModalOpen, setIsArchModalOpen] = useState(false);

  return (
    <div className="space-y-20 pb-24 text-slate-900 animate-in fade-in duration-300">
      
      {/* Hero Section (Feature 34) */}
      <section className="relative pt-10 pb-16 text-center max-w-4xl mx-auto px-4">
        
        {/* Innovation Tagline */}
        <div className="inline-flex items-center gap-2 bg-[#FFF4EC] border border-[#F6DEC9] rounded-full px-4 py-1.5 text-xs font-black text-[#F95721] mb-6 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>MallBite — From Food Ordering to Food-Court Intelligence</span>
        </div>

        {/* Primary Headline */}
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[#2A2521] leading-[1.08] font-display">
          One QR. Every Food Outlet.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F95721] via-amber-500 to-orange-500">
            One Smart Experience.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg text-[#6F665D] font-medium max-w-2xl mx-auto leading-relaxed">
          MallBite connects customers, food outlets and mall management through AI-powered ordering, queue prediction and food-court intelligence.
        </p>

        {/* CTAs: Scan Table QR, Explore Food, Technical Architecture */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => setIsQrScannerOpen(true)}
            className="bg-[#F95721] hover:bg-[#EA580C] text-white font-black text-sm px-8 py-4 rounded-2xl shadow-xl shadow-[#F95721]/30 transition-transform active:scale-95 flex items-center gap-2.5 font-display"
          >
            <QrCode className="w-4 h-4" />
            <span>Scan Table QR</span>
          </button>

          <button
            onClick={() => setCurrentRole(ROLES.CUSTOMER)}
            className="bg-white hover:bg-[#FAF4EB] text-[#2A2521] font-black text-sm px-7 py-4 rounded-2xl border border-[#EFE8DE] shadow-xs transition-all hover:scale-105 active:scale-95 flex items-center gap-2 font-display"
          >
            <span>Explore Food</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsArchModalOpen(true)}
            className="bg-[#2A2521] hover:bg-black text-white font-bold text-xs px-5 py-4 rounded-2xl shadow-md transition-all flex items-center gap-2"
          >
            <Layers className="w-4 h-4 text-amber-400" />
            <span>System Architecture</span>
          </button>
        </div>

        {/* Three Value Propositions (Feature 34) */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
          <div className="bg-white p-5 rounded-3xl border border-[#EFE8DE] shadow-xs">
            <div className="w-9 h-9 rounded-2xl bg-[#FFF4EC] text-[#F95721] flex items-center justify-center font-black mb-3">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <span className="text-[10px] uppercase font-black tracking-wider text-[#8E857C] block">For Customers</span>
            <h4 className="font-black text-sm text-[#2A2521] mt-0.5 font-display">Discover • Order • Track</h4>
            <p className="text-xs text-[#6F665D] mt-1 leading-relaxed">
              Scan one table QR, get AI food recommendations, combine items across 3+ outlets into 1 cart, and track live to Table A17.
            </p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-[#EFE8DE] shadow-xs">
            <div className="w-9 h-9 rounded-2xl bg-[#EEF6EF] text-[#4E8752] flex items-center justify-center font-black mb-3">
              <Store className="w-4 h-4" />
            </div>
            <span className="text-[10px] uppercase font-black tracking-wider text-[#8E857C] block">For Outlets</span>
            <h4 className="font-black text-sm text-[#2A2521] mt-0.5 font-display">Manage • Predict • Optimize</h4>
            <p className="text-xs text-[#6F665D] mt-1 leading-relaxed">
              Streamline incoming multi-store orders, predict kitchen bottlenecks with queue telemetry, and receive inventory signals.
            </p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-[#EFE8DE] shadow-xs">
            <div className="w-9 h-9 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black mb-3">
              <Building2 className="w-4 h-4" />
            </div>
            <span className="text-[10px] uppercase font-black tracking-wider text-[#8E857C] block">For Malls</span>
            <h4 className="font-black text-sm text-[#2A2521] mt-0.5 font-display">Monitor • Forecast • Improve</h4>
            <p className="text-xs text-[#6F665D] mt-1 leading-relaxed">
              Gain centralized B2B visibility of crowd levels, peak rush demand forecasts, and operational runner staffing recommendations.
            </p>
          </div>
        </div>

      </section>

      {/* Feature 36: Innovation Section: "More Than Food Ordering" */}
      <section className="max-w-6xl mx-auto px-4 text-left">
        <div className="text-center mb-10">
          <span className="text-xs font-black uppercase tracking-wider text-[#F95721] bg-[#FFF4EC] px-3 py-1 rounded-full border border-[#F6DEC9]">
            Core Differentiators
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#2A2521] mt-2 font-display">
            More Than Food Ordering
          </h2>
          <p className="text-xs sm:text-sm text-[#6F665D] font-medium mt-1 max-w-xl mx-auto">
            Algorithmic intelligence built specifically for high-throughput shopping mall food courts.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-[#EFE8DE] shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#F95721] to-[#F59E0B] text-white flex items-center justify-center shadow-md shadow-[#F95721]/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-black text-sm text-[#2A2521] font-display">AI Recommendation</h4>
            <p className="text-xs text-[#6F665D] leading-relaxed">
              Personalized food discovery powered by multi-attribute scoring: budget, cuisine, dietary fit, and wait limit.
            </p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-[#EFE8DE] shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-[#4E8752] text-white flex items-center justify-center shadow-md shadow-[#4E8752]/20">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="font-black text-sm text-[#2A2521] font-display">Queue Intelligence</h4>
            <p className="text-xs text-[#6F665D] leading-relaxed">
              Accurate estimated waiting times per outlet based on active queue count, average prep speed, and staff capacity.
            </p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-[#EFE8DE] shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20">
              <Bike className="w-5 h-5" />
            </div>
            <h4 className="font-black text-sm text-[#2A2521] font-display">Smart Batching</h4>
            <p className="text-xs text-[#6F665D] leading-relaxed">
              Coordinates prep times across multiple kitchens to synthesize an optimal runner pickup route and combined delivery.
            </p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-[#EFE8DE] shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/20">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h4 className="font-black text-sm text-[#2A2521] font-display">Mall Intelligence</h4>
            <p className="text-xs text-[#6F665D] leading-relaxed">
              Hourly dinner rush demand curves, automated staff allocation tips, and proactive ingredient inventory signals.
            </p>
          </div>
        </div>
      </section>

      {/* Feature 35: "Why MallBite?" Comparison Table Section */}
      <section className="max-w-5xl mx-auto px-4 text-left">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-4xl font-black text-[#2A2521] font-display">
            Why MallBite?
          </h2>
          <p className="text-xs sm:text-sm text-[#6F665D] font-medium mt-1 max-w-xl mx-auto">
            Side-by-side comparison between chaotic legacy food courts and MallBite Operating System.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-[#EFE8DE] overflow-hidden shadow-soft">
          <div className="grid grid-cols-2 bg-[#2A2521] text-white p-4 text-xs font-black uppercase tracking-wider">
            <div className="text-rose-400">Traditional Food Court</div>
            <div className="text-emerald-400">MallBite Operating System</div>
          </div>

          <div className="divide-y divide-[#FAF4EB] text-xs">
            {[
              { oldVal: "Multiple fragmented menus", newVal: "One unified digital food court menu" },
              { oldVal: "Multiple long standing queues", newVal: "Real-time queue visibility & live indicators" },
              { oldVal: "Manual food selection fatigue", newVal: "AI-driven multi-attribute recommendations" },
              { oldVal: "Unknown, frustrating waiting time", newVal: "Estimated preparation time algorithm" },
              { oldVal: "Separate outlet orders & payments", newVal: "Multi-outlet smart cart & single checkout" },
              { oldVal: "Multiple disorganized delivery trips", newVal: "Smart order batching & synced runner route" },
              { oldVal: "Limited or non-existent analytics", newVal: "Centralized mall intelligence dashboard" },
              { oldVal: "Manual, unpredicted demand planning", newVal: "AI demand forecast & staffing suggestions" }
            ].map((row, idx) => (
              <div key={idx} className="grid grid-cols-2 p-4 hover:bg-[#FAF7F2] transition-colors">
                <div className="text-[#6F665D] font-medium flex items-center gap-2 pr-2">
                  <span className="text-rose-500 font-black">✕</span>
                  <span>{row.oldVal}</span>
                </div>
                <div className="text-[#2A2521] font-bold flex items-center gap-2 pl-2">
                  <span className="text-emerald-600 font-black">✓</span>
                  <span>{row.newVal}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Modal */}
      <ArchitectureModal isOpen={isArchModalOpen} onClose={() => setIsArchModalOpen(false)} />

    </div>
  );
};
