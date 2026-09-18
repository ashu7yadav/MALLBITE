import React from 'react';
import { QrCode, Utensils, ShoppingBag, CreditCard, Smile, ArrowRight } from 'lucide-react';

export const HowItWorksSteps = () => {
  const steps = [
    {
      step: "1",
      title: "Scan QR",
      desc: "Scan the QR code at your table",
      icon: QrCode
    },
    {
      step: "2",
      title: "Choose",
      desc: "Explore menus from all outlets",
      icon: Utensils
    },
    {
      step: "3",
      title: "Order",
      desc: "Add to cart and place your order",
      icon: ShoppingBag
    },
    {
      step: "4",
      title: "Pay",
      desc: "One payment for all your orders",
      icon: CreditCard
    },
    {
      step: "5",
      title: "Enjoy",
      desc: "We'll deliver to your table",
      icon: Smile
    }
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFE8DE] shadow-xs space-y-6">
      <div className="text-center">
        <span className="text-[11px] font-black uppercase tracking-widest text-[#8E857C] bg-[#FAF7F2] px-4 py-1.5 rounded-full border border-[#EBE3D6]">
          HOW IT WORKS
        </span>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {steps.map((item, index) => {
          const Icon = item.icon;
          return (
            <React.Fragment key={item.step}>
              <div className="flex items-center gap-3 text-left w-full md:w-auto">
                <div className="w-11 h-11 rounded-2xl bg-[#FFF2EB] text-[#F95721] border border-[#F6DFD0] flex items-center justify-center shrink-0 shadow-xs">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-black text-[#2A2521] leading-tight">
                    <span className="text-[#F95721] mr-1">{item.step}</span>
                    {item.title}
                  </div>
                  <div className="text-[10px] text-[#8E857C] font-medium leading-tight max-w-[130px]">
                    {item.desc}
                  </div>
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden md:flex items-center text-[#D8CFBF]">
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
