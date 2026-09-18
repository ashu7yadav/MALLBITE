import {
  initialMalls,
  initialTables,
  initialCategories,
  initialRestaurants,
  initialMenuItems,
  initialCoupons,
  initialHeatmap,
  initialOrders
} from "./initialData.js";
import { AIEngine } from "../ai/aiEngine.js";

class DataStore {
  constructor() {
    this.malls = [...initialMalls];
    this.tables = [...initialTables];
    this.categories = [...initialCategories];
    this.restaurants = [...initialRestaurants];
    this.menuItems = [...initialMenuItems];
    this.coupons = [...initialCoupons];
    this.heatmap = [...initialHeatmap];
    this.orders = [...initialOrders];
    this.deliveryStaff = [
      { id: "runner-1", name: "Rohan Verma", phone: "+91 98765 11223", activeTasks: 1, status: "Available", zone: "Central Food Court" },
      { id: "runner-2", name: "Amit Kumar", phone: "+91 98765 22334", activeTasks: 0, status: "Available", zone: "East Dining Gallery" },
      { id: "runner-3", name: "Pooja Singh", phone: "+91 98765 33445", activeTasks: 0, status: "Available", zone: "Sky Atrium Terrace" }
    ];
    this.deliveryTasks = [
      {
        id: "task-MB1042",
        masterOrderId: "MB1042",
        tableNumber: "A17",
        customerName: "Aarav Sharma",
        customerPhone: "+91 98765 43210",
        runnerName: "Rohan Verma",
        status: "Assigned",
        pickups: [
          { subOrderId: "P-402", restaurantName: "Pizza Hub", counterNumber: "FC-02", isReady: false, isPicked: false },
          { subOrderId: "S-108", restaurantName: "South Kitchen", counterNumber: "FC-03", isReady: false, isPicked: false },
          { subOrderId: "J-305", restaurantName: "Juice Bar", counterNumber: "FC-01", isReady: true, isPicked: false }
        ],
        createdAt: new Date().toISOString()
      }
    ];
    this.orderCounter = 1042;
  }

  // --- Malls & Tables ---
  getMalls() {
    return this.malls;
  }

  getMallById(id) {
    if (!id) return this.malls[0];
    const clean = id.toLowerCase().trim();
    return this.malls.find(m => 
      m.id.toLowerCase() === clean || 
      m.name.toLowerCase().includes(clean) ||
      clean.includes(m.id.toLowerCase())
    ) || this.malls[0];
  }

  createMall(data) {
    const id = `mall-${Date.now()}`;
    const newMall = {
      id,
      name: data.name || "New Mall Food Court",
      city: data.city || "City Center",
      location: data.location || "Central Food Atrium",
      zones: data.zones || [
        { id: "zone-1", name: "Central Food Court", tables: ["A-17", "A-12", "A-01", "A-05"] },
        { id: "zone-2", name: "East Dining Gallery", tables: ["B-05", "B-12"] }
      ],
      totalTables: data.totalTables || 30,
      activeOutlets: data.activeOutlets || 6,
      dailyVisitors: data.dailyVisitors || 10000
    };
    this.malls.unshift(newMall);
    return newMall;
  }

  getTables(mallId) {
    if (mallId && mallId !== 'all') {
      return this.tables.filter(t => t.mallId === mallId);
    }
    return this.tables;
  }

