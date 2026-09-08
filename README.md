# 🍔 MALLBITE — One QR. Every Food Outlet. One Seamless Experience.

> **Digital Food-Commerce Operating System for Shopping Mall Food Courts**

---

## 🌟 Concept & Key Innovation
**MALLBITE** transforms shopping mall food courts from fragmented, queue-heavy environments into a unified digital ecosystem. A customer sitting at **Table A-24** scans a single QR code, browses menus from multiple restaurants (Burger House, Pizza Corner, Coffee Culture, Spice Route, Wok Express, Dessert Lab), adds items from different outlets into **one single cart**, pays once, and gets everything delivered to their table via dedicated mall runners.

---

## 🚀 Key Features

1. **Swiggy/Zomato-Inspired Customer Experience**:
   - Location & Table detection pill (`📍 Phoenix Mall Food Hub • Table A-24`).
   - "What's on your mind?" circular dish carousel.
   - Restaurant cards with discount badges (`70% OFF UPTO ₹140`, `₹135 OFF ABOVE ₹199`), star ratings, prep times, and food court counter numbers.
   - Menu browser with category tabs, Veg/Non-Veg indicators, and quick quantity counters.
2. **Multi-Restaurant Cart & Smart Splitting**:
   - Add Classic Burger (Burger House) + Farmhouse Pizza (Pizza Corner) + Iced Cold Coffee (Coffee Culture) in one combined cart.
   - Single combined payment checkout (Mock UPI with QR, Credit/Debit Card, Net Banking).
   - Generates **Master Order #MB10245** split into separate kitchen sub-orders (**#B782**, **#P491**, **#C221**).
3. **Real-Time Live Order Tracking**:
   - Synchronized timeline from Kitchen Cooking → Ready at Counters → Runner Pickup → Table Delivered.
4. **4 Synchronized Role Dashboards**:
   - **Customer**: Mobile-optimized ordering hub, multi-cart, live tracker & AI smart search.
   - **Restaurant Kitchen Admin**: Live order pipeline (Incoming → Preparing → Ready) & stock availability manager.
   - **Mall Admin**: Food court floor Heatmap, dynamic Table QR Generator & AI Peak Demand Forecaster.
   - **Delivery Runner**: Multi-counter pickup checklist & table delivery status progression.
5. **Hackathon Live Demo Mode**:
   - 1-click interactive demo simulator for judges to test the complete 5-stage flow in 15 seconds.

---

## 💻 Tech Stack
- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons, Recharts, Canvas-Confetti, QRCode.
- **Backend**: Node.js, Express, REST APIs, JSON state persistence with live polling sync.

---

## 🛠️ Running Locally

### 1. Start Backend Server:
```bash
cd backend
npm install
npm start
# Server runs on http://localhost:5000
```

### 2. Start Frontend App:
```bash
cd frontend
npm install
npm run dev
# App runs on http://localhost:3000
```
