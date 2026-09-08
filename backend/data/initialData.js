export const initialMalls = [
  {
    id: "mall-1",
    name: "Phoenix Marketcity Food Hub",
    city: "Mumbai",
    location: "Level 2 & 3, Central Food Court, Kurla West",
    zones: [
      { id: "zone-north", name: "North Food Court", tables: ["A-01", "A-02", "A-10", "A-24", "A-25", "A-28"] },
      { id: "zone-south", name: "South Atrium Lounge", tables: ["B-01", "B-05", "B-12", "B-15"] },
      { id: "zone-terrace", name: "Sky Garden Terrace", tables: ["C-01", "C-08", "C-12"] },
      { id: "zone-central", name: "Central Plaza Tables", tables: ["D-01", "D-04", "D-09"] }
    ],
    totalTables: 24,
    activeOutlets: 6,
    dailyVisitors: 8420
  }
];

export const initialTables = [
  { id: "table-a24", number: "A-24", mallId: "mall-1", zone: "North Food Court", floor: "Level 2", status: "Active", qrCode: "MALLBITE-PHX-L2-A24" },
  { id: "table-a10", number: "A-10", mallId: "mall-1", zone: "North Food Court", floor: "Level 2", status: "Active", qrCode: "MALLBITE-PHX-L2-A10" },
  { id: "table-a01", number: "A-01", mallId: "mall-1", zone: "North Food Court", floor: "Level 2", status: "Active", qrCode: "MALLBITE-PHX-L2-A01" },
  { id: "table-b05", number: "B-05", mallId: "mall-1", zone: "South Atrium Lounge", floor: "Level 2", status: "Active", qrCode: "MALLBITE-PHX-L2-B05" },
  { id: "table-b12", number: "B-12", mallId: "mall-1", zone: "South Atrium Lounge", floor: "Level 2", status: "Active", qrCode: "MALLBITE-PHX-L2-B12" },
  { id: "table-c12", number: "C-12", mallId: "mall-1", zone: "Sky Garden Terrace", floor: "Level 3", status: "Active", qrCode: "MALLBITE-PHX-L3-C12" },
  { id: "table-d04", number: "D-04", mallId: "mall-1", zone: "Central Plaza Tables", floor: "Level 2", status: "Active", qrCode: "MALLBITE-PHX-L2-D04" }
];

