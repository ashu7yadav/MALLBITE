const API_BASE = '/api';

export const api = {
  // Health
  checkHealth: async () => {
    const res = await fetch(`${API_BASE}/health`);
    return res.json();
  },

  // Malls & Tables
  getMalls: async () => {
    const res = await fetch(`${API_BASE}/malls`);
    return res.json();
  },
  getTables: async () => {
    const res = await fetch(`${API_BASE}/tables`);
    return res.json();
  },
  detectTable: async (tableNumber) => {
    const res = await fetch(`${API_BASE}/tables/detect/${tableNumber}`);
    return res.json();
  },
  createTable: async (data) => {
    const res = await fetch(`${API_BASE}/tables`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  // Categories & Restaurants
  getCategories: async () => {
    const res = await fetch(`${API_BASE}/categories`);
    return res.json();
  },
  getRestaurants: async () => {
    const res = await fetch(`${API_BASE}/restaurants`);
    return res.json();
  },
  getRestaurantById: async (id) => {
    const res = await fetch(`${API_BASE}/restaurants/${id}`);
    return res.json();
  },
  updateRestaurant: async (id, data) => {
    const res = await fetch(`${API_BASE}/restaurants/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  // Menu
  getMenu: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/menu?${query}`);
    return res.json();
  },
  toggleItemAvailability: async (id, isAvailable) => {
    const res = await fetch(`${API_BASE}/menu/${id}/availability`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isAvailable })
    });
    return res.json();
  },
  addMenuItem: async (itemData) => {
    const res = await fetch(`${API_BASE}/menu`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(itemData)
    });
    return res.json();
  },

  // Coupons
  getCoupons: async () => {
    const res = await fetch(`${API_BASE}/coupons`);
    return res.json();
  },
  validateCoupon: async (code, subtotal) => {
    const res = await fetch(`${API_BASE}/coupons/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, subtotal })
    });
    return res.json();
  },

  // Orders
  createOrder: async (orderData) => {
    const res = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    return res.json();
  },
  getOrders: async () => {
    const res = await fetch(`${API_BASE}/orders`);
    return res.json();
  },
  getOrderById: async (id) => {
    const res = await fetch(`${API_BASE}/orders/${id}`);
    return res.json();
  },
  updateSubOrderStatus: async (subOrderId, status) => {
    const res = await fetch(`${API_BASE}/orders/sub/${subOrderId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    return res.json();
  },

  // Delivery
  getDeliveryTasks: async () => {
    const res = await fetch(`${API_BASE}/delivery/tasks`);
    return res.json();
  },
  updateDeliveryStatus: async (taskId, status) => {
    const res = await fetch(`${API_BASE}/delivery/tasks/${taskId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    return res.json();
  },

  // Mall Analytics
  getMallAnalytics: async () => {
    const res = await fetch(`${API_BASE}/mall/analytics`);
    return res.json();
  },

  // AI
  getAIRecommendations: async (cartItems) => {
    const res = await fetch(`${API_BASE}/ai/recommend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cartItems })
    });
    return res.json();
  },
  smartSearch: async (prompt) => {
    const res = await fetch(`${API_BASE}/ai/smart-search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    return res.json();
  },

  // Demo simulation
  simulateDemoStep: async (step) => {
    const res = await fetch(`${API_BASE}/demo/simulate-step`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ step })
    });
    return res.json();
  }
};
