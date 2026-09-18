import React from 'react';
import { ShieldCheck, Tag, Sparkles, Headphones, Bike } from 'lucide-react';
import { useMall } from '../../context/MallContext';

export const TrustAndDeliveryBanners = () => {
  const { currentTable } = useMall();

  return (
    <div className="space-y-4">
      {/* 1. Trust Badges Row (Exact match to design) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        
        {/* Safe & Secure */}
        <div className="bg-white rounded-2xl p-3.5 border border-[#EFE8DE] shadow-xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#FFF2EB] text-[#F95721] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h5 className="font-extrabold text-xs text-[#2A2521] leading-tight">Safe & Secure</h5>
            <p className="text-[10px] text-[#8E857C] font-medium leading-tight">100% secure payments</p>
          </div>
        </div>

        {/* Best Prices */}
        <div className="bg-white rounded-2xl p-3.5 border border-[#EFE8DE] shadow-xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#FFF2EB] text-[#F95721] flex items-center justify-center shrink-0">
            <Tag className="w-5 h-5" />
          </div>
          <div>
            <h5 className="font-extrabold text-xs text-[#2A2521] leading-tight">Best Prices</h5>
            <p className="text-[10px] text-[#8E857C] font-medium leading-tight">Great deals every day</p>
          </div>
        </div>

        {/* Hygienic Food */}
        <div className="bg-white rounded-2xl p-3.5 border border-[#EFE8DE] shadow-xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#FFF2EB] text-[#F95721] flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h5 className="font-extrabold text-xs text-[#2A2521] leading-tight">Hygienic Food</h5>
            <p className="text-[10px] text-[#8E857C] font-medium leading-tight">Quality you can trust</p>
          </div>
        </div>

        {/* 24/7 Support */}
        <div className="bg-white rounded-2xl p-3.5 border border-[#EFE8DE] shadow-xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#FFF2EB] text-[#F95721] flex items-center justify-center shrink-0">
            <Headphones className="w-5 h-5" />
          </div>
          <div>
            <h5 className="font-extrabold text-xs text-[#2A2521] leading-tight">24/7 Support</h5>
            <p className="text-[10px] text-[#8E857C] font-medium leading-tight">We're here to help</p>
          </div>
        </div>

      </div>

      {/* 2. We'll Deliver to Your Table Banner (Exact match to design) */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#F6EEE3] via-[#FAF4EA] to-[#F5ECE0] p-6 sm:p-7 border border-[#EADFCF] shadow-xs overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Left: Scooter Delivery Runner Illustration */}
        <div className="flex items-center gap-5">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 bg-white rounded-2xl p-2.5 shadow-sm border border-[#E8DDCF] flex items-center justify-center">
            <svg viewBox="0 0 64 64" fill="none" className="w-full h-full text-[#F95721]">
              <circle cx="18" cy="46" r="8" fill="#F95721" fillOpacity="0.2" stroke="#F95721" strokeWidth="3" />
              <circle cx="48" cy="46" r="8" fill="#F95721" fillOpacity="0.2" stroke="#F95721" strokeWidth="3" />
              <path d="M18 46h30" stroke="#F95721" strokeWidth="3" strokeLinecap="round" />
              <path d="M30 46l-6-16h-8" stroke="#F95721" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M42 46l-8-22h12l4 10h4" stroke="#F95721" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="34" cy="14" r="5" fill="#2A2521" />
              <path d="M22 20h10v10H22z" fill="#F95721" rx="2" />
            </svg>
          </div>

          <div className="space-y-1 text-left">
            <h4 className="text-lg sm:text-xl font-black text-[#2A2521] font-display">
              We'll deliver to your table
            </h4>
            <p className="text-xs sm:text-sm text-[#6F665D] font-medium max-w-md">
              Relax and enjoy your time at <strong className="text-[#F95721]">Table {currentTable.number || "A12"}</strong>. We'll take care of the rest!
            </p>
          </div>
        </div>

        {/* Right: Botanical Organic Leaf Accent */}
        <div className="hidden md:flex items-center gap-1 text-[#4E8752] opacity-80 shrink-0">
          <svg viewBox="0 0 100 100" className="w-20 h-20 fill-current">
            <path d="M50 10 C30 30 20 60 40 85 C65 65 75 35 50 10 Z" fillOpacity="0.15" />
            <path d="M40 85 C45 60 55 40 50 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M43 70 C48 65 52 64 54 62" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M47 50 C52 46 56 45 58 43" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>

      </div>
    </div>
  );
};
