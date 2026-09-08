import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMall } from '../../context/MallContext';

export const FoodCategoryCarousel = ({ selectedCategory, onSelectCategory }) => {
  const { categories } = useMall();
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-10">
      {/* Header & Controls (Matches Swiggy Screenshot) */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
            What's on your mind?
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Cuisines & food categories available right now in Phoenix Food Court
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors shadow-sm"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors shadow-sm"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Circular Carousel */}
      <div
        ref={scrollRef}
        className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-2 px-1 scroll-smooth"
      >
        {/* 'All' option */}
        <button
          onClick={() => onSelectCategory('all')}
          className={`flex flex-col items-center gap-2 shrink-0 group focus:outline-none transition-transform active:scale-95`}
        >
          <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center p-1 border-2 transition-all shadow-sm ${selectedCategory === 'all' ? 'border-brand-500 ring-4 ring-brand-100 bg-brand-50' : 'border-slate-200 bg-white group-hover:border-brand-300'}`}>
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-brand-500 to-amber-400 flex items-center justify-center text-white font-black text-sm tracking-tight shadow-inner">
              ALL
            </div>
          </div>
          <span className={`text-xs font-bold transition-colors ${selectedCategory === 'all' ? 'text-brand-600' : 'text-slate-700 group-hover:text-brand-500'}`}>
            All Food
          </span>
        </button>

        {/* Dynamic Category Circles */}
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.name;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.name)}
              className="flex flex-col items-center gap-2 shrink-0 group focus:outline-none transition-transform active:scale-95"
            >
              <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden p-1 border-2 transition-all shadow-sm ${isSelected ? 'border-brand-500 ring-4 ring-brand-100' : 'border-slate-200 bg-white group-hover:border-brand-300'}`}>
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span className={`text-xs font-bold text-center max-w-[90px] truncate transition-colors ${isSelected ? 'text-brand-600 font-extrabold' : 'text-slate-700 group-hover:text-brand-500'}`}>
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
