import React from 'react';
import { Home, Search, ShoppingBag, Clock, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth, ROLES } from '../../context/AuthContext';

export const BottomNav = ({ activeTab, setActiveTab, onOpenSearch, onOpenHistory }) => {
  const { totalItemsCount, setIsCartDrawerOpen } = useCart();
  const { currentRole } = useAuth();

  if (currentRole !== ROLES.CUSTOMER) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-elevated px-4 py-2 flex items-center justify-around">
      <button
        onClick={() => setActiveTab('home')}
        className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'home' ? 'text-brand-500 font-bold' : 'text-slate-500'}`}
      >
        <Home className="w-5 h-5" />
        <span className="text-[10px]">Home</span>
      </button>

      <button
        onClick={onOpenSearch}
        className="flex flex-col items-center gap-1 text-slate-500 hover:text-brand-500 transition-colors"
      >
        <Search className="w-5 h-5" />
        <span className="text-[10px]">AI Search</span>
      </button>

      <button
        onClick={() => setIsCartDrawerOpen(true)}
        className="relative flex flex-col items-center gap-1 text-slate-500 hover:text-brand-500 transition-colors"
      >
        <div className="relative">
          <ShoppingBag className="w-5 h-5" />
          {totalItemsCount > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-brand-500 text-white font-extrabold text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
              {totalItemsCount}
            </span>
          )}
        </div>
        <span className="text-[10px]">Multi-Cart</span>
      </button>

      <button
        onClick={onOpenHistory}
        className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'orders' ? 'text-brand-500 font-bold' : 'text-slate-500'}`}
      >
        <Clock className="w-5 h-5" />
        <span className="text-[10px]">Orders</span>
      </button>
    </div>
  );
};
