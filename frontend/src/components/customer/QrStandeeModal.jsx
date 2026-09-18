import React from 'react';
import { X, Printer, Copy, Check, ExternalLink, QrCode, Sparkles, MapPin } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useMall } from '../../context/MallContext';

export const QrStandeeModal = ({ isOpen, onClose }) => {
  const { currentMall, currentTable, switchTable, addNotification } = useMall();
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
  const tableUrl = `${currentOrigin}/?mall=${currentMall.id}&table=${currentTable.number || 'A12'}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(tableUrl);
    setCopied(true);
    addNotification("Link Copied!", "Table QR URL copied to clipboard", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-[#EFE8DE] overflow-hidden my-auto">
        
        {/* Modal Header */}
        <div className="bg-[#2A2521] text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#F95721] flex items-center justify-center text-white shadow-md">
              <QrCode className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm tracking-wide text-white">Food Court Acrylic Table Standee</h3>
              <p className="text-[11px] text-[#A49A8F]">Official MallBite Standee for Table {currentTable.number || "A12"}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-full bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Standee 3D Visual Presentation (Exact match to top right in design) */}
        <div className="p-6 bg-[#FAF7F2] flex flex-col items-center justify-center">
          
          {/* Acrylic Standee Body */}
          <div className="relative w-full max-w-[280px] bg-gradient-to-b from-[#F95721] via-[#F95721] to-[#E24C19] rounded-2xl shadow-2xl p-5 text-center text-white border-2 border-[#F95721] overflow-hidden">
            
            {/* Top Standee Header */}
            <div className="mb-3 space-y-0.5">
              <h4 className="text-sm font-black uppercase tracking-wider text-white font-display">
                SCAN TO ORDER
              </h4>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#FFE0D3]">
                FROM ALL OUTLETS
              </p>
            </div>

            {/* Crisp QR Code Card */}
            <div className="bg-white rounded-2xl p-4 shadow-xl border border-white/40 inline-block relative mx-auto my-1">
              <div className="relative">
                <QRCodeSVG
                  value={tableUrl}
                  size={150}
                  level="H"
                  includeMargin={false}
                />
                {/* Center logo overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-8 h-8 rounded-xl bg-white shadow-md border border-[#FAF0E6] flex items-center justify-center text-[#F95721]">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* 3 Step Icons: SCAN, ORDER, ENJOY */}
            <div className="mt-4 pt-3 border-t border-white/20 grid grid-cols-3 gap-1 text-[9px] font-black text-white">
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-lg bg-white/15 flex items-center justify-center mb-1">
                  <QrCode className="w-3.5 h-3.5 text-white" />
                </div>
                <span>SCAN</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-lg bg-white/15 flex items-center justify-center mb-1">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 text-white">
                    <rect width="16" height="20" x="4" y="2" rx="2" />
                    <line x1="8" x2="16" y1="6" y2="6" />
                    <line x1="8" x2="16" y1="10" y2="10" />
                  </svg>
                </div>
                <span>ORDER</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-lg bg-white/15 flex items-center justify-center mb-1">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 text-white">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <span>ENJOY</span>
              </div>
            </div>

            {/* Standee Base Footer Text (Exact match to design) */}
            <div className="mt-4 -mx-5 -mb-5 bg-[#C94112] py-2 px-3 text-[10px] font-black tracking-widest uppercase text-white shadow-inner">
              ONE QR. UNLIMITED CHOICES.
            </div>

          </div>

          <div className="mt-4 text-center">
            <span className="text-xs font-bold text-[#6E645B]">
              Place on table • Direct multi-outlet ordering
            </span>
          </div>

        </div>

        {/* Modal Actions */}
        <div className="p-4 bg-white border-t border-[#EFE8DE] flex items-center justify-between gap-3">
          <button
            onClick={handleCopy}
            className="flex-1 flex items-center justify-center gap-2 bg-[#FAF7F2] hover:bg-[#F3ECE0] text-[#3D352E] font-bold text-xs py-2.5 px-4 rounded-xl border border-[#E4D9C8] transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-[#F95721]" />}
            <span>{copied ? "Copied!" : "Copy Table URL"}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex-1 flex items-center justify-center gap-2 bg-[#F95721] hover:bg-[#EA580C] text-white font-black text-xs py-2.5 px-4 rounded-xl shadow-md shadow-[#F95721]/30 transition-all font-display"
          >
            <Printer className="w-4 h-4" />
            <span>Print Standee</span>
          </button>
        </div>

      </div>
    </div>
  );
};
