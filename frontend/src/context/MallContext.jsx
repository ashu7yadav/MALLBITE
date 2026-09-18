import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

const MallContext = createContext();

// Simple native Web Audio synthesizer for pleasant order and status chimes
const playChime = (type = 'success') => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    if (type === 'order' || type === 'success') {
      // Ascending two-tone chime
      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(587.33, now); // D5
      osc1.frequency.setValueAtTime(880, now + 0.12); // A5

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      osc1.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc1.stop(now + 0.5);
    } else if (type === 'alert') {
      // High ping
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(784, now); // G5
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.4);
    }
  } catch (e) {
    // AudioContext blocked by browser policy until interaction
  }
};

export const MallProvider = ({ children }) => {
  const [allMalls, setAllMalls] = useState([]);
  
  // Default to Phoenix Mall Lucknow per prompt specification
  const [currentMall, setCurrentMall] = useState({
    id: 'mall-phoenix-lko',
    name: 'Phoenix Mall Lucknow',
    city: 'Lucknow',
    location: 'Level 2 Central Food Court, Sector B'
  });

  const [currentTable, setCurrentTable] = useState({
    id: 'table-phx-lko-a17',
    number: 'A17',
    mallId: 'mall-phoenix-lko',
    zone: 'Central Food Court',
    floor: 'Floor 2',
    status: 'Active',
    qrCode: 'MALLBITE-PHOENIX-FLOOR2-TABLE-A17'
  });

  const [restaurants, setRestaurants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeMasterOrder, setActiveMasterOrder] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [isQrScannerOpen, setIsQrScannerOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [outletQueues, setOutletQueues] = useState([]);
  const [crowdData, setCrowdData] = useState(null);
  const [inventorySignals, setInventorySignals] = useState([]);

  // Load initial data and malls
  const fetchData = useCallback(async () => {
    try {
      const [mallsRes, restRes, catRes, ordersRes, queueRes, crowdRes] = await Promise.all([
        api.getMalls(),
        api.getRestaurants(),
        api.getCategories(),
        api.getOrders(),
        api.getOutletQueues().catch(() => ({ success: false })),
        api.getCrowdIntelligence().catch(() => ({ success: false }))
      ]);
      if (mallsRes.success && mallsRes.data.length > 0) {
        setAllMalls(mallsRes.data);
      }
      if (restRes.success) setRestaurants(restRes.data);
      if (catRes.success) setCategories(catRes.data);
      if (ordersRes.success && ordersRes.data.length > 0) {
        setActiveMasterOrder(ordersRes.data[0]);
      }
      if (queueRes.success) setOutletQueues(queueRes.data);
      if (crowdRes.success) setCrowdData(crowdRes.data);
    } catch (err) {
      console.warn("API connect error, using cached state", err);
    }
  }, []);

  // Check URL path and query parameters for table QR scans (e.g. /mall/phoenix/floor-2/table-A17 or ?table=A17)
  useEffect(() => {
    const path = window.location.pathname;
    let urlMall = null;
    let urlTable = null;
    let urlFloor = null;

    // Feature 1: /mall/phoenix/floor-2/table-A17
    const pathMatch = path.match(/\/mall\/([^\/]+)\/floor-([^\/]+)\/table-([^\/\?#&]+)/i);
    if (pathMatch) {
      const mallSlug = pathMatch[1].toLowerCase();
      urlFloor = `Floor ${pathMatch[2]}`;
      urlTable = pathMatch[3].replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
      if (mallSlug.includes('phoenix') || mallSlug.includes('lko')) {
        urlMall = 'mall-phoenix-lko';
      } else if (mallSlug.includes('city')) {
        urlMall = 'mall-city';
      }
    }

    const params = new URLSearchParams(window.location.search);
    const tableParam = urlTable || params.get('table') || params.get('t');
    const mallParam = urlMall || params.get('mall') || params.get('m');

    fetchData().then(() => {
      if (mallParam) {
        api.getMallById(mallParam).then(res => {
          if (res.success && res.data) {
            setCurrentMall(res.data);
          }
        }).catch(() => {});
      }

      if (tableParam) {
        switchTable(tableParam, mallParam || 'mall-phoenix-lko');
      }
    });

    const interval = setInterval(fetchData, 3500);
    return () => clearInterval(interval);
  }, [fetchData]);

  const addNotification = (title, message, type = 'info') => {
    const id = Date.now();
    const newNotif = { id, title, message, type };
    setNotifications(prev => [newNotif, ...prev.slice(0, 4)]);
    playChime(type === 'error' ? 'alert' : 'order');
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5500);
  };

  const switchMall = async (mallId) => {
    const found = allMalls.find(m => m.id === mallId) || (mallId === 'mall-city' ? {
      id: 'mall-city',
      name: 'City Center Mall Food Court',
      city: 'Metro City',
      location: 'Level 3 Grand Food Atrium, City Center'
    } : null);

    if (found) {
      setCurrentMall(found);
      const defaultTable = mallId === 'mall-city' ? 'A-12' : 'A-24';
      await switchTable(defaultTable, found.id);
      addNotification(
        "Mall Hub Switched",
        `Active location set to ${found.name} (${found.city})`,
        "success"
      );
    }
  };

  const switchTable = async (tableNumber, mallId = currentMall.id) => {
    try {
      const res = await api.detectTable(tableNumber, mallId);
      if (res.success && res.data) {
        setCurrentTable(res.data);
        addNotification(
          "Table Connected",
          `Table ${res.data.number} (${res.data.zone}) connected at ${currentMall.name}`,
          "success"
        );
      }
    } catch {
      const cleanNum = (tableNumber || "A-12").toUpperCase();
      setCurrentTable({
        id: `table-${cleanNum}`,
        number: cleanNum,
        mallId: mallId || 'mall-city',
        zone: 'Zone A (North Food Atrium)',
        floor: 'Level 3',
        status: 'Active',
        qrCode: `MALLBITE-${(mallId || 'CITY').toUpperCase()}-L3-${cleanNum}`
      });
      addNotification("Table Updated", `Now ordering for Table ${cleanNum}`, "info");
    }
  };

  const scanQrPayload = async (rawPayload) => {
    if (!rawPayload || typeof rawPayload !== 'string') return null;
    let text = rawPayload.trim();
    let targetMall = currentMall.id;
    let targetTable = null;

    // Check if JSON
    if (text.startsWith('{') && text.endsWith('}')) {
      try {
        const parsed = JSON.parse(text);
        if (parsed.table) targetTable = parsed.table;
        if (parsed.mall || parsed.mallId) targetMall = parsed.mall || parsed.mallId;
      } catch {}
    }

    // Check if URL or contains query params
    if (!targetTable && (text.includes('http://') || text.includes('https://') || text.includes('?') || text.includes('&'))) {
      try {
        const urlStr = text.startsWith('http') ? text : `https://dummy.app/${text.startsWith('/') ? text.slice(1) : text}`;
        const url = new URL(urlStr);
        const tParam = url.searchParams.get('table') || url.searchParams.get('t');
        const mParam = url.searchParams.get('mall') || url.searchParams.get('m');
        if (tParam) targetTable = tParam;
        if (mParam) targetMall = mParam;
      } catch {}
    }

    // Check if MALLBITE QR code pattern (e.g. MALLBITE-CITY-L3-A12 or MALLBITE-PHX-L2-A24)
    if (!targetTable && text.toUpperCase().startsWith('MALLBITE-')) {
      const parts = text.split('-');
      if (parts[1]) {
        const code = parts[1].toLowerCase();
        if (code === 'city') targetMall = 'mall-city';
        else if (code === 'phx') targetMall = 'mall-1';
        else if (code === 'dlf') targetMall = 'mall-dlf';
        else if (code === 'ambience') targetMall = 'mall-ambience';
      }
      targetTable = text;
    }

    // Plain table input fallback
    if (!targetTable) {
      targetTable = text.replace(/^table\s+/i, '');
    }

    // Switch mall if different
    if (targetMall && targetMall !== currentMall.id) {
      const foundMall = allMalls.find(m => m.id === targetMall || m.id.toLowerCase() === targetMall.toLowerCase());
      if (foundMall) {
        setCurrentMall(foundMall);
      }
    }

    await switchTable(targetTable, targetMall);
    playChime('order');
    return { success: true, table: targetTable, mall: targetMall };
  };

  return (
    <MallContext.Provider
      value={{
        allMalls,
        currentMall,
        setCurrentMall,
        switchMall,
        currentTable,
        setCurrentTable,
        switchTable,
        scanQrPayload,
        restaurants,
        setRestaurants,
        categories,
        activeMasterOrder,
        setActiveMasterOrder,
        notifications,
        addNotification,
        isQrScannerOpen,
        setIsQrScannerOpen,
        isDemoModalOpen,
        setIsDemoModalOpen,
        outletQueues,
        setOutletQueues,
        crowdData,
        inventorySignals,
        refreshData: fetchData,
        playChime
      }}
    >
      {children}
    </MallContext.Provider>
  );
};

export const useMall = () => useContext(MallContext);
