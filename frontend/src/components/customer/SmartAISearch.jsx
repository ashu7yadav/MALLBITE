import React, { useState } from 'react';
import { Search, Sparkles, X, Plus, Check, Tag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { api } from '../../services/api';

export const SmartAISearch = ({ isOpen, onClose }) => {
  const { addToCart } = useCart();
  const [prompt, setPrompt] = useState('');
  const [results, setResults] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSearch = async (queryText) => {
    const q = queryText || prompt;
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
    "I want something spicy under ₹250",
    "Belgian waffles and desserts under ₹200",
    "Pure veg quick snacks under ₹150",
    "Cheesy pizza and garlic bread combo"
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-start justify-center p-4 pt-16 sm:pt-20 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden my-auto">
        
        {/* Header with AI gradient */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-brand-950 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-brand-500 text-white flex items-center justify-center shadow-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">MALLBITE AI Food Concierge</h3>
              <p className="text-[11px] text-slate-300">Natural language search across all mall restaurants</p>
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
        <div className="p-5 border-b border-slate-100">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="flex gap-2"
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                autoFocus
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="E.g., 'I want something spicy under ₹250' or 'sweet coffee & cake'..."
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-500 font-medium"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-brand-500 hover:bg-brand-600 disabled:opacity-60 text-white font-extrabold text-xs px-5 rounded-2xl shadow-md transition-colors flex items-center gap-1.5"
            >
              {loading ? "Thinking..." : "Search"}
            </button>
          </form>

          {/* Preset Prompts */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-400">Try asking:</span>
            {samplePrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setPrompt(p);
                  handleSearch(p);
                }}
                className="text-[11px] font-bold text-slate-600 bg-slate-100 hover:bg-brand-50 hover:text-brand-600 px-2.5 py-1 rounded-full transition-colors"
              >
                "{p}"
              </button>
            ))}
          </div>
        </div>

        {/* Results Container */}
        <div className="p-5 max-h-[55vh] overflow-y-auto space-y-4">
          {analysis && (
            <div className="bg-brand-50/70 border border-brand-200/80 rounded-2xl p-3 text-xs text-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-500" />
                <span>
                  Budget filter: <strong>{analysis.detectedBudget}</strong> • Matched <strong>{analysis.matchedItemsCount} dishes</strong> across mall outlets
                </span>
              </div>
            </div>
          )}

          {results.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-xs">
              Type your food craving above to get instant personalized dish recommendations.
            </div>
          ) : (
            results.map((item) => (
              <div
                key={item.id}
                className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex items-center justify-between gap-4 hover:border-brand-300 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-200 shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      {item.isVeg ? (
                        <div className="veg-badge-box">
                          <div className="veg-badge-dot"></div>
                        </div>
                      ) : (
                        <div className="non-veg-badge-box">
                          <div className="non-veg-badge-dot"></div>
                        </div>
                      )}
                      <h4 className="font-extrabold text-sm text-slate-900">{item.name}</h4>
                    </div>
                    <div className="text-xs font-bold text-brand-600 mt-0.5">
                      {item.restaurantName} • ₹{item.price}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => addToCart(item, 1)}
                  className="bg-white hover:bg-brand-500 hover:text-white text-brand-600 font-extrabold text-xs px-4 py-2 rounded-xl border border-brand-300 shadow-sm transition-all flex items-center gap-1"
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
