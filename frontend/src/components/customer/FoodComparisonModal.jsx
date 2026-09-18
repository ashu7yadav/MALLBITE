import React, { useState } from 'react';
import { 
  X, 
  Scale, 
  Sparkles, 
  Clock, 
  Star, 
  Check, 
  Plus, 
  Award,
  ArrowRight
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useMall } from '../../context/MallContext';

export const FoodComparisonModal = ({ isOpen, onClose }) => {
  const { addToCart } = useCart();
  const { addNotification } = useMall();
  const [activeCategory, setActiveCategory] = useState('paneer'); // paneer | burger | dosa | shakes

  if (!isOpen) return null;

  const comparisonDatasets = {
    paneer: {
      title: "Paneer Specialty Comparison",
      tagline: "Comparing popular paneer options across food court outlets",
      bestMatchId: "b1",
      items: [
        {
          id: "p2",
          name: "Paneer Tikka Woodfired Pizza",
          outlet: "Pizza Hub",
          counter: "FC-02",
          price: 249,
          time: "20 min",
          rating: 4.8,
          portion: "8-inch pizza (serves 1-2)",
          dietary: "Veg • Dairy",
          image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300&auto=format&fit=crop&q=80",
          matchScore: 84
        },
        {
          id: "b1",
          name: "Spiced Paneer Tikka Wrap",
          outlet: "Food Corner",
          counter: "FC-04",
          price: 149,
          time: "8 min",
          rating: 4.7,
          portion: "Layered paratha roll",
          dietary: "Veg • High Protein",
          image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=300&auto=format&fit=crop&q=80",
          matchScore: 94,
          bestTag: "Best Overall Match (Fastest & Value)"
        },
        {
          id: "sp1",
          name: "Hyderabadi Dum Paneer Biryani",
          outlet: "Spice Route",
          counter: "FC-05",
          price: 219,
          time: "14 min",
          rating: 4.7,
          portion: "Royal Handi + Raita",
          dietary: "Veg • Rice Special",
          image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300&auto=format&fit=crop&q=80",
          matchScore: 88
        }
      ]
    },
    burger: {
      title: "Quick Bite & Burgers Comparison",
      tagline: "Fast food options ranked by preparation speed and cost",
      bestMatchId: "b2",
      items: [
        {
          id: "b2",
          name: "Crispy Veg Burger Combo",
          outlet: "Food Corner",
          counter: "FC-04",
          price: 199,
          time: "10 min",
          rating: 4.6,
          portion: "Burger + Fries + Beverage",
          dietary: "Veg Meal",
          image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&auto=format&fit=crop&q=80",
          matchScore: 92,
          bestTag: "Best Meal Value"
        },
        {
          id: "b3",
          name: "Crunchy Veggie Delight",
          outlet: "Food Corner",
          counter: "FC-04",
          price: 159,
          time: "7 min",
          rating: 4.5,
          portion: "A la carte burger",
          dietary: "Veg",
          image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=300&auto=format&fit=crop&q=80",
          matchScore: 86
        }
      ]
    },
    shakes: {
      title: "Chilled Shakes & Coffees",
      tagline: "Fast refreshing beverages delivered directly to table",
      bestMatchId: "j1",
      items: [
        {
          id: "j1",
          name: "Alphonso Mango Shake",
          outlet: "Juice Bar",
          counter: "FC-01",
          price: 89,
          time: "4 min",
          rating: 4.8,
          portion: "350ml thick shake",
          dietary: "Pure Fruit & Dairy",
          image: "https://images.unsplash.com/photo-1546173159-315724a31696?w=300&auto=format&fit=crop&q=80",
          matchScore: 96,
          bestTag: "Top Rated Beverage"
        },
        {
          id: "j2",
          name: "Classic Frappe Cold Coffee",
          outlet: "Juice Bar",
          counter: "FC-01",
          price: 99,
          time: "4 min",
          rating: 4.8,
          portion: "350ml espresso frappe",
          dietary: "Coffee & Cream",
          image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=300&auto=format&fit=crop&q=80",
          matchScore: 91
        },
        {
          id: "s4",
          name: "Madras Filter Coffee",
          outlet: "South Kitchen",
          counter: "FC-03",
          price: 49,
          time: "3 min",
          rating: 4.9,
          portion: "Traditional brass dabarah",
          dietary: "Hot Beverage",
          image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&auto=format&fit=crop&q=80",
          matchScore: 93
        }
      ]
    }
  };

  const currentSet = comparisonDatasets[activeCategory] || comparisonDatasets.paneer;

  const handleAdd = (item) => {
    addToCart({
      id: `compare-${item.id}`,
      name: item.name,
      price: item.price,
      restaurantName: item.outlet,
      image: item.image,
      isVeg: true
    });
    addNotification("Added from Comparison", `${item.name} added to your cart`, "success");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FAF7F2] rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-[#EFE8DE] overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#2A2521] text-white p-5 sm:p-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F95721] text-white flex items-center justify-center shadow-md shadow-[#F95721]/30">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black font-display text-white">
                  Food Comparison Engine
                </h3>
                <span className="bg-[#FFF2EB] text-[#F95721] text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                  AI Matched
                </span>
              </div>
              <p className="text-xs text-[#C5BCB2] mt-0.5 font-medium">
                Side-by-side comparison across price, prep time and AI affinity
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-[#C5BCB2] hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Category Switcher Tabs */}
        <div className="p-4 bg-white border-b border-[#EFE8DE] flex items-center gap-2 overflow-x-auto shrink-0">
          {[
            { id: 'paneer', label: '🧀 Paneer Dishes' },
            { id: 'burger', label: '🍔 Burgers & Combos' },
            { id: 'shakes', label: '🥤 Shakes & Beverages' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all shrink-0 ${
                activeCategory === tab.id
                  ? 'bg-[#F95721] text-white shadow-xs'
                  : 'bg-[#FAF7F2] text-[#6F665D] hover:bg-[#F6DEC9]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Table / Cards */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          
          <div className="text-left mb-2">
            <h4 className="text-base font-black text-[#2A2521] font-display">{currentSet.title}</h4>
            <p className="text-xs text-[#6F665D] mt-0.5">{currentSet.tagline}</p>
          </div>

          {/* Desktop Side-by-Side Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentSet.items.map((item) => {
              const isBest = item.id === currentSet.bestMatchId;
              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-2xl p-4 border transition-all flex flex-col justify-between relative shadow-xs ${
                    isBest 
                      ? 'border-[#F95721] ring-2 ring-[#F95721]/20' 
                      : 'border-[#EFE8DE]'
                  }`}
                >
                  {isBest && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#F95721] text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1 whitespace-nowrap">
                      <Award className="w-3 h-3" />
                      <span>{item.bestTag || 'Best Recommendation'}</span>
                    </div>
                  )}

                  <div className="space-y-3 pt-1">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-28 rounded-xl object-cover border border-[#EFE8DE]"
                    />

                    <div>
                      <span className="text-[10px] font-bold text-[#8E857C] uppercase tracking-wider block">
                        {item.outlet} • {item.counter}
                      </span>
                      <h5 className="text-sm font-black text-[#2A2521] mt-0.5 font-display line-clamp-2">
                        {item.name}
                      </h5>
                    </div>

                    <div className="bg-[#FAF7F2] p-3 rounded-xl space-y-1.5 text-xs text-[#6F665D]">
                      <div className="flex items-center justify-between font-bold">
                        <span>Price:</span>
                        <span className="text-[#2A2521] font-black text-sm">₹{item.price}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Prep Time:</span>
                        <span className="text-[#F95721] font-bold flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {item.time}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Rating:</span>
                        <span className="font-bold flex items-center gap-1 text-[#2A2521]">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          {item.rating}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>AI Affinity:</span>
                        <span className="text-emerald-700 font-black">
                          {item.matchScore}% Match
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAdd(item)}
                    className={`mt-4 w-full py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all ${
                      isBest
                        ? 'bg-[#F95721] hover:bg-[#EA580C] text-white shadow-md shadow-[#F95721]/20'
                        : 'bg-white hover:bg-[#FAF4EB] text-[#2A2521] border border-[#EFE8DE]'
                    }`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </button>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
};
