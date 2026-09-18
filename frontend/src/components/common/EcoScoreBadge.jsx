import React from 'react';
import { Leaf, Package, Truck, Sparkles, ShieldCheck } from 'lucide-react';

export const EcoScoreBadge = ({ 
  ecoScore = 82, 
  packagingSaved = 2, 
  tripsAvoided = 2, 
  compact = false, 
  showExplanation = true,
  explanation = "Good choice 🌱 Combining your order reduced packaging by approximately 2 units."
}) => {
  if (compact) {
    return (
      <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200/80 px-2.5 py-1 rounded-full text-xs font-bold shadow-2xs">
        <Leaf className="w-3.5 h-3.5 text-emerald-600 fill-emerald-500/20" />
        <span>Eco Score: <strong>{ecoScore}/100</strong></span>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-emerald-50 via-[#F3FAF4] to-teal-50 border border-emerald-200/80 rounded-2xl p-3.5 sm:p-4 text-left shadow-2xs space-y-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black shadow-sm shadow-emerald-600/20">
            <Leaf className="w-4 h-4 fill-white/30" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="text-xs sm:text-sm font-black text-slate-900 font-display">
                Environmental Eco Score
              </h4>
              <span className="text-[10px] uppercase font-bold text-slate-400 bg-white/80 px-1.5 py-0.2 rounded border border-emerald-200/60">
                Estimated
              </span>
            </div>
            <p className="text-[11px] text-emerald-800/80 font-medium">
              Multi-outlet consolidation savings
            </p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-xl sm:text-2xl font-black text-emerald-700 font-display leading-none">
            {ecoScore}<span className="text-xs text-emerald-600/70 font-bold">/100</span>
          </div>
          <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block mt-0.5">
            Low Carbon Order
          </span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 gap-2 pt-1 border-t border-emerald-200/60 text-xs">
        <div className="flex items-center gap-2 bg-white/70 p-2 rounded-xl border border-emerald-100">
          <Package className="w-4 h-4 text-emerald-600 shrink-0" />
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-bold block leading-tight">Packaging Saved</span>
            <span className="font-extrabold text-slate-900">{packagingSaved} Units</span>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white/70 p-2 rounded-xl border border-emerald-100">
          <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-bold block leading-tight">Delivery Trips</span>
            <span className="font-extrabold text-slate-900">{tripsAvoided} Avoided</span>
          </div>
        </div>
      </div>

      {showExplanation && explanation && (
        <p className="text-[11px] text-emerald-900/90 font-medium bg-emerald-100/50 p-2 rounded-xl border border-emerald-200/50 flex items-start gap-1.5">
          <span>{explanation}</span>
        </p>
      )}
    </div>
  );
};
