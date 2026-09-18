import React from 'react';
import { Clock, CheckCircle2, ArrowRight, Zap, Info } from 'lucide-react';

export const QueueTimeline = ({ 
  schedule = [], 
  targetDeliveryMinutes = 15,
  tableNumber = "A17",
  timelineSummary = ""
}) => {
  if (!schedule || schedule.length === 0) return null;

  return (
    <div className="bg-[#FAF7F2] border border-[#EFE8DE] rounded-3xl p-5 sm:p-6 text-left shadow-soft space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EFE8DE] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-[#F95721] text-white flex items-center justify-center font-black shadow-md shadow-[#F95721]/20">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-black text-[#2A2521] font-display">
              Smart Order Synchronization
            </h3>
            <p className="text-xs text-[#6F665D] font-medium">
              Start times synchronized so food from all counters arrives together
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto bg-white px-3 py-1.5 rounded-xl border border-[#EFE8DE]">
          <Clock className="w-3.5 h-3.5 text-[#F95721]" />
          <span className="text-xs font-black text-[#2A2521]">
            Arrives in ~{targetDeliveryMinutes} mins
          </span>
        </div>
      </div>

      {/* Visual Staggered Bar Timeline */}
      <div className="space-y-3 pt-1">
        {schedule.map((outlet, index) => {
          // Delay percentage and width calculation
          const maxTime = targetDeliveryMinutes || 15;
          const delayPercent = Math.min(60, Math.round((outlet.recommendedStartDelayMinutes / maxTime) * 100));
          const prepPercent = Math.min(100 - delayPercent, Math.round((outlet.totalPrepMinutes / maxTime) * 100));

          return (
            <div key={outlet.subOrderId || index} className="space-y-1.5 bg-white p-3 sm:p-3.5 rounded-2xl border border-[#EFE8DE] shadow-2xs">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-lg bg-[#FFF2EB] text-[#F95721] font-black text-[11px] flex items-center justify-center border border-[#F6DEC9]">
                    {index + 1}
                  </span>
                  <span className="font-extrabold text-[#2A2521] font-display">
                    {outlet.restaurantName}
                  </span>
                  <span className="text-[10px] text-[#8E857C] font-semibold bg-[#FAF7F2] px-2 py-0.5 rounded-md border border-[#EFE8DE]">
                    {outlet.counterNumber}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-right">
                  <span className="text-[11px] font-bold text-[#F95721]">
                    {outlet.startTimingLabel}
                  </span>
                  <span className="text-xs font-black text-[#2A2521]">
                    • {outlet.totalPrepMinutes}m prep
                  </span>
                </div>
              </div>

              {/* Progress track showing staggered delay + prep */}
              <div className="w-full bg-[#FAF7F2] h-3.5 rounded-full overflow-hidden flex border border-[#EFE8DE] p-0.5">
                {/* Delay buffer bar */}
                {delayPercent > 0 && (
                  <div 
                    style={{ width: `${delayPercent}%` }}
                    className="h-full bg-slate-200/70 rounded-l-full flex items-center justify-center text-[9px] font-bold text-slate-500"
                    title={`Waiting ${outlet.recommendedStartDelayMinutes}m for sync`}
                  >
                  </div>
                )}
                {/* Active prep bar */}
                <div 
                  style={{ width: `${prepPercent}%` }}
                  className={`h-full rounded-full flex items-center justify-center text-[9px] font-black text-white ${index === 0 ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : index === 1 ? 'bg-gradient-to-r from-amber-500 to-orange-500' : 'bg-gradient-to-r from-[#F95721] to-[#EA580C]'}`}
                >
                  READY
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Final Delivery Pin */}
      <div className="p-3 bg-[#FFF4EC] border border-[#F6DEC9] rounded-2xl flex items-center justify-between text-xs font-bold text-[#2A2521]">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Food reaches <strong>Table {tableNumber}</strong> simultaneously hot & fresh</span>
        </div>
        <span className="text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded-lg text-[11px] font-black uppercase">
          Coordinated
        </span>
      </div>

      <div className="text-[10px] text-[#8E857C] flex items-center gap-1.5 pt-0.5">
        <Info className="w-3 h-3 text-[#8E857C] shrink-0" />
        <span>Algorithm: <code>(queue_size × avg_prep / kitchen_capacity) + item_prep</code>. Staggered starts minimize completion delta.</span>
      </div>
    </div>
  );
};
