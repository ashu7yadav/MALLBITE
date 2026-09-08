import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  CreditCard, 
  Smartphone, 
  Building, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  QrCode, 
  Lock,
  ArrowRight,
  Store,
  Loader2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../../context/CartContext';
import { useMall } from '../../context/MallContext';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';

export const CheckoutModal = ({ onOrderSuccess }) => {
  const { currentMall, currentTable, setActiveMasterOrder, addNotification } = useMall();
  const { 
    cartItems, 
    itemsByRestaurant, 
    distinctRestaurantsCount,
    totalItemsCount,
    subtotal, 
    convenienceFee, 
    gstTaxes, 
    discountAmount, 
    finalTotal, 
    appliedCoupon,
    clearCart,
    isCheckoutModalOpen,
    setIsCheckoutModalOpen 
  } = useCart();
  const { user } = useAuth();

  const [paymentMethod, setPaymentMethod] = useState('upi'); // upi | card | netbanking
  const [upiApp, setUpiApp] = useState('gpay'); // gpay | phonepe | paytm
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isCheckoutModalOpen) return null;

  const handlePay = async () => {
    setIsProcessing(true);

    try {
      // Simulate 1.5s secure gateway handshake
      await new Promise(resolve => setTimeout(resolve, 1200));

      const res = await api.createOrder({
        tableNumber: currentTable.number || "A-24",
        customerName: user.name || "Aarav Sharma",
        customerPhone: user.phone || "+91 98765 43210",
        items: cartItems,
        paymentMethod: paymentMethod === 'upi' ? `UPI (${upiApp.toUpperCase()})` : paymentMethod === 'card' ? 'Credit/Debit Card' : 'Net Banking',
        couponCode: appliedCoupon ? appliedCoupon.code : null
      });

      if (res.success) {
        // Trigger celebratory confetti
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });

        setActiveMasterOrder(res.data);
        clearCart();
        setIsCheckoutModalOpen(false);

        addNotification(
          "Payment Successful & Order Placed 🎉",
          `Master Order #${res.data.id} dispatched to ${res.data.subOrders.length} kitchens. Delivery to Table ${currentTable.number}!`,
          "success"
        );

        if (onOrderSuccess) onOrderSuccess(res.data);
      }
    } catch (err) {
      console.error(err);
      addNotification("Payment Error", "There was an error confirming your order. Please retry.", "error");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden my-6">
        
        {/* Modal Top Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span className="font-extrabold text-sm uppercase tracking-wider">MALLBITE Secure Checkout</span>
          </div>
          <button
            onClick={() => setIsCheckoutModalOpen(false)}
            className="text-slate-400 hover:text-white p-1 rounded-full bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Table Destination Box */}
          <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-amber-900 font-bold uppercase tracking-wider">Delivering Directly to Table</div>
              <div className="text-sm font-black text-slate-900">
                Table {currentTable.number} • {currentTable.zone}
              </div>
              <div className="text-[11px] text-slate-600 font-medium mt-0.5">
                {currentMall.name} ({currentTable.floor})
              </div>
            </div>
          </div>

          {/* Master Order Splitting Summary */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Multi-Outlet Kitchen Tickets ({distinctRestaurantsCount})
              </span>
              <span className="text-xs font-bold text-brand-600">Unified 1-Step Pay</span>
            </div>

            <div className="space-y-2">
              {itemsByRestaurant.map((group) => (
                <div key={group.restaurantId} className="bg-slate-50 border border-slate-200/70 rounded-xl p-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Store className="w-4 h-4 text-brand-500" />
                    <span className="font-bold text-slate-800">{group.restaurantName}</span>
                    <span className="text-slate-400">({group.items.reduce((a, b) => a + b.quantity, 0)} items)</span>
                  </div>
                  <span className="font-extrabold text-slate-900">
                    ₹{group.items.reduce((a, b) => a + (b.price * b.quantity), 0)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Select Payment Method
            </label>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-3 rounded-2xl border text-center transition-all ${paymentMethod === 'upi' ? 'bg-brand-50 border-brand-500 ring-2 ring-brand-200 text-brand-600 font-extrabold' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 font-bold'}`}
              >
                <Smartphone className="w-5 h-5 mx-auto mb-1" />
                <span className="text-xs block">UPI / QR</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-2xl border text-center transition-all ${paymentMethod === 'card' ? 'bg-brand-50 border-brand-500 ring-2 ring-brand-200 text-brand-600 font-extrabold' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 font-bold'}`}
              >
                <CreditCard className="w-5 h-5 mx-auto mb-1" />
                <span className="text-xs block">Cards</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('netbanking')}
                className={`p-3 rounded-2xl border text-center transition-all ${paymentMethod === 'netbanking' ? 'bg-brand-50 border-brand-500 ring-2 ring-brand-200 text-brand-600 font-extrabold' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 font-bold'}`}
              >
                <Building className="w-5 h-5 mx-auto mb-1" />
                <span className="text-xs block">Net Banking</span>
              </button>
            </div>

            {/* UPI Sub-Options */}
            {paymentMethod === 'upi' && (
              <div className="mt-3 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                <div className="flex items-center justify-around gap-2">
                  <button
                    onClick={() => setUpiApp('gpay')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border transition-all ${upiApp === 'gpay' ? 'bg-white border-brand-500 text-brand-600 shadow-sm' : 'bg-transparent border-slate-200 text-slate-600'}`}
                  >
                    Google Pay
                  </button>
                  <button
                    onClick={() => setUpiApp('phonepe')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border transition-all ${upiApp === 'phonepe' ? 'bg-white border-brand-500 text-brand-600 shadow-sm' : 'bg-transparent border-slate-200 text-slate-600'}`}
                  >
                    PhonePe
                  </button>
                  <button
                    onClick={() => setUpiApp('paytm')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border transition-all ${upiApp === 'paytm' ? 'bg-white border-brand-500 text-brand-600 shadow-sm' : 'bg-transparent border-slate-200 text-slate-600'}`}
                  >
                    Paytm UPI
                  </button>
                </div>
                <div className="text-[11px] text-slate-500 text-center font-medium">
                  Instant 1-Click Sandbox Authorization enabled for hackathon demo.
                </div>
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className="mt-3 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-xs">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Card Number</label>
                  <input
                    type="text"
                    disabled
                    value="•••• •••• •••• 4242 (Demo Visa)"
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-700 font-bold"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Expires</label>
                    <input
                      type="text"
                      disabled
                      value="12/28"
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-700 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">CVV</label>
                    <input
                      type="password"
                      disabled
                      value="888"
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-700 font-bold"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Amount & Security Note */}
          <div className="bg-slate-100/80 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 font-bold block">Grand Total</span>
              <span className="text-xl font-black text-slate-900">₹{finalTotal}</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs bg-emerald-100 px-3 py-1 rounded-full">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Encrypted</span>
            </div>
          </div>

          {/* Confirm Pay CTA */}
          <button
            onClick={handlePay}
            disabled={isProcessing}
            className="w-full bg-brand-500 hover:bg-brand-600 disabled:opacity-60 text-white font-black text-sm py-4 px-4 rounded-2xl shadow-lg shadow-brand-500/30 flex items-center justify-center gap-2 transition-transform active:scale-95"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Processing Combined Payment...</span>
              </>
            ) : (
              <>
                <span>Pay ₹{finalTotal} & Dispatch to Kitchens</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

        </div>
      </div>
    </div>
  );
};
