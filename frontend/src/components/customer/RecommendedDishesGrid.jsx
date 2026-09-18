import React, { useState } from 'react';
import { Star, Plus, Heart, Check, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useMall } from '../../context/MallContext';

export const RECOMMENDED_DISHES_DATA = [
  {
    id: "rec-dish-1",
    name: "Vegan Crunch Burger",
    restaurantId: "rest-green-treat",
    restaurantName: "Green Treat",
    price: 249,
    rating: 4.6,
    isBestseller: true,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80",
    category: "burgers"
  },
  {
    id: "rec-dish-2",
    name: "Farmhouse Pizza",
    restaurantId: "rest-plant-pizza",
    restaurantName: "Plant Pizza",
    price: 349,
    rating: 4.4,
    isBestseller: false,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80",
    category: "pizzas"
  },
  {
    id: "rec-dish-3",
    name: "Quinoa Power Bowl",
    restaurantId: "rest-vegan-bowl",
    restaurantName: "The Vegan Bowl",
    price: 299,
    rating: 4.7,
    isBestseller: false,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=80",
    category: "bowls"
  },
  {
    id: "rec-dish-4",
    name: "Berry Blast Smoothie",
    restaurantId: "rest-vegan-cafe",
    restaurantName: "Vegan Café",
    price: 189,
    rating: 4.5,
    isBestseller: false,
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=600&auto=format&fit=crop&q=80",
    category: "beverages"
  },
  {
    id: "rec-dish-5",
    name: "Asian Sesame Salad",
    restaurantId: "rest-vegan-bistro",
    restaurantName: "Vegan Bistro",
    price: 229,
    rating: 4.3,
    isBestseller: false,
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80",
    category: "salads"
  }
];

export const RecommendedDishesGrid = ({ selectedCategory = 'all' }) => {
  const { addToCart, cartItems } = useCart();
  const { addNotification } = useMall();
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (dishId) => {
    setFavorites(prev => ({
      ...prev,
      [dishId]: !prev[dishId]
    }));
  };

  const handleAddToCart = (dish) => {
    addToCart({
      id: dish.id,
      restaurantId: dish.restaurantId,
      restaurantName: dish.restaurantName,
      name: dish.name,
      price: dish.price,
      isVeg: true,
      image: dish.image
    });

    addNotification(
      "Added to Unified Cart 🛒",
      `${dish.name} from ${dish.restaurantName} added to your table order`,
      "success"
    );
  };

  const filteredDishes = selectedCategory === 'all'
    ? RECOMMENDED_DISHES_DATA
    : RECOMMENDED_DISHES_DATA.filter(d => d.category === selectedCategory);

  return (
    <div className="space-y-3.5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg sm:text-xl font-black text-[#2A2521] font-display tracking-tight">
          Recommended for you
        </h3>
        <span className="text-xs font-bold text-[#8E857C]">
          Handpicked multi-outlet favourites
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {(filteredDishes.length > 0 ? filteredDishes : RECOMMENDED_DISHES_DATA).map((dish) => {
          const isFav = favorites[dish.id];
          const inCartCount = cartItems.find(item => item.id === dish.id)?.quantity || 0;

          return (
            <div
              key={dish.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#EFE8DE] hover:border-[#F95721]/50 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              {/* Image Container with Badge & Heart */}
              <div className="relative aspect-square w-full overflow-hidden bg-[#FAF6F0]">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Bestseller Tag */}
                {dish.isBestseller && (
                  <span className="absolute top-2.5 left-2.5 bg-[#F95721] text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md shadow-sm">
                    Bestseller
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
                  onClick={() => handleAddToCart(dish)}
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
              <div className="p-3 space-y-1">
                <h4 className="font-black text-xs text-[#2A2521] line-clamp-1 group-hover:text-[#F95721] transition-colors font-display">
                  {dish.name}
                </h4>
                <p className="text-[10px] text-[#8E857C] font-bold truncate">
                  {dish.restaurantName}
                </p>

                <div className="flex items-center justify-between pt-1 text-xs">
                  <span className="font-black text-[#2A2521]">
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
