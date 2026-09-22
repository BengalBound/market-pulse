const express = require('express');
const router = express.Router();
const mockData = require('../data/mockData.json');
const { calculatePriceDiff } = require('../services/diffEngine');

// GET /api/competitors/pricing
router.get('/', (req, res) => {
  try {
    const products = mockData.trackedProducts.map(item => {
      const diff = calculatePriceDiff(
        item.competitor.previousPrice,
        item.competitor.currentPrice,
        10
      );
      return {
        ...item,
        diffAnalysis: diff
      };
    });

    res.json({
      success: true,
      totalTracked: products.length,
      products
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/competitors/test-diff
router.post('/test-diff', (req, res) => {
  const { oldPrice, newPrice, threshold } = req.body;
  const analysis = calculatePriceDiff(Number(oldPrice), Number(newPrice), Number(threshold) || 10);
  res.json({ success: true, analysis });
});

// POST /api/competitors/track - Upload / Add new competitor product
router.post('/track', (req, res) => {
  try {
    const {
      name,
      category,
      competitorBrand,
      competitorPrice,
      targetUrl,
      myProductTitle,
      myPrice,
      myCogs,
      alertThreshold,
      topComplaint
    } = req.body;

    const compPrice = parseFloat(competitorPrice) || 99.00;
    const previousPrice = Number((compPrice * 1.18).toFixed(2));
    const priceChange = Number((((compPrice - previousPrice) / previousPrice) * 100).toFixed(1));
    const userPrice = parseFloat(myPrice) || Number((compPrice * 1.05).toFixed(2));
    const userCogs = parseFloat(myCogs) || Number((userPrice * 0.35).toFixed(2));
    const margin = (((userPrice - userCogs) / userPrice) * 100).toFixed(1) + '%';

    // Generate 30-day history curve
    const history = [
      { day: 'Day 1', price: previousPrice },
      { day: 'Day 5', price: previousPrice },
      { day: 'Day 10', price: Number((previousPrice * 0.98).toFixed(2)) },
      { day: 'Day 15', price: Number((previousPrice * 0.98).toFixed(2)) },
      { day: 'Day 20', price: Number((previousPrice * 0.95).toFixed(2)) },
      { day: 'Day 25', price: Number((previousPrice * 0.92).toFixed(2)) },
      { day: 'Day 28', price: Number((previousPrice * 0.90).toFixed(2)) },
      { day: 'Day 29', price: Number((compPrice * 1.04).toFixed(2)) },
      { day: 'Day 30', price: compPrice }
    ];

    const newItem = {
      id: `prod-${Date.now()}`,
      name: name || 'Tracked E-Commerce Product',
      category: category || 'General Merchandise',
      targetUrl: targetUrl || 'https://amazon.com/dp/sample-asin',
      myProduct: {
        title: myProductTitle || 'My Brand Equivalent',
        currentPrice: userPrice,
        cogs: userCogs,
        currentMargin: margin
      },
      competitor: {
        brand: competitorBrand || 'Target Competitor',
        marketplace: 'Amazon / Shopify',
        currentPrice: compPrice,
        previousPrice: previousPrice,
        priceChangePercent: priceChange,
        stockStatus: 'In Stock',
        lastChecked: 'Just Now (Live Crawl)'
      },
      history: history,
      topComplaint: topComplaint || 'Slow shipping speed and brittle plastic construction.',
      suggestedAngle: 'Highlight premium metal alloy construction and guaranteed 48h express delivery.',
      diffAnalysis: calculatePriceDiff(previousPrice, compPrice, alertThreshold || 10)
    };

    mockData.trackedProducts.unshift(newItem);

    // Also add an event to recent events ticker
    mockData.marketPulse.recentEvents.unshift({
      id: `evt-${Date.now()}`,
      type: 'PRICE_DROP',
      severity: Math.abs(priceChange) >= 15 ? 'critical' : 'high',
      competitor: newItem.competitor.brand,
      product: newItem.name,
      detail: `New competitor URL ingested. Initial baseline logged: $${compPrice.toFixed(2)} (${priceChange}% 30-day shift).`,
      timestamp: 'Just now',
      actionRecommended: 'Automated monitoring activated. Counter-Campaign prompts prepared.'
    });

    res.json({
      success: true,
      message: `Now actively monitoring ${newItem.name} by ${newItem.competitor.brand}`,
      product: newItem
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
