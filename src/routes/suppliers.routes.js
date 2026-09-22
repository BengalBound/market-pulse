const express = require('express');
const router = express.Router();
const mockData = require('../data/mockData.json');
const { evaluateMarginImpact } = require('../services/diffEngine');

// GET /api/suppliers/discounts
router.get('/', (req, res) => {
  try {
    const discounts = mockData.supplierDiscounts.map(d => {
      // Benchmark assuming typical retail selling price
      const sellingPriceEstimate = d.unitPrice * 3.5;
      const marginBoost = evaluateMarginImpact(sellingPriceEstimate, d.regularPrice, d.unitPrice);
      return {
        ...d,
        marginAnalysis: marginBoost
      };
    });

    res.json({
      success: true,
      activeSupplierCampaigns: discounts.length,
      discounts
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
