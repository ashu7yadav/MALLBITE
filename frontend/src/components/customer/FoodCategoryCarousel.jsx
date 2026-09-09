import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Utensils } from 'lucide-react';
import { useMall } from '../../context/MallContext';

export const FoodCategoryCarousel = ({ selectedCategory, onSelectCategory }) => {
  const { categories } = useMall();
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-10">
      {/* Header & Controls */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-950 font-display">
              What's on your mind?
            </h2>
            <span className="bg-brand-100/70 text-brand-700 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider hidden sm:inline-block">
              Food Court Cuisines
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Cuisines & food categories ready to order in Phoenix Mall Food Hub
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="w-9 h-9 rounded-2xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center transition-all shadow-sm hover:scale-105 active:scale-95"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-9 h-9 rounded-2xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center transition-all shadow-sm hover:scale-105 active:scale-95"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Circular Carousel */}
      <div
        ref={scrollRef}
        className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-2.5 px-1 scroll-smooth"
      >
        {/* 'All' option */}
        <button
          onClick={() => onSelectCategory('all')}
          className="flex flex-col items-center gap-2 shrink-0 group focus:outline-none transition-all"
        >
          <div className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center p-1 border-2 transition-all shadow-sm group-hover:scale-105 ${selectedCategory === 'all' ? 'border-brand-500 ring-4 ring-brand-100 bg-brand-50 shadow-md' : 'border-slate-200 bg-white group-hover:border-brand-300'}`}>
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-brand-600 via-brand-500 to-amber-400 flex flex-col items-center justify-center text-white shadow-inner">
              <Utensils className="w-5 h-5 mb-0.5 drop-shadow-sm" />
              <span className="font-black font-display text-xs tracking-wider">ALL</span>
            </div>
          </div>
          <span className={`text-xs font-bold transition-colors ${selectedCategory === 'all' ? 'text-brand-600 font-extrabold' : 'text-slate-700 group-hover:text-brand-500'}`}>
            All Cuisines
          </span>
        </button>

        {/* Dynamic Category Circles */}
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.name;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.name)}
              className="flex flex-col items-center gap-2 shrink-0 group focus:outline-none transition-all"
            >
              <div className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden p-1 border-2 transition-all shadow-sm group-hover:scale-105 ${isSelected ? 'border-brand-500 ring-4 ring-brand-100 shadow-md' : 'border-slate-200 bg-white group-hover:border-brand-300'}`}>
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <span className={`text-xs font-bold text-center max-w-[95px] truncate transition-colors ${isSelected ? 'text-brand-600 font-black' : 'text-slate-700 group-hover:text-brand-500'}`}>
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
