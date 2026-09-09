import React, { useState, useEffect } from 'react';
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
  Play,
  Flame,
  Radio,
  Clock,
  CheckCircle2,
  SlidersHorizontal
} from 'lucide-react';
import { useMall } from '../../context/MallContext';
import { useCart } from '../../context/CartContext';
import { useAuth, ROLES } from '../../context/AuthContext';

const SEARCH_PLACEHOLDERS = [
  'Search "🍔 Truffle Burger, 🍕 Farmhouse Pizza..."',
  'Try AI: "Spicy meal under ₹250 for two..."',
  'Search "☕ Iced Hazelnut Cold Coffee..."',
  'Try AI: "Pure veg quick bite in 10 mins..."',
  'Search "🌮 Crispy Tacos, 🥟 Steamed Dimsums..."'
];

export const Header = ({ onOpenSearch, onOpenHistory }) => {
  const { currentMall, currentTable, setIsQrScannerOpen, setIsDemoModalOpen } = useMall();
  const { totalItemsCount, cartSubtotal, setIsCartDrawerOpen } = useCart();
  const { currentRole, setCurrentRole } = useAuth();
  
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  // Rotate search placeholder smoothly
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % SEARCH_PLACEHOLDERS.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 transition-all">
      {/* 1. Sleek High-Tech Announcement Ticker Bar */}
      <div className="bg-gradient-to-r from-slate-950 via-brand-950 to-slate-950 text-white text-xs py-1.5 px-3 sm:px-6 border-b border-brand-500/20 shadow-inner flex items-center justify-between gap-2">
        {/* Left: Live Status Ticker */}
        <div className="flex items-center gap-2.5 overflow-hidden text-ellipsis whitespace-nowrap">
          <div className="flex items-center gap-1.5 bg-brand-500/20 border border-brand-400/30 text-amber-300 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold tracking-wide uppercase shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <Radio className="w-3 h-3 text-brand-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>One QR Hub</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-slate-300 font-medium text-xs">
            <span>Order from <strong>6 Live Outlets</strong> (Burger House, Pizza Corner, Wok Express & more) in <strong>1 Single Checkout!</strong></span>
            <span className="text-slate-600">•</span>
            <span className="text-amber-400 font-semibold flex items-center gap-1">
              <Clock className="w-3 h-3" /> Avg Delivery: 8-12 mins
            </span>
          </div>

          <div className="sm:hidden text-slate-300 text-[11px] truncate font-medium">
            Multi-Restaurant Checkout • Delivered to Table
          </div>
        </div>

        {/* Right: Interactive Demo Simulation Button */}
        <button 
          onClick={() => setIsDemoModalOpen(true)}
          className="group relative flex items-center gap-1.5 bg-gradient-to-r from-brand-500 via-orange-500 to-amber-500 hover:from-brand-400 hover:to-amber-400 text-white px-3 sm:px-3.5 py-1 rounded-full font-black text-[11px] sm:text-xs shadow-md shadow-brand-500/30 transition-all hover:scale-105 active:scale-95 shrink-0 overflow-hidden"
        >
          <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
          <Play className="w-3 h-3 fill-white" />
          <span>Demo Simulation</span>
          <span className="hidden md:inline-block bg-white/25 text-[10px] px-1.5 py-0.2 rounded-full uppercase tracking-wider font-bold">
            15s Test
          </span>
        </button>
      </div>

      {/* 2. Main Luxury Navbar */}
      <div className="glass-navbar bg-white/90 backdrop-blur-xl border-b border-slate-200/70 shadow-[0_4px_25px_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-[68px] gap-3 sm:gap-6">
            
            {/* Brand Logo & Location Pill */}
            <div className="flex items-center gap-3 sm:gap-6 shrink-0">
              {/* 3D Glossy Logo */}
              <button 
                onClick={() => setCurrentRole(ROLES.CUSTOMER)}
                className="flex items-center gap-2.5 group text-left focus:outline-none"
              >
                <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-brand-600 via-brand-500 to-amber-400 flex items-center justify-center text-white shadow-lg shadow-brand-500/25 group-hover:scale-105 transition-all duration-300 border border-white/40 ring-2 ring-brand-500/20">
                  <span className="text-xl sm:text-2xl font-black font-display tracking-tighter drop-shadow-sm">M</span>
                  <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center">
                    <span className="w-1 h-1 rounded-full bg-white animate-ping"></span>
                  </div>
                </div>
                <div className="hidden sm:block">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xl font-black font-display tracking-tight text-slate-950 flex items-center">
                      MALL<span className="text-gradient-brand">BITE</span>
                    </span>
                    <span className="bg-brand-50 text-brand-600 text-[9px] font-black px-1.5 py-0.5 rounded border border-brand-200/60 uppercase tracking-widest">
                      OS
                    </span>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block -mt-0.5">
                    Food Court Operating System
                  </span>
                </div>
              </button>

              {/* Mall & Table Identification Dropdown Badge */}
              <div className="relative group/mall">
                <button
                  className="relative flex items-center gap-2.5 bg-slate-50/90 hover:bg-slate-100/90 border border-slate-200/90 hover:border-brand-300 rounded-2xl px-3 sm:px-3.5 py-1.5 text-xs font-semibold text-slate-700 transition-all text-left shadow-sm hover:shadow cursor-pointer"
                  title="Click to switch Mall or Table"
                >
                  <div className="relative w-7 h-7 rounded-xl bg-gradient-to-tr from-brand-500 to-amber-400 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <MapPin className="w-4 h-4 text-white" />
                    <span className="radar-ping-ring"></span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-brand-600 uppercase font-black tracking-wider leading-none flex items-center gap-1">
                      {currentMall.name.split(' ')[0]} {currentMall.name.split(' ')[1]} <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    </span>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="font-extrabold font-display text-slate-900 text-xs sm:text-[13px] tracking-tight">
                        Table {currentTable.number} • {currentTable.zone ? currentTable.zone.split('(')[0] : 'Food Court'}
                      </span>
                      <ChevronDown className="w-3 h-3 text-slate-400 group-hover/mall:text-brand-500 transition-transform group-hover/mall:translate-y-0.5" />
                    </div>
                  </div>
                </button>

                {/* Dropdown Menu for Switching Mall and Table */}
                <div className="absolute left-0 mt-2 w-80 bg-white/95 backdrop-blur-xl rounded-3xl shadow-elevated border border-slate-100 p-3 hidden group-hover/mall:block transition-all z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-2 py-1 border-b border-slate-100 text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center justify-between">
                    <span>Select Active Shopping Mall</span>
                    <span className="text-brand-600 font-extrabold">Food Court OS</span>
                  </div>

                  <div className="space-y-1.5 mt-2">
                    {/* Mall 1: City Center Mall */}
                    <button
                      onClick={() => switchMall('mall-city')}
                      className={`w-full flex items-center gap-2.5 p-2 rounded-2xl text-xs text-left transition-all ${currentMall.id === 'mall-city' ? 'bg-brand-50 text-brand-700 font-extrabold border border-brand-200/60 shadow-sm' : 'text-slate-700 hover:bg-slate-50'}`}
                    >
                      <Building2 className={`w-4 h-4 shrink-0 ${currentMall.id === 'mall-city' ? 'text-brand-600' : 'text-slate-400'}`} />
                      <div className="flex-1 min-w-0">
                        <div className="truncate font-display">City Center Mall Food Court</div>
                        <div className="text-[10px] text-slate-400 font-normal">Level 3 Grand Atrium • 45 Tables</div>
                      </div>
                      {currentMall.id === 'mall-city' && <span className="w-2 h-2 rounded-full bg-brand-500 shrink-0"></span>}
                    </button>

                    {/* Mall 2: Phoenix Marketcity */}
                    <button
                      onClick={() => switchMall('mall-1')}
                      className={`w-full flex items-center gap-2.5 p-2 rounded-2xl text-xs text-left transition-all ${currentMall.id === 'mall-1' ? 'bg-brand-50 text-brand-700 font-extrabold border border-brand-200/60 shadow-sm' : 'text-slate-700 hover:bg-slate-50'}`}
                    >
                      <Building2 className={`w-4 h-4 shrink-0 ${currentMall.id === 'mall-1' ? 'text-brand-600' : 'text-slate-400'}`} />
                      <div className="flex-1 min-w-0">
                        <div className="truncate font-display">Phoenix Marketcity Food Hub</div>
                        <div className="text-[10px] text-slate-400 font-normal">Level 2 & 3 • Mumbai • 28 Tables</div>
                      </div>
                      {currentMall.id === 'mall-1' && <span className="w-2 h-2 rounded-full bg-brand-500 shrink-0"></span>}
                    </button>

                    {/* Mall 3: DLF Promenade */}
                    <button
                      onClick={() => switchMall('mall-dlf')}
                      className={`w-full flex items-center gap-2.5 p-2 rounded-2xl text-xs text-left transition-all ${currentMall.id === 'mall-dlf' ? 'bg-brand-50 text-brand-700 font-extrabold border border-brand-200/60 shadow-sm' : 'text-slate-700 hover:bg-slate-50'}`}
                    >
                      <Building2 className={`w-4 h-4 shrink-0 ${currentMall.id === 'mall-dlf' ? 'text-brand-600' : 'text-slate-400'}`} />
                      <div className="flex-1 min-w-0">
                        <div className="truncate font-display">DLF Promenade Food Atrium</div>
                        <div className="text-[10px] text-slate-400 font-normal">Level 2 • New Delhi • 22 Tables</div>
                      </div>
                      {currentMall.id === 'mall-dlf' && <span className="w-2 h-2 rounded-full bg-brand-500 shrink-0"></span>}
                    </button>
                  </div>

                  <div className="my-2 border-t border-slate-100"></div>

                  <div className="px-2 py-1 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Quick Table Selection
                  </div>
                  <div className="grid grid-cols-4 gap-1.5 mt-1.5">
                    {['A-01', 'A-05', 'A-12', 'A-24', 'B-05', 'B-12', 'C-05', 'C-12'].map((num) => (
                      <button
                        key={num}
                        onClick={() => switchTable(num)}
                        className={`py-1 text-xs rounded-xl font-bold transition-all text-center ${currentTable.number === num ? 'bg-brand-500 text-white shadow-sm font-black' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setIsQrScannerOpen(true)}
                    className="w-full mt-2.5 flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white py-2 rounded-2xl text-xs font-black shadow-sm transition-all"
                  >
                    <QrCode className="w-3.5 h-3.5 text-amber-400" />
                    <span>Scan Physical Table QR</span>
                  </button>
                </div>
              </div>
            </div>


            {/* AI Search Bar (Desktop) */}
            <div className="hidden md:flex flex-1 max-w-lg mx-2">
              <button
                onClick={onOpenSearch}
                className="w-full relative flex items-center justify-between bg-slate-100/70 hover:bg-slate-100/90 border border-slate-200/90 hover:border-brand-400/80 text-slate-500 rounded-2xl px-4 py-2 text-sm transition-all focus:outline-none hover:shadow-sm group overflow-hidden"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Search className="w-4 h-4 text-slate-400 group-hover:text-brand-500 transition-colors shrink-0" />
                  <span className="text-xs text-slate-500 font-medium truncate transition-all duration-300 text-left">
                    {SEARCH_PLACEHOLDERS[placeholderIndex]}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  <span className="flex items-center gap-1 text-[11px] font-extrabold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-xl border border-brand-200/70 shadow-sm">
                    <Sparkles className="w-3 h-3 text-brand-500 animate-pulse" />
                    AI Smart
                  </span>
                  <span className="hidden lg:inline-block bg-slate-200/70 text-slate-400 text-[10px] font-bold px-1.5 py-0.5 rounded">
                    ⌘K
                  </span>
                </div>
              </button>
            </div>

            {/* Right Action Icons & Role Switcher */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Search Icon (Mobile) */}
              <button
                onClick={onOpenSearch}
                className="md:hidden p-2 text-slate-600 hover:text-brand-500 hover:bg-slate-100 rounded-xl transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* QR Scan Button */}
              <button
                onClick={() => setIsQrScannerOpen(true)}
                className="hidden lg:flex items-center gap-1.5 bg-slate-100/80 hover:bg-slate-200/80 border border-slate-200 text-slate-700 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all hover:scale-105 active:scale-95 shadow-sm"
                title="Scan Table QR Code"
              >
                <QrCode className="w-4 h-4 text-brand-500" />
                <span>Scan QR</span>
              </button>

              {/* Multi-Restaurant Unified Cart Button */}
              <button
                onClick={() => setIsCartDrawerOpen(true)}
                className="relative flex items-center gap-2 bg-gradient-to-r from-brand-500 via-orange-500 to-amber-500 hover:from-brand-600 hover:to-amber-600 text-white px-3.5 sm:px-4 py-2 rounded-2xl font-black text-xs sm:text-sm shadow-md shadow-brand-500/25 transition-all hover:scale-105 active:scale-95 border border-white/20 shine-effect"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline font-display">Multi-Cart</span>
                {totalItemsCount > 0 ? (
                  <span className="bg-white text-brand-600 font-black text-xs px-2 py-0.5 rounded-full shadow-inner animate-bounce">
                    {totalItemsCount}
                  </span>
                ) : (
                  <span className="hidden md:inline text-[11px] text-white/80 font-normal">
                    (0)
                  </span>
                )}
              </button>

              {/* Role Switcher Menu */}
              <div className="relative group">
                <button 
                  className="flex items-center gap-2 bg-slate-950 hover:bg-slate-900 text-white px-3 sm:px-3.5 py-2 rounded-2xl text-xs font-bold transition-all shadow-md shadow-slate-950/20 border border-slate-800"
                >
                  {currentRole === ROLES.CUSTOMER && <User className="w-3.5 h-3.5 text-emerald-400" />}
                  {currentRole === ROLES.RESTAURANT && <Store className="w-3.5 h-3.5 text-amber-400" />}
                  {currentRole === ROLES.MALL_ADMIN && <Building2 className="w-3.5 h-3.5 text-blue-400" />}
                  {currentRole === ROLES.DELIVERY && <Bike className="w-3.5 h-3.5 text-purple-400" />}
                  {currentRole === ROLES.LANDING && <Layers className="w-3.5 h-3.5 text-pink-400" />}
                  
                  <span className="capitalize hidden sm:inline font-display">
                    {currentRole === ROLES.MALL_ADMIN ? 'Mall Admin' : currentRole === ROLES.RESTAURANT ? 'Kitchen' : currentRole === ROLES.DELIVERY ? 'Runner' : currentRole === ROLES.LANDING ? 'Pitch' : 'Customer'}
                  </span>
                  <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-white transition-transform group-hover:rotate-180" />
                </button>

                {/* Dropdown Options */}
                <div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-3xl shadow-elevated border border-slate-100 p-2 hidden group-hover:block transition-all z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2 border-b border-slate-100 text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center justify-between">
                    <span>Switch Role Interface</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  </div>

                  <div className="space-y-1 mt-1">
                    <button
                      onClick={() => setCurrentRole(ROLES.CUSTOMER)}
                      className={`w-full flex items-center gap-3 p-2.5 rounded-2xl text-xs text-left font-semibold transition-all ${currentRole === ROLES.CUSTOMER ? 'text-brand-600 bg-brand-50/80 font-bold shadow-sm' : 'text-slate-700 hover:bg-slate-50'}`}
                    >
                      <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 font-display">Customer Hub</div>
                        <div className="text-[10px] text-slate-400 font-normal">Table ordering, multi-cart & tracking</div>
                      </div>
                    </button>

                    <button
                      onClick={() => setCurrentRole(ROLES.RESTAURANT)}
                      className={`w-full flex items-center gap-3 p-2.5 rounded-2xl text-xs text-left font-semibold transition-all ${currentRole === ROLES.RESTAURANT ? 'text-brand-600 bg-brand-50/80 font-bold shadow-sm' : 'text-slate-700 hover:bg-slate-50'}`}
                    >
                      <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                        <Store className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 font-display">Kitchen Admin</div>
                        <div className="text-[10px] text-slate-400 font-normal">Live orders pipeline & inventory</div>
                      </div>
                    </button>

                    <button
                      onClick={() => setCurrentRole(ROLES.MALL_ADMIN)}
                      className={`w-full flex items-center gap-3 p-2.5 rounded-2xl text-xs text-left font-semibold transition-all ${currentRole === ROLES.MALL_ADMIN ? 'text-brand-600 bg-brand-50/80 font-bold shadow-sm' : 'text-slate-700 hover:bg-slate-50'}`}
                    >
                      <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 font-display">Mall Admin</div>
                        <div className="text-[10px] text-slate-400 font-normal">Floor heatmap, QR codes & analytics</div>
                      </div>
                    </button>

                    <button
                      onClick={() => setCurrentRole(ROLES.DELIVERY)}
                      className={`w-full flex items-center gap-3 p-2.5 rounded-2xl text-xs text-left font-semibold transition-all ${currentRole === ROLES.DELIVERY ? 'text-brand-600 bg-brand-50/80 font-bold shadow-sm' : 'text-slate-700 hover:bg-slate-50'}`}
                    >
                      <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                        <Bike className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 font-display">Delivery Runner</div>
                        <div className="text-[10px] text-slate-400 font-normal">Multi-counter pickup & table drop</div>
                      </div>
                    </button>

                    <div className="my-1 border-t border-slate-100"></div>

                    <button
                      onClick={() => setCurrentRole(ROLES.LANDING)}
                      className={`w-full flex items-center gap-3 p-2.5 rounded-2xl text-xs text-left font-semibold transition-all ${currentRole === ROLES.LANDING ? 'text-brand-600 bg-brand-50/80 font-bold shadow-sm' : 'text-slate-700 hover:bg-slate-50'}`}
                    >
                      <div className="w-8 h-8 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center shrink-0">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 font-display">Pitch Deck</div>
                        <div className="text-[10px] text-slate-400 font-normal">Business model & investor deck</div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </header>
  );
};
