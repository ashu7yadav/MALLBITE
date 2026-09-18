import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Sparkles, 
  X, 
  Plus, 
  Check, 
  Clock, 
  Star, 
  Filter, 
  ArrowUpDown 
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useMall } from '../../context/MallContext';
import { api } from '../../services/api';

export const SmartAISearch = ({ isOpen, onClose }) => {
  const { addToCart } = useCart();
  const { addNotification } = useMall();
  const [prompt, setPrompt] = useState('');
  const [results, setResults] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  // Filters & Sort State (Feature 13)
  const [sortBy, setSortBy] = useState('recommended'); // recommended | cheapest | fastest | highest_rated
  const [filterVegOnly, setFilterVegOnly] = useState(false);
  const [filterMaxWait, setFilterMaxWait] = useState(null); // null | 10 | 15 | 20
  const [filterMaxPrice, setFilterMaxPrice] = useState(null); // null | 150 | 250

  if (!isOpen) return null;

  const handleSearch = async (queryText) => {
    const q = queryText !== undefined ? queryText : prompt;
    if (!q.trim()) return;

    setLoading(true);
    try {
      const res = await api.smartSearch(q);
      if (res.success) {
        setResults(res.data);
        setAnalysis(res.queryAnalysis);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const samplePrompts = [
    "paneer",
    "masala dosa under ₹150",
    "crispy veg burger combo",
    "chilled mango shake",
    "ready in 10 mins"
  ];

  // Apply local filter and sort to search results
  const processedResults = useMemo(() => {
    let list = [...results];

    if (filterVegOnly) {
      list = list.filter(i => i.isVeg);
    }
    if (filterMaxWait) {
      list = list.filter(i => (i.prepTimeNum || 12) <= filterMaxWait);
    }
    if (filterMaxPrice) {
      list = list.filter(i => i.price <= filterMaxPrice);
    }

    if (sortBy === 'cheapest') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'fastest') {
      list.sort((a, b) => (a.prepTimeNum || 12) - (b.prepTimeNum || 12));
    } else if (sortBy === 'highest_rated') {
      list.sort((a, b) => (b.rating || 4.5) - (a.rating || 4.5));
    }

    return list;
  }, [results, sortBy, filterVegOnly, filterMaxWait, filterMaxPrice]);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center p-3 sm:p-4 pt-14 sm:pt-20 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#FAF7F2] rounded-3xl max-w-2xl w-full shadow-2xl border border-[#EFE8DE] overflow-hidden my-auto text-left flex flex-col max-h-[88vh]">
        
        {/* Header with AI gradient */}
        <div className="bg-[#2A2521] p-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-[#F95721] text-white flex items-center justify-center shadow-sm">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base text-white font-display">Global Food Court Search</h3>
                <span className="bg-[#FFF4EC] text-[#F95721] text-[9px] font-black uppercase px-2 py-0.5 rounded-full">
                  AI Smart
                </span>
              </div>
              <p className="text-[11px] text-[#C5BCB2]">Natural query & multi-outlet filter across all restaurant menus</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-full bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-[#EFE8DE] bg-white shrink-0 space-y-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="flex gap-2"
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#8E857C] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                autoFocus
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Search 'paneer', 'masala dosa', 'burger' or 'under ₹200'..."
                className="w-full bg-[#FAF7F2] border border-[#EFE8DE] rounded-2xl pl-11 pr-4 py-3 text-sm text-[#2A2521] placeholder-[#8E857C] focus:outline-none focus:border-[#F95721] font-medium"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#F95721] hover:bg-[#EA580C] disabled:opacity-60 text-white font-black text-xs px-5 rounded-2xl shadow-md transition-all active:scale-95 flex items-center gap-1.5 font-display"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </form>

          {/* Preset Prompts */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#8E857C]">Quick Search:</span>
            {samplePrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setPrompt(p);
                  handleSearch(p);
                }}
                className="text-[11px] font-bold text-[#6F665D] bg-[#FAF7F2] hover:bg-[#FFF4EC] hover:text-[#F95721] border border-[#EFE8DE] px-2.5 py-1 rounded-xl transition-colors"
              >
                "{p}"
              </button>
            ))}
          </div>

          {/* Feature 13: Sort & Filter Pills Bar */}
          <div className="pt-2 border-t border-[#FAF4EB] flex flex-wrap items-center justify-between gap-2 text-xs">
            {/* Filters */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                onClick={() => setFilterVegOnly(!filterVegOnly)}
                className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all border ${
                  filterVegOnly 
                    ? 'bg-[#4E8752] text-white border-[#4E8752]' 
                    : 'bg-[#FAF7F2] text-[#6F665D] border-[#EFE8DE]'
                }`}
              >
                🥦 Veg Only
              </button>
              
              <button
                onClick={() => setFilterMaxWait(filterMaxWait === 15 ? null : 15)}
                className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all border ${
                  filterMaxWait === 15
                    ? 'bg-[#F95721] text-white border-[#F95721]' 
                    : 'bg-[#FAF7F2] text-[#6F665D] border-[#EFE8DE]'
                }`}
              >
                ⏱️ ≤ 15 mins
              </button>

              <button
                onClick={() => setFilterMaxPrice(filterMaxPrice === 200 ? null : 200)}
                className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all border ${
                  filterMaxPrice === 200
                    ? 'bg-[#2A2521] text-white border-[#2A2521]' 
                    : 'bg-[#FAF7F2] text-[#6F665D] border-[#EFE8DE]'
                }`}
              >
                ₹ Under 200
              </button>
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-black uppercase text-[#8E857C] mr-1">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#FAF7F2] border border-[#EFE8DE] text-[#2A2521] text-[11px] font-bold rounded-xl px-2 py-1 focus:outline-none"
              >
                <option value="recommended">Recommended</option>
                <option value="cheapest">Cheapest</option>
                <option value="fastest">Fastest</option>
                <option value="highest_rated">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Container */}
        <div className="p-4 sm:p-5 flex-1 overflow-y-auto space-y-3">
          {analysis && (
            <div className="bg-[#FFF4EC] border border-[#F6DEC9] rounded-2xl p-3 text-xs text-[#2A2521] flex items-center justify-between font-bold">
              <span>
                Found <strong>{processedResults.length} matching dishes</strong> across food court outlets
              </span>
              <span className="text-[11px] text-[#F95721]">
                {analysis.detectedBudget}
              </span>
            </div>
          )}

          {processedResults.length === 0 ? (
            <div className="text-center py-10 text-[#8E857C] text-xs space-y-2">
              <p>Type a dish or try searching <strong>"paneer"</strong> to see multi-outlet options.</p>
            </div>
          ) : (
            processedResults.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-[#EFE8DE] rounded-2xl p-3.5 flex items-center justify-between gap-3 hover:border-[#F95721]/50 transition-all shadow-xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-xl object-cover border border-[#EFE8DE] shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-black text-xs sm:text-sm text-[#2A2521] truncate font-display">
                        {item.name}
                      </h4>
                    </div>
                    <div className="text-xs text-[#6F665D] mt-0.5 font-medium truncate">
                      {item.restaurantName} • <span className="font-bold text-[#2A2521]">₹{item.price}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-[#8E857C] mt-1">
                      <span className="flex items-center gap-0.5 text-[#F95721]">
                        <Clock className="w-3 h-3" />
                        {item.prepTimeNum || 10} mins
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5 text-amber-600">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        {item.rating || 4.7}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    addToCart(item);
                    addNotification("Added from Search", `${item.name} added to cart`, "success");
                  }}
                  className="bg-[#F95721] hover:bg-[#EA580C] text-white font-black text-xs px-3.5 py-2 rounded-xl shadow-xs transition-all active:scale-95 flex items-center gap-1 shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
