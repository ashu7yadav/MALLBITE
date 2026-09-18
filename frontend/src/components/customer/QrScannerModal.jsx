import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  QrCode, 
  MapPin, 
  Check, 
  Camera, 
  Upload, 
  RefreshCw, 
  Flashlight, 
  AlertCircle,
  Copy,
  ExternalLink,
  Sparkles,
  Smartphone
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import jsQR from 'jsqr';
import { useMall } from '../../context/MallContext';

export const QrScannerModal = () => {
  const { 
    isQrScannerOpen, 
    setIsQrScannerOpen, 
    currentMall, 
    currentTable, 
    switchTable, 
    scanQrPayload,
    addNotification 
  } = useMall();

  const [activeTab, setActiveTab] = useState('camera'); // camera | myqr
  const [customTableNum, setCustomTableNum] = useState('');
  const [cameraFacing, setCameraFacing] = useState('environment'); // 'environment' | 'user'
  const [cameraError, setCameraError] = useState(null);
  const [torchOn, setTorchOn] = useState(false);
  const [hasTorch, setHasTorch] = useState(false);
  const [scannedResult, setScannedResult] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const animFrameIdRef = useRef(null);
  const fileInputRef = useRef(null);

  const quickTables = [
    { number: "A-24", zone: "North Food Court (Level 2)" },
    { number: "A-12", zone: "Zone A (North Food Atrium)" },
    { number: "B-05", zone: "South Atrium Lounge (Level 2)" },
    { number: "B-12", zone: "Zone B (Central Dome Dining)" },
    { number: "C-12", zone: "Sky Garden Terrace (Level 3)" },
    { number: "D-04", zone: "Central Plaza Tables (Level 2)" }
  ];

  // Stop camera tracks helper
  const stopCamera = () => {
    if (animFrameIdRef.current) {
      cancelAnimationFrame(animFrameIdRef.current);
      animFrameIdRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setTorchOn(false);
  };

  // Start camera stream
  const startCamera = async () => {
    stopCamera();
    setCameraError(null);
    setScannedResult(null);

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError("Camera access is not supported in this browser. You can upload a QR image or select a table below.");
      return;
    }

    try {
      const constraints = {
        video: {
          facingMode: cameraFacing,
          width: { ideal: 640 },
          height: { ideal: 480 }
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute("playsinline", "true");
        await videoRef.current.play();
        startScanLoop();
      }

      // Check for torch capability
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack && videoTrack.getCapabilities) {
        const caps = videoTrack.getCapabilities();
        if (caps.torch) {
          setHasTorch(true);
        }
      }
    } catch (err) {
      console.warn("Camera init error:", err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setCameraError("Camera permission was denied. Please allow camera access in browser settings, or upload a QR image below.");
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setCameraError("No camera found on this device. You can pick from preset food court tables or upload a QR image.");
      } else {
        setCameraError("Unable to open camera stream. Please try uploading a QR image or choose a demo table.");
      }
    }
  };

  // Continuous QR scan loop using jsQR
  const startScanLoop = () => {
    const scanFrame = () => {
      if (!videoRef.current || !canvasRef.current || !streamRef.current) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });

      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert",
        });

        if (code && code.data) {
          handleSuccessScan(code.data);
          return; // Stop scan loop on success
        }
      }

      animFrameIdRef.current = requestAnimationFrame(scanFrame);
    };

    animFrameIdRef.current = requestAnimationFrame(scanFrame);
  };

  // Handle successful QR detection
  const handleSuccessScan = async (rawCode) => {
    stopCamera();
    setScannedResult(rawCode);

    if (navigator.vibrate) {
      navigator.vibrate([60, 40, 80]);
    }

    try {
      const res = await scanQrPayload(rawCode);
      setTimeout(() => {
        setIsQrScannerOpen(false);
      }, 700);
    } catch (err) {
      console.error(err);
      // Fallback manual table switch
      switchTable(rawCode);
      setTimeout(() => {
        setIsQrScannerOpen(false);
      }, 700);
    }
  };

  // Handle uploaded QR image file
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code && code.data) {
          handleSuccessScan(code.data);
        } else {
          addNotification("QR Code Not Detected", "Could not find a clear QR code in this image. Please try another.", "error");
        }
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Toggle flashlight
  const toggleTorch = async () => {
    if (!streamRef.current) return;
    const track = streamRef.current.getVideoTracks()[0];
    if (track) {
      try {
        const nextState = !torchOn;
        await track.applyConstraints({ advanced: [{ torch: nextState }] });
        setTorchOn(nextState);
      } catch (e) {
        console.warn("Torch failed:", e);
      }
    }
  };

  // Flip camera between environment and user
  const flipCamera = () => {
    setCameraFacing(prev => (prev === 'environment' ? 'user' : 'environment'));
  };

  // Lifecycle when modal opens/closes or facing mode changes
  useEffect(() => {
    if (isQrScannerOpen && activeTab === 'camera') {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [isQrScannerOpen, activeTab, cameraFacing]);

  if (!isQrScannerOpen) return null;

  const handleSelectTable = (tblNum) => {
    switchTable(tblNum);
    setIsQrScannerOpen(false);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (customTableNum.trim()) {
      scanQrPayload(customTableNum.trim());
      setIsQrScannerOpen(false);
    }
  };

  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
  const tableUrl = `${currentOrigin}/?mall=${currentMall.id}&table=${currentTable.number}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(tableUrl);
    setCopiedLink(true);
    addNotification("Link Copied!", "Table QR link copied to clipboard", "success");
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden my-auto max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-brand-500 flex items-center justify-center text-white shadow-md">
              <QrCode className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm tracking-wide text-white">Food Court Table QR</h3>
              <p className="text-[11px] text-slate-400 font-medium">Scan to connect to table menu</p>
            </div>
          </div>
          <button
            onClick={() => setIsQrScannerOpen(false)}
            className="text-slate-400 hover:text-white p-1.5 rounded-full bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-100 bg-slate-50/70 p-1.5 gap-1 shrink-0">
          <button
            onClick={() => setActiveTab('camera')}
            className={`flex-1 py-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
              activeTab === 'camera' 
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80' 
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Camera className="w-4 h-4 text-brand-500" />
            <span>Scan Camera QR</span>
          </button>
          <button
            onClick={() => setActiveTab('myqr')}
            className={`flex-1 py-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
              activeTab === 'myqr' 
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80' 
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-4 h-4 text-brand-500" />
            <span>Show Table QR</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 space-y-5 overflow-y-auto flex-1">
          
          {/* TAB 1: Real-Time Camera Scanner */}
          {activeTab === 'camera' && (
            <div className="space-y-4">
              
              {/* Camera Viewfinder Box */}
              <div className="relative mx-auto w-full max-w-[280px] aspect-square bg-slate-950 rounded-2xl overflow-hidden border-2 border-slate-900 shadow-inner flex items-center justify-center">
                
                {/* Hidden processing canvas */}
                <canvas ref={canvasRef} className="hidden" />

                {/* Video element */}
                <video
                  ref={videoRef}
                  className={`w-full h-full object-cover ${cameraError ? 'hidden' : 'block'}`}
                  muted
                  playsInline
                />

                {/* Scanner Target Box with Animated Laser Line */}
                {!cameraError && !scannedResult && (
                  <div className="absolute inset-6 pointer-events-none flex flex-col justify-between">
                    {/* 4 Corner Crosshairs */}
                    <div className="flex justify-between">
                      <div className="w-6 h-6 border-t-4 border-l-4 border-amber-400 rounded-tl-lg shadow-sm" />
                      <div className="w-6 h-6 border-t-4 border-r-4 border-amber-400 rounded-tr-lg shadow-sm" />
                    </div>

                    {/* Animated Scanning Laser */}
                    <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-lg shadow-amber-400/50 animate-pulse relative" />

                    <div className="flex justify-between">
                      <div className="w-6 h-6 border-b-4 border-l-4 border-amber-400 rounded-bl-lg shadow-sm" />
                      <div className="w-6 h-6 border-b-4 border-r-4 border-amber-400 rounded-br-lg shadow-sm" />
                    </div>
                  </div>
                )}

                {/* Scanned Success Green Overlay */}
                {scannedResult && (
                  <div className="absolute inset-0 bg-emerald-600/90 backdrop-blur-sm flex flex-col items-center justify-center text-white p-4 animate-in zoom-in-90 duration-200">
                    <div className="w-14 h-14 rounded-full bg-white text-emerald-600 flex items-center justify-center mb-2 shadow-xl animate-bounce">
                      <Check className="w-8 h-8 stroke-[3]" />
                    </div>
                    <span className="text-base font-black">QR Code Detected!</span>
                    <span className="text-xs text-emerald-100 font-medium mt-1 truncate max-w-[240px]">
                      Connecting to food court table...
                    </span>
                  </div>
                )}

                {/* Camera Error / Fallback UI */}
                {cameraError && (
                  <div className="p-4 text-center text-slate-300 space-y-3">
                    <AlertCircle className="w-8 h-8 text-amber-400 mx-auto" />
                    <p className="text-xs leading-relaxed text-slate-200 font-medium">
                      {cameraError}
                    </p>
                    <div className="flex flex-col gap-2 pt-1">
                      <button
                        onClick={startCamera}
                        className="bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Retry Camera Access</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Camera Top Floating Controls */}
                {!cameraError && !scannedResult && (
                  <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
                    {hasTorch && (
                      <button
                        onClick={toggleTorch}
                        className={`p-2 rounded-xl backdrop-blur-md transition-all ${
                          torchOn ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-black/40 text-white hover:bg-black/60'
                        }`}
                        title="Toggle Flashlight"
                      >
                        <Flashlight className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={flipCamera}
                      className="p-2 rounded-xl bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-all"
                      title="Flip Camera"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Upload QR Image Button */}
              <div className="flex items-center justify-center">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200/80 px-4 py-2.5 rounded-xl border border-slate-200 transition-all active:scale-95"
                >
                  <Upload className="w-4 h-4 text-brand-500" />
                  <span>Upload QR Code Image / Screenshot</span>
                </button>
              </div>

              {/* Current Table Indicator */}
              <div className="bg-amber-50 border border-amber-200/70 rounded-2xl p-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                  <div>
                    <span className="text-slate-500 font-medium">Currently Active:</span>{' '}
                    <strong className="text-slate-900 font-extrabold">Table {currentTable.number}</strong>
                    <div className="text-[10px] text-slate-500 truncate">{currentTable.zone}</div>
                  </div>
                </div>
                <span className="bg-emerald-500/15 text-emerald-700 font-extrabold px-2 py-0.5 rounded-full text-[10px]">
                  Online
                </span>
              </div>
            </div>
          )}

          {/* TAB 2: Show Live Scannable Table QR */}
          {activeTab === 'myqr' && (
            <div className="text-center space-y-4 py-2">
              <div className="p-4 bg-white rounded-3xl border-2 border-slate-900 shadow-lg inline-block relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider">
                  Table {currentTable.number}
                </div>
                <div className="pt-2">
                  <QRCodeSVG
                    value={tableUrl}
                    size={160}
                    level="H"
                    includeMargin={false}
                  />
                </div>
              </div>

              <div>
                <h4 className="font-extrabold text-sm text-slate-900">
                  {currentMall.name} • Table {currentTable.number}
                </h4>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                  Scan this QR code with any mobile camera to order together from the same table!
                </p>
              </div>

              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-2 rounded-xl transition-all border border-slate-200"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? "Link Copied!" : "Copy Table Link"}</span>
                </button>
              </div>
            </div>
          )}

          {/* Preset Quick Food Court Tables (One-tap test) */}
          <div className="pt-2 border-t border-slate-100">
            <div className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2.5 flex items-center justify-between">
              <span>Quick Select Food Court Table:</span>
              <span className="text-[10px] text-brand-600 lowercase font-bold">1-click switch</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {quickTables.map((t) => {
                const isSelected = currentTable.number === t.number;
                return (
                  <button
                    key={t.number}
                    onClick={() => handleSelectTable(t.number)}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-brand-50 border-brand-500 font-black text-brand-700 ring-2 ring-brand-200 shadow-sm' 
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 font-bold'
                    }`}
                  >
                    <div className="min-w-0 pr-1">
                      <div className="font-extrabold">Table {t.number}</div>
                      <div className="text-[10px] text-slate-400 font-normal truncate">{t.zone}</div>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-brand-500 text-white flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Manual Input Form */}
          <form onSubmit={handleCustomSubmit} className="flex gap-2 pt-1">
            <input
              type="text"
              placeholder="Or enter Table ID / QR text..."
              value={customTableNum}
              onChange={(e) => setCustomTableNum(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs uppercase font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:bg-white transition-all"
            />
            <button
              type="submit"
              className="bg-slate-900 hover:bg-slate-800 active:scale-95 text-white font-black text-xs px-5 rounded-xl transition-all shadow-sm"
            >
              Connect
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};
