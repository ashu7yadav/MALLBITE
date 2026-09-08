import React from 'react';
import { 
  MapPin, 
  Search, 
  ShoppingBag, 
  Sparkles, 
  QrCode, 
  Store, 
  Building2, 
  Bike, 
  User, 
  Layers,
  ChevronDown,
  Play
} from 'lucide-react';
import { useMall } from '../../context/MallContext';
import { useCart } from '../../context/CartContext';
import { useAuth, ROLES } from '../../context/AuthContext';

export const Header = ({ onOpenSearch, onOpenHistory }) => {
  const { currentMall, currentTable, setIsQrScannerOpen, setIsDemoModalOpen } = useMall();
  const { totalItemsCount, distinctRestaurantsCount, setIsCartDrawerOpen } = useCart();
  const { currentRole, setCurrentRole } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all">
      {/* Top Banner Notice for Mall Concept */}
      <div className="bg-gradient-to-r from-brand-600 via-brand-500 to-amber-500 text-white text-xs py-1.5 px-4 font-medium flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="bg-white/20 px-2 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase">
            One QR Hub
          </span>
          <span>Order from Burger House, Pizza Corner & more in ONE single checkout!</span>
        </div>
        <button 
          onClick={() => setIsDemoModalOpen(true)}
          className="flex items-center gap-1.5 bg-white text-brand-600 hover:bg-amber-50 px-3 py-0.5 rounded-full font-bold text-xs shadow-sm transition-transform active:scale-95 whitespace-nowrap"
        >
          <Play className="w-3 h-3 fill-brand-600" />
          <span>Demo Simulation</span>
        </button>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Logo & Location Pill */}
          <div className="flex items-center gap-4 lg:gap-8">
            {/* Logo */}
            <button 
              onClick={() => setCurrentRole(ROLES.CUSTOMER)}
              className="flex items-center gap-2 group text-left focus:outline-none"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
                <span className="text-xl font-black tracking-tighter">M</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 flex items-center gap-1">
                  MALL<span className="text-brand-500">BITE</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block -mt-1">
                  Food Court OS
                </span>
              </div>
            </button>

            {/* Table Identification Dropdown Badge (Matches Swiggy location selector) */}
            <button
              onClick={() => setIsQrScannerOpen(true)}
              className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-full px-3.5 py-1.5 text-xs font-semibold text-slate-700 transition-colors group text-left"
              title="Click to scan or switch table"
            >
              <div className="w-6 h-6 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center">
                <MapPin className="w-3.5 h-3.5 text-brand-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider leading-none">
                  Your Food Court Table
                </span>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-slate-900 text-xs">
                    Table {currentTable.number} • {currentTable.zone}
                  </span>
                  <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-brand-500" />
                </div>
              </div>
            </button>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-md mx-2">
            <button
              onClick={onOpenSearch}
              className="w-full flex items-center justify-between bg-slate-100/80 hover:bg-slate-100 border border-slate-200 text-slate-500 rounded-full px-4 py-2 text-sm transition-all focus:outline-none hover:border-brand-300 group"
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-slate-400 group-hover:text-brand-500" />
                <span className="text-xs text-slate-500">Search burgers, pizza, coffee or try AI search...</span>
              </div>
              <span className="flex items-center gap-1 text-[11px] font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full border border-brand-200/60">
                <Sparkles className="w-3 h-3 text-brand-500" />
                AI Smart
              </span>
            </button>
          </div>

          {/* Right Action Icons & Role Switcher */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Icon (Mobile) */}
            <button
              onClick={onOpenSearch}
              className="md:hidden p-2 text-slate-600 hover:text-brand-500 hover:bg-slate-100 rounded-full"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* QR Scan Button */}
            <button
              onClick={() => setIsQrScannerOpen(true)}
              className="hidden lg:flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"
              title="Scan Table QR Code"
            >
              <QrCode className="w-3.5 h-3.5 text-slate-600" />
              <span>Scan QR</span>
            </button>

            {/* Multi-Restaurant Unified Cart Button */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white px-3.5 sm:px-4 py-2 rounded-full font-bold text-xs sm:text-sm shadow-md shadow-brand-500/25 transition-transform active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Multi-Cart</span>
              {totalItemsCount > 0 && (
                <span className="bg-white text-brand-600 font-extrabold text-[11px] px-2 py-0.2 rounded-full shadow-inner">
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* Role Switcher Menu */}
            <div className="relative group">
              <button 
                className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm"
              >
                {currentRole === ROLES.CUSTOMER && <User className="w-3.5 h-3.5 text-emerald-400" />}
                {currentRole === ROLES.RESTAURANT && <Store className="w-3.5 h-3.5 text-amber-400" />}
                {currentRole === ROLES.MALL_ADMIN && <Building2 className="w-3.5 h-3.5 text-blue-400" />}
                {currentRole === ROLES.DELIVERY && <Bike className="w-3.5 h-3.5 text-purple-400" />}
                {currentRole === ROLES.LANDING && <Layers className="w-3.5 h-3.5 text-pink-400" />}
                
                <span className="capitalize hidden sm:inline">
                  {currentRole === ROLES.MALL_ADMIN ? 'Mall Admin' : currentRole === ROLES.RESTAURANT ? 'Kitchen' : currentRole === ROLES.DELIVERY ? 'Runner' : currentRole === ROLES.LANDING ? 'Pitch Deck' : 'Customer'}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {/* Dropdown Options */}
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-elevated border border-slate-100 py-2 hidden group-hover:block transition-all z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-1.5 border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Switch Interface Role
                </div>
                <button
                  onClick={() => setCurrentRole(ROLES.CUSTOMER)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left font-semibold hover:bg-slate-50 transition-colors ${currentRole === ROLES.CUSTOMER ? 'text-brand-600 bg-brand-50/60' : 'text-slate-700'}`}
                >
                  <User className="w-4 h-4 text-emerald-500" />
                  <div>
                    <div className="font-bold">Customer Food Hub</div>
                    <div className="text-[10px] text-slate-400 font-normal">Table A-24 ordering & tracking</div>
                  </div>
                </button>
                <button
                  onClick={() => setCurrentRole(ROLES.RESTAURANT)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left font-semibold hover:bg-slate-50 transition-colors ${currentRole === ROLES.RESTAURANT ? 'text-brand-600 bg-brand-50/60' : 'text-slate-700'}`}
                >
                  <Store className="w-4 h-4 text-amber-500" />
                  <div>
                    <div className="font-bold">Restaurant Kitchen Admin</div>
                    <div className="text-[10px] text-slate-400 font-normal">Live orders, menu & stocks</div>
                  </div>
                </button>
                <button
                  onClick={() => setCurrentRole(ROLES.MALL_ADMIN)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left font-semibold hover:bg-slate-50 transition-colors ${currentRole === ROLES.MALL_ADMIN ? 'text-brand-600 bg-brand-50/60' : 'text-slate-700'}`}
                >
                  <Building2 className="w-4 h-4 text-blue-500" />
                  <div>
                    <div className="font-bold">Mall Management Admin</div>
                    <div className="text-[10px] text-slate-400 font-normal">Heatmaps, QR generator, Analytics</div>
                  </div>
                </button>
                <button
                  onClick={() => setCurrentRole(ROLES.DELIVERY)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left font-semibold hover:bg-slate-50 transition-colors ${currentRole === ROLES.DELIVERY ? 'text-brand-600 bg-brand-50/60' : 'text-slate-700'}`}
                >
                  <Bike className="w-4 h-4 text-purple-500" />
                  <div>
                    <div className="font-bold">Delivery Runner Staff</div>
                    <div className="text-[10px] text-slate-400 font-normal">Multi-counter pickup to table</div>
                  </div>
                </button>
                <div className="my-1 border-t border-slate-100"></div>
                <button
                  onClick={() => setCurrentRole(ROLES.LANDING)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left font-semibold hover:bg-slate-50 transition-colors ${currentRole === ROLES.LANDING ? 'text-brand-600 bg-brand-50/60' : 'text-slate-700'}`}
                >
                  <Layers className="w-4 h-4 text-pink-500" />
                  <div>
                    <div className="font-bold">Startup Landing & Pitch</div>
                    <div className="text-[10px] text-slate-400 font-normal">Business model & value prop</div>
                  </div>
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
