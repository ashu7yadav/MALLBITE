import React from 'react';
import { 
  AlertTriangle, 
  Clock, 
  X, 
  ArrowRight, 
  Sparkles, 
  Check, 
  Plus 
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useMall } from '../../context/MallContext';

export const SmartAlternativeModal = ({ 
  isOpen, 
  onClose, 
  selectedItem, 
  alternatives = [],
  targetWait = 22,
  userMaxWait = 15,
  onProceedAnyway
}) => {
  const { addToCart } = useCart();
  const { addNotification } = useMall();

  if (!isOpen || !selectedItem) return null;

  const handleSwapAlternative = (alternativeItem) => {
    addToCart(alternativeItem);
    addNotification(
      "Smart Alternative Added 🎉",
      `Added ${alternativeItem.name} (${alternativeItem.prepTimeNum || 9} min wait) instead of ${selectedItem.name}`,
      "success"
    );
    onClose();
  };

  const handleKeepOriginal = () => {
    addToCart(selectedItem);
    addNotification(
      "Added to Cart",
      `${selectedItem.name} added. Please note estimated preparation time is ${targetWait} mins.`,
      "info"
    );
    if (onProceedAnyway) onProceedAnyway();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FAF7F2] rounded-3xl max-w-lg w-full shadow-2xl border border-[#EFE8DE] overflow-hidden">
        
        {/* Warning Header */}
        <div className="bg-[#FFF4EC] border-b border-[#F6DEC9] p-5 sm:p-6 text-left relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-[#6F665D]"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#EF4444] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#EF4444]/20">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <span className="bg-[#EF4444]/10 text-[#EF4444] text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">
                High Queue Detected
              </span>
              <h3 className="text-base sm:text-lg font-black font-display text-[#2A2521] mt-1">
                {selectedItem.restaurantName || 'This outlet'} is currently busy
              </h3>
              <p className="text-xs text-[#6F665D] mt-1 leading-relaxed">
                Estimated wait is <strong>{targetWait} mins</strong>, which exceeds your target waiting threshold of <strong>{userMaxWait} mins</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Alternatives Section */}
        <div className="p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-[#6F665D] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#F95721]" />
              <span>Recommended Faster Alternatives:</span>
            </span>
            <span className="text-[10px] font-bold text-[#4E8752]">
              Ready &lt; {userMaxWait} mins
            </span>
          </div>

          <div className="space-y-2.5">
            {alternatives.length > 0 ? (
              alternatives.map((alt) => (
                <div
                  key={alt.id}
                  className="bg-white rounded-2xl p-3.5 border border-[#EFE8DE] hover:border-[#F95721]/50 transition-all flex items-center justify-between gap-3 shadow-xs"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={alt.image}
                      alt={alt.name}
                      className="w-12 h-12 rounded-xl object-cover shrink-0 border border-[#EFE8DE]"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs font-black text-[#2A2521] truncate font-display">
                          {alt.name}
                        </h4>
                        <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black px-1.5 py-0.2 rounded-full">
                          {alt.matchPercentage || 92}% Match
                        </span>
                      </div>
                      <p className="text-[11px] text-[#6F665D] mt-0.5">
                        {alt.outletName || alt.restaurantName} • ₹{alt.price}
                      </p>
                      <span className="text-[10px] font-black text-[#4E8752] flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" />
                        Ready in {alt.prepTimeNum || 8} mins
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSwapAlternative(alt)}
                    className="shrink-0 bg-[#F95721] hover:bg-[#EA580C] text-white px-3 py-1.5 rounded-xl text-xs font-black shadow-xs flex items-center gap-1"
                  >
                    <span>Swap</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-xs text-[#8E857C] italic">No instant alternatives found within threshold.</p>
            )}
          </div>

          {/* Action Choice Buttons */}
          <div className="pt-2 flex items-center gap-2.5">
            <button
              onClick={handleKeepOriginal}
              className="flex-1 bg-white hover:bg-[#FAF4EB] text-[#2A2521] border border-[#EFE8DE] text-xs font-bold py-2.5 px-3 rounded-xl transition-all"
            >
              Keep {selectedItem.name} ({targetWait}m)
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-[#2A2521] hover:bg-black text-white text-xs font-black py-2.5 px-3 rounded-xl transition-all"
            >
              Cancel
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
