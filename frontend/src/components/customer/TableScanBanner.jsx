import React from 'react';
import { QrCode, Sparkles, MapPin, ChevronRight, ShieldCheck, Zap, Clock, UtensilsCrossed, Flame, CheckCircle2 } from 'lucide-react';
import { useMall } from '../../context/MallContext';

export const TableScanBanner = ({ onExploreClick }) => {
  const { currentMall, currentTable, setIsQrScannerOpen } = useMall();

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-elevated mb-8 border border-slate-200/60 group">
      {/* Background with luxury food photography & deep ambient gradient */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&auto=format&fit=crop&q=85')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-slate-950/50" />
      </div>

      {/* Decorative ambient glowing background light */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Content Container */}
      <div className="relative z-10 px-6 py-8 sm:px-10 sm:py-12 max-w-4xl text-white">
        
        {/* Top Badges Row */}
        <div className="flex flex-wrap items-center gap-2.5 mb-5">
          {/* Live Table Detected Pill Badge */}
          <div className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/20 backdrop-blur-md border border-white/25 rounded-full px-3.5 py-1 text-xs font-black text-amber-300 shadow-md transition-all">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <MapPin className="w-3.5 h-3.5 text-amber-300" />
            <span>Table {currentTable.number} Active • {currentTable.zone}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 bg-brand-500/30 backdrop-blur-md border border-brand-400/40 text-brand-200 rounded-full px-3 py-1 text-xs font-extrabold">
            <Flame className="w-3.5 h-3.5 text-brand-400 fill-brand-400" />
            <span>6 Food Outlets Live</span>
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1] font-display">
          One QR. Every Food Outlet.<br />
          <span className="text-gradient-fire">
            One Unified Checkout.
          </span>
        </h1>

        {/* Subtitle Value Proposition */}
        <p className="mt-4 text-sm sm:text-base text-slate-200 font-medium leading-relaxed max-w-2xl">
          Order juicy burgers from <strong className="text-amber-300 font-bold">Burger House</strong>, stone-baked pizzas from <strong className="text-amber-300 font-bold">Pizza Corner</strong>, and iced drinks in <strong className="text-white underline decoration-brand-500 decoration-2">one combined cart</strong>. Pay once and get everything delivered right to your table!
        </p>

        {/* Action Buttons */}
        <div className="mt-7 flex flex-wrap items-center gap-3.5">
          <button
            onClick={onExploreClick}
            className="flex items-center gap-2.5 bg-gradient-to-r from-brand-500 via-orange-500 to-amber-500 hover:from-brand-400 hover:to-amber-400 text-white font-black px-7 py-3.5 rounded-2xl text-sm shadow-xl shadow-brand-500/35 transition-all hover:scale-105 active:scale-95 shine-effect font-display"
          >
            <span>Explore Mall Menu</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsQrScannerOpen(true)}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 text-white font-bold px-5 py-3.5 rounded-2xl text-sm transition-all hover:scale-105 active:scale-95"
          >
            <QrCode className="w-4 h-4 text-amber-300" />
            <span>Switch / Scan Table QR</span>
          </button>
        </div>

        {/* Live Food Court Benefit Badges */}
        <div className="mt-8 pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-200 bg-white/5 backdrop-blur-sm p-2 rounded-xl border border-white/10">
            <Clock className="w-4 h-4 text-amber-400 shrink-0" />
            <span>9m Avg Prep</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-200 bg-white/5 backdrop-blur-sm p-2 rounded-xl border border-white/10">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>1 Single Payment</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-200 bg-white/5 backdrop-blur-sm p-2 rounded-xl border border-white/10">
            <Zap className="w-4 h-4 text-blue-400 shrink-0" />
            <span>Runner Delivery</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-200 bg-white/5 backdrop-blur-sm p-2 rounded-xl border border-white/10">
            <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
            <span>AI Smart Combos</span>
          </div>
        </div>

      </div>
    </div>
  );
};
