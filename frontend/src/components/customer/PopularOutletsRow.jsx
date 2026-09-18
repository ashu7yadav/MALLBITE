import React from 'react';
import { Star, Clock, ChevronRight, Truck } from 'lucide-react';

export const POPULAR_OUTLETS_DATA = [
  {
    id: "rest-green-treat",
    name: "Green Treat",
    cuisine: "Vegan",
    rating: 4.6,
    prepTime: "25-35 min",
    deliveryFee: "Free Delivery",
    bgColor: "#527E58",
    iconText: "GREEN TREAT",
    logoImage: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=200&auto=format&fit=crop&q=80"
  },
  {
    id: "rest-vegan-bistro",
    name: "Vegan Bistro",
    cuisine: "Vegan",
    rating: 4.5,
    prepTime: "20-30 min",
    deliveryFee: "Free Delivery",
    bgColor: "#697F4A",
    iconText: "VEGAN BISTRO",
    logoImage: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&auto=format&fit=crop&q=80"
  },
  {
    id: "rest-vegan-bowl",
    name: "The Vegan Bowl",
    cuisine: "Healthy",
    rating: 4.7,
    prepTime: "20-30 min",
    deliveryFee: "Free Delivery",
    bgColor: "#1E2221",
    iconText: "the vegan bowl",
    logoImage: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&auto=format&fit=crop&q=80"
  },
  {
    id: "rest-plant-pizza",
    name: "Plant Pizza",
    cuisine: "Italian",
    rating: 4.4,
    prepTime: "25-35 min",
    deliveryFee: "Free Delivery",
    bgColor: "#D85E29",
    iconText: "PLANT PIZZA",
    logoImage: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&auto=format&fit=crop&q=80"
  },
  {
    id: "rest-vegan-cafe",
    name: "Vegan Café",
    cuisine: "Beverages",
    rating: 4.3,
    prepTime: "15-35 min",
    deliveryFee: "Free Delivery",
    bgColor: "#627E41",
    iconText: "VEGAN CAFÉ",
    logoImage: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=200&auto=format&fit=crop&q=80"
  },
  {
    id: "rest-soul-fresh",
    name: "Soul Fresh",
    cuisine: "Juices & More",
    rating: 4.6,
    prepTime: "15-20 min",
    deliveryFee: "Free Delivery",
    bgColor: "#E26227",
    iconText: "SOUL FRESH",
    logoImage: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=200&auto=format&fit=crop&q=80"
  }
];

export const PopularOutletsRow = ({ onSelectOutlet, onViewAll }) => {
  return (
    <div className="space-y-3.5">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg sm:text-xl font-black text-[#2A2521] font-display tracking-tight">
          Popular Outlets
        </h3>
        <button
          onClick={onViewAll}
          className="flex items-center gap-1 text-xs font-black text-[#F95721] hover:text-[#EA580C] transition-colors"
        >
          <span>View All</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Horizontal Outlets Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {POPULAR_OUTLETS_DATA.map((outlet) => (
          <div
            key={outlet.id}
            onClick={() => onSelectOutlet && onSelectOutlet(outlet)}
            className="bg-white rounded-2xl p-3.5 border border-[#EFE8DE] hover:border-[#F95721]/50 shadow-xs hover:shadow-md transition-all cursor-pointer text-center flex flex-col items-center justify-between group"
          >
            {/* Circular Brand Avatar */}
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-white text-[9px] font-black uppercase text-center p-2 mb-2 shadow-sm transition-transform group-hover:scale-105"
              style={{ backgroundColor: outlet.bgColor }}
            >
              <div className="border border-white/40 rounded-full w-full h-full flex items-center justify-center p-1 leading-tight">
                {outlet.iconText}
              </div>
            </div>

            {/* Name & Cuisine */}
            <div className="w-full">
              <h4 className="font-black text-xs text-[#2A2521] truncate font-display group-hover:text-[#F95721] transition-colors">
                {outlet.name}
              </h4>
              <p className="text-[10px] text-[#8E857C] font-medium truncate">
                {outlet.cuisine}
              </p>
            </div>

            {/* Rating & Prep Time */}
            <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-[#554C44] mt-1.5 pt-1.5 border-t border-[#F2ECE2] w-full">
              <span className="flex items-center gap-0.5 text-amber-600 font-extrabold">
                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                {outlet.rating}
              </span>
              <span className="text-[#A49A8F]">•</span>
              <span className="text-[9px] text-[#7A7167] truncate">{outlet.prepTime}</span>
            </div>

            {/* Free Delivery Pill Badge */}
            <div className="mt-1 text-[9px] font-black text-[#4E8752] bg-[#EEF6EF] px-2 py-0.5 rounded-full flex items-center justify-center gap-1 w-full">
              <Truck className="w-2.5 h-2.5" />
              <span>{outlet.deliveryFee}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
