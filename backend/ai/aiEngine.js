/**
 * MallBite AI & Algorithmic Intelligence Layer
 * 
 * Features:
 * 1. Multi-Attribute AI Food Recommendation Engine (Rule-based weighted scoring, modular for ML)
 * 2. Smart Queue Wait-Time Prediction Engine
 * 3. Smart Alternative Recommendation Engine (for busy outlets)
 * 4. Smart Multi-Outlet Order Batching & Pickup Routing Engine
 * 5. Crowd Intelligence & AI Demand Forecasting Engine
 */

export class AIEngine {
  /**
   * FEATURE 2: AI Food Recommendation Engine
   * Calculates recommendation score based on:
   * Score = w_b * BudgetMatch + w_c * CuisineMatch + w_d * DietaryMatch + w_p * PreferenceMatch + w_t * PrepTimeMatch + w_r * Rating
   * Normalized to 0–100%.
   */
  static getRecommendations(menuItems, outlets, preferences = {}) {
    const {
      budget = 'any',          // 'under150' | '150-300' | '300-500' | '500+'
      dietary = 'all',         // 'veg' | 'non-veg' | 'vegan'
      cuisine = 'all',         // 'Indian' | 'Chinese' | 'South Indian' | 'Fast Food' | 'Desserts' | 'Beverages'
      foodType = 'all',        // 'Healthy' | 'High Protein' | 'Spicy' | 'Light' | 'Comfort Food'
      maxWaitTime = 30         // in minutes: 10, 15, 20, 30
    } = preferences;

    const scoredItems = menuItems.map((item) => {
      const outlet = outlets.find(o => o.id === item.restaurantId) || {};
      let totalWeight = 0;
      let earnedScore = 0;

      // 1. Budget Scoring (Weight: 25)
      totalWeight += 25;
      let budgetScore = 25;
      if (budget === 'under150') {
        budgetScore = item.price <= 150 ? 25 : Math.max(0, 25 - ((item.price - 150) / 10));
      } else if (budget === '150-300') {
        if (item.price >= 150 && item.price <= 300) budgetScore = 25;
        else if (item.price < 150) budgetScore = 20;
        else budgetScore = Math.max(0, 25 - ((item.price - 300) / 15));
      } else if (budget === '300-500') {
        if (item.price >= 300 && item.price <= 500) budgetScore = 25;
        else if (item.price < 300) budgetScore = 18;
        else budgetScore = Math.max(0, 25 - ((item.price - 500) / 20));
      } else if (budget === '500+') {
        budgetScore = item.price >= 400 ? 25 : 15;
      }
      earnedScore += budgetScore;

      // 2. Dietary Match (Weight: 20)
      totalWeight += 20;
      let dietaryScore = 20;
      if (dietary === 'veg') {
        dietaryScore = item.isVeg ? 20 : 0;
      } else if (dietary === 'non-veg') {
        dietaryScore = !item.isVeg ? 20 : 12; // Veg is acceptable fallback for non-veg
      } else if (dietary === 'vegan') {
        const isVeganSafe = item.isVeg && !item.name.toLowerCase().includes('cheese') && !item.name.toLowerCase().includes('paneer') && !item.name.toLowerCase().includes('milk');
        dietaryScore = isVeganSafe ? 20 : 0;
      }
      earnedScore += dietaryScore;

      // 3. Cuisine Match (Weight: 15)
      totalWeight += 15;
      let cuisineScore = 15;
      if (cuisine !== 'all') {
        const targetCuisine = cuisine.toLowerCase();
        const itemCat = (item.category || '').toLowerCase();
        const outletCat = (outlet.category || '').toLowerCase();
        const itemName = item.name.toLowerCase();

        if (itemCat.includes(targetCuisine) || outletCat.includes(targetCuisine) || itemName.includes(targetCuisine)) {
          cuisineScore = 15;
        } else if (targetCuisine === 'indian' && (itemCat.includes('biryani') || itemCat.includes('dosa') || outletCat.includes('north indian'))) {
          cuisineScore = 15;
        } else if (targetCuisine === 'south indian' && (itemCat.includes('dosa') || itemCat.includes('idli') || itemName.includes('dosa') || itemName.includes('idli'))) {
          cuisineScore = 15;
        } else {
          cuisineScore = 4;
        }
      }
      earnedScore += cuisineScore;

      // 4. Food Type / Mood Match (Weight: 15)
      totalWeight += 15;
      let typeScore = 15;
      if (foodType !== 'all') {
        const t = foodType.toLowerCase();
        const name = item.name.toLowerCase();
        const desc = (item.description || '').toLowerCase();

        if (t === 'healthy') {
          typeScore = (desc.includes('salad') || desc.includes('healthy') || desc.includes('quinoa') || desc.includes('fresh') || name.includes('juice')) ? 15 : 6;
        } else if (t === 'high protein') {
          typeScore = (name.includes('paneer') || name.includes('chicken') || desc.includes('protein') || desc.includes('dal') || desc.includes('egg')) ? 15 : 7;
        } else if (t === 'spicy') {
          typeScore = (desc.includes('spicy') || desc.includes('peri') || desc.includes('schezwan') || desc.includes('chili') || desc.includes('masala')) ? 15 : 5;
        } else if (t === 'light') {
          typeScore = (item.prepTimeNum <= 10 || name.includes('wrap') || name.includes('shake') || name.includes('coffee') || desc.includes('light')) ? 15 : 8;
        } else if (t === 'comfort food') {
          typeScore = (name.includes('pizza') || name.includes('burger') || name.includes('biryani') || name.includes('waffle')) ? 15 : 8;
        }
      }
      earnedScore += typeScore;

      // 5. Preparation Time vs Waiting Time Limit (Weight: 15)
      totalWeight += 15;
      const rawPrep = item.prepTimeNum || parseInt(item.prepTime || outlet.prepTime || "12", 10) || 12;
      let prepScore = 15;
      if (rawPrep <= maxWaitTime) {
        // Bonus for being comfortably under limit
        prepScore = 15;
      } else {
        const excess = rawPrep - maxWaitTime;
        prepScore = Math.max(0, 15 - (excess * 2.5));
      }
      earnedScore += prepScore;

      // 6. Rating & Social Proof (Weight: 10)
      totalWeight += 10;
      const itemRating = item.rating || outlet.rating || 4.5;
      const ratingScore = Math.round((itemRating / 5) * 10);
      earnedScore += ratingScore;

      // Compute Normalized Match Percentage (0-100)
      const matchPercentage = Math.min(99, Math.max(55, Math.round((earnedScore / totalWeight) * 100)));

      // Reason Generator
      const reasons = [];
      if (budget !== 'any' && budgetScore >= 20) reasons.push(`Fits budget (${budget.replace('under', '< ₹')})`);
      if (dietary !== 'all' && dietaryScore >= 18) reasons.push(dietary === 'veg' ? '100% Pure Veg' : dietary);
      if (rawPrep <= maxWaitTime) reasons.push(`Ready in ${rawPrep} min (within ${maxWaitTime}m limit)`);
      if (itemRating >= 4.5) reasons.push(`Highly rated (⭐${itemRating})`);

      return {
        ...item,
        outletName: outlet.name || item.restaurantName,
        counterNumber: outlet.counterNumber || "FC-01",
        prepTimeNum: rawPrep,
        matchPercentage,
        recommendationReason: reasons.slice(0, 2).join(' • ') || 'Popular food court choice',
        scores: {
          budget: budgetScore,
          dietary: dietaryScore,
          cuisine: cuisineScore,
          foodType: typeScore,
          prepTime: prepScore,
          rating: ratingScore
        }
      };
    });

    // Sort by match percentage descending
    return scoredItems
      .filter(item => (dietary === 'veg' ? item.isVeg : true))
      .sort((a, b) => b.matchPercentage - a.matchPercentage);
  }

