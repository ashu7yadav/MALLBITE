import React from 'react';
import { 
  Layers, 
  X, 
  Cpu, 
  Database, 
  Sparkles, 
  ArrowDown, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Smartphone, 
  Store, 
  Building2, 
  Clock, 
  Workflow 
} from 'lucide-react';

export const ArchitectureModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FAF7F2] rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-[#EFE8DE] overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#2A2521] text-white p-5 sm:p-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#F95721] to-[#F59E0B] flex items-center justify-center text-white shadow-md shadow-[#F95721]/30">
              <Workflow className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black font-display text-white">
                  Technical Architecture & Operating System Model
                </h3>
                <span className="bg-[#F95721] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                  Hackathon Ready
                </span>
              </div>
              <p className="text-xs text-[#C5BCB2] mt-0.5 font-medium">
                End-to-end data pipeline from physical table QR to multi-outlet kitchen dispatch
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-[#C5BCB2] hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 text-left">
          
          {/* Architectural Flow Diagram Card */}
          <div className="bg-white rounded-3xl p-6 border border-[#EFE8DE] shadow-xs">
            <h4 className="text-sm font-black uppercase tracking-wider text-[#6F665D] mb-6 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#F95721]" />
              <span>MallBite System Pipeline</span>
            </h4>

            <div className="space-y-4">
              
              {/* Layer 1: Client Interfaces */}
              <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#EFE8DE]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#F95721]">Layer 1: Unified Client Layer</span>
                  <span className="text-[10px] bg-white px-2 py-0.5 rounded-md font-bold text-[#6F665D]">React 18 • Vite • Tailwind</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-bold text-[#2A2521]">
                  <div className="bg-white p-2.5 rounded-xl border border-[#EFE8DE] flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-[#F95721]" />
                    <span>Customer Mobile Hub (QR)</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-[#EFE8DE] flex items-center gap-2">
                    <Store className="w-4 h-4 text-amber-600" />
                    <span>Kitchen Orders Dashboard</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-[#EFE8DE] flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-blue-600" />
                    <span>Mall Admin SaaS & Crowd</span>
                  </div>
                </div>
              </div>

              {/* Arrow Connector */}
              <div className="flex justify-center -my-2 text-[#C5BCB2]">
                <ArrowDown className="w-5 h-5 text-[#F95721] animate-bounce" />
              </div>

              {/* Layer 2: API & Gateway */}
              <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#EFE8DE]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#2A2521]">Layer 2: API & Multi-Tenant Routing Engine</span>
                  <span className="text-[10px] bg-white px-2 py-0.5 rounded-md font-bold text-[#6F665D]">Node.js • Express • REST</span>
                </div>
                <div className="text-xs text-[#6F665D] bg-white p-3 rounded-xl border border-[#EFE8DE] space-y-1">
                  <div>• <code>POST /api/orders</code>: Splits unified cart into concurrent outlet sub-orders (P-402, S-108, J-305)</div>
                  <div>• <code>GET /tables/detect/:number</code>: Resolves physical table coordinates from QR payload</div>
                </div>
              </div>

              {/* Arrow Connector */}
              <div className="flex justify-center -my-2 text-[#C5BCB2]">
                <ArrowDown className="w-5 h-5 text-[#F95721]" />
              </div>

              {/* Layer 3: AI Intelligence Engine */}
              <div className="bg-gradient-to-br from-[#FFF4EC] to-[#FAF4EB] p-5 rounded-2xl border border-[#F6DEC9] shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black uppercase tracking-wider text-[#F95721] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Layer 3: MallBite AI Intelligence Core</span>
                  </span>
                  <span className="text-[10px] bg-[#F95721] text-white px-2 py-0.5 rounded-md font-black">Modular ML Ready</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                  <div className="bg-white p-3 rounded-xl border border-[#F6DEC9]">
                    <h5 className="font-black text-xs text-[#2A2521]">Recommendation</h5>
                    <p className="text-[10px] text-[#6F665D] mt-1">
                      Multi-attribute weighted model: Budget, cuisine, dietary tags, time limit & ratings.
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-[#F6DEC9]">
                    <h5 className="font-black text-xs text-[#2A2521]">Queue Wait Model</h5>
                    <p className="text-[10px] text-[#6F665D] mt-1">
                      <code>(Queue × Prep) / Staff</code> formula with cuisine complexity coefficient.
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-[#F6DEC9]">
                    <h5 className="font-black text-xs text-[#2A2521]">Demand Forecast</h5>
                    <p className="text-[10px] text-[#6F665D] mt-1">
                      Hourly peak curve modeling with automated staff and inventory alerts.
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-[#F6DEC9]">
                    <h5 className="font-black text-xs text-[#2A2521]">Smart Batching</h5>
                    <p className="text-[10px] text-[#6F665D] mt-1">
                      Pickup window synchronization: $\max(t_i)$ across all order counters.
                    </p>
                  </div>
                </div>
              </div>

              {/* Arrow Connector */}
              <div className="flex justify-center -my-2 text-[#C5BCB2]">
                <ArrowDown className="w-5 h-5 text-[#F95721]" />
              </div>

              {/* Layer 4: Data Layer */}
              <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#EFE8DE]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#6F665D]">Layer 4: In-Memory Datastore & Unified Order Engine</span>
                  <span className="text-[10px] bg-white px-2 py-0.5 rounded-md font-bold text-[#6F665D]">MB1042 Master Architecture</span>
                </div>
                <div className="text-xs text-[#4A4138] bg-white p-3 rounded-xl border border-[#EFE8DE] flex items-center justify-between">
                  <span>Entities: Malls • Tables • Outlets • Menus • Master Orders (MB1042) • Runner Tasks</span>
                  <span className="text-emerald-700 font-black flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    ACID Simulated State
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* Hackathon Pitch Points */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-[#EFE8DE]">
              <div className="w-8 h-8 rounded-xl bg-orange-100 text-[#F95721] flex items-center justify-center font-black text-xs mb-2">
                01
              </div>
              <h5 className="font-black text-xs text-[#2A2521]">One Unified Order</h5>
              <p className="text-[11px] text-[#6F665D] mt-1 leading-relaxed">
                Customers never have to swipe 3 cards at 3 separate counters. One cart, one payment, unified tracking.
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#EFE8DE]">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-[#4E8752] flex items-center justify-center font-black text-xs mb-2">
                02
              </div>
              <h5 className="font-black text-xs text-[#2A2521]">Queue-Aware AI</h5>
              <p className="text-[11px] text-[#6F665D] mt-1 leading-relaxed">
                If an outlet is backed up, MallBite proactively steers customers to faster alternatives that still match tastes.
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#EFE8DE]">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-black text-xs mb-2">
                03
              </div>
              <h5 className="font-black text-xs text-[#2A2521]">B2B Mall Intelligence</h5>
              <p className="text-[11px] text-[#6F665D] mt-1 leading-relaxed">
                Mall management gains centralized visibility of crowd density, outlet bottlenecks, and predictive demand.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
