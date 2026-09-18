export const initialMalls = [
  {
    id: "mall-phoenix-lko",
    name: "Phoenix Mall Lucknow",
    city: "Lucknow",
    location: "Level 2 Central Food Court, Sector B, Amar Shaheed Path",
    zones: [
      { id: "zone-central", name: "Central Food Court", tables: ["A-17", "A-12", "A-01", "A-05", "A-24"] },
      { id: "zone-east", name: "East Dining Gallery", tables: ["B-05", "B-12", "B-15"] },
      { id: "zone-sky", name: "Sky Atrium Terrace", tables: ["C-01", "C-08", "C-12"] }
    ],
    totalTables: 36,
    activeOutlets: 6,
    dailyVisitors: 14200
  },
  {
    id: "mall-city",
    name: "City Center Mall Food Court",
    city: "Metro City",
    location: "Level 3 Grand Food Atrium, City Center",
    zones: [
      { id: "zone-a", name: "Zone A (North Food Atrium)", tables: ["A-01", "A-02", "A-03", "A-04", "A-05", "A-10", "A-12", "A-15", "A-20", "A-24", "A-25"] },
      { id: "zone-b", name: "Zone B (Central Dome Dining)", tables: ["B-01", "B-02", "B-05", "B-08", "B-10", "B-12", "B-15", "B-20"] },
      { id: "zone-c", name: "Zone C (Terrace Sky Lounge)", tables: ["C-01", "C-02", "C-05", "C-08", "C-10", "C-12", "C-15"] }
    ],
    totalTables: 45,
    activeOutlets: 6,
    dailyVisitors: 12450
  },
  {
    id: "mall-1",
    name: "Phoenix Marketcity Food Hub",
    city: "Mumbai",
    location: "Level 2 & 3, Central Food Court, Kurla West",
    zones: [
      { id: "zone-north", name: "North Food Court", tables: ["A-01", "A-02", "A-10", "A-17", "A-24", "A-25", "A-28"] },
      { id: "zone-south", name: "South Atrium Lounge", tables: ["B-01", "B-05", "B-12", "B-15"] },
      { id: "zone-terrace", name: "Sky Garden Terrace", tables: ["C-01", "C-08", "C-12"] },
      { id: "zone-central", name: "Central Plaza Tables", tables: ["D-01", "D-04", "D-09"] }
    ],
    totalTables: 28,
    activeOutlets: 6,
    dailyVisitors: 8420
  },
  {
    id: "mall-dlf",
    name: "DLF Promenade Food Atrium",
    city: "New Delhi",
    location: "Level 2 Food Court, Vasant Kunj",
    zones: [
      { id: "zone-east", name: "East Wing Seating", tables: ["E-01", "E-05", "E-10", "E-14"] },
      { id: "zone-west", name: "West Wing Lounge", tables: ["W-02", "W-06", "W-12"] }
    ],
    totalTables: 22,
    activeOutlets: 6,
    dailyVisitors: 9800
  }
];

