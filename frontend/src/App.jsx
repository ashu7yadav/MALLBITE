import React, { useState, useEffect, useCallback } from 'react';
import { AuthProvider, useAuth, ROLES } from './context/AuthContext';
import { MallProvider, useMall } from './context/MallContext';
import { CartProvider, useCart } from './context/CartContext';

// Common Components
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { NotificationToast } from './components/common/NotificationToast';
import { DemoSimulatorModal } from './components/common/DemoSimulatorModal';

// Customer Components - Orange & Cream Redesign
import { MallBiteSidebar } from './components/customer/MallBiteSidebar';
import { MallBiteHero } from './components/customer/MallBiteHero';
import { PopularOutletsRow } from './components/customer/PopularOutletsRow';
import { WhatWouldYouLikeToEat } from './components/customer/WhatWouldYouLikeToEat';
import { RecommendedDishesGrid } from './components/customer/RecommendedDishesGrid';
import { TrustAndDeliveryBanners } from './components/customer/TrustAndDeliveryBanners';
import { HowItWorksSteps } from './components/customer/HowItWorksSteps';
import { QrStandeeModal } from './components/customer/QrStandeeModal';
import { MobileDeviceSimulator } from './components/customer/MobileDeviceSimulator';
import { AiFoodRecommendationModal } from './components/customer/AiFoodRecommendationModal';
import { SmartAlternativeModal } from './components/customer/SmartAlternativeModal';
import { FoodComparisonModal } from './components/customer/FoodComparisonModal';
import { ArchitectureModal } from './components/common/ArchitectureModal';

// Standard Sub-components
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

import { Sparkles, Star, Flame, Filter, Zap, ArrowRight, CheckCircle2, QrCode, Smartphone, ArrowLeft, Scale, Workflow } from 'lucide-react';

