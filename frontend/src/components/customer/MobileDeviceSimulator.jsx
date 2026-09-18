import React from 'react';
import { 
  X, 
  MapPin, 
  Bell, 
  ChevronDown, 
  QrCode, 
  Search, 
  Plus, 
  Home, 
  ShoppingBag, 
  Heart, 
  User, 
  Clock, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useMall } from '../../context/MallContext';
import { useCart } from '../../context/CartContext';
import { POPULAR_OUTLETS_DATA } from './PopularOutletsRow';
import { RECOMMENDED_DISHES_DATA } from './RecommendedDishesGrid';

export const MobileDeviceSimulator = ({ isOpen, onClose }) => {
  const { currentMall, currentTable, setIsQrScannerOpen } = useMall();
  const { addToCart, totalItemsCount, setIsCartDrawerOpen } = useCart();
  const [activeTab, setActiveTab] = React.useState('home');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      
      {/* Container with Close Floating Button */}
      <div className="relative flex flex-col items-center">
        
        {/* Floating Close Bar */}
        <div className="mb-3 flex items-center justify-between w-full max-w-[340px] text-white">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-xs font-black uppercase tracking-wider">Mobile App Preview (iPhone 15)</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* iPhone 15 Frame (Exact match to bottom right in design) */}
        <div className="relative w-[340px] h-[680px] bg-black rounded-[48px] p-3 shadow-2xl border-4 border-slate-700 overflow-hidden flex flex-col">
          
          {/* Outer Bezel & Dynamic Island */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-30 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800 ml-auto mr-2" />
          </div>

          {/* Screen Content Wrapper */}
          <div className="relative w-full h-full bg-[#FAF7F2] rounded-[40px] overflow-y-auto overflow-x-hidden flex flex-col no-scrollbar">
            
            {/* Status Bar */}
            <div className="pt-2 px-6 flex items-center justify-between text-[11px] font-black text-[#2A2521] z-20 shrink-0">
              <span>9:41</span>
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 19.4c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l1.9-1.9C9.27 19.64 10.58 20 12 20c4.97 0 9-4.03 9-9s-4.03-9-9-9z"/>
                </svg>
                <div className="w-4 h-2 border border-black rounded-xs p-0.5 flex items-center">
                  <div className="w-full h-full bg-black rounded-xs" />
                </div>
              </div>
            </div>

            {/* Mobile Header (Phoenix Mall, Table A12, Bell) */}
            <div className="p-4 pt-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#F95721]/15 flex items-center justify-center text-[#F95721]">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="flex items-center gap-1 text-xs font-black text-[#2A2521]">
                    <span>{currentMall.name}</span>
                    <ChevronDown className="w-3 h-3 text-[#8E857C]" />
                  </div>
                  <div className="text-[10px] text-[#8E857C] font-bold">
                    Table {currentTable.number || "A12"}
                  </div>
                </div>
              </div>

              <button className="w-8 h-8 rounded-full bg-white border border-[#EFE8DE] flex items-center justify-center text-[#2A2521] shadow-xs">
                <Bell className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Mobile Content */}
            <div className="px-4 pb-20 space-y-4 flex-1">
              
              {/* Mobile Orange Hero Card with QR Stand (Exact match to design) */}
              <div className="relative rounded-3xl bg-gradient-to-r from-[#F95721] to-[#EA580C] p-4 text-white shadow-md overflow-hidden">
                <div className="space-y-1 max-w-[170px]">
                  <h4 className="text-sm font-black font-display leading-tight">
                    One QR.<br />Endless Choices.
                  </h4>
                  <p className="text-[10px] text-white/90 leading-tight">
                    Order from all outlets at your table.
                  </p>
                  <button
                    onClick={() => setIsQrScannerOpen(true)}
                    className="mt-2 bg-white text-[#F95721] font-black text-[10px] py-1.5 px-3 rounded-xl shadow-xs transition-transform active:scale-95"
                  >
                    Scan to Order
                  </button>
                </div>

                {/* Standee Graphic on Right */}
                <div className="absolute top-2 right-2 w-20 h-24 bg-white/15 rounded-xl border border-white/25 p-1.5 text-center flex flex-col items-center justify-center">
                  <QrCode className="w-9 h-9 text-white mb-0.5" />
                  <span className="text-[7px] font-black uppercase text-white/90 leading-tight">Table {currentTable.number || "A12"}</span>
                </div>
              </div>

              {/* Popular Outlets Row */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black text-[#2A2521]">Popular Outlets</span>
                  <span className="text-[10px] font-bold text-[#F95721]">View All</span>
                </div>
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                  {POPULAR_OUTLETS_DATA.slice(0, 4).map(o => (
                    <div key={o.id} className="text-center shrink-0 w-14">
                      <div
                        className="w-12 h-12 rounded-full mx-auto flex items-center justify-center text-white text-[7px] font-black uppercase shadow-xs p-1"
                        style={{ backgroundColor: o.bgColor }}
                      >
                        {o.name.split(' ')[0]}
                      </div>
                      <span className="text-[9px] font-bold text-[#3E362F] block mt-1 truncate">{o.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 text-[10px] font-black">
                <span className="bg-[#F95721] text-white px-2.5 py-1 rounded-xl">All</span>
                <span className="bg-white border border-[#EFE8DE] text-[#4E463E] px-2.5 py-1 rounded-xl">Burgers</span>
                <span className="bg-white border border-[#EFE8DE] text-[#4E463E] px-2.5 py-1 rounded-xl">Pizzas</span>
                <span className="bg-white border border-[#EFE8DE] text-[#4E463E] px-2.5 py-1 rounded-xl">Bowls</span>
                <span className="bg-white border border-[#EFE8DE] text-[#4E463E] px-2.5 py-1 rounded-xl">More</span>
              </div>

              {/* Recommended for you List (Exact match to design) */}
              <div>
                <span className="text-xs font-black text-[#2A2521] block mb-2">Recommended for you</span>
                <div className="space-y-2.5">
                  {RECOMMENDED_DISHES_DATA.slice(0, 3).map(d => (
                    <div key={d.id} className="bg-white p-2.5 rounded-2xl border border-[#EFE8DE] flex items-center justify-between shadow-xs">
                      <div className="flex items-center gap-2.5">
                        <img src={d.image} alt={d.name} className="w-12 h-12 rounded-xl object-cover" />
                        <div>
                          <h6 className="text-xs font-black text-[#2A2521] leading-tight">{d.name}</h6>
                          <span className="text-[10px] text-[#8E857C]">{d.restaurantName}</span>
                          <div className="text-xs font-black text-[#2A2521] mt-0.5">₹{d.price}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => addToCart({
                          id: d.id,
                          restaurantId: d.restaurantId,
                          restaurantName: d.restaurantName,
                          name: d.name,
                          price: d.price,
                          isVeg: true,
                          image: d.image
                        })}
                        className="w-7 h-7 rounded-full bg-[#F95721] text-white flex items-center justify-center shadow-sm active:scale-90"
                      >
                        <Plus className="w-4 h-4 stroke-[3]" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Mobile Sticky Bottom Navigation (Home, Orders, Favorites, Cart, Profile) */}
            <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-[#EFE8DE] py-2 px-4 flex items-center justify-around text-[9px] font-black text-[#8E857C] z-30">
              <button className="flex flex-col items-center text-[#F95721]">
                <Home className="w-4 h-4 text-[#F95721]" />
                <span>Home</span>
              </button>
              <button className="flex flex-col items-center hover:text-[#2A2521]">
                <Clock className="w-4 h-4" />
                <span>Orders</span>
              </button>
              <button className="flex flex-col items-center hover:text-[#2A2521]">
                <Heart className="w-4 h-4" />
                <span>Favorites</span>
              </button>
              <button 
                onClick={() => setIsCartDrawerOpen(true)} 
                className="relative flex flex-col items-center hover:text-[#2A2521]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Cart</span>
                {totalItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#F95721] text-white rounded-full text-[8px] flex items-center justify-center">
                    {totalItemsCount}
                  </span>
                )}
              </button>
              <button className="flex flex-col items-center hover:text-[#2A2521]">
                <User className="w-4 h-4" />
                <span>Profile</span>
              </button>
            </div>

            {/* Home Indicator Bar */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-28 h-1 bg-black rounded-full z-40 pointer-events-none" />

          </div>
        </div>

      </div>
    </div>
  );
};
