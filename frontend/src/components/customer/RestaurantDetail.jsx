import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Star, 
  Clock, 
  MapPin, 
  Plus, 
  Minus, 
  Check, 
  Sparkles, 
  Search,
  Filter
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useMall } from '../../context/MallContext';
import { api } from '../../services/api';

export const RestaurantDetail = ({ restaurant, onBack }) => {
  const { currentTable } = useMall();
  const { cartItems, addToCart, updateQuantity } = useCart();
  
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [vegOnly, setVegOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryTab, setSelectedCategoryTab] = useState('All');

  useEffect(() => {
    const fetchMenu = async () => {
      setLoading(true);
      try {
        const res = await api.getMenu({ restaurantId: restaurant.id });
        if (res.success) {
          setMenuItems(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, [restaurant.id]);

  // Unique categories in this restaurant
  const categories = ['All', ...new Set(menuItems.map(i => i.category))];

  // Filtered menu
  const filteredItems = menuItems.filter(item => {
    if (vegOnly && !item.isVeg) return false;
    if (selectedCategoryTab !== 'All' && item.category !== selectedCategoryTab) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
    }
    return true;
  });

  const getItemQuantityInCart = (itemId) => {
    const found = cartItems.find(i => i.id === itemId);
    return found ? found.quantity : 0;
  };

  return (
    <div className="animate-in fade-in duration-200 pb-16">
      
      {/* Top Back Navigation */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-brand-600 mb-4 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Food Court Outlets</span>
      </button>

      {/* Restaurant Header Banner Card */}
      <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-soft mb-8">
        <div className="relative h-44 sm:h-56 bg-slate-900">
          <img
            src={restaurant.bannerImage}
            alt={restaurant.name}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          {/* Table Delivery Notice */}
          <div className="absolute top-4 right-4 bg-emerald-500/90 text-white backdrop-blur-md px-3 py-1 rounded-full text-xs font-extrabold shadow-md flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5" />
            <span>Delivers to Table {currentTable.number}</span>
          </div>

          {/* Restaurant Main Info Overlay */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  {restaurant.name}
                </h1>
                <p className="text-xs sm:text-sm text-slate-200 font-medium mt-0.5 max-w-xl line-clamp-1">
                  {restaurant.tagline || restaurant.category}
                </p>
              </div>

              {/* Rating & Prep Time Badge */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-emerald-600 text-white px-2.5 py-1 rounded-xl text-xs font-bold shadow-sm">
                  <Star className="w-3.5 h-3.5 fill-white" />
                  <span>{restaurant.rating}</span>
                </div>
                <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md text-white px-2.5 py-1 rounded-xl text-xs font-bold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{restaurant.prepTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Strip */}
        <div className="p-4 sm:px-6 bg-slate-50/70 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 font-medium">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-brand-500" />
            <span>Food Court Location: <strong>{restaurant.counterNumber} ({restaurant.floor})</strong></span>
          </div>
          <div className="text-brand-600 font-bold bg-brand-50 px-3 py-1 rounded-full border border-brand-200/50">
            {restaurant.offerTag || "Add dishes from multiple outlets into 1 unified cart!"}
          </div>
        </div>
      </div>

      {/* Menu Filters & Search Controls */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm mb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        
        {/* Category Pill Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategoryTab(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${selectedCategoryTab === cat ? 'bg-slate-900 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Veg Toggle & Search */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setVegOnly(!vegOnly)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${vegOnly ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-slate-50 border-slate-200 text-slate-600'}`}
          >
            <div className="veg-badge-box">
              <div className="veg-badge-dot"></div>
            </div>
            <span>Veg Only</span>
          </button>

          <div className="relative flex-1 sm:w-48">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search in menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-full pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-500"
            />
          </div>
        </div>

      </div>

      {/* Menu Items List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-12 text-slate-400 text-xs">Loading delicious menu...</div>
        ) : filteredItems.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 text-slate-500 text-xs">
            No dishes found matching your current filter. Try clearing your search.
          </div>
        ) : (
          filteredItems.map((item) => {
            const quantityInCart = getItemQuantityInCart(item.id);

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex items-start justify-between gap-4"
              >
                {/* Left Description Side */}
                <div className="flex-1">
                  
                  {/* Veg / Non-Veg Indicator & Badge */}
                  <div className="flex items-center gap-2 mb-1.5">
                    {item.isVeg ? (
                      <div className="veg-badge-box" title="Pure Veg">
                        <div className="veg-badge-dot"></div>
                      </div>
                    ) : (
                      <div className="non-veg-badge-box" title="Non-Veg">
                        <div className="non-veg-badge-dot"></div>
                      </div>
                    )}

                    {item.badge && (
                      <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5 text-amber-600" />
                        {item.badge}
                      </span>
                    )}

                    {item.rating && (
                      <span className="text-[11px] font-bold text-slate-500 flex items-center gap-0.5">
                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                        {item.rating} ({item.ordersCount || 100}+ orders)
                      </span>
                    )}
                  </div>

                  {/* Title & Price */}
                  <h3 className="font-extrabold text-base text-slate-900 leading-snug">
                    {item.name}
                  </h3>
                  <div className="text-sm font-black text-slate-900 mt-1">
                    ₹{item.price}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-500 font-medium mt-1.5 max-w-xl leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Right Image & Floating Add/Minus Quantity Button */}
                <div className="relative shrink-0 flex flex-col items-center">
                  <div className="w-28 h-24 sm:w-32 sm:h-28 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/60 shadow-inner">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Floating Action Button (Swiggy Style Add+ / Counter) */}
                  <div className="absolute -bottom-2.5">
                    {quantityInCart === 0 ? (
                      <button
                        onClick={() => addToCart(item, 1)}
                        className="bg-white hover:bg-slate-50 text-brand-600 font-extrabold text-xs px-6 py-1.5 rounded-xl border border-brand-300 shadow-md shadow-slate-200/60 transition-transform active:scale-95 flex items-center gap-1"
                      >
                        <span>ADD</span>
                        <Plus className="w-3 h-3 text-brand-500 stroke-[3]" />
                      </button>
                    ) : (
                      <div className="bg-brand-500 text-white font-extrabold text-xs px-2 py-1 rounded-xl shadow-md flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, quantityInCart - 1)}
                          className="hover:bg-brand-600 p-0.5 rounded"
                        >
                          <Minus className="w-3 h-3 stroke-[3]" />
                        </button>
                        <span className="text-xs min-w-[12px] text-center font-black">{quantityInCart}</span>
                        <button
                          onClick={() => updateQuantity(item.id, quantityInCart + 1)}
                          className="hover:bg-brand-600 p-0.5 rounded"
                        >
                          <Plus className="w-3 h-3 stroke-[3]" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