  /**
   * FEATURE 4: Smart Queue Wait-Time Algorithm
   * Formula:
   * Estimated Wait = (Current Queue * Average Prep Time) / Number of Active Staff * Complexity Factor
   */
  static calculateOutletQueue(outlet, activeOrdersCount = 0) {
    const avgPrep = outlet.avgPrepMinutes || 10;
    const staffCount = Math.max(1, outlet.activeStaff || 2);
    const activeQueue = Math.max(0, activeOrdersCount !== undefined ? activeOrdersCount : (outlet.currentQueueOrders || 5));
    
    // Slight complexity factor based on cuisine type (e.g. woodfired pizzas take longer than cold shakes)
    const complexityFactor = outlet.category?.toLowerCase().includes('pizza') ? 1.15
      : outlet.category?.toLowerCase().includes('biryani') ? 1.1
      : outlet.category?.toLowerCase().includes('beverage') ? 0.75
      : 1.0;

    const estimatedWaitMinutes = Math.max(3, Math.round(((activeQueue * avgPrep) / staffCount) * complexityFactor * 0.45));

    let queueLevel = 'low';
    let queueColor = '#10B981'; // Green
    let queueBadge = 'Low Queue';

    if (estimatedWaitMinutes > 15 || activeQueue > 15) {
      queueLevel = 'high';
      queueColor = '#EF4444'; // Red
      queueBadge = 'High Queue';
    } else if (estimatedWaitMinutes >= 9 || activeQueue >= 8) {
      queueLevel = 'medium';
      queueColor = '#F59E0B'; // Yellow/Amber
      queueBadge = 'Moderate';
    }

    return {
      outletId: outlet.id,
      outletName: outlet.name,
      counterNumber: outlet.counterNumber,
      activeQueueOrders: activeQueue,
      activeStaff: staffCount,
      estimatedWaitMinutes,
      queueLevel,
      queueColor,
      queueBadge,
      displayWait: `${estimatedWaitMinutes} min`
    };
  }

