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
      { id: "runner-1", name: "Rohan Verma", phone: "+91 98765 11223", activeTasks: 1, status: "Available", zone: "North Food Court" },
      { id: "runner-2", name: "Amit Kumar", phone: "+91 98765 22334", activeTasks: 0, status: "Available", zone: "South Atrium" },
      { id: "runner-3", name: "Pooja Singh", phone: "+91 98765 33445", activeTasks: 0, status: "Available", zone: "Sky Terrace" }
    ];
    this.deliveryTasks = [];
    this.orderCounter = 10245;
  }

  // --- Malls & Tables ---
  getMalls() {
    return this.malls;
  }

  getTables() {
    return this.tables;
  }

  getTableByNumber(tableNumber) {
    const cleanNum = (tableNumber || "").toUpperCase().trim();
    return this.tables.find(t => t.number.toUpperCase() === cleanNum) || {
      id: `table-custom-${cleanNum}`,
      number: cleanNum || "A-24",
      mallId: "mall-1",
      zone: "North Food Court",
      floor: "Level 2",
      status: "Active",
      qrCode: `MALLBITE-PHX-L2-${cleanNum || "A24"}`
    };
  }

  createTable(data) {
    const id = `table-${Date.now()}`;
    const newTable = {
      id,
      number: data.number.toUpperCase(),
      mallId: data.mallId || "mall-1",
      zone: data.zone || "North Food Court",
      floor: data.floor || "Level 2",
      status: "Active",
      qrCode: `MALLBITE-PHX-${data.floor ? data.floor.replace(/\s+/g, '') : 'L2'}-${data.number.toUpperCase()}`
    };
    this.tables.push(newTable);
    return newTable;
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
      items = items.filter(i => i.category.toLowerCase().includes(catLower) || (i.name.toLowerCase().includes(catLower)));
    }
    if (filters.isVeg !== undefined && filters.isVeg !== null && filters.isVeg !== "") {
      const isVegBool = String(filters.isVeg) === "true";
      items = items.filter(i => i.isVeg === isVegBool);
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

  // --- Multi-Restaurant Order Splitting ---
  createMasterOrder({
    tableNumber = "A-24",
    customerName = "Guest Customer",
    customerPhone = "+91 98765 43210",
    items = [],
    paymentMethod = "UPI",
    couponCode = null
  }) {
    this.orderCounter += 1;
    const masterOrderId = `MB${this.orderCounter}`;

    // Group cart items by restaurant
    const restaurantGroups = {};
    items.forEach(cartItem => {
      const restId = cartItem.restaurantId;
      if (!restaurantGroups[restId]) {
        restaurantGroups[restId] = {
          restaurantId: restId,
          restaurantName: cartItem.restaurantName,
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

    // Check discount
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
      const subId = `${prefix}${Math.floor(100 + Math.random() * 900)}`;
      
      // Update restaurant revenue
      if (rest) {
        rest.todayOrders += 1;
        const restSum = group.items.reduce((acc, cur) => acc + (cur.price * cur.quantity), 0);
        rest.todayRevenue += restSum;
      }

      return {
        id: subId,
        masterOrderId,
        restaurantId: group.restaurantId,
        restaurantName: group.restaurantName,
        counterNumber: rest ? rest.counterNumber : `FC-0${index + 1}`,
        status: "Accepted", // Instant auto-accept
        statusTimeline: [
          { status: "Order Placed", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), done: true },
          { status: "Accepted", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), done: true },
          { status: "Preparing", time: null, done: false },
          { status: "Ready for Pickup", time: null, done: false }
        ],
        items: group.items,
        estimatedTime: "12-15 mins"
      };
    });

    // Assign a delivery runner
    const assignedRunner = this.deliveryStaff[0];

    const masterOrder = {
      id: masterOrderId,
      tableNumber,
      tableName: `Table ${tableNumber} (North Court)`,
      mallName: "Phoenix Marketcity Food Hub",
      customerName,
      customerPhone,
      subtotal,
      convenienceFee,
      gstTaxes,
      discount,
      totalAmount,
      paymentStatus: "Paid (Verified)",
      paymentMethod,
      orderStatus: "Preparing",
      createdAt: new Date().toISOString(),
      estimatedDeliveryTime: "15-18 mins",
      deliveryStaff: `${assignedRunner.name} (Runner #1)`,
      deliveryStaffPhone: assignedRunner.phone,
      deliveryStatus: "Assigned", // Assigned -> Picked Up -> On The Way -> Delivered
      subOrders
    };

    this.orders.unshift(masterOrder);

    // Create delivery task
    const deliveryTask = {
      id: `task-${masterOrderId}`,
      masterOrderId,
      tableNumber,
      customerName,
      customerPhone,
      runnerName: assignedRunner.name,
      status: "Assigned",
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

  getMasterOrders() {
    return this.orders;
  }

  getMasterOrderById(id) {
    return this.orders.find(o => o.id === id);
  }

  // Update a sub-order from Restaurant Kitchen
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

          // Update delivery task item readiness
          const delTask = this.deliveryTasks.find(dt => dt.masterOrderId === master.id);
          if (delTask) {
            const p = delTask.pickups.find(pick => pick.subOrderId === subOrderId);
            if (p) p.isReady = true;
          }
        }

        // Check if all suborders are ready
        const allReady = master.subOrders.every(s => s.status === "Ready for Pickup" || s.status === "Picked Up" || s.status === "Delivered");
        if (allReady && master.orderStatus === "Preparing") {
          master.orderStatus = "Ready for Table Pickup";
        }

        return { master, subOrder: sub };
      }
    }
    return null;
  }

  // Delivery task status update
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

  // Mall Analytics & Heatmap
  getMallAnalytics() {
    const totalRevenue = this.restaurants.reduce((acc, r) => acc + r.todayRevenue, 0) + 185400;
    const totalOrders = this.restaurants.reduce((acc, r) => acc + r.todayOrders, 0) + 940;

    return {
      kpis: {
        totalOrders,
        totalRevenue: `₹${(totalRevenue).toLocaleString('en-IN')}`,
        activeRestaurants: this.restaurants.filter(r => r.status === "Open").length,
        todayCustomers: 8420,
        averageOrderValue: "₹480",
        cancellationRate: "0.4%",
        avgDeliveryTime: "14.2 mins"
      },
      ordersPerHour: [
        { hour: "11 AM", orders: 28, revenue: 12400 },
        { hour: "12 PM", orders: 94, revenue: 41200 },
        { hour: "01 PM", orders: 148, revenue: 68900 },
        { hour: "02 PM", orders: 112, revenue: 51200 },
        { hour: "03 PM", orders: 45, revenue: 19800 },
        { hour: "04 PM", orders: 38, revenue: 16500 },
        { hour: "05 PM", orders: 62, revenue: 27800 },
        { hour: "06 PM", orders: 88, revenue: 39400 },
        { hour: "07 PM", orders: 165, revenue: 76500 },
        { hour: "08 PM", orders: 192, revenue: 88900 },
        { hour: "09 PM", orders: 135, revenue: 62400 }
      ],
      popularCategories: [
        { name: "Burgers", percentage: 32 },
        { name: "Pizzas", percentage: 28 },
        { name: "Biryani & North Indian", percentage: 22 },
        { name: "Beverages & Coffee", percentage: 10 },
        { name: "Desserts", percentage: 8 }
      ],
      heatmap: this.heatmap,
      aiDemandForecast: {
        peakWindow: "7:00 PM – 9:30 PM",
        expectedOrders: "350+ orders",
        highDemandZones: ["North Food Court (A-Tables)", "Sky Terrace (C-Tables)"],
        recommendedStaffIncrease: 3,
        suggestedOutletsPrep: ["Burger House (Prepare +40 patties)", "Pizza Corner (Pre-stretch 30 doughs)"]
      }
    };
  }

  // AI Recommendation engine
  getAIRecommendations(cartItems = []) {
    const hasBurger = cartItems.some(i => i.name.toLowerCase().includes("burger"));
    const hasPizza = cartItems.some(i => i.name.toLowerCase().includes("pizza"));
    const hasBiryani = cartItems.some(i => i.name.toLowerCase().includes("biryani"));

    const suggestions = [];
    if (hasBurger || hasPizza) {
      suggestions.push({
        id: "rec-1",
        title: "Cold Coffee & Fries Combo Saver",
        reason: "86% of customers pairing Burgers & Pizza add Cold Coffee & Crinkle Fries",
        suggestedItems: [
          this.menuItems.find(i => i.id === "item-102"), // Peri peri fries
          this.menuItems.find(i => i.id === "item-401")  // Cold coffee
        ],
        comboDiscount: 40,
        comboPrice: 168 // 79 + 129 = 208 - 40
      });
    }

    if (hasBiryani) {
      suggestions.push({
        id: "rec-2",
        title: "Royal Meal Sweet Ending",
        reason: "Pair your Dum Biryani with warm Belgian Waffle from Dessert Lab",
        suggestedItems: [
          this.menuItems.find(i => i.id === "item-601") // Belgian Waffle
        ],
        comboDiscount: 30,
        comboPrice: 159
      });
    }

    // Default fallback combo
    if (suggestions.length === 0) {
      suggestions.push({
        id: "rec-def",
        title: "Food Court Signature Trio",
        reason: "Handpicked multi-outlet favorite for first-time visitors",
        suggestedItems: [
          this.menuItems.find(i => i.id === "item-101"),
          this.menuItems.find(i => i.id === "item-203"),
          this.menuItems.find(i => i.id === "item-401")
        ],
        comboDiscount: 50,
        comboPrice: 367
      });
    }

    return suggestions;
  }
}

export const dataStore = new DataStore();
