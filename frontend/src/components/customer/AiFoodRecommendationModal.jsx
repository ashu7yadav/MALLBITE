import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  Clock, 
  IndianRupee, 
  CheckCircle2, 
  Flame, 
  Plus, 
  Check, 
  ChevronRight, 
  Filter, 
  SlidersHorizontal,
  ArrowRight,
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';
import { api } from '../../services/api';
import { useCart } from '../../context/CartContext';
import { useMall } from '../../context/MallContext';

export const AiFoodRecommendationModal = ({ isOpen, onClose }) => {
  const { addToCart } = useCart();
  const { addNotification } = useMall();

  // Step 1: Preferences State
  const [budget, setBudget] = useState('150-300'); // under150 | 150-300 | 300-500 | 500+
  const [dietary, setDietary] = useState('veg'); // veg | non-veg | vegan
  const [cuisine, setCuisine] = useState('all'); // all | Indian | Chinese | South Indian | Fast Food | Desserts | Beverages
  const [foodType, setFoodType] = useState('all'); // all | Healthy | High Protein | Spicy | Light | Comfort Food
  const [maxWaitTime, setMaxWaitTime] = useState(15); // 10 | 15 | 20 | 30

  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState(null);
  const [addedIds, setAddedIds] = useState({});

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await api.getAIRecommendations({
        budget,
        dietary,
        cuisine,
        foodType,
        maxWaitTime
      });
      if (res.success && res.data) {
        setRecommendations(res.data);
      }
    } catch (err) {
      console.error(err);
      addNotification("AI Engine Notice", "Using locally weighted multi-attribute recommendations", "info");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (item) => {
    addToCart(item);
    setAddedIds(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedIds(prev => ({ ...prev, [item.id]: false }));
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FAF7F2] rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-[#EFE8DE] overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#2A2521] via-[#38302A] to-[#2A2521] text-white p-5 sm:p-6 flex items-center justify-between relative shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#F95721] to-[#F59E0B] flex items-center justify-center text-white shadow-lg shadow-[#F95721]/30">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black font-display tracking-tight text-white">
                  What should I eat?
                </h3>
                <span className="bg-[#F95721] text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs">
                  AI Engine
                </span>
              </div>
              <p className="text-xs text-[#C5BCB2] mt-0.5 font-medium">
                Weighted multi-attribute food discovery across all food court outlets
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

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* Input Form Controls */}
          {!recommendations ? (
            <div className="space-y-5">
              
              {/* 1. Budget Question */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-[#6F665D] flex items-center gap-1.5">
                  <span>1. Select Your Budget</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'under150', label: 'Under ₹150', desc: 'Pocket friendly' },
                    { id: '150-300', label: '₹150 – ₹300', desc: 'Standard meal' },
                    { id: '300-500', label: '₹300 – ₹500', desc: 'Combo platter' },
                    { id: '500+', label: '₹500+', desc: 'Feast & groups' }
                  ].map(b => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setBudget(b.id)}
                      className={`p-3 rounded-2xl text-left border transition-all ${
                        budget === b.id 
                          ? 'bg-[#2A2521] text-white border-[#2A2521] shadow-md font-bold' 
                          : 'bg-white text-[#4A4138] border-[#EFE8DE] hover:bg-[#FAF4EB]'
                      }`}
                    >
                      <div className="text-xs font-black">{b.label}</div>
                      <div className={`text-[10px] mt-0.5 ${budget === b.id ? 'text-white/70' : 'text-[#8E857C]'}`}>{b.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Dietary Preference */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-[#6F665D]">
                  2. Dietary Preference
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'veg', label: '🥦 Vegetarian', desc: 'Pure vegetarian dishes' },
                    { id: 'non-veg', label: '🍗 Non-Vegetarian', desc: 'Chicken, meat & eggs' },
                    { id: 'vegan', label: '🌱 Vegan', desc: 'Plant-based & dairy-free' }
                  ].map(d => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setDietary(d.id)}
                      className={`p-3 rounded-2xl text-left border transition-all ${
                        dietary === d.id 
                          ? 'bg-[#4E8752] text-white border-[#4E8752] shadow-md font-bold' 
                          : 'bg-white text-[#4A4138] border-[#EFE8DE] hover:bg-[#FAF4EB]'
                      }`}
                    >
                      <div className="text-xs font-black">{d.label}</div>
                      <div className={`text-[10px] mt-0.5 ${dietary === d.id ? 'text-white/80' : 'text-[#8E857C]'}`}>{d.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Preferred Cuisine */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-[#6F665D]">
                  3. Cuisine Style
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'all', label: 'Any Cuisine' },
                    { id: 'South Indian', label: '🥞 South Indian' },
                    { id: 'Fast Food', label: '🍔 Fast Food / Burgers' },
                    { id: 'Indian', label: '🍛 North Indian / Biryani' },
                    { id: 'Pizzas', label: '🍕 Pizzas & Breads' },
                    { id: 'Beverages', label: '🥤 Beverages / Shakes' },
                    { id: 'Desserts', label: '🍰 Desserts / Waffles' }
                  ].map(c => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCuisine(c.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                        cuisine === c.id
                          ? 'bg-[#F95721] text-white border-[#F95721] shadow-xs font-black'
                          : 'bg-white text-[#4A4138] border-[#EFE8DE] hover:bg-[#FAF4EB]'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Food Mood / Type */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-[#6F665D]">
                  4. Mood / Food Type
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {['Healthy', 'High Protein', 'Spicy', 'Light', 'Comfort Food'].map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFoodType(foodType === type ? 'all' : type)}
                      className={`p-2.5 rounded-xl text-center text-xs font-bold border transition-all ${
                        foodType === type 
                          ? 'bg-[#2A2521] text-white border-[#2A2521] font-black' 
                          : 'bg-white text-[#4A4138] border-[#EFE8DE] hover:bg-[#FAF4EB]'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* 5. Max Waiting Time Limit */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black uppercase tracking-wider text-[#6F665D] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#F95721]" />
                    <span>5. Maximum Waiting Time</span>
                  </label>
                  <span className="text-xs font-black text-[#F95721] bg-[#FFF4EC] px-2 py-0.5 rounded-md border border-[#F6DEC9]">
                    Max {maxWaitTime} mins
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[10, 15, 20, 30].map(mins => (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => setMaxWaitTime(mins)}
                      className={`py-2.5 rounded-xl text-center text-xs font-black border transition-all ${
                        maxWaitTime === mins
                          ? 'bg-[#F95721] text-white border-[#F95721] shadow-xs'
                          : 'bg-white text-[#4A4138] border-[#EFE8DE] hover:bg-[#FAF4EB]'
                      }`}
                    >
                      {mins} mins
                    </button>
                  ))}
                </div>
              </div>

              {/* Transparency Notice */}
              <div className="bg-white p-3.5 rounded-2xl border border-[#EFE8DE] flex items-start gap-2.5 text-xs text-[#6F665D]">
                <Info className="w-4 h-4 text-[#F95721] shrink-0 mt-0.5" />
                <p className="leading-relaxed text-[11px]">
                  <strong>Scoring Model:</strong> Weighted synthesis of Budget (25%), Dietary fit (20%), Cuisine match (15%), Prep time limit (15%), Food mood (15%), and Outlet rating (10%).
                </p>
              </div>

              {/* Action Button */}
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full bg-[#F95721] hover:bg-[#EA580C] text-white font-black text-sm py-3.5 px-6 rounded-2xl shadow-lg shadow-[#F95721]/30 transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2 font-display"
              >
                {loading ? (
                  <span>Calculating Recommendation Scores...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate AI Food Recommendations</span>
                  </>
                )}
              </button>

            </div>
          ) : (
            /* Results View */
            <div className="space-y-4">
              
              {/* Parameters Summary Bar */}
              <div className="bg-white p-3.5 rounded-2xl border border-[#EFE8DE] flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 overflow-x-auto text-[#6F665D] font-bold">
                  <span className="bg-[#FAF4EB] text-[#F95721] px-2.5 py-1 rounded-lg border border-[#F6DEC9]">
                    ₹{budget.replace('under', '<')}
                  </span>
                  <span className="bg-[#FAF4EB] text-[#4E8752] px-2.5 py-1 rounded-lg border border-[#E0EBDC]">
                    {dietary.toUpperCase()}
                  </span>
                  <span className="bg-[#FAF4EB] text-[#2A2521] px-2.5 py-1 rounded-lg border border-[#EFE8DE]">
                    ⏱️ ≤ {maxWaitTime}m
                  </span>
                  {cuisine !== 'all' && (
                    <span className="bg-[#FAF4EB] text-[#2A2521] px-2.5 py-1 rounded-lg border border-[#EFE8DE]">
                      {cuisine}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => setRecommendations(null)}
                  className="text-xs font-black text-[#F95721] hover:underline shrink-0"
                >
                  Edit Filters
                </button>
              </div>

              {/* Recommendation Cards */}
              <div className="space-y-3">
                {recommendations.slice(0, 5).map((item, idx) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl p-4 border border-[#EFE8DE] hover:border-[#F95721]/40 transition-all shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-3.5 min-w-0">
                      
                      {/* Rank Indicator */}
                      <div className="w-8 h-8 rounded-xl bg-[#FFF4EC] text-[#F95721] font-black text-sm flex items-center justify-center shrink-0 border border-[#F6DEC9]">
                        #{idx + 1}
                      </div>

                      {/* Item Image */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover shrink-0 border border-[#EFE8DE]"
                      />

                      {/* Details */}
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-black text-sm text-[#2A2521] truncate font-display">
                            {item.name}
                          </h4>
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full">
                            {item.matchPercentage}% Match
                          </span>
                        </div>

                        <p className="text-xs text-[#6F665D] mt-0.5 font-medium">
                          {item.outletName || item.restaurantName} • {item.counterNumber || 'FC-01'}
                        </p>

                        <div className="flex items-center gap-3 mt-1.5 text-[11px] font-bold text-[#8E857C]">
                          <span className="text-[#2A2521] font-black text-sm">₹{item.price}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1 text-[#F95721]">
                            <Clock className="w-3 h-3" />
                            {item.prepTimeNum || 10} min prep
                          </span>
                          <span>•</span>
                          <span>⭐ {item.rating || 4.7}</span>
                        </div>

                        {item.recommendationReason && (
                          <div className="mt-1 text-[11px] font-semibold text-[#4E8752] flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>{item.recommendationReason}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Add Button */}
                    <div className="shrink-0 w-full sm:w-auto">
                      <button
                        onClick={() => handleAddToCart(item)}
                        className={`w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-black transition-all ${
                          addedIds[item.id]
                            ? 'bg-emerald-600 text-white'
                            : 'bg-[#F95721] hover:bg-[#EA580C] text-white shadow-md shadow-[#F95721]/20 active:scale-95'
                        }`}
                      >
                        {addedIds[item.id] ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Added!</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" />
                            <span>Add to Cart</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
