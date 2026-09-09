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
  
  // Default to City Center Mall
  const [currentMall, setCurrentMall] = useState({
    id: 'mall-city',
    name: 'City Center Mall Food Court',
    city: 'Metro City',
    location: 'Level 3 Grand Food Atrium, City Center'
  });

  const [currentTable, setCurrentTable] = useState({
    id: 'table-city-a12',
    number: 'A-12',
    mallId: 'mall-city',
    zone: 'Zone A (North Food Atrium)',
    floor: 'Level 3',
    status: 'Active',
    qrCode: 'MALLBITE-CITY-L3-A12'
  });

  const [restaurants, setRestaurants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeMasterOrder, setActiveMasterOrder] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [isQrScannerOpen, setIsQrScannerOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  // Load initial data and malls
  const fetchData = useCallback(async () => {
    try {
      const [mallsRes, restRes, catRes, ordersRes] = await Promise.all([
        api.getMalls(),
        api.getRestaurants(),
        api.getCategories(),
        api.getOrders()
      ]);
      if (mallsRes.success && mallsRes.data.length > 0) {
        setAllMalls(mallsRes.data);
      }
      if (restRes.success) setRestaurants(restRes.data);
      if (catRes.success) setCategories(catRes.data);
      if (ordersRes.success && ordersRes.data.length > 0) {
        setActiveMasterOrder(ordersRes.data[0]);
      }
    } catch (err) {
      console.warn("API connect error, using cached state", err);
    }
  }, []);

  // Check URL parameters for live table QR code scans (e.g. ?table=A-12&mall=mall-city)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tableParam = params.get('table') || params.get('t');
    const mallParam = params.get('mall') || params.get('m');

    fetchData().then(() => {
      if (mallParam) {
        api.getMallById(mallParam).then(res => {
          if (res.success && res.data) {
            setCurrentMall(res.data);
          }
        }).catch(() => {});
      }

      if (tableParam) {
        switchTable(tableParam, mallParam || 'mall-city');
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
        refreshData: fetchData,
        playChime
      }}
    >
      {children}
    </MallContext.Provider>
  );
};

export const useMall = () => useContext(MallContext);
