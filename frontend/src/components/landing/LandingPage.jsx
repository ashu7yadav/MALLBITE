import React from 'react';
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
  Play
} from 'lucide-react';
import { useAuth, ROLES } from '../../context/AuthContext';
import { useMall } from '../../context/MallContext';

export const LandingPage = () => {
  const { setCurrentRole } = useAuth();
  const { setIsDemoModalOpen } = useMall();

  return (
    <div className="space-y-20 pb-24 text-slate-900 animate-in fade-in duration-300">
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 text-center max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-200/80 rounded-full px-4 py-1.5 text-xs font-extrabold text-brand-600 mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-brand-500" />
          <span>The Digital Operating System for Shopping Mall Food Courts</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 leading-tight">
          One QR. Every Food Outlet.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 via-amber-500 to-orange-500">
            One Seamless Experience.
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
          Scan once at your food court table, discover every participating restaurant, add dishes from multiple outlets into a single cart, pay once, and have everything delivered directly to your seat.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => setCurrentRole(ROLES.CUSTOMER)}
            className="bg-brand-500 hover:bg-brand-600 text-white font-black text-sm px-8 py-4 rounded-2xl shadow-xl shadow-brand-500/30 transition-transform active:scale-95 flex items-center gap-2"
          >
            <span>Launch Customer Food Hub</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsDemoModalOpen(true)}
            className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm px-7 py-4 rounded-2xl shadow-md transition-colors flex items-center gap-2"
          >
            <Play className="w-4 h-4 fill-brand-400 text-brand-400" />
            <span>Interactive Demo Simulation</span>
          </button>
        </div>

        {/* Hero Preview Card */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-elevated text-left">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-500 text-white flex items-center justify-center font-black text-xl shadow-md shadow-brand-500/30">
                M
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-slate-900">Phoenix Mall Food Hub • Table A-24</h3>
                <p className="text-xs text-slate-500">Multi-store live orchestration demonstration</p>
              </div>
            </div>
            <div className="bg-emerald-100 text-emerald-800 font-bold text-xs px-3.5 py-1.5 rounded-full flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>3 Outlets Combined into 1 Cart</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Outlet #1</span>
              <h4 className="font-black text-slate-900 text-sm mt-1">Burger House</h4>
              <p className="text-xs text-slate-600 mt-0.5">Classic Veg Crunch Burger × 1</p>
              <span className="text-xs font-black text-slate-900 block mt-2">₹149</span>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Outlet #2</span>
              <h4 className="font-black text-slate-900 text-sm mt-1">Pizza Corner</h4>
              <p className="text-xs text-slate-600 mt-0.5">Farmhouse Veggie Supreme Pizza × 1</p>
              <span className="text-xs font-black text-slate-900 block mt-2">₹299</span>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Outlet #3</span>
              <h4 className="font-black text-slate-900 text-sm mt-1">Coffee Culture</h4>
              <p className="text-xs text-slate-600 mt-0.5">Signature Iced Cold Coffee × 1</p>
              <span className="text-xs font-black text-slate-900 block mt-2">₹129</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem vs Solution Section (PRD Section 29) */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
            Why Mall Food Courts Need MALLBITE
          </h2>
          <p className="text-sm text-slate-500 font-medium mt-2 max-w-xl mx-auto">
            Traditional food court ordering is fragmented, frustrating, and chaotic. MALLBITE unifies everything.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Old Traditional Way */}
          <div className="bg-rose-50/50 rounded-3xl p-8 border border-rose-200/80 space-y-4">
            <div className="text-xs font-black text-rose-700 uppercase tracking-wider">
              Traditional Food Court (High Friction)
            </div>
            <ul className="space-y-3 text-sm text-slate-700 font-medium">
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-black">✕</span>
                <span>Long standing queues in front of every individual restaurant counter</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-black">✕</span>
                <span>Separate multiple payments and cards/UPI taps for each friend's food</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-black">✕</span>
                <span>Constant standing up to check buzzer tokens and collect trays</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-black">✕</span>
                <span>No unified food court analytics or table occupancy insights for mall owners</span>
              </li>
            </ul>
          </div>

          {/* MALLBITE Unified Solution */}
          <div className="bg-emerald-50/50 rounded-3xl p-8 border border-emerald-200/80 space-y-4 shadow-soft">
            <div className="text-xs font-black text-emerald-700 uppercase tracking-wider">
              MALLBITE Unified Operating System
            </div>
            <ul className="space-y-3 text-sm text-slate-700 font-medium">
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-500 font-black">✓</span>
                <span><strong>Single QR on table</strong> unlocks entire mall food court digital marketplace</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-500 font-black">✓</span>
                <span><strong>Multi-Restaurant Cart:</strong> Combine burgers, pizza & coffees in 1 checkout</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-500 font-black">✓</span>
                <span><strong>Automated Order Splitting:</strong> Kitchens receive sub-tickets instantly</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-500 font-black">✓</span>
                <span><strong>Direct Table Drop:</strong> Mall runners bring everything straight to your table</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* How It Works (PRD Section 4 & 29) */}
      <section className="bg-slate-900 text-white py-16 px-4 rounded-3xl max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-brand-400 text-xs font-extrabold uppercase tracking-widest block mb-1">
            Simple 5-Step Customer Flow
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            How MALLBITE Works
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/60 text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-brand-500 text-white font-black text-sm flex items-center justify-center mx-auto">
              01
            </div>
            <h4 className="font-bold text-sm text-white">Scan Table QR</h4>
            <p className="text-[11px] text-slate-400">System automatically detects Mall, Floor & Table number.</p>
          </div>

          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/60 text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-brand-500 text-white font-black text-sm flex items-center justify-center mx-auto">
              02
            </div>
            <h4 className="font-bold text-sm text-white">Discover Outlets</h4>
            <p className="text-[11px] text-slate-400">Explore all participating restaurants & live menu items.</p>
          </div>

          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/60 text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-brand-500 text-white font-black text-sm flex items-center justify-center mx-auto">
              03
            </div>
            <h4 className="font-bold text-sm text-white">Multi-Store Cart</h4>
            <p className="text-[11px] text-slate-400">Add dishes from different restaurants into 1 combined cart.</p>
          </div>

          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/60 text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-brand-500 text-white font-black text-sm flex items-center justify-center mx-auto">
              04
            </div>
            <h4 className="font-bold text-sm text-white">Single Pay</h4>
            <p className="text-[11px] text-slate-400">1 UPI / Card transaction splits into separate kitchen tickets.</p>
          </div>

          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/60 text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white font-black text-sm flex items-center justify-center mx-auto">
              05
            </div>
            <h4 className="font-bold text-sm text-white">Table Drop</h4>
            <p className="text-[11px] text-slate-400">Mall runners bring all dishes directly to your table.</p>
          </div>
        </div>
      </section>

      {/* Business Model & Monetization (PRD Section 30) */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-brand-600 text-xs font-extrabold uppercase tracking-widest block mb-1">
            Scalable Monetization Strategy
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
            Four High-Margin Revenue Streams
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h4 className="font-black text-base text-slate-900">Restaurant Commission</h4>
            <div className="text-xl font-black text-brand-500">5% – 10%</div>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Per-transaction processing commission on orders facilitated through the digital mall food hub.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <h4 className="font-black text-base text-slate-900">Mall SaaS Subscription</h4>
            <div className="text-xl font-black text-blue-600">₹25,000 / mo</div>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Monthly enterprise license fee paid by shopping mall management for heatmaps, analytics & QR infrastructure.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-black text-base text-slate-900">Promoted Outlets</h4>
            <div className="text-xl font-black text-amber-600">Featured Ads</div>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Food outlets bid for top-ranked placement on the customer food hub home carousel and banner slots.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="font-black text-base text-slate-900">AI Demand Analytics</h4>
            <div className="text-xl font-black text-purple-600">Add-on Tier</div>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Predictive kitchen demand forecasting, staffing optimization and footfall analytics for commercial landlords.
            </p>
          </div>
        </div>
      </section>

      {/* Role Switcher Matrix for Judges */}
      <section className="bg-slate-50 rounded-3xl p-8 border border-slate-200 max-w-6xl mx-auto text-center space-y-6">
        <h3 className="font-black text-xl sm:text-2xl text-slate-900">
          Ready to Explore MALLBITE's 4 Connected Roles?
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xl mx-auto">
          Test any interface in real-time with synchronized live state updates across customer, kitchen, runner, and mall management.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => setCurrentRole(ROLES.CUSTOMER)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-5 py-3 rounded-2xl shadow-md transition-transform active:scale-95"
          >
            1. Customer Ordering Hub (Table A-24)
          </button>
          <button
            onClick={() => setCurrentRole(ROLES.RESTAURANT)}
            className="bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs px-5 py-3 rounded-2xl shadow-md transition-transform active:scale-95"
          >
            2. Restaurant Kitchen Admin
          </button>
          <button
            onClick={() => setCurrentRole(ROLES.DELIVERY)}
            className="bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs px-5 py-3 rounded-2xl shadow-md transition-transform active:scale-95"
          >
            3. Delivery Runner Staff
          </button>
          <button
            onClick={() => setCurrentRole(ROLES.MALL_ADMIN)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs px-5 py-3 rounded-2xl shadow-md transition-transform active:scale-95"
          >
            4. Mall Management Admin
          </button>
        </div>
      </section>

    </div>
  );
};