  /**
   * FEATURE 1: Smart Table QR Detection
   * Supports URLs like /mall/phoenix/floor-2/table-A17
   * Supports standard query params ?table=A17&mall=phoenix-lko
   */
  getTableByNumber(tableNumber, mallId = "mall-phoenix-lko") {
    let raw = (tableNumber || "").toUpperCase().trim();
    let detectedFloor = null;
    let detectedMall = mallId;

    // Pattern A: Path format /mall/phoenix/floor-2/table-A17
    if (raw.includes("/MALL/") || raw.includes("FLOOR-") || raw.includes("TABLE-") || raw.includes("TABLE/")) {
      const match = raw.match(/MALL\/([^\/]+)\/FLOOR-([^\/]+)\/TABLE-?([^\/\?#&]+)/i);
      if (match) {
        const mallSlug = match[1].toLowerCase();
        detectedFloor = `Floor ${match[2]}`;
        raw = match[3].replace(/[^A-Z0-9]/gi, '').toUpperCase();
        if (mallSlug.includes("phoenix") || mallSlug.includes("lko")) {
          detectedMall = "mall-phoenix-lko";
        } else if (mallSlug.includes("city")) {
          detectedMall = "mall-city";
        }
      }
    }

    // Pattern B: Query parameters ?table=A17&mall=mall-phoenix-lko
    if (raw.includes("TABLE=") || raw.includes("T=")) {
      const match = raw.match(/[?&](?:table|t)=([^&#\s]+)/i);
      if (match && match[1]) {
        raw = decodeURIComponent(match[1]).toUpperCase().trim();
      }
    }

    // Normalization helper
    const norm = (str) => (str || "").replace(/[^A-Z0-9]/gi, "").toUpperCase();
    const cleanNum = norm(raw);

    // 1. Exact match within current mall
    const table = this.tables.find(t => 
      norm(t.number) === cleanNum && (!detectedMall || t.mallId === detectedMall || detectedMall === 'all')
    );
    if (table) return table;

    // 2. Exact match across all tables
    const matchedAcross = this.tables.find(t => norm(t.number) === cleanNum);
    if (matchedAcross) return matchedAcross;

    // 3. Fallback table object
    const targetMallObj = this.getMallById(detectedMall) || this.malls[0];
    return {
      id: `table-${targetMallObj.id}-${cleanNum.toLowerCase()}`,
      number: cleanNum || "A17",
      mallId: targetMallObj.id,
      mallName: targetMallObj.name,
      zone: "Central Food Court",
      floor: detectedFloor || "Floor 2",
      status: "Active",
      qrCode: `MALLBITE-${targetMallObj.id.toUpperCase()}-${cleanNum || "A17"}`
    };
  }

  createTable(data) {
    const id = `table-${Date.now()}`;
    const newTable = {
      id,
      number: data.number.toUpperCase(),
      mallId: data.mallId || "mall-phoenix-lko",
      zone: data.zone || "Central Food Court",
      floor: data.floor || "Floor 2",
      status: "Active",
      qrCode: `MALLBITE-${(data.mallId || 'PHX').toUpperCase()}-${data.number.toUpperCase()}`
    };
    this.tables.push(newTable);
    return newTable;
  }

  bulkCreateTables(tableList, mallId = "mall-phoenix-lko", zone = "Central Food Court", floor = "Floor 2") {
    const created = [];
    for (const num of tableList) {
      const cleanNum = num.toUpperCase().trim();
      const existing = this.tables.find(t => t.number === cleanNum && t.mallId === mallId);
      if (!existing) {
        const newTable = {
          id: `table-${mallId}-${cleanNum.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
          number: cleanNum,
          mallId,
          zone,
          floor,
          status: "Active",
          qrCode: `MALLBITE-${mallId.toUpperCase()}-${cleanNum}`
        };
        this.tables.push(newTable);
        created.push(newTable);
      }
    }
    return created;
  }

  // --- Categories & Restaurants ---
  getCategories() {
    return this.categories;
  }

  getRestaurants() {
    return this.restaurants;
  }

  getRestaurantById(id) {
    return this.restaurants.find(r => r.id === id);
  }

  createRestaurant(data) {
    const id = `rest-${Date.now()}`;
    const newRestaurant = {
      id,
      name: data.name,
      tagline: data.tagline || "Delicious specialty items prepared fresh",
      category: data.category || "Fast Food • Multi-Cuisine",
      rating: 4.8,
      reviewsCount: 1,
      prepTime: data.prepTime || "10-15 mins",
      avgPrepMinutes: 12,
      activeStaff: 3,
      currentQueueOrders: 4,
      priceForTwo: data.priceForTwo || "₹350",
      counterNumber: data.counterNumber || `FC-0${this.restaurants.length + 1}`,
      floor: data.floor || "Level 2 Food Court",
      isVegOnly: !!data.isVegOnly,
      offerTag: data.offerTag || "10% OFF ON ORDERS ABOVE ₹199",
      bannerImage: data.bannerImage || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
      logoImage: data.logoImage || "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&auto=format&fit=crop&q=80",
      status: "Open",
      todayOrders: 0,
      todayRevenue: 0
    };
    this.restaurants.push(newRestaurant);
    return newRestaurant;
  }

  updateRestaurant(id, data) {
    const idx = this.restaurants.findIndex(r => r.id === id);
    if (idx !== -1) {
      this.restaurants[idx] = { ...this.restaurants[idx], ...data };
      return this.restaurants[idx];
    }
    return null;
  }

  // --- Menu Items ---
  getMenuItems(filters = {}) {
    let items = [...this.menuItems];
    if (filters.restaurantId) {
      items = items.filter(i => i.restaurantId === filters.restaurantId);
    }
    if (filters.category) {
      const catLower = filters.category.toLowerCase();
      items = items.filter(i => 
        i.category.toLowerCase().includes(catLower) || 
        i.name.toLowerCase().includes(catLower)
      );
    }
    if (filters.isVeg !== undefined && filters.isVeg !== null && filters.isVeg !== "") {
      const isVegBool = String(filters.isVeg) === "true";
      items = items.filter(i => i.isVeg === isVegBool);
    }
    if (filters.maxWait) {
      const max = parseInt(filters.maxWait, 10);
      items = items.filter(i => (i.prepTimeNum || 12) <= max);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      items = items.filter(i => 
        i.name.toLowerCase().includes(q) || 
        i.description.toLowerCase().includes(q) ||
        i.restaurantName.toLowerCase().includes(q) ||
        i.category.toLowerCase().includes(q)
      );
    }
    return items;
  }

  toggleItemAvailability(itemId, isAvailable) {
    const item = this.menuItems.find(i => i.id === itemId);
    if (item) {
      item.isAvailable = Boolean(isAvailable);
      return item;
    }
    return null;
  }

  addMenuItem(itemData) {
    const id = `item-${Date.now()}`;
    const newItem = {
      id,
      ...itemData,
      price: Number(itemData.price) || 99,
      prepTimeNum: Number(itemData.prepTimeNum) || 10,
      isVeg: Boolean(itemData.isVeg),
      isAvailable: true,
      rating: 4.5,
      ordersCount: 0
    };
    this.menuItems.push(newItem);
    return newItem;
  }

  // --- Coupons ---
  getCoupons() {
    return this.coupons;
  }

  validateCoupon(code, subtotal) {
    const coupon = this.coupons.find(c => c.code.toUpperCase() === (code || "").toUpperCase().trim());
    if (!coupon) {
      return { valid: false, message: "Invalid promo coupon code." };
    }
    if (subtotal < coupon.minOrder) {
      return { valid: false, message: `Minimum cart value of ₹${coupon.minOrder} required for ${coupon.code}.` };
    }
    let discount = 0;
    if (coupon.discountType === "fixed") {
      discount = coupon.value;
    } else if (coupon.discountType === "percentage") {
      discount = (subtotal * coupon.value) / 100;
      if (coupon.maxDiscount && discount > coupon.maxDiscount) {
        discount = coupon.maxDiscount;
      }
    }
    return {
      valid: true,
      code: coupon.code,
      discount: Math.round(discount),
      description: coupon.description
    };
  }

  // --- FEATURE 3 & 15: Multi-Outlet Smart Orders with Unified MB1042 ID ---
  createMasterOrder({
    tableNumber = "A17",
    customerName = "Aarav Sharma",
    customerPhone = "+91 98765 43210",
    items = [],
    paymentMethod = "UPI",
    couponCode = null,
    mallId = "mall-phoenix-lko"
  }) {
    this.orderCounter += 1;
    const masterOrderId = `MB${this.orderCounter}`;

    // Group cart items by restaurant
    const restaurantGroups = {};
    items.forEach(cartItem => {
      const restId = cartItem.restaurantId || 'rest-other';
      if (!restaurantGroups[restId]) {
        restaurantGroups[restId] = {
          restaurantId: restId,
          restaurantName: cartItem.restaurantName || "Food Court Kitchen",
          items: []
        };
      }
      restaurantGroups[restId].items.push({
        id: cartItem.id,
        name: cartItem.name,
        price: cartItem.price,
        quantity: cartItem.quantity,
        isVeg: cartItem.isVeg,
        image: cartItem.image
      });
    });

    let subtotal = 0;
    items.forEach(it => {
      subtotal += it.price * it.quantity;
    });

    let discount = 0;
    if (couponCode) {
      const couponRes = this.validateCoupon(couponCode, subtotal);
      if (couponRes.valid) {
        discount = couponRes.discount;
      }
    }

    const convenienceFee = 10;
    const gstTaxes = Math.round(subtotal * 0.05);
    const totalAmount = Math.max(0, subtotal + convenienceFee + gstTaxes - discount);

    // Create sub-orders
    const subOrders = Object.values(restaurantGroups).map((group, index) => {
      const rest = this.getRestaurantById(group.restaurantId);
      const prefix = rest ? rest.name.charAt(0).toUpperCase() : 'S';
      const subId = `${prefix}-${Math.floor(100 + Math.random() * 900)}`;

      if (rest) {
        rest.todayOrders += 1;
        const restSum = group.items.reduce((acc, cur) => acc + (cur.price * cur.quantity), 0);
        rest.todayRevenue += restSum;
        rest.currentQueueOrders = (rest.currentQueueOrders || 4) + 1;
      }

      return {
        id: subId,
        masterOrderId,
        restaurantId: group.restaurantId,
        restaurantName: group.restaurantName,
        counterNumber: rest ? rest.counterNumber : `FC-0${index + 1}`,
        status: "Accepted",
        statusTimeline: [
          { status: "Order Received", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), done: true },
          { status: "Accepted", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), done: true },
          { status: "Preparing", time: null, done: false },
          { status: "Ready for Pickup", time: null, done: false }
        ],
        items: group.items,
        estimatedTime: rest ? rest.prepTime : "10-14 mins"
      };
    });

    // Calculate smart batch parameters for this multi-outlet order
    const smartBatch = AIEngine.calculateSmartBatch(subOrders, this.restaurants);
    const queueOptimization = AIEngine.optimizeQueueSchedule(subOrders, this.restaurants);
    const ecoScore = AIEngine.calculateEcoScore(items, subOrders.length, Boolean(isReusablePackaging));

    const assignedRunner = this.deliveryStaff[0];
    const mallObj = this.getMallById(mallId);

    const masterOrder = {
      id: masterOrderId,
      tableNumber: tableNumber || "A17",
      tableName: `Table ${tableNumber || "A17"} (Central Food Court)`,
      mallName: mallObj ? mallObj.name : "Phoenix Mall Lucknow",
      customerName,
      customerPhone,
      subtotal,
      convenienceFee,
      gstTaxes,
      discount,
      totalAmount,
      paymentStatus: "Paid (UPI Verified)",
      paymentMethod,
      orderStatus: "SPLIT_TO_OUTLETS", // CREATED -> PAYMENT_CONFIRMED -> SPLIT_TO_OUTLETS -> PREPARING -> WAITING_FOR_CONSOLIDATION -> READY_FOR_DELIVERY -> OUT_FOR_DELIVERY -> DELIVERED
      createdAt: new Date().toISOString(),
      estimatedDeliveryTime: `${queueOptimization ? queueOptimization.targetDeliveryMinutes : 15} mins`,
      deliveryStaff: `${assignedRunner.name} (Runner #1)`,
      deliveryStaffPhone: assignedRunner.phone,
      deliveryStatus: "Assigned",
      subOrders,
      smartBatch,
      queueOptimization,
      ecoScore
    };

    this.orders.unshift(masterOrder);

    // Create delivery runner task
    const deliveryTask = {
      id: `task-${masterOrderId}`,
      masterOrderId,
      tableNumber,
      customerName,
      customerPhone,
      runnerName: assignedRunner.name,
      status: "Assigned",
      batchId: smartBatch ? smartBatch.batchId : `B${Math.floor(100 + Math.random() * 900)}`,
      pickups: subOrders.map(so => ({
        subOrderId: so.id,
        restaurantName: so.restaurantName,
        counterNumber: so.counterNumber,
        isReady: false,
        isPicked: false
      })),
      createdAt: new Date().toISOString()
    };
    this.deliveryTasks.unshift(deliveryTask);

    return masterOrder;
  }

  getGroupPlan(members, totalBudget) {
    return AIEngine.generateGroupPlan(members, totalBudget, this.menuItems, this.restaurants);
  }

  getQueueSchedule(orderId) {
    const order = this.getMasterOrderById(orderId);
    if (!order) return null;
    return order.queueOptimization || AIEngine.optimizeQueueSchedule(order.subOrders, this.restaurants);
  }

  getEcoScore(orderId) {
    const order = this.getMasterOrderById(orderId);
    if (!order) return null;
    return order.ecoScore || AIEngine.calculateEcoScore(order.items || [], order.subOrders?.length || 1);
  }

  getVendorDemandForecast(outletId) {
    return AIEngine.getVendorDemandForecast(outletId, this.restaurants, this.menuItems);
  }

  getVendorAnalytics(outletId) {
    const outlet = this.getRestaurantById(outletId) || this.restaurants[0];
    const forecast = AIEngine.getVendorDemandForecast(outlet?.id, this.restaurants, this.menuItems);
    const outletOrders = [];
    this.orders.forEach(mo => {
      const matchSub = mo.subOrders?.find(so => so.restaurantId === outlet?.id);
      if (matchSub) {
        outletOrders.push({
          masterOrderId: mo.id,
          subOrderId: matchSub.id,
          tableNumber: mo.tableNumber,
          items: matchSub.items,
          status: matchSub.status,
          createdAt: mo.createdAt
        });
      }
    });

    return {
      outlet,
      forecast,
      activeOrdersCount: outletOrders.length,
      orders: outletOrders.slice(0, 10),
      todayOrders: outlet?.todayOrders || 142,
      todayRevenue: outlet?.todayRevenue || 47600
    };
  }

  getMasterOrders() {
    return this.orders;
  }

  getMasterOrderById(id) {
    return this.orders.find(o => o.id === id);
  }

  updateSubOrderStatus(subOrderId, newStatus) {
    for (const master of this.orders) {
      const sub = master.subOrders.find(s => s.id === subOrderId);
      if (sub) {
        sub.status = newStatus;
        const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        if (newStatus === "Preparing") {
          const prepStep = sub.statusTimeline.find(t => t.status === "Preparing");
          if (prepStep) { prepStep.done = true; prepStep.time = nowTime; }
        } else if (newStatus === "Ready" || newStatus === "Ready for Pickup") {
          sub.status = "Ready for Pickup";
          const readyStep = sub.statusTimeline.find(t => t.status === "Ready for Pickup");
          if (readyStep) { readyStep.done = true; readyStep.time = nowTime; }

          const delTask = this.deliveryTasks.find(dt => dt.masterOrderId === master.id);
          if (delTask) {
            const p = delTask.pickups.find(pick => pick.subOrderId === subOrderId);
            if (p) p.isReady = true;
          }
        }

        const allReady = master.subOrders.every(s => 
          s.status === "Ready for Pickup" || s.status === "Picked Up" || s.status === "Delivered"
        );
        if (allReady && master.orderStatus === "Preparing") {
          master.orderStatus = "Ready for Table Pickup";
        }

        return { master, subOrder: sub };
      }
    }
    return null;
  }

  updateDeliveryTaskStatus(taskId, status) {
    const task = this.deliveryTasks.find(t => t.id === taskId);
    if (!task) return null;
    task.status = status;

    const master = this.orders.find(o => o.id === task.masterOrderId);
    if (master) {
      master.deliveryStatus = status;
      if (status === "Picked Up") {
        task.pickups.forEach(p => { p.isPicked = true; });
        master.subOrders.forEach(s => { s.status = "Picked Up"; });
        master.orderStatus = "On the Way to Table";
      } else if (status === "On the Way") {
        master.orderStatus = "Runner Arriving at Table";
      } else if (status === "Delivered") {
        master.orderStatus = "Delivered";
        master.subOrders.forEach(s => { s.status = "Delivered"; });
      }
    }
    return { task, master };
  }

  getDeliveryTasks() {
    return this.deliveryTasks;
  }

  // --- AI INTELLIGENCE METHODS ---

  getAIRecommendations(preferences = {}) {
    return AIEngine.getRecommendations(this.menuItems, this.restaurants, preferences);
  }

  getOutletQueues() {
    return this.restaurants.map(rest => {
      const activeCount = rest.currentQueueOrders || 5;
      return AIEngine.calculateOutletQueue(rest, activeCount);
    });
  }

  getFasterAlternatives(itemId, maxWait = 15) {
    const item = this.menuItems.find(i => i.id === itemId) || this.menuItems[0];
    return AIEngine.getFasterAlternatives(item, this.menuItems, this.restaurants, maxWait);
  }

  getSmartBatch(orderId) {
    const order = this.getMasterOrderById(orderId) || this.orders[0];
    if (!order) return null;
    return AIEngine.calculateSmartBatch(order.subOrders, this.restaurants);
  }

  getCrowdAndDemandForecast() {
    return AIEngine.getCrowdAndDemandForecast(this.orders, this.restaurants);
  }

  getInventorySignals() {
    return AIEngine.getInventorySignals(this.restaurants);
  }

  getMallAnalytics() {
    const totalRevenue = this.restaurants.reduce((acc, r) => acc + r.todayRevenue, 0) + 210000;
    const totalOrders = this.restaurants.reduce((acc, r) => acc + r.todayOrders, 0) + 1240;

    return {
      kpis: {
        totalOrders,
        totalRevenue: `₹${(totalRevenue).toLocaleString('en-IN')}`,
        activeRestaurants: this.restaurants.filter(r => r.status === "Open").length,
        todayCustomers: 8940,
        averageOrderValue: "₹437",
        averageWaitTime: "11 min",
        avgDeliveryTime: "11.4 mins"
      },
      ordersPerHour: [
        { hour: "12 PM", orders: 94, revenue: 41200 },
        { hour: "01 PM", orders: 148, revenue: 68900 },
        { hour: "02 PM", orders: 112, revenue: 51200 },
        { hour: "04 PM", orders: 48, revenue: 18500 },
        { hour: "05 PM", orders: 72, revenue: 29800 },
        { hour: "06 PM", orders: 115, revenue: 48400 },
        { hour: "07 PM", orders: 184, revenue: 84500 },
        { hour: "08 PM", orders: 210, revenue: 96800 },
        { hour: "09 PM", orders: 145, revenue: 64200 }
      ],
      popularCategories: [
        { name: "Pizzas & Breads", percentage: 32 },
        { name: "South Indian Dosas", percentage: 28 },
        { name: "Burgers & Wraps", percentage: 22 },
        { name: "Beverages & Shakes", percentage: 12 },
        { name: "Biryani & Thalis", percentage: 6 }
      ],
      crowdIntelligence: this.getCrowdAndDemandForecast(),
      inventorySignals: this.getInventorySignals(),
      outletQueues: this.getOutletQueues(),
      heatmap: this.heatmap
    };
  }

  /**
   * FEATURE 27: Hackathon Demo Activity Simulator
   */
  simulateDemoActivity(action = 'spike_orders') {
    if (action === 'spike_orders') {
      const pizzaHub = this.restaurants.find(r => r.id === 'rest-pizza');
      if (pizzaHub) pizzaHub.currentQueueOrders = 28;
      const southKit = this.restaurants.find(r => r.id === 'rest-south');
      if (southKit) southKit.currentQueueOrders = 8;
      return { success: true, message: "Simulated order surge at Pizza Hub and South Kitchen." };
    }
    return { success: true, message: "Demo activity simulated." };
  }
}

export const dataStore = new DataStore();