const CustomerHub = ({ 
  onOpenSearch, 
  onOpenHistory, 
  selectedRestaurant, 
  setSelectedRestaurant, 
  customerView, 
  setCustomerView,
  onOpenStandee,
  onOpenMobile,
  onOpenAiModal,
  onOpenCompareModal,
  onOpenArchitecture,
  onTriggerAlternative,
  onSelectRestaurant,
  onBackToHome,
  navigateCustomerView
}) => {
  const { restaurants, currentTable } = useMall();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMaxWait, setSelectedMaxWait] = useState(null);
  const [filterType, setFilterType] = useState('all'); // all | veg | rating

  const handleOutletClick = (rest) => {
    if (onSelectRestaurant) {
      onSelectRestaurant(rest);
    } else {
      setSelectedRestaurant(rest);
      setCustomerView('restaurant');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
        onBack={onBackToHome}
      />
    );
  }

  if (customerView === 'tracker') {
    return <LiveOrderTracker onBackToHome={onBackToHome} />;
  }

  if (customerView === 'history') {
    return (
      <OrderHistory
        onSelectOrder={() => {
          if (navigateCustomerView) navigateCustomerView('tracker');
          else setCustomerView('tracker');
        }}
        onBack={onBackToHome}
      />
    );
  }

  return (
    <div className="space-y-9 animate-in fade-in duration-300">
      
      {/* 1. Hero Banner: "One QR. Unlimited Choices." with 50% OFF Badge, AI Advisor & Compare Food Triggers */}
      <MallBiteHero 
        onExploreClick={() => {
          const el = document.getElementById('recommended-grid');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenAiModal={onOpenAiModal}
        onOpenCompareModal={onOpenCompareModal}
        onOpenStandee={onOpenStandee}
      />

      {/* 2. Popular Outlets Row (Live color-coded queue status badges & wait times) */}
      <PopularOutletsRow
        onSelectOutlet={(outlet) => {
          const match = restaurants.find(r => r.name.toLowerCase().includes(outlet.name.toLowerCase().split(' ')[0])) || restaurants[0];
          handleOutletClick(match);
        }}
        onViewAll={() => {
          const el = document.getElementById('restaurants-grid');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 3. "What would you like to eat?" Category Filter Pills + Wait Time Limits */}
      <WhatWouldYouLikeToEat
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        selectedMaxWait={selectedMaxWait}
        onSelectMaxWait={(time) => setSelectedMaxWait(time)}
        onOpenAiRecommend={onOpenAiModal}
      />

      {/* 4. "Recommended for you" Dish Cards Grid (With AI Alternative swap trigger on busy queues) */}
      <div id="recommended-grid">
        <RecommendedDishesGrid 
          selectedCategory={selectedCategory} 
          selectedMaxWait={selectedMaxWait}
          onTriggerAlternative={onTriggerAlternative}
        />
      </div>

      {/* 5. Trust Badges & Delivery Runner Banner */}
      <TrustAndDeliveryBanners />

      {/* 6. "HOW IT WORKS" 5-Step Visual Workflow */}
      <HowItWorksSteps />

      {/* Floating Quick Action Widget for Table Standee, Mobile Preview & Hackathon Architecture */}
      <div className="bg-[#FFF4EC] border border-[#F6DEC9] rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#F95721] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#F95721]/20">
            <QrCode className="w-6 h-6" />
          </div>
          <div className="text-left">
            <h4 className="text-sm font-black text-[#2A2521] font-display">
              Physical Table Standee & Judge Showcase
            </h4>
            <p className="text-xs text-[#6F665D]">
              Preview the acrylic table tent QR standee, test phone frames, or view technical architecture.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={onOpenStandee}
            className="flex items-center gap-2 bg-[#F95721] hover:bg-[#EA580C] text-white text-xs font-black py-2.5 px-3.5 rounded-xl shadow-md shadow-[#F95721]/25 transition-all font-display"
          >
            <QrCode className="w-4 h-4" />
            <span>Table Standee</span>
          </button>
          <button
            onClick={onOpenMobile}
            className="flex items-center gap-2 bg-white hover:bg-[#FAF7F2] text-[#2A2521] text-xs font-black py-2.5 px-3 rounded-xl border border-[#EFE8DE] shadow-xs transition-all font-display"
          >
            <Smartphone className="w-4 h-4 text-[#F95721]" />
            <span>Mobile</span>
          </button>
          <button
            onClick={onOpenArchitecture}
            className="flex items-center gap-2 bg-[#2A2521] hover:bg-black text-[#F3ECE0] text-xs font-black py-2.5 px-3.5 rounded-xl shadow-md shadow-[#2A2521]/20 transition-all font-display"
          >
            <Workflow className="w-4 h-4 text-[#F95721]" />
            <span>Architecture</span>
          </button>
        </div>
      </div>

      {/* 7. Top Food Outlets in Food Court (Full Outlet Directory) */}
      <div id="restaurants-grid" className="pt-2">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-[#2A2521] font-display tracking-tight">
                Top Food Outlets in Food Court
              </h2>
              <span className="bg-[#FFF2EB] text-[#F95721] text-xs font-black px-2.5 py-0.5 rounded-full border border-[#F6DEC9]">
                {filteredRestaurants.length} Outlets
              </span>
            </div>
            <p className="text-xs text-[#8E857C] font-medium mt-0.5">
              Order from any outlet in 1 single combined cart for Table {currentTable.number || "A12"}
            </p>
          </div>

          {/* Quick Filters */}
          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1">
            <button
              onClick={() => setFilterType('all')}
              className={`px-4 py-2 rounded-2xl text-xs font-black transition-all ${
                filterType === 'all' 
                  ? 'bg-[#2A2521] text-white shadow-md' 
                  : 'bg-white border border-[#EFE8DE] text-[#6C635B] hover:bg-[#FAF7F2]'
              }`}
            >
              All Outlets
            </button>
            <button
              onClick={() => setFilterType('veg')}
              className={`px-4 py-2 rounded-2xl text-xs font-black transition-all ${
                filterType === 'veg' 
                  ? 'bg-[#4E8752] text-white shadow-md' 
                  : 'bg-white border border-[#EFE8DE] text-[#6C635B] hover:bg-[#FAF7F2]'
              }`}
            >
              Pure Veg Only
            </button>
            <button
              onClick={() => setFilterType('rating')}
              className={`px-4 py-2 rounded-2xl text-xs font-black transition-all flex items-center gap-1.5 ${
                filterType === 'rating' 
                  ? 'bg-[#F95721] text-white shadow-md' 
                  : 'bg-white border border-[#EFE8DE] text-[#6C635B] hover:bg-[#FAF7F2]'
              }`}
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
              onSelect={handleOutletClick}
            />
          ))}
        </div>
      </div>

    </div>
  );
};