export const initialCategories = [
  { id: "cat-burgers", name: "Burgers", icon: "🍔", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop&q=80" },
  { id: "cat-pizza", name: "Pizzas", icon: "🍕", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&auto=format&fit=crop&q=80" },
  { id: "cat-biryani", name: "Biryani & North Indian", icon: "🍛", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&auto=format&fit=crop&q=80" },
  { id: "cat-chinese", name: "Chinese & Momos", icon: "🍜", image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=400&auto=format&fit=crop&q=80" },
  { id: "cat-coffee", name: "Coffee & Shakes", icon: "☕", image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=400&auto=format&fit=crop&q=80" },
  { id: "cat-dessert", name: "Desserts & Waffles", icon: "🍰", image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&auto=format&fit=crop&q=80" },
  { id: "cat-healthy", name: "Salads & Bowls", icon: "🥗", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&auto=format&fit=crop&q=80" }
];

export const initialRestaurants = [
  {
    id: "rest-1",
    name: "Burger House",
    tagline: "Flame-grilled smash burgers & crisp crinkle fries",
    category: "Burgers • Fast Food • American",
    rating: 4.6,
    reviewsCount: 840,
    prepTime: "12-15 mins",
    priceForTwo: "₹350",
    counterNumber: "FC-04 (Counter 4)",
    floor: "Level 2 Food Court",
    isVegOnly: false,
    offerTag: "20% OFF UPTO ₹100",
    bannerImage: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop&q=80",
    logoImage: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&auto=format&fit=crop&q=80",
    status: "Open",
    todayOrders: 128,
    todayRevenue: 42850
  },
  {
    id: "rest-2",
    name: "Pizza Corner",
    tagline: "Authentic woodfired Neapolitan crust & melting mozzarella",
    category: "Pizzas • Italian • Garlic Breads",
    rating: 4.7,
    reviewsCount: 1120,
    prepTime: "15-20 mins",
    priceForTwo: "₹500",
    counterNumber: "FC-02 (Counter 2)",
    floor: "Level 2 Food Court",
    isVegOnly: false,
    offerTag: "BUY 1 GET 1 ON MEDIUM",
    bannerImage: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80",
    logoImage: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=200&auto=format&fit=crop&q=80",
    status: "Open",
    todayOrders: 145,
    todayRevenue: 56200
  },
  {
    id: "rest-3",
    name: "Spice Route",
    tagline: "Royal Dum Biryani, velvety butter chicken & tandoori platters",
    category: "Biryani • North Indian • Mughlai",
    rating: 4.5,
    reviewsCount: 960,
    prepTime: "15-18 mins",
    priceForTwo: "₹450",
    counterNumber: "FC-06 (Counter 6)",
    floor: "Level 2 Food Court",
    isVegOnly: false,
    offerTag: "₹135 OFF ABOVE ₹199",
    bannerImage: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&auto=format&fit=crop&q=80",
    logoImage: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200&auto=format&fit=crop&q=80",
    status: "Open",
    todayOrders: 110,
    todayRevenue: 48900
  },
  {
    id: "rest-4",
    name: "Coffee Culture",
    tagline: "Artisanal brews, rich cold coffees, frappes & butter croissants",
    category: "Coffee • Cafe • Beverages • Pastries",
    rating: 4.8,
    reviewsCount: 750,
    prepTime: "5-10 mins",
    priceForTwo: "₹300",
    counterNumber: "FC-01 (Counter 1)",
    floor: "Level 2 Food Court",
    isVegOnly: true,
    offerTag: "FLAT ₹50 OFF COMBO",
    bannerImage: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80",
    logoImage: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=200&auto=format&fit=crop&q=80",
    status: "Open",
    todayOrders: 98,
    todayRevenue: 24500
  },
  {
    id: "rest-5",
    name: "Wok Express",
    tagline: "Steamy dim sums, fiery Schezwan noodles & crunchy spring rolls",
    category: "Chinese • Asian • Dimsums • Noodles",
    rating: 4.4,
    reviewsCount: 680,
    prepTime: "12-15 mins",
    priceForTwo: "₹380",
    counterNumber: "FC-05 (Counter 5)",
    floor: "Level 2 Food Court",
    isVegOnly: false,
    offerTag: "70% OFF UPTO ₹140",
    bannerImage: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=800&auto=format&fit=crop&q=80",
    logoImage: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=200&auto=format&fit=crop&q=80",
    status: "Open",
    todayOrders: 82,
    todayRevenue: 31200
  },
  {
    id: "rest-6",
    name: "Dessert Lab",
    tagline: "Belgian chocolate waffles, artisanal sundaes & molten lava cakes",
    category: "Desserts • Waffles • Ice Cream",
    rating: 4.9,
    reviewsCount: 1420,
    prepTime: "8-12 mins",
    priceForTwo: "₹300",
    counterNumber: "FC-03 (Counter 3)",
    floor: "Level 2 Food Court",
    isVegOnly: true,
    offerTag: "FREE SUNDAE WITH 2 WAFFLES",
    bannerImage: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80",
    logoImage: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=200&auto=format&fit=crop&q=80",
    status: "Open",
    todayOrders: 104,
    todayRevenue: 28600
  }
];

export const initialMenuItems = [
  // Burger House
  {
    id: "item-101",
    restaurantId: "rest-1",
    restaurantName: "Burger House",
    name: "Classic Veg Crunch Burger",
    description: "Crispy herb potato patty, cheddar cheese slice, fresh lettuce, sliced tomatoes, secret house burger relish.",
    price: 149,
    isVeg: true,
    category: "Popular Burgers",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.6,
    ordersCount: 540,
    badge: "Bestseller"
  },
  {
    id: "item-102",
    restaurantId: "rest-1",
    restaurantName: "Burger House",
    name: "Peri Peri Crinkle Fries",
    description: "Golden crisp crinkle cut potato fries tossed in fiery African peri peri seasoning and served with garlic dip.",
    price: 79,
    isVeg: true,
    category: "Sides & Dips",
    image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.7,
    ordersCount: 420,
    badge: "Must Try"
  },
  {
    id: "item-103",
    restaurantId: "rest-1",
    restaurantName: "Burger House",
    name: "Smoky BBQ Grilled Chicken Burger",
    description: "Juicy flame-grilled chicken breast, hickory BBQ glaze, caramelized onions, smoked cheese and crisp iceberg lettuce.",
    price: 219,
    isVeg: false,
    category: "Gourmet Burgers",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.8,
    ordersCount: 380,
    badge: "Chef Special"
  },
  {
    id: "item-104",
    restaurantId: "rest-1",
    restaurantName: "Burger House",
    name: "Crispy Chicken Tenders (4 Pcs)",
    description: "Tender chicken fillets crumbed in spiced batter, served with spicy mayo and honey mustard dip.",
    price: 169,
    isVeg: false,
    category: "Sides & Dips",
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.5,
    ordersCount: 290
  },
  {
    id: "item-105",
    restaurantId: "rest-1",
    restaurantName: "Burger House",
    name: "Cheesy Jalapeno Poppers",
    description: "Melted cheddar & mozzarella stuffed in crispy panko jalapeno bites.",
    price: 119,
    isVeg: true,
    category: "Sides & Dips",
    image: "https://images.unsplash.com/photo-1548946526-f69e2424cf45?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.4,
    ordersCount: 195
  },

  // Pizza Corner
  {
    id: "item-201",
    restaurantId: "rest-2",
    restaurantName: "Pizza Corner",
    name: "Farmhouse Veggie Supreme Pizza",
    description: "Fresh bell peppers, red onions, mushrooms, black olives, sweet corn, melted mozzarella on hand-stretched sourdough.",
    price: 299,
    isVeg: true,
    category: "Woodfired Pizzas",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.8,
    ordersCount: 610,
    badge: "Bestseller"
  },
  {
    id: "item-202",
    restaurantId: "rest-2",
    restaurantName: "Pizza Corner",
    name: "Margherita Basilico Pizza",
    description: "San Marzano tomato sauce, fresh buffalo mozzarella, aromatic basil leaves, extra virgin olive oil.",
    price: 249,
    isVeg: true,
    category: "Woodfired Pizzas",
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.6,
    ordersCount: 390
  },
  {
    id: "item-203",
    restaurantId: "rest-2",
    restaurantName: "Pizza Corner",
    name: "Stuffed Cheesy Garlic Breadsticks",
    description: "Freshly baked artisan bread filled with mozzarella, herbs and roasted garlic butter, with salsa dip.",
    price: 139,
    isVeg: true,
    category: "Sides & Pasta",
    image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.7,
    ordersCount: 520,
    badge: "Must Try"
  },
  {
    id: "item-204",
    restaurantId: "rest-2",
    restaurantName: "Pizza Corner",
    name: "Spicy Pepperoni & Jalapeno Pizza",
    description: "Classic smoked pepperoni slices, pickled spicy jalapenos, fiery red chili flakes & stringy mozzarella cheese.",
    price: 389,
    isVeg: false,
    category: "Woodfired Pizzas",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.9,
    ordersCount: 440,
    badge: "Chef Special"
  },
  {
    id: "item-205",
    restaurantId: "rest-2",
    restaurantName: "Pizza Corner",
    name: "Creamy Alfredo Penne Pasta",
    description: "Penne tossed in slow-cooked parmesan garlic cream sauce with butter-sautéed mushrooms.",
    price: 229,
    isVeg: true,
    category: "Sides & Pasta",
    image: "https://images.unsplash.com/photo-1621996346565-e3d5d6281e04?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.5,
    ordersCount: 230
  },

  // Spice Route
  {
    id: "item-301",
    restaurantId: "rest-3",
    restaurantName: "Spice Route",
    name: "Hyderabadi Chicken Dum Biryani",
    description: "Fragrant long-grain basmati rice layered with succulent marinated chicken, saffron, mint and fried onions. Served with spiced salan & cooling boondi raita.",
    price: 289,
    isVeg: false,
    category: "Royal Biryani",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.8,
    ordersCount: 820,
    badge: "Bestseller"
  },
  {
    id: "item-302",
    restaurantId: "rest-3",
    restaurantName: "Spice Route",
    name: "Royal Paneer Makhani Bowl with Butter Naan",
    description: "Silky tomato cashew gravy infused with kasuri methi and fresh cottage cheese cubes, served with 2 flaky butter naans.",
    price: 249,
    isVeg: true,
    category: "Curries & Platters",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.7,
    ordersCount: 460
  },
  {
    id: "item-303",
    restaurantId: "rest-3",
    restaurantName: "Spice Route",
    name: "Dilli Wali Butter Chicken Bowl",
    description: "Tandoori chicken tikka simmered in creamy makhani gravy, served with aromatic jeera rice.",
    price: 279,
    isVeg: false,
    category: "Curries & Platters",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.9,
    ordersCount: 710,
    badge: "Signature"
  },
  {
    id: "item-304",
    restaurantId: "rest-3",
    restaurantName: "Spice Route",
    name: "Awadhi Veg Biryani Handi",
    description: "Assorted vegetables, soya chaap, aromatic whole spices cooked in dum handi with basmati rice.",
    price: 219,
    isVeg: true,
    category: "Royal Biryani",
    image: "https://images.unsplash.com/photo-1642821373181-696a54913e93?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.4,
    ordersCount: 310
  },

  // Coffee Culture
  {
    id: "item-401",
    restaurantId: "rest-4",
    restaurantName: "Coffee Culture",
    name: "Signature Iced Cold Coffee",
    description: "Double shot espresso blended with chilled creamy milk, chocolate drizzle and vanilla ice cream scoop.",
    price: 129,
    isVeg: true,
    category: "Cold Brews & Shakes",
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.9,
    ordersCount: 680,
    badge: "Bestseller"
  },
  {
    id: "item-402",
    restaurantId: "rest-4",
    restaurantName: "Coffee Culture",
    name: "Hazelnut Caramel Frappe",
    description: "Rich espresso, roasted hazelnut syrup, whipped cream, crushed praline and golden caramel swirl.",
    price: 169,
    isVeg: true,
    category: "Cold Brews & Shakes",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.7,
    ordersCount: 390,
    badge: "Popular"
  },
  {
    id: "item-403",
    restaurantId: "rest-4",
    restaurantName: "Coffee Culture",
    name: "Butter Croissant & Espresso Combo",
    description: "Flaky golden Parisian all-butter croissant served warm with single shot artisanal Arabica espresso.",
    price: 179,
    isVeg: true,
    category: "Hot Coffees & Bakes",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.8,
    ordersCount: 290
  },
  {
    id: "item-404",
    restaurantId: "rest-4",
    restaurantName: "Coffee Culture",
    name: "Classic Hot Cappuccino",
    description: "Velvety micro-foamed steamed milk poured over rich single estate espresso with cocoa dust.",
    price: 119,
    isVeg: true,
    category: "Hot Coffees & Bakes",
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.6,
    ordersCount: 340
  },

  // Wok Express
  {
    id: "item-501",
    restaurantId: "rest-5",
    restaurantName: "Wok Express",
    name: "Steamed Veg Dimsums (6 Pcs)",
    description: "Delicate crystal wrappers filled with water chestnuts, bok choy, scallions and shiitake, served with fiery red chili oil dip.",
    price: 169,
    isVeg: true,
    category: "Dimsums & Starters",
    image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.7,
    ordersCount: 450,
    badge: "Bestseller"
  },
  {
    id: "item-502",
    restaurantId: "rest-5",
    restaurantName: "Wok Express",
    name: "Desi Veg Hakka Noodles Box",
    description: "Wok-tossed thin noodles with crunchy cabbage, capsicum, carrots, spring onions and fragrant soy garlic seasoning.",
    price: 179,
    isVeg: true,
    category: "Wok Bowls & Mains",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.6,
    ordersCount: 520
  },
  {
    id: "item-503",
    restaurantId: "rest-5",
    restaurantName: "Wok Express",
    name: "Chili Chicken Gravy + Fried Rice Bowl",
    description: "Crispy chicken cubes tossed in spicy green chili soy glaze, served with fragrant egg vegetable fried rice.",
    price: 249,
    isVeg: false,
    category: "Wok Bowls & Mains",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.8,
    ordersCount: 490,
    badge: "Chef Special"
  },
  {
    id: "item-504",
    restaurantId: "rest-5",
    restaurantName: "Wok Express",
    name: "Crispy Honey Chili Potatoes",
    description: "Wok-glazed crisp potato fingers tossed in sesame seeds, honey and red chili paste.",
    price: 149,
    isVeg: true,
    category: "Dimsums & Starters",
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.5,
    ordersCount: 380
  },

  // Dessert Lab
  {
    id: "item-601",
    restaurantId: "rest-6",
    restaurantName: "Dessert Lab",
    name: "Belgian Triple Chocolate Waffle",
    description: "Freshly baked warm waffle smothered with melted dark chocolate, Belgian milk chocolate, white chocolate chips and vanilla ice cream.",
    price: 189,
    isVeg: true,
    category: "Warm Waffles & Crepes",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.9,
    ordersCount: 780,
    badge: "Bestseller"
  },
  {
    id: "item-602",
    restaurantId: "rest-6",
    restaurantName: "Dessert Lab",
    name: "Gooey Molten Choco Lava Cake",
    description: "Rich dark chocolate sponge with an oozing warm chocolate fudge core, served with chocolate gelato.",
    price: 149,
    isVeg: true,
    category: "Cakes & Brownies",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.8,
    ordersCount: 560,
    badge: "Must Try"
  },
  {
    id: "item-603",
    restaurantId: "rest-6",
    restaurantName: "Dessert Lab",
    name: "Nutella Brownie Sundae Jar",
    description: "Layers of fudge brownie chunks, roasted hazelnut Nutella, hot fudge sauce and vanilla cream.",
    price: 179,
    isVeg: true,
    category: "Sundaes & Jars",
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=600&auto=format&fit=crop&q=80",
    isAvailable: true,
    rating: 4.9,
    ordersCount: 420
  }
];

export const initialCoupons = [
  { code: "MALLBITE50", discountType: "fixed", value: 50, minOrder: 300, description: "Flat ₹50 OFF on orders above ₹300 across all food outlets!" },
  { code: "FOODCOURT20", discountType: "percentage", value: 20, maxDiscount: 100, minOrder: 400, description: "20% OFF up to ₹100 for multi-restaurant orders" },
  { code: "COMBO40", discountType: "fixed", value: 40, minOrder: 250, description: "Special Multi-Outlet Combo discount" }
];

export const initialHeatmap = [
  { zoneId: "North Court (A-Tables)", intensity: "High", color: "#EF4444", ordersCount: 48, revenue: "₹24,800", activeCustomers: 32, note: "Peak lunch/dinner traffic near Burger House & Pizza Corner" },
  { zoneId: "South Atrium (B-Tables)", intensity: "Medium", color: "#F59E0B", ordersCount: 26, revenue: "₹14,200", activeCustomers: 18, note: "Moderate afternoon coffee & snack ordering" },
  { zoneId: "Sky Terrace (C-Tables)", intensity: "Medium", color: "#F59E0B", ordersCount: 22, revenue: "₹12,400", activeCustomers: 14, note: "Evening couple dining and dessert rush" },
  { zoneId: "Central Plaza (D-Tables)", intensity: "Low", color: "#10B981", ordersCount: 12, revenue: "₹6,800", activeCustomers: 8, note: "Light casual seating and takeaway pickups" }
];

export const initialOrders = [
  {
    id: "MB10240",
    tableNumber: "A-10",
    tableName: "Table A-10 (North Court)",
    mallName: "Phoenix Marketcity Food Hub",
    customerName: "Aarav Sharma",
    customerPhone: "+91 98765 43210",
    totalAmount: 588,
    paymentStatus: "Paid",
    paymentMethod: "UPI (Google Pay)",
    orderStatus: "Delivered",
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    deliveryStaff: "Rohan Verma (Runner #3)",
    subOrders: [
      {
        id: "B775",
        restaurantId: "rest-1",
        restaurantName: "Burger House",
        counterNumber: "FC-04",
        status: "Delivered",
        items: [{ id: "item-101", name: "Classic Veg Crunch Burger", quantity: 2, price: 149 }]
      },
      {
        id: "P482",
        restaurantId: "rest-2",
        restaurantName: "Pizza Corner",
        counterNumber: "FC-02",
        status: "Delivered",
        items: [{ id: "item-203", name: "Stuffed Cheesy Garlic Breadsticks", quantity: 1, price: 139 }]
      },
      {
        id: "C215",
        restaurantId: "rest-4",
        restaurantName: "Coffee Culture",
        counterNumber: "FC-01",
        status: "Delivered",
        items: [{ id: "item-401", name: "Signature Iced Cold Coffee", quantity: 1, price: 129 }]
      }
    ]
  }
];
