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

import { Sparkles, Star, Flame, Filter } from 'lucide-react';

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
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* 1. Hero Table Scan Banner */}
      <TableScanBanner onExploreClick={() => {
        const el = document.getElementById('restaurants-grid');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }} />

      {/* 2. "What's on your mind?" Category Circles (Matches Swiggy Screenshot) */}
      <FoodCategoryCarousel
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
      />

      {/* 3. AI Multi-Outlet Combo Highlight Banner */}
      <div className="bg-gradient-to-r from-brand-500 via-amber-500 to-orange-500 rounded-3xl p-5 sm:p-6 text-white shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="bg-white/25 text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full tracking-wider inline-block mb-1">
              AI Multi-Store Saver
            </span>
            <h3 className="font-black text-lg text-white leading-tight">
              Order Burger + Pizza + Cold Coffee & Save ₹50
            </h3>
            <p className="text-xs text-white/90 font-medium mt-0.5">
              Combine items from Burger House & Pizza Corner in 1 cart. Delivered together at Table {currentTable.number}!
            </p>
          </div>
        </div>

        <button
          onClick={onOpenSearch}
          className="bg-white text-slate-900 hover:bg-slate-50 font-black text-xs px-5 py-2.5 rounded-xl shadow-md transition-transform active:scale-95 shrink-0"
        >
          Try AI Combos
        </button>
      </div>

      {/* 4. Top Restaurant Chains in Food Court (Matches Swiggy Screenshot) */}
      <div id="restaurants-grid">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Top Food Outlets in Mall Food Court
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              All 6 participating restaurants accept combined multi-store orders for Table {currentTable.number}
            </p>
          </div>

          {/* Quick Filters */}
          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${filterType === 'all' ? 'bg-slate-900 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              All Outlets
            </button>
            <button
              onClick={() => setFilterType('veg')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${filterType === 'veg' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              Pure Veg Only
            </button>
            <button
              onClick={() => setFilterType('rating')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors flex items-center gap-1 ${filterType === 'rating' ? 'bg-amber-500 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              <Star className="w-3 h-3 fill-current" />
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