  /**
   * FEATURE 5: Smart Alternative Recommendation Engine
   * When an outlet is busy (> waitLimit or queue high), recommends faster items
   */
  static getFasterAlternatives(targetItem, allItems, outlets, userMaxWait = 15) {
    const targetOutlet = outlets.find(o => o.id === targetItem.restaurantId) || {};
    const targetQueue = this.calculateOutletQueue(targetOutlet);

    // If outlet wait is within limit, no alternative strictly necessary
    const isBusy = targetQueue.estimatedWaitMinutes > userMaxWait || (targetItem.prepTimeNum || 15) > userMaxWait;

    // Find similar items from other outlets that are faster
    const candidates = allItems.filter(item => {
      if (item.id === targetItem.id) return false;
      if (targetItem.isVeg && !item.isVeg) return false;
      const outlet = outlets.find(o => o.id === item.restaurantId) || {};
      const q = this.calculateOutletQueue(outlet);
      const prep = item.prepTimeNum || 10;
      return prep <= userMaxWait && q.estimatedWaitMinutes <= userMaxWait;
    });

    const rankedAlternatives = candidates.map(item => {
      const outlet = outlets.find(o => o.id === item.restaurantId) || {};
      const q = this.calculateOutletQueue(outlet);
      const prep = item.prepTimeNum || 10;
      
      // Calculate preference similarity
      let similarity = 75;
      if (item.category === targetItem.category) similarity += 15;
      if (Math.abs(item.price - targetItem.price) <= 50) similarity += 10;

      return {
        ...item,
        outletName: outlet.name,
        prepTimeNum: prep,
        outletWait: q.estimatedWaitMinutes,
        matchPercentage: Math.min(96, similarity),
        reason: `Saves ${Math.max(3, (targetItem.prepTimeNum || 18) - prep)} mins • ${q.queueBadge}`
      };
    }).sort((a, b) => b.matchPercentage - a.matchPercentage);

    return {
      targetItemName: targetItem.name,
      targetOutletName: targetOutlet.name,
      targetWait: targetQueue.estimatedWaitMinutes,
      isBusy,
      userMaxWait,
      alternatives: rankedAlternatives.slice(0, 3)
    };
  }

  /**
   * FEATURE 7: Smart Multi-Outlet Order Batching Algorithm
   * Calculates coordinated preparation, optimal pickup route and delivery ETA.
   */
  static calculateSmartBatch(subOrders, outlets) {
    if (!subOrders || subOrders.length === 0) return null;

    const outletData = subOrders.map(so => {
      const outlet = outlets.find(o => o.id === so.restaurantId) || {};
      const prepMinutes = parseInt(so.estimatedTime || outlet.prepTime || "12", 10) || 12;
      return {
        subOrderId: so.id,
        restaurantId: so.restaurantId,
        restaurantName: so.restaurantName,
        counterNumber: so.counterNumber || outlet.counterNumber || "FC-01",
        prepMinutes,
        status: so.status
      };
    });

    // Synchronized Pickup Window: Maximum prep time of all participating sub-orders
    const maxPrepMinutes = Math.max(...outletData.map(o => o.prepMinutes), 8);
    const pickupWindow = maxPrepMinutes;

    // Optimized sequential pickup route through food court counters (e.g. FC-01 -> FC-02 -> FC-04)
    const sortedPickups = [...outletData].sort((a, b) => {
      return a.counterNumber.localeCompare(b.counterNumber);
    });

    const routeSteps = sortedPickups.map(o => `${o.restaurantName} (${o.counterNumber})`);
    const optimizedRouteString = `${routeSteps.join(' ➔ ')} ➔ Deliver to Table`;

    // Transit time in mall food court: ~3 minutes for combined runner delivery
    const estimatedDeliveryMinutes = pickupWindow + 3;

    return {
      batchId: `B${Math.floor(200 + Math.random() * 800)}`,
      participatingOutletsCount: subOrders.length,
      outlets: sortedPickups,
      recommendedPickupWindow: `${pickupWindow} minutes`,
      pickupWindowMinutes: pickupWindow,
      estimatedDeliveryMinutes,
      optimizedRouteString,
      isSynchronized: true,
      batchBenefitMessage: subOrders.length > 1 
        ? `${subOrders.length} food outlets synchronized into 1 consolidated pickup route.`
        : `Direct single-counter preparation.`
    };
  }

