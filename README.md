# 🍕 MallBite — AI-Powered Multi-Outlet Food Court Operating System

> **One QR. Every Outlet. Intelligent Food Courts.**  
> *From Food Ordering to Food-Court Intelligence.*

---

## 🌟 Vision & Architecture

**MallBite** transforms shopping mall food courts into an intelligent, synchronized digital operating system connecting customers, restaurant kitchens, delivery staff, and mall administrators through a unified QR-driven infrastructure.

```
+-----------------------------------------------------------------------------------+
|                        MALLBITE OPERATING SYSTEM PIPELINE                         |
+-----------------------------------------------------------------------------------+
| 1. Physical Table QR    -> Encodes Mall ID, Floor & Table Number (e.g. Table A17) |
| 2. Customer Hub         -> One Combined Smart Cart across multiple food outlets   |
| 3. AI Advisor Engine    -> Multi-attribute recommendation (Budget, Mood, Time)    |
| 4. Smart Queue Engine   -> Live queue telemetry: Wait = ((Q * Prep) / Staff) * C  |
| 5. Unified Payment      -> Single checkout generates Master Order #MB1042        |
| 6. Kitchen Dispatch     -> Autonomous routing to Food Corner, South Kitchen, etc. |
| 7. Smart Batching       -> Synchronized max(prep_time) pickup window + runner path |
| 8. Telemetry & BI       -> Live crowd gauge, demand curves & predictive inventory |
+-----------------------------------------------------------------------------------+
```

---

## 🚀 Key Hackathon Capabilities

### 1. Multi-Outlet Smart Cart & Master Order Splitting
- Combine dishes from **Pizza Hub**, **South Kitchen**, **Food Corner**, **Juice Bar**, and **Spice Route** in a single cart.
- Single payment checkout generating unified master order (e.g., **#MB1042**) split into individual kitchen tickets (**#P101**, **#S202**, **#F303**).

### 2. Multi-Attribute AI Food Recommendation Engine
- Modular multi-attribute scoring model:
  $$\text{Score} = w_b \cdot \text{BudgetMatch} + w_c \cdot \text{CuisineMatch} + w_d \cdot \text{DietaryMatch} + w_p \cdot \text{PreferenceMatch} + w_t \cdot \text{PrepTimeMatch} + w_r \cdot \text{Rating}$$
- Transparent match percentages and personalized explanations (*"Fits budget (< ₹300) • Ready in 8 mins"*).

### 3. Smart Queue Wait-Time Algorithm & Alternative Suggestions
- Algorithmic formula:
  $$\text{Estimated Wait} = \frac{\text{Active Queue Orders} \times \text{Average Prep Time}}{\text{Active Kitchen Staff}} \times \text{Complexity Factor}$$
- Proactive **Smart Alternative Modal** alerts customers if an outlet exceeds wait limits and suggests faster dishes from neighboring counters.

### 4. Smart Multi-Outlet Order Batching Algorithm
- Runner route optimization through food court counters (e.g., `Juice Bar (FC-01) ➔ Pizza Hub (FC-02) ➔ South Kitchen (FC-03)`).
- Synchronized pickup window based on $\max(t_{\text{prep}})$ to deliver piping-hot food simultaneously.

### 5. Multi-Outlet Side-by-Side Dish Comparison
- Interactive modal comparing portion sizes, prices, ratings, dietary profiles, and preparation times across competing food court outlets.

### 6. B2B Mall Admin Telemetry & Crowd Intelligence
- Real-time food court crowd level gauge (e.g., `78% BUSY`).
- Hourly demand curves predicting upcoming rush windows (`7:00 PM – 8:30 PM`).
- Predictive inventory signals warning kitchens of low stock before peak dinner rushes.

### 7. 4 Synchronized Role Dashboards
- **Customer Hub**: Table-aware ordering, AI advisor, wait filters, live multi-outlet tracking.
- **Kitchen Dashboard**: Real-time counter ticket progression (Incoming ➔ Preparing ➔ Ready).
- **Delivery Runner Hub**: Multi-counter pickup routing checklist and table drop-off confirmation.
- **Mall Admin Portal**: Live counter queues, crowd intelligence, daily revenue settlements, and printable table QR standee generator.

---

## 💻 Tech Stack
- **Frontend**: React 18, Vite, Vanilla CSS + Tailwind utility tokens, Lucide Icons, Recharts, Canvas-Confetti, QRCode.
- **Backend**: Node.js, Express, REST APIs, JSON state persistence, modular AI Engine.

---

## 🛠️ Running Locally

### Development:
```bash
# 1. Install dependencies
npm run install:all

# 2. Start Backend API Server (http://localhost:5000)
npm run dev:backend

# 3. Start Frontend App (http://localhost:3000)
npm run dev:frontend
```

### Production Build & Verification:
```bash
npm run build
npm start
```
