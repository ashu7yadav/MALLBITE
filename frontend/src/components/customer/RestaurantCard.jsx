import React from 'react';
import { Star, Clock, MapPin, Tag, ChevronRight } from 'lucide-react';

export const RestaurantCard = ({ restaurant, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(restaurant)}
      className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-soft hover:shadow-elevated transition-all duration-300 cursor-pointer flex flex-col hover:-translate-y-1"
    >
      {/* Top Banner Image with Swiggy-Style Offer Overlay */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={restaurant.bannerImage}
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Counter Number Badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-slate-800 shadow-sm flex items-center gap-1">
          <MapPin className="w-3 h-3 text-brand-500" />
          <span>{restaurant.counterNumber}</span>
        </div>

        {/* Offer Tag Overlay at Bottom of Image (Matches Swiggy Screenshot) */}
        {restaurant.offerTag && (
          <div className="absolute bottom-2.5 left-3 right-3 flex items-center gap-1.5 text-white">
            <span className="text-base sm:text-lg font-black tracking-tight drop-shadow-md text-amber-300">
              {restaurant.offerTag}
            </span>
          </div>
        )}
      </div>

      {/* Restaurant Details Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title & Star Rating */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-extrabold text-base sm:text-lg text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-1">
              {restaurant.name}
            </h3>
            <div className="flex items-center gap-1 bg-emerald-600 text-white px-2 py-0.5 rounded-lg text-xs font-bold shrink-0 shadow-sm">
              <Star className="w-3 h-3 fill-white" />
              <span>{restaurant.rating}</span>
            </div>
          </div>

          {/* Prep Time & Price for Two */}
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 mt-1">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{restaurant.prepTime}</span>
            </div>
            <span>•</span>
            <span className="text-slate-500 font-medium">{restaurant.priceForTwo} for two</span>
          </div>

          {/* Cuisines */}
          <p className="text-xs text-slate-500 line-clamp-1 mt-1.5 font-medium">
            {restaurant.category}
          </p>
        </div>

        {/* Action Bar */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-brand-600">
          <span>View Menu & Order</span>
          <div className="w-6 h-6 rounded-full bg-brand-50 group-hover:bg-brand-500 group-hover:text-white flex items-center justify-center transition-colors">
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
};
