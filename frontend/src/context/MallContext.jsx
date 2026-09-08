import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const MallContext = createContext();

export const MallProvider = ({ children }) => {
  const [currentMall, setCurrentMall] = useState({
    id: 'mall-1',
    name: 'Phoenix Marketcity Food Hub',
    city: 'Mumbai',
    location: 'Level 2 & 3 Central Food Court'
  });

  const [currentTable, setCurrentTable] = useState({
    id: 'table-a24',
    number: 'A-24',
    mallId: 'mall-1',
    zone: 'North Food Court',
    floor: 'Level 2',
    status: 'Active',
    qrCode: 'MALLBITE-PHX-L2-A24'
  });

  const [restaurants, setRestaurants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeMasterOrder, setActiveMasterOrder] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [isQrScannerOpen, setIsQrScannerOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  // Load initial data
  const fetchData = async () => {
    try {
      const [restRes, catRes, ordersRes] = await Promise.all([
        api.getRestaurants(),
        api.getCategories(),
        api.getOrders()
      ]);
      if (restRes.success) setRestaurants(restRes.data);
      if (catRes.success) setCategories(catRes.data);
      if (ordersRes.success && ordersRes.data.length > 0) {
        // Set the latest active order if any
        setActiveMasterOrder(ordersRes.data[0]);
      }
    } catch (err) {
      console.warn("API connect error, using local state", err);
    }
  };

  useEffect(() => {
    fetchData();
    // Poll updates every 4 seconds for real-time live sync across roles
    const interval = setInterval(fetchData, 4000);
    return () => clearInterval(interval);
  }, []);

  const addNotification = (title, message, type = 'info') => {
    const id = Date.now();
    const newNotif = { id, title, message, type };
    setNotifications(prev => [newNotif, ...prev.slice(0, 4)]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const switchTable = async (tableNumber) => {
    try {
      const res = await api.detectTable(tableNumber);
      if (res.success) {
        setCurrentTable(res.data);
        addNotification(
          "Table Switched Successfully",
          `Detected Table ${res.data.number} (${res.data.zone}) at ${currentMall.name}`,
          "success"
        );
      }
    } catch {
      setCurrentTable({
        id: `table-${tableNumber}`,
        number: tableNumber.toUpperCase(),
        mallId: 'mall-1',
        zone: 'North Food Court',
        floor: 'Level 2',
        status: 'Active',
        qrCode: `MALLBITE-PHX-L2-${tableNumber.toUpperCase()}`
      });
      addNotification("Table Updated", `Now ordering for Table ${tableNumber.toUpperCase()}`, "info");
    }
  };

  return (
    <MallContext.Provider
      value={{
        currentMall,
        setCurrentMall,
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
        refreshData: fetchData
      }}
    >
      {children}
    </MallContext.Provider>
  );
};

export const useMall = () => useContext(MallContext);
