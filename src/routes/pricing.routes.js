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

module.exports = router;
