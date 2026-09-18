import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Store, 
  CreditCard, 
  Bike, 
  Clock, 
  CheckCircle2,
  QrCode,
  MapPin
} from 'lucide-react';
import { useMall } from '../../context/MallContext';

export const MallBiteHero = ({ onExploreClick }) => {
  const { currentMall, currentTable, setIsQrScannerOpen } = useMall();

  return (
    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#F7F0E5] via-[#FAF4EA] to-[#F3ECE0] border border-[#EBE1D2] p-6 sm:p-10 shadow-sm">
      
      {/* Decorative Organic Contours & Leaf Background Watermark */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#F95721]/10 via-transparent to-transparent rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[#EADCC8]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
        
        {/* Left Content Column */}
        <div className="flex-1 max-w-xl space-y-5 text-left">
          
          {/* Active Table Quick Pill */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-[#E4D9C8] rounded-full px-3.5 py-1 text-xs font-black text-[#F95721] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <MapPin className="w-3.5 h-3.5 text-[#F95721]" />
            <span>Table {currentTable.number || "A12"} Active • {currentMall.name}</span>
          </div>

          {/* Main Headline (User's exact request: TASTE ORGANIC -> One QR. Unlimited Choices.) */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#2A2521] leading-[1.08] font-display">
            One QR.<br />
            <span className="text-[#F95721]">
              Unlimited Choices.
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-[#6E645B] font-medium leading-relaxed max-w-lg">
            Order from all your favorite outlets in the mall and enjoy at your table with one seamless combined checkout.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={onExploreClick}
              className="flex items-center gap-2.5 bg-[#F95721] hover:bg-[#EA580C] text-white font-black px-7 py-3.5 rounded-2xl text-sm shadow-lg shadow-[#F95721]/30 transition-all hover:scale-105 active:scale-95 font-display"
            >
              <span>Order Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsQrScannerOpen(true)}
              className="flex items-center gap-2 bg-white hover:bg-[#FAF4EA] text-[#3D352E] font-bold px-5 py-3.5 rounded-2xl text-sm border border-[#E0D5C4] transition-all hover:scale-105 active:scale-95 shadow-xs"
            >
              <QrCode className="w-4 h-4 text-[#F95721]" />
              <span>Switch Table</span>
            </button>
          </div>

        </div>

        {/* Right Hero Food Image with 50% OFF Badge & Organic Seal */}
        <div className="relative shrink-0 flex items-center justify-center">
          
          {/* Main Dish Container */}
          <div className="relative w-64 sm:w-72 md:w-80 aspect-square rounded-full p-2 bg-white/70 backdrop-blur-sm border-2 border-white shadow-xl flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700&auto=format&fit=crop&q=85"
              alt="Delicious Gourmet Burger"
              className="w-full h-full object-cover rounded-full shadow-inner"
            />

            {/* Organic Quality Seal */}
            <div className="absolute top-2 left-2 w-14 h-14 rounded-full bg-white/95 border border-[#4E8752]/30 shadow-md flex items-center justify-center p-1 text-center">
              <span className="text-[8px] font-black uppercase text-[#4E8752] leading-tight">
                🌱 100% FRESH
              </span>
            </div>
          </div>

          {/* 50% OFF Circular Badge (Exact match to design) */}
          <div className="absolute top-2 right-2 sm:-top-3 sm:-right-3 w-20 h-20 rounded-full bg-[#F95721] text-white shadow-xl shadow-[#F95721]/35 flex flex-col items-center justify-center text-center p-2 border-2 border-white animate-pulse">
            <span className="text-lg sm:text-xl font-black font-display leading-none">50%</span>
            <span className="text-[10px] font-black uppercase tracking-wider leading-none mt-0.5">OFF</span>
          </div>

        </div>

      </div>

      {/* Feature Row Bar (Multiple Outlets, One Payment, Delivered to Table, Real-time Tracking) */}
      <div className="mt-8 pt-6 border-t border-[#E5DBCB] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="flex items-center gap-2 text-[#4D443D] font-bold bg-white/60 p-2.5 rounded-xl border border-white/80">
          <div className="w-6 h-6 rounded-lg bg-[#FFF2EB] text-[#F95721] flex items-center justify-center shrink-0">
            <Store className="w-3.5 h-3.5" />
          </div>
          <span className="truncate">Multiple Outlets</span>
        </div>

        <div className="flex items-center gap-2 text-[#4D443D] font-bold bg-white/60 p-2.5 rounded-xl border border-white/80">
          <div className="w-6 h-6 rounded-lg bg-[#FFF2EB] text-[#F95721] flex items-center justify-center shrink-0">
            <CreditCard className="w-3.5 h-3.5" />
          </div>
          <span className="truncate">One Payment</span>
        </div>

        <div className="flex items-center gap-2 text-[#4D443D] font-bold bg-white/60 p-2.5 rounded-xl border border-white/80">
          <div className="w-6 h-6 rounded-lg bg-[#FFF2EB] text-[#F95721] flex items-center justify-center shrink-0">
            <Bike className="w-3.5 h-3.5" />
          </div>
          <span className="truncate">Delivered to Table</span>
        </div>

        <div className="flex items-center gap-2 text-[#4D443D] font-bold bg-white/60 p-2.5 rounded-xl border border-white/80">
          <div className="w-6 h-6 rounded-lg bg-[#FFF2EB] text-[#F95721] flex items-center justify-center shrink-0">
            <Clock className="w-3.5 h-3.5" />
          </div>
          <span className="truncate">Real-time Tracking</span>
        </div>
      </div>

    </div>
  );
};
