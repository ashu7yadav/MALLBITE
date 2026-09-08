import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Plus, 
  Minus, 
  Trash2, 
  Tag, 
  Sparkles, 
  Store, 
  ArrowRight, 
  ShieldCheck, 
  Info,
  MapPin
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useMall } from '../../context/MallContext';

export const MultiCartDrawer = () => {
  const { currentTable } = useMall();
  const {
    cartItems,
    itemsByRestaurant,
    distinctRestaurantsCount,
    totalItemsCount,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    convenienceFee,
    gstTaxes,
    discountAmount,
    finalTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    hasComboMatch,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    setIsCheckoutModalOpen
  } = useCart();

  const [couponInput, setCouponInput] = useState('');

  if (!isCartDrawerOpen) return null;

  const handleApply = async (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      await applyCoupon(couponInput.trim());
      setCouponInput('');
    }
  };

  const proceedToCheckout = () => {
    setIsCartDrawerOpen(false);
    setIsCheckoutModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-500 text-white flex items-center justify-center shadow-md shadow-brand-500/30">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-white tracking-tight">Your Multi-Store Cart</h3>
                <div className="flex items-center gap-1.5 text-xs text-amber-300 font-bold">
                  <MapPin className="w-3 h-3" />
                  <span>Table {currentTable.number} • {distinctRestaurantsCount} Food Outlets</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-full bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            
            {cartItems.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-slate-800 text-base">Your cart is empty</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                  Browse menus from Burger House, Pizza Corner & more to add items together.
                </p>
                <button
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="mt-5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md"
                >
                  Explore Food Court
                </button>
              </div>
            ) : (
              <>
                {/* Multi-Restaurant Innovation Alert */}
                <div className="p-3 bg-brand-50/90 border border-brand-200 rounded-2xl flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-700">
                    <strong className="text-slate-900 font-bold">Unified Checkout Active:</strong> Items will be automatically split into individual kitchen tickets and delivered together to <strong>Table {currentTable.number}</strong>!
                  </div>
                </div>

                {/* Items Grouped By Restaurant */}
                <div className="space-y-4">
                  {itemsByRestaurant.map((group) => {
                    const groupSubtotal = group.items.reduce((acc, it) => acc + (it.price * it.quantity), 0);

                    return (
                      <div
                        key={group.restaurantId}
                        className="bg-slate-50/80 rounded-2xl border border-slate-200/80 p-4"
                      >
                        {/* Restaurant Name Header */}
                        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/60">
                          <div className="flex items-center gap-2">
                            <Store className="w-4 h-4 text-brand-600" />
                            <span className="font-extrabold text-xs text-slate-900 uppercase tracking-wide">
                              {group.restaurantName}
                            </span>
                          </div>
                          <span className="text-xs font-bold text-slate-600">
                            Subtotal: ₹{groupSubtotal}
                          </span>
                        </div>

                        {/* Restaurant Dishes */}
                        <div className="space-y-3">
                          {group.items.map((item) => (
                            <div key={item.id} className="flex items-center justify-between gap-3">
                              <div className="flex items-center gap-2.5 flex-1 min-w-0">
                                {item.isVeg ? (
                                  <div className="veg-badge-box shrink-0">
                                    <div className="veg-badge-dot"></div>
                                  </div>
                                ) : (
                                  <div className="non-veg-badge-box shrink-0">
                                    <div className="non-veg-badge-dot"></div>
                                  </div>
                                )}
                                <div className="truncate">
                                  <h4 className="text-xs font-bold text-slate-900 truncate">{item.name}</h4>
                                  <span className="text-[11px] font-bold text-slate-500">₹{item.price} each</span>
                                </div>
                              </div>

                              {/* Quantity controls */}
                              <div className="flex items-center gap-2 shrink-0">
                                <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-2 py-0.5 text-xs font-bold shadow-sm">
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="text-slate-500 hover:text-brand-600"
                                  >
                                    <Minus className="w-3 h-3 stroke-[3]" />
                                  </button>
                                  <span className="text-slate-900 min-w-[12px] text-center font-extrabold">{item.quantity}</span>
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="text-slate-500 hover:text-brand-600"
                                  >
                                    <Plus className="w-3 h-3 stroke-[3]" />
                                  </button>
                                </div>
                                <span className="text-xs font-black text-slate-900 min-w-[45px] text-right">
                                  ₹{item.price * item.quantity}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Coupon Box */}
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between bg-emerald-50 border border-emerald-300 p-2.5 rounded-xl">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-emerald-600" />
                        <div>
                          <div className="text-xs font-bold text-emerald-900">{appliedCoupon.code} Applied</div>
                          <div className="text-[10px] text-emerald-700">You saved ₹{appliedCoupon.discount}!</div>
                        </div>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-xs font-bold text-rose-600 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApply} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Try 'MALLBITE50'"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs uppercase font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-500"
                      />
                      <button
                        type="submit"
                        className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-3 py-1.5 rounded-xl transition-colors"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                </div>

                {/* Bill Breakdown */}
                <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                  <div className="flex justify-between text-slate-600 font-medium">
                    <span>Items Subtotal ({totalItemsCount} items)</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-slate-600 font-medium">
                    <span>Food Court Table Delivery & Fee</span>
                    <span>₹{convenienceFee}</span>
                  </div>
                  <div className="flex justify-between text-slate-600 font-medium">
                    <span>GST (5% Restaurant Tax)</span>
                    <span>₹{gstTaxes}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Promo Coupon Discount</span>
                      <span>-₹{discountAmount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-900 font-black text-sm pt-2 border-t border-slate-200">
                    <span>To Pay</span>
                    <span>₹{finalTotal}</span>
                  </div>
                </div>
              </>
            )}

          </div>

          {/* Bottom Action Footer */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-slate-100 bg-white">
              <button
                onClick={proceedToCheckout}
                className="w-full bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-sm py-3.5 px-4 rounded-2xl shadow-lg shadow-brand-500/30 flex items-center justify-between transition-transform active:scale-95"
              >
                <div className="text-left">
                  <span className="block text-[11px] opacity-80 uppercase font-semibold">Total Amount</span>
                  <span className="text-base font-black">₹{finalTotal}</span>
                </div>
                <div className="flex items-center gap-1.5 font-black">
                  <span>Proceed to Pay</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