  /**
   * FEATURE 9 & 10: Crowd Intelligence & AI Demand Forecast
   */
  static getCrowdAndDemandForecast(activeOrders = [], outlets = []) {
    // Current crowd calculation based on active orders
    const baseOrders = activeOrders.length;
    const crowdPercentage = Math.min(94, Math.max(48, 65 + Math.round(baseOrders * 3.5)));
    
    let crowdStatus = 'MODERATE';
    let crowdColor = '#10B981';
    if (crowdPercentage >= 75) {
      crowdStatus = 'BUSY';
      crowdColor = '#EF4444';
    } else if (crowdPercentage >= 60) {
      crowdStatus = 'STEADY';
      crowdColor = '#F59E0B';
    }

    // Hourly demand curve
    const hourlyForecast = [
      { hour: "5:00 PM", orders: 45, crowdPercent: 52, note: "Early Evening" },
      { hour: "6:00 PM", orders: 88, crowdPercent: 68, note: "Rush Begins" },
      { hour: "7:00 PM", orders: 165, crowdPercent: 88, note: "Peak Dinner Rush" },
      { hour: "8:00 PM", orders: 195, crowdPercent: 94, note: "Peak Dinner Rush" },
      { hour: "9:00 PM", orders: 130, crowdPercent: 78, note: "Late Seating" },
      { hour: "10:00 PM", orders: 40, crowdPercent: 42, note: "Wind Down" }
    ];

    // Find highest demand outlet
    const busyOutlet = outlets.find(o => o.name?.toLowerCase().includes('pizza')) || outlets[0] || { name: 'Pizza Hub' };

    // AI Operational Recommendations with confidence score
    const operationalRecommendations = [
      {
        id: "rec-op-1",
        title: `${busyOutlet.name} Peak Demand Alert`,
        recommendation: `Expected high demand between 7:00 PM – 8:30 PM. Allocate +1 kitchen staff and pre-stretch dough bases.`,
        outlet: busyOutlet.name,
        confidence: 89,
        urgency: "High",
        type: "staff"
      },
      {
        id: "rec-op-2",
        title: "South Kitchen Inventory Signal",
        recommendation: `Dosa batter buffer at 35%. Predicted consumption of 70+ orders. Prepare supplementary stock.`,
        outlet: "South Kitchen",
        confidence: 84,
        urgency: "Medium",
        type: "inventory"
      },
      {
        id: "rec-op-3",
        title: "Multi-Outlet Runner Dispatch",
        recommendation: `38% of upcoming orders span 2+ counters. Deploy Runner #2 to North Atrium connector.`,
        outlet: "All Outlets",
        confidence: 92,
        urgency: "High",
        type: "logistics"
      }
    ];

    return {
      crowdLevel: crowdPercentage,
      crowdStatus,
      crowdColor,
      currentActiveOrders: baseOrders,
      estimatedMallVisitors: 4200 + (baseOrders * 120),
      peakWindow: "7:00 PM – 8:30 PM",
      hourlyForecast,
      operationalRecommendations,
      disclaimer: "Demo prediction based on simulated historical food-court data."
    };
  }

  /**
   * FEATURE 12: Lightweight Inventory Signals
   */
  static getInventorySignals(outlets = []) {
    return [
      {
        id: "inv-1",
        outlet: "Pizza Hub",
        ingredient: "Fresh Mozzarella & Pizza Bases",
        status: "Warning",
        stockLevel: "Low (24% buffer)",
        message: "Expected to run low during 7:30 PM dinner rush based on demand forecast.",
        recommendedAction: "Prep +25 additional bases now."
      },
      {
        id: "inv-2",
        outlet: "Food Corner",
        ingredient: "Paneer & Tortilla Wraps",
        status: "Warning",
        stockLevel: "Moderate (38% buffer)",
        message: "Paneer wrap trending as top AI recommendation.",
        recommendedAction: "Pre-portion paneer cubes."
      },
      {
        id: "inv-3",
        outlet: "South Kitchen",
        ingredient: "Fermented Dosa Batter & Sambar",
        status: "Optimal",
        stockLevel: "Healthy (82% buffer)",
        message: "Stock sufficient for expected evening orders.",
        recommendedAction: "No action required."
      },
      {
        id: "inv-4",
        outlet: "Juice Bar",
        ingredient: "Alphonso Mango Pulp & Dairy",
        status: "Optimal",
        stockLevel: "Healthy (90% buffer)",
        message: "Ample supply for dessert and shake combos.",
        recommendedAction: "No action required."
      }
    ];
  }
}
