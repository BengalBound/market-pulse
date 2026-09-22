/**
 * Event-Driven Diffing & Anomaly Engine for Market Monitoring
 */

function calculatePriceDiff(oldPrice, newPrice, userThresholdPercent = 10) {
  if (!oldPrice || !newPrice || oldPrice <= 0) return null;

  const diffAmount = Number((newPrice - oldPrice).toFixed(2));
  const percentChange = Number(((diffAmount / oldPrice) * 100).toFixed(1));
  const absoluteChange = Math.abs(percentChange);

  const triggersAlert = absoluteChange >= userThresholdPercent;
  let severity = 'low';

  if (absoluteChange >= 20) {
    severity = 'critical';
  } else if (absoluteChange >= 12) {
    severity = 'high';
  } else if (absoluteChange >= userThresholdPercent) {
    severity = 'medium';
  }

  const direction = percentChange < 0 ? 'DROP' : 'SPIKE';

  return {
    oldPrice,
    newPrice,
    diffAmount,
    percentChange,
    direction,
    triggersAlert,
    severity,
    recommendedAction: direction === 'DROP'
      ? `Generate Counter-Campaign to highlight product differentiation and build quality.`
      : `Competitor increased price. Maintain current pricing to capture market share or introduce premium bundle.`
  };
}

function evaluateMarginImpact(sellingPrice, currentCogs, discountedCogs) {
  const oldGrossProfit = sellingPrice - currentCogs;
  const oldMargin = (oldGrossProfit / sellingPrice) * 100;

  const newGrossProfit = sellingPrice - discountedCogs;
  const newMargin = (newGrossProfit / sellingPrice) * 100;

  const marginExpansion = Number((newMargin - oldMargin).toFixed(1));

  return {
    oldMargin: Number(oldMargin.toFixed(1)),
    newMargin: Number(newMargin.toFixed(1)),
    marginExpansionPercent: marginExpansion,
    additionalProfitPerUnit: Number((discountedCogs < currentCogs ? currentCogs - discountedCogs : 0).toFixed(2))
  };
}

module.exports = {
  calculatePriceDiff,
  evaluateMarginImpact
};
