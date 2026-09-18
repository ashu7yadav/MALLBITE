import React from 'react';
import { 
  Home, 
  UtensilsCrossed, 
  BookOpen, 
  Tag, 
  ShoppingBag, 
  Heart, 
  BellRing, 
  HelpCircle, 
  MapPin, 
  ChevronRight, 
  LogOut, 
  Sparkles,
  QrCode,
  Store,
  Layers,
  Scale,
  Workflow,
  Users
} from 'lucide-react';
import { useMall } from '../../context/MallContext';
import { useAuth, ROLES } from '../../context/AuthContext';

export const MallBiteSidebar = ({ 
  activeNav = 'home', 
  onSelectNav, 
  onOpenStandee, 
  onExploreClick,
  onOpenAiModal,
  onOpenGroupPlanner,
  onOpenCompareModal,
  onOpenArchitecture
}) => {
  const { currentMall, currentTable, setIsQrScannerOpen, allMalls, switchMall, addNotification } = useMall();
  const { currentRole, setCurrentRole } = useAuth();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'group-planner', label: 'Group Planner', icon: Users, badge: 'AI' },
    { id: 'ai-advisor', label: 'AI Food Advisor', icon: Sparkles, badge: 'AI' },
    { id: 'compare', label: 'Compare Food', icon: Scale, badge: 'NEW' },
    { id: 'outlets', label: 'All Outlets', icon: Store },
    { id: 'offers', label: 'Offers', icon: Tag, badge: '50% OFF' },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'tableservice', label: 'Table Service', icon: BellRing },
    { id: 'support', label: 'Help & Support', icon: HelpCircle }
  ];

  const handleTableServiceRequest = () => {
    addNotification(
      "Runner Notified 🔔",
      `Mall staff runner dispatched to Table ${currentTable.number} for assistance!`,
      "success"
    );
  };

  return (
    <aside className="w-64 shrink-0 hidden xl:flex flex-col justify-between p-5 bg-white border-r border-[#EFE8DE] min-h-screen sticky top-0 shadow-sm">
      
      {/* Top Brand Section */}
      <div className="space-y-6">
        
        {/* Logo */}
        <div className="flex items-center gap-3 px-1">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#F95721] to-[#EA580C] flex items-center justify-center text-white shadow-md shadow-[#F95721]/25">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-black font-display tracking-tight text-[#2A2521] leading-none">
              Mall<span className="text-[#F95721]">Bite</span>
            </h1>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#A0988F] mt-0.5">
              One QR. Unlimited Choices.
            </p>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'tableservice') {
                    handleTableServiceRequest();
                  } else if (item.id === 'group-planner' && onOpenGroupPlanner) {
                    onOpenGroupPlanner();
                  } else if (item.id === 'ai-advisor' && onOpenAiModal) {
                    onOpenAiModal();
                  } else if (item.id === 'compare' && onOpenCompareModal) {
                    onOpenCompareModal();
                  } else if (onSelectNav) {
                    onSelectNav(item.id);
                  }
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-[#F95721] text-white shadow-md shadow-[#F95721]/30 font-black'
                    : 'text-[#6C635B] hover:bg-[#FAF4EB] hover:text-[#2A2521]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#8E857C]'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-white text-[#F95721]' : 'bg-[#FFF2EB] text-[#F95721]'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Promo Card (As in design) */}
        <div className="relative rounded-2xl bg-gradient-to-br from-[#FFF5ED] via-[#FDF3EA] to-[#FBF0E4] p-4 border border-[#F6DFD0] overflow-hidden text-center">
          <div className="w-9 h-9 rounded-xl bg-[#F95721]/15 text-[#F95721] flex items-center justify-center mx-auto mb-2 shadow-sm">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12A10 10 0 0 1 12 2Z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <p className="text-xs font-bold text-[#3D352E] leading-snug">
            Order from multiple outlets, one simple order.
          </p>
          <button
            onClick={onExploreClick}
            className="mt-3 w-full bg-[#F95721] hover:bg-[#EA580C] active:scale-95 text-white font-black text-xs py-2 px-3 rounded-xl shadow-md shadow-[#F95721]/20 transition-all font-display"
          >
            Order Now
          </button>
        </div>

      </div>

      {/* Bottom Section: Location & Table No + Logout */}
      <div className="pt-4 space-y-3 border-t border-[#EFE8DE]">
        
        {/* Table No. & Mall Location Card (Exact match to design) */}
        <div className="bg-[#FAF7F2] rounded-2xl p-3.5 border border-[#EFE8DE] space-y-2">
          
          {/* Mall Selector Line */}
          <div className="flex items-center justify-between text-xs font-bold text-[#3E362F]">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded-lg bg-[#F95721]/10 text-[#F95721] flex items-center justify-center shrink-0">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <div className="truncate">
                <div className="text-[11px] font-black text-[#2A2521] leading-none truncate">
                  {currentMall.name}
                </div>
                <div className="text-[10px] text-[#8E857C] font-medium leading-tight">
                  {currentMall.city || "Lucknow"}
                </div>
              </div>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-[#8E857C] shrink-0" />
          </div>

          {/* Table Number with Change CTA */}
          <div className="flex items-center justify-between pt-2 border-t border-[#EFE8DE]">
            <div>
              <span className="text-[10px] font-bold text-[#8E857C] uppercase tracking-wider block">Table No.</span>
              <span className="text-xl font-black text-[#2A2521] font-display">
                {currentTable.number || "A12"}
              </span>
            </div>

            <button
              onClick={() => setIsQrScannerOpen(true)}
              className="text-xs font-black text-[#F95721] hover:text-[#EA580C] hover:underline"
            >
              Change
            </button>
          </div>

        </div>

        {/* View Physical Standee QR Card Button */}
        {onOpenStandee && (
          <button
            onClick={onOpenStandee}
            className="w-full flex items-center justify-center gap-2 bg-[#FFF4EC] hover:bg-[#FFEADA] text-[#F95721] font-bold text-xs py-2 rounded-xl border border-[#F6DEC9] transition-all"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>View Table Standee QR</span>
          </button>
        )}

        {/* View Technical Architecture Pipeline */}
        {onOpenArchitecture && (
          <button
            onClick={onOpenArchitecture}
            className="w-full flex items-center justify-center gap-2 bg-[#2A2521] hover:bg-black text-[#F3ECE0] font-bold text-xs py-2 rounded-xl border border-[#3D352E] transition-all shadow-xs"
          >
            <Workflow className="w-3.5 h-3.5 text-[#F95721]" />
            <span>Tech Architecture (Judges)</span>
          </button>
        )}

        {/* Role Switcher / Demo Mode */}
        <div className="flex items-center justify-between pt-1 text-xs text-[#8E857C]">
          <span className="font-medium text-[11px]">Role: <strong className="text-[#2A2521]">Customer</strong></span>
          <button
            onClick={() => setCurrentRole(ROLES.MALL_ADMIN)}
            className="flex items-center gap-1 font-bold text-[#6C635B] hover:text-[#F95721] transition-colors text-[11px]"
          >
            <Layers className="w-3 h-3" />
            <span>Mall Admin</span>
          </button>
        </div>

      </div>

    </aside>
  );
};
