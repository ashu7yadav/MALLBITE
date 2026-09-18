import React from 'react';
import { LayoutGrid, Clock, Flame, Sparkles } from 'lucide-react';

export const FOOD_CATEGORIES = [
  { id: 'all', label: 'All', iconType: 'grid' },
  { id: 'south', label: 'South Indian', icon: '🥞' },
  { id: 'burgers', label: 'Burgers & Wraps', icon: '🍔' },
  { id: 'pizzas', label: 'Pizzas', icon: '🍕' },
  { id: 'biryani', label: 'Biryani & Thali', icon: '🍛' },
  { id: 'beverages', label: 'Beverages', icon: '🥤' },
  { id: 'desserts', label: 'Desserts', icon: '🍰' }
];

export const WhatWouldYouLikeToEat = ({ 
  selectedCategory = 'all', 
  onSelectCategory,
  selectedMaxWait = null,
  onSelectMaxWait,
  onOpenAiRecommend
}) => {
  return (
    <div className="space-y-3.5 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-lg sm:text-xl font-black text-[#2A2521] font-display tracking-tight">
            What would you like to eat?
          </h3>
          <p className="text-xs text-[#8E857C] font-medium mt-0.5">
            Filter by cuisine or use queue-aware maximum waiting limits
          </p>
        </div>

        {onOpenAiRecommend && (
          <button
            onClick={onOpenAiRecommend}
            className="self-start sm:self-auto flex items-center gap-1.5 bg-[#FFF4EC] hover:bg-[#FFE8D6] text-[#F95721] px-3 py-1.5 rounded-xl text-xs font-black border border-[#F6DEC9] transition-all shadow-2xs shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>AI Food Advisor</span>
          </button>
        )}
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {FOOD_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-black transition-all shrink-0 active:scale-95 ${
                isSelected
                  ? 'bg-[#F95721] text-white shadow-md shadow-[#F95721]/30 font-black'
                  : 'bg-white border border-[#EFE8DE] text-[#4F463E] hover:bg-[#FAF4EB]'
              }`}
            >
              {cat.iconType === 'grid' ? (
                <LayoutGrid className="w-3.5 h-3.5 text-white" />
              ) : (
                <span className="text-sm">{cat.icon}</span>
              )}
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Feature 4: "Can I get this in 15 minutes?" Wait Time Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
        <span className="text-[11px] font-black uppercase text-[#8E857C] shrink-0 flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-[#F95721]" />
          <span>Max Wait:</span>
        </span>

        {[
          { id: null, label: 'Any Time' },
          { id: 10, label: '⚡ Ready in ≤ 10 mins' },
          { id: 15, label: '⏱️ Can I get this in 15 mins?' },
          { id: 20, label: '⏱️ ≤ 20 mins' }
        ].map(filter => {
          const isActive = selectedMaxWait === filter.id;
          return (
            <button
              key={String(filter.id)}
              onClick={() => onSelectMaxWait && onSelectMaxWait(filter.id)}
              className={`px-3 py-1 rounded-xl text-[11px] font-extrabold transition-all shrink-0 border ${
                isActive
                  ? 'bg-[#2A2521] text-white border-[#2A2521] shadow-xs'
                  : 'bg-[#FAF7F2] text-[#6F665D] border-[#EFE8DE] hover:bg-[#FAF4EB]'
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

    </div>
  );
};
