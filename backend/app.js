import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dataStore } from "./data/store.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

// Request logger for visibility
app.use((req, res, next) => {
  if (process.env.NODE_ENV !== "test") {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  }
  next();
});

// --- Health Check ---
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    platform: "MALLBITE API v1.0",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString()
  });
});

// --- Malls & Tables ---
app.get("/api/malls", (req, res) => {
  res.json({ success: true, data: dataStore.getMalls() });
});

app.get("/api/malls/:id", (req, res) => {
  const mall = dataStore.getMallById(req.params.id);
  if (!mall) {
    return res.status(404).json({ success: false, message: "Mall not found." });
  }
  res.json({ success: true, data: mall });
});

app.post("/api/malls", (req, res) => {
  const { name, city, location, zones, totalTables } = req.body;
  if (!name) {
    return res.status(400).json({ success: false, message: "Mall name is required." });
  }
  const newMall = dataStore.createMall({ name, city, location, zones, totalTables });
  res.status(201).json({ success: true, data: newMall, message: `${name} successfully onboarded to MALLBITE!` });
});

app.get("/api/tables", (req, res) => {
  const { mallId } = req.query;
  res.json({ success: true, data: dataStore.getTables(mallId) });
});

app.get("/api/tables/detect/:number", (req, res) => {
  const { mallId } = req.query;
  const table = dataStore.getTableByNumber(req.params.number, mallId);
  res.json({ success: true, data: table });
});

app.post("/api/tables", (req, res) => {
  const { number, zone, floor, mallId } = req.body;
  if (!number) {
    return res.status(400).json({ success: false, message: "Table number is required." });
  }
  const newTable = dataStore.createTable({ number, zone, floor, mallId });
  res.status(201).json({ success: true, data: newTable });
});

app.post("/api/tables/bulk", (req, res) => {
  const { tables, mallId, zone, floor } = req.body;
  if (!tables || !Array.isArray(tables) || tables.length === 0) {
    return res.status(400).json({ success: false, message: "List of table numbers is required." });
  }
  const created = dataStore.bulkCreateTables(tables, mallId, zone, floor);
  res.status(201).json({ success: true, count: created.length, data: created });
});

// --- Categories & Restaurants ---
app.get("/api/categories", (req, res) => {
  res.json({ success: true, data: dataStore.getCategories() });
});

app.get("/api/restaurants", (req, res) => {
  res.json({ success: true, data: dataStore.getRestaurants() });
});

app.post("/api/restaurants", (req, res) => {
  const { name, tagline, category, priceForTwo, counterNumber, floor, isVegOnly, bannerImage, logoImage } = req.body;
  if (!name) {
    return res.status(400).json({ success: false, message: "Restaurant name is required." });
  }
  const newRest = dataStore.createRestaurant({ name, tagline, category, priceForTwo, counterNumber, floor, isVegOnly, bannerImage, logoImage });
  res.status(201).json({ success: true, data: newRest, message: `${name} outlet added to food court!` });
});

app.get("/api/restaurants/:id", (req, res) => {
  const rest = dataStore.getRestaurantById(req.params.id);
  if (!rest) {
    return res.status(404).json({ success: false, message: "Restaurant not found" });
  }
  const menu = dataStore.getMenuItems({ restaurantId: req.params.id });
  res.json({ success: true, data: { ...rest, menu } });
});


app.patch("/api/restaurants/:id", (req, res) => {
  const updated = dataStore.updateRestaurant(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ success: false, message: "Restaurant not found" });
  }
  res.json({ success: true, data: updated });
});

// --- Menu Items ---
app.get("/api/menu", (req, res) => {
  const { restaurantId, category, isVeg, search } = req.query;
  const items = dataStore.getMenuItems({ restaurantId, category, isVeg, search });
  res.json({ success: true, count: items.length, data: items });
});

app.patch("/api/menu/:id/availability", (req, res) => {
  const { isAvailable } = req.body;
  const item = dataStore.toggleItemAvailability(req.params.id, isAvailable);
  if (!item) {
    return res.status(404).json({ success: false, message: "Item not found" });
  }
  res.json({ success: true, data: item });
});

app.post("/api/menu", (req, res) => {
  const item = dataStore.addMenuItem(req.body);
  res.status(201).json({ success: true, data: item });
});

// --- Coupons ---
app.get("/api/coupons", (req, res) => {
  res.json({ success: true, data: dataStore.getCoupons() });
});

app.post("/api/coupons/validate", (req, res) => {
  const { code, subtotal } = req.body;
  const result = dataStore.validateCoupon(code, Number(subtotal) || 0);
  res.json(result);
});

// --- Orders & Multi-Restaurant Splitting ---
app.post("/api/orders", (req, res) => {
  const { tableNumber, customerName, customerPhone, items, paymentMethod, couponCode } = req.body;
  if (!items || items.length === 0) {
    return res.status(400).json({ success: false, message: "Cart is empty." });
  }

  const masterOrder = dataStore.createMasterOrder({
    tableNumber: tableNumber || "A-24",
    customerName: customerName || "Food Court Guest",
    customerPhone: customerPhone || "+91 98765 43210",
    items,
    paymentMethod: paymentMethod || "UPI",
    couponCode
  });

  res.status(201).json({
    success: true,
    message: `Master Order #${masterOrder.id} successfully created and dispatched to ${masterOrder.subOrders.length} food outlets!`,
    data: masterOrder
  });
});

