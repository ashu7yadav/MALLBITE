import React, { useState } from 'react';
import { X, QrCode, MapPin, Check, Camera, Sparkles } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useMall } from '../../context/MallContext';

export const QrScannerModal = () => {
  const { isQrScannerOpen, setIsQrScannerOpen, currentTable, switchTable } = useMall();
  const [customTableNum, setCustomTableNum] = useState('');

  if (!isQrScannerOpen) return null;

  const quickTables = [
    { number: "A-24", zone: "North Food Court (Level 2)" },
    { number: "A-10", zone: "North Food Court (Level 2)" },
    { number: "B-05", zone: "South Atrium Lounge (Level 2)" },
    { number: "B-12", zone: "South Atrium Lounge (Level 2)" },
    { number: "C-12", zone: "Sky Garden Terrace (Level 3)" },
    { number: "D-04", zone: "Central Plaza Tables (Level 2)" }
  ];

  const handleSelectTable = (tblNum) => {
    switchTable(tblNum);
    setIsQrScannerOpen(false);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (customTableNum.trim()) {
      switchTable(customTableNum.trim());
      setIsQrScannerOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-amber-400" />
            <h3 className="font-extrabold text-sm uppercase tracking-wider">Scan Food Court Table QR</h3>
          </div>
          <button
            onClick={() => setIsQrScannerOpen(false)}
            className="text-slate-400 hover:text-white p-1 rounded-full bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Viewfinder Simulator */}
        <div className="p-6 text-center space-y-6">
          <div className="relative mx-auto w-48 h-48 bg-slate-950 rounded-2xl overflow-hidden border-2 border-dashed border-brand-500 flex items-center justify-center shadow-inner">
            <div className="absolute inset-2 border-2 border-brand-400/50 rounded-xl pointer-events-none">
              <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-brand-400 to-transparent absolute top-1/2 -translate-y-1/2 animate-pulse" />
            </div>

            {/* Generated Live QR Code preview */}
            <div className="p-3 bg-white rounded-xl shadow-md">
              <QRCodeSVG
                value={`https://mallbite.app/order?mall=phoenix&table=${currentTable.number}`}
                size={120}
                level="M"
                includeMargin={false}
              />
            </div>
          </div>

          <div className="text-xs text-slate-500">
            Current Detected Table: <strong className="text-slate-900 text-sm">Table {currentTable.number}</strong> ({currentTable.zone})
          </div>

          {/* Preset Quick Switch Tables */}
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 text-left">
              Quick Pick Food Court Table:
            </div>
            <div className="grid grid-cols-2 gap-2">
              {quickTables.map((t) => (
                <button
                  key={t.number}
                  onClick={() => handleSelectTable(t.number)}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${currentTable.number === t.number ? 'bg-brand-50 border-brand-500 font-extrabold text-brand-600 ring-2 ring-brand-200' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 font-bold'}`}
                >
                  <div>
                    <div>Table {t.number}</div>
                    <div className="text-[10px] text-slate-400 font-normal truncate">{t.zone}</div>
                  </div>
                  {currentTable.number === t.number && <Check className="w-3.5 h-3.5 text-brand-600" />}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Input */}
          <form onSubmit={handleCustomSubmit} className="flex gap-2">
            <input
              type="text"
              placeholder="Or enter Table ID (e.g. A-15)..."
              value={customTableNum}
              onChange={(e) => setCustomTableNum(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs uppercase font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-500"
            />
            <button
              type="submit"
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 rounded-xl transition-colors"
            >
              Connect
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};
