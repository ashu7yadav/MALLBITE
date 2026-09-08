import React from 'react';
import { QrCode, Sparkles, MapPin, ChevronRight, ShieldCheck, Zap } from 'lucide-react';
import { useMall } from '../../context/MallContext';

export const TableScanBanner = ({ onExploreClick }) => {
  const { currentMall, currentTable, setIsQrScannerOpen } = useMall();

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-soft mb-8 border border-slate-200/80">
      {/* Background with real food imagery & dark gradient (Matches User's Swiggy screenshot) */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&auto=format&fit=crop&q=80')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/40" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 px-6 py-8 sm:px-10 sm:py-12 max-w-3xl text-white">
        
        {/* Live Table Detected Pill Badge */}
        <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/25 rounded-full px-3.5 py-1 text-xs font-bold text-amber-300 mb-4 shadow-sm animate-pulse">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <MapPin className="w-3.5 h-3.5 text-amber-300" />
          <span>Table {currentTable.number} Connected • {currentTable.zone}</span>
        </div>

        {/* Headline */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
          One QR. Every Food Outlet.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-brand-400 to-orange-400">
            One Seamless Experience.
          </span>
        </h1>

        {/* Subtitle Value Proposition */}
        <p className="mt-3 text-sm sm:text-base text-slate-200 font-medium leading-relaxed max-w-xl">
          Order burgers from <strong className="text-white">Burger House</strong>, pizzas from <strong className="text-white">Pizza Corner</strong>, and coffee in <strong className="text-white">one combined cart</strong>. Pay once and get everything delivered directly to <strong className="text-amber-300 font-bold">Table {currentTable.number}</strong>.
        </p>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            onClick={onExploreClick}
            className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-extrabold px-6 py-3 rounded-2xl text-sm shadow-lg shadow-brand-500/30 transition-transform active:scale-95"
          >
            <span>Explore Mall Menu</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsQrScannerOpen(true)}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold px-4 py-3 rounded-2xl text-sm transition-colors"
          >
            <QrCode className="w-4 h-4 text-amber-300" />
            <span>Switch / Scan Table QR</span>
          </button>
        </div>

        {/* Feature Pills */}
        <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-3 gap-2 sm:gap-4 max-w-lg">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Single Checkout</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <Zap className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Smart Order Splitting</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <Sparkles className="w-4 h-4 text-brand-400 shrink-0" />
            <span>Direct Table Drop</span>
          </div>
        </div>

      </div>
    </div>
  );
};
