import React, { useState } from 'react';
import { AuthProvider, useAuth, ROLES } from './context/AuthContext';
import { MallProvider, useMall } from './context/MallContext';
import { CartProvider, useCart } from './context/CartContext';

// Common Components
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { NotificationToast } from './components/common/NotificationToast';
import { DemoSimulatorModal } from './components/common/DemoSimulatorModal';

// Customer Components
import { TableScanBanner } from './components/customer/TableScanBanner';
import { FoodCategoryCarousel } from './components/customer/FoodCategoryCarousel';
import { RestaurantCard } from './components/customer/RestaurantCard';
import { RestaurantDetail } from './components/customer/RestaurantDetail';
import { MultiCartDrawer } from './components/customer/MultiCartDrawer';
import { CheckoutModal } from './components/customer/CheckoutModal';
import { LiveOrderTracker } from './components/customer/LiveOrderTracker';
import { SmartAISearch } from './components/customer/SmartAISearch';
import { QrScannerModal } from './components/customer/QrScannerModal';
import { OrderHistory } from './components/customer/OrderHistory';

// Role Dashboards
import { KitchenDashboard } from './components/restaurant/KitchenDashboard';
import { MallDashboard } from './components/mall_admin/MallDashboard';
import { DeliveryDashboard } from './components/delivery/DeliveryDashboard';
import { LandingPage } from './components/landing/LandingPage';

import { Sparkles, Star, Flame, Filter, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';

const CustomerHub = ({ onOpenSearch, onOpenHistory, selectedRestaurant, setSelectedRestaurant, customerView, setCustomerView }) => {
  const { restaurants, currentTable } = useMall();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filterType, setFilterType] = useState('all'); // all | veg | rating | fastest

  const handleSelectRestaurant = (rest) => {
    setSelectedRestaurant(rest);
    setCustomerView('restaurant');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredRestaurants = restaurants.filter(rest => {
    if (selectedCategory !== 'all') {
      const catLower = selectedCategory.toLowerCase();
      const matchCat = rest.category.toLowerCase().includes(catLower) || rest.name.toLowerCase().includes(catLower);
      if (!matchCat) return false;
    }
    if (filterType === 'veg' && !rest.isVegOnly) return false;
    if (filterType === 'rating' && rest.rating < 4.6) return false;
    return true;
  });

  if (customerView === 'restaurant' && selectedRestaurant) {
    return (
      <RestaurantDetail
        restaurant={selectedRestaurant}
        onBack={() => setCustomerView('home')}
      />
    );
  }

  if (customerView === 'tracker') {
    return <LiveOrderTracker onBackToHome={() => setCustomerView('home')} />;
  }

  if (customerView === 'history') {
    return (
      <OrderHistory
        onSelectOrder={() => setCustomerView('tracker')}
      />
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      
      {/* 1. Hero Table Scan Banner */}
      <TableScanBanner onExploreClick={() => {
        const el = document.getElementById('restaurants-grid');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }} />

      {/* 2. "What's on your mind?" Category Circles */}
      <FoodCategoryCarousel
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
      />

      {/* 3. AI Multi-Outlet Combo Highlight Banner (Luxury Design) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-brand-950 to-slate-950 p-6 sm:p-8 text-white shadow-elevated border border-brand-500/30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-500 to-amber-400 flex items-center justify-center text-white shrink-0 shadow-lg shadow-brand-500/30">
              <Sparkles className="w-7 h-7 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="bg-brand-500/30 border border-brand-400/40 text-amber-300 text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full tracking-wider">
                  ⚡ AI Smart Saver
                </span>
                <span className="text-emerald-400 text-xs font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Single Payment
                </span>
              </div>
              <h3 className="font-black text-xl sm:text-2xl text-white font-display tracking-tight leading-tight">
                Order Burger + Pizza + Iced Coffee & Save ₹50
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1 max-w-xl">
                Combine items from multiple food outlets in 1 unified cart. Delivered together at <strong className="text-amber-300">Table {currentTable.number}</strong>!
              </p>
            </div>
          </div>

          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 bg-gradient-to-r from-brand-500 via-orange-500 to-amber-500 hover:from-brand-400 hover:to-amber-400 text-white font-black text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-lg shadow-brand-500/30 transition-all hover:scale-105 active:scale-95 shrink-0 shine-effect font-display"
          >
            <span>Try AI Smart Combos</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4. Top Restaurant Chains in Food Court */}
      <div id="restaurants-grid" className="pt-2">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 font-display tracking-tight">
                Top Food Outlets in Food Court
              </h2>
              <span className="bg-brand-100 text-brand-700 text-xs font-black px-2.5 py-0.5 rounded-full">
                {filteredRestaurants.length} Outlets
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Order from any outlet in 1 single combined cart for Table {currentTable.number}
            </p>
          </div>

          {/* Quick Filters */}
          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1">
            <button
              onClick={() => setFilterType('all')}
              className={`px-4 py-2 rounded-2xl text-xs font-black transition-all ${filterType === 'all' ? 'bg-slate-950 text-white shadow-md' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
            >
              All Outlets
            </button>
            <button
              onClick={() => setFilterType('veg')}
              className={`px-4 py-2 rounded-2xl text-xs font-black transition-all ${filterType === 'veg' ? 'bg-emerald-600 text-white shadow-md' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
            >
              Pure Veg Only
            </button>
            <button
              onClick={() => setFilterType('rating')}
              className={`px-4 py-2 rounded-2xl text-xs font-black transition-all flex items-center gap-1.5 ${filterType === 'rating' ? 'bg-amber-500 text-white shadow-md' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
            >
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>Ratings 4.6+</span>
            </button>
          </div>
        </div>

        {/* Restaurant Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onSelect={handleSelectRestaurant}
            />
          ))}
        </div>
      </div>

    </div>
  );
};

const MainAppContent = () => {
  const { currentRole } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [customerView, setCustomerView] = useState('home'); // home | restaurant | tracker | history
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fb]">
      
      {/* Top Universal Header */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenHistory={() => setCustomerView('history')}
      />

      {/* Main Dynamic View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {currentRole === ROLES.LANDING && <LandingPage />}
        {currentRole === ROLES.RESTAURANT && <KitchenDashboard />}
        {currentRole === ROLES.MALL_ADMIN && <MallDashboard />}
        {currentRole === ROLES.DELIVERY && <DeliveryDashboard />}
        {currentRole === ROLES.CUSTOMER && (
          <CustomerHub
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenHistory={() => setCustomerView('history')}
            selectedRestaurant={selectedRestaurant}
            setSelectedRestaurant={setSelectedRestaurant}
            customerView={customerView}
            setCustomerView={setCustomerView}
          />
        )}
      </main>

      {/* Global Overlays & Modals */}
      <MultiCartDrawer />
      <CheckoutModal onOrderSuccess={() => setCustomerView('tracker')} />
      <SmartAISearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <QrScannerModal />
      <DemoSimulatorModal />
      <NotificationToast />

      {/* Mobile Sticky Navigation */}
      <BottomNav
        activeTab={customerView}
        setActiveTab={(tab) => {
          if (tab === 'home') setCustomerView('home');
          if (tab === 'orders') setCustomerView('history');
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenHistory={() => setCustomerView('history')}
      />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MallProvider>
        <CartProvider>
          <MainAppContent />
        </CartProvider>
      </MallProvider>
    </AuthProvider>
  );
}
