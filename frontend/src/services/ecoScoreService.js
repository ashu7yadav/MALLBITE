/**
 * Eco Score Environmental Intelligence Calculator
 * 
 * Note: Clearly labeled as "Estimated" to respect transparency guidelines.
 */

export const ecoScoreService = {
  calculate: (items = [], outletsCount = 1, isReusablePackaging = false) => {
    const totalItems = items.reduce((sum, it) => sum + (it.quantity || 1), 0) || 1;
    const effectiveOutlets = Math.max(1, outletsCount);

    // Standard uncoordinated separate ordering baseline
    const standardTrips = effectiveOutlets;
    const standardPackagingUnits = Math.round(totalItems * 2);

    // MallBite unified consolidated coordination
    const consolidatedTrips = 1;
    const consolidatedPackagingUnits = Math.max(1, Math.ceil(totalItems * 1.3) - (isReusablePackaging ? 1 : 0));

    const tripsAvoided = Math.max(0, standardTrips - consolidatedTrips);
    const packagingSaved = Math.max(0, standardPackagingUnits - consolidatedPackagingUnits);
    const carbonReductionPercent = Math.min(65, Math.max(15, Math.round((tripsAvoided * 18) + (packagingSaved * 5))));

    // Score out of 100
    let score = 72;
    score += (effectiveOutlets * 5); // Multi-outlet consolidation bonus
    score += Math.min(10, packagingSaved * 2);
    if (isReusablePackaging) score += 6;
    score = Math.min(96, Math.max(60, score));

    let ecoRating = "Good";
    let badgeColor = "#10B981"; // Emerald
    let ringColor = "ring-emerald-500/30";
    if (score >= 85) {
      ecoRating = "Excellent";
      badgeColor = "#059669";
      ringColor = "ring-emerald-600/30";
    } else if (score < 70) {
      ecoRating = "Moderate";
      badgeColor = "#F59E0B";
      ringColor = "ring-amber-500/30";
    }

    const explanation = effectiveOutlets > 1
      ? `Good choice 🌱 Combining your order across ${effectiveOutlets} outlets reduced packaging by approximately ${packagingSaved} units and avoided ${tripsAvoided} delivery trips.`
      : `Single-outlet order with eco-optimized biodegradable container packaging.`;

    return {
      score,
      ecoRating,
      badgeColor,
      ringColor,
      packagingUnits: consolidatedPackagingUnits,
      packagingSaved,
      deliveryTripsAvoided: tripsAvoided,
      estimatedCarbonReduction: `${carbonReductionPercent}%`,
      isReusablePackaging,
      explanation
    };
  }
};
