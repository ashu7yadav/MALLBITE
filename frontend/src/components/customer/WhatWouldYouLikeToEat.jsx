import React from 'react';
import { LayoutGrid, MoreHorizontal } from 'lucide-react';

export const FOOD_CATEGORIES = [
  { id: 'all', label: 'All', iconType: 'grid' },
  { id: 'burgers', label: 'Burgers', icon: '🍔' },
  { id: 'pizzas', label: 'Pizzas', icon: '🍕' },
  { id: 'bowls', label: 'Bowls', icon: '🥗' },
  { id: 'beverages', label: 'Beverages', icon: '🥤' },
  { id: 'desserts', label: 'Desserts', icon: '🍰' },
  { id: 'salads', label: 'Salads', icon: '🥗' },
  { id: 'more', label: 'More', iconType: 'more' }
];

export const WhatWouldYouLikeToEat = ({ selectedCategory = 'all', onSelectCategory }) => {
  return (
    <div className="space-y-3">
      <h3 className="text-lg sm:text-xl font-black text-[#2A2521] font-display tracking-tight text-left">
        What would you like to eat?
      </h3>

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
              ) : cat.iconType === 'more' ? (
                <MoreHorizontal className="w-3.5 h-3.5 text-[#7A7167]" />
              ) : (
                <span className="text-sm">{cat.icon}</span>
              )}
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
