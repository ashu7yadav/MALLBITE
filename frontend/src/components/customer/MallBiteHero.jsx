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
  MapPin,
  Scale
} from 'lucide-react';
import { useMall } from '../../context/MallContext';

export const MallBiteHero = ({ onExploreClick, onOpenAiModal, onOpenCompareModal, onOpenStandee }) => {
  const { currentMall, currentTable, setIsQrScannerOpen } = useMall();

  return (
    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#F7F0E5] via-[#FAF4EA] to-[#F3ECE0] border border-[#EBE1D2] p-6 sm:p-10 shadow-sm">
      
      {/* Decorative Organic Contours & Leaf Background Watermark */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#F95721]/10 via-transparent to-transparent rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[#EADCC8]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
        
        {/* Left Content Column */}
        <div className="flex-1 max-w-xl space-y-5 text-left">
          
          {/* Feature 1: Explicit 📍 You're ordering from Table A17 pill */}
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md border border-[#E4D9C8] rounded-full px-4 py-1.5 text-xs font-black text-[#2A2521] shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <MapPin className="w-4 h-4 text-[#F95721]" />
            <span>
              📍 You're ordering from <strong className="text-[#F95721] font-black">Table {currentTable.number || "A17"}</strong> • {currentMall.name}
            </span>
            <button
              onClick={() => setIsQrScannerOpen(true)}
              className="ml-1 text-[11px] text-[#F95721] hover:underline font-extrabold"
            >
              (Change)
            </button>
          </div>

          {/* Main Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#2A2521] leading-[1.08] font-display">
            One QR.<br />
            <span className="text-[#F95721]">
              Unlimited Choices.
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-[#6E645B] font-medium leading-relaxed max-w-lg">
            Order from multiple food outlets in one single smart cart, pay once, and have your order consolidated and delivered right to Table {currentTable.number || "A17"}.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            
            {/* AI Recommendation Trigger */}
            <button
              onClick={onOpenAiModal}
              className="flex items-center gap-2.5 bg-[#F95721] hover:bg-[#EA580C] text-white font-black px-6 py-3.5 rounded-2xl text-sm shadow-lg shadow-[#F95721]/30 transition-all hover:scale-105 active:scale-95 font-display"
            >
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>What Should I Eat?</span>
            </button>

            {/* Scan Table QR Button */}
            <button
              onClick={() => setIsQrScannerOpen(true)}
              className="flex items-center gap-2 bg-white hover:bg-[#FAF4EA] text-[#3D352E] font-bold px-4 py-3.5 rounded-2xl text-sm border border-[#E0D5C4] transition-all hover:scale-105 active:scale-95 shadow-xs"
            >
              <QrCode className="w-4 h-4 text-[#F95721]" />
              <span>Scan Table QR</span>
            </button>

            {/* Food Comparison Button */}
            {onOpenCompareModal && (
              <button
                onClick={onOpenCompareModal}
                className="flex items-center gap-2 bg-[#FFF4EC] hover:bg-[#FFE8D6] text-[#F95721] font-bold px-4 py-3.5 rounded-2xl text-sm border border-[#F6DEC9] transition-all hover:scale-105 active:scale-95"
                title="Compare similar dishes across outlets"
              >
                <Scale className="w-4 h-4" />
                <span>Compare Food</span>
              </button>
            )}

            {/* Demo QR Screen for Judges */}
            {onOpenStandee && (
              <button
                onClick={onOpenStandee}
                className="flex items-center gap-1.5 text-xs text-[#8E857C] hover:text-[#2A2521] underline font-bold px-2 py-1"
              >
                <span>Demo QR for Judges</span>
              </button>
            )}

          </div>

        </div>

        {/* Right Hero Food Image with 50% OFF Badge & Organic Seal */}
        <div className="relative shrink-0 flex items-center justify-center">
          
          <div className="relative w-64 sm:w-72 md:w-80 aspect-square rounded-full p-2 bg-white/70 backdrop-blur-sm border-2 border-white shadow-xl flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700&auto=format&fit=crop&q=85"
              alt="Gourmet Food Selection"
              className="w-full h-full object-cover rounded-full shadow-inner"
            />

            <div className="absolute top-2 left-2 w-16 h-16 rounded-full bg-white/95 border border-[#4E8752]/30 shadow-md flex items-center justify-center p-1 text-center">
              <span className="text-[8px] font-black uppercase text-[#4E8752] leading-tight">
                🌱 MULTI-OUTLET SYNC
              </span>
            </div>
          </div>

          <div className="absolute top-2 right-2 sm:-top-3 sm:-right-3 w-20 h-20 rounded-full bg-[#F95721] text-white shadow-xl shadow-[#F95721]/35 flex flex-col items-center justify-center text-center p-2 border-2 border-white animate-pulse">
            <span className="text-lg sm:text-xl font-black font-display leading-none">1 QR</span>
            <span className="text-[9px] font-black uppercase tracking-wider leading-none mt-0.5">3 OUTLETS</span>
          </div>

        </div>

      </div>

      {/* Feature Row Bar */}
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
          <span className="truncate">1 Unified Cart & Pay</span>
        </div>

        <div className="flex items-center gap-2 text-[#4D443D] font-bold bg-white/60 p-2.5 rounded-xl border border-white/80">
          <div className="w-6 h-6 rounded-lg bg-[#FFF2EB] text-[#F95721] flex items-center justify-center shrink-0">
            <Bike className="w-3.5 h-3.5" />
          </div>
          <span className="truncate">Delivered to Table A17</span>
        </div>

        <div className="flex items-center gap-2 text-[#4D443D] font-bold bg-white/60 p-2.5 rounded-xl border border-white/80">
          <div className="w-6 h-6 rounded-lg bg-[#FFF2EB] text-[#F95721] flex items-center justify-center shrink-0">
            <Clock className="w-3.5 h-3.5" />
          </div>
          <span className="truncate">Queue & Wait Forecast</span>
        </div>
      </div>

    </div>
  );
};
