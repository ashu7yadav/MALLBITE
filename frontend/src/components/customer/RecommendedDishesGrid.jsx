import React, { useState } from 'react';
import { Star, Plus, Heart, Check, Clock, Sparkles, AlertTriangle } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useMall } from '../../context/MallContext';

export const RECOMMENDED_DISHES_DATA = [
  {
    id: "item-s1",
    name: "Crispy Masala Dosa",
    restaurantId: "rest-south",
    restaurantName: "South Kitchen",
    price: 129,
    prepTimeNum: 9,
    rating: 4.8,
    isBestseller: true,
    category: "south",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "item-b1",
    name: "Spiced Paneer Tikka Wrap",
    restaurantId: "rest-burger",
    restaurantName: "Food Corner",
    price: 149,
    prepTimeNum: 8,
    rating: 4.7,
    isBestseller: true,
    category: "burgers",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "item-p1",
    name: "Farmhouse Veggie Supreme Pizza",
    restaurantId: "rest-pizza",
    restaurantName: "Pizza Hub",
    price: 199,
    prepTimeNum: 18,
    rating: 4.6,
    isBestseller: true,
    category: "pizzas",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "item-b2",
    name: "Crispy Veg Burger Combo",
    restaurantId: "rest-burger",
    restaurantName: "Food Corner",
    price: 199,
    prepTimeNum: 10,
    rating: 4.6,
    isBestseller: false,
    category: "burgers",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "item-j1",
    name: "Rich Alphonso Mango Shake",
    restaurantId: "rest-juice",
    restaurantName: "Juice Bar",
    price: 89,
    prepTimeNum: 4,
    rating: 4.8,
    isBestseller: true,
    category: "beverages",
    image: "https://images.unsplash.com/photo-1546173159-315724a31696?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "item-sp1",
    name: "Hyderabadi Dum Paneer Biryani",
    restaurantId: "rest-spice",
    restaurantName: "Spice Route",
    price: 219,
    prepTimeNum: 14,
    rating: 4.7,
    isBestseller: false,
    category: "biryani",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "item-d1",
    name: "Belgian Dark Chocolate Waffle",
    restaurantId: "rest-dessert",
    restaurantName: "Dessert Lab",
    price: 159,
    prepTimeNum: 7,
    rating: 4.9,
    isBestseller: true,
    category: "desserts",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "item-s4",
    name: "Authentic Filter Coffee",
    restaurantId: "rest-south",
    restaurantName: "South Kitchen",
    price: 49,
    prepTimeNum: 3,
    rating: 4.9,
    isBestseller: false,
    category: "beverages",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80"
  }
];