export const initialTables = [
  // Phoenix Mall Lucknow Tables (Feature 1 Demo Table A17)
  { id: "table-phx-lko-a17", number: "A17", mallId: "mall-phoenix-lko", zone: "Central Food Court", floor: "Floor 2", status: "Active", qrCode: "MALLBITE-PHOENIX-FLOOR2-TABLE-A17" },
  { id: "table-phx-lko-a12", number: "A12", mallId: "mall-phoenix-lko", zone: "Central Food Court", floor: "Floor 2", status: "Active", qrCode: "MALLBITE-PHOENIX-FLOOR2-TABLE-A12" },
  { id: "table-phx-lko-a24", number: "A24", mallId: "mall-phoenix-lko", zone: "Central Food Court", floor: "Floor 2", status: "Active", qrCode: "MALLBITE-PHOENIX-FLOOR2-TABLE-A24" },
  { id: "table-phx-lko-b05", number: "B05", mallId: "mall-phoenix-lko", zone: "East Dining Gallery", floor: "Floor 2", status: "Active", qrCode: "MALLBITE-PHOENIX-FLOOR2-TABLE-B05" },

  // City Center Mall Tables
  { id: "table-city-a12", number: "A-12", mallId: "mall-city", zone: "Zone A (North Food Atrium)", floor: "Level 3", status: "Active", qrCode: "MALLBITE-CITY-L3-A12" },
  { id: "table-city-a01", number: "A-01", mallId: "mall-city", zone: "Zone A (North Food Atrium)", floor: "Level 3", status: "Active", qrCode: "MALLBITE-CITY-L3-A01" },
  { id: "table-city-a17", number: "A17", mallId: "mall-city", zone: "Zone A (North Food Atrium)", floor: "Level 3", status: "Active", qrCode: "MALLBITE-CITY-L3-A17" },
  { id: "table-city-a24", number: "A-24", mallId: "mall-city", zone: "Zone A (North Food Atrium)", floor: "Level 3", status: "Active", qrCode: "MALLBITE-CITY-L3-A24" },
  { id: "table-city-b05", number: "B-05", mallId: "mall-city", zone: "Zone B (Central Dome Dining)", floor: "Level 3", status: "Active", qrCode: "MALLBITE-CITY-L3-B05" },

  // Phoenix Marketcity Mumbai Tables
  { id: "table-a17", number: "A17", mallId: "mall-1", zone: "North Food Court", floor: "Level 2", status: "Active", qrCode: "MALLBITE-PHX-L2-A17" },
  { id: "table-a24", number: "A-24", mallId: "mall-1", zone: "North Food Court", floor: "Level 2", status: "Active", qrCode: "MALLBITE-PHX-L2-A24" },
  { id: "table-a10", number: "A-10", mallId: "mall-1", zone: "North Food Court", floor: "Level 2", status: "Active", qrCode: "MALLBITE-PHX-L2-A10" }
];

