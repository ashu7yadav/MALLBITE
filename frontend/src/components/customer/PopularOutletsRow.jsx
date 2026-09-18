import React from 'react';
import { Star, Clock, ChevronRight, Truck, Users } from 'lucide-react';
import { useMall } from '../../context/MallContext';

export const POPULAR_OUTLETS_DATA = [
  {
    id: "rest-pizza",
    name: "Pizza Hub",
    category: "Pizzas • Italian",
    rating: 4.7,
    prepTime: "18-22 mins",
    logoImage: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=200&auto=format&fit=crop&q=80",
    bgColor: "#D85E29",
    initials: "PIZZA HUB"
  },
  {
    id: "rest-south",
    name: "South Kitchen",
    category: "South Indian • Dosas",
    rating: 4.8,
    prepTime: "7-10 mins",
    logoImage: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=200&auto=format&fit=crop&q=80",
    bgColor: "#4E8752",
    initials: "SOUTH KITCHEN"
  },
  {
    id: "rest-burger",
    name: "Food Corner",
    category: "Burgers & Wraps",
    rating: 4.6,
    prepTime: "9-12 mins",
    logoImage: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&auto=format&fit=crop&q=80",
    bgColor: "#1E2221",
    initials: "FOOD CORNER"
  },
  {
    id: "rest-juice",
    name: "Juice Bar",
    category: "Beverages & Shakes",
    rating: 4.8,
    prepTime: "4-6 mins",
    logoImage: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=200&auto=format&fit=crop&q=80",
    bgColor: "#E26227",
    initials: "JUICE BAR"
  },
  {
    id: "rest-spice",
    name: "Spice Route",
    category: "Biryani & Thalis",
    rating: 4.5,
    prepTime: "14-16 mins",
    logoImage: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200&auto=format&fit=crop&q=80",
    bgColor: "#9C413D",
    initials: "SPICE ROUTE"
  },
  {
    id: "rest-dessert",
    name: "Dessert Lab",
    category: "Waffles & Desserts",
    rating: 4.9,
    prepTime: "6-8 mins",
    logoImage: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=200&auto=format&fit=crop&q=80",
    bgColor: "#5C3A21",
    initials: "DESSERT LAB"
  }
];

export const PopularOutletsRow = ({ onSelectOutlet, onViewAll }) => {
  const { restaurants, outletQueues } = useMall();

  // If dynamic restaurants are loaded, use them with queue details
  const displayOutlets = restaurants && restaurants.length > 0 ? restaurants : POPULAR_OUTLETS_DATA;

  return (
    <div className="space-y-3.5 text-left">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg sm:text-xl font-black text-[#2A2521] font-display tracking-tight">
            Popular Food Outlets
          </h3>
          <p className="text-xs text-[#8E857C] font-medium mt-0.5">
            Real-time queue prediction & wait times at food court counters
          </p>
        </div>
        <button
          onClick={onViewAll}
          className="flex items-center gap-1 text-xs font-black text-[#F95721] hover:text-[#EA580C] transition-colors shrink-0"
        >
          <span>View All</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Horizontal Outlets Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {displayOutlets.map((outlet) => {
          // Find matching queue data if available
          const qData = outletQueues?.find(q => q.outletId === outlet.id || q.outletName?.toLowerCase() === outlet.name?.toLowerCase()) || {
            queueLevel: outlet.id === 'rest-pizza' ? 'high' : outlet.id === 'rest-south' || outlet.id === 'rest-juice' ? 'low' : 'medium',
            queueColor: outlet.id === 'rest-pizza' ? '#EF4444' : outlet.id === 'rest-south' || outlet.id === 'rest-juice' ? '#10B981' : '#F59E0B',
            queueBadge: outlet.id === 'rest-pizza' ? 'High Queue' : outlet.id === 'rest-south' || outlet.id === 'rest-juice' ? 'Low Queue' : 'Moderate',
            estimatedWaitMinutes: outlet.id === 'rest-pizza' ? 18 : outlet.id === 'rest-south' ? 7 : outlet.id === 'rest-juice' ? 4 : 9,
            activeQueueOrders: outlet.id === 'rest-pizza' ? 23 : outlet.id === 'rest-south' ? 6 : outlet.id === 'rest-juice' ? 4 : 14
          };

          return (
            <div
              key={outlet.id}
              onClick={() => onSelectOutlet && onSelectOutlet(outlet)}
              className="bg-white rounded-2xl p-3.5 border border-[#EFE8DE] hover:border-[#F95721]/50 shadow-xs hover:shadow-md transition-all cursor-pointer text-center flex flex-col items-center justify-between group relative overflow-hidden"
            >
              {/* Live Queue Color Indicator Bar at top */}
              <div 
                className="absolute top-0 left-0 right-0 h-1"
                style={{ backgroundColor: qData.queueColor }}
              />

              {/* Circular Brand Avatar */}
              <div className="w-14 h-14 rounded-2xl overflow-hidden mb-2 p-0.5 border border-[#EFE8DE] shadow-xs group-hover:scale-105 transition-transform bg-[#FAF7F2]">
                <img
                  src={outlet.logoImage || "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&auto=format&fit=crop&q=80"}
                  alt={outlet.name}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              {/* Name & Category */}
              <div className="w-full">
                <h4 className="font-black text-xs text-[#2A2521] truncate font-display group-hover:text-[#F95721] transition-colors">
                  {outlet.name}
                </h4>
                <p className="text-[10px] text-[#8E857C] font-medium truncate">
                  {outlet.category?.split('•')[0] || 'Fast Food'}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center justify-center gap-1 text-[10px] font-bold text-[#554C44] mt-1 pt-1 border-t border-[#F2ECE2] w-full">
                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                <span className="font-black text-[#2A2521]">{outlet.rating || 4.7}</span>
              </div>

              {/* Feature 4: Smart Queue Wait-Time Badge */}
              <div 
                className="mt-2 text-[9px] font-black px-2 py-0.5 rounded-full flex items-center justify-center gap-1 w-full"
                style={{ 
                  backgroundColor: `${qData.queueColor}15`, 
                  color: qData.queueColor,
                  border: `1px solid ${qData.queueColor}30` 
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: qData.queueColor }} />
                <span>{qData.queueBadge}: {qData.estimatedWaitMinutes}m</span>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};
