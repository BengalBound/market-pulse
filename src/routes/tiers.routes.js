const express = require('express');
const router = express.Router();
const mockData = require('../data/mockData.json');

// GET /api/subscriptions/tiers
router.get('/', (req, res) => {
  try {
    res.json({
      success: true,
      tiers: mockData.subscriptionTiers
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