export const initialCategories = [
  { id: "cat-burgers", name: "Burgers & Wraps", icon: "🍔", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop&q=80" },
  { id: "cat-pizza", name: "Pizzas", icon: "🍕", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&auto=format&fit=crop&q=80" },
  { id: "cat-south", name: "South Indian", icon: "🥞", image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400&auto=format&fit=crop&q=80" },
  { id: "cat-biryani", name: "Biryani & North Indian", icon: "🍛", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&auto=format&fit=crop&q=80" },
  { id: "cat-beverages", name: "Beverages & Shakes", icon: "🥤", image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=400&auto=format&fit=crop&q=80" },
  { id: "cat-dessert", name: "Desserts & Waffles", icon: "🍰", image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&auto=format&fit=crop&q=80" }
];

export const initialRestaurants = [
  {
    id: "rest-pizza",
    name: "Pizza Corner",
    tagline: "Fresh hand-tossed crust, rich marinara & melted mozzarella",
    category: "Pizzas • Italian • Garlic Breads",
    rating: 4.7,
    reviewsCount: 1180,
    prepTime: "7-14 mins",
    avgPrepMinutes: 7,
    activeStaff: 3,
    currentQueueOrders: 3, // 🟢 Fast queue for demo sync
    priceForTwo: "₹400",
    counterNumber: "FC-02 (Counter 2)",
    floor: "Level 2 Food Court",
    isVegOnly: false,
    offerTag: "COMBO: PIZZA + DRINK ₹249",
    bannerImage: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80",
    logoImage: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=200&auto=format&fit=crop&q=80",
    status: "Open",
    todayOrders: 154,
    todayRevenue: 58900
  },
  {
    id: "rest-burger",
    name: "Burger House",
    tagline: "Flame-grilled smash burgers, loaded paneer wraps & seasoned crinkle fries",
    category: "Burgers • Fast Food • Wraps",
    rating: 4.6,
    reviewsCount: 920,
    prepTime: "12-15 mins",
    avgPrepMinutes: 9,
    activeStaff: 3,
    currentQueueOrders: 7, // 🟡 Moderate queue
    priceForTwo: "₹350",
    counterNumber: "FC-04 (Counter 4)",
    floor: "Level 2 Food Court",
    isVegOnly: false,
    offerTag: "BURGER MEAL AT ₹199",
    bannerImage: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop&q=80",
    logoImage: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&auto=format&fit=crop&q=80",
    status: "Open",
    todayOrders: 142,
    todayRevenue: 47600
  },
  {
    id: "rest-wok",
    name: "Wok Express",
    tagline: "Sizzling Asian wok bowls, hakka noodles & fresh chicken stir-fries",
    category: "Asian • Bowls • Noodles • Stir-Fry",
    rating: 4.8,
    reviewsCount: 860,
    prepTime: "10-12 mins",
    avgPrepMinutes: 8,
    activeStaff: 3,
    currentQueueOrders: 5, // 🟡 Synchronized queue
    priceForTwo: "₹420",
    counterNumber: "FC-05 (Counter 5)",
    floor: "Level 2 Food Court",
    isVegOnly: false,
    offerTag: "WOK BOWL COMBO ₹299",
    bannerImage: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=800&auto=format&fit=crop&q=80",
    logoImage: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=200&auto=format&fit=crop&q=80",
    status: "Open",
    todayOrders: 128,
    todayRevenue: 43200
  },
  {
    id: "rest-south",
    name: "South Kitchen",
    tagline: "Crispy golden ghee roast dosas, fluffy idlis & authentic filter coffee",
    category: "South Indian • Traditional • Pure Veg",
    rating: 4.8,
    reviewsCount: 1420,
    prepTime: "7-10 mins",
    avgPrepMinutes: 8,
    activeStaff: 3,
    currentQueueOrders: 6, // 🟢 Low Queue demo baseline
    priceForTwo: "₹250",
    counterNumber: "FC-03 (Counter 3)",
    floor: "Level 2 Food Court",
    isVegOnly: true,
    offerTag: "SPECIAL: DOSA COMBO ₹149",
    bannerImage: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800&auto=format&fit=crop&q=80",
    logoImage: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=200&auto=format&fit=crop&q=80",
    status: "Open",
    todayOrders: 188,
    todayRevenue: 46200
  },
    logoImage: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&auto=format&fit=crop&q=80",
    status: "Open",
    todayOrders: 142,
    todayRevenue: 47600
  },
  {
    id: "rest-juice",
    name: "Juice Bar",
    tagline: "Cold pressed real fruit juices, thick shakes & artisanal cold brews",
    category: "Beverages • Smoothies • Shakes",
    rating: 4.8,
    reviewsCount: 860,
    prepTime: "4-6 mins",
    avgPrepMinutes: 5,
    activeStaff: 2,
    currentQueueOrders: 4, // 🟢 Low Queue
    priceForTwo: "₹200",
    counterNumber: "FC-01 (Counter 1)",
    floor: "Level 2 Food Court",
    isVegOnly: true,
    offerTag: "ANY 2 SHAKES AT ₹159",
    bannerImage: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=800&auto=format&fit=crop&q=80",
    logoImage: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=200&auto=format&fit=crop&q=80",
    status: "Open",
    todayOrders: 165,
    todayRevenue: 29400
  },
  {
    id: "rest-spice",
    name: "Spice Route",
    tagline: "Hyderabadi dum biryani, velvety paneer butter masala & tandoori platters",
    category: "Biryani • North Indian • Thali",
    rating: 4.5,
    reviewsCount: 980,
    prepTime: "14-16 mins",
    avgPrepMinutes: 14,
    activeStaff: 4,
    currentQueueOrders: 11,
    priceForTwo: "₹450",
    counterNumber: "FC-05 (Counter 5)",
    floor: "Level 2 Food Court",
    isVegOnly: false,
    offerTag: "SPECIAL DUM BIRYANI THALI ₹219",
    bannerImage: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&auto=format&fit=crop&q=80",
    logoImage: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200&auto=format&fit=crop&q=80",
    status: "Open",
    todayOrders: 122,
    todayRevenue: 51200
  },
  {
    id: "rest-dessert",
    name: "Dessert Lab",
    tagline: "Warm Belgian waffles, rich hot chocolate fudge & waffle sundaes",
    category: "Desserts • Waffles • Ice Cream",
    rating: 4.9,
    reviewsCount: 1350,
    prepTime: "6-8 mins",
    avgPrepMinutes: 7,
    activeStaff: 2,
    currentQueueOrders: 5,
    priceForTwo: "₹300",
    counterNumber: "FC-06 (Counter 6)",
    floor: "Level 2 Food Court",
    isVegOnly: true,
    offerTag: "FLAT 20% OFF SUNDAES",
    bannerImage: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80",
    logoImage: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=200&auto=format&fit=crop&q=80",
    status: "Open",
    todayOrders: 94,
    todayRevenue: 24800
  }
];

export const initialMenuItems = [
  // Pizza Corner (rest-pizza)
  {
    id: "item-p-jain",
    restaurantId: "rest-pizza",
    restaurantName: "Pizza Corner",
    name: "Jain Pizza",
    description: "Authentic hand-stretched crust topped with fresh tomato basil sauce, diced bell peppers, sweet corn & 100% mozzarella. No onion, no garlic.",
    price: 179,
    prepTimeNum: 7,
    prepTime: "7 mins",
    isVeg: true,
    isJain: true,
    category: "Pizzas",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.8,
    ordersCount: 920,
    badge: "Jain Certified"
  },
  {
    id: "item-p1",
    restaurantId: "rest-pizza",
    restaurantName: "Pizza Corner",
    name: "Farmhouse Pizza",
    description: "Handcrafted 8-inch crust with diced bell peppers, red onions, mushrooms, juicy tomatoes & mozzarella.",
    price: 199,
    prepTimeNum: 14,
    prepTime: "14 mins",
    isVeg: true,
    isJain: false,
    category: "Pizzas",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.6,
    ordersCount: 840,
    badge: "Food Court Bestseller"
  },
  {
    id: "item-p2",
    restaurantId: "rest-pizza",
    restaurantName: "Pizza Corner",
    name: "Paneer Tikka Woodfired Pizza",
    description: "Tandoori marinated paneer cubes, capsicum, red paprika, mozzarella and spicy house makhani drizzle.",
    price: 249,
    prepTimeNum: 15,
    prepTime: "15 mins",
    isVeg: true,
    isJain: false,
    category: "Pizzas",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.8,
    ordersCount: 620,
    badge: "Chef's Special"
  },
  {
    id: "item-p3",
    restaurantId: "rest-pizza",
    restaurantName: "Pizza Corner",
    name: "Stuffed Garlic Breadsticks",
    description: "Freshly baked herb garlic bread filled with melted mozzarella, sweet corn & jalapenos with cheesy dip.",
    price: 119,
    prepTimeNum: 8,
    prepTime: "8 mins",
    isVeg: true,
    isJain: false,
    category: "Sides & Breads",
    image: "https://images.unsplash.com/photo-1619895092538-128341789043?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.7,
    ordersCount: 450,
    badge: "Must Try"
  },

  // Burger House (rest-burger)
  {
    id: "item-b-veg",
    restaurantId: "rest-burger",
    restaurantName: "Burger House",
    name: "Veg Burger",
    description: "Crispy seasoned vegetable patty, fresh lettuce, sliced tomatoes, creamy house relish in toasted brioche bun.",
    price: 149,
    prepTimeNum: 9,
    prepTime: "9 mins",
    isVeg: true,
    isJain: false,
    category: "Burgers & Wraps",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.8,
    ordersCount: 1420,
    badge: "Top Choice"
  },
  {
    id: "item-b-wrap",
    restaurantId: "rest-burger",
    restaurantName: "Burger House",
    name: "Paneer Wrap",
    description: "Char-grilled cottage cheese cubes, bell peppers, crunchy onions, and mint yogurt mayo rolled in warm layered paratha.",
    price: 129,
    prepTimeNum: 8,
    prepTime: "8 mins",
    isVeg: true,
    isJain: false,
    category: "Burgers & Wraps",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.7,
    ordersCount: 960,
    badge: "Top AI Match"
  },
  {
    id: "item-b-chicken",
    restaurantId: "rest-burger",
    restaurantName: "Burger House",
    name: "Crispy Chicken Burger",
    description: "Succulent golden-fried spiced chicken breast fillet with iceberg lettuce and smoked pepper aioli.",
    price: 179,
    prepTimeNum: 10,
    prepTime: "10 mins",
    isVeg: false,
    isJain: false,
    category: "Burgers & Wraps",
    image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.8,
    ordersCount: 880,
    badge: "Crispy Non-Veg"
  },

  // Wok Express (rest-wok)
  {
    id: "item-w-chicken",
    restaurantId: "rest-wok",
    restaurantName: "Wok Express",
    name: "Chicken Bowl",
    description: "Tender wok-tossed chicken strips, crisp broccoli, snap peas, and teriyaki glaze over steaming jasmine rice.",
    price: 229,
    prepTimeNum: 12,
    prepTime: "12 mins",
    isVeg: false,
    isJain: false,
    category: "Asian & Bowls",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.9,
    ordersCount: 1100,
    badge: "Chef's Signature"
  },
  {
    id: "item-w-noodles",
    restaurantId: "rest-wok",
    restaurantName: "Wok Express",
    name: "Veg Hakka Noodles Bowl",
    description: "Wok-seared thin noodles with spring onions, shredded carrots, capsicum in savory oriental garlic sauce.",
    price: 129,
    prepTimeNum: 10,
    prepTime: "10 mins",
    isVeg: true,
    isJain: false,
    category: "Asian & Bowls",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.7,
    ordersCount: 940,
    badge: "Quick Bite"
  },
  {
    id: "item-w-jain",
    restaurantId: "rest-wok",
    restaurantName: "Wok Express",
    name: "Jain Veg Fried Rice Bowl",
    description: "Aromatic basmati rice stir-fried with green beans, sweet corn, green peas, and soy-ginger seasoning. No onion, no garlic.",
    price: 149,
    prepTimeNum: 9,
    prepTime: "9 mins",
    isVeg: true,
    isJain: true,
    category: "Asian & Bowls",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.6,
    ordersCount: 520,
    badge: "Jain Friendly"
  },

  // South Kitchen (rest-south)
  {
    id: "item-s1",
    restaurantId: "rest-south",
    restaurantName: "South Kitchen",
    name: "Crispy Masala Dosa",
    description: "Golden crispy fermented rice crepe folded with spiced potato masala, served with 3 chutneys and hot sambar.",
    price: 129,
    prepTimeNum: 9,
    prepTime: "9 mins",
    isVeg: true,
    category: "South Indian",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.8,
    ordersCount: 1250,
    badge: "Bestseller"
  },
  {
    id: "item-s2",
    restaurantId: "rest-south",
    restaurantName: "South Kitchen",
    name: "Steamed Idli & Medu Vada Combo",
    description: "Two pillow-soft steamed idlis paired with one crunchy golden medu vada, served with coconut chutney & piping hot sambar.",
    price: 99,
    prepTimeNum: 6,
    prepTime: "6 mins",
    isVeg: true,
    category: "South Indian",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.7,
    ordersCount: 780,
    badge: "Quick Bite"
  },
  {
    id: "item-s3",
    restaurantId: "rest-south",
    restaurantName: "South Kitchen",
    name: "Mysore Onion Rava Dosa",
    description: "Semolina and rice flour lattice crepe roasted in pure ghee, laced with caramelized onions, green chilies and ginger.",
    price: 149,
    prepTimeNum: 11,
    prepTime: "11 mins",
    isVeg: true,
    category: "South Indian",
    image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.6,
    ordersCount: 510,
    badge: "Top Rated"
  },
  {
    id: "item-s4",
    restaurantId: "rest-south",
    restaurantName: "South Kitchen",
    name: "Authentic Madras Filter Coffee",
    description: "Freshly brewed chicory coffee decoction frothed with boiled whole milk in traditional brass dabarah.",
    price: 49,
    prepTimeNum: 3,
    prepTime: "3 mins",
    isVeg: true,
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.9,
    ordersCount: 1120,
    badge: "Heritage"
  },

  // Food Corner (rest-burger)
  {
    id: "item-b1",
    restaurantId: "rest-burger",
    restaurantName: "Food Corner",
    name: "Spiced Paneer Tikka Wrap",
    description: "Char-grilled cottage cheese cubes, bell peppers, crunchy onions, and mint yogurt mayo rolled in warm layered paratha.",
    price: 149,
    prepTimeNum: 8,
    prepTime: "8 mins",
    isVeg: true,
    category: "Burgers & Wraps",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.7,
    ordersCount: 960,
    badge: "Top AI Match"
  },
  {
    id: "item-b2",
    restaurantId: "rest-burger",
    restaurantName: "Food Corner",
    name: "Crispy Veg Burger Combo",
    description: "Crunchy herb potato patty with cheddar cheese & secret relish, accompanied by peri peri crinkle fries and coke.",
    price: 199,
    prepTimeNum: 10,
    prepTime: "10 mins",
    isVeg: true,
    category: "Burgers & Wraps",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.6,
    ordersCount: 890,
    badge: "Combo Deal"
  },
  {
    id: "item-b3",
    restaurantId: "rest-burger",
    restaurantName: "Food Corner",
    name: "Crunchy Veggie Delight Burger",
    description: "Fresh vegetable patty with thousand island sauce, crisp iceberg lettuce and sliced red onions in toasted sesame bun.",
    price: 159,
    prepTimeNum: 7,
    prepTime: "7 mins",
    isVeg: true,
    category: "Burgers & Wraps",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.5,
    ordersCount: 670,
    badge: "Popular"
  },
  {
    id: "item-b4",
    restaurantId: "rest-burger",
    restaurantName: "Food Corner",
    name: "Peri Peri Crinkle Cut Fries",
    description: "Golden crinkle cut french fries tossed in African peri peri seasoning, served with creamy garlic dip.",
    price: 89,
    prepTimeNum: 5,
    prepTime: "5 mins",
    isVeg: true,
    category: "Sides & Dips",
    image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.7,
    ordersCount: 540,
    badge: "Add-on"
  },

  // Juice Bar (rest-juice)
  {
    id: "item-j1",
    restaurantId: "rest-juice",
    restaurantName: "Juice Bar",
    name: "Rich Alphonso Mango Shake",
    description: "Pure Ratnagiri Alphonso mango pulp blended with rich condensed milk, garnished with pistachio slivers.",
    price: 89,
    prepTimeNum: 4,
    prepTime: "4 mins",
    isVeg: true,
    category: "Beverages & Shakes",
    image: "https://images.unsplash.com/photo-1546173159-315724a31696?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.8,
    ordersCount: 1140,
    badge: "Seasonal Favorite"
  },
  {
    id: "item-j2",
    restaurantId: "rest-juice",
    restaurantName: "Juice Bar",
    name: "Classic Frappe Cold Coffee",
    description: "Double espresso shot blended with vanilla cream, whole milk and ice, topped with cocoa powder.",
    price: 99,
    prepTimeNum: 4,
    prepTime: "4 mins",
    isVeg: true,
    category: "Beverages & Shakes",
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.8,
    ordersCount: 920,
    badge: "All-Time Best"
  },
  {
    id: "item-j3",
    restaurantId: "rest-juice",
    restaurantName: "Juice Bar",
    name: "Fresh Watermelon Mint Refresher",
    description: "Cold-pressed fresh watermelon juice infused with garden mint, rock salt and lime. No added sugar.",
    price: 79,
    prepTimeNum: 3,
    prepTime: "3 mins",
    isVeg: true,
    category: "Beverages & Shakes",
    image: "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.6,
    ordersCount: 460,
    badge: "Hydration"
  },

  // Spice Route (rest-spice)
  {
    id: "item-sp1",
    restaurantId: "rest-spice",
    restaurantName: "Spice Route",
    name: "Hyderabadi Dum Paneer Biryani",
    description: "Long grain basmati rice slow-cooked in handi with marinated paneer, saffron, caramelized onions and aromatic spices, served with burani raita.",
    price: 219,
    prepTimeNum: 14,
    prepTime: "14 mins",
    isVeg: true,
    category: "Biryani & North Indian",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.7,
    ordersCount: 890,
    badge: "Royal Thali"
  },
  {
    id: "item-sp2",
    restaurantId: "rest-spice",
    restaurantName: "Spice Route",
    name: "Paneer Butter Masala Combo",
    description: "Soft cottage cheese simmered in buttery tomato-cashew gravy, served with 2 butter naans, jeera rice and gulab jamun.",
    price: 229,
    prepTimeNum: 13,
    prepTime: "13 mins",
    isVeg: true,
    category: "Biryani & North Indian",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.8,
    ordersCount: 740,
    badge: "Comfort Thali"
  },

  // Dessert Lab (rest-dessert)
  {
    id: "item-d1",
    restaurantId: "rest-dessert",
    restaurantName: "Dessert Lab",
    name: "Belgian Dark Chocolate Waffle",
    description: "Crisp golden Belgian waffle smothered in melted Belgian milk & dark chocolate ganache, topped with chocolate chips.",
    price: 159,
    prepTimeNum: 7,
    prepTime: "7 mins",
    isVeg: true,
    category: "Desserts & Waffles",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.9,
    ordersCount: 1080,
    badge: "Sweet Tooth"
  }
];

export const initialCoupons = [
  { code: "MALLBITE50", discountType: "fixed", value: 50, minOrder: 250, description: "Flat ₹50 OFF on multi-outlet orders above ₹250" },
  { code: "FESTIVE100", discountType: "fixed", value: 100, minOrder: 499, description: "Festive ₹100 OFF on group orders above ₹499" },
  { code: "FOODCOURT20", discountType: "percentage", value: 20, minOrder: 300, maxDiscount: 80, description: "20% OFF upto ₹80" }
];

export const initialHeatmap = [
  { zone: "North Food Court (Zone A)", tablesCount: 15, occupiedCount: 13, occupancyPercent: 86.6, activeRevenue: "₹38,400", avgWait: "11 min" },
  { zone: "Central Food Court (Zone B)", tablesCount: 12, occupiedCount: 10, occupancyPercent: 83.3, activeRevenue: "₹29,800", avgWait: "12 min" },
  { zone: "Sky Garden Terrace (Zone C)", tablesCount: 9, occupiedCount: 5, occupancyPercent: 55.5, activeRevenue: "₹14,200", avgWait: "8 min" }
];

export const initialOrders = [
  {
    id: "MB1042",
    tableNumber: "A17",
    tableName: "Table A17 (Central Food Court)",
    mallName: "Phoenix Mall Lucknow",
    customerName: "Aarav Sharma",
    customerPhone: "+91 98765 43210",
    subtotal: 417,
    convenienceFee: 10,
    gstTaxes: 21,
    discount: 50,
    totalAmount: 398,
    paymentStatus: "Paid (UPI Verified)",
    paymentMethod: "UPI",
    orderStatus: "Preparing",
    createdAt: new Date(Date.now() - 6 * 60000).toISOString(),
    estimatedDeliveryTime: "8-12 mins",
    deliveryStaff: "Rohan Verma (Runner #1)",
    deliveryStaffPhone: "+91 98765 11223",
    deliveryStatus: "Assigned",
    subOrders: [
      {
        id: "P-402",
        masterOrderId: "MB1042",
        restaurantId: "rest-pizza",
        restaurantName: "Pizza Hub",
        counterNumber: "FC-02",
        status: "Preparing",
        estimatedTime: "18 mins",
        statusTimeline: [
          { status: "Order Received", time: "19:22", done: true },
          { status: "Preparing", time: "19:24", done: true },
          { status: "Ready for Pickup", time: null, done: false }
        ],
        items: [
          { id: "item-p1", name: "Farmhouse Veggie Supreme Pizza", price: 199, quantity: 1, isVeg: true }
        ]
      },
      {
        id: "S-108",
        masterOrderId: "MB1042",
        restaurantId: "rest-south",
        restaurantName: "South Kitchen",
        counterNumber: "FC-03",
        status: "Preparing",
        estimatedTime: "9 mins",
        statusTimeline: [
          { status: "Order Received", time: "19:22", done: true },
          { status: "Preparing", time: "19:23", done: true },
          { status: "Ready for Pickup", time: null, done: false }
        ],
        items: [
          { id: "item-s1", name: "Crispy Masala Dosa", price: 129, quantity: 1, isVeg: true }
        ]
      },
      {
        id: "J-305",
        masterOrderId: "MB1042",
        restaurantId: "rest-juice",
        restaurantName: "Juice Bar",
        counterNumber: "FC-01",
        status: "Ready for Pickup",
        estimatedTime: "4 mins",
        statusTimeline: [
          { status: "Order Received", time: "19:22", done: true },
          { status: "Preparing", time: "19:23", done: true },
          { status: "Ready for Pickup", time: "19:26", done: true }
        ],
        items: [
          { id: "item-j1", name: "Rich Alphonso Mango Shake", price: 89, quantity: 1, isVeg: true }
        ]
      }
    ]
  }
];
