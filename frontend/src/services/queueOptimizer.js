/**
 * Smart Queue Optimization & Start Delay Synchronization Engine
 * 
 * Formula:
 * estimated_prep_time = (current_queue_size * avg_prep_time / kitchen_capacity) + item_prep_time
 * 
 * Synchronization Logic:
 * T_max = max(prep_time_i)
 * Delay_i = T_max - prep_time_i
 * 
 * Ensures all outlets complete preparation at approximately the exact same time
 * for coordinated table delivery.
 */

export const queueOptimizer = {
  /**
   * Calculate single outlet wait time based on transparent formula
   */
  calculateOutletWait: (queueSize = 5, avgPrepMinutes = 8, activeStaff = 3, itemPrep = 8) => {
    const queueComponent = Math.round((queueSize * avgPrepMinutes) / Math.max(1, activeStaff) * 0.45);
    return Math.max(itemPrep, queueComponent + itemPrep);
  },

  /**
   * Synchronize multiple outlets for a master order
   */
  synchronizeSchedule: (subOrders = [], restaurants = []) => {
    if (!subOrders || subOrders.length === 0) {
      return {
        targetDeliveryMinutes: 12,
        combinedArrivalMinutes: 15,
        schedule: [],
        timelineSummary: "Single-outlet preparation."
      };
    }

    const calculatedOutlets = subOrders.map((so, index) => {
      const rest = restaurants.find(r => r.id === so.restaurantId) || {};
      const queueSize = rest.currentQueueOrders || (index === 0 ? 3 : index === 1 ? 5 : 7);
      const avgPrep = rest.avgPrepMinutes || 8;
      const staff = rest.activeStaff || 3;
      
      const itemPrep = so.items?.reduce((max, it) => Math.max(max, it.prepTimeNum || 8), 6) || 8;
      const totalPrep = queueOptimizer.calculateOutletWait(queueSize, avgPrep, staff, itemPrep);

      return {
        subOrderId: so.id,
        restaurantId: so.restaurantId,
        restaurantName: so.restaurantName || rest.name || "Kitchen Counter",
        counterNumber: so.counterNumber || rest.counterNumber || `FC-0${index + 1}`,
        queueSize,
        itemPrep,
        totalPrepMinutes: totalPrep,
        itemsCount: so.items?.length || 1,
        items: so.items || []
      };
    });

    const maxPrepMinutes = Math.max(...calculatedOutlets.map(o => o.totalPrepMinutes), 8);

    // Staggered schedule:
    // Slower outlet starts first (Delay = 0)
    // Faster outlet starts later (Delay = T_max - totalPrep)
    const schedule = calculatedOutlets.map(o => {
      const delayMinutes = Math.max(0, maxPrepMinutes - o.totalPrepMinutes);
      return {
        ...o,
        recommendedStartDelayMinutes: delayMinutes,
        startTimingLabel: delayMinutes === 0 ? "Starts Immediately" : `Start after ${delayMinutes} min`,
        readyAtMinute: maxPrepMinutes,
        isSynchronized: true
      };
    }).sort((a, b) => a.recommendedStartDelayMinutes - b.recommendedStartDelayMinutes);

    const firstToStart = schedule[0];
    const lastToStart = schedule[schedule.length - 1];

    const timelineSummary = schedule.length > 1
      ? `${firstToStart.restaurantName} starts first (${firstToStart.totalPrepMinutes}m). ${lastToStart.restaurantName} starts after ${lastToStart.recommendedStartDelayMinutes}m. Both finish together at ${maxPrepMinutes}m.`
      : `${firstToStart.restaurantName} preparation complete in ${maxPrepMinutes} min.`;

    return {
      targetDeliveryMinutes: maxPrepMinutes,
      combinedArrivalMinutes: maxPrepMinutes + 2, // 2 mins table drop transit
      schedule,
      timelineSummary,
      differenceSavedMinutes: Math.max(0, maxPrepMinutes - Math.min(...schedule.map(s => s.totalPrepMinutes)))
    };
  }
};
