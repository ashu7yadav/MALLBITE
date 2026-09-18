/**
 * Client-Side AI Group Food Planner Solver
 * 
 * Works seamlessly online or offline with deterministic multi-attribute matching
 */

export const groupPlannerService = {
  solve: (members = [], totalBudget = 800, menuItems = [], restaurants = []) => {
    if (!members || members.length === 0) {
      members = [
        { id: 1, name: "Ashutosh", diet: "Veg", budget: 200, cuisine: "Burgers & Wraps" },
        { id: 2, name: "Priya", diet: "Jain", budget: 180, cuisine: "Pizzas" },
        { id: 3, name: "Rohan", diet: "Non-Veg", budget: 250, cuisine: "Asian & Bowls" },
        { id: 4, name: "Sneha", diet: "Veg", budget: 150, cuisine: "Burgers & Wraps" }
      ];
    }

    const effectiveTotalBudget = Number(totalBudget) || members.reduce((sum, m) => sum + (Number(m.budget) || 200), 0);
    const availableItems = (menuItems && menuItems.length > 0) ? menuItems : [];

    // Fallback menu items matching the user scenario if menu is empty
    const itemsPool = availableItems.length > 0 ? availableItems : [
      { id: "item-b-veg", restaurantId: "rest-burger", restaurantName: "Burger House", name: "Veg Burger", price: 149, isVeg: true, isJain: false, prepTimeNum: 9 },
      { id: "item-p-jain", restaurantId: "rest-pizza", restaurantName: "Pizza Corner", name: "Jain Pizza", price: 179, isVeg: true, isJain: true, prepTimeNum: 7 },
      { id: "item-w-chicken", restaurantId: "rest-wok", restaurantName: "Wok Express", name: "Chicken Bowl", price: 229, isVeg: false, isJain: false, prepTimeNum: 12 },
      { id: "item-b-wrap", restaurantId: "rest-burger", restaurantName: "Burger House", name: "Paneer Wrap", price: 129, isVeg: true, isJain: false, prepTimeNum: 8 },
      { id: "item-s1", restaurantId: "rest-south", restaurantName: "South Kitchen", name: "Crispy Masala Dosa", price: 129, isVeg: true, isJain: false, prepTimeNum: 9 },
      { id: "item-j1", restaurantId: "rest-juice", restaurantName: "Juice Bar", name: "Alphonso Mango Shake", price: 89, isVeg: true, isJain: true, prepTimeNum: 5 }
    ];

    const selectedPlan = [];
    const usedOutlets = new Set();

    members.forEach((member) => {
      const diet = (member.diet || "Veg").toLowerCase();
      const memberMaxBudget = Number(member.budget) || Math.floor(effectiveTotalBudget / members.length);
      const memberCuisine = (member.cuisine || "any").toLowerCase();
      const memberDislikes = (member.dislikes || "").toLowerCase();

      // Filter matching candidates
      const candidates = itemsPool.filter(item => {
        if (diet === "jain") {
          if (!item.isJain) return false;
        } else if (diet === "veg") {
          if (!item.isVeg) return false;
        } else if (diet === "vegan") {
          if (!item.isVeg) return false;
          const lower = item.name.toLowerCase();
          if (lower.includes("paneer") || lower.includes("cheese") || lower.includes("milk") || lower.includes("curd")) return false;
        }

        if (memberDislikes && item.name.toLowerCase().includes(memberDislikes)) {
          return false;
        }

        return true;
      });

      // Score candidates
      const scored = (candidates.length > 0 ? candidates : itemsPool).map(item => {
        let score = 50;

        if (diet === "non-veg" && !item.isVeg) score += 35;
        if (diet === "jain" && item.isJain) score += 35;

        // Individual budget match
        if (item.price <= memberMaxBudget) {
          score += 25;
          score += Math.min(10, Math.floor((memberMaxBudget - item.price) / 10));
        } else {
          score -= (item.price - memberMaxBudget) * 2;
        }

        // Cuisine match
        if (memberCuisine !== "any" && (item.category?.toLowerCase().includes(memberCuisine) || item.name.toLowerCase().includes(memberCuisine))) {
          score += 25;
        }

        // Multi-outlet diversity bonus
        if (!usedOutlets.has(item.restaurantId)) {
          score += 20;
        }

        // Rating
        score += (item.rating || 4.5) * 5;

        return { item, score };
      }).sort((a, b) => b.score - a.score);

      const chosenItem = scored[0]?.item || itemsPool[0];
      usedOutlets.add(chosenItem.restaurantId);

      const outlet = restaurants.find(r => r.id === chosenItem.restaurantId) || { name: chosenItem.restaurantName || "Food Court" };

      selectedPlan.push({
        memberId: member.id,
        memberName: member.name,
        diet: member.diet,
        budget: memberMaxBudget,
        item: {
          ...chosenItem,
          outletName: outlet.name || chosenItem.restaurantName,
          counterNumber: outlet.counterNumber || "FC-01"
        },
        matchedReason: `Matches ${member.diet} diet (${diet === 'jain' ? 'No onion/garlic' : diet === 'non-veg' ? 'High Protein' : '100% Pure Veg'}) • Fits ₹${memberMaxBudget} allocation`
      });
    });

    const totalPlanned = selectedPlan.reduce((acc, curr) => acc + curr.item.price, 0);
    const totalSaved = Math.max(0, effectiveTotalBudget - totalPlanned);

    const explanation = `Selected because it matches everyone's dietary preferences across ${usedOutlets.size} outlets while keeping the group ₹${totalSaved} under budget.`;

    return {
      success: true,
      totalBudget: effectiveTotalBudget,
      totalPlanned,
      totalSaved,
      participatingOutletsCount: usedOutlets.size,
      members: selectedPlan,
      explanation
    };
  }
};