app.get("/api/orders", (req, res) => {
  res.json({ success: true, data: dataStore.getMasterOrders() });
});

app.get("/api/orders/:id", (req, res) => {
  const order = dataStore.getMasterOrderById(req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, message: "Order not found." });
  }
  res.json({ success: true, data: order });
});

// Update sub-order status from Kitchen (e.g. Accepted -> Preparing -> Ready)
app.patch("/api/orders/sub/:subOrderId/status", (req, res) => {
  const { status } = req.body;
  const result = dataStore.updateSubOrderStatus(req.params.subOrderId, status);
  if (!result) {
    return res.status(404).json({ success: false, message: "Sub-order not found." });
  }
  res.json({ success: true, data: result });
});

// --- Delivery Staff Tasks ---
app.get("/api/delivery/tasks", (req, res) => {
  res.json({ success: true, data: dataStore.getDeliveryTasks() });
});

app.patch("/api/delivery/tasks/:taskId/status", (req, res) => {
  const { status } = req.body;
  const result = dataStore.updateDeliveryTaskStatus(req.params.taskId, status);
  if (!result) {
    return res.status(404).json({ success: false, message: "Delivery task not found." });
  }
  res.json({ success: true, data: result });
});

// --- Mall Admin Analytics & Heatmap ---
app.get("/api/mall/analytics", (req, res) => {
  res.json({ success: true, data: dataStore.getMallAnalytics() });
});

// --- AI Endpoints ---
app.post("/api/ai/recommend", (req, res) => {
  const { cartItems } = req.body;
  const recommendations = dataStore.getAIRecommendations(cartItems || []);
  res.json({ success: true, data: recommendations });
});

app.post("/api/ai/smart-search", (req, res) => {
  const { prompt } = req.body;
  const q = (prompt || "").toLowerCase();

  let maxBudget = 9999;
  const budgetMatch = q.match(/under\s*(?:₹|rs\.?|inr)?\s*(\d+)/i) || q.match(/(\d+)\s*(?:rs|rupees|bucks)/i);
  if (budgetMatch && budgetMatch[1]) {
    maxBudget = parseInt(budgetMatch[1], 10);
  }

  const isSpicy = q.includes("spicy") || q.includes("hot") || q.includes("fiery") || q.includes("chili");
  const isVegQuery = q.includes("veg") && !q.includes("non-veg") && !q.includes("nonveg");
  const isSweet = q.includes("sweet") || q.includes("dessert") || q.includes("chocolate") || q.includes("cake");

  let results = dataStore.getMenuItems().filter(item => {
    if (item.price > maxBudget) return false;
    if (isVegQuery && !item.isVeg) return false;
    if (isSpicy && !(item.description.toLowerCase().includes("spic") || item.description.toLowerCase().includes("peri") || item.description.toLowerCase().includes("chili") || item.name.toLowerCase().includes("spicy"))) return false;
    if (isSweet && item.restaurantId !== "rest-6" && !item.category.toLowerCase().includes("dessert")) return false;
    return true;
  });

  if (results.length === 0) {
    results = dataStore.getMenuItems().filter(i => i.price <= maxBudget);
  }

  res.json({
    success: true,
    queryAnalysis: {
      detectedBudget: maxBudget < 9999 ? `₹${maxBudget}` : "No budget limit",
      isSpicy,
      isVegQuery,
      matchedItemsCount: results.length
    },
    data: results.slice(0, 8)
  });
});

// --- Hackathon Live Demo Progression ---
app.post("/api/demo/simulate-step", (req, res) => {
  const { step } = req.body;
  const latestOrder = dataStore.getMasterOrders()[0];

  if (!latestOrder) {
    return res.status(400).json({ success: false, message: "No active order to simulate on." });
  }

  if (step === 1) {
    latestOrder.subOrders.forEach(so => {
      dataStore.updateSubOrderStatus(so.id, "Preparing");
    });
  } else if (step === 2) {
    latestOrder.subOrders.forEach(so => {
      dataStore.updateSubOrderStatus(so.id, "Ready for Pickup");
    });
  } else if (step === 3) {
    const dt = dataStore.getDeliveryTasks().find(t => t.masterOrderId === latestOrder.id);
    if (dt) {
      dataStore.updateDeliveryTaskStatus(dt.id, "Picked Up");
    }
  } else if (step === 4) {
    const dt = dataStore.getDeliveryTasks().find(t => t.masterOrderId === latestOrder.id);
    if (dt) {
      dataStore.updateDeliveryTaskStatus(dt.id, "On the Way");
    }
  } else if (step === 5) {
    const dt = dataStore.getDeliveryTasks().find(t => t.masterOrderId === latestOrder.id);
    if (dt) {
      dataStore.updateDeliveryTaskStatus(dt.id, "Delivered");
    }
  }

  res.json({
    success: true,
    message: `Simulated step ${step}`,
    order: latestOrder
  });
});

// --- Production Static Assets Serving ---
// Serve frontend static build if frontend/dist exists
const frontendDistPath = path.resolve(__dirname, "../frontend/dist");
if (fs.existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath));
  app.get("*", (req, res, next) => {
    if (req.url.startsWith("/api")) {
      return next();
    }
    res.sendFile(path.join(frontendDistPath, "index.html"));
  });
}

export default app;