const MainAppContent = () => {
  const { currentRole, setCurrentRole } = useAuth();
  const { restaurants } = useMall();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isStandeeModalOpen, setIsStandeeModalOpen] = useState(false);
  const [isMobileSimulatorOpen, setIsMobileSimulatorOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isArchModalOpen, setIsArchModalOpen] = useState(false);
  const [isAltModalOpen, setIsAltModalOpen] = useState(false);
  const [altTargetItem, setAltTargetItem] = useState(null);
  const [altList, setAltList] = useState([]);
  const [altTargetWait, setAltTargetWait] = useState(22);
  const [altUserMaxWait, setAltUserMaxWait] = useState(15);
  const [customerView, setCustomerView] = useState('home'); // home | restaurant | tracker | history
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [activeNav, setActiveNav] = useState('home');

  // Close all overlay modals helper
  const closeAllModals = useCallback(() => {
    setIsSearchOpen(false);
    setIsStandeeModalOpen(false);
    setIsMobileSimulatorOpen(false);
    setIsAiModalOpen(false);
    setIsCompareModalOpen(false);
    setIsArchModalOpen(false);
    setIsAltModalOpen(false);
  }, []);

  // Back to Customer Home Handler
  const handleBackToHome = useCallback(() => {
    closeAllModals();
    setCurrentRole(ROLES.CUSTOMER);
    setCustomerView('home');
    setSelectedRestaurant(null);
    setActiveNav('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      if (window.history.state && (window.history.state.view !== 'home' || window.history.state.role !== ROLES.CUSTOMER)) {
        window.history.pushState({ role: ROLES.CUSTOMER, view: 'home' }, '', window.location.pathname);
      }
    } catch {
      // Ignore if history API restricted
    }
  }, [setCurrentRole, closeAllModals]);

  // Navigate customer sub-views with browser history support
  const navigateCustomerView = useCallback((newView, rest = null) => {
    closeAllModals();
    setCurrentRole(ROLES.CUSTOMER);
    setCustomerView(newView);
    if (newView === 'restaurant') {
      setSelectedRestaurant(rest);
    } else {
      setSelectedRestaurant(null);
    }
    if (newView === 'home') setActiveNav('home');
    else if (newView === 'history') setActiveNav('orders');

    try {
      window.history.pushState(
        { role: ROLES.CUSTOMER, view: newView, restaurantId: rest?.id || null },
        '',
        window.location.pathname
      );
    } catch {
      // Ignore
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [setCurrentRole, closeAllModals]);

  const handleSelectRestaurant = useCallback((rest) => {
    navigateCustomerView('restaurant', rest);
  }, [navigateCustomerView]);

  // Handle switching roles with history support
  const handleSwitchRole = useCallback((newRole) => {
    closeAllModals();
    setCurrentRole(newRole);
    setCustomerView('home');
    setSelectedRestaurant(null);
    try {
      window.history.pushState({ role: newRole, view: 'home' }, '', window.location.pathname);
    } catch {
      // Ignore
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [setCurrentRole, closeAllModals]);

  // Browser Back Button (popstate) sync
  useEffect(() => {
    try {
      if (!window.history.state) {
        window.history.replaceState({ role: ROLES.CUSTOMER, view: 'home' }, '', window.location.pathname);
      }
    } catch {
      // Ignore
    }

    const handlePopState = (e) => {
      closeAllModals();
      const state = e.state;
      if (state) {
        if (state.role && state.role !== currentRole) {
          setCurrentRole(state.role);
        }
        if (state.view) {
          setCustomerView(state.view);
          if (state.view === 'restaurant' && state.restaurantId) {
            const found = restaurants.find(r => r.id === state.restaurantId);
            if (found) setSelectedRestaurant(found);
          } else if (state.view !== 'restaurant') {
            setSelectedRestaurant(null);
          }
        } else {
          setCustomerView('home');
          setSelectedRestaurant(null);
        }
      } else {
        setCurrentRole(ROLES.CUSTOMER);
        setCustomerView('home');
        setSelectedRestaurant(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentRole, setCurrentRole, restaurants, closeAllModals]);

  const handleTriggerAlternative = (dish, fasterList, targetWait, userMaxWait) => {
    setAltTargetItem(dish);
    setAltList(fasterList || []);
    setAltTargetWait(targetWait || 22);
    setAltUserMaxWait(userMaxWait || 15);
    setIsAltModalOpen(true);
  };

  return (
    <div className="min-h-screen flex bg-[#FAF7F2] text-[#2D2620]">
      
      {/* Left Sidebar (Desktop layout matching user design) */}
      {currentRole === ROLES.CUSTOMER && (
        <MallBiteSidebar
          activeNav={activeNav}
          onSelectNav={(navId) => {
            setActiveNav(navId);
            if (navId === 'home') handleBackToHome();
            else if (navId === 'orders') navigateCustomerView('history');
            else if (navId === 'ai-advisor') setIsAiModalOpen(true);
            else if (navId === 'compare') setIsCompareModalOpen(true);
            else if (navId === 'outlets') {
              if (customerView !== 'home') handleBackToHome();
              setTimeout(() => {
                const el = document.getElementById('restaurants-grid');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }
          }}
          onOpenStandee={() => setIsStandeeModalOpen(true)}
          onOpenAiModal={() => setIsAiModalOpen(true)}
          onOpenCompareModal={() => setIsCompareModalOpen(true)}
          onOpenArchitecture={() => setIsArchModalOpen(true)}
          onExploreClick={() => {
            if (customerView !== 'home') handleBackToHome();
            setTimeout(() => {
              const el = document.getElementById('recommended-grid');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Sticky Notification Bar when in other Role Dashboards with Instant Back Option */}
        {currentRole !== ROLES.CUSTOMER && (
          <div className="sticky top-0 z-50 bg-[#2A2521] text-white border-b border-[#3D352E] py-2.5 px-4 sm:px-6 flex items-center justify-between text-xs font-bold shadow-md">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F95721] animate-pulse" />
              <span>
                Viewing <strong>{currentRole === ROLES.MALL_ADMIN ? 'Mall Admin Dashboard' : currentRole === ROLES.RESTAURANT ? 'Kitchen Dashboard' : currentRole === ROLES.DELIVERY ? 'Delivery Runner Hub' : 'Pitch Landing Page'}</strong>
              </span>
            </div>
            <button
              onClick={handleBackToHome}
              className="flex items-center gap-1.5 bg-[#F95721] hover:bg-[#EA580C] text-white px-3.5 py-1.5 rounded-xl text-xs font-black shadow-sm active:scale-95 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Customer Menu</span>
            </button>
          </div>
        )}

        {/* Top Universal Header with Search, User Profile, Standee and Mobile Triggers */}
        <Header
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenHistory={() => navigateCustomerView('history')}
          onOpenStandee={() => setIsStandeeModalOpen(true)}
          onOpenMobile={() => setIsMobileSimulatorOpen(true)}
          onOpenArchitecture={() => setIsArchModalOpen(true)}
          onBackToHome={handleBackToHome}
          showBack={customerView !== 'home' || currentRole !== ROLES.CUSTOMER}
        />

        {/* Dynamic Role / Main Hub View */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {currentRole === ROLES.LANDING && <LandingPage />}
          {currentRole === ROLES.RESTAURANT && <KitchenDashboard />}
          {currentRole === ROLES.MALL_ADMIN && <MallDashboard />}
          {currentRole === ROLES.DELIVERY && <DeliveryDashboard />}
          {currentRole === ROLES.CUSTOMER && (
            <CustomerHub
              onOpenSearch={() => setIsSearchOpen(true)}
              onOpenHistory={() => navigateCustomerView('history')}
              selectedRestaurant={selectedRestaurant}
              setSelectedRestaurant={setSelectedRestaurant}
              customerView={customerView}
              setCustomerView={setCustomerView}
              onOpenStandee={() => setIsStandeeModalOpen(true)}
              onOpenMobile={() => setIsMobileSimulatorOpen(true)}
              onOpenAiModal={() => setIsAiModalOpen(true)}
              onOpenCompareModal={() => setIsCompareModalOpen(true)}
              onOpenArchitecture={() => setIsArchModalOpen(true)}
              onTriggerAlternative={handleTriggerAlternative}
              onSelectRestaurant={handleSelectRestaurant}
              onBackToHome={handleBackToHome}
              navigateCustomerView={navigateCustomerView}
            />
          )}
        </main>
      </div>

      {/* Global Modals & Simulators */}
      <MultiCartDrawer />
      <CheckoutModal onOrderSuccess={() => navigateCustomerView('tracker')} />
      <SmartAISearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <QrScannerModal />
      <QrStandeeModal isOpen={isStandeeModalOpen} onClose={() => setIsStandeeModalOpen(false)} />
      <MobileDeviceSimulator isOpen={isMobileSimulatorOpen} onClose={() => setIsMobileSimulatorOpen(false)} />
      
      {/* Hackathon AI & Innovation Modals */}
      <AiFoodRecommendationModal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} />
      <SmartAlternativeModal
        isOpen={isAltModalOpen}
        onClose={() => setIsAltModalOpen(false)}
        selectedItem={altTargetItem}
        alternatives={altList}
        targetWait={altTargetWait}
        userMaxWait={altUserMaxWait}
      />
      <FoodComparisonModal isOpen={isCompareModalOpen} onClose={() => setIsCompareModalOpen(false)} />
      <ArchitectureModal isOpen={isArchModalOpen} onClose={() => setIsArchModalOpen(false)} />
      
      <DemoSimulatorModal />
      <NotificationToast />

      {/* Mobile Sticky Navigation */}
      <BottomNav
        activeTab={customerView}
        setActiveTab={(tab) => {
          if (tab === 'home') handleBackToHome();
          if (tab === 'orders') navigateCustomerView('history');
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenHistory={() => navigateCustomerView('history')}
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