export const RecommendedDishesGrid = ({ 
  selectedCategory = 'all', 
  selectedMaxWait = null,
  onTriggerAlternative 
}) => {
  const { addToCart, cartItems } = useCart();
  const { addNotification, outletQueues } = useMall();
  const [favorites, setFavorites] = useState({});

  const defaultDishes = RECOMMENDED_DISHES_DATA;

  const toggleFavorite = (dishId) => {
    setFavorites(prev => ({
      ...prev,
      [dishId]: !prev[dishId]
    }));
  };

  const handleDishClick = (dish) => {
    // Check if outlet queue is high or exceeds selectedMaxWait
    const qData = outletQueues?.find(q => q.outletId === dish.restaurantId || q.outletName?.toLowerCase() === dish.restaurantName?.toLowerCase());
    const isHighWait = (qData && qData.estimatedWaitMinutes > 15) || (selectedMaxWait && (dish.prepTimeNum || 12) > selectedMaxWait);

    if (isHighWait && onTriggerAlternative) {
      // Find faster alternatives
      const fasterList = defaultDishes.filter(d => 
        d.id !== dish.id && 
        (d.prepTimeNum || 10) <= (selectedMaxWait || 15)
      ).slice(0, 3);
      onTriggerAlternative(dish, fasterList, qData ? qData.estimatedWaitMinutes : 22, selectedMaxWait || 15);
      return;
    }

    addToCart({
      id: dish.id,
      restaurantId: dish.restaurantId,
      restaurantName: dish.restaurantName,
      name: dish.name,
      price: dish.price,
      isVeg: true,
      image: dish.image,
      prepTimeNum: dish.prepTimeNum
    });

    addNotification(
      "Added to Multi-Cart 🛒",
      `${dish.name} from ${dish.restaurantName} added to your table order`,
      "success"
    );
  };

  // Filter by category and max wait
  let filtered = defaultDishes;
  if (selectedCategory !== 'all') {
    filtered = filtered.filter(d => d.category === selectedCategory);
  }
  if (selectedMaxWait) {
    filtered = filtered.filter(d => (d.prepTimeNum || 12) <= selectedMaxWait);
  }

  return (
    <div className="space-y-3.5 text-left">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg sm:text-xl font-black text-[#2A2521] font-display tracking-tight">
            Recommended for you
          </h3>
          <p className="text-xs text-[#8E857C] font-medium mt-0.5">
            Handpicked multi-outlet favourites with estimated preparation times
          </p>
        </div>
        {selectedMaxWait && (
          <span className="text-xs font-black bg-[#FFF4EC] text-[#F95721] px-2.5 py-1 rounded-xl border border-[#F6DEC9]">
            Filtered: ≤ {selectedMaxWait} mins
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((dish) => {
          const isFav = favorites[dish.id];
          const inCartCount = cartItems.find(item => item.id === dish.id)?.quantity || 0;
          const qData = outletQueues?.find(q => q.outletId === dish.restaurantId);
          const isBusyOutlet = qData && qData.queueLevel === 'high';

          return (
            <div
              key={dish.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#EFE8DE] hover:border-[#F95721]/50 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group relative"
            >
              {/* Image Container with Badge & Heart */}
              <div className="relative aspect-square w-full overflow-hidden bg-[#FAF6F0]">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Bestseller or High Wait Warning Tag */}
                {dish.isBestseller && !isBusyOutlet && (
                  <span className="absolute top-2.5 left-2.5 bg-[#F95721] text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md shadow-sm">
                    Bestseller
                  </span>
                )}
                {isBusyOutlet && (
                  <span className="absolute top-2.5 left-2.5 bg-[#EF4444] text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md shadow-sm flex items-center gap-1">
                    <AlertTriangle className="w-2.5 h-2.5" />
                    <span>Busy Outlet</span>
                  </span>
                )}

                {/* Favorite Heart Button */}
                <button
                  onClick={() => toggleFavorite(dish.id)}
                  className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/85 backdrop-blur-xs flex items-center justify-center shadow-xs transition-colors hover:bg-white"
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${
                      isFav ? 'fill-red-500 text-red-500' : 'text-[#8E857C]'
                    }`}
                  />
                </button>

                {/* Orange Circular Add Button on Image Corner */}
                <button
                  onClick={() => handleDishClick(dish)}
                  className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-full bg-[#F95721] hover:bg-[#EA580C] text-white flex items-center justify-center shadow-md shadow-[#F95721]/40 transition-all hover:scale-110 active:scale-95"
                  title="Add to Table Cart"
                >
                  {inCartCount > 0 ? (
                    <span className="text-xs font-black">{inCartCount}</span>
                  ) : (
                    <Plus className="w-4 h-4 stroke-[3]" />
                  )}
                </button>
              </div>

              {/* Card Details */}
              <div className="p-3.5 space-y-1">
                <h4 className="font-black text-xs sm:text-sm text-[#2A2521] line-clamp-1 group-hover:text-[#F95721] transition-colors font-display">
                  {dish.name}
                </h4>
                
                <div className="flex items-center justify-between text-[11px] text-[#8E857C]">
                  <span className="font-bold truncate">{dish.restaurantName}</span>
                  <span className="font-bold flex items-center gap-1 text-[#F95721] shrink-0">
                    <Clock className="w-3 h-3" />
                    {dish.prepTimeNum || 10}m
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1 text-xs border-t border-[#FAF4EB]">
                  <span className="font-black text-sm text-[#2A2521]">
                    ₹{dish.price}
                  </span>
                  <span className="flex items-center gap-0.5 text-[10px] font-extrabold text-amber-600">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    {dish.rating}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
